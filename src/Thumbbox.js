import React from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';

const StyledObject = styled.div`{
  &.thumb-box { width: 100%; height: 100%; opacity: 0;
    .t-img { 
      width: 100%; height: 100%; border-radius: 5px; border: 1px solid transparent; 
      object-fit: contain; padding: 5px;      
    }

    .t-odr { position: absolute; opacity: 0.8; right: 10px; top: 10px; font-size: 12px; border: 1px solid #525252;
      border-radius: 100px; width: 20px; height: 20px; text-align: center; background: #232323d6; }

    &.show { opacity: 1; }
    
    &.anim { transition: all 150ms ease-in; opacity: 1; }
  }
}`;

export default class Thumbbox extends React.PureComponent {
  constructor(props) {
    super(props);
    
    this.state = { anim: !props.anim };

    if (props.anim) {
      const delay = props.delay ? props.delay : 0;
      setTimeout(() => {
        this.setState({ anim: true });
      }, 100 + delay);
    }
  }

  render() {
    const { props } = this;
    const { thumb, odr } = props;
    const { anim } = this.state;
    
    return (
      <StyledObject className={cx("thumb-box", props.className, { anim })} >
        {thumb && <img className={"t-img"} src={thumb} alt="thumb"/>}
        {!thumb && <span className={"t-noimg"} >{"No Image"}</span>}
        {odr && <span className="t-odr">{odr}</span>}
      </StyledObject>
    )
  }
};