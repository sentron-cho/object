import React from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import { connect } from 'react-redux';
import { EID, KEY, ST } from './Config';
import { Button, Svg, cs } from './index';

const StyledObject = styled.div`{
  &.side-menu {
    ${cs.h.full} ${cs.pos.fixed} ${cs.disp.block} ${cs.top(0)} ${cs.z.top} 
    ${props => cs.w.get(props.width)} ${cs.anim.show} ${cs.bg.white} ${cs.font.dark}
    ${cs.border.right} ${cs.border.lightwhite}

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

    .sm-foot { 

    }

    &.show { animation: slide-in linear 1 forwards ${ props => props.fade}s; };
    &.hide { animation: slide-out linear 1 forwards ${ props => props.fade}s; };

    &.white { ${cs.bg.white} ${cs.font.dark} }
    &.dark { ${cs.bg.dark}  ${cs.font.white} }
    &.gray { ${cs.bg.lightgray} ${cs.font.dark} .sm-body { ${cs.border.gray} } }

    @media screen and (max-width : 1280px) {
    }

    @media screen and (max-width : 1080px) {
    }

    @media screen and (max-width : 860px) {
    }

    @keyframes slide-in {
      from { opacity: 0.5; transform: translate3d(-${props => props.width}, 0, 0); }
      to { opacity: 1; display: block; transform: translate3d(0px, 0, 0); } 
    }

    @keyframes slide-out {
      from { opacity: 1; transform: translate3d(0px, 0, 0); }
      to { opacity: 0.5; display: none; transform: translate3d(-${props => props.width}, 0, 0); } 
    }
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
    const { show, width = '240px', fade = 0.2, theme = 'white', children = null, list = null } = state;
    // const { title, list, root } = props;
    const color = theme === 'dark' ? 'white' : 'dark';

    return (
      show &&
      <StyledObject className={cx("side-menu", show ? 'show' : 'hide', theme)} fade={fade} width={width}>
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