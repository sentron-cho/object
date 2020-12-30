/* eslint-disable react/no-direct-mutation-state */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import { EID } from './Config';
import { Svg, Util, cs } from './index';

const StyledObject = styled.div`{
  &.page-navi {
    ${cs.font.dark} ${cs.h.get(60)} ${cs.w.full} ${cs.pos.relative} 
    ${cs.font.center} ${cs.disp.inblock}
    ${cs.noliststyle} ${cs.noselect}

    .pgn-frame {
      ${cs.h.get(40)} ${cs.w.fit} ${cs.box.inner} ${cs.p.a5} ${cs.p.h20}
      ${cs.m.left("auto")} ${cs.m.right("auto")} ${cs.w.full}

      .pg-no {
        ${cs.mouse.pointer} ${cs.h.full} ${cs.w.get(36)} ${cs.border.radius(2)}
        ${cs.box.line} ${cs.border.trans} ${cs.disp.inblock} ${cs.m.h2} ${cs.opac.alpha}
        ${cs.font.md} ${cs.font.weight(600)} ${cs.pos.relative}

        &:hover { ${cs.border.primary} ${cs.opac.show} .svg-icon { ${cs.opac.show} } }
        &.active { ${cs.bg.primary} ${cs.font.white} ${cs.opac.show} }
        &.invisable { ${cs.disp.invisible} }
        
        span { ${cs.align.center} }
      }
    };

    &.sm { ${cs.h.get(40)} .pgn-frame { ${cs.h.get(30)} .pg-no { ${cs.w.get(24)} ${cs.m.h1} } } }
    &.md { ${cs.h.get(50)} .pgn-frame { ${cs.h.get(34)} .pg-no { ${cs.w.get(28)} ${cs.m.h2} } } }
    &.lg { ${cs.h.get(68)} .pgn-frame { ${cs.h.get(48)} .pg-no { ${cs.w.get(40)} ${cs.m.h3} } } }
    
    &.sky {
      .pg-no { &.active { ${cs.bg.sky} ${cs.font.dark} } &:hover { ${cs.border.sky} } .svg-icon { .svg-path { ${cs.fill.primary} } } } 
    }
    &.white {
      .pg-no { ${cs.font.lightgray} 
        &.active { ${cs.bg.white} ${cs.font.black} } &:hover { ${cs.border.lightgray} } .svg-icon { .svg-path { ${cs.fill.lightgray} } } 
      } 
    }
    &.green { 
      .pg-no { ${cs.font.darkgray} &.active { ${cs.bg.green} ${cs.font.white} } &:hover { ${cs.border.green} } .svg-icon { .svg-path { ${cs.fill.green} } } } 
    }
    &.orange {
      .pg-no { ${cs.font.gray} &.active { ${cs.bg.orange} ${cs.font.white} } &:hover { ${cs.border.orange} } .svg-icon { .svg-path { ${cs.fill.orange} } } } 
    }
    &.red {
      .pg-no { ${cs.font.gray} &.active { ${cs.bg.red} ${cs.font.white} } &:hover { ${cs.border.red} } .svg-icon { .svg-path { ${cs.fill.red} } } } 
    }
    &.primary {
      .pg-no { ${cs.font.gray} &.active { ${cs.bg.primary} ${cs.font.white} } &:hover { ${cs.border.primary} } .svg-icon { .svg-path { ${cs.fill.primary} } } } 
    }
    &.gray {
      .pg-no { ${cs.font.gray} &.active { ${cs.bg.gray} ${cs.font.black} } &:hover { ${cs.border.darkgray} } .svg-icon { .svg-path { ${cs.fill.gray} } } } 
    }
    &.dark {
      .pg-no { ${cs.font.gray} &.active { ${cs.bg.dark} ${cs.font.white} } &:hover { ${cs.border.dark} } .svg-icon { .svg-path { ${cs.fill.dark} } } } 
    }
    &.black {
      ${cs.font.darkgray} 
      .pg-no { &.active { ${cs.bg.black} ${cs.font.white} } &:hover { ${cs.border.black} } .svg-icon { .svg-path { ${cs.fill.black} } } } 
    }

    &.theme-sky {
      .pg-no { &.active { ${cs.bg.sky} ${cs.font.dark} } &:hover { ${cs.border.sky} } .svg-icon { .svg-path { ${cs.fill.primary} } } } 
    }
    &.theme-white {
      ${cs.font.lightgray} 
      .pg-no { &.active { ${cs.bg.white} ${cs.font.dark} } &:hover { ${cs.border.lightgray} } .svg-icon { .svg-path { ${cs.fill.white} } } } 
    }
    &.theme-primary {
      .pg-no { &.active { ${cs.bg.primary} } &:hover { ${cs.border.primary} } .svg-icon { .svg-path { ${cs.fill.primary} } } } 
    }
    &.theme-gray {
      .pg-no { &.active { ${cs.bg.gray} } &:hover { ${cs.border.darkgray} } .svg-icon { .svg-path { ${cs.fill.gray} } } } 
    }
    &.theme-dark { ${cs.font.gray} 
      .pg-no { &.active { ${cs.bg.dark} } &:hover { ${cs.border.dark} } .svg-icon { .svg-path { ${cs.fill.dark} } } } 
    }
    &.theme-black {
      ${cs.font.darkgray} 
      .pg-no { &.active { ${cs.bg.black} } &:hover { ${cs.border.black} } .svg-icon { .svg-path { ${cs.fill.black} } } } 
    }

    &.border { .pgn-frame { ${cs.box.line} } }
    &.radius { .pgn-frame { ${cs.box.radius} } }
    
    &.left { .pgn-frame { ${cs.align.left} } }
    &.center { .pgn-frame { ${cs.align.xcenter} } }
    &.right { .pgn-frame { ${cs.align.right} } }

    &.s-mobile { ${cs.p.a0} .pgn-frame { ${cs.m.get("10px 0px")} } }

    &.s-tablet {  ${cs.p.a0} .pgn-frame { ${cs.m.get("10px 0px")} } }

    ${({ border }) => border && `.pgn-frame { ${cs.box.line} }`}
    ${({ border }) => border && border.color && `.pgn-frame { ${cs.border.color(border.color + " !important")} }`}
    ${({ border }) => border && border.radius && `.pgn-frame { ${cs.border.radius(border.radius + " !important")} }`}
    ${({ border }) => border && border.width && `.pgn-frame { ${cs.border.width(border.width + " !important")} }`}
    
    ${({ font }) => font && font.color && `.pgn-frame .pg-no { ${cs.font.color(font.color + " !important")} }`}
    ${({ font }) => font && font.size && `.pgn-frame .pg-no { ${cs.font.size(font.size + " !important")} }`}
    ${({ bgcolor }) => bgcolor && `.pgn-frame { ${cs.bg.color(bgcolor)} }`}

    ${({ button }) => button && button.color && `.pgn-frame .pg-no { ${cs.bg.color(button.color + " !important")} }`}
    ${({ button }) => button && button.hover && `.pgn-frame .pg-no:hover { ${cs.border.color(button.hover + " !important")} }`}
    ${({ button }) => button && button.active && `.pgn-frame .pg-no.active { ${cs.bg.color(button.active + " !important")} }`}
  }
}`;


const Pagenavi = (props) => {
  const [type, setType] = useState('s-pc');
  const [pos, setPos] = useState(0);
  const [max, setMax] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [scp, setScp] = useState((type === "s-pc" ? 10 : 5));
  const [first, setFirst] = useState(0);
  const [items, setItems] = useState(null);
  const [invisable, setInvisable] = useState(false);

  useEffect(() => {
    window.addEventListener('resize', checkScreen);
    return () => {
      window.removeEventListener('resize', checkScreen);
    }
  }, []);

  useEffect(() => {
    setPos(props.pos);

    return () => { }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.pos]);

  useEffect(() => {
    setMax(props.max);
    // setScp((type === "s-pc" ? 10 : 5));

    const f = getFirstPage(props.pos, scp);
    let last = f + scp - 1;
    let invis = true;
    // 전체 페이지수가 scp보다 크면...
    if (last < props.max) {
      invis = false;
    } else if (last >= props.max) {
      last = props.max;
    }

    let array = [];
    for (let i = f; i <= last; i++) {
      array.push({ 'page': (i) });
    }

    setItems(array);
    setFirst(f);
    setInvisable(invis);

    return () => { }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.max]);
  
  const checkScreen = () => {
    const { type } = Util.getScreenType();
    setType(type);
  }

  const getFirstPage = (pos, scp) => (Math.floor((pos - 1) / scp) * scp + 1);

  const onClicked = (e) => {
    let eid = e.currentTarget.getAttribute('eid');
    let first = getFirstPage(pos, scp);
    let page = pos;
    switch (eid) {
      case EID.PREV:
        page = first - scp;
        if (page < 1) {
          page = 1;
        }
        break;
      case EID.NEXT:
        page = first + scp;
        if (page >= max) {
          page = max;
        }
        break;
      default: page = e.currentTarget.textContent; break;
    }

    setPos(page);

    props.onItemClick && props.onItemClick(page, e);
    props.onClick && props.onClick(page, e);
  }

  const { className, border, font, bgcolor, button, theme } = props;
  if (items && items.length <= 1 && first <= 1) {
    return null;
  } else {
    return (
      <StyledObject className={cx('page-navi', (type), className, theme && `theme-${theme}`)} button={button} border={border} font={font} bgcolor={bgcolor} >
        {items && <ul className={cx('pgn-frame')}>
          <li className={cx('pg-no pg-icon')} onClick={onClicked} eid={EID.PREV}>
            <Svg className="prev sm" name={"prev"} color={props.color} />
          </li>
          {items.map((item, index) => (
            <li className={cx('pg-no', String(item.page) === String(pos) ? 'active' : '')}
              key={String(index)} onClick={onClicked} eid={EID.PAGE}><span>{item.page}</span>
            </li>
          ))}
          <li className={cx('pg-no pg-icon', { invisable })} onClick={onClicked} eid={EID.NEXT}>
            <Svg className="next sm" name={"next"} color={props.color} />
          </li>
        </ul>}
      </StyledObject>
    )
  };
}

export default Pagenavi;