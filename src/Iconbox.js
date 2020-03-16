import React from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import { cs } from './index';

const StyledObject = styled.span`{
  &.icon-box {
    ${cs.disp.inblock} ${cs.opac.get(0.7)} ${cs.box.line} ${cs.border.trans} ${cs.box.inner}
    ${cs.pos.relative} ${cs.p.a3} ${cs.font.md}
    ${cs.bg.repeat("no-repeat")} ${cs.bg.size("100% 100%")} ${cs.bg.pos("center")}

    ${({ margin }) => cs.m.get(margin)}
    ${({ padding }) => cs.p.get(padding)}
    ${({ src }) => cs.bg.image(src)}

    &.border { ${cs.border.gray} ${cs.border.radius(3)} ${cs.p.a3} }
    &.button:hover { ${cs.opac.show} ${cs.mouse.pointer} }
    &.fill { ${cs.bg.size("100% 100%")} }
    &.cover { ${cs.bg.size("cover")} }

    &.md { ${cs.font.md} ${cs.icon.md} ${cs.p.a3} }
    &.xxl { ${cs.font.xxl} ${cs.icon.xxl} ${cs.p.a5} }
    &.xl { ${cs.font.xl} ${cs.icon.xl} ${cs.p.a4} }
    &.lg { ${cs.font.lg} ${cs.icon.lg} ${cs.p.a3} }
    &.sm { ${cs.font.sm} ${cs.icon.sm} ${cs.p.a2} }
    &.xs { ${cs.font.xs} ${cs.icon.xs} ${cs.p.a1} }

    &.right { ${cs.align.right} }
    &.center { ${cs.align.xcenter} }
    &.top { ${cs.align.top} }
    &.middle { ${cs.align.ycenter} }
    &.bottom { ${cs.align.bottom} }
    &.center.middle { ${cs.pos.absolute} ${cs.top("50%")} ${cs.left("50%")} ${cs.align.get("translate(-50%, -50%)")} }

    ${({border}) => border && cs.box.line}
    ${({border}) => border && border.color && cs.border.color(border.color)}
    ${({border}) => border && border.radius && cs.border.radius(border.radius)}
    ${({border}) => border && border.width && cs.border.width(border.width)}

    &.disabled { ${cs.mouse.default} ${cs.border.none} ${cs.bg.black} ${cs.font.dark} ${cs.opac.get(0.2)}
      &:hover {  }
    }
  }
}`;

const Iconbox = (props) => {
  const onClicked = (e) => {
    if (props.onClick != null) {
      props.onClick(props.eid || 'iconbox', e);
    }
  }

  const button = props.onClick ? 'button' : '';
  const { icon, margin, padding, disable } = props;
  const disabled = disable || props.disabled;
  const src = icon || props.src;
  const { border } = props.options || {border: null};

  return (
    <StyledObject className={cx('icon-box md', props.className, { disabled }, { button })}
      icon={icon} margin={margin} padding={padding} src={src} border={border}
      eid={props.eid} onClick={disabled ? () => null : onClicked}>
      {/* <span className="icon" /> */}
    </StyledObject>
  )
}

export default Iconbox;