/* eslint-disable react/no-direct-mutation-state */
import React from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import { Editbox, cs } from './index';

const StyledObject = styled.span`{
  &.slider { 
    ${cs.disp.block} ${cs.pos.relative} ${cs.w.full} ${cs.noselect}

    .sld-header {
      .sldh-label { 
        ${cs.w.auto} ${cs.h.get(16)} ${cs.disp.inblock} ${cs.p.a0} ${cs.m.r10}
        ${cs.font.sm} ${cs.font.left} 
      }

      .sldh-infos { ${cs.disp.inline}
        .sldh-label { opacity: 0.6; font-size: 14px; font-weight: 400; }
        .center { transform: translateX(-50%); left: 50%; }
      }
    }

    .sld-value { 
      ${cs.w.get(60)} ${cs.h.get(18)} ${cs.disp.inblock} ${cs.m.right(2)} ${cs.align.cbottom} ${cs.box.inner}
      ${cs.bottom(-1)} ${cs.mouse.pointer} ${cs.z.over} ${cs.font.xs} ${cs.box.line} ${cs.border.lightgray}
      ${cs.font.dark} ${cs.bg.sky} ${cs.font.center} ${cs.radius.bottom(10)} ${cs.border.top('transparent')}
    }

    .sld-editor {
      ${cs.size.full} ${cs.pos.absolute} ${cs.pos.ltop} ${cs.z.over}
      .slde-bg { 
        ${cs.bg.alphablack} ${cs.size.full} ${cs.pos.absolute} ${cs.pos.ltop}
      }
      .slde-box {
        ${cs.pos.absolute} ${cs.align.center} ${cs.max.w(400)}
      }
    }

    .sld-layer { 
      ${cs.h.get(40)} ${cs.disp.block} ${cs.pos.relative} ${cs.w.full}

      .sld-frame { ${cs.h.fit} ${cs.w.calc('100% - 68px')} ${cs.disp.block} ${cs.pos.relative} ${cs.z.get(2)} ${cs.m.get('0 34px')}
        ${cs.align.ycenter}
        .sldf-line { 
          ${cs.h.get(6)}${cs.pos.relative} ${cs.disp.flex} ${cs.bg.sky} 
          ${cs.box.line} ${cs.box.inner} ${cs.border.darkwhite}
        }
      }
      
      .sld-min, .sld-max { 
        ${cs.z.get(9)} ${cs.font.center} ${cs.font.xs} ${cs.bg.sky} ${cs.h.get(16)} ${cs.mouse.pointer}
        ${cs.align.top} ${cs.w.full} ${cs.w.get(40)} ${cs.align.ycenter} ${cs.pos.relative}
      }
      .sld-min { ${cs.disp.inblock} ${cs.radius.right(50)} ${cs.align.left} }
      .sld-max { ${cs.disp.inblock} ${cs.radius.left(50)} ${cs.align.right} }

      .sld-pos { 
        ${cs.pos.absolute} ${cs.font.xs} ${cs.font.line(16)}
        ${cs.mouse.move} ${cs.disp.none} ${cs.box.radius}
        ${cs.z.over} ${cs.min.w(24)} ${cs.font.center}
        ${cs.disp.inblock} ${({ pos }) => cs.left(pos)}
        ${cs.bg.orange} ${cs.font.white} ${cs.align.bottom} ${cs.bottom(10)}
        ${cs.align.x("-50%")}

        &::after { 
          ${cs.pos.absolute} ${cs.disp.block} ${cs.content.none} ${cs.bottom(-6)} ${cs.left('50%')} ${cs.w.none}
          ${cs.h.none} ${cs.m.left(-3)} ${cs.over.hidden} ${cs.border.get('3px solid transparent')}
          ${cs.border.top(cs.color.orange)}
        }
      }

      .sld-guide { 
        height: 6px; position: absolute; top: 0px; ${cs.z.over} background: #d60b00; width: 4px;
        display: block; float: left; left: ${(props) => `${props.bar}px`};
      }
    }
  }
}`;

export default class Slider extends React.PureComponent {
  constructor(props) {
    super(props);

    this.object = {};

    // const unit = props.unit ? props.unit : '';
    const max = props.max ? Number.parseInt(props.max) : 100;
    const min = props.min ? Number.parseInt(props.min) : 0;
    const value = props.value ? Number.parseInt(props.value) : min;
    const step = props.step ? Number.parseInt(props.step) : 1;
    // const pos = value;
    const pos = this.toPos(value, min, max);
    console.log(max, min, value, pos);

    this.state = { modified: false, move: false, from: min, to: min, pos: pos, value, min, max, step, bar: value, editor: false };
  }

  componentDidMount() {
    this.createLineBar();
  }

  createLineBar = () => {
    const { state, object } = this;
    const { value } = state;

    const pos = this.toPos(value);
    this.setState({ pos: pos, bar: value });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.createLineBar();
    // const pos = this.toPos(this.object.slidebar.offsetWidth, nextProps.value);
    // this.setState({ value: nextProps.value, pos: pos, bar: pos });
  }

  toPos = (value, min = this.state.min, max = this.state.max) => {
    return ((max - min) / 100 * value) + "%";
  }

  // toPos = (lineWidth, value) => {
  //   const { state } = this;
  //   const gap = lineWidth / ((state.max - state.min));
  //   const real = value > state.max ? state.max : value < state.min ? state.min : value;
  //   return (real - state.min) * gap;
  // }

  isValidate = () => (true);

  isModified = () => (this.state.modified);

  isEmpty = () => (false);

  getValue = () => (this.state.value);

  getUnit = () => (this.props.unit ? this.props.unit : '');

  onChanged = (e) => {
    const { value } = this.state;
    this.state.modified = true;
    this.props.onChange && this.props.onChange(value, e);
    // console.log('onChanged = %s', value);
  }

  onInputChanged = (value, e) => {
    // console.log('onInputChanged = %s', value);
  }

  onClicked = (e) => {
    this.onMouseDown(e);
    this.onMouseMove(e);
    this.onMouseUp(e);
  }

  onClickEditor = (e) => {
    this.setState({ editor: true });
  }

  onCloseEditor = () => {
    this.setState({ editor: false });
  }

  onEnterEditor = (eid, e, value) => {
    const { min, max } = this.state;
    if (value < min) value = min;
    if (value > max) value = max;

    this.setState({ editor: false, value, modified: true });
    this.createLineBar();
  }

  onMouseDown = (e) => {
    this.state.move = true;
  }

  onMouseMove = (e) => {
    if (this.state.move) {
      const { offsetX } = e.nativeEvent;
      const { state, object } = this;
      const { slidebar, max } = object;

      // 최소단위 라벨 바의 위치
      const minpos = slidebar.offsetLeft;
      // 최대단위 라벨 바의 위치 
      const maxpos = max.offsetLeft;
      // 포인터의 이동 거리
      const gap = (slidebar.offsetWidth + minpos) / ((state.max - state.min));
      // 이동거리별 값
      let value = Number((offsetX / gap).toFixed(0)) + state.min;

      // pos바의 위치를 계산하자..
      // let pos = offsetX - minpos;
      // let bar = pos;
      // if (pos <= 0) {
      //   value = state.min;
      //   bar = pos = 0;
      // } else if (pos > maxpos) {
      //   value = state.max;
      //   pos = maxpos;
      //   bar = slidebar.offsetWidth - object.bar.offsetWidth / 2;
      // } else {
      // }
      const bar = value;
      const pos = this.toPos(value);

        console.log('value ============> ', value);
      this.setState({ value, pos, bar });
    }
  }

  onMouseUp = () => {
    this.setState({ move: false });
    this.onChanged();
  }

  render() {
    const { state, props, object } = this;
    const { editor, pos, bar, min, max, value } = state;
    const { disabled } = props;
    console.log('pos => ', pos);

    return (
      <StyledObject {...props} eid={props.eid} className={cx('slider', props.className, { disabled })}
        pos={pos} bar={bar} >
        {props.label && <div className="sld-header">
          <label className={"sld-label"}>{props.label}</label>
          <div className="sldh-infos">
            <label className="sldh-label">{props.unit}</label>
          </div>
        </div>}

        <span className={'sld-value'} onClick={this.onClickEditor}>{state.value}</span>
        {editor && <div className={'sld-editor'} >
          <div className={"slde-bg"} onClick={this.onCloseEditor} />
          <Editbox className="slde-box md center border radius"
            value={state.value} name="value" type="number" maxLength="10"
            onEnter={this.onEnterEditor} focus={true} />
        </div>}

        <div className={"sld-layer"}>
          <span className="sld-min" ref={ref => object.min = ref}>{min}</span>
          <span className="sld-max" ref={ref => object.max = ref}>{max}</span>
          <span className="sld-frame" ref={ref => object.frame = ref}
            onMouseDown={this.onMouseDown} onMouseMove={this.onMouseMove} onMouseUp={this.onMouseUp} onClick={this.onClicked}>
            <div className="sldf-line" ref={ref => object.slidebar = ref}>
              <span className="sld-pos">{value}</span>
            </div>
          </span>


          <span className={"sld-bar"}></span>
        </div>
      </StyledObject>
    )
  }
}