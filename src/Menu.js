import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import cs from './css-style';
import Svg from './Svg';

const msize = { sm: { w: 80, h: 18 }, md: { w: 100, h: 20 }, lg: { w: 120, h: 26 } };

const StyledObject = styled.ul`{

  &.pop-menu { ${cs.pos.relative} ${cs.disp.inblock}

    .pm-frame { ${cs.disp.inblock} ${cs.z.top} ${cs.pos.absolute} ${cs.h.fit} ${cs.bg.white} ${cs.font.dark}
      ${cs.box.radius} ${cs.border.radius(2)} ${cs.border.shadow()} ${cs.anim.show} 
      ${props => cs.top(props.top + "px")} ${props => cs.left(props.left + "px")}
      
      .pm-li { 
        ${cs.disp.block} ${cs.mouse.pointer} ${cs.w.full} ${cs.p.v5} ${cs.font.center} ${cs.p.h10}

        &:hover { ${cs.bg.lightgray} }
      }

      .pm-li:not(:first-child) {
        ${cs.border.top} //${cs.border.color(cs.color.alphablack)}
      }

      &.lg { ${cs.font.lg} ${cs.w.get(msize.lg.w)} .pm-li { ${cs.font.line(msize.lg.h)} ${cs.p.v5} } }
      &.md { ${cs.font.md} ${cs.w.get(msize.md.w)} .pm-li { ${cs.font.line(msize.md.h)} ${cs.p.v4} } }
      &.sm { ${cs.font.sm} ${cs.w.get(msize.sm.w)} .pm-li { ${cs.font.line(msize.sm.h)} ${cs.p.v3} } }

      &.center { .pm-li { ${cs.font.center} } }
      &.left { .pm-li { ${cs.font.left} } }
      &.right { .pm-li { ${cs.font.right} } }

      &.dark { ${cs.bg.dark} ${cs.font.white} .pm-li:hover { ${cs.bg.black} } 
        .pm-li:not(:first-child) { ${cs.border.color(cs.color.darkgray)} }
      }
      &.primary { ${cs.bg.primary} ${cs.font.white} .pm-li:hover { ${cs.bg.blue} } }
      &.gray { ${cs.bg.darkgray} ${cs.font.black} .pm-li:hover { ${cs.bg.gray} } }

      ${props => `${props.width && cs.w.get(props.width)} ${props.padding && cs.p.get(props.padding)}`}
    }
  }
}`;

class Menu extends React.PureComponent {
  constructor(props) {
    super(props);
    const { frameid = "body" } = props;
    this.state = { show: false, frameid: frameid };
  }

  componentWillMount() {
    const body = document.getElementById(this.state.frameid);
    body && body.addEventListener('mouseup', this.onClickBody);
    window.addEventListener('resize', this.onClickBody);
  }

  componentWillUnmount() {
    const body = document.getElementById(this.state.frameid);
    body && body.removeEventListener('mouseup', this.onResize);
    window.removeEventListener('resize', this.onClickBody);
  }

  // 메뉴 이외의 화면을 터치시 메뉴를 닫기 위한 기능
  onClickBody = (e) => {
    // props.onClick && props.onClick(null);
    this.setState({show: false});
  }

  onClickItem = (e) => {
    const eid = e.currentTarget.getAttribute("eid");
    this.props.onClick && this.props.onClick(eid, e);
  }

  onClickMenu = (eid, e) => {
    this.setState({show: !this.state.show});
  }

  render() {
    const {props, state} = this;
    const { menus, width, padding, size = "md", theme = "" } = props;

    if(!menus) {
      return <span>noitem</span>
    }

    const length = menus.length;

    return <StyledObject className={cx('pop-menu', props.className)} width={width} padding={padding} left={(msize[size].w - 20) * -1} top={msize[size].h * -1 * length}>
      <Svg className={'pm-btn sm'} icon={"vmenu"} color={"black"} onClick={this.onClickMenu} />
      {state.show && <div className={cx('pm-frame', theme, size)} >
        {menus.map((item, index) => (
          <li key={index} className="pm-li" onMouseDown={this.onClickItem} eid={item.id}>
            {item.icon && <Svg className={"pm-icon sm"} icon={item.icon} color={cs.color.white} />}
            <span>{item.name}</span>
          </li>
        ))}
      </div>}
    </StyledObject>
  }
}

export default Menu;
