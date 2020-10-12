import React from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import { IMG } from './Icons';
import { cs } from './index';

const StyledFrame = styled.div`{
  &.loading-box {
    ${cs.disp.block} ${cs.p.r0} ${cs.z.menu} ${cs.size.full} ${cs.pos.absolute}
    // z-index: 99999 !important;
    .bg {
      ${cs.size.full} ${cs.pos.absolute} ${cs.bg.trans}
      img { 
        ${cs.w.auto} ${cs.h.get(80)} ${cs.opac.alpha} ${cs.align.center}
      }
    }

    &.sm { .bg img { ${cs.h.get(40)} } }
    &.md { .bg img { ${cs.h.get(100)} } }
    &.lg { .bg img { ${cs.h.get(200)} } }
    &.xs { .bg img { ${cs.h.get(25)} } }
    &.half { .bg img { ${cs.h.half} } }

    &.hide { ${cs.disp.none} }
    &.show { ${cs.disp.block} }
    &.fixed { ${cs.pos.fixed} }

    &.bg-show { .bg { ${cs.bg.alphablack} } }
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