import React from 'react';
import cx from 'classnames/bind';
import styled from 'styled-components';
import cs from './css-style';
import Svg from './Svg';
import { EID } from './Config';
import { Util } from './Utils';

const StyledObject = styled.div` {
  &.combo-box {
    position: relative; display: inline-block; font-size: 14px; width: 100px; height: auto; z-index: 999;

    .cb-sel { ${cs.bg.primary} position: relative; width: 100%; height: 100%; padding: 0 20px; border-radius: 5px; cursor:pointer;
      .cb-txt { ${cs.align.ycenter} }
      &:hover { ${cs.anim.show} }

      .cb-icon { position: absolute; ${cs.align.ycenter} right: 5px; }

      .cb-ul { position: absolute; min-width: 100%; width: auto; padding: 5px 0; font-size: 14px; 
        top: 5px; left: 5px; z-index: 1;
        ${cs.bg.primary} ${cs.box.radius} ${cs.border.lightgray} ${cs.box.shadow}
        .cb-li { padding: 5px 10px;
          &:hover { background: #135bff; ${cs.font.white} }
          // &.active { background: #578aff; ${cs.font.white} }
        }
      }  
    }

    .cb-label { display: block; padding: 0; font-size: 12px; text-align: left; border: 0; font-weight: 500; }

    &.right.disable { .cb-li { line-height: 34px; text-align: right; padding-right: 10px; } }

    &.full { width: 100%; display: inline-block; }
    
    &.md { .cb-sel { ${cs.h.md} } ${cs.font.md} }
    &.xl { .cb-sel { ${cs.h.xl} } ${cs.font.xl} }
    &.lg { .cb-sel { ${cs.h.lg} } ${cs.font.lg} }
    &.sm { .cb-sel { ${cs.h.sm} } ${cs.font.sm} }
    &.xs { .cb-sel { ${cs.h.xs} } ${cs.font.xs} }

    &.primary { .cb-sel, .cb-ul { ${cs.bg.primary} ${cs.font.white} } }
    &.green { .cb-sel, .cb-ul { ${cs.bg.green} ${cs.font.white} } }
    &.gray { .cb-sel, .cb-ul { ${cs.bg.lightgray} ${cs.font.black} } .svg-icon .svg-path { fill: black; } }
    &.white { .cb-sel, .cb-ul { ${cs.bg.white} ${cs.font.black} } .svg-icon .svg-path { fill: black; } }
    &.dark { .cb-sel, .cb-ul { ${cs.bg.dark} ${cs.font.white} } }
    &.black { .cb-sel, .cb-ul { ${cs.bg.black} ${cs.font.white} } }
    &.trans { .cb-sel, .cb-ul { ${cs.bg.trans} ${cs.font.black} } }
    &.orange { .cb-sel, .cb-ul { ${cs.bg.orange} ${cs.font.white} } }
    &.red { .cb-sel, .cb-ul { ${cs.bg.red} ${cs.font.white} } }
    &.primary-line { .cb-sel, .cb-ul { ${cs.bg.trans} ${cs.box.border} ${cs.font.black} } }

    &.disable {
      .cb-sel { cursor: default; ${cs.bg.lightgray} ${cs.font.darkgray} ${cs.opac.show} ${cs.box.line} ${cs.border.darkgray} 
        .cb-icon { .svg-path { fill: ${cs.color.darkgray} } }
      }
    }
  }
}`;

export default class Combobox extends React.PureComponent {
  constructor(props) {
    super(props);
    const { list, pos = 0 } = props;
    this.state = { list: list, pos: pos, modified: false, show: false };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.list) {
      this.setState({ list: nextProps.list });
    }
  }

  onResize = (e) => {
    const { type } = Util.getScreenType();
    const a = Util.isSelfClick(e, (item) => {
      return item.indexOf("cb-li") >= 0;
    });
    if (a) return;

    this.setState({ 'type': type, show: false });
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
    document.getElementById('body').addEventListener('mouseup', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
    document.getElementById('body').removeEventListener('mouseup', this.onResize);
  }

  isValidate = () => {
    if (this.props.validate != null && this.props.validate === false) return true;
    if (this.isEmpty()) { return this.showNoti(); }
    return true;
  };

  isModified = () => (this.state.modified);

  isEmpty = () => {
    const items = this.getSelected();
    return items == null || items.length < 1;
  }

  getValue = () => {
    return this.isEmpty() ? null : this.getSelected().id;
  }

  getSelected = (pos = this.state.pos) => {
    return this.state.list[pos];
  }

  // getSelected = () => {
  //   return this.getChecked();
  // }

  // showNoti = (value) => {
  //   if (value != null && value.length > 0) {
  //     this.setState({ noti_value: value, noti: true });
  //   } else {
  //     this.setState({ noti_value: this.props.noti, noti: true });
  //   }

  //   this.input.focus();

  //   setTimeout(() => {
  //     if (this.state.noti === true) {
  //       this.setState({ noti: false });
  //     }
  //   }, 5000);

  //   return false;
  // }

  onClick = (e) => {
    e.stopPropagation();
    this.setState({ show: !this.state.show });
  }

  onChanged = (e) => {
    if (this.props.disable) return;

    let eid = e.currentTarget.getAttribute('eid').toString();
    if (eid === "none") {
      console.dir("none");
    } else {
      const index = this.state.list.findIndex(item => item.check = item.id.toString() === eid);
      if (index === this.state.pos) {
        this.setState({ show: false });
        return;
      } else {
        this.props.onClick && this.props.onClick(EID.SELECT, e, this.getSelected(index));
        this.props.onChange && this.props.onChange(EID.SELECT, e, this.getSelected(index));
        this.setState({ pos: index, show: false, modified: true });
      }
    }
  }

  render() {
    const { props, state } = this;
    const { list, noti, show, pos } = state;
    const { disable } = props;
    const selected = list[pos];
    // const selected = list && list.length > 0 ? list.filter(item => { return item.check && item })[0] : {id:'', name: ''};

    return (
      <StyledObject className={cx('combo-box md', this.props.className, { disable })} >
        {props.label ? <label className="cb-label">{props.label}</label> : null}
        <div ref={(ref) => { this.input = ref }} className="cb-sel" onClick={this.onClick} >
          <p className="cb-txt">{selected && selected.name.toString()}</p>
          <Svg className={cx("cb-icon sm")} icon={'arrowdn'} />
          {!disable && show &&
            <ul className="cb-ul" name="selector">
            {list.map((item, index) => {
                const active = index === pos;
                return <li key={index} className={cx('cb-li', (noti), {active})} name={item.id} eid={item.id.toString()} onClick={this.onChanged}>{item.name}</li>
              })
            }
            </ul>
          }
        </div>
      </StyledObject>
    )
  }
}