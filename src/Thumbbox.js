import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import { cs } from './index';

const StyledObject = styled.div`{
  &.thumb-box { 
    ${cs.pos.relative} ${cs.noselect} ${cs.box.inner} ${cs.over.hidden}
    ${cs.disp.inblock}
    // ${cs.opac.invisible} 
    
    .tmb-img { 
      ${cs.pos.relative} ${cs.size.full} ${cs.object.fill}
    }

    .tmb-odr { 
      ${cs.pos.absolute} ${cs.pos.rtop} ${cs.opac.get(0.8)} ${cs.font.xs} 
      ${cs.box.border} ${cs.size.get(16)} ${cs.font.center} 
      ${cs.bg.alphablack} ${cs.font.lightgray} ${cs.border.radius("0 5px 0 10px")}
    }

    .tmb-noimg { ${cs.align.center} ${cs.opac.alpha} ${cs.font.darkgray} ${cs.font.sm} }

    &.md { ${cs.h.get(100)} ${cs.w.get(80)} }
    &.sm { ${cs.h.get(64)} ${cs.w.get(52)} }
    &.lg { ${cs.h.get(140)} ${cs.w.get(110)} }

    &.full { ${cs.size.full} .tmb-img { ${cs.object.contain} } }
    &.border { ${cs.box.line} }
    &.radius { ${cs.box.radius} }

    &.primary { ${cs.box.line} ${cs.box.radius} ${cs.border.primary} }
    &.gray { ${cs.box.line} ${cs.box.radius} ${cs.border.gray} }
    &.dark { ${cs.box.line} ${cs.box.radius} ${cs.border.dark} }

    ${({ border }) => border && `${cs.box.line}`}
    ${({ border }) => border && border.color && `${cs.border.color(border.color)}`}
    ${({ border }) => border && border.radius && `${cs.border.radius(border.radius + "!important")}`}
    ${({ border }) => border && border.width && `${cs.border.width(border.width)}`}
    ${({ border }) => border && border.padding && `${cs.p.get(border.padding)}`}

    ${({ bgcolor }) => bgcolor && `${cs.p.a10} ${cs.w.calc("100% - 20px")} ${cs.bg.color(bgcolor)}`}    

    &.show { ${cs.anim.show} }
    
    &.anim { 
      ${(props) => (props.anim && props.anim.type) && cs.anim[props.anim.type](props.anim.time || "0.2s")}
    }
  }
}`;

const Thumbbox = (props) => {
  const [anim, setAnim] = useState(props.anim);

  const { thumb, odr, src, border } = props;
  const image = props.thumb || props.src;

  useEffect(() => {
    setAnim(props.anim);
  }, [props.anim])

  const onClicked = (e) => {
    props.onClick && props.onClick(eid, e);
  }

  const onAnimStart = (e) => {
    props.onAnimation && props.onAnimation('start', e);
  }

  const onAnimEnd = (e) => {
    props.onAnimation && props.onAnimation('end', e);
    setAnim({ anim: '' });
  }

  return (
    <StyledObject className={cx("thumb-box md", props.className, (anim && "anim"))} border={border}
      onClick={onClicked} anim={anim} onAnimationEnd={onAnimEnd} onAnimationStart={onAnimStart} >
      {image && <img className={"tmb-img"} src={image} alt="thumb" />}
      {!image && <span className={"tmb-noimg"} >{"Noimage"}</span>}
      {odr && <span className="tmb-odr">{odr}</span>}
    </StyledObject>
  )
};

export default Thumbbox;