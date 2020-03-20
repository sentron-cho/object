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
          // ${cs.align.ycenter}  ${cs.align.y('50%')}

          div { height: 100%; display: inline-block; position: relative; }
          .sldf-line-l {width: ${props => props.lineL}; background: transparent; };
          .sldf-line-m {width: ${props => props.lineM}; background: rgba(255,255,255,0.8); };
          .sldf-line-r {width: ${props => props.lineR}; background: transparent; };
        }
      }
      
      .sld-min, .sld-max { 
        ${cs.z.get(9)} ${cs.font.center} ${cs.font.xs} ${cs.bg.sky} ${cs.h.get(16)} ${cs.mouse.pointer}
        ${cs.align.top} ${cs.w.full} ${cs.w.get(40)} ${cs.align.ycenter} ${cs.pos.relative}
      }
      .sld-min { ${cs.disp.inblock} ${cs.radius.right(50)} ${cs.align.left} }
      .sld-max { ${cs.disp.inblock} ${cs.radius.left(50)} ${cs.align.right} }

      // .sld-bar { height: 6px; top: 25px; background: #20a8d8; 
      //   left: 0.451857%; width: 25.3246%;
      // }

      .sld-pos { 
        ${cs.pos.absolute} ${cs.font.xs} ${cs.font.line(16)}
        ${cs.mouse.move} ${cs.disp.none} ${cs.box.radius}
        ${cs.z.over} ${cs.min.w(24)} ${cs.font.center}
        ${cs.disp.inblock} ${({ pos }) => cs.left(pos)}
        ${cs.bg.orange} ${cs.font.white} ${cs.align.bottom} ${cs.bottom(10)}

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
    const pos = value;

    this.state = { modified: false, move: false, from: min, to: min, pos, value, min, max, step, linebar: null, bar: pos, editor: false };
  }

  componentDidMount() {
    this.createLineBar();
  }

  createLineBar = () => {
    const { state, object } = this;
    const { frame, min, max } = object;
    const lineL = min.offsetWidth / 2;
    const lineR = max.offsetWidth / 2;
    const lineM = frame.offsetWidth - lineL - lineR;

    const pos = this.toPos(lineM, state.value);
    // const gap = lineM / ((state.max - state.min));
    // const pos = state.value * gap;

    this.setState({ linebar: { lineL: `${lineL}px`, lineM: `${lineM}px`, lineR: `${lineR}px` }, pos: pos, bar: pos });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.createLineBar();
    // const pos = this.toPos(this.object.slidebar.offsetWidth, nextProps.value);
    // this.setState({ value: nextProps.value, pos: pos, bar: pos });
  }

  toPos = (lineWidth, value) => {
    const { state } = this;
    const gap = lineWidth / ((state.max - state.min));
    const real = value > state.max ? state.max : value < state.min ? state.min : value;
    return (real - state.min) * gap;
  }

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

    // const { object, state } = this;
    // const { min, max, frame, slidebar } = object;
    // console.log(min.offsetWidth, max.offsetWidth, frame.offsetWidth, slidebar.offsetWidth);

    // this.state.gap = slidebar.offsetWidth / ((state.max - state.min + 1)); //((max - min) / 100).toFixed(3); 
    // this.state.barwidth = slidebar.offsetWidth;
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
      let pos = offsetX - minpos;
      let bar = pos;
      if (pos <= 0) {
        value = state.min;
        bar = pos = 0;
      } else if (pos > maxpos) {
        value = state.max;
        pos = maxpos;
        bar = slidebar.offsetWidth - object.bar.offsetWidth / 2;
      } else {
      }

      this.setState({ value, pos, bar });
    }
  }

  onMouseUp = () => {
    this.setState({ move: false });
    this.onChanged();
  }

  render() {
    const { state, props, object } = this;
    const { editor, pos, bar, min, max, value, linebar } = state;
    const { disabled } = props;

    return (
      <StyledObject {...props} eid={props.eid} className={cx('slider', props.className, { disabled })}
        pos={pos} {...linebar} bar={bar} >
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

              {/* <div className="sldf-line-l" />
              <div className="sldf-line-m" ref={ref => this.object.slidebar = ref} >
                <span className='sldf-guide' ref={ref => this.object.bar = ref}></span>
              </div>
              <div className="sldf-line-r" /> */}

              <span className="sld-pos">{value}</span>
            </div>
          </span>


          <span className={"sld-bar"}></span>
        </div>
      </StyledObject>
    )
  }
}