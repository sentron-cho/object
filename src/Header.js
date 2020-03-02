import React from 'react';
import cx from 'classnames/bind';
import styled from 'styled-components';
import { Svg, Util, cs } from './index';
import { EID, SCREEN } from './Config';

const StyledObject = styled.header`{
  &.header {
    ${cs.pos.relative} ${cs.w.full} ${cs.over.hidden} ${cs.z.header}
    height: ${props => props.height};

    .nav-frame { ${cs.w.full} ${cs.bg.white} ${cs.border.bottom} ${cs.border.lightgray}
      height: ${props => props.height};
      
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
    this.state = { type: type, menus: EID.HIDE, float: false };
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
    document.getElementById('body').addEventListener('mouseup', this.onResize);
    window.addEventListener("scroll", this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
    document.getElementById('body').removeEventListener('mouseup', this.onResize);
    window.removeEventListener("scroll", this.onScroll);
  }

  hide = () => {
    this.setState({ menus: EID.HIDE });
  }

  render() {
    const { props, state } = this;
    // url이 root와 같을 경우 첫번째 메뉴를 active 하기 위한 로직
    const { list, location, title, height = "60px", maxwidth="1024px" } = props;
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
        return <Svg className="btn-menu md" name={"menu"} onClick={(eid, e) => {}} color={cs.color.dark} />
      } else {
        return <Svg className="btn-menu md" name={"menu"} onClick={(eid, e) => {
          e.stopPropagation();
          this.setState({ menus: show ? EID.HIDE : EID.SHOW });
        }} color={cs.color.dark}  />
      }
    }

    return (
      <StyledObject className={cx("header")} height={height} maxwidth={maxwidth}>
        <div className={cx('nav-frame', {float})}>
          <div className={cx('nav-layer', align, type)}>
            {props.onMenu && <Svg className="btn-side md" name={"list"} onClick={(eid, e) => props.onMenu()} color={cs.color.dark} /> }

            {/* 타이틀 */}
            <p className="li-title" onClick={props.onClick && props.onClick}>{title ? title : "TITLE"}</p>
            
            {/* 네비 메뉴 */}
            {show && <ul className={cx("ul-navi", align, type)}>
              {array.map((item, index) => {
                const active = location ? location.toLowerCase() === item.url.toLowerCase() : (index === 0);
                return <li key={index} className={cx("li-nav", { active })}
                  url={item.url} onClick={this.onClickMenu}>{item.name}
                </li>
              })}
              {props.onLogout && <li className={cx("li-nav")} onClick={(e) => props.onLogout(e)}>{logouttitle}
                </li>}
            </ul>}            

            {/* 모바일에서의 아이콘 */}
            {type === SCREEN.ST.MOBILE && renderMobile() }
          </div>
        </div>
      </StyledObject>
    )
  }
}

export default Header;