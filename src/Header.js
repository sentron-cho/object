import React, { useState, useEffect } from 'react';
import cx from 'classnames/bind';
import styled from 'styled-components';
import { Svg, Util, cs } from './index';
import { EID, SCREEN } from './Config';
import * as actions from './actor/Action';

const StyledObject = styled.header`{
  &.header {
    ${cs.w.full} ${cs.over.hidden} ${cs.z.header} ${cs.pos.relative} 
    ${({ height }) => cs.h.get(height)} ${cs.noliststyle} ${cs.noselect}

    .nav-frame { ${cs.w.full} ${cs.bg.white} ${cs.border.bottom} ${cs.border.lightgray} ${cs.box.inner}
      ${({ height }) => cs.h.get(height)}
      
      &.float { ${cs.pos.fixed} ${cs.border.gray} }

      .nav-layer { ${cs.size.full} ${cs.disp.block} ${cs.p.l10} ${cs.m.center(0)} ${cs.pos.relative}
        .li-title { ${cs.align.ycenter} ${cs.pos.relative} ${cs.font.t1} ${cs.font.weight(700)} ${cs.h.auto} ${cs.disp.inblock}
          ${cs.float.l} ${cs.left(10)} ${cs.top("50%")} ${cs.p.r20} ${cs.font.spacing(3)}
        }

        .ul-navi { ${cs.opac.show} ${cs.disp.block} ${cs.size.wfit} ${cs.align.ycenter} ${cs.p.r10}
          ${cs.mouse.pointer} ${cs.z.header} ${cs.disp.inblock} ${cs.h.auto} 
          .li-nav { ${cs.disp.inblock} ${cs.size.fit} ${cs.m.h10} ${cs.font.center} ${cs.font.thickbold} 
            ${cs.z.front} ${cs.font.md} 
            // ${cs.anim.showin('200ms')}

            &.active { ${cs.font.primary} }
          }
        }

        &.right { &.s-tablet, &.s-pc { .ul-navi {  ${cs.right(0)} } } }
        &.center { &.s-tablet, &.s-pc { .ul-navi { ${cs.float.l} ${cs.align.center} } } }
      }

      .btn-side { ${cs.align.ycenter} ${cs.pos.relative} }
      
      .notitle, .nomenu { ${cs.font.lightgray} .li-nav:hover { ${cs.font.color(`${cs.color.gray} !important`)} } }
    }

    &.trans { .nav-frame { ${cs.bg.white} ${cs.font.black} } }
    &.sky { .nav-frame { ${cs.bg.sky} ${cs.font.black} } }
    &.primary {
      .nav-frame { ${cs.bg.primary} ${cs.font.white} } 
      .nav-layer .ul-navi .li-nav {
        ${cs.font.sky}
        &.active { ${cs.font.dark} }
      }
    }
    &.gray {
      .nav-frame { ${cs.bg.lightgray} ${cs.font.black} 
        .nav-layer .ul-navi .li-nav {
          ${cs.font.dark}
          &.active { ${cs.font.primary} }
        }
      }
    }
    &.dark { .nav-frame { ${cs.bg.dark} ${cs.font.white} } }
    &.black { .nav-frame { ${cs.bg.black} ${cs.font.white} } }

    &.theme-sky { .nav-frame { ${cs.bg.sky} ${cs.font.black} } }
    &.theme-primary {
      .nav-frame { ${cs.bg.primary} ${cs.font.white} } 
      .nav-layer .ul-navi .li-nav {
        ${cs.font.sky}
        &.active { ${cs.font.dark} }
      }
    }
    &.theme-gray {
      .nav-frame { ${cs.bg.lightgray} ${cs.font.black} 
        .nav-layer .ul-navi .li-nav {
          ${cs.font.dark}
          &.active { ${cs.font.primary} }
        }
      }
    }
    &.theme-dark { .nav-frame { ${cs.bg.dark} ${cs.font.white} } }
    &.theme-black { .nav-frame { ${cs.bg.black} ${cs.font.white} } }

    .nav-frame {
      .nav-layer .li-title {
        ${({ font }) => font && font.title && cs.font.color(font.title)}
        ${({ font }) => font && font.type && cs.font.family(font.type)}
      }

      .nav-layer .ul-navi .li-nav {
        ${({ font }) => font && font.color && cs.font.color(font.color)}
        ${({ font }) => font && font.size && cs.font.size(font.size)}

        &:hover, &.active { 
          ${({ font }) => font && font.hover && cs.font.color(font.hover)}
        }        
      }

      ${({ border }) => border && cs.border.bottom}
      ${({ border }) => border && border.color && cs.border.color(border.color)}
      ${({ border }) => border && border.width && cs.border.width(border.width)}
    }

    @media screen and (min-width : 801px) { 
      .nav-frame .nav-layer .ul-navi .li-nav:hover { 
        // ${cs.anim.slide('0.2s', '0', '-5px', 'h-up', 'ease-out')} 
        ${cs.font.underline}
      }
    }

    @media screen and (max-width : 1280px) { 
      .nav-frame .nav-layer { 
        .li-title { ${cs.p.r20} }
        .ul-navi { ${cs.align.ycenter} ${cs.p.r10} }
      }
    }

    @media screen and (max-width : 1024px) {
      .nav-frame .nav-layer { 
        .li-title { ${cs.font.xxl} ${cs.align.unset} ${cs.align.ctop} ${cs.top(5)} }
        .ul-navi { ${cs.align.unset} ${cs.pos.absolute} ${cs.bottom(5)} ${cs.w.full} ${cs.font.center}
          .li-nav { ${cs.font.sm} }
        }
      }
    }
  
    @media screen and (max-width : 800px) {
      ${cs.align.unset} ${cs.pos.sticky}
      .nav-frame .nav-layer { 
        // ${cs.pos.relative} ${cs.size.full} 
        .li-title { ${cs.align.center} }
        .ul-navi { ${cs.align.unset} ${cs.p.r10} ${cs.bg.dark} ${cs.opac.show} ${cs.box.radius} ${cs.box.shadow} ${cs.font.white}
          ${cs.w.get(240)} ${cs.pos.fixed} ${cs.p.a10} ${cs.h.auto} ${cs.right(30)} ${cs.top(40)}
          .li-nav { ${cs.w.full} ${cs.disp.block} ${cs.m.a0} ${cs.font.line(34)} 
            &:hover { ${cs.bg.black} ${cs.anim.show} } 
          }
        }
        .btn-menu { ${cs.align.ycenter} ${cs.float.r} ${cs.pos.relative} ${cs.right(10)} }
      }
    }

    @media screen and (max-width : 600px) {
    }
  }
}`;


const Header = (props) => {
  const [type, setType] = useState('');
  const [menus, setMenus] = useState(EID.HIDE);
  const [float, setFloat] = useState(false);
  // const [frameid, setFrameid] = useState(props.frameid || 'body');

  useEffect(() => {
    const { type } = Util.getScreenType();
    setType(type);

    window.addEventListener('resize', onResize);
    window.addEventListener("scroll", onScroll);
    // const body = document.getElementById(frameid);
    // body && body.addEventListener('mouseup', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener("scroll", onScroll);
      // const body = document.getElementById(frameid);
      // body && body.removeEventListener('mouseup', onResize);
    }
  }, []);

  const onClickMenu = (e, item) => {
    const { url, param = {} } = item;
    if (props.onClickMenu) {
      props.onClickMenu(e, item);
      return;
    }

    if (props.preview) {
      window.open(url);
    } else {
      const { history } = props;
      if (history && history.location && history.location.state) {
        props.history.push(url);
      } else {
        if (url && url.indexOf("http") === 0) {
          window.open(url);
        } else {
          actions.go(url, param)
          // window.location.href = url;
        }
      }
    }
  }

  const onResize = (e) => {
    const { type } = Util.getScreenType();
    const a = Util.isSelfClick(e, (item) => {
      return item.indexOf("btn-menu") >= 0 || item.indexOf("li-nav") >= 0;
    });
    if (a) return;

    setType(type);
    setMenus(EID.HIDE)
  }

  const onScroll = (e) => {
    setFloat(window.scrollY > 2)
  }

  // const hide = () => {
  //   setMenus(EID.HIDE);
  // }

  // url이 root와 같을 경우 첫번째 메뉴를 active 하기 위한 로직
  const { list, location, title, height = "60px", maxWidth = "1024px", theme, className, pos = -1 } = props;
  const { align = 'right' } = props;
  const array = list || [];

  let show = menus === EID.SHOW;
  if (type !== SCREEN.ST.MOBILE) show = true;
  const logouttitle = props.logouttitle || 'Logout';
  const logintitle = props.logouttitle || 'Login';

  const renderMobile = () => {
    if (show === EID.SHOW) {
      return <Svg className="btn-menu md" name={"menu"} onClick={(eid, e) => { }} color={cs.color.dark} />
    } else {
      return <Svg className="btn-menu md" name={"menu"} onClick={(eid, e) => {
        e.stopPropagation();
        setMenus(show ? EID.HIDE : EID.SHOW)
      }} color={cs.color.dark} />
    }
  }

  const { font, border } = props.options || { border: null, font: null };

  return (
    <StyledObject className={cx("header", className, theme && `theme-${theme}`)} height={height} border={border} font={font}>
      <div className={cx('nav-frame', { float })}>
        <div className={cx('nav-layer', align, type)} style={{ maxWidth: maxWidth }}>
          {props.onMenu && <Svg className="btn-side md" name={"list"} onClick={(eid, e) => props.onMenu()} color={cs.color.dark} />}

          {/* 타이틀 */}
          <p className={cx("li-title", !title && 'notitle')} onClick={props.onClick}>{title ? title.toUpperCase() : ""}</p>

          {/* 네비 메뉴 */}
          {show && <ul className={cx("ul-navi", align, type, array.length < 1 && 'nomenu')}>
            {array.map((item, index) => {
              const active = pos ? index === pos : location ? location.toLowerCase() === item.url.toLowerCase() : (index === 0);
              const title = item.name || item.title;
              if (item.hide) {
                return null;
              } else {
                return <li key={index} className={cx("li-nav", { active })}
                  onClick={(e) => onClickMenu(e, item)}><span>{title && title.toUpperCase()}</span>
                </li>
              }
            })}
            {/* {array.length < 1 && <li className={"li-nav"}>NO MENU</li>} */}
            {props.onLogin && <li className={cx("li-nav")} onClick={(e) => props.onLogin(e)}>{logintitle}</li>}
            {props.onLogout && <li className={cx("li-nav")} onClick={(e) => props.onLogout(e)}>{logouttitle}</li>}
          </ul>}

          {/* 모바일에서의 아이콘 */}
          {array.length > 0 && type === SCREEN.ST.MOBILE && renderMobile()}
        </div>
      </div>
    </StyledObject>
  )
}

export default Header;