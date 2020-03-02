/* eslint-disable react/no-direct-mutation-state */
import React from 'react';
import cx from 'classnames/bind';
import styled from 'styled-components';
import { Util, Loading, Svg } from './index';
import { EID } from './Config'
import { IMG } from './Icons'

const StyledObject = styled.div`{
  &.carousel-box { height: 100%; position: relative; overflow: hidden; width: 1000px;
    width: ${(props) => props.width};
    height: ${(props) => props.height};

    .cau-ul {
      height: 100%; width: ${(props) => `calc(100% * 2)`}; 
      &.anim { animation: slide ${(props) => props.anitime} 1; animation-fill-mode: both; }
    }

    .cau-li { 
      position: relative; opacity: 0; width: 100%; display: inline-block; 
      width: ${(props) => `calc(100% / 2)`};
      height: 100%; object-fit: cover; object-position: center center;

      &.loaded { transition: opacity 150ms ease-in 0s; opacity: 1; 
        .cau-image { background: transparent; }
      }

      .cau-image { width: 100%; height: 100%; background-image: url(${IMG.NoimageBig}); 
        background-size: contain; background-repeat: no-repeat; display: block; background-position: center;
        
        &.noimage { border: 1px solid rgba(255, 255, 255, 0.1); }
      }

      .cau-caption { position: absolute; width: 100%; bottom: 30px; opacity: 0.8;
        font-size: 1.2rem; line-height: 1.4; text-align: center; white-space: pre-wrap; padding: 0 30px;
        .cap-title { font-size: 3.0rem; font-weight: 600; }
      }

      &.active { }
    }

    .cau-navi { 
      position: absolute; right: 0; bottom: 10px; left: 0; z-index: 15; display: flex;
      justify-content: center; margin-top: 10px;

      li.cau-navi-li { position: relative; width: 30px; height: 5px; margin: 0 3px; border: 1px solid #1e0a5d;
        cursor: pointer; background-color: rgba(255,255,255); border-radius: 2px; opacity: 0.5;
        &.active { opacity: 0.9; background-color: rgba(255, 183, 29, 0.9) }
      } 
    }

    .btn-edit { position: absolute; right: 20px; top: 20px; z-index: 100; }

    .slide-navi { position: absolute; top: 0; z-index: 15; height: 100%; background: rgba(0,0,0,0.1);cursor: pointer;
      &.prev { left: 0; }
      &.next { right: 0; }
      .icon { top: 50%; transform: translateY(-50%); width: 40px}
    }

    &.show-loading { .loading-box { opacity: 1; } }

    .border { border: 2px solid rgba(255, 255, 255, 0); border-radius: 5px; }
    
    .loading-box { top: 0; opacity: 0; }
    .pointer { cursor: pointer; };
  }
  
  &.full { width: 100%; }

  &.lg { width: 1200px; }

  &.md { width: 1000px; }

  &.sm { width: 800px; }

  @media screen and (max-width : 1280px) {
  }

  @media screen and (max-width : 1024px) {
  }

  @media screen and (max-width : 860px) {
  }

  @keyframes slide {
    0% {margin-left:0;} /* 0 ~ 10  : 정지 */
    
    90% {margin-left:0;} /* 10 ~ 25 : 변이 */
    100% {margin-left:-100%;} /* 25 ~ 35 : 정지 */
  }
};`;


export default class Carousel extends React.PureComponent {
  constructor(props) {
    super(props);
    const { type } = Util.getScreenType();
    const list = props.list && props.list.map((item, index) => {
      item.active = index === 0 ? true : false;
      item.index = index;
      item.error = false;
      item.loaded = false;
      return item;
    });
    const isanim = this.props.anim ? true : false;
    this.state = {
      type: type, loaded: false, height: "auto", anim: isanim, isanim: isanim,
      list: list, pos: 0, current: list[0], next: list[1] ? list[1] : list[0]
    };

    this.animation = null;
  }

  onResize = () => {
    const { type } = Util.getScreenType();
    this.setState({ 'type': type, height: this.getHeight() });
  }

  getPosition = () => {
    return this.state.pos;
  }

  getCurrentItem = () => {
    return this.state.current;
  }

  getHeight = () => {
    let { rate = "4:3", size } = this.props;
    if (size != null) {
      switch (size) {
        case 'full': return "100%";
        case 'normal': rate = "4:3"; break;
        case 'wide': rate = "16:9"; break;
        case 'xwide': rate = "21:9"; break;
        case 'fwide': rate = "28:9"; break;
        default: rate = "4:3"; break;
      }
    }

    const temps = rate.split(":");
    const y = temps[0];
    const x = temps[1];
    const width = this.box.offsetWidth;
    const height = width / y * x;
    return `${height}px`;
  }

  componentDidMount() {
    this.setState({ height: this.getHeight() });
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
    this.animation != null && clearTimeout(this.animation);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.anim != null) {
      // this.state.isanim = this.state.anim = nextProps.anim;
      this.setState({ isanim: nextProps.anim, anim: nextProps.anim });
    }
    this.animation != null && clearTimeout(this.animation);
  }

  onLoad = (e) => {
    const pos = e.currentTarget.getAttribute("index");
    const list = [...this.state.list];
    list[pos].error = false;
    list[pos].loaded = true;
    this.setState({ list: list });
    this.props.onLoad && this.props.onLoad();
  }

  onError = (e) => {
    const pos = e.currentTarget.getAttribute("index");
    const list = [...this.state.list];
    list[pos].error = true;
    list[pos].loaded = true;
    this.setState({ list: list });
    this.props.onError && this.props.onError();
  }

  onClicked = (e) => {
    const eid = e.currentTarget.getAttribute("eid");
    this.changeSlide(eid, false);

    if (this.state.isanim) {
      this.animation = setTimeout(() => {
        this.setState({ anim: true });
      }, 1000);
    }
  }

  onClickEdit = (eid, e) => {
    this.props.onClickEdit && this.props.onClickEdit(eid, this.state.current);
  }

  onClickNavi = (e) => {
    const pos = Number(e.currentTarget.getAttribute("pos"));
    this.state.pos = pos;
    this.onClicked(e);
  }

  changeSlide = (eid, anim) => {
    this.animation != null && clearTimeout(this.animation);
    const { current, next, pos } = this.makeSlideImage(eid);

    const { list } = this.state;
    list.map((item, index) => {
      item.active = (index === pos) ? true : false;
      return item;
    });

    this.setState({ anim: anim, current, next, pos, error: -1, loaded: false });
  }

  onAnimStart = (e) => { }

  onAnimEnd = () => {
    this.changeSlide(EID.NEXT, false);
    (this.state.isanim) && setTimeout(() => {
      this.setState({ anim: true });
    }, 100);
  }

  makeSlideImage = (eid) => {
    let { list } = this.state;
    const pos = this.movePos(list, this.state.pos, eid);
    const current = list[pos];
    const nextpos = this.movePos(list, this.state.pos + 1, eid);
    const next = list[nextpos];

    return { current, next, pos };
  }

  movePos = (list, pos, eid = EID.NEXT) => {
    // const { list, pos } = this.state;
    let selected = pos;
    (eid === EID.NEXT) ? selected++ : (eid === EID.PREV) ? selected-- : selected = pos;
    if (selected < 0) selected = list.length - 1;
    selected = Math.abs(selected % list.length);
    // if (selected > list.length - 1) selected = 0;

    return selected;
  }

  renderContents = (list, anim) => {
    return list.map((item, index) => {
      if (item == null) {
        return <li key={index} className={cx("cau-li")}><div className={cx("cau-image noimage")} index={index} /></li>;
      }

      const urldata = item.url.indexOf("data:") === 0 ? item.url : item.path + item.url;

      // 카우셀에서 첫번째 이미지만 loading 처리하자..
      let image;
      if (!item.loaded) {
        image = <img alt="img" className={cx("cau-image")} index={item.index} src={urldata} onError={this.onError} onLoad={this.onLoad} />
      } else if (item.error) {
        image = <div className={cx("cau-image noimage")} index={item.index} />
      } else {
        image = <img alt="img" className={cx("cau-image")} index={item.index} src={urldata} />
      }

      const { active, color = "#ffffff" } = item;
      const styled = { color };
      // 카우셀 이미지 및 캡션 프레임...
      return <li key={index} className={cx("cau-li", { active }, item.loaded && 'loaded')}>
        {image}
        {!item.loaded && <Loading type="ring" />}
        <div className="cau-caption">
          {item.title && <p className={"cap-title"} style={styled}>{item.title}</p>}
          {item.text && <p className={"cap-text"} style={styled}>{item.text}</p>}
        </div>
      </li>
    });
  }

  render() {
    const { props, state } = this;
    const { list, anim, current, next } = state;
    const { height } = state;
    const styled = { ...props.style, width: props.width, height, anitime: props.anitime ? props.anitime : "3s" };
    const animlist = [current, next];

    return (
      <StyledObject ref={ref => { this.box = ref }} className={cx("carousel-box", props.className)} {...styled} length={list.length}>
        <ul className={cx("cau-ul", { anim })} onAnimationEnd={this.onAnimEnd} onAnimationStart={this.onAnimStart} >
          {this.renderContents(animlist, anim)}
        </ul>
        <ul className="cau-navi">
          {list.map((item, index) => {
            const active = item.active;
            return <li key={index} pos={index} className={cx("cau-navi-li", { active })} onClick={this.onClickNavi} />
          })}
        </ul>
        <span className="slide-navi prev" onClick={this.onClicked} eid={EID.PREV}>
          <Svg className="icon lg" name={"prev"} color={props.color} />
        </span>
        <span className="slide-navi next" onClick={this.onClicked} eid={EID.NEXT}><Svg className="icon lg" name={"next"} color={props.color} /></span>
      </StyledObject>
    )
  };
}