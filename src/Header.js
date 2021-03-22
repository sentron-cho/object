import React, { useState, useEffect } from 'react';
import cx from 'classnames/bind';
import styled from 'styled-components';
import { Svg, Util, cs } from './index';
import * as actions from './actor/Action';

const StyledObject = styled.header`{
  &.header {
    ${cs.w.full} ${cs.over.hidden} ${cs.z.header} ${cs.pos.relative} ${cs.noliststyle} ${cs.noselect}
    ${cs.pos.sticky} ${cs.top(0)}

    .nav-frame { ${cs.w.full} ${cs.bg.white} ${cs.border.bottom} ${cs.border.lightgray} ${cs.box.inner} ${cs.h.full} }

    &.trans {
      .nav-frame { ${cs.bg.white} ${cs.font.black} ${cs.border.trans} }
    }
    &.alpha {
      .nav-frame { ${cs.bg.color('#ffffffff')}
        ${cs.anim.out('1.0s')} ${cs.bg.color('#ffffff00')} ${cs.font.dark} ${cs.border.trans} ${cs.opac.get(0.7)}
        text-shadow: 1px 1px 1px #ffffffff;
        &:hover { ${cs.anim.in('0.5s')} ${cs.bg.white} ${cs.border.lightgray} ${cs.opac.get(1.0)} text-shadow: 1px 1px 1px #ffffff00; }
        &.show { ${cs.opac.get(1.0)} text-shadow: 1px 1px 1px #ffffff00; }
      }

      // .nav-frame { 
      //   ${cs.font.dark} animation: alpha-fade ease-out 1 forwards 2.0s;
      //   &:hover { ${cs.anim.in('0.5s')} ${cs.bg.white} ${cs.border.lightgray} ${cs.opac.get(1.0)} }
      // }

      // @keyframes alpha-fade {
      //   from { ${cs.bg.white} ${cs.opac.get(1.0)} ${cs.border.lightgray} }
      //   to { ${cs.bg.trans} ${cs.opac.get(0.7)} ${cs.border.trans} }
      // };
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
  }

  &.nav-desktop {
    ${cs.disp.block} ${cs.size.full} ${cs.disp.block} ${cs.p.l10} ${cs.m.center(0)} ${cs.pos.relative}

    .li-title { ${cs.align.ycenter} ${cs.pos.relative} ${cs.font.t1} ${cs.font.weight(700)} ${cs.h.auto} ${cs.disp.inblock}
      ${cs.float.l} ${cs.left(10)} ${cs.top("50%")} ${cs.p.r20} ${cs.font.spacing(3)}
    }

    .ul-navi { ${cs.opac.show} ${cs.disp.block} ${cs.size.wfit} ${cs.align.ycenter} ${cs.p.r10}
      ${cs.mouse.pointer} ${cs.z.header} ${cs.disp.inblock} ${cs.h.auto} 
      .li-nav { ${cs.disp.inblock} ${cs.size.fit} ${cs.m.h10} ${cs.font.center} ${cs.font.thickbold} 
        ${cs.z.front} ${cs.font.md} 

        &:hover { ${cs.font.underline} }
        &.active { ${cs.font.primary} }
      }
    }

    .btn-side { ${cs.align.ycenter} ${cs.pos.relative} }
    
    .notitle, .nomenu { ${cs.font.lightgray} .li-nav:hover { ${cs.font.color(`${cs.color.gray} !important`)} } }

    &.right { .ul-navi {  ${cs.right(0)} } }
    &.center { .ul-navi { ${cs.float.l} ${cs.align.center} } }

    @media screen and (max-width : 1280px) { 
      .li-title { ${cs.p.r20} }
      .ul-navi { ${cs.align.ycenter} ${cs.p.r10} }
    }

    @media screen and (max-width : 1024px) {
      .li-title { ${cs.font.xxl} ${cs.align.unset} ${cs.align.ctop} ${cs.top(5)} }
      .ul-navi { ${cs.align.unset} ${cs.pos.absolute} ${cs.bottom(5)} ${cs.w.full} ${cs.font.center}
        .li-nav { ${cs.font.sm} }
      }
    }
  }

  &.nav-mobile {
    ${cs.disp.block} ${cs.size.full} ${cs.disp.block} ${cs.p.l10} ${cs.m.center(0)} ${cs.pos.relative}
    ${cs.align.unset} ${cs.pos.sticky}

    .li-title { ${cs.align.center} ${cs.float.l} ${cs.p.r20} ${cs.font.spacing(3)}
      ${cs.pos.relative} ${cs.font.t1} ${cs.font.weight(700)} ${cs.h.auto} ${cs.disp.inblock}
    }
    .ul-navi { ${cs.align.unset} ${cs.p.r10} ${cs.bg.dark} ${cs.opac.show} ${cs.box.radius} ${cs.box.shadow} ${cs.font.white}
      ${cs.w.get('auto')} ${cs.min.w(160)} ${cs.max.w(240)} ${cs.pos.fixed} ${cs.p.a10} ${cs.h.auto} 
      ${cs.right(30)} ${cs.top(40)} ${cs.mouse.pointer}
      .li-nav { ${cs.w.full} ${cs.disp.block} ${cs.m.a0} ${cs.font.line(34)} ${cs.p.h20} 
        &:hover { ${cs.bg.black} ${cs.anim.show} }
        &.active { ${cs.font.primary} }
      }
    }
    .btn-menu { ${cs.align.ycenter} ${cs.float.r} ${cs.pos.relative} ${cs.right(10)} }
    .btn-side { ${cs.align.ycenter} ${cs.pos.relative} }
    
    .notitle, .nomenu { ${cs.font.lightgray} .li-nav:hover { ${cs.font.color(`${cs.color.gray} !important`)} } }

    &.right { .ul-navi { ${cs.font.right} } }
    &.center { .ul-navi { ${cs.font.center} } }
  }
}`;


const Header = (props) => {
  const [refresh, setRefresh] = useState(null);
  const [show, setShow] = useState('');

  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setRefresh(new Date());
  }

  // const onResize = (e) => {
  //   const { type } = Util.getScreenType();
  //   const a = Util.isSelfClick(e, (item) => {
  //     return item.indexOf("btn-menu") >= 0 || item.indexOf("li-nav") >= 0;
  //   });
  //   if (a) return;

  //   setType(type);
  //   setMenus(EID.HIDE)
  // }

  // url이 root와 같을 경우 첫번째 메뉴를 active 하기 위한 로직
  const { height = "60px", theme, className } = props;
  const logouttitle = props.logouttitle || 'Logout';
  const logintitle = props.logouttitle || 'Login';
  const { font, border } = props.options || { border: null, font: null };

  const { innerWidth } = window;
  const ismobile = innerWidth < 800;

  const onClickShow = (s) => {
    setShow(s);
  }

  return (
    <StyledObject className={cx("header", className, theme && `theme-${theme}`)} height={height}
      border={border} font={font} style={{ height: ismobile ? '40px' : height }}>
      <div className={cx('nav-frame', show)} refresh={refresh}>
        {ismobile
          ? <Mobile {...props} {...{ logouttitle, logintitle }} onClick={onClickMenu} onShow={onClickShow} />
          : <Desktop {...props} {...{ logouttitle, logintitle }} onClick={onClickMenu} />}
      </div>
    </StyledObject>
  )
}

export default Header;

const Desktop = (props) => {
  const { align = 'right', list, location, title, maxWidth = "1024px", logouttitle, logintitle, pos = -1 } = props;

  return <StyledObject className={cx('nav-layer nav-desktop', align)} style={{ maxWidth: maxWidth }}>
    {props.onMenu && <Svg className="btn-side md" name={"list"} onClick={(eid, e) => props.onMenu()} color={cs.color.dark} />}

    {/* 타이틀 */}
    <p className={cx("li-title", !title && 'notitle')} onClick={(e) => actions.go('/', null)}>{title ? title.toUpperCase() : ""}</p>

    {/* 네비 메뉴 */}
    <ul className={cx("ul-navi", align, list.length < 1 && 'nomenu')}>
      {list.map((item, index) => {
        const active = pos ? index === pos : location ? location.toLowerCase() === item.url.toLowerCase() : (index === 0);
        const name = item.name || item.title;
        if (item.hide) {
          return null;
        } else {
          return <li key={index} className={cx("li-nav", { active })}
            onClick={(e) => props.onClick(e, item)}><span>{name && name.toUpperCase()}</span>
          </li>
        }
      })}

      {props.onLogin && <li className={cx("li-nav")} onClick={props.onLogin}>{logintitle}</li>}
      {props.onLogout && <li className={cx("li-nav")} onClick={props.onLogout}>{logouttitle}</li>}
    </ul>
  </StyledObject>
}

const Mobile = (props) => {
  const { align = 'right', list, location, title, maxWidth = "1024px", logouttitle, logintitle, pos = -1 } = props;
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onRefresh = (e) => {
      const a = Util.isSelfClick(e, (item) => {
        return item.indexOf("li-nav") >= 0;
      });
      if (a) return;

      setShow(false);
      props.onShow && props.onShow('hide');
    }
    const body = document.getElementById('body');
    body && body.addEventListener('mouseup', onRefresh);
    return () => {
      body && body.removeEventListener('mouseup', onRefresh);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickShow = (eid, e) => {
    e.stopPropagation();
    setShow(true);
    props.onShow && props.onShow('show');
  }

  return <StyledObject className={cx('nav-layer nav-mobile', align, { show })} style={{ maxWidth: maxWidth }}>
    {props.onMenu && <Svg className="btn-side md" name={"list"} onClick={(eid, e) => props.onMenu()} color={cs.color.dark} />}

    {/* 타이틀 */}
    <p className={cx("li-title", !title && 'notitle')} onClick={(e) => actions.go('/', null)}>{title ? title.toUpperCase() : ""}</p>

    {/* 네비 메뉴 */}
    {show && <ul className={cx("ul-navi", align, list.length < 1 && 'nomenu')}>
      {list.map((item, index) => {
        const active = pos ? index === pos : location ? location.toLowerCase() === item.url.toLowerCase() : (index === 0);
        const title = item.name || item.title;
        if (item.hide) {
          return null;
        } else {
          return <li key={index} className={cx("li-nav", { active })}
            onClick={(e) => props.onClick(e, item)}><span>{title && title.toUpperCase()}</span>
          </li>
        }
      })}

      {props.onLogin && <li className={cx("li-nav")} onClick={props.onLogin}>{logintitle}</li>}
      {props.onLogout && <li className={cx("li-nav")} onClick={props.onLogout}>{logouttitle}</li>}
    </ul>}

    <Svg className="btn-menu md" name={"menu"} onClick={onClickShow} color={cs.color.dark} />

    {/* {show ? <Svg className="btn-menu md" name={"menu"} onClick={(eid, e) => { }} color={cs.color.dark} /> :
      <Svg className="btn-menu md" name={"menu"} onClick={onClickShow} color={cs.color.dark} />} */}

  </StyledObject>
}


// import React, { useState, useEffect } from 'react';
// import cx from 'classnames/bind';
// import styled from 'styled-components';
// import { Svg, Util, cs } from './index';
// import { EID, SCREEN } from './Config';
// import * as actions from './actor/Action';

// const StyledObject = styled.header`{
//   &.header {
//     ${cs.w.full} ${cs.over.hidden} ${cs.z.header} ${cs.pos.relative} 
//     ${({ height }) => cs.h.get(height)} ${cs.noliststyle} ${cs.noselect}

//     .nav-frame { ${cs.w.full} ${cs.bg.white} ${cs.border.bottom} ${cs.border.lightgray} ${cs.box.inner}
//       ${({ height }) => cs.h.get(height)}

//       &.float { ${cs.pos.fixed} ${cs.border.gray} }

//       .nav-layer { ${cs.size.full} ${cs.disp.block} ${cs.p.l10} ${cs.m.center(0)} ${cs.pos.relative}
//         .li-title { ${cs.align.ycenter} ${cs.pos.relative} ${cs.font.t1} ${cs.font.weight(700)} ${cs.h.auto} ${cs.disp.inblock}
//           ${cs.float.l} ${cs.left(10)} ${cs.top("50%")} ${cs.p.r20} ${cs.font.spacing(3)}
//         }

//         .ul-navi { ${cs.opac.show} ${cs.disp.block} ${cs.size.wfit} ${cs.align.ycenter} ${cs.p.r10}
//           ${cs.mouse.pointer} ${cs.z.header} ${cs.disp.inblock} ${cs.h.auto} 
//           .li-nav { ${cs.disp.inblock} ${cs.size.fit} ${cs.m.h10} ${cs.font.center} ${cs.font.thickbold} 
//             ${cs.z.front} ${cs.font.md} 
//             // ${cs.anim.showin('200ms')}

//             &.active { ${cs.font.primary} }
//           }
//         }

//         &.right { &.s-tablet, &.s-pc { .ul-navi {  ${cs.right(0)} } } }
//         &.center { &.s-tablet, &.s-pc { .ul-navi { ${cs.float.l} ${cs.align.center} } } }
//       }

//       .btn-side { ${cs.align.ycenter} ${cs.pos.relative} }

//       .notitle, .nomenu { ${cs.font.lightgray} .li-nav:hover { ${cs.font.color(`${cs.color.gray} !important`)} } }
//     }

//     &.trans { .nav-frame { ${cs.bg.white} ${cs.font.black} } }
//     &.sky { .nav-frame { ${cs.bg.sky} ${cs.font.black} } }
//     &.primary {
//       .nav-frame { ${cs.bg.primary} ${cs.font.white} } 
//       .nav-layer .ul-navi .li-nav {
//         ${cs.font.sky}
//         &.active { ${cs.font.dark} }
//       }
//     }
//     &.gray {
//       .nav-frame { ${cs.bg.lightgray} ${cs.font.black} 
//         .nav-layer .ul-navi .li-nav {
//           ${cs.font.dark}
//           &.active { ${cs.font.primary} }
//         }
//       }
//     }
//     &.dark { .nav-frame { ${cs.bg.dark} ${cs.font.white} } }
//     &.black { .nav-frame { ${cs.bg.black} ${cs.font.white} } }

//     &.theme-sky { .nav-frame { ${cs.bg.sky} ${cs.font.black} } }
//     &.theme-primary {
//       .nav-frame { ${cs.bg.primary} ${cs.font.white} } 
//       .nav-layer .ul-navi .li-nav {
//         ${cs.font.sky}
//         &.active { ${cs.font.dark} }
//       }
//     }
//     &.theme-gray {
//       .nav-frame { ${cs.bg.lightgray} ${cs.font.black} 
//         .nav-layer .ul-navi .li-nav {
//           ${cs.font.dark}
//           &.active { ${cs.font.primary} }
//         }
//       }
//     }
//     &.theme-dark { .nav-frame { ${cs.bg.dark} ${cs.font.white} } }
//     &.theme-black { .nav-frame { ${cs.bg.black} ${cs.font.white} } }

//     .nav-frame {
//       .nav-layer .li-title {
//         ${({ font }) => font && font.title && cs.font.color(font.title)}
//         ${({ font }) => font && font.type && cs.font.family(font.type)}
//       }

//       .nav-layer .ul-navi .li-nav {
//         ${({ font }) => font && font.color && cs.font.color(font.color)}
//         ${({ font }) => font && font.size && cs.font.size(font.size)}

//         &:hover, &.active { 
//           ${({ font }) => font && font.hover && cs.font.color(font.hover)}
//         }        
//       }

//       ${({ border }) => border && cs.border.bottom}
//       ${({ border }) => border && border.color && cs.border.color(border.color)}
//       ${({ border }) => border && border.width && cs.border.width(border.width)}
//     }

//     @media screen and (min-width : 801px) { 
//       .nav-frame .nav-layer .ul-navi .li-nav:hover { 
//         // ${cs.anim.slide('0.2s', '0', '-5px', 'h-up', 'ease-out')} 
//         ${cs.font.underline}
//       }
//     }

//     @media screen and (max-width : 1280px) { 
//       .nav-frame .nav-layer { 
//         .li-title { ${cs.p.r20} }
//         .ul-navi { ${cs.align.ycenter} ${cs.p.r10} }
//       }
//     }

//     @media screen and (max-width : 1024px) {
//       .nav-frame .nav-layer { 
//         .li-title { ${cs.font.xxl} ${cs.align.unset} ${cs.align.ctop} ${cs.top(5)} }
//         .ul-navi { ${cs.align.unset} ${cs.pos.absolute} ${cs.bottom(5)} ${cs.w.full} ${cs.font.center}
//           .li-nav { ${cs.font.sm} }
//         }
//       }
//     }

//     @media screen and (max-width : 800px) {
//       ${cs.align.unset} ${cs.pos.sticky}
//       .nav-frame .nav-layer { 
//         // ${cs.pos.relative} ${cs.size.full} 
//         .li-title { ${cs.align.center} }
//         .ul-navi { ${cs.align.unset} ${cs.p.r10} ${cs.bg.dark} ${cs.opac.show} ${cs.box.radius} ${cs.box.shadow} ${cs.font.white}
//           ${cs.w.get(240)} ${cs.pos.fixed} ${cs.p.a10} ${cs.h.auto} ${cs.right(30)} ${cs.top(40)}
//           .li-nav { ${cs.w.full} ${cs.disp.block} ${cs.m.a0} ${cs.font.line(34)} 
//             &:hover { ${cs.bg.black} ${cs.anim.show} } 
//           }
//         }
//         .btn-menu { ${cs.align.ycenter} ${cs.float.r} ${cs.pos.relative} ${cs.right(10)} }
//       }
//     }

//     @media screen and (max-width : 600px) {
//     }
//   }
// }`;


// const Header = (props) => {
//   const [type, setType] = useState('');
//   const [menus, setMenus] = useState(EID.HIDE);
//   const [float, setFloat] = useState(false);
//   // const [frameid, setFrameid] = useState(props.frameid || 'body');

//   useEffect(() => {
//     const { type } = Util.getScreenType();
//     setType(type);

//     window.addEventListener('resize', onResize);
//     window.addEventListener("scroll", onScroll);
//     // const body = document.getElementById(frameid);
//     // body && body.addEventListener('mouseup', onResize);

//     return () => {
//       window.removeEventListener('resize', onResize);
//       window.removeEventListener("scroll", onScroll);
//       // const body = document.getElementById(frameid);
//       // body && body.removeEventListener('mouseup', onResize);
//     }
//   }, []);

//   const onClickMenu = (e, item) => {
//     const { url, param = {} } = item;
//     if (props.onClickMenu) {
//       props.onClickMenu(e, item);
//       return;
//     }

//     if (props.preview) {
//       window.open(url);
//     } else {
//       const { history } = props;
//       if (history && history.location && history.location.state) {
//         props.history.push(url);
//       } else {
//         if (url && url.indexOf("http") === 0) {
//           window.open(url);
//         } else {
//           actions.go(url, param)
//           // window.location.href = url;
//         }
//       }
//     }
//   }

//   const onResize = (e) => {
//     const { type } = Util.getScreenType();
//     const a = Util.isSelfClick(e, (item) => {
//       return item.indexOf("btn-menu") >= 0 || item.indexOf("li-nav") >= 0;
//     });
//     if (a) return;

//     setType(type);
//     setMenus(EID.HIDE)
//   }

//   const onScroll = (e) => {
//     setFloat(window.scrollY > 2)
//   }

//   // const hide = () => {
//   //   setMenus(EID.HIDE);
//   // }

//   // url이 root와 같을 경우 첫번째 메뉴를 active 하기 위한 로직
//   const { list, location, title, height = "60px", maxWidth = "1024px", theme, className, pos = -1 } = props;
//   const { align = 'right' } = props;
//   const array = list || [];

//   let show = menus === EID.SHOW;
//   if (type !== SCREEN.ST.MOBILE) show = true;
//   const logouttitle = props.logouttitle || 'Logout';
//   const logintitle = props.logouttitle || 'Login';

//   const renderMobile = () => {
//     if (show === EID.SHOW) {
//       return <Svg className="btn-menu md" name={"menu"} onClick={(eid, e) => { }} color={cs.color.dark} />
//     } else {
//       return <Svg className="btn-menu md" name={"menu"} onClick={(eid, e) => {
//         e.stopPropagation();
//         setMenus(show ? EID.HIDE : EID.SHOW)
//       }} color={cs.color.dark} />
//     }
//   }

//   const { font, border } = props.options || { border: null, font: null };

//   return (
//     <StyledObject className={cx("header", className, theme && `theme-${theme}`)} height={height} border={border} font={font}>
//       <div className={cx('nav-frame', { float })}>
//         <div className={cx('nav-layer', align, type)} style={{ maxWidth: maxWidth }}>
//           {props.onMenu && <Svg className="btn-side md" name={"list"} onClick={(eid, e) => props.onMenu()} color={cs.color.dark} />}

//           {/* 타이틀 */}
//           <p className={cx("li-title", !title && 'notitle')} onClick={props.onClick}>{title ? title.toUpperCase() : ""}</p>

//           {/* 네비 메뉴 */}
//           {show && <ul className={cx("ul-navi", align, type, array.length < 1 && 'nomenu')}>
//             {array.map((item, index) => {
//               const active = pos ? index === pos : location ? location.toLowerCase() === item.url.toLowerCase() : (index === 0);
//               const title = item.name || item.title;
//               if (item.hide) {
//                 return null;
//               } else {
//                 return <li key={index} className={cx("li-nav", { active })}
//                   onClick={(e) => onClickMenu(e, item)}><span>{title && title.toUpperCase()}</span>
//                 </li>
//               }
//             })}
//             {/* {array.length < 1 && <li className={"li-nav"}>NO MENU</li>} */}
//             {props.onLogin && <li className={cx("li-nav")} onClick={(e) => props.onLogin(e)}>{logintitle}</li>}
//             {props.onLogout && <li className={cx("li-nav")} onClick={(e) => props.onLogout(e)}>{logouttitle}</li>}
//           </ul>}

//           {/* 모바일에서의 아이콘 */}
//           {array.length > 0 && type === SCREEN.ST.MOBILE && renderMobile()}
//         </div>
//       </div>
//     </StyledObject>
//   )
// }

// export default Header;