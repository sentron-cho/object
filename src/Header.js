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
  </StyledObject>
}