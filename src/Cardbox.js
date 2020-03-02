import React from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import cs from './css-style';

// 카드박스 오브젝트
const StyledObject = styled.div`{
  &.card-box {
    cursor: ${(props) => props.cursor}; ${cs.over.hidden} ${cs.pos.relative} ${cs.font.left}
    ${cs.disp.inblock} ${cs.bg.trans} vertical-align: top;

    width: ${(props) => props.width};
    height: ${(props) => props.height};
    padding: ${(props) => props.margin};

    &.border { ${cs.box.line} }
    &.radius { ${cs.box.radius } }
    &.round { ${cs.box.round } }
    &.shodow { ${cs.border.shadow()} }
    
    &.dark { ${cs.bg.dark} ${cs.font.white} }
    &.black { ${cs.bg.black} ${cs.font.white} }
    &.gray { ${cs.bg.gray} }
    &.alphagray { ${cs.bg.alphagray} }

    &.center { ${cs.align.xcenter} }
    &.ycenter { ${cs.align.ycenter} }
    &.middle { ${cs.align.center} }

    &.w50 { ${cs.w.r50} }
    &.w33 { ${cs.w.r33} }
    &.w25 { ${cs.w.r25} }
    &.w20 { ${cs.w.r20} }
    &.w10 { ${cs.w.r10} }

    &.invisible {
      visibility: visible;
      div {visibility: hidden;}
    }

    &.anim { animation: ${({ anim }) => anim && anim.type ? anim.type : "fadein"} ${({ anim }) => anim && anim.time ? anim.time : "0.3s"}; }

    @media screen and (max-width : 1280px) {
    }

    @media screen and (max-width : 600px) {
      // width: 100%; padding: 5px;
    }
  }
}`;

export default class Cardbox extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { anim: props.anim };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.anim) {
      this.setState({ anim: nextProps.anim });
    }
  }

  onClicked = (e) => {
    if (this.props.onClick != null) {
      this.props.onClick(this.props.eid, e);
    }
  }

  onAnimEnd = (e) => {
    this.setState({ anim: '' });
  }

  render() {
    const { props, state } = this;
    const { anim } = state;
    const width = props.width != null ? props.width : "100%";
    const height = props.height != null ? props.height : "100%";
    const margin = props.margin != null ? props.margin : "20px";
    const cursor = props.onClick == null ? 'default' : "pointer";
    const style = { width, height, margin, cursor };

    return (
      <StyledObject className={cx('card-box', props.type, props.className, (anim && "anim"))}
        {...style} style={props.style} eid={props.eid} onClick={this.onClicked} anim={state.anim} onAnimationEnd={this.onAnimEnd}>
        {props.children}
      </StyledObject>
    )
  }
}