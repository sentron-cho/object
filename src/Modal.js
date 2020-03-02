import React from 'react';
import cx from 'classnames/bind';
import cs from './css-style';
import styled from 'styled-components';
import { EID, ST } from './Config';
import { connect } from 'react-redux';
import { Button, Svg } from './index';

export const StyledObject = styled.div`
&.modal {
  display: block; padding-right: 0; z-index: 999999 !important; height: 100%; ${cs.font.black} 
  position: fixed; width: 100%; top: 0; left: 0;

  .bg { height: 100%; position: absolute; width: 100%; background: #00000055; }

  .md-desc { margin: 15px; padding-left: 5px; }

  .btn-cancel { float: right; }

  .md-frame { z-index: 99; width: 540px; min-height: fit-content;
    ${cs.bg.white} ${cs.box.radius} ${cs.align.center} ${cs.box.shadow}

      .md-head { clear: both; overflow: hidden; border-radius: 5px 5px 0 0; padding: 10px 10px;
        border-bottom: solid 1px #aaa; ${cs.border.lightgray}
        .close{ margin-top: 2px; margin-right: 0; padding: 0 10px;}
        .md-title { font-weight:400; margin-left: 5px; font-size: 18px;}
      }

      .md-body { padding: 10px 25px; max-height: 400px; overflow: auto; height: fit-content; }

      .md-foot { padding: 10px; overflow: hidden; ${cs.font.right}
        border-top: solid 1px #aaa; ${cs.border.lightgray}
        .button { margin-left: 20px; }
      }

    .no-child { color: red; font-size: 18px; line-height: 80px; text-align: center; font-weight: 500; }

    &.xl { width: 1200px; }
    &.lg { width: 900px;}
    &.lm { width: 640px;}
    &.sm { width: 420px;}
  }

  @media screen and (max-width : 767px) {
    .bg { display: none; }
    .md-frame {
      width: 100%; margin: 0; height: 100%; min-width: 400px;

      .md-head { border-radius: 0; border: none; height: 60px; padding-top: 20px; background: #13203a; color: #fff; };
      .md-body { height: calc(100% - 140px)};
      .md-foot { border-radius: 0; border: none; height: 80px; }
    }
  }
}`;

class Modal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      key: "", isok: false, show: props.show ? props.show : false,
      children: props.children ? props.children : '',
      title: props.title ? props.title : '',
      cancel: props.cancel ? props.cancel : 'CANCEL',
      data: props.data ? props.data : {},
      ok: props.ok ? props.ok : 'OK',
      className: props.className ? props.className : ''
    };
    this.act = { getData: null };
  }

  // props가 업데이트 되면 동작 여기서 state상태를 바꿔준다.
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState(nextProps.modal);
    this.act.getData = null;  //초기화
    this.showBodyScroll(!nextProps.modal.show);
  }

  ///*
  showBodyScroll(isShow) {
    let object = document.getElementById("body-frame");
    object.style.overflow = isShow ? "auto" : "hidden";
  }
  //*/
  
  getValueWithValidateCheck = (refs) => {
    if (!refs) return null;

    // 수정사항이 발생될 경우에만 저장 기능 동작을 위해
    const modified = Object.keys(refs).filter((key) => refs[key].isModified()).length;
    if (modified <= 0) return 'modified';
    const isvalidate = Object.keys(refs).every((key) => refs[key].isValidate());
    if (!isvalidate) return 'notvalid';

    let datas = {};
    Object.keys(refs).map(key => datas[key] = refs[key].getValue());
    return datas;
  }

  getData = () => {
    let data = null;
    if (this.act.getData != null) {
      const temp = this.act.getData(this.getValueWithValidateCheck);
      // validation 통과 안됨
      if (temp != null && temp === false) return temp;
      data = temp;
    }

    return data;
  }

  onOk = () => {
    return this.getData();
  }

  onCancel = () => {
    return null;
  }

  onClicked = (eid, e, data) => {

    let value = data;
    const { onOk, onCancel, onClick } = this.props.modal;

    if (eid === EID.OK) {
      value = this.getData();
      if (value == null) onCancel && onCancel(value)
      else if (value === false) return; // validate 통과 못함
      else onOk && onOk(value);
    } else if (eid === EID.CANCEL) {
      onCancel && onCancel(null);
    } else {
      onClick && onClick(eid, data);
    }

    this.setState({ show: false });
    this.showBodyScroll(true);
  }

  onKeyPressed = (e) => {
    const { modal } = this.props;
    const onenter = (modal && modal.onenter != null) ? modal.onenter : true;
    return (onenter && e.key === 'Enter') && this.onClicked(EID.OK);
  }

  render() {
    const { state } = this;
    const styled = { top: state.top }
    const Component = this.state.children;

    return (
      state.show &&
      <StyledObject className={cx("modal", state.className)} history={this.props.history} onKeyPress={this.onKeyPressed}>
        <div className="bg" eid={EID.CANCEL}></div>
        <div className={cx("md-frame", (state.size))} style={styled}>
          <div className="md-head">
            <span className="md-title">{state.title}<span>{state.key}</span></span>
            <Svg className="btn-cancel sm" name={"cancel"} onClick={this.onClicked} eid={EID.CANCEL} color={"black"} />
          </div>

          {state.desc && <div className="md-desc">{state.desc}</div>}

          <div className="md-body scrollbar-4">
            {Component && <Component data={state.data} state={state.state} onClick={this.onClicked} act={this.act} />}
            {!Component && <p className="no-child">The child component does not exist.</p>}
          </div>

          <div className="md-foot">
            {state.ok && <Button className={cx("primary")} onClick={this.onClicked} title={state.ok ? state.ok : ST.OK} eid={EID.OK} />}
            {state.cancel && <Button className={cx("primary")} onClick={this.onClicked} title={state.cancel} eid={EID.CANCEL} />}
          </div>
        </div>
      </StyledObject>
    )
  };

}

export default connect((state) => ({ modal: state.modal }), null)(Modal);