/* eslint-disable react/no-direct-mutation-state */
import React from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import { ST } from './Config';
import { Svg, cs } from './index';

const StyledObject = styled.div` {
  &.edit-box { ${cs.font.white} margin-top: ${(props) => props.mTop}; margin: ${(props) => props.margin};

    .box { ${cs.bg.trans} ${cs.w.full} ${cs.disp.get("inline-flex")} ${cs.pos.relative} ${cs.font.line(20)}
      .input {
        ${cs.bg.sky} ${cs.disp.inblock} ${cs.w.full} ${cs.h.get(34)} ${cs.p.get("6px 12px")}
        ${cs.min.height(34)} ${cs.max.height(200)} ${cs.border.get(0)}
        ${(props) => cs.font.size(props.fontsize)} //${cs.font.md}

        &:focus { ${cs.bg.get("#fffbcf")} outline: none; box-shadow: none; }
        &.noti { ${cs.border.red} }
        &::placeholder { ${cs.font.gray} ${cs.font.sm} }

        &.disable { ${cs.mouse.default} ${cs.border.none} ${cs.bg.darkgray} ${cs.font.dark}
          &:hover { ${cs.border.gray} }
          &:active { ${cs.border.gray} }
          &:focus { ${cs.border.gray} }
        }

        &:focus + .underline { ${cs.opac.show} ${cs.w.full} ${cs.anim.get("width 180ms ease-out, opacity 120ms ease-in") } }

        &.readonly { ${cs.mouse.default} ${cs.border.none} ${cs.bg.get("rgb(190, 190, 190, 0.9)")}
          &:hover { ${cs.bg.get("rgb(190, 190, 190, 0.9)")} }
          &:active { ${cs.bg.get("rgb(190, 190, 190, 0.9)")} }
          &:focus { ${cs.bg.get("rgb(190, 190, 190, 0.9)")} }

          &:focus + .underline { border-bottom: 0px; }
        }

        &.right { text-align: right; }
      }

      input.input { resize: none; }

      textarea.input { height: 100px; white-space: pre-wrap; resize: vertical;
        height: ${(props) => props.height};
        ${({ height }) => height && `min-height: calc(${height} * 0.5); max-height: calc(${height} * 2);`};
        ${(props) => props.minheight && `min-height: ${props.minheight};`};
        ${(props) => props.maxheight && `max-height: ${props.maxheight};`};
      }

      .underline { border-bottom: 2px solid rgb(26, 115, 232); bottom: 0; box-sizing: border-box; left: 0; margin: auto;
        ${cs.opac.invisible} ${cs.pos.absolute} right: 0; transition: opacity 120ms ease-out, width 0ms linear 180ms; width: 0;
      }

      span.noti {
        color: red; ${cs.pos.absolute} ${cs.opac.show} bottom: 2px; font-size: 10px; z-index: 10;
        &.left { ${cs.left("5px")} }
        &.right { ${cs.right("5px")} }
      }


      .btn-clear { ${cs.pos.absolute} right: 5px; bottom: 5px; cursor: pointer; }
    }

    // &.right { .input { text-align: right; } box span.noti { }
    &.right { .input { text-align: right; } }
    &.border { .input {border: 1px solid #c0c0c0;} }

    &.transparent { 
      .box { ${cs.bg.trans}
        .input { ${cs.bg.trans} } 
      }
    }
  }

  &.sm {
    .box {
      .input { height: 20px; min-height: 20px; padding: 0 5px; line-height: 18px; font-size: 12px; }
    }
  }

  &.sizefix {
    .box { .input { resize: none; } }
  }

  .ed-label { ${cs.disp.inblock} ${cs.p.a0} ${cs.font.sm} ${cs.font.left} ${cs.border.none} ${cs.font.bold} }
  .guide { margin: 0; font-size: 12px; color: #aaa; text-align: right; display: ${cs.disp.get((props) => props.helper && `block`)}

  &.inline { ${cs.m.get("5px 0")}
    .ed-label { 
      ${cs.disp.inblock} ${cs.pos.absolute} ${cs.z.front} ${cs.max.width(100)} ${cs.m.a2} ${cs.font.color("rgba(0, 87, 200, 0.95)")}
    }

    .box {
      &:focus-within { 
        .ed-label { ${cs.font.xs} ${cs.anim.get("scale(0.7) 150ms ease-in")} 
        .ed-label.noti { ${cs.opac.hide} ${cs.anim.show} }
      }

      .input { text-align: right; padding-top: 16px; }      
    }
  }

  @media screen and (max-width : 1024px) {}

  @media screen and (max-width : 600px) {}
}`;

class Editbox extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      noti: false, clear: false, noti_value: '', modified: props.modified ? true : false,
      value: props.value ? props.value : ''
    }

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

  isValidate = () => {
    const { validate, noti } = this.props;
    const { value, validationMessage } = this.input;

    // 숫자 타입에서 숫자가 아닌 값이 입력될 경우.
    // if (type.indexOf("number") >= 0 && value && !this.isNumeric(value)) {
    //   return this.showNoti(ST.NOTI.ONLY_NUMBER);
    // }

    // " 는 무조건 입력 못하도록 하자.. DB 입력시 오류 발생으로...
    if (value.indexOf('"') >= 0) { return this.showNoti(ST.NOTI.NOT_DOUBLE_QUARTER); }
    
    // validation 체크이면...
    if (validate) {
      // 입력이 없으면
      if (noti && this.isEmpty()) { return this.showNoti(); }

      // 숫자 타입에서 숫자가 아닌 값이 입력될 경우.
      // if (type.indexOf("number") >= 0 && !this.isNumeric(value)) {
      //   return this.showNoti(ST.NOTI.ONLY_NUMBER);
      // }

      // 그외 타입 오류 및 기타 시스템 오류
      if (validationMessage) { return this.showNoti(validationMessage) };
    }

    return true;
  };

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
        this.props.onEnter('ok', e);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.state.value = nextProps.value != null ? nextProps.value : '';
  }

  isEmpty = () => (this.input.value == null || this.input.value.length < 1 ? true : false);

  showNoti = (value) => {
    if (value) {
      this.setState({ noti_value: value, noti: true });
    } else {
      this.setState({ noti_value: this.props.noti, noti: true });
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
    this.setState({ value: "" }); this.focus();
    this.props.onChange && this.props.onChange("", e);
  }

  onChange = (e) => {
    this.state.modified = true;
    this.setState({ value: e.target.value, noti: false });

    this.props.onChange && this.props.onChange(e.target.value, e);
  }

  elemNoti = () => {
    let value = ST.NO_INPUT_VALUE;
    if (this.state.noti_value != null && this.state.noti_value.length > 1) {
      value = this.state.noti_value;
    }

    const { type, inline } = this.props;
    let align = type && type.indexOf("number") >= 0 ? 'left' : 'right';
    if (inline) { align = 'left' };
    if (this.props.className != null && this.props.className.indexOf("right") > -1) {
      align = "left";
    }

    if (this.state.noti) {
      return <span className={cx("noti", align)}>{value}</span>
    }

    return null;
  }

  elemInput() {
    const { props, state } = this;
    const { noti } = state;
    const { disable, border, readonly, type, guide } = props;

    let addedClass = "";
    let attr = { spellCheck: false };
    attr.placeholder = (!readonly && !disable) ? guide : null;

    const right = type && type.indexOf("number") >= 0 ? 'right' : '';
    if (type === "date") {
      addedClass = "input-date";
      attr = { 'data-date-format': 'yyyy-mm-dd' }
    }

    attr.required = props.required || props.validate ? true : false;
    attr.disabled = disable ? true : false;

    if (props.multi) {
      return <textarea
        ref={(ref) => { this.input = ref }}
        name={props.name}
        className={cx("input scrollbar-4", { noti }, addedClass, { disable }, { readonly }, { border }, { right })}
        type={type ? type : 'text'}
        value={state.value}
        onChange={this.onChange}
        maxLength={props.maxLength}
        min={props.min}
        max={props.max}
        accept={props.accept}
        required={attr.required}
        autoComplete={props.autoComplete ? "on" : "off"}
        readOnly={props.readonly ? true : false}
        {...attr}
        onKeyPress={this.onKeyPressed}
        onFocus={this.onFocused}
        modefied={state.modified.toString()} />
    } else {
      return <input
        ref={(ref) => { this.input = ref }}
        name={props.name}
        className={cx("input", { noti }, addedClass, { disable }, { border }, { readonly }, { right })}
        type={type ? type : 'text'}
        value={state.value != null ? this.state.value : ''}
        onChange={this.onChange}
        maxLength={props.maxLength}
        min={props.min}
        max={props.max}
        accept={props.accept}
        required={attr.required}
        autoComplete={props.autoComplete ? "on" : "off"}
        readOnly={props.readonly}
        {...attr}
        onKeyPress={this.onKeyPressed}
        onFocus={this.onFocused}
        modefied={state.modified.toString()} />
    }
  }

  render() {
    const { props, state } = this;
    const { noti } = state;
    const { disable, readonly, inline, fontsize="14px", height, minheight, maxheight } = props;

    return (
      <StyledObject className={cx('edit-box', props.className, { inline })} height={height} fontsize={fontsize}
        maxheight={maxheight} minheight={minheight} style={props.style}>
        {props.label && !inline && <label className="ed-label">{props.label}</label>}
        <div className={cx("box", { disable }, { readonly })} >
          {props.label && inline && <label className={cx("ed-label", { noti })}>{props.label}</label>}
          {this.elemInput()}
          {!readonly && <div className="underline"></div>}
          {this.elemNoti()}
          {(props.onClear || props.clear) && <Svg className="btn-clear sm" onClick={this.onClear} name={"clear"} color={'black'} />
          }
        </div>
        {props.helper && <div className="guide">{props.helper}</div>}
      </StyledObject>
    )
  }
}

export default Editbox;