import React from 'react';
import cx from 'classnames/bind';
import styled from 'styled-components';
import cs from './css-style';
import Svg from './Svg';
import { EID } from './Config';
import { Util } from './Utils';

const StyledObject = styled.div` {
  &.menu-box {
    ${cs.noselect} ${cs.pos.relative} ${cs.disp.inblock} ${cs.font.md} 
    ${cs.w.auto} ${cs.h.auto} ${cs.z.front} ${cs.box.inner} ${cs.top(0)} ${cs.float.left}    

    ul, li { list-style: none; ${cs.m.a0} ${cs.p.a0} }

    &:hover { ${cs.anim.show} }

    .mb-icon { ${cs.pos.absolute} ${cs.align.ycenter} ${cs.right(5)} ${cs.opac.get(0.6)} 
      .svg-path { ${cs.fill.dark} } 

      &:hover { ${cs.opac.get(0.9)} }
    }

    .mb-ul { ${cs.bg.white} ${cs.min.width("100px")} ${cs.w.get("max-content")} ${cs.max.width("max-content")} 
      ${cs.p.h5} ${cs.align.ltop} ${cs.z.menu} ${cs.m.t15}
      ${cs.box.radius} ${cs.border.lightgray} ${cs.box.shadow}
      .mb-li { ${cs.p.get("5px 10px")}
        &:hover { ${cs.bg.lightgray} }

        &.noitem { ${cs.opac.alpha} } 
      }
    }  

    &.md { .mb-btn { ${cs.icon.sm} } ${cs.font.md} }
    &.xs { .mb-btn { ${cs.icon.xxs} } ${cs.font.xs} .mb-ul { ${cs.m.t10} } }
    &.sm { .mb-btn { ${cs.icon.xs} } ${cs.font.sm} }
    &.lg { .mb-btn { ${cs.icon.md} } ${cs.font.xl} .mb-ul { ${cs.m.t20} } }
    &.xl { .mb-btn { ${cs.icon.lg} } ${cs.font.t1} .mb-ul { ${cs.m.t25} } }
    
    &.left { }
    &.right { ${cs.align.right} }
    &.center { ${cs.align.xcenter} }
    &.top { ${cs.align.top} }
    &.middle { ${cs.align.ycenter} }
    &.bottom { ${cs.align.bottom} }
    &.center.middle { ${cs.pos.absolute} ${cs.top("50%")} ${cs.left("50%")} ${cs.align.get("translate(-50%, -50%)")} }

    &.trans { .mb-ul { ${cs.bg.white} ${cs.font.black} .mb-li:hover { ${cs.bg.lightgray} } } }
    &.sky { .mb-ul { ${cs.bg.sky} ${cs.font.black} .mb-li:hover {  ${cs.bg.lightgray} } } }
    &.orange { .mb-ul { ${cs.bg.orange} ${cs.font.white} .mb-li:hover { ${cs.bg.orangehover} } } }
    &.green { .mb-ul { ${cs.bg.green} ${cs.font.white} .mb-li:hover { ${cs.bg.greenhover} } } }
    &.red { .mb-ul { ${cs.bg.red} ${cs.font.white} .mb-li:hover { ${cs.bg.redhover} } } }
    &.primary { 
      .mb-ul { ${cs.bg.primary} ${cs.font.white}
        .mb-li { 
          &:hover { ${cs.bg.blue} ${cs.font.white} } 
        }
      }
      .mb-btn .svg-path { ${cs.fill.primary} } 
    }
    &.gray { 
      .mb-ul { ${cs.bg.lightgray} ${cs.font.black} 
        .mb-li:hover { ${cs.bg.gray} } 
      } 
      .mb-btn .svg-path { ${cs.fill.dark} } 
    }
    &.dark { .mb-ul { ${cs.bg.dark} ${cs.font.white} .mb-li:hover { ${cs.bg.black} } } .mb-btn .svg-path { ${cs.fill.dark} } }
    &.black { .mb-ul { ${cs.bg.black} ${cs.font.white} .mb-li:hover { ${cs.bg.dark} } } .mb-btn .svg-path { ${cs.fill.black} } }

    &.theme-sky { .mb-ul { ${cs.bg.sky} ${cs.font.black} .mb-li:hover {  ${cs.bg.lightgray} } } }
    &.theme-primary { .mb-ul { ${cs.bg.primary} ${cs.font.white} .mb-li { &:hover { ${cs.bg.blue} ${cs.font.white} } } } }
    &.theme-gray { .mb-ul { ${cs.bg.lightgray} ${cs.font.black} .mb-li:hover { ${cs.bg.gray} } } }
    &.theme-dark { .mb-ul { ${cs.bg.dark} ${cs.font.white} .mb-li:hover { ${cs.bg.black}} } }
    &.theme-black { .mb-ul { ${cs.bg.black} ${cs.font.white} .mb-li:hover { ${cs.bg.dark}} } }    
    
    &.disable {
      .mb-btn, .mb-btn:hover { ${cs.mouse.default} ${cs.opac.alpha} .svg-path { ${cs.fill.gray} } }
    }

    .mb-ul {
      ${({ font }) => font && font.color && cs.font.color(font.color)}
      ${({ font }) => font && font.align && cs.font.align(font.align)}
      ${({ font }) => font && font.size && cs.font.size(font.size)}

      ${({ border }) => border && cs.box.line}
      ${({ border }) => border && border.color && cs.border.color(border.color)}
      ${({ border }) => border && border.radius && cs.border.radius(border.radius)}
      ${({ border }) => border && border.width && cs.border.width(border.width)}
    }
  }
}`;

export default class Menu extends React.PureComponent {
  constructor(props) {
    super(props);
    const { pos = 0, frameid = "body", show = false } = props;
    const list = props.list || props.menus;
    this.state = { list: list, pos: pos, modified: false, show: show, frameid: frameid };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.list) {
      this.setState({ list: nextProps.list });
    }
  }

  onResize = (e) => {
    const { type } = Util.getScreenType();
    const a = Util.isSelfClick(e, (item) => {
      return item.indexOf("mb-li") >= 0;
    });
    if (a) return;

    this.setState({ 'type': type, show: false });
    this.props.onShow && this.props.onShow(false);
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

  onClick = (eid, e) => {
    e.stopPropagation();
    const show = !this.state.show;
    this.setState({ show });
    this.props.onShow && this.props.onShow(show);
  }

  onChanged = (e) => {
    if (this.props.disable) return;

    let eid = e.currentTarget.getAttribute('eid').toString();
    if (eid === "none") {
      console.dir("none");
    } else {
      const index = this.state.list.findIndex(a => a.check = a.id.toString() === eid);
      const item = this.getSelected(index);
      this.props.onClick && this.props.onClick(item ? item.id : EID.SELECT, e, item);
      this.props.onChange && this.props.onChange(item ? item.id : EID.SELECT, e, item);
      this.setState({ pos: index, show: false, modified: true });
      this.props.onShow && this.props.onShow(false);
    }
  }

  render() {
    const { props, state } = this;
    const { list = null, noti, show, pos } = state;
    const { disable, theme, className } = props;
    const selected = list ? list.length < pos ? list[pos] : list[0] : null;
    const title = selected && selected.name ? selected.name.toString() : 'noitem';

    return (
      <StyledObject className={cx('menu-box md', className, { disable }, theme && `theme-${theme}`)} font={props.font} border={props.border} >
        <Svg className={'mb-btn sm'} icon={"vmenu"} color={"black"} onClick={this.onClick} eid={'show'} />
        {!disable && show && list &&
          <ul className="mb-ul" name="selector">
            {!list && <span className={cx("mb-li", title === 'noitem' && 'noitem')}>{title}</span>}
            {list && list.map((item, index) => {
              const active = index === pos;
              return <li key={index} className={cx('mb-li', (noti), { active })} name={item.id} eid={item.id.toString()} onClick={this.onChanged}>{item.name}</li>
            })
            }
          </ul>
        }
      </StyledObject>
    )
  }
}
