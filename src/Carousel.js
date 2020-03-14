/* eslint-disable react/no-direct-mutation-state */
import React from 'react';
import cx from 'classnames/bind';
import styled from 'styled-components';
import { Util, Loading, Svg, Guidebox, cs } from './index';
import { EID } from './Config';
import { IMG } from './Icons';

const StyledObject = styled.div`{
  &.carousel-box { 
    ${cs.noselect} ${cs.noliststyle} ${cs.h.full} ${cs.min.height(240)} 
    ${cs.pos.relative} ${cs.over.hidden} ${cs.w.get(1000)} ${cs.box.inner}

    ${({ width }) => cs.w.get(width)};
    ${({ height }) => cs.h.get(height)};

    .cau-ul {
      ${cs.h.full} ${cs.w.calc('100% * 2')}
      &.anim { 
        animation: slide ${({ anitime }) => anitime} 1; animation-fill-mode: both; 
      }
      @keyframes slide {
        0% {margin-left:0;} /* 0 ~ 10  : 정지 */
        90% {margin-left:0;} /* 10 ~ 25 : 변이 */
        100% {margin-left:-100%;} /* 25 ~ 35 : 정지 */
      }
    }

    .cau-li { 
      ${cs.pos.relative} ${cs.opac.invisible} ${cs.disp.inblock}
      ${cs.h.full} ${cs.w.calc('100% / 2')} ${cs.object.cover} ${cs.object.center}

      &.loaded { 
        // transition: opacity 150ms ease-in 0s; 
        ${cs.anim.in()} ${cs.opac.visible}
        .cau-image { ${cs.bg.trans} }
      }

      .cau-image { 
        ${cs.size.full} ${cs.bg.get(`url(${IMG.NoimageBig})`)}
        ${cs.bg.size("contain")} ${cs.bg.repeat("no-repeat")} ${cs.disp.block} ${cs.bg.pos("center")}
        
        &.noimage { ${cs.box.line} }
      }

      .cau-caption { ${cs.font.white}
        ${cs.align.cbottom} ${cs.bottom(30)} ${cs.opac.alpha} ${cs.font.size("1.2rem")} 
        ${cs.font.space("pre-wrap")} ${cs.p.h30} ${cs.w.full}
        & > p { ${cs.p.h10} }
        .cap-title { ${cs.font.size("3.0rem")} ${cs.font.thickbold} }
      }

      &.active { }
    }

    .cau-navi { 
      ${cs.align.cbottom} ${cs.bottom(10)} ${cs.z.front} ${cs.disp.get("flex")}

      li.cau-navi-li { 
        ${cs.pos.relative} ${cs.w.get(30)} ${cs.h.get(5)} ${cs.m.h3} ${cs.box.line} ${cs.border.dark}
        ${cs.mouse.pointer} ${cs.bg.white} ${cs.border.radius(2)} ${cs.opac.hide}
        &.active { ${cs.bg.orange} }
      } 
    }

    // .btn-edit { position: absolute; right: 20px; top: 20px; z-index: 100; }

    .slide-navi { 
      ${cs.pos.absolute} ${cs.top(0)} ${cs.z.front} ${cs.h.full} ${cs.mouse.pointer}
      ${cs.bg.vgradint} ${cs.opac.get(0.3)} //background: rgba(0,0,0,0.1);
      &.prev { ${cs.left(0)} }
      &.next { ${cs.right(0)} }
      .icon { ${cs.align.ycenter} ${cs.pos.relative} ${cs.w.get(40)} .svg-path { ${cs.fill.dark} } }
    }

    // &.show-loading { .loading-box { opacity: 1; } }
    // .loading-box { top: 0; opacity: 0; }
    // .pointer { cursor: pointer; };
    // .border { border: 2px solid rgba(255, 255, 255, 0); border-radius: 5px; }

    &:hover { 
      .cau-li .cau-caption { ${cs.opac.show} ${cs.anim.in()} }
      .cau-navi .cau-navi-li { ${cs.opac.alpha} ${cs.anim.in()} &.active { ${cs.opac.get(0.8)} } }
      .slide-navi { ${cs.opac.show} ${cs.anim.in()} }
    }
  
    .cau-li .cau-caption {
      .cap-text {
        ${({ text }) => text && text.size ? cs.font.size(text.size) : ''}
        ${({ text }) => text && text.align ? cs.font.align(text.align) : ''}
        ${({ text }) => text && text.color ? cs.font.color(text.color) : ''}
        ${({ text }) => text && text.outline ? cs.font.outline('1px', text.outline) : ''}
      }

      .cap-title {
        ${({ title }) => title && title.size ? cs.font.size(title.size) : ''}
        ${({ title }) => title && title.align ?  cs.font.align(title.align) : ''}
        ${({ title }) => title && title.color ? cs.font.color(title.color) : ''}
        ${({ title }) => title && title.outline ? cs.font.outline('1px', title.outline) : ''}
      }
    }

    & {
      ${({ border }) => border && cs.box.line}
      ${({ border }) => border && border.color && cs.border.color(border.color)}
      ${({ border }) => border && border.radius && cs.border.radius(border.radius)}
      ${({ border }) => border && border.width && cs.border.width(border.width)}
    }
  }
  
  &.full { ${cs.w.full} }
  &.lg { ${cs.w.get(1200)} }
  &.md { ${cs.w.get(1000)} }
  &.sm { ${cs.w.get(800)} }
  &.xs { ${cs.w.get(600)} }
  &.xxs { ${cs.w.get(400)} }

  @media screen and (max-width : 1280px) {
  }

  @media screen and (max-width : 1024px) {
  }

  @media screen and (max-width : 860px) {
  }
};`;


export default class Carousel extends React.PureComponent {
  constructor(props) {
    super(props);
    const { type } = Util.getScreenType();
    const list = props.list ? props.list.map((item, index) => {
      item.active = index === 0 ? true : false;
      item.index = index;
      item.error = false;
      item.loaded = false;
      return item;
    }) : [];
    const isanim = this.props.anim ? true : false;
    this.state = {
      type: type, loaded: false, height: "auto", anim: isanim, isanim: isanim,
      list: list, pos: 0, current: list[0] || null, next: list[1] ? list[1] : list[0] || null
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
    let { rate, size = 'wide' } = this.props;
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

      const urldata = item.url.indexOf("data:") === 0 ? item.url : (item.path || '') + item.url;

      // 카우셀에서 첫번째 이미지만 loading 처리하자..
      let image;
      if (!item.loaded) {
        image = <img alt="img" className={cx("cau-image")} index={item.index} src={urldata} onError={this.onError} onLoad={this.onLoad} />
      } else if (item.error) {
        image = <div className={cx("cau-image noimage")} index={item.index} />
      } else {
        image = <img alt="img" className={cx("cau-image")} index={item.index} src={urldata} />
      }

      const { active, color = "" } = item;
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
    const { list, anim, current, next, height } = state;
    const { text = null, title = null, border = null } = props.options || { text: null, title: null, border: null };
    const { time = "3s" } = props;
    const styled = { ...props.style, width: props.width, height, anitime: props.anitime ? props.anitime : time };
    const animlist = [current, next];

    const renderGuide = () => {
      let guide = null;
      if (!list || list.length < 1) {
        guide = "list props is required.\n"
          + "ex. const list = [{ rowid: 'a12345', title: 'title', text: 'text', url: '', path: '', utime: '20200101' }, {...}\n"
          + "url is required. Rest is optional.\n"
          + "path is root path to display before url.";
      }

      if (list && list[0]) {
        const item = list[0];
        if (item.url == null || item.url === undefined) {
          guide = "'url' is required in the list.\n"
            + "ex. const list = [{ rowid: 'a12345', title: 'title', text: 'text', url: '', path: '', utime: '20200101' }, {...}"
        }
      }

      if (guide) {
        return <Guidebox text={guide} />
      }
    }

    console.log(time);
    return (
      <StyledObject ref={ref => { this.box = ref }} className={cx("carousel-box", props.className)}
        {...styled} length={list.length} text={text} title={title} border={border} time={time}>
        {/* error guid */}
        {renderGuide()}

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
          <Svg className="icon lg" name={"left"} color={props.color} />
        </span>
        <span className="slide-navi next" onClick={this.onClicked} eid={EID.NEXT}><Svg className="icon lg" name={"right"} color={props.color} /></span>
      </StyledObject>
    )
  };
}