import React from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import { cs } from './index';

const StyledObject = styled.footer`{
  &.footer {
    ${cs.noselect} ${cs.noliststyle} ${cs.disp.block} ${cs.w.full} ${cs.box.inner}
    ${cs.border.radius(0)} ${cs.font.center} ${cs.opac.show} ${cs.font.dark}
    ${({ height }) => cs.h.get(height)} ${cs.bg.white} ${cs.pos.relative}

    .ft-frame { 
      ${cs.h.full} ${cs.border.top}
      .ft-copyright { ${cs.w.calc("100% - 20px")} ${cs.h.get(30)} ${cs.align.center } }
    }

    &.md { ${cs.h.get(40)} }
    &.sm { ${cs.h.get(30)} }
    &.lg { ${cs.h.get(60)} }
    &.xl { ${cs.h.get(100)} }

    &.trans { ${cs.bg.white} ${cs.font.black} }
    &.sky { ${cs.bg.sky} ${cs.font.black} }
    &.primary { ${cs.bg.primary} ${cs.font.white} }
    &.gray { ${cs.bg.lightgray} ${cs.font.black} }
    &.dark { ${cs.bg.dark} ${cs.font.white} }
    &.black { ${cs.bg.black} ${cs.font.white} }

    &.theme-sky { ${cs.bg.sky} ${cs.font.black} }
    &.theme-primary { ${cs.bg.primary} ${cs.font.white} }
    &.theme-gray { ${cs.bg.lightgray} ${cs.font.black} }
    &.theme-dark { ${cs.bg.dark} ${cs.font.white} }
    &.theme-black { ${cs.bg.black} ${cs.font.white} }
    
    .ft-frame .ft-copyright {
      ${({ font }) => font && font.color && cs.font.color(font.color)}
      ${({ font }) => font && font.align && cs.font.align(font.align)}
    }

    ${({ border }) => border && cs.border.top}
    ${({ border }) => border && border.color && cs.border.color(border.color)}
    ${({ border }) => border && border.width && cs.border.width(border.width)}

    @media screen and (max-width : 860px) {
    }
  }
}`;

const Footer = (props) => {
  const { value = "copyright", height = '40px', className, theme, children } = props;
  const { font, border } = props.options || { border: null, font: null };

  return (
    <StyledObject className={cx("footer", className, theme && `theme-${theme}`)}
      height={height} border={border} font={font}>
      <div className="ft-frame" onClick={props.onClick && props.onClick}>
        {children && children}
        {!children && <p className="ft-copyright">{value}</p>}
      </div>
    </StyledObject>
  );
};

export default Footer;