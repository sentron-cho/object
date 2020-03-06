import React from 'react';
import cx from 'classnames/bind';
import styled from 'styled-components';
import cs from './css-style';
import Svg from './Svg';
import { EID } from './Config';
import { Util } from './Utils';

const StyledObject = styled.div` {
  &.combo-box {
    ul, li { list-style: none; ${cs.m.a0} ${cs.p.a0} }
    ${cs.pos.relative} ${cs.disp.inblock} ${cs.font.md} ${cs.w.auto} ${cs.h.auto} ${cs.z.front}

    .cb-sel { ${cs.bg.primary} ${cs.pos.relative} ${cs.p.h30} ${cs.size.full} ${cs.mouse.pointer}
      .cb-txt { ${cs.align.ycenter} }
      &:hover { ${cs.anim.show} }

      .cb-icon { ${cs.pos.absolute} ${cs.align.ycenter} ${cs.right(5)} ${cs.opac.get(0.6)} 
        .svg-path { ${cs.fill.white} } 

        &:hover { ${cs.opac.get(0.9)} }
      }

      .cb-ul { ${cs.min.width("100%")} ${cs.w.auto} ${cs.p.h5} ${cs.align.ltop} ${cs.z.front}
        ${cs.bg.primary} ${cs.box.radius} ${cs.border.lightgray} ${cs.box.shadow}
        .cb-li { ${cs.p.get("5px 10px")}
          &:hover { ${cs.bg.blue} ${cs.font.white} }
        }
      }  
    }

    .cb-label { ${cs.disp.block} ${cs.p.a0} ${cs.font.sm} ${cs.font.left} ${cs.border.none} ${cs.font.weight(500)} }

    &.right.disable { .cb-li { ${cs.font.line(34)} ${cs.font.right} ${cs.p.r10} } }

    &.full { ${cs.w.full} ${cs.disp.inblock} }

    &.radius { ${cs.box.radius} }
    
    &.md { .cb-sel { ${cs.h.md} } ${cs.font.md} }
    &.xl { .cb-sel { ${cs.h.xl} } ${cs.font.xl} }
    &.lg { .cb-sel { ${cs.h.lg} } ${cs.font.lg} }
    &.sm { .cb-sel { ${cs.h.sm} } ${cs.font.sm} }
    &.xs { .cb-sel { ${cs.h.xs} } ${cs.font.xs} }

    &.primary { .cb-sel, .cb-ul { ${cs.bg.primary} ${cs.font.white} .cb-li { &:hover { ${cs.bg.blue} ${cs.font.white} } } } }
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
    const { list, pos = 0, frameid = "body" } = props;
    this.state = { list: list, pos: pos, modified: false, show: false, frameid: frameid };
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
    const body = document.getElementById(this.state.frameid);
    body && body.addEventListener('mouseup', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
    const body = document.getElementById(this.state.frameid);
    body && body.removeEventListener('mouseup', this.onResize);
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

    return (
      <StyledObject className={cx('combo-box md', this.props.className, { disable })} >
        {props.label ? <label className="cb-label">{props.label}</label> : null}
        <div ref={(ref) => { this.input = ref }} className="cb-sel" onClick={this.onClick} >
          <span className="cb-txt">{selected && selected.name.toString()}</span>
          <Svg className={cx("cb-icon sm")} icon={'arrowdn'} />
          {!disable && show &&
            <ul className="cb-ul" name="selector">
              {list.map((item, index) => {
                const active = index === pos;
                return <li key={index} className={cx('cb-li', (noti), { active })} name={item.id} eid={item.id.toString()} onClick={this.onChanged}>{item.name}</li>
              })
              }
            </ul>
          }
        </div>
      </StyledObject>
    )
  }
}