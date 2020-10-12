import React from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import { connect } from 'react-redux';
import { EID, KEY, ST } from './Config';
import { Button, Svg, cs } from './index';

const StyledObject = styled.div`
&.confirm {
  ${cs.pos.fixed} ${cs.p.right(0)} ${cs.z.confirm} ${cs.disp.black} ${cs.pos.ltop} ${cs.size.full} ${cs.noselect}

  .bg { ${cs.size.full} ${cs.bg.back} ${cs.pos.ltop} }
  .cf-close { ${cs.float.right} }

  .cf-frame { ${cs.font.black} ${cs.bg.white} ${cs.box.radius} ${cs.align.center} ${cs.border.shadow()} 
    ${cs.anim.show} ${cs.w.get(400)} ${cs.align.center} ${cs.bg.white} ${cs.box.radius}

    .cf-head { 
      ${cs.over.hidden} ${cs.border.radius("5px 5px 0 0")} ${cs.p.a10} ${cs.border.bottom}
      .cf-title { ${cs.font.bold} ${cs.font.lg} ${cs.m.l5} }
    }

    .cf-body { ${cs.p.a20} ${cs.min.height(100)} ${cs.font.preline} ${cs.font.line(24)} ${cs.font.md} }

    .cf-foot { 
      ${cs.border.radius("0 0 5px 5px")} ${cs.p.a10} ${cs.over.hidden} ${cs.font.right} 
      .button { 
        ${cs.pos.relative} 
        &.cf-cancel { ${cs.m.l10} }
      }
    }
  }

  &.warn { .cf-frame .cf-head { ${cs.bg.orange} ${cs.font.white} } }
  &.err { .cf-frame .cf-head { ${cs.bg.red} ${cs.font.white} } }
  &.info { .cf-frame .cf-head { ${cs.bg.trans} ${cs.font.dark} } }

  &.left { .cf-frame .cf-body .msg { ${cs.font.left} } }
  &.right { .cf-frame .cf-body .msg { ${cs.font.right} } }
  &.center { .cf-frame .cf-body .msg { ${cs.font.center} } }

  &.lg { .cf-frame { ${cs.w.get(600)} ${cs.font.md} .cf-body { ${cs.p.a20} ${cs.min.height(140)} ${cs.font.md} } } }
  &.sm { .cf-frame { ${cs.w.get(300)} ${cs.font.sm} .cf-body { ${cs.p.v10} ${cs.min.height(80)} ${cs.font.md} } } }
  &.xs { .cf-frame { ${cs.w.get(200)} ${cs.font.sm} .cf-body { ${cs.p.v5} ${cs.min.height(40)} ${cs.font.sm} } } }

  &.sky { .cf-head, .cf-frame { ${cs.bg.sky} ${cs.font.dark} 
    .cf-head { ${cs.border.sky} }
    .cf-foot .button { ${cs.bg.sky} ${cs.box.line} ${cs.border.gray} ${cs.font.dark} } } 
    .svg-path { ${cs.fill.dark} }
  }
  &.primary { .cf-head, .cf-frame { ${cs.bg.primary} ${cs.font.white} 
    .cf-head { ${cs.border.gray} }
    .cf-foot .button { ${cs.bg.primary} ${cs.box.line} ${cs.border.lightgray} } } 
    .svg-path { ${cs.fill.white} }
  }
  &.gray { .cf-head, .cf-frame { ${cs.bg.gray} ${cs.font.white} 
    .cf-head { ${cs.border.lightgray} }
    .cf-foot .button { ${cs.bg.gray} ${cs.box.line} ${cs.border.lightwhite} } } 
    .svg-path { ${cs.fill.white} }
  } 
  &.dark { .cf-head, .cf-frame { ${cs.bg.dark} ${cs.font.white} 
    .cf-head { ${cs.border.darkgray} }
    .cf-foot .button { ${cs.bg.dark} ${cs.box.line} ${cs.border.semiblack} } } 
    .svg-path { ${cs.fill.white} }
  }
  &.black { .cf-head, .cf-frame { ${cs.bg.black} ${cs.font.white} 
    .cf-head { ${cs.border.dark} }
    .cf-foot .button { ${cs.bg.black} ${cs.box.line} ${cs.border.dark} } } 
    .svg-path { ${cs.fill.white} }
  } 
  &.white { .cf-head, .cf-frame { ${cs.bg.white} ${cs.font.dark} } 
    .cf-foot .button { ${cs.bg.lightwhite} ${cs.font.dark} ${cs.box.line} ${cs.border.darkwhite} } } 
  }
}`;

class Confirm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { show: false, title: ST.ALARM, msg: ST.IS_DELETE, type: '', ok: 'OK', size: '', cancel: null, className: '', isok: false };
  }

  // props가 업데이트 되면 동작 여기서 state상태를 바꿔준다.
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState(nextProps.confirm);
  }

  showBodyScroll = (isShow) => {
    let object = document.getElementById("body-frame");
    isShow ? object.style.overflow = "auto" : object.style.overflow = "hidden";
  }

  onClicked = (eid) => {
    this.setState({ show: false });
    const { onClicked } = this.props.confirm;
    onClicked && onClicked(eid === EID.OK ? true : false);
  }

  onKeyPressed = (e) => (e.key === KEY.ENTER) && this.onClicked(EID.OK);
  
  render() {
    const { state } = this;
    const btnsize = state.size === 'sm' ? 'md' : state.size === 'xs' ? 'sm' : 'lg'
    return (
      this.state.show &&
      <StyledObject className={cx("confirm", state.className, state.type, state.size, state.theme)}>
        <div className="bg" onKeyPress={this.onKeyPressed} />
        <div className={cx("cf-frame")}>
          <div className="cf-head">
            <span className="cf-title">{state.title}</span>
            <Svg className="cf-close sm" name={"cancel"} onClick={this.onClicked} eid={EID.CANCEL} color={"black"} />
          </div>

          <div className="cf-body">
            <p className="msg">{state.msg}</p>
          </div>

          <div className="cf-foot">
            <Button className={cx("primary right", btnsize)} onClick={this.onClicked} title={state.ok ? state.ok : ST.OK} eid={EID.OK} />
            {state.cancel && <Button className={cx("primary right cf-cancel", btnsize)} onClick={this.onClicked} title={state.cancel ? state.cancel : EID.CANCEL} eid={EID.CANCEL} />}
          </div>
        </div>
      </StyledObject>
    )
  };
}

export default connect((state) => ({ confirm: state.confirm }), null)(Confirm);