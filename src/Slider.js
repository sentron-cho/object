/* eslint-disable react/no-direct-mutation-state */
import React from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import { Editbox, Util } from './index';

const StyledObject = styled.span`{
  &.slider { display: block; position: relative; width: 100%;
    .header {
      .label { height: 16px; width: auto; display: inline-block; padding: 0; margin-right: 10px;
        font-size: 12px; text-align: left; border: 0; font-weight: 500; 
      }
      .infos { display: inline;
        .in-value { width: 60px; display: inline-block; margin-right: 2px;
          // .box { opacity: 0.2; }
          .box {
            .input { color: white; background: #dcdcdc1a; }
          }
        }
        .in-label { opacity: 0.6; font-size: 14px; font-weight: 400; }
        .center { transform: translateX(-50%); left: 50%; }
      }
    }

    .sli-layer { 
      height: 60px; display: block; position: relative; width: 100%; 

      .sli-frame { height: 100%; width: 100%; position: relative; display: block; z-index: 3;
        .sli-line { height: 6px; top: 25px; position: relative; display: flex; outline: none; background: transparent;

          div { height: 100%; display: inline-block; position: relative; }
          .sli-line-l {width: ${props => props.lineL}; background: transparent; };
          .sli-line-m {width: ${props => props.lineM}; background: rgba(255,255,255,0.8); };
          .sli-line-r {width: ${props => props.lineR}; background: transparent; };
        }
      }

      .sli-label { position: absolute; color: #73818f; font-size: 10px; line-height: 1.333; text-shadow: none;
        top: 0; padding: 2px 5px; background: #e4e7ea; border-radius: .25rem; cursor: default; display: none;

        &::after { position: absolute; display: block; content: ""; bottom: -6px; left: 50%; width: 0;
          height: 0; margin-left: -3px; overflow: hidden; border: 3px solid transparent; border-top-color: #e4e7ea;
        }

        &.sli-min { left: 0; display: block; }
        &.sli-max { right: 0; display: block; }
        &.sli-pos { display: block; left: ${(props) => `${props.pos}px`}; z-index: 2; background: rgba(255, 143, 0, 0.9); color: white;
          &::after { border-top-color: rgba(255, 143, 0, 0.9); }
        }

      }
      .sli-guide { 
        height: 6px; position: absolute; top: 0px; z-index: 10; background: #d60b00; width: 4px;
        display: block; float: left; left: ${(props) => `${props.bar}px`};
      }

      // .infos { display: inline-block; float: right; position: absolute; left: ${props => props.lineL}; bottom: 2px; z-index: 10; 
      //   .in-value { width: 50px; display: inline-block; margin-right: 2px;
      //     .box { opacity: 0.7; }
      //   }
      //   .in-label { opacity: 0.6; font-size: 14px; font-weight: 400; }
      //   .center { transform: translateX(-50%); left: 50%; }
      // }

      .sli-bar { height: 6px; top: 25px; background: #20a8d8; 
        left: 0.451857%; width: 25.3246%;
      }
    }
  }
}`;

export default class Slider extends React.PureComponent {
  constructor(props) {
    super(props);

    this.object = {};

    // const unit = props.unit ? props.unit : '';
    const max = props.max ? Number(props.max) : 100;
    const min = props.min ? Number(props.min) : 0;
    const value = props.value ? Number(Util.replaceAll(props.value, "px")) : min;
    const step = props.step ? Number(props.step) : 1;
    const pos = value;

    this.state = { modified: false, move: false, from: min, to: min, pos: pos, value: value, min: min, max: max, step: step, linebar: null, bar: pos };
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

      this.setState({ value: value, pos: pos, bar: bar });
      // console.log('onMouseMove offset = %s, pos = %s, value = %s, gap = %s', offsetX, pos, value, gap, bar);
    }
  }

  onMouseUp = () => {
    this.setState({ move: false });
    this.onChanged();
  }

  render() {
    const { state, props } = this;
    const { disabled } = props;
    // const linebar = { lineL: "10px", lineM: "1500px", lineR: "10px" };

    return (
      <StyledObject {...props} eid={props.eid} className={cx('slider', props.className, { disabled })}
        onChange={this.onChanged} pos={state.pos} {...state.linebar} bar={state.bar} >
        {props.label && <div className="header">
          <label className={"label"}>{props.label}</label>
          <div className="infos">
            <Editbox className="in-value sm" value={state.value} name="value" type="number" maxLength="10" onChange={this.onChanged} />
            <label className="in-label">{props.unit}</label>
          </div>
        </div>}
        <div className={"sli-layer"}>
          <span className="sli-frame" ref={ref => this.object.frame = ref}
            onMouseDown={this.onMouseDown} onMouseMove={this.onMouseMove} onMouseUp={this.onMouseUp} onClick={this.onClicked}>
            <div className="sli-line">
              <div className="sli-line-l" />
              <div className="sli-line-m" ref={ref => this.object.slidebar = ref} >
                <span className='sli-guide' ref={ref => this.object.bar = ref}></span>
              </div>
              <div className="sli-line-r" />
            </div>
          </span>

          <span>
            <span className="sli-label sli-min" ref={ref => this.object.min = ref}>{state.min}</span>
            <span className="sli-label sli-max" ref={ref => this.object.max = ref}>{state.max}</span>
            {/* <span className="sli-label sli-from">{state.from}</span>
            <span className="sli-label sli-to">{state.to}</span> */}
          </span>

          <span className="sli-label sli-pos">{state.value}</span>
          {/* <span className='sli-guide'>{state.value}<span className="bar"></span></span> */}

          {/* <div className="infos">
            <Editbox className="in-value sm" value={state.value} name="value" type="number" maxLength="10" onChange={this.onChanged} />
            <label className="in-label">px</label>
          </div> */}

          {/* <span className="sli-bar"></span> */}
        </div>
      </StyledObject>
    )
  }
}