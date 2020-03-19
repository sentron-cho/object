import React from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import { connect } from 'react-redux';
import { EID, KEY, ST } from './Config';
import { Button, Svg, cs } from './index';

const StyledObject = styled.div`{
  &.side-menu {
    ${cs.h.full} ${cs.pos.fixed} ${cs.disp.block} ${cs.top(0)} ${cs.z.top} 
    ${({width}) => cs.w.get(width || '240px')} ${cs.anim.show} ${cs.bg.white} ${cs.font.dark}
    ${cs.border.right} ${cs.border.lightwhite} ${cs.noliststyle} ${cs.noselect}

    .sm-head {
      ${ cs.h.get(59)}

      .btn-cancel { ${cs.pos.absolute} ${cs.top(15)} ${cs.right(10)} }
    }
    // .svg-icon { ${cs.opac.get(0.5)}  }
    
    .sm-body { 
      ${cs.p.v10} ${cs.border.top}
      .sm-ul {
        .sm-li {
          ${cs.font.line(40)} ${cs.mouse.pointer} ${cs.p.r10} ${cs.p.l20} ${cs.border.radius('0 50px 50px 0px')} ${cs.m.r10}

          &:hover, &.active { ${cs.bg.get(cs.color.semiblack)} ${cs.font.white} }
        }

        .sm-div {
          ${cs.w.full} ${cs.h.get(1)} ${cs.m.v10} ${cs.bg.lightgray}
        }
      }
    }

    .sm-foot { }

    &.show { ${({fade}) => cs.anim.slidein(fade)} };
    &.hide { ${({fade}) => cs.anim.slideout(fade)} };

    &.md { ${({width}) => cs.w.get(width || 240)} .sm-body .sm-ul .sm-li { ${cs.font.line(40)} ${cs.font.lg} } }
    &.xs { ${({width}) => cs.w.get(width || 180)} .sm-body .sm-ul .sm-li { ${cs.font.line(28)} ${cs.font.sm} } }
    &.sm { ${({width}) => cs.w.get(width || 200)} .sm-body .sm-ul .sm-li { ${cs.font.line(34)} ${cs.font.md} } }
    &.lg { ${({width}) => cs.w.get(width || 260)} .sm-body .sm-ul .sm-li { ${cs.font.line(48)} ${cs.font.xl} } }
    &.xl { ${({width}) => cs.w.get(width || 380)} .sm-body .sm-ul .sm-li { ${cs.font.line(54)} ${cs.font.xxl} } }

    &.white { ${cs.bg.white} ${cs.font.dark} 
      .sm-ul .sm-li { &:hover, &.active { ${cs.bg.get(cs.color.semiblack)} ${cs.font.white} } }
    }
    &.sky { ${cs.bg.sky}  ${cs.font.dark} 
      .sm-ul .sm-li { &:hover, &.active { ${cs.bg.get(cs.color.primary)} ${cs.font.white} } }
    }
    &.primary { ${cs.bg.primary} ${cs.font.white} .svg-icon { ${cs.fill.white} } 
      .sm-ul .sm-li { &:hover, &.active { ${cs.bg.get(cs.color.primaryhover)} ${cs.font.white} } }
    }
    &.gray { ${cs.bg.lightgray} ${cs.font.dark} 
      .sm-body { ${cs.border.gray} }
    }
    &.dark { ${cs.bg.dark} ${cs.font.white} .svg-icon { ${cs.fill.white} } 
      .sm-ul .sm-li { &:hover, &.active { ${cs.bg.get(cs.color.darkhover)} ${cs.font.white} } }
    }
    &.black { ${cs.bg.black} ${cs.font.white} .svg-icon { ${cs.fill.white} } 
      .sm-ul .sm-li { &:hover, &.active { ${cs.bg.get(cs.color.blackhover)} ${cs.font.white} } }
    }

    @media screen and (max-width : 1280px) { }

    @media screen and (max-width : 1080px) { }

    @media screen and (max-width : 860px) { }
  }
}`;

class Sidemenu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { show: false, ok: 'OK', cancel: null, className: '', isok: false, list: null };
    this.interval = 0.2;
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const data = nextProps.sidemenu;
    this.setState({ ...this.state, ...data });
  }

  onClicked = (eid) => {
    this.setState({ show: false });
    const { onClicked } = this.props.sidemenu;
    onClicked && onClicked(eid === EID.OK ? true : false);
  }

  onClickMenu = (e) => {
    const url = e.currentTarget.getAttribute("url");
    window.location.href = url;

    // const path = window.location.pathname;
    // if (this.props.preview) {
    //   window.open(url);
    // } else {
    //   if (this.props.history.location.state) {
    //     this.props.history.push(url);
    //   } else {
    //     window.location.href = url;
    //   }
    // }
  }

  render() {
    const { state } = this;
    const { show, width = null, fade = '0.2s', theme = 'white', children = null, list = null, className } = state;
    // const { title, list, root } = props;
    const color = theme === 'dark' ? 'white' : 'dark';

    return (
      show &&
      <StyledObject className={cx("side-menu", show ? 'show' : 'hide', className, theme)} fade={fade} width={width}>
        <div className="sm-head">
          <Svg className="btn-cancel md" name={"cancel"} onClick={this.onClicked} eid={EID.CANCEL} color={color} />
        </div>
        <div className="sm-body scrollbar-4">
          {children && this.state.children}
          {/* {!children && <p className="no-child">The child component does not exist.</p>} */}
          {list && <ul className={"sm-ul"}>
            {list.map((item, index) => {
              const path = window.location.pathname;
              const active = path ? path.toLowerCase() === item.url.toLowerCase() : (index === 0);
              const {divider} = item;
              if(divider) {
                return <React.Fragment><div className={"sm-div"} /><li className={cx("sm-li", { active })} url={item.url} onClick={this.onClickMenu}>{item.name} </li></React.Fragment>
              } else {
                return <li className={cx("sm-li", { active })} url={item.url} onClick={this.onClickMenu}>{item.name} </li>
              }
            })}
            </ul>
          }
        </div>
      </StyledObject >
    )
  };
};

export default connect((state) => ({ sidemenu: state.sidemenu }), null)(Sidemenu);