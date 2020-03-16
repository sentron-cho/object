import React from 'react';
import cx from 'classnames/bind';
import styled from 'styled-components';
import { Svg, Util, cs } from './index';
import { EID, SCREEN } from './Config';

const StyledObject = styled.header`{
  &.header {
    ${cs.pos.relative} ${cs.w.full} ${cs.over.hidden} ${cs.z.header}
    ${({ height }) => cs.h.get(height)} ${cs.noliststyle} ${cs.noselect}

    .nav-frame { ${cs.w.full} ${cs.bg.white} ${cs.border.bottom} ${cs.border.lightgray} ${cs.box.inner}
      ${({ height }) => cs.h.get(height)}
      
      &.float { ${cs.pos.fixed} ${cs.anim.show} ${cs.border.gray} }

      .nav-layer { ${cs.size.full} ${cs.disp.block} ${cs.p.l10} ${props => cs.max.width(props.maxwidth)}
        .li-title { ${cs.align.ycenter} ${cs.pos.relative} ${cs.font.t1} ${cs.font.thickbold} ${cs.h.auto} ${cs.disp.inblock}
          ${cs.float.l} ${cs.left(10)} ${cs.top("50%")} letter-spacing: 3px; 
        }

        .ul-navi { ${cs.opac.show} ${cs.disp.block} ${cs.size.wfit} 
          ${cs.mouse.pointer} ${cs.z.header} ${cs.disp.inblock} ${cs.h.auto}
          .li-nav { ${cs.disp.inblock} ${cs.size.fit} ${cs.m.h10} ${cs.font.center} ${cs.font.thickbold} 
            ${cs.z.front} 

            &:hover, &.active { ${cs.font.primary} }
          }

          &.s-tablet, &.s-pc {
            .li-nav { ${cs.pos.relative} }
          }
        }

        &.s-tablet, &.s-pc { ${cs.align.center} 
          .li-title { ${cs.p.r20} }
          .ul-navi { ${cs.align.ycenter} ${cs.p.r10} }
        }

        &.s-mobile { ${cs.pos.relative} ${cs.size.full} 
          .li-title { ${cs.align.center} }
          .ul-navi { ${cs.bg.dark} ${cs.opac.show} ${cs.box.radius} ${cs.box.shadow} ${cs.font.white}
            ${cs.w.get(240)} ${cs.pos.fixed} ${cs.p.a10} ${cs.h.auto} ${cs.right(30)} ${cs.top(40)}
            .li-nav { ${cs.w.full} ${cs.disp.block} ${cs.m.a0} ${cs.font.line(34)} 
              &:hover { ${cs.bg.black} ${cs.anim.show} } 
            }
          }
          .btn-menu { ${cs.align.ycenter} ${cs.float.r} ${cs.pos.relative} ${cs.right(10)} }
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
        &:hover, &.active { ${cs.font.dark } }
      }
    }
    &.gray {
      .nav-frame { ${cs.bg.lightgray} ${cs.font.black} 
        .nav-layer .ul-navi .li-nav {
          ${cs.font.dark}
          &:hover, &.active { ${cs.font.primary } }
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
        &:hover, &.active { ${cs.font.dark } }
      }
    }
    &.theme-gray {
      .nav-frame { ${cs.bg.lightgray} ${cs.font.black} 
        .nav-layer .ul-navi .li-nav {
          ${cs.font.dark}
          &:hover, &.active { ${cs.font.primary } }
        }
      }
    }
    &.theme-dark { .nav-frame { ${cs.bg.dark} ${cs.font.white} } }
    &.theme-black { .nav-frame { ${cs.bg.black} ${cs.font.white} } }

    .nav-frame {
      .nav-layer .li-title {
        ${({ font }) => font && font.title && cs.font.color(font.title)}
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

    @media screen and (max-width : 1280px) { }

    @media screen and (max-width : 1024px) {
      .nav-frame .nav-layer { 
        .li-title { ${cs.font.xxl} }
        .ul-navi {
          .li-nav { ${cs.font.sm} }
        }
      }
    }
  
    @media screen and (max-width : 860px) {
      .nav-frame .nav-layer { 
        .li-title { ${cs.align.center} }
      }
    }
  }
}`;

class Header extends React.PureComponent {
  constructor(props) {
    super(props);
    const { type } = Util.getScreenType();
    const { list, pos = 0, frameid = "body" } = props;
    this.state = { type: type, menus: EID.HIDE, float: false, frameid: frameid };
  }

  onClickMenu = (e) => {
    const url = e.currentTarget.getAttribute("url");
    if (this.props.preview) {
      window.open(url);
    } else {
      if (this.props.history.location.state) {
        this.props.history.push(url);
      } else {
        window.location.href = url;
      }
    }
  }

  onResize = (e) => {
    const { type } = Util.getScreenType();
    const a = Util.isSelfClick(e, (item) => {
      return item.indexOf("btn-menu") >= 0 || item.indexOf("li-nav") >= 0;
    });
    if (a) return;

    this.setState({ 'type': type, menus: EID.HIDE });
  }

  onScroll = (e) => {
    if (window.scrollY > 2) {
      this.setState({ float: true });
    } else {
      this.setState({ float: false });
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
    window.addEventListener("scroll", this.onScroll);
    const body = document.getElementById(this.state.frameid);
    body && body.addEventListener('mouseup', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener("scroll", this.onScroll);
    const body = document.getElementById(this.state.frameid);
    body && body.removeEventListener('mouseup', this.onResize);
  }

  hide = () => {
    this.setState({ menus: EID.HIDE });
  }

  render() {
    const { props, state } = this;
    // url이 root와 같을 경우 첫번째 메뉴를 active 하기 위한 로직
    const { list, location, title, height = "60px", maxwidth = "1024px", theme, className } = props;
    const { menus, type } = state;

    // const isroot = location === root;
    const align = props.align ? props.align : 'right';
    const array = list || []; //align === 'right' ? list.reverse() : list;
    // const width = 100 / list.length;
    // const style = { width: `${width}%` }

    let show = menus === EID.SHOW;
    if (type !== SCREEN.ST.MOBILE) show = true;

    const { float } = this.state;
    const logouttitle = props.logouttitle || 'Logout';

    const renderMobile = () => {
      if (show === EID.SHOW) {
        return <Svg className="btn-menu md" name={"menu"} onClick={(eid, e) => { }} color={cs.color.dark} />
      } else {
        return <Svg className="btn-menu md" name={"menu"} onClick={(eid, e) => {
          e.stopPropagation();
          this.setState({ menus: show ? EID.HIDE : EID.SHOW });
        }} color={cs.color.dark} />
      }
    }

    const { font, border } = props.options || { border: null, font: null };

    return (
      <StyledObject className={cx("header", className, theme && `theme-${theme}`)} height={height} maxwidth={maxwidth}
        border={border} font={font}>
        <div className={cx('nav-frame', { float })}>
          <div className={cx('nav-layer', align, type)}>
            {props.onMenu && <Svg className="btn-side md" name={"list"} onClick={(eid, e) => props.onMenu()} color={cs.color.dark} />}

            {/* 타이틀 */}
            <p className={cx("li-title", !title && 'notitle')} onClick={props.onClick && props.onClick}>{title ? title.toUpperCase() : "NO TITLE"}</p>

            {/* 네비 메뉴 */}
            {show && <ul className={cx("ul-navi", align, type, array.length < 1 && 'nomenu')}>
              {array.map((item, index) => {
                const active = location ? location.toLowerCase() === item.url.toLowerCase() : (index === 0);
                return <li key={index} className={cx("li-nav", { active })}
                  url={item.url} onClick={this.onClickMenu}>{item.name && item.name.toUpperCase()}
                </li>
              })}
              {array.length < 1 && <li className={"li-nav"}>NO MENU</li>}
              {props.onLogout && <li className={cx("li-nav")} onClick={(e) => props.onLogout(e)}>{logouttitle}
              </li>}
            </ul>}

            {/* 모바일에서의 아이콘 */}
            {type === SCREEN.ST.MOBILE && renderMobile()}
          </div>
        </div>
      </StyledObject>
    )
  }
}

export default Header;