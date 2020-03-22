/* eslint-disable react/no-direct-mutation-state */
import React, { useState, useEffect } from 'react';
import cx from 'classnames/bind';
import styled from 'styled-components';
import { Svg, Svgbox, cs } from './index';
import { EID } from './Config'

const StyledObject = styled.div`{
  &.memo-box { 
    ${cs.pos.relative} ${cs.w.full} ${cs.z.front} ${cs.h.auto} ${cs.box.inner}
    //${cs.anim.showin()}

    .mb-frame {
      ${cs.w.full} ${cs.h.auto} ${cs.bg.white} ${cs.mouse.pointer} ${cs.border.radius("5px 5px 0 5px")}
      ${cs.box.line} ${cs.font.dark} ${cs.p.a10} ${cs.p.v5} ${cs.p.r2} ${cs.p.b10}
      ${cs.box.inner}
      .mb-txt {
        ${cs.font.preline} ${cs.over.yauto} ${cs.min.height("20px")} ${cs.max.height("300px")} ${cs.h.fit}
        ${cs.p.r15} ${cs.scrollbar.get(cs.color.lightwhite, cs.color.lightgray)}
      }
    }

    .mb-cancel { 
      ${cs.align.rtop} ${cs.bg.white} ${cs.top(-8)} ${cs.right(-8)} ${cs.p.a3} ${cs.box.inner}
      ${cs.float.right} ${cs.pos.absolute} ${cs.opac.show} ${cs.border.lightwhite} ${cs.box.line} ${cs.border.lightgray}
    }

    .mb-btn {
      ${cs.z.top} ${cs.float.right} ${cs.p.get("3px 5px 0 5px")} ${cs.bg.white} ${cs.box.line}
      ${cs.border.radius("0 0 3px 3px")} ${cs.m.top(-1)} ${cs.pos.relative} ${cs.box.top(0)}

      .svg-icon { ${cs.m.h5} ${cs.box.line} ${cs.size.get(24)} ${cs.border.radius(3)} .svg-path { ${cs.fill.dark} } }
    }

    &.shadow { .mb-frame, .mb-btn { ${cs.border.shadow('0px 2px 3px 0 rgba(0,0,0,0.6), 1px 1px 0px 0px rgba(0,0,0,0.3)')} } }

    &.sm { ${cs.w.get(320)} .mb-frame { ${cs.font.xs} .mb-txt { ${cs.max.height("100px")} } } }
    &.md { ${cs.w.get(640)} .mb-frame { ${cs.font.sm} .mb-txt { ${cs.max.height("200px")} } } }
    &.lg { ${cs.w.get(1024)} .mb-frame { ${cs.font.md} .mb-txt { ${cs.max.height("400px")} } } }
    
    &.white { 
      .mb-btn .svg-path { ${cs.fill.dark} } .mb-frame, .mb-btn { ${cs.bg.white} ${cs.font.dark} } 
      .mb-frame .mb-txt { ${cs.scrollbar.get(cs.color.lightwhite, cs.color.lightgray)} } 
    }
    &.sky { 
      .mb-btn .svg-path { ${cs.fill.dark} } .mb-frame, .mb-btn { ${cs.bg.sky} ${cs.font.dark} } 
      .mb-frame .mb-txt { ${cs.scrollbar.get(cs.color.sky, cs.color.sky)} } 
    }
    &.primary { 
      .mb-btn .svg-path { ${cs.fill.white} } .mb-frame, .mb-btn { ${cs.bg.primary} ${cs.font.white} }
      .mb-frame .mb-txt { ${cs.scrollbar.get(cs.color.primary, cs.color.primaryhover)} }   
    }
    &.orange { 
      .mb-btn .svg-path { ${cs.fill.white} } .mb-frame, .mb-btn { ${cs.bg.orange} ${cs.font.white} }
      .mb-frame .mb-txt { ${cs.scrollbar.get(cs.color.orange, cs.color.orangehover)} } 
    }
    &.red { 
      .mb-btn .svg-path { ${cs.fill.white} } .mb-frame, .mb-btn { ${cs.bg.red} ${cs.font.white} } 
      .mb-frame .mb-txt { ${cs.scrollbar.get(cs.color.red, cs.color.redhover)} } 
    }
    &.green { 
      .mb-btn .svg-path { ${cs.fill.white} } .mb-frame, .mb-btn { ${cs.bg.green} ${cs.font.white} }
      .mb-frame .mb-txt { ${cs.scrollbar.get(cs.color.green, cs.color.greenhover)} } 
    }
    &.gray { 
      .mb-btn .svg-path { ${cs.fill.white} } .mb-frame, .mb-btn { ${cs.bg.gray} ${cs.font.white} } 
      .mb-frame .mb-txt { ${cs.scrollbar.get(cs.color.gray, cs.color.grayhover)} } 
    }
    &.dark { 
      .mb-btn .svg-path { ${cs.fill.white} } .mb-frame, .mb-btn { ${cs.bg.dark} ${cs.font.white} }
      // .mb-frame .mb-txt { ${cs.scrollbar.get(cs.color.darkhover, cs.color.black)} } 
    }
    &.black { 
      .mb-btn .svg-path { ${cs.fill.white} } .mb-frame, .mb-btn { ${cs.bg.black} ${cs.font.white} }
      // .mb-frame .mb-txt { ${cs.scrollbar.get(cs.color.dark, cs.color.darkhover)} } 
    }

    &.theme-sky { .mb-btn .svg-path { ${cs.fill.dark} } .mb-frame, .mb-btn { ${cs.bg.sky} } }
    &.theme-primary { .mb-btn .svg-path { ${cs.fill.white} } .mb-frame, .mb-btn { ${cs.bg.primary} } }
    &.theme-gray { .mb-btn .svg-path { ${cs.fill.white} } .mb-frame, .mb-btn { ${cs.bg.gray} } }
    &.theme-dark { .mb-btn .svg-path { ${cs.fill.white} } .mb-frame, .mb-btn { ${cs.bg.dark} } }
    &.theme-black { .mb-btn .svg-path { ${cs.fill.white} } .mb-frame, .mb-btn { ${cs.bg.black} } }

    .mb-frame {
      ${({ border }) => border && cs.box.line}
      ${({ border }) => border && border.color && cs.border.color(border.color)}
      ${({ border }) => border && border.radius && `${cs.border.radius(`${border.radius} ${border.radius} 0 ${border.radius}`)} `}
      ${({ border }) => border && border.width && `${cs.border.width(border.width)}`}
    }

    .mb-btn { 
      ${({ border }) => border && border.color && cs.border.color(border.color)}
      ${({ border }) => border && border.width && `${cs.m.top(`-${border.width}`)} ${cs.border.width(border.width)} ${cs.box.top(0)}`} 
    }

    ${({ font }) => font && font.color && cs.font.color(font.color)}
    ${({ font }) => font && font.width && cs.font.width(font.width)}

    @media screen and (max-width : 1280px) {}
    @media screen and (max-width : 1024px) {}
    @media screen and (max-width : 860px) {}
  }
}`;

const Memobox = (props) => {
  const [show, setShow] = useState(props.show);

  useEffect(() => setShow(props.show), [props.show]);

  const onClick = (eid, e) => {
    setShow(false);
    props.onClick && props.onClick(eid, props.item, e);
  }

  const onCancel = (e) => {
    setShow(false);
    props.onClick && props.onClick(EID.CANCEL, null, e);
  }

  const { item = null, className, theme, font, border } = props;

  if (show) {
    return <StyledObject className={cx("memo-box", className, theme && `theme-${theme}`)} font={font} border={border}>
      <div className={"mb-frame"}>
        <p className={"mb-txt"}>{item && item.value}</p>
      </div>
      <Svg className={"mb-cancel radius md"} icon={EID.CANCEL} color={cs.color.black} onClick={onCancel} eid={EID.CANCEL} />
      <Svgbox className={cx('mb-btn')} size={"sm"} list={[{ icon: EID.EDIT }, { icon: EID.ADD }]} color={cs.color.white} onClick={onClick} />
    </StyledObject>
  } else {
    return null;
  }
}

export default Memobox;