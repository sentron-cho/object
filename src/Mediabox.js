/* eslint-disable react/no-direct-mutation-state */
import React from 'react';
import cx from 'classnames/bind';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import YouTube from 'react-player/lib/players/YouTube';
import { Util, Svg, cs } from './index';
import { EID } from './Config'
import { IMG } from './Icons';

export const CONT_TYPE = {
  IMAGE: "image",
  VIDEO: "video",
  YOUTUBE: "youtube",
  TEXT: "text",
  LINK: "link",
};

const StyledObject = styled.div`{
  &.media-box { 
    ${cs.pos.relative} ${cs.w.full} ${cs.noselect} ${cs.box.inner} ${cs.over.hidden}
    ${({ height }) => cs.h.get(height || "fit-content")};

    .cont-frame {
      ${cs.size.full} ${cs.object.fit('cover')} ${cs.object.center}
      ${cs.anim.in(500)} ${cs.align.ycenter} ${cs.pos.relative} ${cs.over.hidden}
      
      &.youtube, &.video { width: 100% !important; height: 100% !important; 
        & > video { ${({ fit }) => fit && cs.object.fit(fit)} }
      }
    }

    .loading-img { ${cs.pos.absolute} ${cs.align.center} ${cs.h.get(400)} ${cs.w.full} }

    .btn-down { ${cs.align.rbottom} }
    .btn-media-edit {
      ${cs.align.lbottom} ${cs.opac.alpha} ${cs.z.get(999)}
      svg { ${cs.opac.show} ${cs.p.t3} ${cs.p.l1} .svg-path { ${cs.fill.lightgray} } }
    }

    &:hover { .btn-media-edit { ${cs.opac.show} ${cs.bg.primary} } }

    &.vstyle { ${cs.w.fit} ${cs.h.full} .cont-frame { ${cs.w.auto} ${cs.h.full} ${cs.max.width(600)} } }

    .pointer { ${cs.mouse.pointer} };

    &.lg { .image { ${({ height }) => cs.h.get(height || 680)}; } }
    &.md { .image { ${({ height }) => cs.h.get(height || 580)}; } }
    &.sm { .image { ${({ height }) => cs.h.get(height || 460)}; } }

    .noimage { ${cs.box.border} ${cs.border.lightgray} }

    
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
    }
  
    @media screen and (max-width : 860px) {
      .cont-frame { border: 0; border-radius: 0; }
    }
  }
};`;


export default class Mediabox extends React.PureComponent {
  constructor(props) {
    super(props);
    const loaded = props.type === CONT_TYPE.IMAGE ? false : true;
    (loaded && this.props.onLoad) && this.props.onLoad();
    this.state = { loaded: loaded, error: false };
  }

  componentDidMount() {
    this.setState({ height: this.getHeight() });
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }


  UNSAFE_componentWillReceiveProps(nextProps) {
    (nextProps.resize) && this.onResize();
  }

  onResize = (e) => {
    this.setState({ height: this.getHeight() });
  }

  onLoad = (e) => {
    this.setState({ loaded: true });
    this.props.onLoad && this.props.onLoad(e);
  }

  onError = (e) => {
    this.setState({ error: true, loaded: true });
    this.props.onError && this.props.onError(e);
    setTimeout(() => this.state.error = false, 100);
  }

  onClickEdit = (e) => {
    const { props } = this;
    if (props.edited) {
      props.onClick && props.onClick(props.eid, e)
    }
  }

  onClicked = (e) => {
    const { props } = this;
    if (props.onClick) {
      props.onClick('link', e);
    } else {
      !Util.isEmpty(props.link) && window.open(props.link)
    }
  }

  getHeight = () => {
    let { rate = "", size, maxwidth, width = 0 } = this.props;
    if (size != null) {
      switch (size) {
        case 'full': return "100%";
        // case 'normal': rate = "4:3"; break;
        case 'wide': rate = "16:9"; break;
        case 'xwide': rate = "21:9"; break;
        case 'fwide': rate = "28:9"; break;
        // case 'auto': return "100%";
        default: rate = "4:3"; break;
      }
    }

    const temps = rate.split(":");
    const x = temps[0];
    const y = temps[1];
    width = String(width).replace(/[^0-9]/g, '');
    width = width || this.box.offsetWidth;
    if (maxwidth && parseInt(width) > parseInt(maxwidth)) {
      width = parseInt(maxwidth);
    }
    const height = Math.floor(width * (y / x));
    return `${height}px`;
  }

  onReady = (event) => {
    // event.target.pauseVideo();
  }

  render() {
    const { props, state } = this;
    const { error } = state;
    const { type = "image", playing = true, controls = true, fit = "cover", maxHeight = '', imagestyle = '', muted = true } = props;
    const pointer = props.link || props.onClick ? 'pointer' : '';
    const src = props.src || props.url;
    const { border } = props.options || { border: null };

    const renderContents = () => {
      if (error || !src) {
        return <img alt="img" className={cx('cont-frame', type, 'noimage')} src={IMG.NoimageBig}
          onClick={this.onClicked} onLoad={this.onLoad} style={{ ...imagestyle }} />
      } else {
        return (
          <React.Fragment>
            {type === CONT_TYPE.IMAGE && <img alt="img" className={cx("cont-frame", type, pointer)} onClick={this.onClicked}
              src={src} onLoad={this.onLoad} onError={this.onError} style={{ objectFit: fit, maxHeight, ...imagestyle }} />}
            {type === CONT_TYPE.YOUTUBE && <YouTube className={cx("cont-frame", type)} style={{ width: "100%", height: "100%", ...imagestyle }}
              url={src} playing={playing} controls={controls} playsinline loop />}
            {type === CONT_TYPE.VIDEO && <ReactPlayer className={cx("cont-frame", type)}
              style={{ width: "100%", height: "100%", ...imagestyle }}
              url={src} playing={playing} controls={controls} playsinline loop muted={muted} />}
            {type === CONT_TYPE.LINK && <img alt="link" className={cx("cont-frame", type, pointer)} onClick={this.onClicked}
              src={src} onLoad={this.onLoad} onError={this.onError} style={{ ...imagestyle }} />}
          </React.Fragment>
        )
      }
    }

    // const height = (type === CONT_TYPE.IMAGE) ? "fit-content" : this.state.height;
    const height = this.state.height;

    return (
      <StyledObject ref={ref => { this.box = ref }} className={cx("media-box", props.className)}
        style={props.style} onClick={this.onClickEdit} height={height} border={border} fit={fit}>
        {renderContents()}
        {/* {pointer && <Svg className="btn-down xxl box radius" onClick={this.onClicked} eid={EID.DOWM} name={"down"} color={'black'} />} */}
        {props.edited &&
          // <Button className="btn-media-edit primary md" title={ST.EDIT} onClick={() => this.box.click()} eid={EID.EDIT} />
          <Svg className="btn-media-edit xxl box radius" onClick={() => this.box.click()} eid={EID.EDIT} name={"media"} />
        }
      </StyledObject>
    )
  };
}