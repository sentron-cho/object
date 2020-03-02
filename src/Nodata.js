import React from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import cs from './css-style';

const StyledFrame = styled.div`{
  &.nodata-box { position: relative;
    overflow: hidden; display: block; width: 100%; min-height: 300px; height: 100%;

    .nd-title {
        position: relative; white-space: pre-wrap; opacity: 0.7;
        ${cs.font.xl} ${cs.font.thickbold} ${cs.align.center}
    }
    
    &.pointer { .no-data { cursor: pointer; } }
  }
}`;

const Nodata = (props) => {
  const onClicked = (e) => {
    if (props.onClick != null) {
      props.onClick(props.eid, e);
    }
  }

  const isChildren = props.children ? true : false;
  const pointer = props.onClick != null ? true : false;

  return (
    <StyledFrame className={cx('nodata-box', { pointer })} onClick={onClicked} >
      {isChildren ? props.children : <div className="nd-title">{props.title ? props.title : 'No Data!'}</div>}
    </StyledFrame>
  )
}

export default Nodata;