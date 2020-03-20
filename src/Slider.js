/* eslint-disable react/no-direct-mutation-state */
import React from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import { Editbox, cs } from './index';

const StyledObject = styled.span`{
  &.slider { 
    ${cs.disp.block} ${cs.pos.relative} ${cs.w.full} ${cs.noselect}

    .sld-header { ${cs.pos.relative} ${cs.font.sm} ${cs.font.left} ${cs.m.b5} ${cs.h.get(16)} ${cs.w.full}
      .sldh-label { ${cs.w.auto} ${cs.disp.inblock} ${cs.p.a0} ${cs.m.r5} ${cs.h.full} }
      .sldh-unit { ${cs.disp.inblock} ${cs.w.auto} ${cs.h.full} ${cs.opac.get(0.6)} ${cs.font.xs} ${cs.bottom(-1)} }
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

      .sld-frame { ${cs.h.fit} ${cs.w.calc('100% - 76px')} ${cs.disp.block} ${cs.pos.relative} ${cs.z.get(90)} ${cs.m.get('0 38px')}
        ${cs.align.ycenter} ${cs.p.get('10px 0')} ${cs.mouse.pointer} 
        .sldf-line { 
          ${cs.h.get(6)} ${cs.pos.relative} ${cs.disp.block} ${cs.bg.sky} ${cs.mouse.pointer} 
          // ${cs.box.line} ${cs.box.inner} ${cs.border.darkwhite} ${cs.box.left('none')} ${cs.box.right('none')}

          .sldf-line-bar {
            ${cs.h.full} ${({ pos }) => cs.w.get(pos)} ${cs.bg.primary}
          }
        }

        .sldf-pos { 
          ${cs.pos.absolute} ${cs.font.xs} ${cs.font.line(16)}
          ${cs.mouse.move} ${cs.disp.none} ${cs.box.radius}
          ${cs.z.over} ${cs.min.w(24)} ${cs.font.center}
          ${cs.disp.inblock} ${({ pos }) => cs.left(pos)}
          ${cs.bg.orange} ${cs.font.white} ${cs.align.bottom} ${cs.bottom(17)}
          ${cs.align.x("-50%")} ${cs.pointer.eventnone}
  
          &::after { 
            ${cs.pos.absolute} ${cs.disp.block} ${cs.content.none} ${cs.bottom(-6)} ${cs.left('50%')} ${cs.w.none}
            ${cs.h.none} ${cs.m.left(-3)} ${cs.over.hidden} ${cs.border.get('3px solid transparent')}
            ${cs.border.top(cs.color.orange)}
          }

          // &:hover { ${cs.mouse.move} }
        }
      }
      
      .sld-min, .sld-max { 
        ${cs.z.get(9)} ${cs.font.center} ${cs.font.xs} ${cs.bg.sky} ${cs.h.get(16)} ${cs.font.line(14)} ${cs.mouse.pointer}
        ${cs.align.top} ${cs.w.full} ${cs.w.get(40)} ${cs.align.ycenter} ${cs.pos.relative}
      }
      .sld-min { ${cs.disp.inblock} ${cs.radius.right(50)} ${cs.align.left} }
      .sld-max { ${cs.disp.inblock} ${cs.radius.left(50)} ${cs.align.right} }

      ${({ pos }) => Number.parseInt(pos) > 0 && `.sld-min { ${cs.bg.primary} }`}
      ${({ pos }) => Number.parseInt(pos) >= 100 && `.sld-max { ${cs.bg.primary} }`}
    }

    &.sm { 
      .sld-value { ${cs.bottom(-1)} ${cs.font.xs} }
      .sld-layer { 
        .sld-frame { 
          ${cs.w.calc('100% - 76px')} ${cs.m.get('0 38px')}
          .sldf-line { ${cs.h.get(6)} } 
          .sldf-pos { ${cs.bottom(17)} }
        } 
      } 
      .sld-min, .sld-max { ${cs.h.get(16)} ${cs.font.line(14)} ${cs.font.xs} ${cs.w.get(40)} }
    }
    &.md { 
      .sld-value { ${cs.bottom(-2)} ${cs.font.xs} }
      .sld-layer { 
        .sld-frame { 
          ${cs.w.calc('100% - 92px')} ${cs.m.get('0 46px')}
          .sldf-line { ${cs.h.get(8)} } 
          .sldf-pos { ${cs.bottom(19)} }
        } 
      } 
      .sld-min, .sld-max { ${cs.h.get(18)} ${cs.font.line(16)} ${cs.font.xs} ${cs.w.get(48)} }
    }
    &.lg { 
      .sld-value { ${cs.bottom(-3)} ${cs.font.sm} }
      .sld-layer { 
        .sld-frame { 
          ${cs.w.calc('100% - 104px')} ${cs.m.get('0 52px')}
          .sldf-line { ${cs.h.get(10)} } 
          .sldf-pos { ${cs.bottom(21)} }
        } 
      } 
      .sld-min, .sld-max { ${cs.h.get(22)} ${cs.font.line(20)} ${cs.font.sm} ${cs.w.get(54)} }
    }

    &.sky { .sld-color, .sld-layer .sld-frame .sldf-line { ${cs.bg.sky}  ${cs.font.dark} .sldf-line-bar { ${cs.bg.primary} } } 
      ${({ pos }) => Number.parseInt(pos) > 0 && `.sld-min { ${cs.bg.primary} }`}
      ${({ pos }) => Number.parseInt(pos) >= 100 && `.sld-max { ${cs.bg.primary} }`}
    }
    &.green { .sld-color, .sld-layer .sld-frame .sldf-line { ${cs.bg.green} .sldf-line-bar { ${cs.bg.greenhover} } } 
      ${({ pos }) => Number.parseInt(pos) > 0 && `.sld-min { ${cs.bg.greenhover} }`}
      ${({ pos }) => Number.parseInt(pos) >= 100 && `.sld-max { ${cs.bg.greenhover} }`}
    }
    &.orange { .sld-color, .sld-layer .sld-frame .sldf-line { ${cs.bg.orange} .sldf-line-bar { ${cs.bg.orangehover} } }
      ${({ pos }) => Number.parseInt(pos) > 0 && `.sld-min { ${cs.bg.orangehover} }`}
      ${({ pos }) => Number.parseInt(pos) >= 100 && `.sld-max { ${cs.bg.orangehover} }`}
    }
    &.red { .sld-color, .sld-layer .sld-frame .sldf-line { ${cs.bg.red} .sldf-line-bar { ${cs.bg.redhover} } }
      ${({ pos }) => Number.parseInt(pos) > 0 && `.sld-min { ${cs.bg.redhover} }`}
      ${({ pos }) => Number.parseInt(pos) >= 100 && `.sld-max { ${cs.bg.redhover} }`}
    }
    &.primary { .sld-color, .sld-layer .sld-frame .sldf-line { ${cs.bg.primary} ${cs.font.white} .sldf-line-bar { ${cs.bg.primaryhover} ${cs.font.white} } } 
      ${({ pos }) => Number.parseInt(pos) > 0 && `.sld-min { ${cs.bg.primaryhover} }`}
      ${({ pos }) => Number.parseInt(pos) >= 100 && `.sld-max { ${cs.bg.primaryhover} }`}
    }
    &.gray { .sld-color, .sld-layer .sld-frame .sldf-line { ${cs.bg.lightgray} ${cs.font.white} .sldf-line-bar { ${cs.bg.darkgray} ${cs.font.white} } }
      ${({ pos }) => Number.parseInt(pos) > 0 && `.sld-min { ${cs.bg.darkgray} }`}
      ${({ pos }) => Number.parseInt(pos) >= 100 && `.sld-max { ${cs.bg.darkgray} }`}
    }
    &.dark { .sld-color, .sld-layer .sld-frame .sldf-line { ${cs.bg.gray} ${cs.font.white} .sldf-line-bar { ${cs.bg.dark} ${cs.font.white} } }
      ${({ pos }) => Number.parseInt(pos) > 0 && `.sld-min { ${cs.bg.dark} }`}
      ${({ pos }) => Number.parseInt(pos) >= 100 && `.sld-max { ${cs.bg.dark} }`}
    }
    &.black { .sld-color, .sld-layer .sld-frame .sldf-line { ${cs.bg.darkgray} ${cs.font.white} .sldf-line-bar { ${cs.bg.black} ${cs.font.white} } }
      ${({ pos }) => Number.parseInt(pos) > 0 && `.sld-min { ${cs.bg.black} }`}
      ${({ pos }) => Number.parseInt(pos) >= 100 && `.sld-max { ${cs.bg.black} }`}
    }

    &.theme-sky { .sld-color, .sld-layer .sld-frame .sldf-line { ${cs.bg.sky} ${cs.font.dark} .sldf-line-bar { ${cs.bg.primary} } } 
      ${({ pos }) => Number.parseInt(pos) > 0 && `.sld-min { ${cs.bg.primary} }`}
      ${({ pos }) => Number.parseInt(pos) >= 100 && `.sld-max { ${cs.bg.primary} }`}
    }
    &.theme-primary { .sld-color, .sld-layer .sld-frame .sldf-line { ${cs.bg.primary} ${cs.font.white} .sldf-line-bar { ${cs.bg.primaryhover} ${cs.font.white} } } 
      ${({ pos }) => Number.parseInt(pos) > 0 && `.sld-min { ${cs.bg.primaryhover} }`}
      ${({ pos }) => Number.parseInt(pos) >= 100 && `.sld-max { ${cs.bg.primaryhover} }`}
    }
    &.theme-gray { .sld-color, .sld-layer .sld-frame .sldf-line { ${cs.bg.lightgray} ${cs.font.white} .sldf-line-bar { ${cs.bg.darkgray} ${cs.font.white} } }
      ${({ pos }) => Number.parseInt(pos) > 0 && `.sld-min { ${cs.bg.darkgray} }`}
      ${({ pos }) => Number.parseInt(pos) >= 100 && `.sld-max { ${cs.bg.darkgray} }`}
    }
    &.theme-dark { .sld-color, .sld-layer .sld-frame .sldf-line { ${cs.bg.gray} ${cs.font.white} .sldf-line-bar { ${cs.bg.dark} ${cs.font.white} } }
      ${({ pos }) => Number.parseInt(pos) > 0 && `.sld-min { ${cs.bg.dark} }`}
      ${({ pos }) => Number.parseInt(pos) >= 100 && `.sld-max { ${cs.bg.dark} }`}
    }
    &.theme-black { .sld-color, .sld-layer .sld-frame .sldf-line { ${cs.bg.darkgray} ${cs.font.white} .sldf-line-bar { ${cs.bg.black} ${cs.font.white} } }
      ${({ pos }) => Number.parseInt(pos) > 0 && `.sld-min { ${cs.bg.black} }`}
      ${({ pos }) => Number.parseInt(pos) >= 100 && `.sld-max { ${cs.bg.black} }`}
    }

    .sld-header {
      .sldh-label {
        ${({ label }) => label && label.align && cs.align[label.align]}
        ${({ label }) => label && label.color && cs.font.color(label.color)}
      }

      .sldh-unit {
        ${({ unit }) => unit && unit.align && cs.align[unit.align]}
        ${({ unit }) => unit && unit.color && cs.font.color(unit.color)}
      }

      ${({ head }) => head && head.align && `.sldh-unit, .sldh-label { ${cs.align.unset} } ${cs.font.align(head.align)}`}
      ${({ head }) => head && head.size && `.sldh-unit, .sldh-label { ${cs.font.size(head.size)} } ${cs.h.fit} `}
      ${({ head }) => head && head.color && `.sldh-unit, .sldh-label { ${cs.font.color(head.color)} } `}
    }
  }
}`;

export default class Slider extends React.PureComponent {
  constructor(props) {
    super(props);

    this.object = {};

    const max = props.max ? Number.parseInt(props.max) : 100;
    const min = props.min ? Number.parseInt(props.min) : 0;
    const value = props.value ? Number.parseInt(props.value) : min;
    const step = props.step ? Number.parseInt(props.step) : 1;
    const pos = this.toPos(value, min, max);

    this.state = { modified: false, move: false, from: min, to: min, pos: pos, value, min, max, step, editor: false };
  }

  componentDidMount() {
    this.createLineBar();
  }

  createLineBar = () => {
    const { state, object } = this;
    const { value } = state;

    const pos = this.toPos(value);
    this.setState({ pos: pos });
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
  }

  onInputChanged = (value, e) => {
  }

  onClicked = (e) => {
    const eid = e.currentTarget.getAttribute('eid');
    if (eid === 'min') {
      this.setState({ value: this.state.min });
      this.createLineBar();
    } else if (eid === 'max') {
      this.setState({ value: this.state.max });
      this.createLineBar();
    } else {
      this.onMouseDown(e);
      this.onMouseMove(e);
      this.onMouseUp(e);
    }
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
      // 포인터의 이동 거리
      const gap = (slidebar.offsetWidth + minpos) / ((state.max - state.min));
      // 이동거리별 값
      let value = Number((offsetX / gap).toFixed(0)) + state.min;

      const pos = this.toPos(value);

      this.setState({ value, pos });
    }
  }

  onMouseUp = () => {
    this.setState({ move: false });
    this.onChanged();
  }

  render() {
    const { state, props, object } = this;
    const { editor, pos, min, max, value } = state;
    const { disabled, theme } = props;
    const { unit, label, head } = props.options || { unit: null, label: null, head: null };

    return (
      <StyledObject {...props} eid={props.eid} className={cx('slider', props.className, { disabled }, theme && `theme-${theme}`)}
        pos={pos} label={label} unit={unit} head={head}>
        {(props.label || props.unit) && <div className="sld-header">
          {props.label && <label className={"sldh-label"}>{props.label}</label>}
          {props.unit && <label className={"sldh-unit"}>{props.unit}</label>}
        </div>}

        <span className={'sld-value sld-color'} onClick={this.onClickEditor}>{state.value}</span>
        {editor && <div className={'sld-editor'} >
          <div className={"slde-bg"} onClick={this.onCloseEditor} />
          <Editbox className="slde-box md center border radius"
            value={state.value} name="value" type="number" maxLength="10"
            onEnter={this.onEnterEditor} focus={true} />
        </div>}

        <div className={"sld-layer"}>
          <span className="sld-min sld-color" onClick={this.onClicked} eid={'min'}>{min}</span>
          <span className="sld-max sld-color" onClick={this.onClicked} eid={'max'}>{max}</span>
          <span className="sld-frame" onClick={this.onClicked} eid={"bar"}
            onMouseDown={this.onMouseDown} onMouseMove={this.onMouseMove} onMouseUp={this.onMouseUp}>
            <div className="sldf-line sld-color" ref={ref => object.slidebar = ref}>
              <div className="sldf-line-bar" />
            </div>
            <span className="sldf-pos">{value}</span>
          </span>
        </div>
      </StyledObject>
    )
  }
}