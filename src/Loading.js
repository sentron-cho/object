import React from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import { IMG } from './Icons';

const StyledFrame = styled.div`{
  &.loading-box {
    display: block; padding-right: 0; z-index: 99999 !important; height: 100%; position: absolute; width: 100%
    .bg { height: 100%; position: absolute; width: 100%; background: transparent;
      img{ width: auto; height: 80px; position: absolute; opacity: 0.5
        top: 50%; left: 50%; transform: translate(-50%, -50%);
      }
    }

    &.sm { .bg img { width: auto; height: 100px; } }
    &.md { .bg img { width: auto; height: 200px; } }
    &.lg { .bg img { width: auto; height: 300px; } }
    &.xs { .bg img { width: auto; height: 50px; } }
    &.half { .bg img { width: auto; height: 50%; } }

    &.hide { display: none; }
    &.show { display: block; }

    .bg-show {
      background: rgba(0,0,0,0.5);
    }
  }
}`;

const Loading = (props) => {
  let image = IMG.Loading;
  if (props.type === 'ring') {
    image = IMG.LoadingRing;
  }

  return (
    <StyledFrame className={cx('loading-box', props.className, props.show === 'hide' ? 'hide' : "show")}>
      <div className="bg">
        <img alt="img" src={image} />
      </div>
    </StyledFrame>
  )
}

export default Loading;