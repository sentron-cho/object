import React from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import Svg from './Svg';
import { IMG } from './Icons';
import cs from './css-style';

// 버튼 오브젝트
const StyledObject = styled.span`{
  &.button { ${cs.pos.relative} ${cs.border.radius(2)} ${cs.over.hidden} ${cs.box.inner}
    ${cs.disp.inblock} ${cs.mouse.pointer} ${cs.border.trans} ${cs.noselect}

    &:hover { ${cs.anim.show} ${cs.opac.get(0.8)} }

    &.md { ${cs.h.md} ${cs.font.md} ${cs.p.get("0px 20px")} }
    &.xl { ${cs.h.xl} ${cs.font.xl} ${cs.p.get("0px 24px")} }
    &.lg { ${cs.h.lg} ${cs.font.lg} ${cs.p.get("0px 22px")} }
    &.sm { ${cs.h.sm} ${cs.font.sm} ${cs.p.get("0px 8px")} }
    &.xs { ${cs.h.xs} ${cs.font.xs} ${cs.p.get("0px 4px")} }

    &.icon { ${cs.disp.get("inline-flex")} 
      .btn-icon { ${cs.align.ycenter} ${cs.opac.show} ${cs.pos.relative} }
      .btn-label { ${cs.align.center} ${cs.pos.relative} ${cs.p.l0} }

      &.md { .btn-icon { ${cs.icon.sm} ${cs.m.left(-4)} } .btn-label { ${cs.p.get("0px 18px")} ${cs.p.b2} ${cs.p.left(0)} } }
      &.xl { .btn-icon { ${cs.icon.md} ${cs.m.left(-6)} } .btn-label { ${cs.p.get("0px 30px")} ${cs.p.b2} ${cs.p.left(0)} } }
      &.lg { .btn-icon { ${cs.icon.sm} ${cs.m.left(-4)} } .btn-label { ${cs.p.get("0px 18px")} ${cs.p.b2} ${cs.p.left(0)} } }
      &.sm { .btn-icon { ${cs.icon.xs} ${cs.m.left(-1)} } .btn-label { ${cs.p.get("0px 14px")} ${cs.p.b2} ${cs.p.left(0)} } }
      &.xs { .btn-icon { ${cs.icon.get(10)} ${cs.m.left(0)} } .btn-label { ${cs.p.get("0px 12px")} ${cs.p.b2} ${cs.p.left(0)} } }

      .running { ${cs.z.front} }
    }

    &.trans { ${cs.bg.trans} ${cs.font.black} &:hover { ${cs.font.underline} } }
    &.sky { ${cs.bg.sky} ${cs.font.dark} }
    &.primary { ${cs.bg.primary} ${cs.font.white} }
    &.yellow { ${cs.bg.yellow} ${cs.font.black} }
    &.orange { ${cs.bg.orange} ${cs.font.white} }
    &.red { ${cs.bg.red} ${cs.font.white} }
    &.green { ${cs.bg.green} ${cs.font.white} }
    &.gray { ${cs.bg.gray} ${cs.font.black} }
    &.dark { ${cs.bg.dark} ${cs.font.white} }
    &.black { ${cs.bg.black} ${cs.font.white} }
    &.lightgray { ${cs.bg.lightwhite} ${cs.font.black} }
    &.white { ${cs.bg.white} ${cs.font.black} }
    &.primary-line { ${cs.bg.trans} ${cs.font.primary} ${cs.box.line} ${cs.border.primary} }
    &.gray-line { ${cs.bg.trans} ${cs.font.dark} ${cs.box.line} ${cs.border.gray} }
    &.gd-gray { background-image: linear-gradient(-180deg, ${cs.color.lightgray}, ${cs.color.lightwhite} 90%); ${cs.font.dark} ${cs.box.line} ${cs.border.lightgray} }

    &.theme-sky { ${cs.bg.sky} ${cs.font.dark} }
    &.theme-primary { ${cs.bg.primary} ${cs.font.white} }
    &.theme-gray { ${cs.bg.gray} ${cs.font.black} }
    &.theme-dark { ${cs.bg.dark} ${cs.font.white} }
    &.theme-black { ${cs.bg.black} ${cs.font.white} }

    &.disabled { ${cs.mouse.default} ${cs.opac.alpha}
      ${cs.font.lightgray} 
      // ${cs.box.line} ${cs.border.lightwhite}
      .btn-label { ${cs.mouse.default} }
      // &.primary, &.orange, &.red, &.green, &.dark, &.black, &.gray { ${cs.font.white} }
      &.trans:hover { &:hover { ${cs.font.noneline} } }
    }

    &.right { ${cs.align.right} }
    &.center { ${cs.align.xcenter} }
    &.top { ${cs.align.top} }
    &.middle { ${cs.align.ycenter} }
    &.bottom { ${cs.align.bottom} }
    &.center.middle { ${cs.pos.absolute} ${cs.top("50%")} ${cs.left("50%")} ${cs.align.get("translate(-50%, -50%)")} }

    &.rtype { ${cs.border.radius("0 2px 2px 0")} ${cs.box.line} ${cs.border.gray} }
    &.ltype { ${cs.border.radius("2px 0 0 2px")} ${cs.box.line} ${cs.border.gray} border-right: 0px; }
    &.ctype { ${cs.border.radius("0")} ${cs.box.line} ${cs.border.gray} border-right: 0px; border-left: 0px; }

    &.border { ${cs.box.line} }

    &.full { ${cs.w.full} ${cs.p.h0} }

    .btn-label {
      ${cs.align.ycenter} ${cs.pos.relative} ${cs.disp.inblock} 
      ${cs.font.center} ${cs.h.fit} ${cs.mouse.pointer}
    }

    ${({ border }) => border && cs.box.line}
    ${({ border }) => border && border.color && cs.border.color(border.color)}
    ${({ border }) => border && border.radius && cs.border.radius(border.radius)}
    ${({ border }) => border && border.width && cs.border.width(border.width)}
  }
}`;

const Button = (props) => {
  const onClicked = (e) => {
    props.onClick && props.onClick(props.eid || 'button', e);
  }

  let disabled = (props.disabled === undefined) ? props.disable : props.disabled;
  const isrun = props.isrun ? props.isrun : false;
  if (isrun) disabled = true;
  const { icon, type, iconcolor = cs.color.white, theme } = props;
  const isicon = icon || isrun ? 'icon' : '';
  const { text, label } = props.options || { text: null, label: null };

  return (
    <StyledObject {...props} eid={props.eid} className={cx('button md', props.className, { disabled }, type, isicon, theme && `theme-${theme}`)}
      onClick={disabled ? () => null : onClicked} to={props.to} text={text} label={label} border={props.border}>
      {isrun && <img className={cx("btn-icon running")} src={IMG.LoadingRing} alt='r' />}
      {!isrun && icon && <Svg className={cx("btn-icon sm")} icon={icon} color={iconcolor} />}
      <label className="btn-label">{props.title || 'button'}</label>
    </StyledObject>
  )
}

export default Button;