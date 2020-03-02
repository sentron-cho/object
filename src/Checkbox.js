import React from 'react';
import cx from 'classnames/bind';
import styled from 'styled-components';
import { Svg, cs } from './index';

const StyledObject = styled.div` {
  &.chk-box { width: 100%;
    .chk-group {
      display: inline-block; width: auto;

      .chk-itm { max-width: 100%; padding: 5px 0; display: inline-block; margin-right: 5px;
        &:hover { opacity: 0.9; cursor: pointer; }
        .chk-icon { float: left; }
      }

    }

    .chk-guide { font-size: 11px; ${cs.font.darkgray} display: block; padding-left: 15px; margin-top: -3px; margin-bottom: 5px; }

    .chk-label, .chk-txt { display: inline-block; padding: 0 5px; }
    // .chk-label, .chk-txt { display: inline-block; padding-right: 10px;
    //   position: relative; top: 50%; transform: translateY(-50%); }

    &.xl { ${cs.font.xl} .chk-txt, .chk-label { line-height: 34px  } .chk-icon { ${cs.icon.lg} } }
    &.lg { ${cs.font.lg} .chk-txt, .chk-label { line-height: 26px  } .chk-icon { ${cs.icon.md} } }
    &.md { ${cs.font.md} .chk-txt, .chk-label { line-height: 18px  } .chk-icon { ${cs.icon.sm} } }
    &.sm { ${cs.font.sm} .chk-txt, .chk-label { line-height: 14px  } .chk-icon { ${cs.icon.xs} } }
    &.xs { ${cs.font.xs} .chk-txt, .chk-label { line-height: 12px  } .chk-icon { ${cs.icon.xxs} } }
  
    .input { width: calc(100% - 50px) }
    .button { width: 40px; margin-left 10px;}
  
    &.box { width: 100%; background: #efefef; padding: 5px 20px; border-radius: 30px; }

    &.black {
      .chk-txt { color: rgba(0,0,0,0.8); }
    }

    &.white {
      .chk-txt { color: rgba(255,255,255,0.8); }
    }
  
    @media screen and (max-width : 860px) {
      font-size: 12px; 
      .chk-itm { div { margin-right: 5px; .chk-txt { margin-left: 2px; } } }
    }
  }
}`;

export default class Checkbox extends React.PureComponent {
  constructor(props) {
    super(props);
    const list = props.value ? props.list.map(item => {
      item.check = (item.id === props.value);
      return item;
    }) : props.list;
    this.state = { list: list, noti: false, noti_value: '', modified: false };
  }

  isValidate = () => {
    if (this.isEmpty()) {
      return this.showNoti();
    }

    return true;
  };

  isModified = () => (this.state.modified);

  isEmpty = () => {
    if (this.props.radio) {
      const items = this.state.list.filter(item => item.check === true && item);
      return !items || items.length < 1;
    } else {
      return false;
    }
  }

  getValue = () => {
    const items = this.state.list.filter(item => item.check === true && item);
    const array = items.map(item => item.id);
    if (this.state.list.length === 1) {
      return items.length === 1;
    }
    return this.isEmpty() ? null : this.props.radio ? array[0] : array;
  }

  // getChecked = () => {
  //   return this.state.list.filter(item => item.check === true && item);
  //   if (this.props.radio) {
  //     return this.state.list.find(o => o.check === true);
  //   } else {
  //     return this.state.list;
  //   }
  // }

  // getSelected = () => {
  //   return this.getChecked();
  // }

  showNoti = (value) => {
    return false;
  }

  // onChanged = (e) => {
  //   const { state, props } = this;
  //   const eid = e.currentTarget.getAttribute("eid");
  //   const value = state.list.find(o => o.id === eid);
  //   props.onChange && props.onChange(value);
  //   state.modified = true;
  // }

  onClickItem = (e) => {
    let eid = e.currentTarget.getAttribute("eid");
    const array = [...this.state.list];
    const { radio } = this.props;

    if (radio) {
      array.map(item => item.check = item.id.toString() !== eid ? false : true);
    } else {
      array.map(item => item.check = item.id.toString() === eid ? !item.check : item.check);
    }

    this.setState({ list: array, modified: true });

    this.props.onClick && this.props.onClick(eid, e, array);

    const value = this.state.list.find(o => o.id === eid);
    this.props.onChange && this.props.onChange(value);
  }

  render() {
    const { label, guide } = this.props;
    const { list } = this.state;
    const { radio, theme = "black", type = "" } = this.props;

    return (
      <StyledObject className={cx('chk-box md', this.props.className, { radio }, theme, { type })}>
        {label && <div className="chk-label">{label}</div>}
        <ul className={"chk-group"}>
        {list.map((item, index) => {
          const icon = radio ? item.check ? "radio" : "unradio" : item.check ? "check" : "uncheck";
          return <li key={index} className="chk-itm" onClick={this.onClickItem} eid={item.id}>
            {<React.Fragment><Svg className="chk-icon" name={icon} color={theme} /> <span className="chk-txt">{item.name}</span></React.Fragment>}
          </li>
        })}
        </ul>
        {guide && <div className="chk-guide">{guide}</div>}
      </StyledObject>
    )
  }
}