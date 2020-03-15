import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import cs from './css-style';

// 카드박스 오브젝트
const StyledObject = styled.div`{
  &.card-box {
    cursor: ${(props) => props.cursor}; ${cs.over.hidden} ${cs.pos.relative} ${cs.font.left}
    ${cs.disp.inblock} ${cs.bg.trans} ${cs.align.vertical("top")} ${cs.box.inner}

    width: ${(props) => props.width};
    height: ${(props) => props.height};
    padding: ${(props) => props.margin};

    &.radius { ${cs.box.radius} }
    &.round { ${cs.box.round} }
    &.shadow { ${cs.border.shadow()} }
    
    &.border {
      ${cs.box.line}

      &.yellow { ${cs.border.yellow} }
      &.sky { ${cs.border.sky} }
      &.red { ${cs.border.red} }
      &.primary { ${cs.border.primary} }
      &.gray { ${cs.border.gray} }
      &.alphablack { ${cs.border.alphablack} }
      &.dark { ${cs.border.dark} }
      &.black { ${cs.border.black} }

      ${props => props.border.color && cs.border.color(props.border.color)}
      ${props => props.border.radius && cs.border.radius(props.border.radius)}
      ${props => props.border.width && cs.border.width(props.border.width)}
    }

    &:not(.border) {
      &.sky { ${cs.bg.sky} }
      &.yellow { ${cs.bg.yellow} }
      &.green { ${cs.bg.green} }
      &.orange { ${cs.bg.orange} }
      &.red { ${cs.bg.red} ${cs.font.white} }
      &.primary { ${cs.bg.primary} }
      &.blue { ${cs.bg.blue} ${cs.font.white} }
      &.alphagray { ${cs.bg.alphagray} }
      &.gray { ${cs.bg.gray} }
      &.alphablack { ${cs.bg.alphablack} ${cs.font.white} }
      &.dark { ${cs.bg.dark} ${cs.font.white} }
      &.black { ${cs.bg.black} ${cs.font.white} }
    }
    
    
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

    ${props => props.bgcolor && cs.bg.get(props.bgcolor)}

    @media screen and (max-width : 1280px) { }

    @media screen and (max-width : 600px) { }
  }
}`;

const Cardbox = (props) => {
  const [anim, setAnim] = useState(props.anim);

  const { eid, width = "100%", height = "100%", margin = "20px", mouse = "default", bgcolor = null } = props;
  const { border = { color: null, width: null, radius: null } } = props;
  const cursor = props.onClick ? "pointer" : mouse;
  const params = { width, height, margin, cursor };

  useEffect(() => {
    setAnim(props.anim);
  }, [props.anim])

  const onClicked = (e) => {
    props.onClick && props.onClick(eid, e);
  }

  const onKeyPress = (e) => {
    props.onKeyPress && props.onKeyPress(e.key, e);
  }

  const onAnimStart = (e) => {
    props.onAnimation && props.onAnimation('start', e);
  }

  const onAnimEnd = (e) => {
    props.onAnimation && props.onAnimation('end', e);
    setAnim({ anim: '' });
  }


  return (
    <StyledObject className={cx('card-box', props.type, props.className, (anim && "anim"), props.theme)}
      {...params} style={props.style} eid={props.eid} onClick={onClicked} anim={anim} bgcolor={bgcolor} border={border}
      onAnimationEnd={onAnimEnd} onAnimationStart={onAnimStart} onKeyPress={onKeyPress}>
      {props.children}
    </StyledObject>
  )
}

export default Cardbox;