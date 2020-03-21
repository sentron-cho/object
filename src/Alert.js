import React from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import { connect } from 'react-redux';
import cs from './css-style';
import Svg from './Svg';

// Alert Object
const StyledObject = styled.div`{
  &.alert-box { 
    ${cs.disp.block} ${cs.h.fit} ${cs.z.get(199999)} ${cs.p.a0} ${cs.pos.fixed} ${cs.font.lg}
    ul, li { list-style: none; ${cs.m.a0} ${cs.p.a0} }

    .alb-list { ${cs.opac.alpha}
      &:hover { ${cs.opac.show} };

      .alb-box {
        ${cs.w.get(300)} ${cs.bg.primary} ${cs.font.white} ${cs.box.radius} ${cs.m.a2}
        animation: show-right linear 1 forwards ${(props) => props.time}s; 

        .alb-cancel { ${cs.m.a5} ${cs.float.right} ${cs.opac.show} }

        .alb-body { 
          ${cs.p.get("10px 20px")} ${cs.min.height(40)} ${cs.font.preline} ${cs.font.line(25)} 
        }

        .alb-bar { 
          ${cs.pos.absolute} ${cs.bottom(0)} ${cs.left(0)} ${cs.w.full} ${cs.h.get(5)} ${cs.z.get(399999)}
          ${cs.bg.darkwhite} ${cs.border.radius(0)} transform-origin: left;
          
          &.prog-bar-anim {
            animation: progress linear 1 forwards ${(props) => props.time}s;
          }
        }

        &.hide { ${cs.disp.none} }
        
        &.info { ${cs.bg.primary} .alb-cancel .svg-path { ${cs.fill.white} } }
        &.warn { ${cs.bg.orange} .alb-cancel .svg-path { ${cs.fill.white} } }
        &.err { ${cs.bg.red} .alb-cancel .svg-path { ${cs.fill.white} } }

        &.white { 
          ${cs.bg.white} ${cs.font.darkgray} ${cs.box.line} ${cs.border.lightgray} 
          .alb-bar { ${cs.bg.gray} }
        }
        &.yellow { ${cs.bg.yellow} ${cs.font.dark} .alb-bar { ${cs.bg.gray} } }
        &.green { ${cs.bg.green} ${cs.font.dark} }
        &.orange { ${cs.bg.orange} }
        &.gray { ${cs.bg.gray} }
        &.alpha { ${cs.bg.alphablack} .alb-cancel .svg-path { ${cs.fill.white} } }
        &.dark { ${cs.bg.dark} .alb-cancel .svg-path { ${cs.fill.white} } }

        &.lg { ${cs.font.lg} .alb-body { ${cs.min.height(40)} ${cs.p.get("10px 20px")} ${cs.font.line(20)} } }
        &.sm { ${cs.font.sm} .alb-body { ${cs.min.height(30)} ${cs.p.get("5px 10px")} ${cs.font.line(14)} } }
        &.xs { ${cs.font.xs} .alb-body { ${cs.min.height(24)} ${cs.p.get("2px 5px")} ${cs.font.line(12)} ${cs.p.b10} } }
      }
    }
    
    &.left { ${cs.bottom(20)} ${cs.left(20)} .alb-box { animation-name: show-left; } }
    &.center { ${cs.bottom(20)} ${cs.align.xcenter} ${cs.pos.fixed} .alb-box { animation-name: show-center; } }
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
    this.state = { list: [], interval: 3.0, className: '', size: '' };

  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { title = '', msg = 'alert message!', type = 'info', align = 'right', className = '', size = '' } = nextProps.alert;

    const key = new Date().getTime();
    const list = [...this.state.list, { key: `no-${key}`, value: msg, type, title, hide : false, size }];
    
    // this.setState({ list, align });
    if (align !== this.state.align) {
      this.setState({ list: [], align, className, type});
      setTimeout(() => {
        this.setState({ list: list, align, className, type});
      }, 200);
    } else {
      this.setState({ list, align, className, type});
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
    const { list, align, interval, className } = state;

    return (<StyledObject className={cx("alert-box", align, className)} time={interval} >
      <ul className="alb-list">
        {list.map((item, index) => {
          const {size, hide} = item;
          console.log(size);
          return <li key={`no-${index}`} className={cx("alb-box", item.type, `no-${index}`, {hide}, size)} eid={item.key} onAnimationEnd={this.onAnimEnd}>
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

export default connect((state) => ({ alert: state.alert }), null)(Alert);