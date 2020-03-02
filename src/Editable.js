import React from 'react';
import cx from 'classnames/bind';
import styled from 'styled-components';
import { Svg, cs } from './index';

const StyledObject = styled.div`{
  &.editable.ed-able { position: relative; min-height: 40px; border: 1px dashed rgba(250,250,250,0.2); box-sizing: border-box;
    cursor: pointer; 
    .ed-able-btn { position: absolute; opacity: 0.3; z-index: 99;
      &.center { ${cs.align.center} }
      &.right { ${cs.align.rbottom} }
      &.left { ${cs.align.lbottom} }
    }

    &:hover {
      .ed-able-btn { .svg-path { fill: #1eff20; } opacity: 0.9; ${cs.anim.show}}
      background: ${(props) => props && props.bg ? props.bg : '#000000B2'}; 
      opacity: ${(props) => props && props.opac ? props.opac : 0.8};
      border: 1px dashed rgba(250,250,250,0.8); box-sizing: border-box;
    } 
    &.nodata { border: 1px dashed rgba(255, 255, 255, 0.4); min-height: 40px !important; }
  }
}`;

export default class Editable extends React.PureComponent {
  // constructor(props) {
  //   super(props);
  // }

  onClick = (e) => {
    const { props } = this;
    props.onClick && props.onClick(e, props.eid);
  }

  render() {
    const { props } = this;
    const { editable, button = "cneter", icon = "editable", icolor = "white" } = props;

    return <StyledObject ref={ref => { this.box = ref }} className={cx("ed-able", props.className, {editable})} onClick={this.onClick} eid={props.eid}>
      {props.children}
      {editable && <Svg className={cx("ed-able-btn md", button)} name={icon} color={icolor} />}
    </StyledObject>
  }
}


const StyledFrame = styled.div`{
  &.ed-btn-grp { position: absolute; z-index: 99; top: 20px; left: 20px; padding: 10px; 
    ${cs.opac.hide} ${cs.bg.alphablack} ${cs.box.radius}
    .svg-icon { margin: 0 10px; display: inline-block; float: none; } 
    .bar { 
      width: 1px; height: 40px; background: #aaa; display: inline-block;
      position: absolute; top: 50%; transform: translateY(-50%); 
    }

    &.active { ${cs.opac.show} } ${cs.anim.show} }
  }
}`;

export const EditableButtons = (props) => {
  const { editable, url = true, bg = true } = props;
  
  const onClick = (eid, e) => {
    props.onClick && props.onClick(e, eid);
  }

  if (editable) {
    return (
      <StyledFrame className="ed-btn-grp">
        {bg && <Svg className="btn-bg xl box" onClick={onClick} eid={"bg"} icon={'bgimage'} />}
        {url && bg && <span className={"bar"} />}
        {url && <Svg className="btn-fg xl box" onClick={onClick} eid={"url"} icon={'media'} />}
      </StyledFrame>
    )
  } else {
    return null;
  }
}