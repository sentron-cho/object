import * as React from "react";
import cx from 'classnames/bind';
import styled from 'styled-components';
import { EID, CONT_TYPE, ST } from './Config';
import { IMG } from "./Icons";
import { Button, Svg, Editbox, Mediabox, cs, Util } from './index';

const StyledObject = styled.div`{
  &.uploader {
    display: inline-block; width: 100%; height: 180px; position: relative; 
    
    .txt-title { display: inline-block; padding: 0; font-size: 12px; text-align: left; border: 0; font-weight: 500; margin-bottom: 5px;
    }

    .up-frame { height: calc(100% - 20px); width: 100%; cursor: pointer; position: relative;
      .in-value { height: 65px; width: 100%; background: #eaeaea; padding: 5px 10px; resize: none;
        color: rgba(0, 0, 0, 0.8); padding-right: 10px; border: 0;
        &.noti { color: rgba(255, 0, 0, 0.8); background: #feffb3; }
        &:focus, &:active { background: #d0d0d0; outline: none; box-shadow: none; }
        &:hover { background: #e0e0e0; }
      }

      .in-text { border: none; position: absolute; float: left; top: 0; left: 80px; height: 24px; width: calc(100% - 80px); }
      .sel-file { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); ${cs.opac.hide}
        border-radius: 50px; padding: 8px; background: #6d6d6d; ${cs.anim.show}
        &.svg-icon { width: 50px; height: 50px; }
      }

      .tab-grp { display: inline-block; padding: 3px; top: 5px; left: 5px;
        position: absolute; z-index: 100; border-radius: 5px; ${cs.opac.hide} ${cs.bg.alphablack}
        .tab-btn { margin: 0 3px; display: none;
          &.active { display: inline-block; }
        }
      }

      &:hover {
        .sel-file { background: #4a92e4; ${cs.opac.show} } 
        .tab-grp { ${cs.opac.show} ${cs.anim.show}
          .tab-btn { display: inline-block; } 
        }

        .info-box { ${cs.opac.show} ${cs.anim.show} }

        ${cs.anim.show}
      }
      
      .in-image { display: none; }
      
      .in-link { display: block; z-index: 999; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
        width: 100%; height: 100%; max-width: 400px; max-height: 200px; z-index: 99; resize: none; ${cs.opac.show}
        border: 1px solid #b9b9b9; border-radius: 5px; color: black;

        .link-btn { position: absolute; bottom: 5px; right: 5px; };
        .edit-box { height: 100%;
          .box { height: 100%;
            textarea { width: 100%; height: 100%; resize: none; border: none; border-radius: 5px; max-height: 100%; }
          }
        }
      }

      .preview-box { height: 80px; position: relative;
        .img-box { width: 100%; height: 100%; padding: 2px; object-fit: contain; border-radius: 5px; ${cs.bg.lightgray} }
        .btn-delete { float: right; right: 0; top: 0; position: absolute; z-index: 10; font-weight: 600; text-align: center; padding: 0px;
          background: rgba(256, 256, 256, 1); border-radius: 3px; height: 24px; width: 24px; border: 1px solid rgba(0, 0, 0, 0.2); opacity: 0.7;
        }
        // .noimage { background-image: url(${IMG.Nofile}); background-size: contain; background-repeat: no-repeat; display: block; background-position: center; }
      }
    }

    &.thumb { min-height: 140px; min-width: 120px; width: 100%; height: 100%; 
      .up-frame { 
        .preview-box { position: absolute; width: 100%; height: 100%; border: 1px solid rgba(0,0,0,0.1); border-radius: 5px;
          .img-box { object-fit: contain; }
        }
      }
      .txt-title, .in-value, in-image { display: none }
    }
    
    .info-box {
      position: absolute; bottom: 0; left: 0; width: 100%; padding: 5px 10px; font-size: 12px; text-align: left; 
      color: #d6d6d6; line-height: 14px; ${cs.opac.hide} ${cs.anim.show} ${cs.bg.alphablack}

      // &:hover { ${cs.opac.show} ${cs.anim.show} }

      p { overflow-x: hidden; text-overflow: ellipsis; white-space: nowrap; }
    }

    @media screen and (max-width : 860px) {
      padding: 0; font-size: 12px;
    }
  }
}`;

const getBase64 = (file, cb) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result)
  };
  reader.onerror = function (error) {
    console.error('Error: ', error);
  };
}

const NONE = '';
const MAGA = 1000000; //1MB

const isMedia = (type) => { return type === CONT_TYPE.VIDEO || type === CONT_TYPE.YOUTUBE };
// const isLink = (type) => { return type === CONT_TYPE.LINK };
// const isPdf = (type) => { return type === CONT_TYPE.PDF };
// const isYoutube = (type) => {return type === 'youtube' ? true : false},
// const isImage = (type) => {return type === 'image' ? true : false},

class Uploadbox extends React.PureComponent {
  constructor(props) {
    super(props);

    const { files, bufs, type, link='' } = this.createData(props);

    // base64경우 용량이 크면 딜레이가 발생하므로 화면 표시 이후에 로딩하자..
    // const load = bufs && bufs[0].indexOf('base64') > 0 ? false : true;

    this.state = {
      maxSize: 100 * MAGA,   //100M
      imageExt: '.jpg, .jpeg, .png', videoExt: '.mp3, .mp4, .mov, .avi', pdfExt: '.pdf',
      files: files, bufs: bufs, type: type, noti: '', modified: false, //load: load,
      textbox: false, link: link,
    };

    this.start = new Date();
    // console.log("start time = ", this.start);
  }

  createData = (props) => {
    const value = props.value && props.value.indexOf('base64') > 0 ? "base64 raw data!!" : props.value;
    const files = !props.value ? [{ 'name': NONE }] : [{ 'name': `${value}` }];
    const type = Util.isEmpty(props.type) ? 'image' : props.type;
    // const bufs = !props.value ? [] : [`${props.path ? props.path : ""}${props.value}`];
    let bufs = !props.value ? [] : [`${props.path ? props.path : ""}${props.value}`];

    //http로 시작하거나 base64 데이터면 그냥 데이터를 넣자...
    if (props.value.indexOf("http") === 0 || props.value.indexOf('base64') > 0) {
      bufs = [props.value]
    }

    return { files, bufs, type };
  }

  componentDidMount() {
    // if (!this.state.load) {
    //   setTimeout(() => this.setState({load: true}), 100);
    // }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      const { files, bufs, type } = this.createData(nextProps);
      this.setState({ files, bufs, type, modified: false });
    }
  }

  getValue = () => {
    if (this.state.files == null || Util.isEmpty(this.state.files[0].name)) {
      return null;
    } else {
      const buf = this.state.bufs[0];
      return buf.indexOf('base64') > 0 ? this.state.bufs[0] : this.state.files[0].name;
    }
  }

  isValidate = () => {
    if (this.props.validate != null && this.props.validate === false) return true;
    if (this.isEmpty()) { return this.showNoti(ST.NOTI.SELECT_IMAGE); }
    return true;
  };

  showNoti = (value) => {
    if (value != null && value.length > 0) {
      this.setState({ noti: value });
    } else {
      this.setState({ noti: this.props.noti });
    }
    setTimeout(() => this.refInput != null && this.refInput.focus(), 300);

    setTimeout(() => {
      if (this.state.noti) {
        this.setState({ noti: null });
      }
    }, 5000);

    return false;

    // this.setState({ 'noti': `${value}` });
  }

  isModified = () => (this.state.modified);

  isVideo = () => (isMedia(this.state.type));

  isEmpty = () => (this.state.bufs == null || this.state.bufs.length < 1 ? true : false)

  onClickClear = (e) => {
    // this.refImage.src = '';
    const { props } = this;

    const files = props.value === NONE || Util.isEmpty(props.value) ? [{ 'name': NONE }] : [{ 'name': `${props.value}` }];
    const bufs = props.value === NONE || Util.isEmpty(props.value) ? [] : [`${props.value}`];
    // const type = Util.isEmpty(props.type) ? 'image' : props.type;

    this.setState({ 'files': files, 'bufs': bufs, 'type': this.state.type, 'modified': false });
  }

  onClicked = (eid, e) => {
    const { type } = this.state;

    switch (type) {
      case CONT_TYPE.YOUTUBE:
      case CONT_TYPE.LINK:
        // console.dir("youtube");
        this.setState({ textbox: true });
        setTimeout(() => (this.refLink.focus()), 300)
        break;
      default:
        this.refInput.click();
        break;
    }
  }

  onClickLinkOk = (eid, e) => {
    const { props } = this;
    this.setState({ textbox: false });
    const result = this.refLink.getValue();
    e.currentTarget.setAttribute('name', props.name);
    const target = e.currentTarget;

    this.setState({ 'files': [{name: result}], 'bufs': [result], 'modified': true });
    (props.onChange != null) && props.onChange(result, target, result, this.state.type);
  }

  onChange = (e) => {
    const { props } = this;

    // picutreFiles에 boundery 정보가 return 되고,
    // pictureBase64 에 base64 정보가 return 된다. 기본 array로 return
    // const files = this.state.files.concat(filename);    // 다중 파일
    const { files } = e.currentTarget;
    let file = files && files[0] ? files[0] : null; // 무조건 첫번째 파일만
    if (!file) return;

    e.currentTarget.setAttribute('name', props.name);
    if (file.size >= this.state.maxSize) {
      file = null;
      this.setState({ 'noti': `${ST.OVER_MAX_SIZE}(${this.state.maxSize / MAGA}mb)` });
    } else {
      const target = e.currentTarget;
      getBase64(file, (result) => {
        this.setState({ 'files': [file], 'bufs': [result], 'modified': true });
        (props.onChange != null) && props.onChange(result, target, file, this.state.type);
      });
    }

    // e.currentTarget.setAttribute('name', this.props.name);
    // (props.onChange != null) && props.onChange(result, e, file, this.state.type);
  }

  onClickTag = (eid, e) => {
    // const eid = e.currentTarget.getAttribute("eid");
    this.setState({ 'files': [{ 'name': NONE }], 'bufs': [], 'type': eid, textbox: false });

    (this.props.onSelectedMedia != null) && this.props.onSelectedMedia(eid, e)
  }

  onLoadImage = () => {
    const { props, state } = this;

    if (state.modified) {
      const { naturalWidth, naturalHeight } = this.refImage;

      if (props.image_check) {
        const { width, height } = props.image_check;
        if (naturalWidth > width || naturalHeight > height) {
          const text = `[${width}px X ${height}px]`
          this.onClickClear();
          this.showNoti(`${text}${ST.ADVERT.SIZE_CHECK}`)
          // this.setState({ 'noti': `${text}${ST.ADVERT.SIZE_CHECK}` });
        }
      }
    }

    // console.log("onLoadImage = ", new Date().getTime() - this.start.getTime());
  }


  renderTabs = (enable) => {
    const { onClickTag } = this;
    const { type } = this.state;
    const CT = CONT_TYPE;
    const icolor = "white";

    if (enable) {
      return <div className={"tab-grp"}>
        <Svg className={cx("tab-btn md")} onClick={onClickTag} eid={CT.LINK} name={CT.LINK} color={icolor} active={type}/>
        <Svg className={cx("tab-btn md")} onClick={onClickTag} eid={CT.YOUTUBE} name={CT.YOUTUBE} color={icolor} active={type}/>
        <Svg className={cx("tab-btn md")} onClick={onClickTag} eid={CT.VIDEO} name={CT.VIDEO} color={icolor} active={type}/>
        <Svg className={cx("tab-btn md")} onClick={onClickTag} eid={CT.IMAGE} name={CT.IMAGE} color={icolor} active={type}/>
      </div>
    } else {
      return null;
    }
  }


  renderInfos = () => {
    if (this.props.thumbnail) {
      const { files } = this.state;
      const file = files && files[0] ? files[0] : null;
      if (file && file.name) {
        let { size = 0, name } = file;
        if (size > 0) {
          size = Number(size / 1000); //KB
          size = (size < 1000) ? `${size.toFixed(2)} KB` : `${Number(size / 1000).toFixed(2)} MB`;
          size = `(${size})`;
        } else {
          size = '';
        }

        return <div className={"info-box"} onClick={this.onClicked}>
          <p className={"i-name"}>{`${name}${size}`}</p>
          {/* <p className={"i-type"}>{`${type}${size}`}</p> */}
        </div>
      } else {
        return null;
      }
    }
  }

  render() {
    const { props } = this;
    const { onClickClear, onClicked, onChange, onClickLinkOk } = this;

    const { noti, type, modified, bufs, files, imageExt, videoExt, textbox, link } = this.state;
    const buf = bufs ? bufs[0] : ''; //isMedia(type) ? IMG.Media : isPdf(type) ? IMG.Pdf : bufs[0];
    const fileExt = isMedia(type) ? videoExt : imageExt; //isPdf(type) ? pdfExt : imageExt;
    const isAlert = !Util.isEmpty(noti) ? true : false;
    const filename = isAlert ? noti : files[0].name;
    const isMultiMidia = props.onSelectedMedia ? true : false;
    const oneline = props.inline === undefined || props.inline ? true : false;
    const thumb = props.thumbnail ? props.thumbnail : false;
    // const itype = type === CT.YOUTUBE ? 'text' : "file";

    return (
      <StyledObject className={cx("uploader", props.className, { oneline }, { thumb })} name={props.name} >
        {!thumb && <span className="txt-title">{props.label}</span>}
        <div className="up-frame">
          {/* 데이터 업로드용 input */}
          <input className={cx("in-image")} ref={ref => { this.refInput = ref }} type={"file"} accept={fileExt} name="" onChange={onChange} />
          <textarea className={cx("in-value", { noti })} onClick={onClicked} value={filename} readOnly={true} />

          {/* 미리보기(썸네일) 화면*/}
          <div className={cx("preview-box")}>
            <Svg className={cx("btn-delete sm", !modified ? 'hide' : '')} onClick={onClickClear} name={"close"} eid={EID.DELETE} color={'black'} />
            {/* {!loaded && <Loading className={"img-box"}/>} */}
            <Mediabox className={cx("img-box", type)} ref={ref => { this.refImage = ref }} link={link} type={type} url={buf} size={"full"}
              onClick={this.onClicked} onLoad={this.onLoadImage} onError={this.onError} eid={"url"} controls={false}/>
            {/* {buf && <img alt="img" ref={ref => { this.refImage = ref }} className={cx("img-box", type)} src={buf} onClick={onClicked} onLoad={onLoadImage} />}
            {!buf && <div className="img-box noimage" onClick={onClicked} />} */}
            {/* <Button className="primary sel-file xs" title={ST.SELECT_FILE} onClick={onClicked} eid={EID.OK} /> */}
            <Svg className={cx("sel-file xxl")} onClick={onClicked} name={"click"} eid={EID.OK} color={'white'} />

            {this.renderTabs(isMultiMidia)}
            {this.renderInfos()}
          </div>

          {/* url link용 태그 */}
          {textbox && <div className={cx("in-link")}>
            <Editbox ref={ref => { this.refLink = ref }} className={"link-area"} value={""} name="" type="text"
              guide={""} validate={false} multi={true} />
            {/* <textarea ref={ref => { this.refLink = ref }} className={"link-area"}></textarea> */}
            <Button className="link-btn primary sm" title={ST.OK} onClick={onClickLinkOk} eid={EID.OK} />
          </div>}

        </div>
      </StyledObject>
    )
  }
}

export default Uploadbox;