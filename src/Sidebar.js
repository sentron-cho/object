import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import cx from 'classnames/bind';
import axios from 'axios';
import { Svg, Loading, Util, cs } from './index';
import { EID, SCREEN, ST, CODE} from './Config';
import * as actions from './actor/Action';
import { ICON } from "./Icons";

const StyledObject = styled.div`{
  &.nav-side {
    .side-bar {
      position: fixed; min-height: 800px; height: calc(100vh - ${ props => props.top}); top: ${ props => props.top}; z-index: 101; 
      width: ${ props => props.width}; ${cs.font.left} ${cs.border.right} ${cs.bg.alphablack} 
      
      &.slidein { animation: slide-in linear 1 forwards ${ props => props.fade.time}s; };
      &.slideout { animation: slide-out linear 1 forwards ${ props => props.fade.time}s; };

      .home { position: relative; cursor: pointer; height: 100px; line-height: 100px; 
        ont-size: 24px; text-align: center; font-weight: 800; }

      .nav-frame { position: relative; width: 100%; height: calc(100% - 240px);
        .nav-li { width: 100%; height: 60px; display: inline-block; cursor: pointer;
          .nav-link { padding-left: 20px; width: 100%; height: 60px; display: inline-block;
            font-size: 20px; line-height: 60px; font-weight: 500; opacity: 0.8; }
          .nav-link:hover { background: #25507a90; transition: all 200ms ease-in; }
          .nav-link.active { background: #25507a; color:#fff; }
        }
      }

    }

    .top-bar { top: 0; left: 0; height: 60px; z-index: 99999; line-height: 60px;
      position: fixed; display: block; width: 100vw;
      ${cs.bg.lightblack} ${cs.border.bottom} border-color: ${cs.color.alphablack}; 

        .btn-menu { position: relative; z-index: 9999; top: 7px; left: 20px; float: none; display: inline-block; }
        .nav-title { font-size: 30px; height: 100%; opacity: 0.8; font-weight: 600; 
          padding-left 20px; letter-spacing: 5px; position: relative; vertical-align: middle;
        &:hover { cursor: pointer; }}
    }

    .nav-bg { background: rgba(0,0,0,0.3); width: 100vw; height: 100%; float: left; position: fixed; top: 0; z-index: 99;}

    .appinfo { line-height: 12px; color: #aaa; font-size: 10px; position: absolute; bottom: 5px; right: 5px; z-index: 9; }

    .hide { display: none; }

    @media screen and (max-width : 1280px) {
    }

    @media screen and (max-width : 1080px) {
    }

    @media screen and (max-width : 860px) {
      .top-bar { display: block; }
      .top-bar{
        .nav-title { position: absolute; width: 100%; text-align: center; }
        .btn-menu { margin-left: 10px;}
      }
    }

    @keyframes slide-in {
      from { opacity: 0.5; transform: translate3d(-300px, 0, 0); }
      to { opacity: 1; display: block; transform: translate3d(0px, 0, 0); } 
    }

    @keyframes slide-out {
      from { opacity: 1; transform: translate3d(0px, 0, 0); }
      to { opacity: 0.5; display: none; transform: translate3d(-300px, 0, 0); } 
    }
  }
}`;

class Sidebar extends React.PureComponent {

  constructor(props) {
    super(props);
    const { type } = Util.getScreenType();
    this.api = props.api || '';
    const menus = type !== SCREEN.ST.MOBILE ? EID.SHOW : EID.HIDE;
    this.state = { type: type, menus: menus, anim: '', alarms: null, appinfo: null, update: false, updatestate: 'update...' }
    this.interval = 0.2;

    this.doReload();
  }

  doReload = () => {
    this.api && actions.doSelect(this.api.ADMIN.WEBINFO, null).then(({ result }) => {
      this.setState({ appinfo: result });
    })

    this.api && actions.doSelect(this.api.ADMIN.ALARMS, null).then(({ result }) => {
      result && result.map(item => {
        if (item.level === "appup") {
          item.type = "system";
          item.img = item.tag === "nuriweb" ? ICON.Nuriweb : ICON.Nuriman;
          item.onClick = this.onClickAppUpdate;
        } else {
          item.onClick = this.onClickAlarm;
        }
        return null;
      })
      this.setState({ alarms: result });
    });
  }

  // 일반 알림을 클릭하면...
  onClickAlarm = (item) => {
    this.api && actions.doUpdate(this.api.ADMIN.ALARMS, { rowid: item.alarmid, ok: "Y" }, null).then(({ code }) => {
      this.props.openConfirm({
        title: item.title,  msg: item.text, type: 'info', cancel: false,
        onClicked: (isOk) => this.doReload()
      });
    });
  }

  // 앱의 업데이트 알림을 클릭하면 실행...
  onClickAppUpdate = (item) => { 
    // console.dir(item);
    const title = item.tag === "nuriweb" ? ST.APPUP.WEB : ST.APPUP.APP;
    this.props.openConfirm({
      title: title,  msg: `${title}${ST.APPUP.DESC}`, type: 'warn',
      onClicked: (isOk) => {
        if (isOk) {
          this.setState({ update: true });
          this.api && actions.doUpdate(this.api.ADMIN.APPUP, { 'type': item.tag, 'tag': item.vers }, null).then(({ code, result }) => {
            const cmdid = result;
            if (cmdid > 0) {
              this.runCheckState(cmdid);
            } else {
              console.error("cmd error");
              this.setState({ update: false });
            }
          });
        }
      },
    });
  }

  // 시스템 업데이트 상태를 주기적으로 체크하여 진행상태를 화면에 표시
  runCheckState = (cmdid) => {

    const relogin = () => {
      this.setState({ update: false });
      this.props.openConfirm({
        title: ST.APPUP.TITLE,  msg: ST.APPUP.LOGIN, type: 'info', cancel: false,
        onClicked: (isOk) => window.location.href = '/login'
      });
    }

    if (!this.api) return;
    
    this.timer = setInterval(() => {
      axios.get(this.api.ADMIN.APPUP_CHECK, { params: { cmdid: cmdid } }).then((res) => {
        const { data } = res;
        const { code, value } = data;
        const { state } = value;
        // console.log(res);
        if (code === CODE.SUCCESS && (!state || state === "success" || state === "fail")) {
          clearInterval(this.timer);
          this.timer = null;
          // this.setState({ update: false });
          relogin();
        } else {
          this.setState({ updatestate: state + "..." });
        }
      }).catch(error => {
        const { status } = error.response;
        if (status === 500) { // 연결 에러일 경우, 재실행된 상태이므로, 재로그인 유도
          relogin();
          // window.location.href = data.value ? data.value : "/";
        } else {
          console.log(error)
        }
      });
    }, 1000 * 3);
  }

  onClickMenu = () => {
    if (this.state.type === SCREEN.ST.MOBILE && this.state.menus === EID.SHOW) {
      this.hide();
    }
  }

  onClickLogout = (e) => {
    // window.location.href = "/logout";
    const to = e.currentTarget.getAttribute("to");
    actions.doSelect(to).then(({ result, config }) => {
      // console.dir("aaaaaaaaaa");
      // window.location.href = "/login";
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
    const { title, list, root, sidebarW = '235px', topbarH = '60px'} = props;
    const { menus, type, anim, alarms, appinfo, update, updatestate } = state;
    const fade = { time: this.interval };
    const show = menus === EID.SHOW ? '' : EID.HIDE;
    const istopbar = this.props.topbar === false ? EID.HIDE : '';
    const isbg = type === SCREEN.ST.MOBILE && show !== EID.HIDE ? '' : EID.HIDE;

    // 시스템이 업데이트 되었는지 체크하여 알림으로 표시하자...
    // let alarms = this.checkAppUpdate();

    return (
      <StyledObject className={cx("nav-side", istopbar)} fade={fade} width={sidebarW} top={topbarH}>
        <div className={cx("top-bar")}>
          <span className="nav-title logo-font" onClick={() => window.location.href = root}>{title}</span>
          <Svg className="btn-menu md" name={"menu"} onClick={this.onClicked} eid={EID.MENU} color={this.props.color} />
          {alarms && alarms.length > 0 && <Alarms list={alarms} />}
        </div>
        <div className={cx("side-bar", anim === '' ? show : anim)} onAnimationStart={this.onAnimStart} onAnimationEnd={this.onAnimEnd}>
          {appinfo && <div className={"appinfo"}><span>{`${appinfo.nuriweb.tag}`}</span><span>{`(${appinfo.nuriman.tag})`}</span></div>}
          {/* <div className="home" onClick={() => location.href = root}>{title}</div> */}
          <ul className={cx("nav-frame")} ref={ref => { this.menu = ref }}>
            {(list.map((item, index) => item.id !== 'logout' ?
              <li key={String(index)} onClick={this.onClickMenu} className="nav-li">
              <NavLink className="nav-link" activeClassName="active" id="nav-main" to={item.url}>{item.title}</NavLink>
              </li> :
              <li key={String(index)} onClick={this.onClickMenu} className="nav-li">
                <span className="nav-link" onClick={this.onClickLogout} to={item.url}>{item.title}</span>
                {/* <a className="nav-link" onClick={this.onClickLogout} to={item.url}>{item.title}</a> */}
              </li>
            ))}
          </ul>
        </div>
        <div className={cx("nav-bg", isbg)} onClick={this.onClicked}></div>

        {update && <SystemUpdate state={updatestate} />}
      </StyledObject >
    )
  };
};

export default Sidebar;




/**
 * 시스템/앱의 업데이트시 업데이트 진행 상태 표시를 위한 화면
 */
const StyledUpdate = styled.div`{
  &.sysup {
    width: 100vw; height: 100vh; background: #232323a1; position: fixed;
    z-index: 999991; top: 0; left: 0;

    .sysup-frame {
      position: absolute; text-align: center; left: 50%; top: calc(50%); transform: translate(-50%, -50%);

      .s-txt {
        font-size: 24px; text-align: center; line-height: 50px; left: 50%; white-space: pre-line; font-weight: 600;
      }

      .state { 
        color: #ffa41ad1; font-size: 20px; letter-spacing: 4px; background: #00000059;
        width: calc(100% - 100px); margin: 0 50px; border-radius: 100px; 
      }

      .loading-box { height: 100px; position: relative; }
    }
  }
}`;

const SystemUpdate = (props) => {
  return <StyledUpdate className={"sysup"}>
    <div className={"sysup-frame"}>
      <div className={'s-txt'}>{ST.APPUP.GUIDE}</div>
      <Loading className={'sysup-load'} />
      {/* <div className={'s-txt state'}>{"success"}</div> */}
      <div className={'s-txt state'}>{props.state}</div>
    </div>
  </StyledUpdate>
}



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
    // if (e.path) {
    //   const a = e.path.find(item => {
    //     const temp = item.className ? item.className.toString() : "";
    //     return temp.indexOf("arm-icon") >= 0 || temp.indexOf("arm-li") >= 0;
    //   });
    //   if (a) {
    //     return;
    //   }
    // }

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
    // item && delete item['onClick'];
    item.onClick && item.onClick(item);
    // console.dir(item);
  }

  render() {
    const { show } = this.state;
    const { list = []} = this.props;
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
      </ul> }
    </StyledAlarms>
  }
}
