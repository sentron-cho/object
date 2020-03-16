/* eslint-disable react/no-direct-mutation-state */
import React from 'react';
import cx from 'classnames/bind';
import styled from 'styled-components';
import { Util, Loading, Svg, cs } from './index';
import { ST, EID } from './Config';

const StyledObject = styled.div`{
  &.image-box { height: 100%; position: relative; width: ${(props) => props.width}; 

    &.right { position: absolute; right: 0; }
    &.show-loading { .loading-box { opacity: 1; } }
    &.border { border: 1px solid rgba(204, 204, 204, 0.4); border-radius: 5px; }

    .cont-frame {
      position: relative; opacity: 0.1; object-position: center center;
      width: 100%; height: 100%; object-fit: ${(props) => props.fit ? props.fit : 'contain'}; 

      &.loaded { transition: opacity 150ms ease-in 0s; opacity: 1; }
    }
    
    .btn-del { position: absolute; top: 10px; right: 10px; }
    
    .loading-box { top: 0; opacity: 0; }

    .pointer { cursor: pointer; };

    .guide-size { z-index: 1; position: absolute; bottom: 10px; left: 50%; color: rgba(250,250,250,0.8); text-align: center;
      font-size: 12px; padding: 10px; transform: translateX(-50%); background: rgba(0,0,0,0.2); border-radius: 10px;
      white-space: pre-wrap; width: fit-content; max-width: 90%;
      // border: 1px solid rgba(255,255,255,0.2); 
    }

    .no-image { 
      ${cs.font.lightgray} ${cs.align.center} ${cs.font.size("1em")} ${cs.opac.show}
      ${cs.max.height("80%")} ${cs.max.width("80%")} ${cs.size.get("fit-content")}
    }
   
    @media screen and (max-width : 1280px) {
    }
  
    @media screen and (max-width : 1024px) {
      .no-image { font-size: 30px; line-height: 40px; }
    }
  
    @media screen and (max-width : 860px) {
      .no-image { font-size: 20px; line-height: 30px; width: calc(100% - 10px); }
      .guide-size { width: calc(100% - 10px); }
    }

    @media screen and (max-width : 600px) {
      .no-image { font-size: 16px; line-height: 20px; }
      .guide-size { font-size: 10px; line-height: 16px; bottom: 5px; padding: 5px; }
    }
  }
};`;


export default class Imagebox extends React.PureComponent {
  constructor(props) {
    super(props);
    const { type } = Util.getScreenType();
    const src = props.src || props.url;
    this.state = { type: type, loaded: !src ? true : false, error: false, width: "auto" }
  }

  onResize = () => {
    const { type } = Util.getScreenType();
    this.setState({ 'type': type, width: this.getWidth() });
  }

  getWidth = () => {
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
    // console.log(this.box.offsetHeight, this.box.offsetWidth);

    const temps = rate.split(":");
    const x = temps[0];
    const y = temps[1];
    const height = this.box.offsetHeight;
    const width = height / y * x;
    return `${width}px`;
  }

  componentDidMount() {
    this.setState({ width: this.getWidth() });
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onLoad = (e) => {
    this.setState({ loaded: true });
    this.props.onLoad && this.props.onLoad();
  }

  onError = (e) => {
    this.setState({ error: true, loaded: true });
    this.props.onError && this.props.onError();
    setTimeout(() => this.state.error = false, 100);
  }

  onClicked = (e) => {
    const { props } = this;
    if (props.edited) {
      // props.onClick && props.onClick(e, props.eid)
      props.onClick && props.onClick(e, EID.EDIT, this.props.rowid);
    } else {
      !Util.isEmpty(props.link) && window.open(props.link)
    }
  }

  onDelete = (eid, e) => {
    e.stopPropagation();
    this.props.onDelete && this.props.onDelete(e, eid, this.props.rowid);
  }

  render() {
    const { props, state } = this;
    const { loaded, error } = state;
    const { fit = "contain" } = props;

    const pointer = !Util.isEmpty(props.link) ? 'pointer' : '';
    const { width } = state;
    const styled = { ...props.style, width, fit };
    const sizeguide = props.sizeguide ? props.sizeguide : `[100 X 100]`;
    const isguide = (props.edited && noimage && sizeguide);
    const src = props.src || props.url;
    const noimage = !src || error;

    return (
      <StyledObject ref={ref => { this.box = ref }} className={cx("image-box", props.className, pointer)}
        {...styled} eid={props.eid} onClick={this.onClicked}>
        {isguide && <span className={"guide-size"} >{`${ST.IMAGESIZE}\n${sizeguide}`}</span>}
        {noimage ? <span className={cx("cont-frame", 'no-image')} >{"No Image"}</span>
          : <img alt="img" className={cx("cont-frame", { loaded }, props.opsbox)} src={src} onLoad={this.onLoad} onError={this.onError} />}
        {props.children && props.children}
        {props.onDelete && <Svg className="btn-del lg box radius" onClick={this.onDelete} eid={EID.DELETE} icon={'delete'} />}
        {!loaded && <Loading type="ring" />}
      </StyledObject>
    )
  };
}