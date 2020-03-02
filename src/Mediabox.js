/* eslint-disable react/no-direct-mutation-state */
import React from 'react';
import cx from 'classnames/bind';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import YouTube from 'react-player/lib/players/YouTube';
import { Util, Svg } from './index';
import { EID, CONT_TYPE } from './Config'
import { IMG } from './Icons';

const StyledObject = styled.div`{
  &.media-box { position: relative; width: 100%; height: ${(props) => props.height ? props.height : "fit-content" };
    .cont-frame {
      position: relative; border: 2px solid rgba(255, 255, 255, 0); border-radius: 5px; height: 100%;
      width: 100%; max-height: 562px; object-fit: cover; object-position: center center; transition: opacity 500ms ease 0s; 

      // &.pdf { padding: 10% 20%; background: rgba(255, 255, 255, 0.5); }
      // &.pdf-view { float: left; position: absolute; top: 88%; text-align: center;
      //   display: inline; width: 100%; font-size: 2vw; color: #ffa212; font-weight: 600;
      // }
      
      &.youtube, &.video { width: 100% !important; height: 100% !important; }
    }


    .loading-img { position: absolute; top: 0; left: 0; height: 562px; width: 100%; }

    .btn-down { position: absolute; float: right; bottom: 20px; right: 20px; }
    .btn-media-edit {
      position: absolute; float: right; bottom: 10px; left: 10px; border: 1px solid #aaa; z-index: 999; opacity: 0.3;
      svg { padding: 4px; opacity: 0.7; }
    }

    &:hover { .btn-media-edit { opacity: 0.95; background: #4a92e4; } }

    &.vstyle { width: fit-content; height: 100%; .cont-frame { width: auto; height: 100%; max-width: 600px; } }

    .pointer { cursor: pointer; };

    &.lg { .image { max-height: 675px; } }
    &.md { .image { max-height: 562px; } }
    &.sm { .image { max-height: 450px; } }

    .noimage { border: 1px solid rgba(255, 255, 255, 0.1); }

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
    this.state = { loaded: loaded, error: false, refresh: false };
  }

  componentDidMount() {
    this.setState({ height: this.getHeight() });
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

  onClickEdit = (e) => {
    const { props } = this;
    if (props.edited) {
      props.onClick && props.onClick(e, props.eid)
    }
  }

  onClicked = (e) => {
    const { props } = this;
    !Util.isEmpty(props.link) && window.open(props.link)
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
        // case 'auto': return "100%";
        default: rate = "4:3"; break;
      }
    }
    // console.log(this.box.offsetHeight, this.box.offsetWidth);

    const temps = rate.split(":");
    const x = temps[0];
    const y = temps[1];
    const width = this.box.offsetWidth;
    const height = width * (y / x);
    return `${height}px`;
  }

  onReady = (event) => {
    // event.target.pauseVideo();
  }

  render() {
    const { props, state } = this;
    const { type = "image", playing = true, controls = true } = props;
    const pointer = !Util.isEmpty(props.link) ? 'pointer' : '';
    const renderContents = () => {
      const { error } = state;

      // const url = (props.url != null && props.url.charAt(0) != '/' ? `/${props.url}` : props.url);
      // const urldata = props.url.indexOf("data:") === 0 ? props.url : props.url;
      // const styled = {};
      // const opts = {
      //   height: '390', width: '640',
      //   playerVars: { autoplay: 1 }
      // }
      // const url = (type === CONT_TYPE.YOUTUBE) ? props.url.replace("https://youtu.be/", "") : props.url;

      if (error || !props.url) {
        return <img alt="img" className={cx('cont-frame', type, 'noimage')} src={IMG.NoimageBig} onLoad={this.onLoad}/>
      } else {
        return (
          <React.Fragment>
            {type === CONT_TYPE.IMAGE && <img alt="img" className={cx("cont-frame", type, pointer)}
              src={props.url} onLoad={this.onLoad} onError={this.onError} />}
            {type === CONT_TYPE.YOUTUBE && <YouTube className={cx("cont-frame", type)}
              style={{ width: "100%", height: "100%" }} url={props.url} playing={playing} controls={controls} playsinline loop />}
            {/* width={width} height={height} url={props.url} playing controls />} */}
            {type === CONT_TYPE.VIDEO && <ReactPlayer className={cx("cont-frame", type)}
              style={{ width: "100%", height: "100%" }} url={props.url} playing={playing} controls={controls} playsinline loop />}
            {type === CONT_TYPE.LINK && <img alt="link" className={cx("cont-frame", type, pointer)}
              src={props.url} onLoad={this.onLoad} onError={this.onError} />}
            {/* width={width} height={height} url={props.url} playing controls />} */}
            {/* {type === CONT_TYPE.PDF && <img alt="img" className={cx("cont-frame", type, pointer, 'adobe')}
              src={IMG.Pdf} url={props.link} onLoad={this.onLoad} onError={this.onError} />}
            {type === CONT_TYPE.PDF && <span className={cx("cont-frame", 'pdf-view')}>{ST.PDF_VIEW}</span>} */}
          </React.Fragment>
        )
      }
    }

    const height = (type === CONT_TYPE.IMAGE) ? "fit-contents" : this.state.height;

    return (
      <StyledObject ref={ref => { this.box = ref }} className={cx("media-box", props.className)} style={props.style} onClick={this.onClickEdit} height={height} >
        {renderContents()}
        {pointer && <Svg className="btn-down xxl box radius" onClick={this.onClicked} eid={EID.DOWM} name={"down"} color={'black'} />}
        {props.edited &&
          // <Button className="btn-media-edit primary md" title={ST.EDIT} onClick={() => this.box.click()} eid={EID.EDIT} />
          <Svg className="btn-media-edit xxl box radius" onClick={() => this.box.click()} eid={EID.EDIT} name={"media"} color={'white'} />
        }
      </StyledObject>
    )
  };
}