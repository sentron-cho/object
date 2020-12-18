import React from 'react';
import styled from 'styled-components';
import cs from './css-style';
import cx from 'classnames/bind';

const StyledObject = styled.div`{
  &.err-page {

    .ep-title { ${cs.align.center} ${cs.font.get(80)} ${cs.font.darkgray} ${cs.font.style('East Sea Dokdo')} 
      ${cs.font.prewrap} ${cs.font.breakword}
    }

    &.t1 { .ep-title { ${cs.font.get(30)} } }
    &.t2 { .ep-title { ${cs.font.get(40)} } }
    &.t3 { .ep-title { ${cs.font.get(50)} } }
    &.t4 { .ep-title { ${cs.font.get(80)} } }
  
    @media screen and (max-width : 860px) {
    }
}`;


const Error = (props) => {
  const {title = null, className = '' } = props;
  return <StyledObject className={cx('err-page', className)}>
    <p className={'ep-title'}>{title || '404 - PAGE NOT FOUND'}</p>
  </StyledObject>
}

export default Error;