
import React from 'react';
import cx from 'classnames/bind';
import styled from 'styled-components';
import { ST } from './Config';

const StyledObject = styled.div`{
  &.tool-tip { z-index: 1; opacity: 0; float: left; position: absolute; left: 0; top: 100px; 
    cursor: pointer; display: inline-block; transition: opacity 300ms ease-out; font-size: 12px;
    left: ${({ rect }) => `calc(${rect.x}px - 10px)`}; top: ${({ rect }) => `calc(${rect.y}px - 28px)`};
    background: #000000d0; border-radius: 5px; padding: 3px;
    // width: ${({ rect }) => rect.w}px; height: ${({ rect }) => rect.h}px;

    &.box {
      background: rgba(0, 0, 0, 0.98); border: 1px solid rgba(195,195,195); border-radius: 5px;
    }

    &.show { opacity: 0.7; transition: all 120ms ease-in;
      &::after { position: absolute; display: block; content: ""; bottom: -8px; left: 50%; width: 0;
        height: 0; margin-left: -5px; overflow: hidden; border: 4px solid transparent; border-top-color: #000000d1;
      }
    }
    
    .tip-text { position: relative; };
    .btn-grp { position: absolute; bottom: 10px; right: 10px; }
    .btn-del { position: absolute; bottom: 10px; left: 10px; }

    @media screen and (max-width : 1280px) {}  
    @media screen and (max-width : 1024px) {}  
    @media screen and (max-width : 860px) {}
  }
}`;

var isTooltipOver = false;

export default class Tooltip extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  componentDidMount() {
    makeTooltip("pop-view", (eid, value) => this.setState({ ...value, show: true }));
  }

  onClick = (e) => {
    this.props.onClick && this.props.onClick(this, e);
  }

  onMouseEnter = (e) => {
    isTooltipOver = true;
  }

  onMouseLeave = (e) => {
    isTooltipOver = false;
  }

  render() {
    const { props, state } = this;
    const { target, msg, eid, show, framecls } = state;
    // const { show } = state;
    // const { show } = props;?

    if (show) {
      let mainframe = document.getElementsByClassName(framecls ? framecls : 'main-contents');
      if (mainframe) { mainframe = mainframe[0] };
      // const { offsetX, pageX, clientX } = event;
      const mr = mainframe.getBoundingClientRect();
      const tr = target.getBoundingClientRect();
      const r = { x: tr.left - mr.left, y: tr.top - mr.top, m: 1, w: tr.width, h: tr.height };
      let rect = { x: r.x + r.m, y: r.y + r.m, w: r.w - r.m * 2, h: r.h - r.m * 2 };
      const right = rect.x + rect.w;
      if (right > mr.width) {
        rect.x = rect.x - rect.w;
      }

      return (
        <StyledObject className={cx("tool-tip", { show }, props.className)} rect={rect} eid={eid}
          onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
          <p className={"tip-text"} >{msg}</p>
        </StyledObject >
      )
    } else {
      return null;
    }
  }
}

export const makeTooltip = (framecls = "pop-view", callback) => {
  const list = document.getElementsByClassName("editable");
  for (var i = 0; i < list.length; i++) {
    const item = list[i];
    if (item.classList.contains('nodata')) {
      let value = ST.IN_VALUE;
      item.onmouseover = (e) => {
        const target = e.currentTarget;
        const eid = target.getAttribute("eid");
        switch (eid) {
          case "title": value = ST.IN_TITLE; break;
          case "cont": value = ST.IN_CONT; break;
          default: value = ST.IN_VALUE; break;
        }

        const obj = document.getElementsByClassName("tool-tip");
        (obj && obj[0]) && obj[0].classList.add("show");

        const data = {
          msg: value, target: item, framecls: framecls, show: true, eid: eid,
          onClick: (obj, e) => { },
        }
        callback && callback('over', data);
        // this.setState({ tooltip: data });
      };

      item.onmouseleave = (e) => {
        const obj = document.getElementsByClassName("tool-tip");
        (obj && obj[0]) && obj[0].classList.remove("show");
      };

    } else {
      item.onmouseover = null;
      item.onmouseout = null;
    }
  }
}

export const clearTooltip = () => {
  const list = document.getElementsByClassName("editable");
  for (var i = 0; i < list.length; i++) {
    const item = list[i];
    if (!item.classList.contains('nodata')) {
      item.onmouseover = null;
      item.onmouseout = null;
    }
  }
}