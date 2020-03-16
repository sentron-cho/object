import React from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import { cs } from './index';

const StyledObject = styled.footer`{
  &.footer {
    ${cs.disp.block} ${cs.w.full} ${cs.border.radius(0)} ${cs.font.center} ${cs.opac.show}
    ${({height}) => cs.h.get(height)}

    .ft-frame { 
      ${cs.h.full} ${cs.border.top}
      .ft-content { height: calc(100% - 60px); line-height: 30px; }
      .ft-copyright { ${cs.h.get(30)} ${cs.align.ycenter} }
    }

    @media screen and (max-width : 860px) {
    }
  }
}`;

const Footer = (props) => {
  const { value = "copyright", height = '60px', className, theme } = props;

  return (
    <StyledObject className={cx("footer", className, theme && `theme-${theme}`)} height={height}>
      <div className="ft-frame" onClick={props.onClick && props.onClick}>
        <div className="ft-content"></div>
        <p className="ft-copyright">{value}</p>
      </div>
    </StyledObject>
  );
};

export default Footer;