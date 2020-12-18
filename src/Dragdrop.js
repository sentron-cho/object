import React from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import { Svg } from './index'

const StyledObject = styled.div`{
  &.drag-box { position: relative; 
    &:hover { 
      .dragmove { display: block; } 
    }

    .dragmove { position: absolute; left: 14px; top: 14px; display: none; }

    &.drag { 
      &:hover { cursor: pointer; .svg-icon { display: none !important; } }
    }

    &.drop { opacity: 0.9; background: rgba(250,250,250,0.5); border-radius: 5px; } 

    &.dragging {
      &:hover { cursor: pointer; .svg-icon { display: none !important; } }
    }
  }
  
  &.drop-box { 
    opacity: 0.9; width: 302px; height: 202px; max-width: 302px; max-height: 202px; 
    position: absolute; float: left; background: black;
    border: 2px solid rgba(216, 0, 0, 0.9); border-radius: 6px; 
  }
}`;

var over = { id: 0, left: false };
var dragging = false;
// var frame = null;
var node = null;
var startx = 0;
var moveleft = false;

export class Dragbox extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = this.initValue();
    this.group = null;
    // frame = this.props.frame;
  }

  componentDidMount() {
    // const { frameClass } = this.props;
    // if (frameClass && frame == null) {
    //   frame = document.getElementsByClassName(frameClass); //object.closest(`.${frameClass}`);
    //   if (frame) {
    //     frame = frame[0];
    //   }
    // }
  }

  initValue = () => {
    return { ok: false, rowid: 0, item: null, active: false, dragable: this.props.dragable };
  }

  getFrame = () => {
    const { frameClass } = this.props;
    if (frameClass) {
      let frame = document.getElementsByClassName(frameClass); //object.closest(`.${frameClass}`);
      if (frame) {
        frame = frame[0];
      }
      return frame;
    }

    return null;
  }

  getDragItem = (object) => {
    let item = object.getElementsByClassName("drag-li");
    if (item != null && item.length > 0) {
      item = item[0];
    } else {
      const parent = object.parentElement;
      item = parent.firstElementChild;
    }

    return item;
  }

  // 드래그앤드롭의 시작
  onDragStart = (eid, e) => {
    if (this.state.ok) return;

    const object = e.currentTarget;
    const parent = object.parentElement;

    this.setState({ ...this.state, ok: true, rowid: eid });

    const { onDrag } = this.props;
    onDrag && onDrag('start', {parent, rowid: eid}, e);

    dragging = true;

    node = parent.cloneNode(true);
    node.classList.add("drop");
    parent.after(node);

    startx = e.pageX;

    const list = document.getElementsByClassName("drag-box");
    for (var i = 0; i < list.length; i++) {
      list[i].classList.add("dragging");
    }

    var frame = this.getFrame();
    // 드래그앤드롭이 시작될때만 Frame에 이벤트를 설정해야 한다.
    if (frame) {

      // 드래그앤드롭의 진행중 상태
      frame.onmousemove = (e) => {
        if (!dragging) return;

        const { onDrag } = this.props;
        const pos = { x: e.pageX, y: e.pageY };
        moveleft = (startx - e.pageX) > 0 ? true : false;
        onDrag && onDrag('drag', pos, e);
      };

      // 드래그앤드롭의 종료
      frame.onmouseup = (e) => {
        if (!dragging) return;

        const { onDrag } = this.props;

        const value = { 'oid': Number(this.state.rowid), 'tid': Number(over.id), 'left': over.left };
        // 아래서부터는 초기화...
        this.setState(this.initValue());
        onInitState();

        // 외부 호출은 제일 마지막에...
        onDrag && onDrag('end', value, e);
      };
    }

    window.onkeyup = (e) => {
      if (e.keyCode === 27) {
        this.setState(this.initValue());
        onInitState();
        onDrag && onDrag('cancel');
      }
    }

    const onInitState = () => {
      dragging = false;
      if (!node) return;

      node.remove();
      node = null;
      over = { id: 0, left: false };

      // overbar를 모두 클리어하자..
      const list = document.getElementsByClassName("drag-box");
      for (var i = 0; i < list.length; i++) {
        list[i].classList.remove("dragging");
      }
    }
  }

  onMouseOut = (e) => {
    if (!dragging) return;
    // over = { id: -1, left: false };
    // this.setState({ 'active': false });
  }

  // 드래그앤드롭의 드롭 위치가 될 위치를 가이드하기 위해 사용
  onMouseOver = (e) => {
    if (!dragging) {
      // this.setState({ 'active': false });
      return;
    }

    const object = e.currentTarget;

    if (object.classList.contains('drag')) return;

    const parent = object.parentElement;
    const item = this.getDragItem(object);

    over = { id: item.getAttribute("rowid"), left: moveleft }; //pos.x < center && pos.x > 0 };

    if (moveleft) {
      startx = e.pageX;
      parent.insertBefore(node, object);
    } else {
      startx = e.pageX;
      object.after(node);
    }
  }

  render() {
    const { state, props } = this;
    const { ok, dragable = true } = state;
    const drag = ok;

    return <StyledObject ref={ref => this.dragbox = ref} className={cx("drag-box", { drag }, props.className)} rowid={props.rowid}
      onMouseMove={dragable ? this.onMouseOver : null} onMouseOut={dragable ? this.onMouseOut : null} onKeyUp={this.onKeyUp}>
      {props.children}

      {dragable && <Svg className="dragmove md" onClick={this.onDragStart} eid={props.rowid} icon={'move'} />}
      {/* <div className={cx("dragover", { left }, { active })} /> */}
    </StyledObject>
  }
}