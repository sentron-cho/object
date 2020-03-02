import React from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import { connect } from 'react-redux';
import cs from './css-style';
import Svg from './Svg';

// Alert Object
const StyledObject = styled.div`{
  &.alert-box { 
    ${cs.disp.block} ${cs.h.fit} ${cs.z.get(199999)} ${cs.p.a0} ${cs.pos.fixed}

    .alb-list { ${cs.opac.alpha}
      &:hover { ${cs.opac.show} };

      .alb-box {
        ${cs.w.get(300)} ${cs.bg.primary} ${cs.font.white} ${cs.box.radius} ${cs.m.a2}
        animation: show-right linear 1 forwards ${(props) => props.time}s; 

        .alb-cancel { ${cs.m.a5} ${cs.float.right} }

        .alb-body { 
          ${cs.p.get("10px 20px")} ${cs.min.height(40)} ${cs.font.preline} ${cs.font.line(25)} ${cs.font.lg}
        }

        .alb-bar { 
          ${cs.pos.absolute} ${cs.bottom(0)} ${cs.left(0)} ${cs.w.full} ${cs.h.get(5)} ${cs.z.get(399999)}
          ${cs.bg.white} ${cs.border.radius(0)} transform-origin: left;
          
          &.prog-bar-anim {
            animation: progress linear 1 forwards ${(props) => props.time}s;
          }
        }

        &.hide { ${cs.disp.none} }
        
        &.warn { ${cs.bg.orange} }
        &.err { ${cs.bg.red} }
        &.info { ${cs.bg.primary} }
        &.dark { ${cs.bg.dark} }
        &.orange { ${cs.bg.orange} }
        &.green { ${cs.bg.green} }
        &.alpha { ${cs.bg.alphablack} }
        &.gray { ${cs.bg.gray} }
      }
    }
    
    &.center { ${cs.bottom(20)} ${cs.align.xcenter} ${cs.pos.fixed} .alb-box { animation-name: show-center; } }
    &.left { ${cs.bottom(20)} ${cs.left(20)} .alb-box { animation-name: show-left; } }
    &.right { ${cs.bottom(20)}  ${cs.right(20)} .alb-box { animation-name: show-right; } }
    
    @keyframes progress {
      from { transform: scaleX(1) };
      to   { transform: scaleX(0) };
    }

    @keyframes show-right {
      from, 10%, 15%, 20% { animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 0.5); }
      from { opacity: 0; transform: translate3d(3000px, 0, 0); }
      10% { opacity: 1; transform: translate3d(-25px, 0, 0); }
      15% { opacity: 1; transform: translate3d(10px, 0, 0); }
      20% { opacity: 1; transform: translate3d(-5px, 0, 0); }
      90% { opacity: 1; transform: translate3d(-5px, 0, 0); }
      to { opacity: 0; transform: translate3d(3000px, 0, 0); } 
    }

    @keyframes show-center {
      from, 10%, 15%, 20% { animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 0.5); }
      from { opacity: 0; transform: translate3d(0, 100px, 0); }
      10% { opacity: 1; transform: translate3d(0, -25px, 0); }
      15% { opacity: 1; transform: translate3d(0, 10px, 0); }
      20% { opacity: 1; transform: translate3d(0, -5px, 0); }
      90% { opacity: 1; transform: translate3d(0, -5px, 0); }
      to { opacity: 0; transform: translate3d(0, 100px, 0); } 
    }

    @keyframes show-left {
      from, 10%, 15%, 20% { animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 0.5); }
      from { opacity: 0; transform: translate3d(-3000px, 0, 0); }
      10% { opacity: 1; transform: translate3d(25px, 0, 0); }
      15% { opacity: 1; transform: translate3d(-10px, 0, 0); }
      20% { opacity: 1; transform: translate3d(5px, 0, 0); }
      90% { opacity: 1; transform: translate3d(5px, 0, 0); }
      to { opacity: 0; transform: translate3d(-3000px, 0, 0); } 
    }
  }
}`;

class Alert extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { list: [], interval: 3.0 };

  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { title = '', msg = 'alert message!', type = 'info', align = 'right' } = nextProps.alert;

    const key = new Date().getTime();
    const list = [...this.state.list, { key: `no-${key}`, value: msg, type, title, hide : false }];
    
    // this.setState({ list, align });
    if (align !== this.state.align) {
      this.setState({ list: [], align });
      setTimeout(() => {
        this.setState({ list: list, align });
      }, 200);
    } else {
      this.setState({ list, align });
    }
  }

  removeAlert = (eid, e) => {
    let { list } = this.state;
    if (list.length <= 0) {
      return;
    }

    // 연속으로 여러개의 alert가 표시될 경우 순차적으로 숨겨지는 기능이
    // 정상적으로 동작하지 않는 문제가 있다. 그래서 아래의 로직으로 일단 변경

    // 해당 아이템을 찾아서 화면에서 일단 숨기자.
    const item = list.find(item => item.key === eid);
    if (item) item.hide = true;
    
    // show인 아이템이 하나도 없으면 리스트 항목 모두 삭제
    const isitem = list.find(item => item.hide === false);
    this.setState({ list: !isitem ? [] : [...list] });

    const { onClose } = this.props.alert;
    onClose && onClose(eid);
  }

  onAnimEnd = (e) => {
    if (e.animationName.indexOf('show-') === 0) {
      const eid = e.currentTarget.getAttribute('eid');
      this.removeAlert(eid, e);
    }
  }

  render() {
    const { state } = this;
    const { list, align, interval } = state;

    return (<StyledObject className={cx("alert-box", align)} time={interval} >
      <ul className="alb-list">
        {list.map((item, index) => {
          const hide = item.hide;
          return <li key={`no-${index}`} className={cx("alb-box", item.type, `no-${index}`, {hide})} eid={item.key} onAnimationEnd={this.onAnimEnd}>
            <Svg className="alb-cancel sm" name={"cancel"} onClick={this.removeAlert} eid={item.key} color={"black"} />
            <div className="alb-body">
              <div className="alb-msg">{item.value}</div>
            </div>
            <div className="alb-bar prog-bar-anim" eid={item.key} ></div>
          </li>
        })}
      </ul>
    </StyledObject>)
  };
}

export default connect(
  function mapStateToProps(state) {
    return {
      alert: state.alert
    };
  },
  function mapDispatchToProps(dispatch) {
    return {
      dispatch
    }
  }
)(Alert);  