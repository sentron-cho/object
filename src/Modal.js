import React from 'react';
import cx from 'classnames/bind';
import cs from './css-style';
import styled from 'styled-components';
import { EID, ST } from './Config';
import { connect } from 'react-redux';
import { Button, Svg } from './index';

export const StyledObject = styled.div`{ 
  &.modal {
    ${cs.disp.block} ${cs.p.a0} ${cs.z.modal} ${cs.font.black} 
    ${cs.pos.fixed} ${cs.size.full} ${cs.pos.ltop}

    .bg { ${cs.size.full} ${cs.pos.absolute} ${cs.bg.alphablack} }
    .md-desc { ${cs.m.t15} ${cs.p.l5} }
    .md-cancel { ${cs.m.r10} }

    .md-frame { ${cs.z.get(99)} ${cs.w.get(560)} ${cs.min.height("fit-content")}
      ${cs.bg.white} ${cs.box.radius} ${cs.align.center} ${cs.box.shadow} ${cs.over.hidden}

        .md-head { 
          ${cs.over.hidden} ${cs.border.radius("5px 5px 0 0")} ${cs.p.a10} 
          ${cs.border.bottom} ${cs.border.lightgray}

          .md-close { ${cs.float.right} ${cs.m.t2} ${cs.m.r0} ${cs.p.h10} }
          .md-title { ${cs.font.bold} ${cs.font.lg} ${cs.m.l5} }
        }

        .md-body { ${cs.p.a20} ${cs.min.height(100)} ${cs.max.height(400)} ${cs.over.auto} ${cs.h.fit} ${cs.scrollbar.t3} }

        .md-foot { ${cs.p.a10} ${cs.over.hidden} ${cs.font.right}
          ${cs.border.top} ${cs.border.lightgray}
          .button { 
            ${cs.pos.relative} 
            &.md-cancel { ${cs.m.l10} }
          }
        }

      .no-child { ${cs.color.red} ${cs.opac.get(0.7)} ${cs.font.xl} ${cs.font.line(80)} ${cs.font.center} }
    }
    
    &.small { .md-frame .md-body { ${cs.max.height(320)} } }
    &.big { .md-frame .md-body { ${cs.max.height(520)} } }

    &.xl { .md-frame { ${cs.w.dsxl} } }
    &.lg { .md-frame { ${cs.w.dslg} } }
    &.md { .md-frame { ${cs.w.dsmd} } }
    &.sm { .md-frame { ${cs.w.dssm} } }
    &.xs { .md-frame { ${cs.w.dsxs} } }
    
    &.sky { .md-head, .md-frame { ${cs.bg.sky} ${cs.font.dark} } 
      .md-head { ${cs.border.sky} }
      .md-foot .button { ${cs.bg.sky} ${cs.box.line} ${cs.border.gray} ${cs.font.dark} }
      .svg-path { ${cs.fill.dark} }
    }
    &.primary { .md-head, .md-frame { ${cs.bg.primary} ${cs.font.white} } 
      .md-head { ${cs.border.gray} }
      .md-foot .button { ${cs.bg.primary} ${cs.box.line} ${cs.border.lightgray} }
      .svg-path { ${cs.fill.white} }
    }
    &.gray { .md-head, .md-frame { ${cs.bg.gray} ${cs.font.white} } 
      .md-head { ${cs.border.lightgray} }
      .md-foot .button { ${cs.bg.gray} ${cs.box.line} ${cs.border.lightwhite} }
      .svg-path { ${cs.fill.white} }
    } 
    &.dark { .md-head, .md-frame { ${cs.bg.dark} ${cs.font.white} } 
      .md-head { ${cs.border.darkgray} }
      .md-foot .button { ${cs.bg.dark} ${cs.box.line} ${cs.border.semiblack} }
      .svg-path { ${cs.fill.white} }
    }
    &.black { .md-head, .md-frame { ${cs.bg.black} ${cs.font.white} } 
      .md-head { ${cs.border.dark} }
      .md-foot .button { ${cs.bg.black} ${cs.box.line} ${cs.border.dark} }
      .svg-path { ${cs.fill.white} }
    } 
    &.white { .md-head, .md-frame { ${cs.bg.white} ${cs.font.dark} } 
      .md-foot .button { ${cs.bg.lightwhite} ${cs.font.dark} ${cs.box.line} ${cs.border.darkwhite} }
    }


    @media screen and (max-width : 800px) {
      .bg { ${cs.disp.none} }
      &.xl, &.lg, &.md, &.sm, & {
        .md-frame {
          ${cs.size.full} ${cs.m.a0} ${cs.min.width(240)} 
    
          .md-head { 
            ${cs.border.radius(0)} ${cs.border.bottom} ${cs.h.get(60)} 
            ${cs.p.t20} ${cs.font.white}
          };
          .md-body { ${cs.h.calc("100% - 140px")} ${cs.max.h('calc(100% - 100px) !important')} };
          .md-foot { ${cs.border.radius(0)} ${cs.border.none} ${cs.h.get(80)} }
        }
      }
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
    if (object && object.style) {
      object.style.overflow = isShow ? "auto" : "hidden";
    }
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
      const ret = onClick && onClick(eid, data);
      this.setState({ show: !ret });
      ret && this.showBodyScroll(true);
      return;
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
      <StyledObject className={cx("modal", state.className, state.size, state.theme)} history={this.props.history} onKeyPress={this.onKeyPressed}>
        <div className="bg" eid={EID.CANCEL}></div>
        <div className={cx("md-frame")} style={styled}>
          <div className="md-head">
            <span className="md-title">{state.title}<span>{state.key}</span></span>
            <Svg className="md-close sm" name={"cancel"} onClick={this.onClicked} eid={EID.CANCEL} color={"black"} />
          </div>

          {state.desc && <div className="md-desc">{state.desc}</div>}

          <div className="md-body">
            {Component && <Component data={state.data} state={state.state} onClick={this.onClicked} act={this.act} />}
            {!Component && <p className="no-child">The child component does not exist.</p>}
          </div>

          <div className="md-foot">
            {state.ok && <Button className={cx("primary right")} onClick={this.onClicked} title={state.ok ? state.ok : ST.OK} eid={EID.OK} />}
            {state.cancel && <Button className={cx("primary right md-cancel")} onClick={this.onClicked} title={state.cancel} eid={EID.CANCEL} />}
          </div>
        </div>
      </StyledObject>
    )
  };

}

export default connect((state) => ({ modal: state.modal }), null)(Modal);