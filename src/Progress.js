import React from 'react';
import styled from 'styled-components';
import cx from 'classnames';
import { Svg, cs } from './index';

const StyledObject = styled.div`{
  &.prog-box {
    ${({ width }) => cs.w.get(width)} ${({ height }) => cs.h.get(height)}
    ${cs.disp.block} ${cs.bg.sky} ${cs.over.hidden}
    ${cs.m.a0} ${cs.box.line} ${cs.box.inner} ${cs.border.trans}
    ${cs.pos.relative} ${cs.font.gray}

    .pb-label { ${cs.pos.absolute} ${cs.z.front} ${cs.font.dark} ${cs.font.xs} ${cs.bottom(0)} ${cs.left(3)} }
    .pb-txt {
      ${cs.pos.absolute} ${cs.font.xs} ${cs.font.right} ${cs.align.rbottom} ${cs.bottom(0)}
    }

    .pb-bar { 
      ${cs.h.calc("100%")} ${cs.w.get(0)} ${cs.bg.green} ${cs.disp.inblock} ${cs.max.w('100%')}
      ${cs.float.left} ${cs.border.right} ${cs.border.primary} ${cs.pos.relative}

      &.norm { ${cs.bg.lightprimary} }
      &.warn { ${cs.bg.get("#ff8d17c0")} }
      &.err { ${cs.bg.get("#ff5413c0")} }
      &.full { border-radius: 4px; }
    }

    .pb-icon { 
      ${cs.icon.get(12)} ${cs.z.icon} ${cs.opac.show} ${cs.pos.relative}
      ${cs.left(-7)} ${cs.top(-4)}
    }

    &.notext { .pb-txt { ${cs.disp.none} } }

    &.border { ${cs.border.lightgray} }
    &.radius { ${cs.box.radius} .pb-bar { ${cs.border.radius("4px")} } }

    &.md { ${cs.h.get(16)} .pb-label { ${cs.font.xs} } .pb-icon { ${cs.icon.get(12)} ${cs.left(-7)} ${cs.top(-4)} } }
    &.xl { ${cs.h.get(28)} .pb-label { ${cs.font.md} } .pb-icon { ${cs.icon.sm} ${cs.left(-10)} ${cs.top(4)} } }
    &.lg { ${cs.h.get(22)} .pb-label { ${cs.font.sm} } .pb-icon { ${cs.icon.sm} ${cs.left(-12)} ${cs.top(1)} } }
    &.sm { ${cs.h.get(14)} .pb-label { ${cs.font.xs} } .pb-icon { ${cs.icon.get(10)} ${cs.left(-6)} ${cs.top(-6)} } }
    &.xs { ${cs.h.get(10)} .pb-label { ${cs.font.xs} } .pb-icon { ${cs.icon.get(8)} ${cs.left(-6)} ${cs.top(-9)} } }

    &.trans { ${cs.bg.trans} ${cs.font.gray} .pb-bar.norm { ${cs.bg.lightgray} } }
    &.sky { ${cs.bg.sky} ${cs.font.gray} .pb-bar.norm { ${cs.bg.lightprimary} } }
    &.green { ${cs.bg.green} ${cs.font.white} .pb-label { ${cs.font.white} } .pb-bar.norm { ${cs.bg.greenhover} } }
    &.orange { ${cs.bg.orange} ${cs.font.white} .pb-label { ${cs.font.white} } .pb-bar.norm { ${cs.bg.orangehover} } }
    &.red { ${cs.bg.red} ${cs.font.white}  .pb-label { ${cs.font.white} } .pb-bar.norm { ${cs.bg.redhover} } }
    &.primary { ${cs.bg.primary} ${cs.font.white}  .pb-label { ${cs.font.white} } .pb-bar.norm { ${cs.bg.primaryhover} } }
    &.blue { ${cs.bg.blue} ${cs.font.white}  .pb-label { ${cs.font.white} } .pb-bar.norm { ${cs.bg.primary} } }
    &.gray { ${cs.bg.gray} ${cs.font.white}  .pb-label { ${cs.font.white} } .pb-bar.norm { ${cs.bg.dark} } }
    &.dark { ${cs.bg.dark} ${cs.font.white}  .pb-label { ${cs.font.white} } .pb-bar.norm { ${cs.bg.gray} } }
    &.black { ${cs.bg.black} ${cs.font.white}  .pb-label { ${cs.font.white} } .pb-bar.norm { ${cs.bg.dark} } }

    &.theme-sky { ${cs.bg.sky} ${cs.font.gray} }
    &.theme-primary { ${cs.bg.primary} ${cs.font.white}  .pb-label { ${cs.font.white} } }
    &.theme-gray { ${cs.bg.gray} ${cs.font.white}  .pb-label { ${cs.font.white} } }
    &.theme-dark { ${cs.bg.dark} ${cs.font.white}  .pb-label { ${cs.font.white} } }
    &.theme-black { ${cs.bg.black} ${cs.font.white}  .pb-label { ${cs.font.white} } }

    &.nobg { ${cs.bg.trans} ${cs.box.line} }
    &.alphabg { ${cs.bg.get("#00000005")} }

    ${({ border }) => border && `${cs.box.line}`}
    ${({ border }) => border && border.color && `${cs.border.color(border.color)}`}
    ${({ border }) => border && border.radius && `${cs.border.radius(border.radius)}`}
    ${({ border }) => border && border.width && `${cs.border.width(border.width)}`}
  }
}`;

const Progress = (props) => {

  const {
    max = 100, min = 0, value = 0, limit = 70, unit = '',
    width = '100%', height = '16px', label = null,
    border, theme, islevel = false
  } = props;
  let rate = props.rate;
  if (max > 0 && value > 0) {
    rate = Math.floor(value / (max - min) * 100);
  }

  let bar_style = 'norm';
  if (islevel) {
    if (rate >= 100) {
      bar_style = 'err';
    } else if (rate >= limit) {
      bar_style = 'warn';
    } else if (rate > 50) {
      // bar_style = 'norm';
    }
  }

  let alarm = bar_style === 'warn' || bar_style === 'err' ? bar_style : null;

  const prog = { width: `${rate}%` }
  const full = (rate >= 100);

  return (
    <StyledObject className={cx("prog-box", props.className, (full), theme && `theme-${theme}`)} width={width} height={height} border={border}>
      {label && <span className={"pb-label"}>{label}</span>}
      {rate > 0 && <span className="pb-txt">{`${rate} ${unit ? unit : ''}`}</span>}
      {rate > 0 && <span className={cx("pb-bar", bar_style)} style={prog}></span>}
      {alarm && <Svg className="pb-icon md" icon={alarm === "warn" ? 'warning' : 'alarm'} color={"#d50000"} />}
    </StyledObject>
  )
}

export default Progress;