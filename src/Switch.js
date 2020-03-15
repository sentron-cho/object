import React from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import { cs } from './index';

const StyledObject = styled.span`{
  &.switch { 
    ${cs.size.fit} ${cs.disp.inblock} ${cs.pos.relative} ${cs.font.dark}

    .sw-label { 
      ${cs.disp.block} ${cs.p.a0} ${cs.font.sm} ${cs.font.left} 
      ${cs.border.none} ${cs.font.weight(500)} 
    }

    .sw-slider { ${cs.bg.dark} ${cs.pos.relative} ${cs.mouse.pointer}
      ${cs.w.get(48)} ${cs.h.get(26)} ${cs.disp.block} ${cs.font.white}

      &::before { 
        ${cs.z.get(2)} ${cs.align.ltop} ${cs.left(4)} ${cs.top(4)}
        ${cs.box.sizing('border-box')} ${cs.icon.sm} ${cs.bg.lightwhite}
        ${cs.align.x(0)} ${cs.anim.hide} ${cs.content.none}
      }

      &::after {
        ${cs.z.get(1)} ${cs.w.half} ${cs.m.top(-2)}
        ${cs.font.xs} ${cs.font.weight(600)} ${cs.font.center} ${cs.align.ycenter}
        ${cs.right(1)} ${cs.font.gray} ${cs.anim.get('inherit')}
        ${cs.content.attr('data-unchecked')}
      }

      &.checked {
        // ${cs.border.gray}
        ::before { ${cs.align.x(23)} }
        ::after { ${cs.left(1)} ${cs.font.white} ${cs.content.attr('data-checked')} }
      }
    }

    &.symbol {
      .sw-slider { &::after { ${cs.m.top(-1)} } }
    }

    &.radius { 
      .sw-slider {
        ${cs.border.radius(5)} 
        &::before { ${cs.border.radius(3)} }
      }
    }

    &.border {
      .sw-slider { ${cs.box.line} }
    }

    
    &.xs { 
      .sw-label { ${cs.font.get(10)} } 
      .sw-slider { ${cs.w.get(38)} ${cs.h.get(18)} 
        &::before { ${cs.icon.get(14)} ${cs.left(2)} ${cs.top(2)} } 
        &::after { } 
        &.checked { ::before { ${cs.align.x(19)} } } 
      } 
    }
    &.sm { 
      .sw-label { ${cs.font.get(12)} } 
      .sw-slider { ${cs.w.get(42)} ${cs.h.get(22)} 
        &::before { ${cs.icon.get(14)} ${cs.left(2)} ${cs.top(3)} } 
        &::after { } 
        &.checked { ::before { ${cs.align.x(22)} } } 
      } 
    }
    &.lg { 
      .sw-label { ${cs.font.get(14)} } 
      .sw-slider { ${cs.w.get(60)} ${cs.h.get(36)} 
        &::before { ${cs.icon.get(24)} ${cs.left(2)} ${cs.top(6)} } 
        &::after { ${cs.font.sm} } 
        &.checked { ::before { ${cs.align.x(29)} } } 
      } 
    }
    
    &.left { }
    &.right { ${cs.align.right} .sw-slider { ${cs.float.right} } }
    &.center { ${cs.align.xcenter} .sw-slider { ${cs.align.xcenter} ${cs.pos.relative} } }
    &.top { ${cs.align.top} }
    &.middle { ${cs.align.ycenter} }
    &.bottom { ${cs.align.bottom} }
    &.center.middle { ${cs.pos.absolute} ${cs.top("50%")} ${cs.left("50%")} ${cs.align.get("translate(-50%, -50%)")} }

    &.trans { .sw-slider { ${cs.bg.white} ${cs.font.black} &::after { ${cs.font.gray} } &.checked::after { ${cs.font.dark} } } }
    &.sky { .sw-slider { ${cs.bg.sky} ${cs.font.black} &::after { ${cs.font.gray} } &.checked::after { ${cs.font.dark} } } }
    &.orange { .sw-slider { ${cs.bg.orange} ${cs.font.white} &::after { ${cs.font.lightgray} } &.checked::after { ${cs.font.white} } } }
    &.green { .sw-slider { ${cs.bg.green} ${cs.font.white} &::after { ${cs.font.lightgray} } &.checked::after { ${cs.font.white} } } }
    &.red { .sw-slider { ${cs.bg.red} ${cs.font.white} &::after { ${cs.font.lightgray} } &.checked::after { ${cs.font.white} } } }
    &.primary { .sw-slider { ${cs.bg.primary} ${cs.font.white} &::after { ${cs.font.lightgray} } &.checked::after { ${cs.font.white} } } }
    &.gray { .sw-slider { ${cs.bg.lightgray} ${cs.font.black} &::after { ${cs.font.gray} } &.checked::after { ${cs.font.dark} } } }
    &.dark { .sw-slider { ${cs.bg.dark} ${cs.font.white} &::after { ${cs.font.lightgray} } &.checked::after { ${cs.font.white} } } }
    &.black { .sw-slider { ${cs.bg.black} ${cs.font.white} &::after { ${cs.font.lightgray} } &.checked::after { ${cs.font.white} } } }

    &.theme-sky { .sw-slider { ${cs.bg.sky} ${cs.font.black} &::after { ${cs.font.gray} } &.checked::after { ${cs.font.dark} } } }
    &.theme-primary { .sw-slider { ${cs.bg.primary} ${cs.font.white} &::after { ${cs.font.lightgray} } &.checked::after { ${cs.font.white} } } }
    &.theme-gray { .sw-slider { ${cs.bg.lightgray} ${cs.font.black} &::after { ${cs.font.gray} } &.checked::after { ${cs.font.dark} } } }
    &.theme-dark { .sw-slider { ${cs.bg.dark} ${cs.font.white} &::after { ${cs.font.lightgray} } &.checked::after { ${cs.font.white} } } }
    &.theme-black { .sw-slider { ${cs.bg.black} ${cs.font.white} &::after { ${cs.font.lightgray} } &.checked::after { ${cs.font.white} } } }
    
    &.disable {
      .sw-slider { ${cs.mouse.default} ${cs.opac.alpha} ${cs.font.dark}
      }

      &.dark, &.black, &.primary { .sw-slider { ${cs.font.lightgray} } }
    }

    .sw-label {
      ${({ label }) => label && label.align && cs.font.align(label.align)}
      ${({ label }) => label && label.color && cs.font.color(label.color)}
    }

    .sw-slider {
      ${({border}) => border && cs.box.line}
      ${({border}) => border && border.color && cs.border.color(border.color)}
      ${({border}) => border && border.radius && cs.border.radius(border.radius)}
      ${({border}) => border && border.width && cs.border.width(border.width)}

      &::before, &.checked::before { ${({border}) => border && border.radius && cs.border.radius(`calc(${border.radius} / 2)`)} }
    }
  }
}`;

export default class Switch extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { checked: props.checked ? props.checked : true, modified: false };
  }

  isValidate = () => (true);

  isModified = () => (this.state.modified);

  isEmpty = () => (false);

  getValue = () => (this.state.checked);

  onClicked = (e) => {
    const { state, props } = this;
    let checked = !state.checked;
    this.setState({ checked: checked, modified: true });
    props.onClick && props.onClick(props.eid, checked, e);
  }

  render() {
    const { state, props } = this;
    const { symbol, on = "ON", off = "OFF", theme } = props;
    const { checked } = state;
    const ton = symbol ? "✓" : on;
    const toff = symbol ? "✕" : off;
    const disable = props.disable || props.disabled || null;
    const { text, label, border } = props.options || { text: null, label: null, border: null };

    console.dir(border);
    return (
      <StyledObject {...props} eid={props.eid} className={cx('switch', props.className, { disable }, { symbol }, `theme-${theme}`)} 
        onClick={disable ? () => null : this.onClicked} text={text} label={label} border={border} >
        {props.label ? <label className="sw-label">{props.label}</label> : null}
        <span className={cx("sw-slider", { checked })} data-checked={ton} data-unchecked={toff} />
      </StyledObject>
    )
  }
}