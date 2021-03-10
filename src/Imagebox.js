/* eslint-disable react/no-direct-mutation-state */
import React from 'react';
import cx from 'classnames/bind';
import styled from 'styled-components';
import { Util, Loading, Svg, cs } from './index';
import { ST, EID } from './Config';

const StyledObject = styled.div`{
  &.image-box { 
    ${cs.noliststyle} ${cs.noselect} ${cs.h.full} ${cs.pos.relative} ${cs.over.hidden}
    ${({ width }) => cs.w.get(width)} ${cs.box.inner} ${({ maxheight }) => cs.max.height(maxheight)}

    .ib-frame {
      ${cs.pos.relative} ${cs.opac.hide} ${cs.size.full} 
      ${cs.object.position('center center')}
      ${({ fit }) => cs.object.fit(fit || 'contain')}

      &.loaded { ${cs.anim.show} ${cs.opac.visible} }
    }

    // .no-image { 
    //   ${cs.font.lightgray} ${cs.align.center} ${cs.font.size("1em")} ${cs.opac.show}
    //   ${cs.max.height("80%")} ${cs.max.width("80%")} ${cs.size.get("fit-content")}
    // }

    &.noimage { ${cs.box.line} ${cs.box.dashed} ${cs.border.alphagray} 
      .ib-frame {
        ${cs.font.gray} ${cs.align.center} ${cs.font.size("1.5em")} ${cs.opac.show}
        ${cs.max.height("80%")} ${cs.max.width("80%")} ${cs.size.get("fit-content")}
      }
    }

    .ib-del { ${cs.align.rtop} ${cs.top(10)} ${cs.right(10)} }
    
    .loading-box { ${cs.top(0)} ${cs.opac.invisible} }

    &.pointer { ${cs.mouse.alias} };

    .guide-size { 
      ${cs.z.front} ${cs.bottom(10)} ${cs.align.center} ${cs.font.white} ${cs.font.center} ${cs.p.a5}
      ${cs.font.sm} ${cs.bg.alphablack} ${cs.box.radius} ${cs.font.prewrap} ${cs.size.fit} ${cs.max.w("90%")}
      ${cs.opac.alpha}
    }
   
    &.border { ${cs.box.line} ${cs.border.lightgray} }
    &.radius { ${cs.box.radius} }
    &.right { ${cs.align.right} ${cs.pos.relative} }
    &.show-loading { .loading-box { ${cs.opac.show} } }

    &.left { }
    &.right { ${cs.align.right} ${cs.top(0)} }
    &.center { ${cs.align.xcenter} ${cs.top(0)} }
    &.top { ${cs.align.top} }
    &.middle { ${cs.align.ycenter} }
    &.bottom { ${cs.align.bottom} }
    &.center.middle { ${cs.pos.absolute} ${cs.top("50%")} ${cs.left("50%")} ${cs.align.get("translate(-50%, -50%)")} }

    ${({ border }) => border && cs.box.line}
    ${({ border }) => border && border.color && cs.border.color(border.color)}
    ${({ border }) => border && border.radius && cs.border.radius(border.radius)}
    ${({ border }) => border && border.width && cs.border.width(border.width)}

    @media screen and (max-width : 1280px) {
    }
  
    @media screen and (max-width : 1024px) {
      .ib-frame.no-image { ${cs.font.get(30)} ${cs.font.line(40)} }
    }
  
    @media screen and (max-width : 860px) {
      .ib-frame.no-image { ${cs.font.get(20)} ${cs.font.line(30)} ${cs.w.calc('100% - 10px')} }
      .guide-size { ${cs.w.calc('100% - 10px')} }
    }

    @media screen and (max-width : 600px) {
      .ib-frame.no-image { ${cs.font.get(16)} ${cs.font.line(20)}  }
      .guide-size { ${cs.font.get(10)} ${cs.font.line(16)} ${cs.bottom(5)} ${cs.p.a5} }
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
    let { rate = "", size, maxheight = null } = this.props;
    if (size != null) {
      switch (size) {
        case 'full': return "100%";
        // case 'normal': rate = "4:3"; break;
        case 'wide': rate = "16:9"; break;
        case 'xwide': rate = "21:9"; break;
        case 'fwide': rate = "28:9"; break;
        default: rate = "4:3"; break;
      }
    }

    const temps = rate.split(":");
    const x = temps[0];
    const y = temps[1];
    let height = this.box.offsetHeight;
    if (maxheight && parseInt(height) > parseInt(maxheight)) {
      height = parseInt(maxheight);
    }
    const width = Math.floor(height / y * x);
    return `${width}px`;
  }

  componentDidMount() {
    this.setState({ width: this.getWidth() });
    window.addEventListener('resize', this.onResize);
    const { src, url } = this.props;
    if (!(src || url)) this.props.onLoad && this.props.onLoad();
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
    if (props.onClick) {
      props.onClick('link', e);
    } else {
      props.link && window.open(props.link)
    }
  }

  onDelete = (eid, e) => {
    e.stopPropagation();
    this.props.onDelete && this.props.onDelete(e, eid, this.props.rowid);
  }

  render() {
    const { props, state } = this;
    const { loaded, error } = state;
    const { fit = "contain", className, maxheight, edited, imagestyle = '' } = props;

    const { width } = state;
    const sizeguide = props.sizeguide || `[100 X 100]`;
    const src = props.src || props.url;
    const noimage = !src || error;
    const isguide = (edited && noimage);
    const { border } = props.options || { border: null };
    const pointer = props.link || props.onClick ? 'pointer' : '';

    return (
      <StyledObject ref={ref => { this.box = ref }} className={cx("image-box", className, pointer, { noimage })} width={width} fit={fit}
        eid={props.eid} maxheight={maxheight} border={border} onClick={this.onClicked} style={{ ...props.style }}>
        {isguide && <span className={"guide-size"} >{`${ST.IMAGESIZE}\n${sizeguide}`}</span>}
        {noimage ? <span className={cx("ib-frame", 'no-image')} >{"No Image"}</span>
          : <img alt="img" className={cx("ib-frame", { loaded }, props.opsbox)} src={src} style={{ objectFit: fit, ...imagestyle }}
            onLoad={this.onLoad} onError={this.onError} />}
        {props.children}
        {props.onDelete && <Svg className="ib-del lg box radius" onClick={this.onDelete} eid={EID.DELETE} icon={'delete'} />}
        {!loaded && <Loading type="ring" />}
      </StyledObject>
    )
  };
}