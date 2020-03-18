import React from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import { cs } from './index';

const StyledFrame = styled.div`{
  &.nodata-box {
    ${cs.pos.relative} ${cs.over.hidden} ${cs.disp.block} ${cs.size.full}
    ${cs.min.height(300)}

    .nd-title {
      ${cs.pos.relative} ${cs.font.prewrap} ${cs.opac.alpha}
      ${cs.font.xl} ${cs.font.thickbold} ${cs.align.center}
    }
    
    &.border { ${cs.box.line} ${cs.border.lightgray} }
    &.radius { ${cs.box.radius} }
    &.pointer { .no-data { cursor: pointer; } }

    
    &.md { .nd-title { ${cs.font.xl} } }
    &.xs { .nd-title { ${cs.font.md} } }
    &.sm { .nd-title { ${cs.font.lg} } }
    &.lg { .nd-title { ${cs.font.xxl} } }
    &.xl { .nd-title { ${cs.font.t2} } }
    &.full { }


    &.left { .nd-title { ${cs.align.unset} ${cs.align.left} } }
    &.right { .nd-title { ${cs.align.unset} ${cs.align.right} } }
    &.center { .nd-title { ${cs.align.unset} ${cs.align.xcenter} } }
    &.top { .nd-title { ${cs.align.unset} ${cs.align.top} } }
    &.middle {.nd-title { ${cs.align.unset} ${cs.align.ycenter} } }
    &.bottom { .nd-title { ${cs.align.unset} ${cs.align.bottom} } }

    &.left.top { .nd-title { ${cs.align.unset} ${cs.align.left} ${cs.align.top} } }
    &.right.top { .nd-title { ${cs.align.unset} ${cs.align.right} ${cs.align.top} } }
    &.center.top { .nd-title { ${cs.align.unset} ${cs.align.xcenter} ${cs.align.top} } }

    &.left.middle { .nd-title { ${cs.align.unset} ${cs.align.left} ${cs.align.ycenter} } }
    &.right.middle { .nd-title { ${cs.align.unset} ${cs.align.right} ${cs.align.ycenter} } }
    &.center.middle { .nd-title { ${cs.align.unset} ${cs.align.center} } }

    &.left.bottom { .nd-title { ${cs.align.unset} ${cs.align.left} ${cs.align.bottom} } }
    &.right.bottom { .nd-title { ${cs.align.unset} ${cs.align.right} ${cs.align.bottom} } }
    &.center.bottom { .nd-title { ${cs.align.unset} ${cs.align.xcenter} ${cs.align.bottom} } }

    &.trans { ${cs.bg.trans} ${cs.font.lightgray} }
    &.sky { ${cs.bg.sky} ${cs.font.dark} }
    &.orange { ${cs.bg.orange} ${cs.font.white} }
    &.green { ${cs.bg.green} ${cs.font.white} }
    &.red { ${cs.bg.red} ${cs.font.white} }
    &.primary { ${cs.bg.primary} ${cs.font.white} }
    &.gray { ${cs.bg.lightgray} ${cs.font.dark} }
    &.dark { ${cs.bg.dark} ${cs.font.white} }
    &.black { ${cs.bg.black} ${cs.font.white} }

    &.theme-sky { ${cs.bg.sky} ${cs.font.dark} }
    &.theme-primary { ${cs.bg.primary} ${cs.font.white} }
    &.theme-gray { ${cs.bg.lightgray} ${cs.font.dark} }
    &.theme-dark { ${cs.bg.dark} ${cs.font.white} }
    &.theme-black { ${cs.bg.black} ${cs.font.white} }

    .nd-title {
      ${({ font }) => font && font.color && cs.font.color(font.color)}
      ${({ font }) => font && font.align && cs.font.size(font.size)}
    }

    ${({ border }) => border && cs.box.line}
    ${({ border }) => border && border.color && cs.border.color(border.color)}
    ${({ border }) => border && border.radius && cs.border.radius(border.radius)}
    ${({ border }) => border && border.width && cs.border.width(border.width)}
  }
}`;

const Nodata = (props) => {
  const onClicked = (e) => {
    props.onClick && props.onClick(props.eid || 'nodata', e);
  }

  const isChildren = Boolean(props.children);
  const pointer = Boolean(props.onClick);
  const { className, font, theme, border } = props;

  return (
    <StyledFrame className={cx('nodata-box', { pointer }, className, theme && `theme-${theme}`)}
      onClick={onClicked} font={font} border={border} >
      {isChildren ? props.children : <div className="nd-title">{props.title ? props.title : 'No Data!'}</div>}
    </StyledFrame>
  )
}

export default Nodata;