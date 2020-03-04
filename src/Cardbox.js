import React from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import cs from './css-style';

// 카드박스 오브젝트
const StyledObject = styled.div`{
  &.card-box {
    cursor: ${(props) => props.cursor}; ${cs.over.hidden} ${cs.pos.relative} ${cs.font.left}
    ${cs.disp.inblock} ${cs.bg.trans} ${cs.align.vertical("top")} ${cs.box.sizing("border-box")}

    width: ${(props) => props.width};
    height: ${(props) => props.height};
    padding: ${(props) => props.margin};

    &.border { ${cs.box.line} }
    &.radius { ${cs.box.radius} }
    &.round { ${cs.box.round} }
    &.shodow { ${cs.border.shadow()} }
    
    &.sky { ${cs.bg.sky} }
    &.yellow { ${cs.bg.yellow} }
    &.green { ${cs.bg.green} }
    &.orange { ${cs.bg.orange} }
    &.red { ${cs.bg.red} }
    &.primary { ${cs.bg.primary} }
    &.blue { ${cs.bg.blue} }
    &.alphagray { ${cs.bg.alphagray} }
    &.gray { ${cs.bg.gray} }
    &.alphablack { ${cs.bg.alphablack} }
    &.dark { ${cs.bg.dark} ${cs.font.white} }
    &.black { ${cs.bg.black} ${cs.font.white} }
    
    &.center { ${cs.align.xcenter} }
    &.ycenter { ${cs.align.ycenter} }
    &.middle { ${cs.align.center} }

    &.w50 { ${cs.w.r50} }
    &.w33 { ${cs.w.r33} }
    &.w25 { ${cs.w.r25} }
    &.w20 { ${cs.w.r20} }
    &.w10 { ${cs.w.r10} }
    &.full { ${cs.w.full} }
    &.half { ${cs.w.r50} }

    &.invisible {
      ${cs.disp.visible}
      div { ${cs.disp.hidden} }
    }

    &.anim { 
      ${(props) => (props.anim && props.anim.type) && cs.anim[props.anim.type](props.anim.time || "0.2s")}
    }

    @media screen and (max-width : 1280px) { }

    @media screen and (max-width : 600px) { }
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
    const { width = "100%", height = "100%", margin = "20px", mouse = "default" } = props;
    const cursor = props.onClick ? "pointer" : mouse;
    const params = { width, height, margin, cursor };

    return (
      <StyledObject className={cx('card-box', props.type, props.className, (anim && "anim"))}
        {...params} style={props.style} eid={props.eid} onClick={this.onClicked} anim={state.anim}
        onAnimationEnd={this.onAnimEnd}>
        {props.children}
      </StyledObject>
    )
  }
}