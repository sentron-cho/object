import React from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import { Svg, cs } from './index';

const StyledObject = styled.div`{
  &.close-btn { 
    ${cs.bg.gray} ${cs.border.radius('5px 0 0 5px')} ${cs.box.inner} ${cs.box.line} ${cs.border.trans}
    ${cs.w.get(10)} ${cs.left(-10)} ${cs.anim.in('0.2s')} ${cs.border.set('border-right: none;')}
    ${cs.mouse.pointer}

    .svg-icon { ${cs.opac.show} ${cs.w.get(6)} }

    &.left { ${cs.align.ycenter} ${cs.h.get(60)} }
    &.right { }
    &.top { } 
    &.bottom { }

    &.white { ${cs.bg.darkwhite} ${cs.border.lightgray} .svg-icon .svg-path { ${cs.fill.dark} } }
    &.sky { ${cs.bg.sky} ${cs.border.lightgray} .svg-icon .svg-path { ${cs.fill.dark} } }
    &.orange { ${cs.bg.orange} }
    &.green { ${cs.bg.green} }
    &.red { ${cs.bg.red} }
    &.gray { ${cs.bg.gray} }
    &.primary { ${cs.bg.primary} }
    &.dark { ${cs.bg.dark} .svg-icon .svg-path { ${cs.fill.white} } }
    &.black { ${cs.bg.black} .svg-icon .svg-path { ${cs.fill.white} } }

    &.theme-white { ${cs.bg.darkwhite} ${cs.border.lightgray} .svg-icon .svg-path { ${cs.fill.dark} } }
    &.theme-sky { ${cs.bg.sky} ${cs.border.lightgray} .svg-icon .svg-path { ${cs.fill.dark} } }
    &.theme-gray { ${cs.bg.gray} }
    &.theme-primary { ${cs.bg.primary} }
    &.theme-dark { ${cs.bg.dark} .svg-icon .svg-path { ${cs.fill.white} } }
    &.theme-black { ${cs.bg.black} .svg-icon .svg-path { ${cs.fill.white} } }    

    &:hover, &.show { ${cs.w.get(30)} ${cs.left(-30)} .svg-icon { ${cs.opac.show} ${cs.w.get(20)} } }
  }
}`;

const CloseButton = (props) => {
  const onClicked = (e) => {
    props.onClick && props.onClick('cancel', e);
  }

  const { className, theme, align = 'left', show = false } = props;

  return (
    <StyledObject className={cx("close-btn white", className, align, theme && `theme-${theme}`, {show})} onClick={onClicked}>
      <Svg className="md center middle" name={show ? "right" : "left"} eid={'cancel'} color={'white'} />
    </StyledObject>
  );
};

export default CloseButton;