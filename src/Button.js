import React from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import Svg from './Svg';
import { IMG } from './Icons';
import cs from './css-style';

// 버튼 오브젝트
const StyledObject = styled.span`{
  &.button { ${cs.pos.relative} ${cs.border.radius(2)} ${cs.over.hidden} ${cs.disp.inblock} ${cs.mouse.pointer}
    ${cs.float.left} ${cs.top(0)}

    &:hover { ${cs.anim.show} ${cs.opac.get(0.8)} }

    &.md { ${cs.h.md} ${cs.font.md} ${cs.p.get("0px 20px")} }
    &.xl { ${cs.h.xl} ${cs.font.xl} ${cs.p.get("0px 24px")} }
    &.lg { ${cs.h.lg} ${cs.font.lg} ${cs.p.get("0px 22px")} }
    &.sm { ${cs.h.sm} ${cs.font.sm} ${cs.p.get("0px 8px")} }
    &.xs { ${cs.h.xs} ${cs.font.xs} ${cs.p.get("0px 4px")} }

    &.icon { ${cs.disp.get("inline-flex")} 
      .btn-icon { ${cs.align.ycenter} ${cs.opac.show} }
      .btn-label { ${cs.align.center} ${cs.pos.relative} }

      &.md { .btn-icon { ${cs.icon.sm} ${cs.m.left(-4)} } .btn-label { ${cs.p.get("0px 18px")} ${cs.p.b2} ${cs.p.left(22)} } }
      &.xl { .btn-icon { ${cs.icon.md} ${cs.m.left(-6)} } .btn-label { ${cs.p.get("0px 30px")} ${cs.p.b2} ${cs.p.left(30)} } }
      &.lg { .btn-icon { ${cs.icon.sm} ${cs.m.left(-4)} } .btn-label { ${cs.p.get("0px 18px")} ${cs.p.b2} ${cs.p.left(22)} } }
      &.sm { .btn-icon { ${cs.icon.xs} ${cs.m.left(-1)} } .btn-label { ${cs.p.get("0px 14px")} ${cs.p.b2} ${cs.p.left(18)} } }
      &.xs { .btn-icon { ${cs.icon.get(10)} ${cs.m.left(0)} } .btn-label { ${cs.p.get("0px 12px")} ${cs.p.b2} ${cs.p.left(16)} } }

      .running { ${cs.z.front} }
    }

    &.trans { ${cs.bg.trans} ${cs.font.black} &:hover { ${cs.font.underline} } }
    &.primary { ${cs.bg.primary} ${cs.font.white} ${cs.border.trans} }
    &.yellow { ${cs.bg.yellow} ${cs.font.white} ${cs.border.trans} }
    &.orange { ${cs.bg.orange} ${cs.font.white} ${cs.border.trans} }
    &.red { ${cs.bg.red} ${cs.font.white} ${cs.border.trans} }
    &.green { ${cs.bg.green} ${cs.font.white} ${cs.border.trans} }
    &.dark { ${cs.bg.dark} ${cs.font.white} ${cs.border.trans} }
    &.black { ${cs.bg.black} ${cs.font.white} ${cs.border.trans} }
    &.primary-line { ${cs.bg.trans} ${cs.font.primary} ${cs.box.line} ${cs.border.primary} }
    &.lightgray { ${cs.bg.lightwhite} ${cs.font.black} ${cs.box.line} ${cs.border.lightgray} }
    &.gray { ${cs.bg.gray} ${cs.font.black} ${cs.border.trans} }
    &.white { ${cs.bg.white} ${cs.font.black} ${cs.border.trans} }
    &.gray-line { ${cs.bg.trans} ${cs.font.gray} ${cs.box.line} ${cs.border.gray} }
    &.gd-gray { background-image: linear-gradient(-180deg, ${cs.color.lightgray}, ${cs.color.lightwhite} 90%); ${cs.font.dark} ${cs.box.line} ${cs.border.lightgray} }

    &.disabled { ${cs.mouse.default} ${cs.font.darkgray} ${cs.opac.alpha}
      .btn-label { ${cs.mouse.default} }
      &.trans:hover { &:hover { ${cs.font.noneline} } }
    }

    &.left { }
    &.right { ${cs.float.right} }
    &.center { ${cs.align.xcenter} ${cs.pos.get("sticky")} }
    &.top { ${cs.top(0)} ${cs.pos.relative} }
    &.middle { ${cs.align.ycenter} ${cs.pos.relative} }
    &.bottom { ${cs.top("100%")} ${cs.align.y("-100%")} ${cs.pos.relative} }

    &.rtype { ${cs.border.radius("0 2px 2px 0")} ${cs.box.line} ${cs.border.gray} }
    &.ltype { ${cs.border.radius("2px 0 0 2px")} ${cs.box.line} ${cs.border.gray} border-right: 0px; }
    &.ctype { ${cs.border.radius("0")} ${cs.box.line} ${cs.border.gray} border-right: 0px; border-left: 0px; }

    &.full { ${cs.w.full} ${cs.p.h0} }

    .btn-label {
      ${cs.align.ycenter} ${cs.pos.relative} ${cs.disp.block} 
      ${cs.font.center} ${cs.h.fit} ${cs.mouse.pointer}
    }
  }
}`;

const Button = (props) => {
  const onClicked = (e) => {
    if (props.onClick != null) {
      props.onClick(props.eid, e);
    }
  }

  let disabled = (props.disabled === undefined) ? props.disable : props.disabled;
  const isrun = props.isrun ? props.isrun : false;
  if (isrun) disabled = true;
  const { icon, type, iconcolor = cs.color.white, color } = props;
  const isicon = icon || isrun ? 'icon' : '';

  return (
    <StyledObject {...props} eid={props.eid} className={cx('button md', props.className, { disabled }, type, isicon)}
      onClick={disabled ? () => null : onClicked} to={props.to} >
      {isrun && <img className={cx("btn-icon running")} src={IMG.LoadingRing} alt='r' />}
      {!isrun && icon && <Svg className={cx("btn-icon sm")} icon={icon} color={iconcolor} />}
      <label className="btn-label">{props.title}</label>
    </StyledObject>
  )
}

export default Button;