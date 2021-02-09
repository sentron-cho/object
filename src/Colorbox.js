import React from 'react';
import cx from 'classnames/bind';
import styled from 'styled-components';
import { CompactPicker } from 'react-color';
import { Svg, cs } from './index'

const StyledObject = styled.div` {
  &.color-box {
    ${cs.max.width(400)} ${cs.pos.relative} 

    & > div > div:first-child { ${cs.over.hidden} }
    
    &.label {
      & > div { ${cs.p.t20} }
    }

    .flexbox-fix > div { ${cs.bg.get('transparent !important')} }

    .picker-box { 
      ${cs.w.get('100% !important')}
      & > div { ${cs.w.calc('100% - 10px')} } 
    }

    .label { 
      ${cs.disp.inblock} ${cs.p.a0} ${cs.font.sm} ${cs.align.left} 
      ${cs.border.none} ${cs.font.bold} ${cs.z.front} ${cs.p.l5} ${cs.p.t3}
      ${cs.w.calc('100% - 10px')}
    }

    input { ${cs.bg.get(`${cs.color.trans} !important;`)} }

    .btn-clear { ${cs.align.lbottom} ${cs.bottom(7)} ${cs.left(8)} .svg-path { ${cs.fill.dark} } }

    // &.white {
    //   & > div > div:first-child { background: #ffffff !important; border: 1px solid #8e8e8e !important; }
    // }

    // &.black {
    //   & > div > div:first-child { background: #212121 !important; border: 1px solid #8c8c8cc9 !important; }
    // }

    
    &.trans { & > div > div:first-child { ${cs.bg.get(`${cs.color.white} !important;`)} } }
    &.sky { & > div > div:first-child { ${cs.bg.get(`${cs.color.sky} !important;`)} } }
    &.orange { & > div > div:first-child { ${cs.bg.get(`${cs.color.orange} !important;`)} } 
      .label { ${cs.font.white} } 
      input { ${cs.font.color(`${cs.color.white} !important`)} ${cs.bg.get(`${cs.color.orange} !important;`)}
        & + span { ${cs.font.color(`${cs.color.lightgray} !important`)} } 
      }
      .btn-clear { .svg-path { ${cs.fill.white} } }
    }
    &.green { & > div > div:first-child { ${cs.bg.get(`${cs.color.green} !important;`)} } 
      .label { ${cs.font.white} } 
      input { ${cs.font.color(`${cs.color.white} !important`)} ${cs.bg.get(`${cs.color.green} !important;`)}
        & + span { ${cs.font.color(`${cs.color.lightgray} !important`)} } 
      }
      .btn-clear { .svg-path { ${cs.fill.white} } }
    }
    &.red { & > div > div:first-child { ${cs.bg.get(`${cs.color.red} !important;`)} }
      .label { ${cs.font.white} } 
      input { ${cs.font.color(`${cs.color.white} !important`)} ${cs.bg.get(`${cs.color.red} !important;`)}
        & + span { ${cs.font.color(`${cs.color.lightgray} !important`)} } 
      }
      .btn-clear { .svg-path { ${cs.fill.white} } }
    }
    &.primary { 
      & > div > div:first-child { ${cs.bg.get(`${cs.color.primary} !important;`)} } 
      .label { ${cs.font.white} } 
      input { ${cs.font.color(`${cs.color.white} !important`)} ${cs.bg.get(`${cs.color.primary} !important;`)}
        & + span { ${cs.font.color(`${cs.color.lightgray} !important`)} } 
      } 
      .btn-clear { .svg-path { ${cs.fill.white} } }
    }
    &.gray { & > div > div:first-child { ${cs.bg.get(`${cs.color.gray} !important;`)} } 
      input { ${cs.font.color(`${cs.color.white} !important`)} ${cs.bg.get(`${cs.color.gray} !important;`)}
        & + span { ${cs.font.color(`${cs.color.lightgray} !important`)} } 
      }
      .btn-clear { .svg-path { ${cs.fill.white} } }
    }
    &.dark { 
      & > div > div:first-child { ${cs.bg.get(`${cs.color.dark} !important;`)} } 
      .label { ${cs.font.white} } 
      input { ${cs.font.color(`${cs.color.white} !important`)} ${cs.bg.get(`${cs.color.dark} !important;`)}
        & + span { ${cs.font.color(`${cs.color.lightgray} !important`)} } 
      } 
      .btn-clear { .svg-path { ${cs.fill.lightgray} } }
    }
    &.black { 
      & > div > div:first-child { ${cs.bg.get(`${cs.color.black} !important;`)} } 
      .label { ${cs.font.white} } 
      input { ${cs.font.color(`${cs.color.white} !important`)} ${cs.bg.get(`${cs.color.black} !important;`)} 
        & + span { ${cs.font.color(`${cs.color.lightgray} !important`)} } 
      } 
      .btn-clear { .svg-path { ${cs.fill.lightgray} } }
    }

    &.theme-sky { & > div > div:first-child { ${cs.bg.get(`${cs.color.sky} !important;`)} } }
    &.theme-primary { 
      & > div > div:first-child { ${cs.bg.get(`${cs.color.primary} !important;`)} } 
      .label { ${cs.font.white} } 
      input { ${cs.font.color(`${cs.color.white} !important`)} ${cs.bg.get(`${cs.color.primary} !important;`)}
        & + span { ${cs.font.color(`${cs.color.lightgray} !important`)} } 
      } 
      .btn-clear { .svg-path { ${cs.fill.white} } }
    }
    &.theme-gray { & > div > div:first-child { ${cs.bg.get(`${cs.color.gray} !important;`)} } 
      input { ${cs.font.color(`${cs.color.white} !important`)} ${cs.bg.get(`${cs.color.gray} !important;`)}
        & + span { ${cs.font.color(`${cs.color.lightgray} !important`)} } 
      }
      .btn-clear { .svg-path { ${cs.fill.white} } }
    }
    &.theme-dark { 
      & > div > div:first-child { ${cs.bg.get(`${cs.color.dark} !important;`)} } 
      .label { ${cs.font.white} } 
      input { ${cs.font.color(`${cs.color.white} !important`)} ${cs.bg.get(`${cs.color.dark} !important;`)}
        & + span { ${cs.font.color(`${cs.color.lightgray} !important`)} } 
      } 
      .btn-clear { .svg-path { ${cs.fill.lightgray} } }
    }
    &.theme-black { 
      & > div > div:first-child { ${cs.bg.get(`${cs.color.black} !important;`)} } 
      .label { ${cs.font.white} } 
      input { ${cs.font.color(`${cs.color.white} !important`)} ${cs.bg.get(`${cs.color.black} !important;`)} 
        & + span { ${cs.font.color(`${cs.color.lightgray} !important`)} } 
      } 
      .btn-clear { .svg-path { ${cs.fill.lightgray} } }
    }
    
    &.no-shadow {
      & > div > div:first-child { border: 1px solid #eaeaea; box-shadow: none; box-shadow: none !important; }
    }

    &.border {
      & > div > div:first-child { ${cs.box.line} ${cs.border.radius('0 !important')} }
    }

    &.radius {
      & > div > div:first-child { ${cs.border.radius('5px !important')} }
    }

    .label {
      ${({ title }) => title && title.align && cs.font.align(title.align)}
      ${({ title }) => title && title.color && cs.font.color(title.color)}
    }

    & > div > div:first-child {
      ${({ border }) => border && cs.box.line}
      ${({ border }) => border && border.color && cs.border.color(border.color)}
      ${({ border }) => border && border.radius && cs.border.radius(`${border.radius} !important`)}
      ${({ border }) => border && border.width && cs.border.width(border.width)}
    }

    @media screen and (max-width : 860px) {
    }
  }
}`;

export default class Colorbox extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { list: props.list, noti: false, noti_value: '', modified: false, value: props.value ? props.value : "", color: {} };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value });
    }
  }

  isValidate = () => {
    if (this.isEmpty()) {
      return this.showNoti();
    }

    return true;
  };

  isModified = () => (this.state.modified);

  isEmpty = () => {
    // const items = this.getChecked();
    // return items == null || items.length < 1;
    return false;
  }

  getValue = () => {
    return this.state.value;
  }

  getSelected = () => {
    return this.state.color;
  }

  showNoti = (value) => {
    return false;
  }

  onClear = (eid, e) => {
    const { props } = this;
    const color = { r: 0, g: 0, b: 0, a: 0 };
    const value = "#00000000";
    props.onChange && props.onChange(value, color, e);
    this.setState({ modified: true, color: color, value: value });
  }

  onChanged = (value, e) => {
    const { state, props } = this;
    const { hex, rgb } = value;
    state.color = value;
    state.value = hex;
    props.onChange && props.onChange(hex, rgb, e);
    state.modified = true;
  }

  render() {
    const { props, state } = this;
    const type = props.type ? props.type : 'compact';
    const { theme, clear, label, className } = props;
    const { border, title } = props.options || { border: null, title: null };

    return (
      <StyledObject className={cx('color-box', className, { theme }, { label }, theme && `theme-${theme}`)} border={border} title={title} >
        {label && <label className="label">{label}</label>}
        {type === "compact" && <CompactPicker className={"picker-box"} onChange={this.onChanged} color={state.value} />}
        {clear && <Svg className="btn-clear xs" onClick={this.onClear} eid={"clear"} icon={'clear'} />}
      </StyledObject >
    )
  }
}