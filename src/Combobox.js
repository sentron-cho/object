import React from 'react';
import cx from 'classnames/bind';
import styled from 'styled-components';
import cs from './css-style';
import Svg from './Svg';
import { EID } from './Config';
import { Util } from './Utils';

const StyledObject = styled.div` {
  &.combo-box {
    ${cs.noselect} ${cs.pos.relative} ${cs.disp.inblock} ${cs.font.md} ${cs.noliststyle}
    ${cs.w.auto} ${cs.h.auto} ${cs.z.front} ${cs.box.inner} ${cs.top(0)} ${cs.float.left}

    ul, li { list-style: none; ${cs.m.a0} ${cs.p.a0} }
    .cb-sel { ${cs.pos.relative} ${cs.size.full} ${cs.mouse.pointer} ${cs.min.width(120)}
      ${cs.box.line} ${cs.border.lightwhite} ${cs.w.max} ${cs.box.inner} ${cs.w.full}
      // ${cs.p.h30} 

      .cb-txt { ${cs.align.ycenter} ${cs.pos.relative} ${cs.disp.inblock} ${cs.max.width("calc(100% - 30px)")}
        ${cs.font.ellipsis} ${cs.w.full} ${cs.font.center} ${cs.align.center}
        &.noitem { ${cs.opac.alpha} } 
      }
      &:hover { ${cs.anim.show} }

      .cb-icon { ${cs.pos.absolute} ${cs.align.ycenter} ${cs.right(5)} ${cs.opac.get(0.6)} 
        .svg-path { ${cs.fill.dark} } 

        &:hover { ${cs.opac.get(0.9)} }
      }

      .cb-ul { ${cs.bg.white} ${cs.min.width("100px")}
        ${cs.w.get("max-content")} ${cs.max.width("max-content")} 
        ${cs.p.h5} ${cs.align.ltop} ${cs.z.menu} ${cs.m.t10} ${cs.box.line}
        ${cs.box.radius} ${cs.border.alphagray} ${cs.box.shadow}
        ${cs.max.width(500)} ${cs.max.height(180)} ${cs.over.yauto} ${cs.scrollbar.t3}
        .cb-li { ${cs.p.get("5px 10px")} ${cs.font.ellipsis}
          &:hover { ${cs.bg.lightgray} }
        }
      }  
    }

    &.show { ${cs.z.over} }

    .cb-label { ${cs.disp.block} ${cs.p.a0} ${cs.font.sm}
      ${cs.font.left} ${cs.border.none} ${cs.font.weight(500)} 
    }

    &.inline { .cb-label { ${cs.align.ltop} ${cs.font.xs} ${cs.font.lightgray} ${cs.z.front} ${cs.top(3)} ${cs.left(3)} } }
    
    &.md { .cb-sel { ${cs.h.md} } ${cs.font.md} }
    &.xs { .cb-sel { ${cs.h.xs} } ${cs.font.xs} .cb-ul { ${cs.m.t10} } }
    &.sm { .cb-sel { ${cs.h.sm} } ${cs.font.sm} }
    &.lg { .cb-sel { ${cs.h.lg} } ${cs.font.xl} .cb-ul { ${cs.m.t20} } }
    &.xl { .cb-sel { ${cs.h.xl} } ${cs.font.t1} .cb-ul { ${cs.m.t25} } }
    &.full { ${cs.w.full} ${cs.disp.inblock} .cb-sel { ${cs.w.full} ${cs.p.a0} .cb-txt { ${cs.p.l0} } } }
    
    &.left { }
    &.right { ${cs.align.right} }
    &.center { ${cs.align.xcenter} }
    &.top { ${cs.align.top} }
    &.middle { ${cs.align.ycenter} }
    &.bottom { ${cs.align.bottom} }
    &.center.middle { ${cs.pos.absolute} ${cs.top("50%")} ${cs.left("50%")} ${cs.align.get("translate(-50%, -50%)")} }

    &.trans { .cb-sel, .cb-ul { ${cs.bg.white} ${cs.font.black} .cb-li:hover { ${cs.bg.lightgray} } } .cb-sel { ${cs.bg.trans} ${cs.border.color('transparent')} } }
    &.sky { .cb-sel, .cb-ul { ${cs.bg.sky} ${cs.font.black} .cb-li:hover {  ${cs.bg.lightgray} } } &.inline { .cb-label { ${cs.font.gray} } } }
    &.yellow { .cb-sel, .cb-ul { ${cs.bg.yellow} ${cs.font.dark} .cb-li:hover { ${cs.bg.orange} } } }
    &.orange { .cb-sel, .cb-ul { ${cs.bg.orange} ${cs.font.white} .cb-li:hover { ${cs.bg.orangehover} } } }
    &.green { .cb-sel, .cb-ul { ${cs.bg.green} ${cs.font.white} .cb-li:hover { ${cs.bg.greenhover} } } }
    &.red { .cb-sel, .cb-ul { ${cs.bg.red} ${cs.font.white} .cb-li:hover { ${cs.bg.redhover} } } }
    &.primary { .cb-sel, .cb-ul { ${cs.bg.primary} ${cs.font.white} .cb-li { &:hover { ${cs.bg.blue} ${cs.font.white} } } } }
    &.gray { .cb-sel, .cb-ul { ${cs.bg.lightgray} ${cs.font.black} .cb-li:hover { ${cs.bg.gray} } } &.inline { .cb-label { ${cs.font.dark} } } }
    &.dark { .cb-sel, .cb-ul { ${cs.bg.dark} ${cs.font.white} .cb-li:hover { ${cs.bg.black}} } .cb-icon .svg-path { ${cs.fill.white} } .cb-sel { ${cs.border.darkgray} } }
    &.black { .cb-sel, .cb-ul { ${cs.bg.black} ${cs.font.white} .cb-li:hover { ${cs.bg.dark}} } .cb-icon .svg-path { ${cs.fill.white} } .cb-sel { ${cs.border.darkgray} } }

    &.theme-sky { .cb-sel, .cb-ul { ${cs.bg.sky} ${cs.font.black} .cb-li:hover {  ${cs.bg.lightgray} } } }
    &.theme-primary { .cb-sel, .cb-ul { ${cs.bg.primary} ${cs.font.white} .cb-li { &:hover { ${cs.bg.blue} ${cs.font.white} } } } }
    &.theme-gray { .cb-sel, .cb-ul { ${cs.bg.lightgray} ${cs.font.black} .cb-li:hover { ${cs.bg.gray} } } }
    &.theme-dark { .cb-sel, .cb-ul { ${cs.bg.dark} ${cs.font.white} .cb-li:hover { ${cs.bg.black}} } }
    &.theme-black { .cb-sel, .cb-ul { ${cs.bg.black} ${cs.font.white} .cb-li:hover { ${cs.bg.dark}} } }    
    
    &.disable {
      .cb-sel { ${cs.mouse.default} ${cs.opac.alpha} ${cs.font.dark}
        .cb-icon { .svg-path { fill: ${cs.color.darkgray} } }
      }

      &.dark, &.black, &.primary { .cb-sel { ${cs.font.lightgray} } }
    }

    // &.right.disable { .cb-li { ${cs.font.line(34)} ${cs.font.right} ${cs.p.r10} } }
    &.radius { .cb-sel { ${cs.box.radius} } }

    .cb-label {
      ${({ label }) => label && label.align && cs.font.align(label.align)}
      ${({ label }) => label && label.color && cs.font.color(label.color)}
    }

    .cb-sel {
      .cb-txt {
        ${({ text }) => text && text.color && cs.font.color(text.color)}
        ${({ text }) => text && text.align && cs.font.align(text.align)}

        ${({ text }) => text && text.align && text.align === "left" && `padding-left: 10px !important;`}
        ${({ text }) => text && text.align && text.align === "right" && `padding-right: 30px !important;`}
      }

      ${({ border }) => border && cs.box.line}
      ${({ border }) => border && border.color && cs.border.color(border.color)}
      ${({ border }) => border && border.radius && cs.border.radius(border.radius)}
      ${({ border }) => border && border.width && cs.border.width(border.width)}
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
    // if (eid === "none") {
    //   console.dir("none");
    // } else {
    const index = this.state.list.findIndex(item => item.check = item.id.toString() === eid);
    this.props.onClick && this.props.onClick(EID.SELECT, e, this.getSelected(index), index);
    this.props.onChange && this.props.onChange(EID.SELECT, e, this.getSelected(index), index);

    if (index === this.state.pos) {
      this.setState({ show: false });
      return;
    } else {
      this.setState({ pos: index, show: false, modified: true });
    }
    // }
  }

  render() {
    const { props, state } = this;
    const { list = null, noti, show, pos } = state;
    const { disable, theme, className, inline = false } = props;
    const selected = list ? pos < list.length ? list[pos] : list[0] : null;
    const title = selected && selected.name ? selected.name.toString() : 'noitem';
    const { text, label } = props.options || { text: null, label: null };

    return (
      <StyledObject className={cx('combo-box md', className, { disable }, { inline }, theme && `theme-${theme}`, { show })} text={text} label={label} border={props.border} >
        {props.label ? <label className="cb-label">{props.label}</label> : null}
        <div ref={(ref) => { this.input = ref }} className={cx("cb-sel")} onClick={this.onClick} >
          <span className={cx("cb-txt", title === 'noitem' && 'noitem')}>{title}</span>
          <Svg className={cx("cb-icon sm")} icon={'arrowdn'} />
          {!disable && show && list &&
            <ul className="cb-ul" name="selector">
              {list.map((item, index) => {
                const active = index === pos;
                return <li key={index} className={cx('cb-li', (noti), { active })} name={item.id} eid={item.id.toString()} onClick={this.onChanged}>{item.name || 'noname'}</li>
              })
              }
            </ul>
          }
        </div>
      </StyledObject>
    )
  }
}