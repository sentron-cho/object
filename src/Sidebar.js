import React from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import { Svg, Util, cs } from './index';
import { EID, SCREEN } from './Config';
import * as actions from './actor/Action';

const StyledObject = styled.div`{
  &.nav-side {
    .side-bar {
      ${cs.pos.fixed} ${cs.min.height('100vh')} ${cs.h.full} ${cs.z.sidebar} ${props => cs.top(props.top)} 
      ${props => cs.w.get(props.width)} ${cs.font.left} ${cs.border.right} ${cs.bg.lightblack} ${cs.noselect}
      
      &.slidein { ${props => cs.anim.slidein(`${props.fade.time}s`, '-120%', '0', 'side-bar-in')} };
      &.slideout { ${props => cs.anim.slideout(`${props.fade.time}s`, '0', '-120%', 'side-bar-out')} };

      .nav-frame { ${cs.pos.relative} ${cs.w.full} ${props => cs.h.get(props.height || 'calc(100% - 60px)')} ${cs.over.hidden} ${cs.over.yauto}
        .nav-li { ${cs.w.full} ${cs.h.fit} ${cs.disp.inblock} ${cs.mouse.pointer}
          &.nav-link {
            ${cs.p.l20} ${cs.w.full} ${cs.font.line(50)} ${cs.disp.inblock} ${cs.font.xl} ${cs.opac.show} ${cs.font.white}
          }
          &.nav-link:hover { ${cs.bg.alphablack} }
          &.nav-link.active { ${cs.bg.primary} ${cs.font.white} }
        }
      }

    }

    .top-bar { ${cs.align.top} ${cs.left(0)} ${props => `${cs.h.get(props.top)} ${cs.font.line(props.top)}`} 
      ${cs.z.header} ${cs.pos.fixed} ${cs.disp.block} ${cs.w.get('100%')} ${cs.min.w('100vw')}
      ${cs.bg.lightblack} ${cs.border.bottom} ${cs.border.alphablack}

        .btn-menu { 
          ${cs.pos.relative} ${cs.z.menu} ${cs.top(7)} ${cs.left(20)} ${cs.disp.inblock}
        }
        .nav-title { 
          ${cs.font.t1} ${cs.h.full} ${cs.opac.show} ${cs.p.l20} ${cs.font.spacing(3)} ${cs.pos.relative} ${cs.mouse.pointer}
          ${cs.font.white} ${cs.font.payton} 
        }
    }

    .nav-bg { ${cs.bg.alphablack} ${cs.w.get('100vw')} ${cs.h.full} ${cs.pos.fixed} ${cs.top(0)} ${cs.z.over} }

    .hide { ${cs.disp.none} }

    @media screen and (max-width : 1280px) {
    }

    @media screen and (max-width : 1080px) {
    }

    @media screen and (max-width : 860px) {
      .top-bar { ${cs.disp.block} }
      .top-bar{
        .nav-title { ${cs.pos.absolute} ${cs.w.full} ${cs.font.center} }
        .btn-menu { ${cs.m.l10} }
      }
    }
}`;

class Sidebar extends React.PureComponent {

  constructor(props) {
    super(props);
    const { type } = Util.getScreenType();
    this.api = props.api || '';
    const menus = type !== SCREEN.ST.MOBILE ? EID.SHOW : EID.HIDE;
    this.state = { type: type, menus: menus, anim: '' }
    this.interval = 0.2;
  }


  onClickMenu = (e, item) => {
    if (this.state.type === SCREEN.ST.MOBILE && this.state.menus === EID.SHOW) {
      this.hide();
    }

    const { url, param = {} } = item;
    if (url && url.indexOf("http") === 0) {
      window.open(url);
    } else {
      actions.go(url, param)
    }
  }

  onClickLogout = (e) => {
    const to = e.currentTarget.getAttribute("to");
    actions.doSelect(to).then(({ result, config }) => {
    });
  }

  onResize = () => {
    const { type } = Util.getScreenType();
    const menus = type !== SCREEN.ST.MOBILE ? EID.SHOW : EID.HIDE;
    this.setState({ 'type': type, 'menus': menus, anim: '' });
    this.onLayoutEvent(0, false);
  }

  onLayoutEvent = (time, anim) => {
    this.props.eventLayout && this.props.eventLayout({ 'name': 'sidebar', 'act': this.state.menus, 'time': time, 'anim': anim });
  }

  componentDidMount() {
    document.getElementById('body').addEventListener('mouseup', this.onClickBg);
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    document.getElementById('body').removeEventListener('mouseup', this.onClickBg);
    window.removeEventListener('resize', this.onResize);
  }

  hide = () => {
    this.setState({ menus: EID.HIDE });
  }

  onClicked = (eid, e) => {
    const { menus } = this.state;
    const sw = menus === EID.HIDE ? EID.SHOW : EID.HIDE;
    this.setState({ menus: sw, anim: menus === EID.SHOW ? "slideout" : 'slidein' });
  }

  onAnimStart = (e) => {
    this.onLayoutEvent(this.interval, true);
  }

  onAnimEnd = (e) => {
    if (e.animationName === 'slide-out') {
      this.setState({ menus: EID.HIDE });
      e.currentTarget.classList.add('hide');
    }
  }

  render() {
    const { props, state } = this;
    const { title, list, root, sidebarW = '235px', topbarH = '60px', children } = props;
    const { menus, type, anim, alarms } = state;
    const fade = { time: this.interval };
    const show = menus === EID.SHOW ? '' : EID.HIDE;
    const istopbar = this.props.topbar === false ? EID.HIDE : '';
    const isbg = type === SCREEN.ST.MOBILE && show !== EID.HIDE ? '' : EID.HIDE;

    const location = window.location.pathname;

    return (
      <StyledObject className={cx("nav-side", istopbar)} fade={fade} width={sidebarW} top={topbarH}>
        <div className={cx("top-bar")}>
          <span className="nav-title" onClick={() => window.location.href = root}>{title}</span>
          {title && <Svg className="btn-menu md" name={"menu"} onClick={this.onClicked} eid={EID.MENU} color={this.props.color} />}
          {alarms && alarms.length > 0 && <Alarms list={alarms} />}
        </div>
        <div className={cx("side-bar", anim === '' ? show : anim)} onAnimationStart={this.onAnimStart} onAnimationEnd={this.onAnimEnd}>
          {children && <children />}
          <ul className={cx("nav-frame")} ref={ref => { this.menu = ref }}>
            {(list.map((item, index) => {
              if (item.hide) return null;
              const active = location ? location.toLowerCase() === item.url.toLowerCase() : (index === 0);
              return <li key={String(index)} className={cx("nav-li nav-link", { active })} onClick={(e) => this.onClickMenu(e, item)}>
                {item.name && item.name.toUpperCase()}
              </li>
            }
            ))}
          </ul>
        </div>
        <div className={cx("nav-bg", isbg)} onClick={this.onClicked}></div>
      </StyledObject >
    )
  };
};

export default Sidebar;




/**
 * 시스템/앱의 업데이트시 업데이트 진행 상태 표시를 위한 화면
 */
// const StyledUpdate = styled.div`{
//   &.sysup {
//     width: 100vw; height: 100vh; background: #232323a1; position: fixed;
//     z-index: 999991; top: 0; left: 0;

//     .sysup-frame {
//       position: absolute; text-align: center; left: 50%; top: calc(50%); transform: translate(-50%, -50%);

//       .s-txt {
//         font-size: 24px; text-align: center; line-height: 50px; left: 50%; white-space: pre-line; font-weight: 600;
//       }

//       .state { 
//         color: #ffa41ad1; font-size: 20px; letter-spacing: 4px; background: #00000059;
//         width: calc(100% - 100px); margin: 0 50px; border-radius: 100px; 
//       }

//       .loading-box { height: 100px; position: relative; }
//     }
//   }
// }`;

// const SystemUpdate = (props) => {
//   return <StyledUpdate className={"sysup"}>
//     <div className={"sysup-frame"}>
//       <div className={'s-txt'}>{ST.APPUP.GUIDE}</div>
//       <Loading className={'sysup-load'} />
//       {/* <div className={'s-txt state'}>{"success"}</div> */}
//       <div className={'s-txt state'}>{props.state}</div>
//     </div>
//   </StyledUpdate>
// }



/**
 * 알림 아이콘 및 알림 리스트 화면
 */
const StyledAlarms = styled.div`{
  &.arm-grp {
    position: absolute; right: 40px; top: 50%; transform: translateY(-50%); border: 1px solid #202020; border-radius: 5px;
    width: 30px; height: 30px

    .svg-icon { opacity: 0.7; top: 5px; left: 5px; float: left; }

    .arm-cnt {
      position: absolute; top: -3px; left: -6px; height: 12px; line-height: 12px; font-size: 10px;
      width: 16px; background: #ff8e02; border-radius: 12px; text-align: center; z-index: 9;
    }

    .arm-ul { min-width: 200px; min-height: 40px; max-width: 300px; max-height: 400px; background: #34343b;
      position: absolute; top: 20px; right: 10px; z-index: 99; border: 1px #212121 solid; border-radius: 3px;
      .arm-li { position: relative;
        height: 40px; line-height: 28px; cursor: pointer; padding: 5px 10px;

        &:hover { background: #202020; }
        .arm-cont { 
          .icon { float: left; left: 20px; top: 50%; transform: translateY(-50%); position: absolute; 
            &.img { width: 16px; }
          }
          .txt { position: absolute; left: 40px; }
        }

        &.system { background: #05053e; }
        // &.button { cursor }
      }
    }
  }
}`;

class Alarms extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  onClickedAlarm = (eid, e) => {
    this.setState({ show: !this.state.show });
  }

  onShow = (show = false) => {
    this.setState({ show: show });
  }

  onClickBg = (e) => {

    const a = Util.isSelfClick(e, (item) => {
      return item.indexOf("arm-icon") >= 0 || item.indexOf("arm-li") >= 0;
    });
    if (a) return;

    this.setState({ show: false });
  }

  componentDidMount() {
    document.getElementById('body').addEventListener('click', this.onClickBg);
    window.addEventListener('resize', () => this.onShow(false));
  }

  componentWillUnmount() {
    document.getElementById('body').removeEventListener('click', this.onClickBg);
    window.removeEventListener('resize', this.onShow);
  }

  onClickItem = (e) => {
    const index = e.currentTarget.getAttribute("eid");
    const item = this.props.list[Number(index)];
    this.setState({ show: false });
    item.onClick && item.onClick(item);
  }

  render() {
    const { show } = this.state;
    const { list = [] } = this.props;
    const count = list.length;

    return <StyledAlarms className={"arm-grp"}>
      <Svg className="arm-icon sm" name={"alarm"} onClick={this.onClickedAlarm} color={this.props.color} />
      <span className="arm-cnt">{count}</span>
      {show && <ul className={"arm-ul"}>
        {list.map((item, index) => {
          return <li className={cx("arm-li", item.type)} key={index} onClick={this.onClickItem} eid={index}>
            <div className={"arm-cont"}>
              {item.img && <img className={'img icon'} alt={"thumb"} src={item.img}></img>}
              {!item.img && <Svg className={'xs icon'} name={item.icon ? item.icon : 'alarm'} />}
              <span className={"txt"}>{item.title}</span></div>
          </li>
        })}
      </ul>}
    </StyledAlarms>
  }
}
