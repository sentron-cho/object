import React from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';

const StyledObject = styled.span`{
  display: inline-block; opacity: 0.5; border: 1px transparent solid; position: relative; 
  vertical-align: middle; background: no-repeat center center; background-size: 100% 100%;
  font-size:16px; height:30px; width:40px; padding: 3px;
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding}; 
  background-image: url(${(props) => props.icon});

  &.border { border: 1px solid #aaa; border-radius: 3px; padding: 3px; }
  &.button:hover { opacity: 0.9; cursor: pointer; }

  &.xxl { font-size:30px; height:50px; width:60px; padding: 5px; }
  &.xl { font-size:20px; height:40px; width:50px; padding: 4px; }
  &.lg { font-size:16px; height:30px; width:40px; padding: 3px; }
  &.sm { font-size:14px; height:24px; width:34px; padding: 2px; }
  &.xs { font-size:12px; height:18px; width:28px; padding: 1px; }

  &.disabled { cursor:default; border:none; background:#000; color:#fff; opacity: 0.2;
    &:hover {  }
  }
}`;

const Iconbox = (props) => {
  const onClicked = (e) => {
    if (props.onClick != null) {
      props.onClick(props.eid, e);
    }
  }

  const disabled = props.disabled;
  const button = props.onClick ? 'button' : '';

  return (
    <StyledObject {...props} eid={props.eid} className={cx(props.className, { disabled }, { button })} onClick={disabled ? () => null : onClicked}>
      {/* <span className="icon" /> */}
    </StyledObject>
  )
}

export default Iconbox;