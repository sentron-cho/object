import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import cs from './css-style';

const StyledObject = styled.div`{
  &.callopse-box { 
    ${cs.noselect} ${cs.pos.relative} ${cs.box.bgcolor} ${cs.bg.white}
    ${cs.font.md} ${cs.box.inner} ${cs.box.line} ${cs.border.lightwhite}

    .cls-title { ${cs.p.a10} ${cs.mouse.pointer}
      &:hover { ${cs.bg.sky} }
    }

    .cls-frame { 
      ${cs.box.inner} ${cs.w.full} ${cs.pos.relative} ${cs.disp.hidden}
      ${cs.h.get(0)} ${cs.min.height(0)} ${cs.p.a0} ${cs.border.top} ${cs.border.lightwhite}
    }

    &.active {
      .cls-frame {
        animation: callopse-in ease-out 1 forwards ${ ({ time }) => time};
      }
    }

    &.xs { ${cs.font.xs} .cls-title { ${cs.p.v5} } }
    &.sm { ${cs.font.md} .cls-title { ${cs.p.v5} } }
    &.lg { ${cs.font.xl} .cls-title { ${cs.p.v10} } }

    &.left { ${cs.font.left} }
    &.center { ${cs.font.center} }
    &.right { ${cs.font.right} }

    &.radius { ${cs.box.radius} }

    &.trans { ${cs.bg.trans} .cls-title:hover { ${cs.bg.sky} } }
    &.white { ${cs.bg.get("white")} .cls-title:hover { ${cs.bg.sky} } }
    &.sky { ${cs.bg.sky} .cls-title:hover { ${cs.bg.lightgray} } .cls-frame { ${cs.border.lightgray} } }
    &.orange { ${cs.bg.orange} .cls-title:hover { ${cs.bg.orangehover} } .cls-frame { ${cs.border.lightgray} } }
    &.green { ${cs.bg.green} .cls-title:hover { ${cs.bg.greenhover} } .cls-frame { ${cs.border.lightgray} } }
    &.red { ${cs.bg.red} .cls-title:hover { ${cs.bg.redhover} } .cls-frame { ${cs.border.lightgray} } }
    &.primary { ${cs.bg.primary} ${cs.font.white} .cls-title:hover { ${cs.bg.blue} } .cls-frame { ${cs.border.lightgray} } }
    &.gray { ${cs.bg.lightgray} .cls-title:hover { ${cs.bg.gray} } .cls-frame { ${cs.border.white} } }
    &.dark { ${cs.bg.dark} ${cs.font.white} .cls-title:hover { ${cs.bg.black} } .cls-frame { ${cs.border.gray} } }
    &.black { ${cs.bg.black} ${cs.font.white} .cls-title:hover { ${cs.bg.dark} } .cls-frame { ${cs.border.darkgray} } }

    &.theme-sky { ${cs.bg.sky} .cls-title:hover { ${cs.bg.lightgray} } .cls-frame { ${cs.border.lightgray} } }
    &.theme-primary { ${cs.bg.primary} ${cs.font.white} .cls-title:hover { ${cs.bg.blue} } .cls-frame { ${cs.border.lightgray} } }
    &.theme-gray { ${cs.bg.lightgray} .cls-title:hover { ${cs.bg.gray} } .cls-frame { ${cs.border.white} } }
    &.theme-dark { ${cs.bg.dark} ${cs.font.white} .cls-title:hover { ${cs.bg.black} } .cls-frame { ${cs.border.gray} } }
    &.theme-black { ${cs.bg.black} ${cs.font.white} .cls-title:hover { ${cs.bg.dark} } .cls-frame { ${cs.border.darkgray} } }

    ${({border}) => border && cs.box.line}
    ${({border}) => border && border.color && cs.border.color(border.color)}
    ${({border}) => border && border.radius && cs.border.radius(border.radius)}
    ${({border}) => border && border.width && cs.border.width(border.width)}

    @media screen and (max-width : 1280px) {}
    @media screen and (max-width : 1024px) {}
    @media screen and (max-width : 860px) { ${cs.p.a0} ${cs.font.sm} }

    @keyframes callopse-in {
      0% { ${cs.opac.invisible} ${cs.h.none} ${cs.disp.hidden} }
      50% { ${cs.opac.invisible} ${cs.h.fit} ${cs.p.a10} ${cs.disp.hidden} }
      100% { ${cs.opac.visible} ${cs.h.fit} ${cs.p.a10} ${cs.disp.visible} } 
    }
  }
}`;

const Callopsebox = (props) => {
  const interval = '200ms';
  const [active, setActive] = useState(props.active || false);
  const { label = "notitle", align = "left", minHeight = "100px", eid = null, rowid = null, border = null, theme } = props;

  useEffect(() => setActive(props.active), [props]);

  const onClick = (e) => {
    // const rowid = e.currentTarget.getAttribute("rowid");
    setActive(!active);
    props.onClick && props.onClick(rowid || eid || 0, props.label, !active, e);
  }

  return (
    <StyledObject className={cx('callopse-box', props.className, { active }, `theme-${theme}`)}
      align={align} minHeight={minHeight} time={interval} bgcolor={props.bgcolor} 
      border={border} >
      <div className="cls-title" onClick={onClick}>{label}</div>
      <div className="cls-frame">{props.children}</div>
    </StyledObject >
  );
}

export default Callopsebox;