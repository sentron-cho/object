import React from 'react';
import styled from 'styled-components';

const StyledObject = styled.footer`{
  height: 60px; width: 100%; border-radius: 0; text-align: center; margin-bottom -1px; opactiy: 0.8;

  .footer-frame { height: 100%; border-top: 1px solid #555; border-bottom: 1px solid #555; padding-top: 10px;
    .content { height: calc(100% - 60px); line-height: 30px; }
    .copyright { height: 30px; line-height: 30px; }
  }

  @media screen and (max-width : 860px) {
  }
}`;

const Footer = (props) => {
  const value = props.value;
  return (
    <StyledObject className="footer">
      <div className="footer-frame" onClick={props.onClick && props.onClick}>
        <div className="content"></div>
        <p className="copyright">{value}</p>
      </div>
    </StyledObject>
  );
};

export default Footer;