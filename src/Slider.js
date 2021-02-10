// /* eslint-disable react/no-direct-mutation-state */
// import React from 'react';
// import styled from 'styled-components';
// import cx from 'classnames/bind';
// import { Util } from './Utils'

// const StyledObject = styled.span`{
//   &.slider { display: block; position: relative; width: 100%;
//     .header {
//       .label { height: 16px; width: auto; display: inline-block; padding: 0; margin-right: 10px;
//         font-size: 12px; text-align: left; border: 0; font-weight: 500; 
//       }
//       .infos { display: inline;
//         .in-value { width: 60px; display: inline-block; margin-right: 2px;
//           // .box { opacity: 0.2; }
//           .box {
//             .input { color: white; background: transparent; }
//           }
//         }
//         .in-label { opacity: 0.6; font-size: 14px; font-weight: 400; }
//         .center { transform: translateX(-50%); left: 50%; }
//       }
//     }

//     .sli-layer { 
//       height: 60px; display: block; position: relative; width: 100%; 

//       .sli-frame { height: 100%; width: 100%; position: relative; display: block; z-index: 3; cursor: pointer;
//         .sli-line { height: 6px; top: 25px; position: relative; display: flex; outline: none; width: 100%; 
//           background: rgba(255,255,255,0.8); border-radius: 20px;
//         }
//       }

//       .sli-label { position: absolute; color: #73818f; font-size: 10px; line-height: 1.333; text-shadow: none;
//         top: 6px; padding: 2px 5px; background: transparent; border-radius: 2px; display: none;

//         // &.sli-min, &.sli-max, &.sli-now { top: 8px; display: block; background: #212121; color: rgba(250,250,250,0.8); }
//         &.sli-min, &.sli-max, &.sli-now { top: 30px; display: block; background: transparent; color: rgba(250,250,250,0.8); &::after { left: 0; } }
//         &.sli-min { left: 0; }
//         &.sli-max { right: 0; }
//         &.sli-now { left: ${(props) => `${props.guide}px`}; z-index: 1; cursor: pointer; background: #212121; }

//       }

//       .sli-guide { 
//         height: 6px; position: absolute; top: 0px; z-index: 10; background: #d7463c;
//         display: block; width: ${(props) => `${props.bar}px`}; border-radius: 20px;
//         .sli-bar { position: absolute; right: 0; height: 10px; width: 10px; border: 1px solid #555;
//           border-radius: 50px; display: block; background: #e8e8e8; top: -2px; 
//           &:hover, &.active { height: 18px; top: -6px; }
//         }
//       }

//       // .sli-bar { height: 6px; top: 25px; background: #20a8d8; 
//       //   left: 0%; width: 0%;
//       //   &:hover { height: 10px;  top: 23px; }
//       // }
//     }
//   }
// }`;

// export default class Slider extends React.PureComponent {
//   constructor(props) {
//     super(props);

//     this.object = {};

//     const max = props.max ? Number(props.max) : 0;
//     const min = props.min ? Number(props.min) : 0;
//     const value = props.value ? Number(Util.replaceAll(props.value, "px")) : min;
//     const step = props.step ? Number(props.step) : 1;
//     const pos = value;

//     this.state = { move: false, from: min, to: min, pos: pos, value: value, min: min, max: max, step: step, linebar: null, bar: pos };
//   }

//   componentDidMount() {
//     this.createLineBar();
//   }

//   createLineBar = () => {
//     const { state, object } = this;
//     const { value = 0, min, max } = state;
//     const { slidebar = { offsetWidth: 1000 } } = object;

//     // 포인터의 이동 거리
//     const gap = (slidebar.offsetWidth) / ((state.max - state.min));

//     let bar = gap * value;
//     let guide = bar;
//     if (value <= min) {
//       guide = bar = 0;
//     } else if (value >= max) {
//       guide = bar = slidebar.offsetWidth;
//     } else {
//       guide = bar;
//       bar = bar + object.bar.offsetWidth / 2;
//     }

//     guide = this.getGuidePos(object, bar);
//     // TODO : 여기서 성능 문제가 발생한다.
//     this.setState({ bar: bar, guide: guide });
//   }

//   componentDidUpdate() {
//   }

//   componentWillReceiveProps(nextProps) {
//     if (nextProps.value && (nextProps.value !== this.props.value)) {
//       // this.state.value = nextProps.value;
//       this.state.value = Number(Util.replaceAll(String(nextProps.value), "px"));
//       this.createLineBar();
//     }

//     if (nextProps.max) {
//       this.state.max = nextProps.max;
//     }
//   }

//   isValidate = () => (true);

//   isEmpty = () => (false);

//   getValue = () => (this.state.value);

//   getUnit = () => (this.props.unit ? this.props.unit : '');

//   onInputChanged = (value, e) => {
//   }

//   onChange = (e) => { }

//   onMouseDown = (e) => {
//     if (this.state.max <= 0 || this.state.min === this.state.max) return;

//     this.state.move = true;
//     this.onMouseMove(e);
//     this.props.onChange && this.props.onChange(this.state.value, e, 'start');
//   }

//   onMouseMove = (e) => {
//     if (this.state.move) {
//       let { offsetX } = e.nativeEvent;
//       const { state, object } = this;
//       const { slidebar, max } = object;
//       const className = e.nativeEvent.srcElement.className;
//       if (className.indexOf("sli-bar") > -1) {
//         offsetX = e.nativeEvent.pageX - 30;
//         // return;
//       }

//       // 최소단위 라벨 바의 위치
//       const minpos = slidebar.offsetLeft;
//       // 최대단위 라벨 바의 위치 
//       const maxpos = max.offsetLeft + max.offsetWidth - 10;
//       // 포인터의 이동 거리
//       const gap = (slidebar.offsetWidth + minpos) / ((state.max - state.min));
//       // 이동거리별 값
//       let value = Number((offsetX / gap).toFixed(0)) + state.min;

//       // pos바의 위치를 계산하자..
//       let pos = offsetX - minpos;
//       let bar = pos + object.bar.offsetWidth / 2;
//       if (pos <= 0 || offsetX < 10) {
//         value = state.min;
//         bar = pos = 0;
//       } else if (pos > maxpos) {
//         value = state.max;
//         pos = maxpos;
//         // bar = slidebar.offsetWidth - object.bar.offsetWidth;
//         bar = slidebar.offsetWidth;
//       } else {
//         // bar = pos + object.bar.offsetWidth / 2;
//       }

//       let guide = this.getGuidePos(object, bar);
//       this.setState({ value: value, pos: pos, bar: bar, guide: guide });
//       this.props.onChange && this.props.onChange(value, e, 'drag');
//       // this.props.onChange && this.props.onChange('darg', value);
//     }
//   }

//   getGuidePos = (object, bar) => {
//     let guide = bar;
//     if (guide > 500) {
//       guide = guide - object.bar.offsetWidth / 2;
//     }

//     if (guide > 580) {
//       guide = guide - object.bar.offsetWidth / 2;
//     }
//     return guide;
//   }

//   onMouseUp = (e) => {
//     this.setState({ move: false });
//     this.props.onChange && this.props.onChange(this.state.value, e, 'end');
//   }

//   onMouseOut = (e) => {
//     const eid = e.currentTarget.getAttribute("eid");
//     if (eid !== "sli-bar") {
//       return;
//     }

//     if (this.state.move) {
//       this.setState({ move: false });
//       this.props.onChange && this.props.onChange(this.state.value, e, 'end');
//     }
//   }

//   render() {
//     const { state, props } = this;
//     const { disabled } = props;

//     return (
//       <StyledObject {...props} eid={props.eid} className={cx('slider', props.className, { disabled })}
//         {...state.linebar} bar={state.bar} guide={state.guide} >
//         {props.label && <div className="header">
//           <label className={"label"}>{props.label}</label>
//           <div className="infos">
//             <input className="in-value sm" value={state.value} name="value" type="number" maxLength="10" onChange={this.onChange} />
//             <label className="in-label">{props.unit}</label>
//           </div>
//         </div>}
//         <div className={"sli-layer"}>
//           <span>
//             <span className="sli-label sli-min" ref={ref => this.object.min = ref}>{state.min}</span>
//             <span className="sli-label sli-max" ref={ref => this.object.max = ref}>{state.max}</span>
//             <span className="sli-label sli-now" ref={ref => this.object.bar = ref}>{state.value}</span>
//           </span>

//           <span className="sli-frame" ref={ref => this.object.frame = ref} eid={"sli-frame"}
//             onMouseMove={this.onMouseMove} onMouseUp={this.onMouseUp} onMouseDown={this.onMouseDown}>
//             <div className="sli-line" ref={ref => this.object.slidebar = ref}>
//               <span className='sli-guide' >
//                 {state.value > 0 && <span className={`sli-bar ${this.state.move ? 'active' : ''}`} eid="sli-bar" />}
//               </span>
//             </div>
//           </span>
//         </div>
//       </StyledObject>
//     )
//   }
// }

import 'rc-slider/assets/index.css';
import React, { useEffect, useState } from 'react';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import styled from 'styled-components';
import { cs } from './index';
import cx from 'classnames/bind';
import { Util } from './Utils'

const StyledObject = styled.div`{
  &.slide-bar {
    .sb-label { ${cs.m.b5} }
    .sb-guide { ${cs.font.xs} ${cs.font.gray} ${cs.pos.relative} ${cs.disp.block}
      ${cs.min.h(14)} ${cs.p.v2}
      .sb-min { ${cs.border.radius(3)} ${cs.p.h0} ${cs.p.v2} }
      .sb-max { ${cs.align.right} ${cs.border.radius(3)} ${cs.p.h0} ${cs.p.v2} }
      .sb-val { ${cs.align.xcenter} ${cs.border.radius(3)} ${cs.p.h5} ${cs.p.v2} ${cs.bg.alphablack} }
    }

    &.center { .sb-label { ${cs.font.center} } }
    &.left { .sb-label { ${cs.font.left} } }
    &.right { .sb-label { ${cs.font.right} } }
  }
}`;

// const SliderWithTooltip = createSliderWithTooltip(Slider);

const Slidebar = (props) => {
  const { min = 0, max = 100, label = '', unit = '', className } = props;
  const [value, setValue] = useState(0);

  useEffect(() => {
    const v = props.value ? Number(Util.replaceAll(props.value, "px")) : props.min;
    if (v) {
      setValue(v)
    }

    return () => {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value]);

  const onChange = (v) => {
    setValue(v);
    props.onChange && props.onChange(v);
  };

  return (
    <StyledObject className={cx('slide-bar', className)}>
      {label && <div className={'sb-label'}>{label}</div>}
      <Slider value={value} onChange={onChange} min={min} max={max} />
      <div className={'sb-guide'}>
        {min !== null && <span className={'sb-min'}>{min}</span>}
        <span className={'sb-val'}>{value}</span>
        {max !== null && <span className={'sb-max'}>{max}</span>}
      </div>
    </StyledObject>
  );
}

export default Slidebar;