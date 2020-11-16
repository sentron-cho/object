
import React from 'react';
import cx from 'classnames/bind';
import styled from 'styled-components';
import { Cardbox, Editbox, Uploadbox, Button, Svg } from './index';
import { ST, EID } from './Config';

var min = { w: 400, h: 240 };
var thumb = { w: 280, h: 240 };
var max = { w: 600, h: 400 };

const StyledObject = styled.div`{
  &.pop-box {
    float: left; position: absolute; left: 0; top: 100px; min-height: 140px; z-index: 999;
    display: inline-block; padding: 10px 20px; background: rgba(0, 0, 0, 0.98); border: 1px solid rgba(195,195,195);
    border-radius: 5px; box-shadow: 2px 2px rgba(72,72,72,0.7); 
    min-width: ${({ rect }) => rect.minW}px;
    left: ${({ rect }) => rect.x}px; top: ${({ rect }) => rect.y}px;
    width: ${({ rect }) => rect.w}px; height: ${({ rect }) => rect.h}px;

    .pop-btn-grp { position: absolute; bottom: 5px; right: 5px; }
    .pop-btn-del { position: absolute; bottom: 10px; left: 10px; }
    .pop-btn-cancel { position: absolute; top: 3px; right: 3px; }

    &.fixed { position: absolute; left: 50%; transform: translateX(-50%); 
      &.center { top: 50%; transform: translate(-50%, -50%);  }
      &.bottom { bottom: 10%; }
    }

    .pop-frame { padding-top: 15px; }

    &.editarea { min-height: ${min.minH}px; min-width: ${({ rect }) => rect.minW}px; 
      // max-height: ${({ rect }) => rect.mh}px; 
    }
    &.thumb { max-height: ${max.h}px; max-width: ${max.w}px; padding: 5px;
      .pop-frame { text-align: center; 
        .thumb-box { width: calc(100% - 50px); height: calc(100% - 40px); margin-top: 10px; }
        ${({ rect }) => rect.w < rect.minW && 'span.button { width: 60px; padding: 0 5px; }'}
      }
    }

    &.edit { max-height: 100px; }

    @media screen and (max-width : 1280px) {}  
    @media screen and (max-width : 1024px) {}  
    @media screen and (max-width : 860px) {}
  }
}`;

export default class Popbox extends React.PureComponent {
  constructor(props) {
    super(props);
    const { data = { value: "", tag: "image" } } = props;
    this.state = { value: data.value, type: data.tag, modefied: false };
    this.mainframe = props.framecls ? document.getElementsByClassName(props.framecls) : null;
    this.mainframe = this.mainframe ? this.mainframe[0] : null;
  }

  componentDidMount() {
    // if (!this.mainframe) { }
    // 다른 화면을 클릭할경우 취소시
    // window.onmousedown = () => {
    //   this.props.onCancel && this.props.onCancel();
    // }
  }

  onChange = (value, e, file, type) => {
    this.setState({ value, type, modefied: true });
  }

  onOk = (e) => {
    const { value, type } = this.state;
    this.props.onChange && this.props.onChange(value, type);
  }

  onCancel = (e) => {
    this.props.onCancel && this.props.onCancel();
  }

  onDelete = (e) => {
    this.props.onChange && this.props.onChange('');
    this.props.onDelete && this.props.onDelete();
  }

  renderContents = (rect) => {
    const { props, onChange, state } = this;
    const { data, children } = props;
    const { label, path, name, guide, type } = data;
    const { value } = state;

    if (children) {
      const Component = children;
      return <Component value={data} onChange={this.onChange} />
    } else {
      switch (type) {
        case 'edit':
          return <Editbox className="" value={value} name={name}
            type="text" label={label} guide={guide} maxLength="50" onChange={onChange} validate={false} clear={true} />
        case 'editarea':
          const height = rect.h - 120;
          return <Editbox className="textarea sizefix" value={value} name={name} onChange={onChange} validate={false}
            type="text" label={ST.DESC} guide={guide} multi={true}
            minheight={"100px"} height={`${height <= 100 ? 100 : height}px`} maxheight={`100%`} />
        // height={`${height <= 100 ? 100 : height}px`} maxheight={`${rect.mh - 100}px`} />
        case 'color':
          return;
        case 'upload':
          return <Uploadbox className="thumb-box" path={path} value={value} name={name} thumbnail={true} onSelectedMedia={() => { }}
            type={state.type} label={label} eid="bg" onChange={onChange} validate={false} />
        default: return null;
      }
    }
  }

  onKeyPressed = (e) => {
    // if (e.key === 'Enter') {
    //   this.onOk(e);
    // }
  }

  render() {
    const { state, props, mainframe } = this;
    const { target, data, option = {} } = props;
    const { type, style, isdel = "show" } = data;
    // const { top, left, width, height } = target.getBoundingClientRect();
    // const { offsetX, pageX, clientX } = event;

    if (!mainframe) {
      console.error('The mainframe of the Popbox component is undefined!');
      return null;
    }

    const mr = mainframe.getBoundingClientRect();
    const tr = target.getBoundingClientRect();
    const r = { x: tr.left - mr.left, y: tr.top - mr.top, m: 5, w: tr.width, h: tr.height };
    let rect = {
      "x": r.x + r.m, "y": r.y + r.m, w: r.w - r.m * 2, "h": r.h - r.m * 2,
      "mh": 1000, "minW": min.w - r.m * 2, "minH": min.h - r.m * 2
    };

    // 가로 => 세로 전환
    // if (tr.h < tr.w) { thumb.w = thumb.h }
    const isthumb = style === "thumb";
    if (isthumb) {
      min = thumb;
      // rect.minH = tr.height < 200 ? min.h : tr.height - r.m * 2;
      // rect.minW = tr.width < 200 ? min.w : tr.width - r.m * 2;

      if (tr.width < tr.height) {
        const temp = rect.h;
        rect.h = rect.w - r.m * 2;
        rect.h = temp - r.m * 2;

        rect.minH = min.w - r.m * 2;
        rect.minW = min.h - r.m * 2;
      }
    }

    rect.w = rect.w < rect.minW ? rect.minW : rect.w;
    const right = rect.x + rect.w;
    if (right > mr.width) rect.x = rect.x - rect.w;

    rect.h = rect.h < rect.minH ? rect.minH : rect.h;
    const bottom = rect.y + rect.h;
    if (bottom > mr.height) rect.y = rect.y - rect.h

    const { position, align } = option;
    const custom = (props.children != null);

    if (style === "custom" && props.height) rect.h = props.height;

    return (
      <StyledObject className={cx("pop-box", (type), (style), (position), (align), { custom })} rect={rect} onKeyPress={this.onKeyPressed} >
        <Cardbox className={cx("pop-frame no-box")}>
          {this.renderContents(r)}

          {isdel === "show" && style === "thumb" && <Svg className={cx("pop-btn-del md")} onClick={this.onDelete} eid={EID.DELETE} icon={"delete"} />}
          <Svg className={cx("pop-btn-cancel md")} onClick={this.onCancel} eid={EID.CANCEL} icon={"exit"} />

          <div className="pop-btn-grp">
            <Button className={cx("red sm")} onClick={this.onOk} title={ST.OK} eid={EID.OK} disabled={!state.modefied} />
          </div>
        </Cardbox>
      </StyledObject >
    )
  }
}