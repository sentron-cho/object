import * as React from "react";
import cx from 'classnames/bind';
import styled from 'styled-components';
import { EID, CONT_TYPE, ST } from './Config';
import { Button, Svg, Editbox, Mediabox, cs, Util } from './index';

const StyledObject = styled.div`{
  &.uploader {
    ${cs.disp.inblock} ${cs.w.full} ${cs.pos.relative} ${({ height }) => cs.h.get(height)} ${cs.box.inner}
    ${cs.noliststyle} ${cs.noselect} ${cs.over.hidden}

    .up-title { ${cs.disp.inblock} ${cs.p.a0} ${cs.font.sm} ${cs.font.left} ${cs.border.none} ${cs.m.b5} }

    .up-frame { 
      ${cs.h.calc('100% - 20px')} ${cs.w.full} ${cs.mouse.pointer} ${cs.pos.relative}

      .upf-value { 
        ${cs.h.get(65)} ${cs.w.full} ${cs.bg.lightgray} ${cs.p.get('5px 10px')} ${cs.resize.none}
        ${cs.font.lightwhite} ${cs.p.r10} ${cs.border.none}
        
        &:focus, &:active { ${cs.bg.lightgray} ${cs.border.outline('none')} ${cs.border.shadow('none')} }
        &:hover { ${cs.bg.lightgray} }
      }

      .upf-tabs { 
        ${cs.disp.inblock} ${cs.p.a3} ${cs.top(5)} ${cs.left(5)} ${cs.bg.alphablack}
        ${cs.pos.absolute} ${cs.z.over} ${cs.border.radius(5)} ${cs.opac.hide} 
        .upt-btn { ${cs.m.get('0 3px')} ${cs.disp.none}
          &.active { ${cs.disp.inblock} }
        }
      }

      .upf-preview { 
        ${cs.h.get(80)} ${cs.pos.relative}

        .upv-file {
          ${cs.pos.absolute} ${cs.align.center} ${cs.border.radius(50)} ${cs.p.get(8)} ${cs.bg.dark}
          ${cs.opac.hide} ${cs.anim.show}
          &.svg-icon { ${cs.size.get(50)} }
        }

        .upv-img { ${cs.size.full} ${cs.p.a2} ${cs.object.fit()} ${cs.border.radius(5)} ${cs.bg.lightgray} 
          .btn-media-edit { ${cs.disp.none} }
        }
        .upv-clear { 
          ${cs.align.rtop} ${cs.z.icon} ${cs.font.weight(600)} ${cs.font.center} ${cs.p.a0}
          ${cs.border.radius(3)} ${cs.icon.md} ${cs.box.lightgray} ${cs.opac.get(0.7)} ${cs.m.a3}
          &.hide { ${cs.disp.none} }
        }
        .upv-delete {
          ${cs.align.rbottom} ${cs.z.icon} ${cs.font.weight(600)}
          &.hide { ${cs.disp.none} }
        }
        .noimage { ${cs.object.contain} ${cs.opac.visible} }
        .upv-noti { ${cs.font.red} ${cs.box.radius} ${cs.bottom(10)} ${cs.bg.alphablack}
          ${cs.z.over} ${cs.align.xcenter} ${cs.min.w('fit-content')} ${cs.max.w('calc(100% - 10px)')} 
          ${cs.font.sm} ${cs.font.line(14)} ${cs.p.h10} ${cs.p.v5} ${cs.h.fit} ${cs.font.center}
        }
        .upv-help { ${cs.font.orange} ${cs.box.radius} ${cs.top(5)} ${cs.w.fit} ${cs.p.h10} ${cs.p.v3}
          ${cs.z.over} ${cs.align.xcenter} ${cs.bg.alphablack} ${cs.border.radius(3)} ${cs.font.sm}
        }

        .ibtn { ${cs.align.rbottom} ${cs.bottom(15)} ${cs.right(10)} 
          ${cs.bg.alphagray} ${cs.border.alphablack}
          .svg { ${cs.p.a0} } 
        }
      }

      &:hover {
        .upf-preview { .upv-file { ${cs.bg.darkhover} ${cs.opac.show} } }
        .upf-tabs { ${cs.opac.show} ${cs.anim.show}
          .upt-btn { ${cs.disp.inblock} } 
        }

        .upf-info { ${cs.opac.show} ${cs.anim.show} }

        ${cs.anim.show}
      }
      
      .upf-image { ${cs.disp.none} }
      
      .upf-link { 
        display: block; z-index: 999; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
        width: 100%; height: 100%; max-width: 400px; max-height: 200px; z-index: 99; resize: none; ${cs.opac.show}
        border: 1px solid #b9b9b9; border-radius: 5px; color: black;

        .upl-btn { position: absolute; bottom: 5px; right: 5px; };
        
        .edit-box { height: 100%;
          .box { height: 100%;
            textarea { width: 100%; height: 100%; resize: none; border: none; border-radius: 5px; max-height: 100%; }
          }
        }
      }
    }

    &.thumb { 
      .up-frame { ${cs.size.full}
        .upf-preview { 
          position: absolute; width: 100%; height: 100%; border: 1px solid rgba(0,0,0,0.1); border-radius: 5px;
          .upv-img { ${cs.object.contain} }
        }
      }
      .up-title, .upf-value, upf-image { display: none }
    }

    &:not(.full) {
      &.xs { 
        ${cs.size.normal(240)}
        &.wide { ${cs.size.wide(240)} }
        &.xwide { ${cs.size.xwide(240)} }
      }
      &.sm { 
        ${cs.size.normal(320)}
        &.wide { ${cs.size.wide(320)} }
        &.xwide { ${cs.size.xwide(320)} }
      }
      &.md { 
        ${cs.size.normal(480)}
        &.wide { ${cs.size.wide(480)} }
        &.xwide { ${cs.size.xwide(480)} }
      }
      &.lg { 
        ${cs.size.normal(640)}
        &.wide { ${cs.size.wide(640)} }
        &.xwide { ${cs.size.xwide(640)} }
      }
      &.xl { 
        ${cs.size.normal(800)}
        &.wide { ${cs.size.wide(800)} }
        &.xwide { ${cs.size.xwide(800)} }
      }
      &.xxl { 
        ${cs.size.normal(1024)}
        &.wide { ${cs.size.wide(1024)} }
        &.xwide { ${cs.size.xwide(1024)} }
      }
      &.wl { 
        ${cs.size.normal(1280)}
        &.wide { ${cs.size.wide(1280)} }
        &.xwide { ${cs.size.xwide(1280)} }
      }
    }

    &.full { ${cs.size.full}
      &.xs { ${cs.h.get(240)} }
      &.sm { ${cs.h.get(320)} }
      &.md { ${cs.h.get(480)} }
      &.lg { ${cs.h.get(640)} }
      &.xl { ${cs.h.get(800)} }
    }

    &.border { ${cs.box.line} }
    &.radius { ${cs.box.radius} }

    ${({ border }) => border && cs.box.line}
    ${({ border }) => border && border.color && cs.border.color(border.color)}
    ${({ border }) => border && border.radius && cs.border.radius(border.radius)}
    ${({ border }) => border && border.width && cs.border.width(border.width)}

    &.sky { .up-frame .upf-preview .upv-img { ${cs.bg.sky} } }
    &.primary { .up-frame .upf-preview .upv-img { ${cs.bg.primary} } .upv-clear { .svg-path { ${cs.fill.white} } } }
    &.gray { .up-frame .upf-preview .upv-img { ${cs.bg.gray} } .upv-clear { .svg-path { ${cs.fill.white} } } }
    &.dark { .up-frame .upf-preview .upv-img { ${cs.bg.dark} } .upv-clear { .svg-path { ${cs.fill.white} } } }
    &.black { .up-frame .upf-preview .upv-img { ${cs.bg.black} } .upv-clear { .svg-path { ${cs.fill.white} } } }

    &.theme-sky { .up-frame .upf-preview .upv-img { ${cs.bg.sky} } }
    &.theme-primary { .up-frame .upf-preview .upv-img { ${cs.bg.primary} } .upv-clear { .svg-path { ${cs.fill.white} } } }
    &.theme-gray { .up-frame .upf-preview .upv-img { ${cs.bg.gray} } .upv-clear { .svg-path { ${cs.fill.white} } } }
    &.theme-dark { .up-frame .upf-preview .upv-img { ${cs.bg.dark} } .upv-clear { .svg-path { ${cs.fill.white} } } }
    &.theme-black { .up-frame .upf-preview .upv-img { ${cs.bg.black} } .upv-clear { .svg-path { ${cs.fill.white} } } }

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
const MAGA = 1 * 1000 * 1000; //1MB

const isMedia = (type) => { return type === CONT_TYPE.VIDEO || type === CONT_TYPE.YOUTUBE };

var ftimer = null;
var ntimer = null;

class Uploadbox extends React.PureComponent {
  constructor(props) {
    super(props);
    const { files, bufs, type, link = '' } = this.createData(props);

    // base64경우 용량이 크면 딜레이가 발생하므로 화면 표시 이후에 로딩하자..
    // const load = bufs && bufs[0].indexOf('base64') > 0 ? false : true;
    this.state = {
      maxSize: 100 * MAGA,   //100M
      imageExt: '.jpg, .jpeg, .png, .gif', videoExt: '.mp3, .mp4, .mov, .avi',
      files: files, bufs: bufs, type: type, noti: '', modified: false,
      textbox: false, link: link, refresh: false,
    };

    this.start = new Date();
  }

  createData = (props) => {
    const { value } = props;
    const data = value && value.indexOf('base64') >= 0 ? "base64 raw data!!" : value;
    const files = !value ? [{ 'name': NONE }] : [{ 'name': `${data}` }];
    const type = Util.isEmpty(props.type) ? 'image' : props.type;
    let bufs = !value ? [] : [`${value}`];

    //http로 시작하거나 base64 데이터면 그냥 데이터를 넣자...
    if (value && (value.indexOf("http") === 0 || value.indexOf('base64') >= 0)) {
      bufs = [value];
    }

    return { files, bufs, type };
  }

  componentDidMount() {
    // if (!this.state.load) {
    //   setTimeout(() => this.setState({load: true}), 100);
    // }
    // this.setState({ noti: `${ST.NOTI.SIZE_CHECK('100 * 100')}` });
  }

  componentWillUnmount() {
    ntimer && clearTimeout(ntimer);
    ftimer && clearTimeout(ftimer);
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
      return buf.indexOf('base64') >= 0 ? this.state.bufs[0] : this.state.files[0].name;
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

    ftimer = setTimeout(() => this.refInput != null && this.refInput.focus(), 300);
    ntimer = setTimeout(() => (this.state.noti) && this.setState({ noti: null }), 5000);

    return false;
  }

  isModified = () => (this.state.modified);

  isVideo = () => (isMedia(this.state.type));

  isEmpty = () => (this.state.bufs == null || this.state.bufs.length < 1 ? true : false)

  onClickClear = (e) => {
    const { props } = this;

    // const files = props.value === NONE || Util.isEmpty(props.value) ? [{ 'name': NONE }] : [{ 'name': `${props.value}` }];
    // const bufs = props.value === NONE || Util.isEmpty(props.value) ? [] : [`${props.value}`];

    const files = props.value === this.state.bufs[0] || !this.state.bufs[0] ? [{ 'name': NONE }] : [{ 'name': `${props.value}` }];
    const bufs = props.value === this.state.bufs[0] || !this.state.bufs[0] ? [] : [`${props.value}`];

    // if(props.value !== this.state.bufs[0])

    this.setState({ 'files': files, 'bufs': bufs, 'type': this.state.type, 'modified': false, refresh: true });
    setTimeout(() => this.setState({ refresh: false }), 200);
    props.onChange && props.onChange((bufs && bufs[0]) || '', e, this.state.type);
  }

  onClicked = (eid, e) => {
    e && e.stopPropagation();
    const { type } = this.state;

    switch (type) {
      case CONT_TYPE.YOUTUBE:
      case CONT_TYPE.LINK:
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

    this.setState({ 'files': [{ name: result }], 'bufs': [result], 'modified': true });
    props.onChange && props.onChange(result, target, result, this.state.type);
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

  onLoadImage = (e) => {
    const { props, state } = this;

    if (state.modified && e && e.currentTarget) {
      const { naturalWidth, naturalHeight } = e.currentTarget;

      const maxImage = props.maxImage || props.image_check;
      if (maxImage) {
        const { width, height } = maxImage;
        const w = String(width).replace('px', '');
        const h = String(height).replace('px', '');

        if (Number(naturalWidth) > Number(w) || Number(naturalHeight) > Number(h)) {
          const text = `${width}px X ${height}px`
          setTimeout(() => this.onClickClear(e), 1000);
          this.showNoti(`${ST.NOTI.SIZE_CHECK(text)}`)
        }
      }
    }
  }


  renderTabs = (enable) => {
    const { onClickTag } = this;
    const { type } = this.state;
    const CT = CONT_TYPE;
    const icolor = "white";

    if (enable) {
      return <div className={"upf-tabs"}>
        <Svg className={cx("upt-btn md")} onClick={onClickTag} eid={CT.LINK} name={CT.LINK} color={icolor} active={type} />
        <Svg className={cx("upt-btn md")} onClick={onClickTag} eid={CT.YOUTUBE} name={CT.YOUTUBE} color={icolor} active={type} />
        <Svg className={cx("upt-btn md")} onClick={onClickTag} eid={CT.VIDEO} name={CT.VIDEO} color={icolor} active={type} />
        <Svg className={cx("upt-btn md")} onClick={onClickTag} eid={CT.IMAGE} name={CT.IMAGE} color={icolor} active={type} />
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

        return <div className={"upf-info"} onClick={(e) => this.onClicked('click', e)}>
          <p className={"upi-name"}>{`${name}${size}`}</p>
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
    const { height = 180, theme, className, name, label, inline = false, thumbnail = true, border = null, size = '', imagestyle, path } = props;

    const { noti, type, bufs, imageExt, videoExt, textbox, link, refresh } = this.state;
    const buf = bufs ? bufs[0] : '';
    const fileExt = isMedia(type) ? videoExt : imageExt;
    const isMultiMidia = props.onSelectedMedia ? true : false;
    const oneline = inline;
    const thumb = thumbnail;
    const fit = props.fit ? props.fit : thumb ? 'contain' : 'cover';
    // const itype = type === CT.YOUTUBE ? 'text' : "file";

    return (
      <StyledObject className={cx("uploader", className, { oneline }, { thumb }, theme && `theme-${theme}`, size)}
        name={name} height={height} border={border}>
        {!thumb && <span className="up-title">{label}</span>}

        <div className="up-frame">
          {/* 데이터 업로드용 input */}
          {!refresh && <input className={cx("upf-image")} ref={ref => { this.refInput = ref }} type={"file"} accept={fileExt} name="" onChange={onChange} />}
          {/* <textarea className={cx("upf-value", { noti })} onClick={onClicked} value={filename} readOnly={true} /> */}

          {/* 미리보기(썸네일) 화면*/}
          <div className={cx("upf-preview")}>
            {/* <Svg className={cx("upv-clear sm", !modified ? 'hide' : '')} onClick={onClickClear} name={"cancel"} eid={EID.CLEAR} color={'dark'} /> */}
            <Svg className={cx("upv-clear md border box radius", !buf ? 'hide' : '')} onClick={onClickClear} name={"cancel"} eid={EID.CLEAR} color={'white'} />
            <Svg className={cx("upv-delete sm", !props.onDelete ? 'hide' : '')} name={"delete"} eid={EID.DELETE} color={'dark'}
              onClick={(e) => props.onDelete && props.onDelete('delete', e)} />
            <Mediabox className={cx("upv-img", type)} fit={fit}
              link={link} type={type} url={path && buf && buf.indexOf('base64') < 0 ? `${path}${buf}` : buf} size={"full"} 
              maxHeight={"auto"} controls={false} edited={true}
              onClick={onClicked} onLoad={this.onLoadImage} onError={this.onError} eid={"url"} imagestyle={imagestyle} />
            <Svg className={cx("upv-file xxl")} onClick={onClicked} name={"click"} eid={EID.OK} color={'white'} />

            {props.helpSize && <span className={'upv-help'}>{props.helpSize}</span>}
            {noti && <span className={'upv-noti'}>{noti}</span>}
            {this.renderTabs(isMultiMidia)}
            {this.renderInfos()}

            {props.onClickLinked && <Svg className={cx('ibtn border box radius', 'white', 'lg')} icon={'link'} onClick={props.onClickLinked} />}
          </div>

          {/* url link용 태그 */}
          {textbox && <div className={cx("upf-link")}>
            <Editbox ref={ref => { this.refLink = ref }} className={"upl-area"} value={""} name="" type="text"
              guide={""} validate={false} multi={true} />
            <Button className="upl-btn primary sm" title={ST.OK} onClick={onClickLinkOk} eid={EID.OK} />
          </div>}
        </div>
      </StyledObject>
    )
  }
}

export default Uploadbox;