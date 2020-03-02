import React from 'react';
import cx from 'classnames/bind';
import styled from 'styled-components';
import { CompactPicker } from 'react-color';
import { Svg } from './index'

const StyledObject = styled.div` {
  &.color-box {
    .picker-box { width: 100% !important; }
    .label { display: inline-block; padding: 0; font-size: 12px; text-align: left; border: 0; font-weight: 500;}
    input { background: #eaeaea !important; }

    .btn-clear { float: right; right: 15px; bottom: 15px; position: absolute; }

    &.white {
      & > div > div:first-child { background: #ffffff !important; border: 1px solid #8e8e8e !important; }
    }

    &.black {
      & > div > div:first-child { background: #212121 !important; border: 1px solid #8c8c8cc9 !important; }
    }
    
    &.no-shadow {
      & > div > div:first-child { border: 1px solid #eaeaea; box-shadow: none; box-shadow: none !important; }
    }

    @media screen and (max-width : 860px) {
    }
  }
}`;

export default class Colorbox extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { list: props.list, noti: false, noti_value: '', modified: false, value: props.value ? props.value : "", color: {} };
  }

  isValidate = () => {
    if (this.isEmpty()) {
      return this.showNoti();
    }

    return true;
  };

  isModified = () => (this.state.modified);

  isEmpty = () => {
    // const items = this.getChecked();
    // return items == null || items.length < 1;
    return false;
  }

  getValue = () => {
    return this.state.value;
  }

  getSelected = () => {
    return this.state.color;
  }

  showNoti = (value) => {
    return false;
  }

  onClear = (eid, e) => {
    const { props } = this;
    const color = { r: 0, g: 0, b: 0, a: 0 };
    const value = "";
    props.onChange && props.onChange(color, value, e);
    this.setState({ modified: true, color: color, value: value });
  }

  onChanged = (value, e) => {
    const { state, props } = this;
    const { hex, rgb } = value;
    state.color = value;
    state.value = hex;
    props.onChange && props.onChange(hex, rgb, e);
    state.modified = true;
  }

  render() {
    const { props, state } = this;
    const type = props.type ? props.type : 'compact';
    const { theme, clear } = props;

    return (
      <StyledObject className={cx('color-box', this.props.className, { theme })}>
        {props.label && <label className="label">{props.label}</label>}
        {type === "compact" && <CompactPicker className={"picker-box"} onChange={this.onChanged} color={state.value} />}
        {clear && <Svg className="btn-clear sm" onClick={this.onClear} eid={"clear"} icon={'clear'} />}
      </StyledObject >
    )
  }
}