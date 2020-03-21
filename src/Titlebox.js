import React from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import { EID } from './Config';
import { cs, Button } from './index';

const StyledFrame = styled.div`{
  &.title-box { 
    ${cs.pos.relative} ${cs.p.a5} ${cs.m.t10} ${cs.font.left} color: ${props => props.color};
    background: ${ props => props.bgcolor}; height: calc(${props => props.fontsize} + 20px);
    border-radius: ${ props => props.radius};
    
    .st-tl { ${cs.p.h5} ${cs.align.ycenter}
      font-size: ${props => props.fontsize}; ${cs.font.bold}

      &.pointer { cursor: pointer
        &:hover { opacity: 0.8; }
      };
    }

    .btn-new { ${cs.align.ycenter} ${cs.pos.relative} float: right; z-index: 1; min-width: 80px; }

    &.right { .st-tl { ${cs.align.right} } }
    &.center { .st-tl { ${cs.align.center} } }
  }
}`

const TitleBox = (props) => {
  const onClickNew = (eid, e) => props.onClickNew && props.onClickNew(eid, e);
  const onClickLabel = (eid, e) => props.onClickLabel && props.onClickLabel('label', e);

  const {
    bgcolor = cs.color.lightwhite, fontsize = '18px', buttontitle = 'new',
    buttonicon = EID.NEW, align = 'left', color = cs.color.dark, radius = '0'
  } = props;

  // const divider = (props.divider == null || props.divider === true) ? true : false;
  const pointer = props.onClickLabel ? true : false;

  return (
    <StyledFrame className={cx("title-box", props.className, (align))} fontsize={fontsize} bgcolor={bgcolor} color={color} radius={radius}>
      <span className={cx("st-tl", { pointer })} onClick={onClickLabel}>{props.title}</span>
      {/* {props.onClickNew && <Svg className="btn-add md" onClick={onClickNew} name={EID.NEW} eid={EID.NEW} color={'primary'} />} */}
      {props.onClickNew && <Button className="btn-new primary sm" title={buttontitle} onClick={onClickNew} eid={buttonicon} icon={buttonicon} />}
      {/* {props.children && props.children} */}
      {/* {divider && <span className="div-line"></span>} */}
    </StyledFrame >
  )
};

export default TitleBox;
