import React from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';

const StyledObject = styled.span`{
  &.switch { width: 48px; display: inline-block; height: 26px; position: relative; display: inline-block; vertical-align: middle;

    // .sw-input { display: none }
    .sw-slider { background-color: transparent; border: 1px solid rgba(128,128,128,0.7);
      position: relative; display: block; height: inherit; cursor: pointer; border-radius: 3px;

      &::before { z-index: 2; position: absolute; top: 2px; left: 2px;
        box-sizing: border-box; width: 20px; height: 20px; content: ""; background-color: #fff;
        transform: translateX(0px); transition: .15s ease-out; border-radius: 3px;
      }

      &::after {
        position: absolute; top: 50%; z-index: 1; width: 50%; margin-top: -.5em;
        font-size: 10px; font-weight: 600; line-height: 1; text-align: center;
        text-transform: uppercase; transition: inherit; right: 1px; color: #c8ced3;
        content: attr(data-unchecked);
      }

      &.checked {
        border-color: rgba(255,255,255,0.8);
        ::before { transform: translateX(22px); }
        ::after { left: 1px; color: #fff; content: attr(data-checked); }
      }
    }

    // &:hover { opacity: 0.9; }

    // &.xl { font-size:20px; height:48px; line-height:46px; padding:0px 20px; .icon{width: 42px; height: 42px} }
    // &.lg { font-size:16px; height:38px; line-height:36px; padding:0px 14px; .icon{width: 32px; height: 32px} }
    // &.sm { font-size:14px; height:28px; line-height:26px; padding:0px 8px; .icon{width: 22px; height: 22px} }
    // &.xs { font-size:12px; height:18px; line-height:16px; padding:1px 3px; .icon{width: 12px; height: 12px} }

    // &.trans { background: transparent; color:#000; border: 1px solid #ccc;}
    // &.primary { background:#4a92e4; color:#fff; border:1px transparent;}
    // &.yellow { background:#f3c022; color: #fff; border:1px transparent;}
    // &.orange { background:#ff6600; color:#fff; border:1px transparent;}
    // &.red { background:#ed6464; color:#fff; border:1px transparent;}
    // &.green { background:#00c73c; color:#fff; border:1px transparent;}
    // &.dark { background:#272727; color:#fff; border:1px transparent;}
    // &.primary-line { background: transparent; border:1px solid #4a92e4; color:#4a92e4; }
    // &.gray { background:#ecf0f2; border: 1px solid #d0d0d0 ; color:#777; }
    // &.gray-line { background: transparent; border:1px solid #d0d0d0; color:#777;
    //   &:not(.disabled):hover { background:#eee; border:1px solid #555; }
    //   &:not(.disabled):active { background:#ccc; border:1px solid #777; color:#333 };
    // }

    // // &.icon { background: transparent; border:1px solid #4a92e4; padding: 0;}
    // .icon {width: 24px; height: 24px; margin-bottom: 2px;
    //   &.mR {margin-right: 5px;}
    // }

    // &.disabled { cursor:default; border:none; background:#000; color:#fff; opacity: 0.2; border:1px transparent;
    //   &:hover {}
    // }

    // &.left { float: left; }
    // &.right { float: right; }
    // &.center { position: absolute; float: left; left: 50%; transform: translateX(-50%); }
  }
}`;

export default class Switch extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { checked: props.checked ? props.checked : true, modified: false };
  }

  isValidate = () => (true);

  isModified = () => (this.state.modified);

  isEmpty = () => (false);

  getValue = () => (this.state.checked);

  onClicked = (e) => {
    const { state, props } = this;
    let checked = !state.checked;
    this.setState({ checked: checked, modified: true });
    props.onClick && props.onClick(props.eid, checked, e);
    console.log('checked = ', checked);
  }

  render() {
    const { state, props } = this;
    const { disabled } = props;
    const { checked } = state;
    const on = props.symbol === true ? "✓" : "ON";
    const off = props.symbol === true ? "✕" : "OFF";

    return (
      <StyledObject {...props} eid={props.eid} className={cx('switch', props.className, { disabled })} onClick={disabled ? () => null : this.onClicked} >
        {/* <input className="sw-input" type="checkbox" value="" checked="" /> */}
        <span className={cx("sw-slider", { checked })} data-checked={on} data-unchecked={off} />
      </StyledObject>
    )
  }
}