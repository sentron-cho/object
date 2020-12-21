/* eslint-disable react/no-direct-mutation-state */
import React from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import { Svg, cs } from './index';
import { Util } from './Utils';

const ST = {
  NOT: "문장안에 \" 대신 ' 를 사용하세요",
  // eslint-disable-next-line no-useless-escape
  NOT_TEXT: `특수문자( \\ ' \" ) 세개는 입력할 수 없습니다.`,
  NOT_JSON: `특수문자(" \\) 는 입력할 수 없습니다.`,
};

const StyledObject = styled.div` {
  &.edit-box {
    .box {
      ${cs.bg.trans} ${cs.w.full} ${cs.disp.get('inline-flex')} ${cs.pos.relative} ${cs.font.line(20)}
      
      .input {
        ${cs.bg.sky} ${cs.disp.inblock} ${cs.w.full} ${cs.p.get('6px 12px')}
        ${cs.min.height(14)} ${cs.max.height(200)} ${cs.border.get(0)}
        ${(props) => cs.font.size(props.fontsize)}
        ${(props) => props.bgcolor && cs.bg.color(props.bgcolor)};
        ${(props) => props.fontcolor && cs.font.color(props.fontcolor)};

        &:focus { ${cs.bg.get('#fffbcf')} ${cs.border.outline('none')} ${cs.border.shadow('none')} }
        &.noti { ${cs.border.red} }
        &::placeholder { ${cs.font.gray} ${cs.font.sm} }

        &.disable { ${cs.mouse.default} ${cs.border.none} ${cs.bg.darkgray} ${cs.font.dark}
          &:hover { ${cs.border.gray} }
          &:active { ${cs.border.gray} }
          &:focus { ${cs.border.gray} }
        }

        &:focus + .underline { ${cs.opac.show} ${cs.w.calc("100% - 10px")} ${cs.m.l5} ${cs.m.b2} ${cs.anim.get('width 180ms ease-out, opacity 120ms ease-in')} }

        &.readonly { ${cs.mouse.default} ${cs.border.none} ${cs.bg.alphagray}
          &:hover, &:active, &:focus { ${cs.bg.alphagray} }
          &:focus + .underline { ${cs.box.bottom(0)} }
        }
      }

      input.input { ${cs.resize.none} 
        &::-webkit-inner-spin-button, &::-webkit-outer-spin-button, &::-webkit-clear-button { -webkit-appearance: none; }
      }

      textarea.input { ${cs.h.get(100)} ${cs.font.prewrap} ${cs.resize.vertical} 
        ${(props) => props.height && cs.h.get(props.height)};
        ${(props) => props.height && `${cs.min.height(`calc(${props.height} * 0.5)`)}; ${cs.max.height(`calc(${props.height} * 2)`)}`};
        ${(props) => props.minheight && cs.min.height(props.minheight)};
        ${(props) => props.maxheight && cs.max.height(props.maxheight)};
        ${cs.scrollbar.t4}
      }

      .underline { ${cs.box.bottom(2)} ${cs.border.color(cs.color.primary)} ${cs.bottom(0)} ${cs.left(0)} ${cs.w.get(0)}
        ${cs.opac.invisible} ${cs.pos.absolute} 
        transition: opacity 120ms ease-out, width 0ms linear 180ms;
      }

      span.noti {
        ${cs.pos.absolute} ${cs.opac.show} ${cs.bottom(2)} ${cs.font.xs} ${cs.z.get(10)} ${cs.font.redhover}
        ${cs.z.over} ${cs.bg.get("#ffffff30")} ${cs.border.radius(3)} ${cs.bg.get('#fffbcfa0')} ${cs.font.line(14)}
        &.left { ${cs.left('5px')} }
        &.right { ${cs.right('5px')} }
      }


      .btn-clear { ${cs.pos.absolute} ${cs.right(5)} ${cs.bottom(5)} ${cs.mouse.pointer} 
        &.multi { ${cs.bottom('auto')} ${cs.top(5)} }
      }
    }

    .ed-label { 
      ${cs.disp.inblock} ${cs.p.a0} ${cs.font.sm} ${cs.font.left} 
      ${cs.border.none} ${cs.font.bold} ${cs.font.darkgray} 
    }

    .nb-help { ${cs.align.rtop} ${cs.font.xs} ${cs.font.gray} ${cs.top(-15)} }

    .ed-required {
      ${cs.font.red} ${cs.p.l2} ${cs.font.md} ${cs.font.thickbold} ${cs.pos.relative} ${cs.top(3)}
    }

    .guide { 
      ${cs.font.sm} ${cs.font.gray} ${cs.font.right} 
      ${(props) => cs.disp.get(props.helper || 'block')};
      ${(props) => props.helpcolor && cs.font.color(props.helpcolor)};
    }

    &.border .input { ${cs.box.light} ${(props) => props.bordercolor && cs.border.color(props.bordercolor)}; }
    &.radius .input { ${cs.box.radius} }

    &.transparent { 
      .box { ${cs.bg.trans}
        .input { ${cs.bg.trans} } 
      }
    }

    &.sizefix {
      .box { .input { ${cs.resize.none} } }
    }

    
    &.inline { ${cs.m.get('5px 0')}
      .ed-label { 
        ${cs.disp.inblock} ${cs.pos.absolute} ${cs.z.front} ${cs.max.width(100)} ${cs.p.h5}
        ${cs.font.primary} ${cs.m.top(-12)} ${cs.m.left(-8)} ${cs.opac.get(0.3)} ${cs.border.radius(3)}
      }

      .box {
        &:focus-within {
          .ed-label { ${cs.bg.trans} ${cs.opac.get(0.3)} ${cs.font.sm} }
          .ed-label.noti { ${cs.opac.hide} ${cs.anim.show} }
        }

        .input { ${cs.font.right} ${cs.p.top(6)} }
      }

      &:hover { .ed-label { ${cs.font.md} ${cs.opac.show} ${cs.anim.show} } }
    }

    &.xs .box input.input { ${cs.h.get(16)} ${cs.min.height(16)} ${cs.p.get('0 0px')} ${cs.font.line(14)} ${cs.font.xs} }
    &.sm .box input.input { ${cs.h.get(20)} ${cs.min.height(20)} ${cs.p.get('0 5px')} ${cs.font.line(18)} ${cs.font.sm} }
    &.lg .box input.input { ${cs.h.get(36)} ${cs.min.height(36)} ${cs.p.get('0 10px')} ${cs.font.line(32)} ${cs.font.lg} }
    &.xl .box input.input { ${cs.h.get(40)} ${cs.min.height(40)} ${cs.p.get('0 16px')} ${cs.font.line(40)} ${cs.font.xl} }

    &.trans { .input { ${cs.bg.trans} ${cs.font.black} &::placeholder { ${cs.font.gray} } &:focus { ${cs.bg.get('#fffbcf')} } } }
    &.white { .input { ${cs.bg.white} ${cs.font.black} &::placeholder { ${cs.font.gray} } &:focus { ${cs.bg.get('#fffbcf')} } } }
    &.sky { .input { ${cs.bg.sky} ${cs.font.black} &::placeholder { ${cs.font.gray} } &:focus { ${cs.bg.get('#fffbcf')} } } }
    &.orange { .input { ${cs.bg.orange} ${cs.font.white} &::placeholder { ${cs.font.lightgray} } &:focus { ${cs.bg.lightorange} } } }
    &.yellow { .input { ${cs.bg.yellow} ${cs.font.dark} &::placeholder { ${cs.font.lightgray} } &:focus { ${cs.bg.lightyellow} } } }
    &.green { .input { ${cs.bg.green} ${cs.font.white} &::placeholder { ${cs.font.lightgray} } &:focus { ${cs.bg.lightgreen} } } }
    &.red { .input { ${cs.bg.red} ${cs.font.white} &::placeholder { ${cs.font.lightgray} } &:focus { ${cs.bg.lightred} } } }
    &.primary { .input { ${cs.bg.primary} ${cs.font.white} &::placeholder { ${cs.font.lightgray} } &:focus { ${cs.bg.lightprimary} } } }
    &.gray { .input { ${cs.bg.darkwhite} ${cs.font.black} &::placeholder { ${cs.font.darkgray} } &:focus { ${cs.bg.lightwhite} } } }
    &.dark { .input { ${cs.bg.dark} ${cs.font.white} &:focus { ${cs.bg.darkgray} } } }
    &.black { .input { ${cs.bg.black} ${cs.font.white} &:focus { ${cs.bg.darkgray} } } }

    &.theme-sky { .input { ${cs.bg.sky} ${cs.font.black} &::placeholder { ${cs.font.gray} } &:focus { ${cs.bg.get('#fffbcf')} } } }
    &.theme-primary { .input { ${cs.bg.primary} ${cs.font.white} &::placeholder { ${cs.font.lightgray} } &:focus { ${cs.bg.primaryhover} } } }
    &.theme-gray { .input { ${cs.bg.lightgray} ${cs.font.black} &::placeholder { ${cs.font.darkgray} } &:focus { ${cs.bg.darkwhite} } } }
    &.theme-dark { .input { ${cs.bg.dark} ${cs.font.white} &:focus { ${cs.bg.darkgray} } } }
    &.theme-black { .input { ${cs.bg.black} ${cs.font.white} &:focus { ${cs.bg.darkgray} } } }

    &.scroll-t1 { .box > textarea.input { ${cs.scrollbar.t1} } }
    &.scroll-t2 { .box > textarea.input { ${cs.scrollbar.t2} } }
    &.scroll-t3 { .box > textarea.input { ${cs.scrollbar.t3} } }
    &.scroll-t4 { .box > textarea.input { ${cs.scrollbar.t4} } }
    
    &.center { .box .input { ${cs.font.center} } }
    &.right { .box .input { ${cs.font.right} } }
    &.left { .box .input { ${cs.font.left} } }
  
    @media screen and (max-width : 1024px) {}
  
    @media screen and (max-width : 600px) {}
}`;

class Editbox extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      noti: false, clear: false, notitext: '', modified: props.modified ? true : false,
      value: props.value ? props.value : ''
    };

    this.timer = null;
  }

  componentDidMount() {
    setTimeout(() => {
      if (!this.props.focus) return;
      this.input && this.input.focus();
    }, 200);
  }

  isNumeric(data) {
    return !isNaN(Number(data));
  }

  // 특수문자가 포함되어 있으면 true를 반환한다.
  // eslint-disable-next-line no-useless-escape
  checkFunc(exp = /[\\\'\"]/gi) {
    // const exp = /[\\\'\"]/gi;
    const { value } = this.input;
    return exp.test(value); // 형식에 맞는 경우 true 리턴
  }

  // 입력되지 말아야할 문자
  isValidate = (checkFunc = null, msg = ST.NOT_TEXT) => {
    const { validate, noti } = this.props;
    const { value, validationMessage } = this.input;

    // " 는 무조건 입력 못하도록 하자.. DB 입력시 오류 발생으로...
    if (checkFunc !== null) {
      if (checkFunc) { return this.showNoti(msg); };
    } else {
      if (value.indexOf('"') >= 0) { return this.showNoti(ST.NOT); }
    }

    // validation 체크이면...
    if (validate) {
      // 입력이 없으면
      if (noti && this.isEmpty()) { return this.showNoti(); }

      // 그외 타입 오류 및 기타 시스템 오류
      if (validationMessage) { return this.showNoti(validationMessage); };
    }

    return true;
  };

  isValidateJson = (noti = ST.NOT_JSON) => {
    const { validate } = this.props;
    const { value, validationMessage } = this.input;
    if (validate && !value) return this.showNoti(validationMessage);

    if (value.indexOf('"') >= 0) return this.showNoti(noti);
    if (value.indexOf('\\') >= 0) return this.showNoti(noti);
    if (validationMessage) { return this.showNoti(validationMessage); };
    
    return true;
  }

  componentWillUnmount = () => {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  isModified = () => (this.state.modified);

  getName = () => (this.input.name);

  getLabel = () => (this.props.label);

  getValue = () => (this.input.value);

  setValue = (v) => (this.setState({ value: v }));

  onFocused = (e) => {
    if (this.props.readonly) return;
    e.target.select();
  };

  onKeyPressed = (e) => {
    if (e.key === 'Enter') {
      if (this.props.onEnter != null)
        this.props.onEnter('ok', e, this.input.value);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.noupdate) return;

    this.state.value = nextProps.value != null ? nextProps.value : '';
  }

  isEmpty = () => (this.input.value == null || this.input.value.length < 1 ? true : false);

  showNoti = (value) => {
    if (value) {
      this.setState({ notitext: value, noti: true });
    } else {
      this.setState({ notitext: this.props.noti, noti: true });
    }

    this.input.focus();

    this.timer = setTimeout(() => {
      if (this.state.noti === true) {
        this.setState({ noti: false });
      }
    }, 5000);

    return false;
  }

  // getNoti = () => ( this.state.noti )

  // setNoti = (v) => ( this.setState({ noti: v }))

  focus = () => (this.input && this.input.focus())

  // select = () => ( this.input.select() )

  // clear = () => ( this.setState({ value: "" }) )

  onClear = (eid, e) => {
    this.setState({ value: '' }); this.focus();

    this.props.onChange && this.props.onChange('', e, this.props.label);
    this.props.onClear && this.props.onClear(this.props.value, e);
  }

  onChange = (e) => {
    this.state.modified = true;
    this.setState({ value: e.target.value, noti: false });

    this.props.onChange && this.props.onChange(e.target.value, e, this.props.label);
  }

  elemNoti = () => {
    let value = ST.NO_INPUT_VALUE;
    if (this.state.notitext != null && this.state.notitext.length > 1) {
      value = this.state.notitext;
    }

    const { type, inline } = this.props;
    let align = type && type.indexOf('number') >= 0 ? 'left' : 'right';
    if (inline) { align = 'left'; };
    if (this.props.className != null && this.props.className.indexOf('right') > -1) {
      align = 'left';
    }

    if (this.state.noti) {
      return <span className={cx('noti', align)}>{value}</span>;
    }

    return null;
  }

  elemInput() {
    const { props, state } = this;
    const { noti } = state;
    const { disabled = false } = props;
    const { disable = disabled, border, readonly, type, guide, placeholder = null } = props;

    let addedClass = '';
    let attr = { spellCheck: false };
    attr.placeholder = (!readonly && !disable) ? guide : null;
    if (placeholder) attr.placeholder = placeholder;

    const right = type && type.indexOf('number') >= 0 ? 'right' : '';
    if (type === 'date') {
      addedClass = 'input-date';
      attr = { 'data-date-format': 'yyyy-mm-dd' };
    }

    attr.required = props.required || props.validate ? true : false;
    attr.disabled = disable ? true : false;

    if (props.multi) {
      return <textarea
        ref={(ref) => { this.input = ref; }}
        name={props.name}
        className={cx('input', { noti }, addedClass, { disable }, { readonly }, { border }, { right })}
        type={'text'}
        value={state.value}
        onChange={this.onChange}
        maxLength={props.maxLength}
        min={props.min}
        max={props.max}
        accept={props.accept}
        required={attr.required}
        autoComplete={props.autoComplete ? 'on' : 'off'}
        readOnly={props.readonly ? true : false}
        {...attr}
        onKeyPress={this.onKeyPressed}
        onFocus={this.onFocused}
        modefied={state.modified.toString()} />;
    } else {
      return (<input
        ref={(ref) => { this.input = ref; }}
        name={props.name}
        className={cx('input', { noti }, addedClass, { disable }, { border }, { readonly }, { right })}
        type={type === 'phone' ? 'number' : type || 'text'}
        value={state.value != null ? this.state.value : ''}
        onChange={this.onChange}
        maxLength={props.maxLength}
        min={props.min}
        max={props.max}
        accept={props.accept}
        required={attr.required}
        autoComplete={props.autoComplete ? 'on' : 'off'}
        readOnly={props.readonly}
        {...attr}
        onKeyPress={this.onKeyPressed}
        onFocus={this.onFocused}
        modefied={state.modified.toString()} />)
    }
  }

  render() {
    const { props, state } = this;
    const { noti } = state;
    const { disabled = false, theme, preview = true } = props;
    const {
      disable = disabled, readonly, inline, multi,
      fontsize = '14px', height = '80px', minheight, maxheight,
      bordercolor, helpcolor, bgcolor, fontcolor, validate
    } = props;

    return (
      <StyledObject className={cx('edit-box', props.className, { inline }, theme && `theme-${theme}`)}
        height={height} fontsize={fontsize} maxheight={maxheight} minheight={minheight}
        helpcolor={helpcolor} bordercolor={bordercolor} bgcolor={bgcolor} fontcolor={fontcolor} style={props.style}>
        {props.label && !inline && <label className="ed-label">{props.label}
          {validate && <span className="ed-required">*</span>}
        </label>}
        <div className={cx('box', { disable }, { readonly })} >
          {props.label && inline && <label className={cx('ed-label', { noti })}>{props.label}</label>}
          {this.elemInput()}
          {preview && props.type === 'number' && this.state.value > 999 && <span className={'nb-help'}>{Util.commas(this.state.value)}</span>}
          {preview && props.type === 'phone' && this.state.value.length >= 10 && <span className={'nb-help'}>{Util.toStringPhone(this.state.value)}</span>}
          {!readonly && <div className="underline"></div>}
          {this.elemNoti()}
          {(props.onClear || props.clear) && <Svg className={cx('btn-clear sm', { multi })} onClick={this.onClear} name={'clear'} color={'black'} />
          }
        </div>
        {props.helper && <div className="guide">{props.helper}</div>}
      </StyledObject>
    );
  }
}

export default Editbox;
