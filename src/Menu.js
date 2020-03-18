// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import cx from 'classnames/bind';
// import { Svg, cs } from './index';
// import { Util } from './Utils';

// const msize = { sm: { w: 80, h: 18 }, md: { w: 100, h: 20 }, lg: { w: 120, h: 26 } };

// const StyledObject = styled.ul`{
//   &.pop-menu { ${cs.pos.relative} ${cs.disp.inblock} ${cs.noselect} ${cs.nolist}
//     .pm-frame { ${cs.disp.inblock} ${cs.z.top} ${cs.pos.absolute} ${cs.h.fit} ${cs.bg.white} ${cs.font.dark}
//       ${cs.box.radius} ${cs.border.radius(2)} ${cs.border.shadow()} ${cs.anim.show} 
//       ${props => cs.top(props.top + "px")} ${props => cs.left(props.left + "px")}

//       .pm-li { 
//         ${cs.disp.block} ${cs.mouse.pointer} ${cs.w.full} ${cs.p.v5} ${cs.font.center} ${cs.p.h10}
//         ${cs.min.w(100)}

//         &:hover { ${cs.bg.lightgray} }
//       }

//       .pm-li:not(:first-child) {
//         ${cs.border.top} //${cs.border.color(cs.color.alphablack)}
//       }

//       &.lg { ${cs.font.lg} ${cs.w.get(msize.lg.w)} .pm-li { ${cs.font.line(msize.lg.h)} ${cs.p.v5} } }
//       &.md { ${cs.font.md} ${cs.w.get(msize.md.w)} .pm-li { ${cs.font.line(msize.md.h)} ${cs.p.v4} } }
//       &.sm { ${cs.font.sm} ${cs.w.get(msize.sm.w)} .pm-li { ${cs.font.line(msize.sm.h)} ${cs.p.v3} } }

//       &.center { .pm-li { ${cs.font.center} } }
//       &.left { .pm-li { ${cs.font.left} } }
//       &.right { .pm-li { ${cs.font.right} } }

//       &.dark { ${cs.bg.dark} ${cs.font.white} .pm-li:hover { ${cs.bg.black} } 
//         .pm-li:not(:first-child) { ${cs.border.color(cs.color.darkgray)} }
//       }
//       &.primary { ${cs.bg.primary} ${cs.font.white} .pm-li:hover { ${cs.bg.blue} } }
//       &.gray { ${cs.bg.darkgray} ${cs.font.black} .pm-li:hover { ${cs.bg.gray} } }

//       ${props => `${props.width && cs.w.get(props.width)} ${props.padding && cs.p.get(props.padding)}`}
//     }

//     .noitem { ${cs.font.lightgray} }
//   }
// }`;

// class Menu extends React.PureComponent {
//   constructor(props) {
//     super(props);
//     const { frameid = "body" } = props;
//     this.state = { show: false, frameid: frameid };
//   }

//   componentDidMount() {
//     const body = document.getElementById(this.state.frameid);
//     body && body.addEventListener('mouseup', this.onResize);
//     window.addEventListener('resize', this.onResize);
//   }

//   componentWillUnmount() {
//     const body = document.getElementById(this.state.frameid);
//     body && body.removeEventListener('mouseup', this.onResize);
//     window.removeEventListener('resize', this.onResize);
//   }

//   // 메뉴 이외의 화면을 터치시 메뉴를 닫기 위한 기능
//   onResize = (e) => {
//     // props.onClick && props.onClick(null);
//     const a = Util.isSelfClick(e, (item) => {
//       return item.indexOf("pm-li") >= 0;
//     });
//     if (a) return;

//     this.setState({ show: false });
//   }

//   onClickItem = (e) => {
//     const eid = e.currentTarget.getAttribute("eid");
//     this.props.onClick && this.props.onClick(eid, e);
//   }

//   onClickMenu = (eid, e) => {
//     this.setState({ show: !this.state.show });
//   }

//   render() {
//     const { props, state } = this;
//     const { menus = null, width, padding, size = "md", theme = "" } = props;
//     const length = menus ? menus.length : 0;
//     const menu = msize[size] || msize['md'];
//     console.dir(menu);
//     const left = (menu.w - 20) * -1;
//     const top = menu.h * -1 * length;

//     return <StyledObject className={cx('pop-menu', props.className)} width={width} padding={padding} left={left} top={top}>
//       <Svg className={'pm-btn sm'} icon={"vmenu"} color={"black"} onClick={this.onClickMenu} />
//       {state.show && <div className={cx('pm-frame', theme, size)} >
//         {menus && menus.map((item, index) => (
//           <li key={index} className="pm-li" onMouseDown={this.onClickItem} eid={item.id}>
//             {item.icon && <Svg className={"pm-icon sm"} icon={item.icon} color={cs.color.white} />}
//             <span className={cx('pm-it', !item.name && 'noitem')} >{item.name || 'noname'}</span>
//           </li>
//         ))}
//         {!menus && <span className={'pm-li noitem'}>noitem</span>}
//       </div>}
//     </StyledObject>
//   }
// }

// export default Menu;

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

      // ${({ font }) => font && font.align && font.align === "left" && `padding-left: 10px !important;`}
      // ${({ font }) => font && font.align && font.align === "right" && `padding-right: 10px !important;`}

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
    const { list, pos = 0, frameid = "body", show = false } = props;
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
    const { list = null, noti, show, pos } = state;
    const { disable, theme, className } = props;
    const selected = list ? list.length < pos ? list[pos] : list[0] : null;
    const title = selected ? selected.name.toString() : 'noitem';

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
