/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { optionsKnob as options, withKnobs, text } from '@storybook/addon-knobs';
import styled from 'styled-components';
import cx from 'classnames/bind'
import { Linebox, op } from './00-Frame';
import { cs, Callopsebox, Button } from '../src';

const StyledObject = styled.span`{
  &.t-main {
    .lb-box { ${cs.w.get(800)} ${cs.p.b30} }

    .lb-box .lb-li > * { ${cs.m.b10} }

    .t-child { ${cs.h.get(100)} & > p { ${cs.align.center} } }
  }
}`;

export default { title: 'object|Callopse', component: Callopsebox, decorators: [withKnobs] };

const samplecode = (value, classname = '') => `<Callopsebox className={"${classname}"} ${value}><div className={"t-child"}><p>{"child component"}</p></div></Callopsebox>`;

export const object = () => {
  const title = text('title', "callopse");
  const eid = text('eid', "12345");
  const bg = options('background', op.color('f'), '', op.radio(), 'Other');
  const size = options('size', op.size('s'), '', op.radio(), 'Other');
  const align = options('align', op.halign(), '', op.radio(), 'Other');

  const [result, setResult] = useState(null);

  const onClick = (eid, title, active, e) => {
    setResult(`eid = ${eid}, title = ${title}, show = ${active}`);
  }

  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"callopse"} className={"nomargin"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."} sample={samplecode("", "")}>
        <Callopsebox className={cx(size, align, bg)} label={title} onClick={onClick} eid={eid} >
          <div className={"t-child"}><p>{"child component"}</p></div>
        </Callopsebox>
      </Linebox>

      <div className={"res-view"}>
        <p>onClick</p>
        <p>{result}</p>
      </div>
    </StyledObject>
  );
};

object.story = {
  name: 'Base'
};

const option = {
  top: "20px",
}

export const size = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"no size"} className={"nomargin"} sample={samplecode('', "")}>
        <Callopsebox className={""} label={"no size"} eid={"none"} >
          <div className={"t-child"}><p>{"child component"}</p></div>
        </Callopsebox>
      </Linebox>

      <Linebox title={"small"} className={"nomargin"} sample={samplecode('', "sm")}>
        <Callopsebox className={"sm"} label={"small"} eid={"sm"} >
          <div className={"t-child"}><p>{"child component"}</p></div>
        </Callopsebox>
      </Linebox>

      <Linebox title={"middle"} className={"nomargin"} sample={samplecode('', "md")}>
        <Callopsebox className={"md"} label={"middle"} eid={"md"} >
          <div className={"t-child"}><p>{"child component"}</p></div>
        </Callopsebox>
      </Linebox>

      <Linebox title={"large"} className={"nomargin"} sample={samplecode('', "lg")}>
        <Callopsebox className={"lg"} label={"large"} eid={"lg"} >
          <div className={"t-child"}><p>{"child component"}</p></div>
        </Callopsebox>
      </Linebox>
    </StyledObject>
  );
};

export const color = () => {
  const [active, setactive] = useState(null);
  const [, settime] = useState(null);

  const onClickClose = (eid, e) => {
    setactive(false);
    settime(new Date().getTime());
  }

  const onClickOpen = (eid, e) => {
    setactive(true);
    settime(new Date().getTime());
  }

  return (
    <StyledObject className={"t-main"} >
      <Button className={"primary"} title={"close all"} onClick={onClickClose} eid={"info"}/>
      <Button className={"primary"} title={"open all"} onClick={onClickOpen} eid={"info"}/>
      <Linebox title={"color"} className={"nomargin"} sample={samplecode('eid={"xs"}', "xs")} >
        <Callopsebox className={"trans"} label={"transparent"} active={active} eid={"trans"} ><div className={"t-child"}><p>{"child component"}</p></div></Callopsebox>
        <Callopsebox className={"white"} label={"white"} active={active} eid={"white"} ><div className={"t-child"}><p>{"child component"}</p></div></Callopsebox>
        <Callopsebox className={"sky"} label={"sky"} active={active} eid={"sky"} ><div className={"t-child"}><p>{"child component"}</p></div></Callopsebox>
        <Callopsebox className={"orange"} label={"orange"} active={active} eid={"orange"} ><div className={"t-child"}><p>{"child component"}</p></div></Callopsebox>
        <Callopsebox className={"green"} label={"green"} active={active} eid={"green"} ><div className={"t-child"}><p>{"child component"}</p></div></Callopsebox>
        <Callopsebox className={"red"} label={"red"} active={active} eid={"red"} ><div className={"t-child"}><p>{"child component"}</p></div></Callopsebox>
        <Callopsebox className={"primary"} label={"primary"} active={active} eid={"primary"} ><div className={"t-child"}><p>{"child component"}</p></div></Callopsebox>
        <Callopsebox className={"gray"} label={"gray"} active={active} eid={"gray"} ><div className={"t-child"}><p>{"child component"}</p></div></Callopsebox>
        <Callopsebox className={"dark"} label={"dark"} active={active} eid={"dark"} ><div className={"t-child"}><p>{"child component"}</p></div></Callopsebox>
        <Callopsebox className={"black"} label={"black"} active={active} eid={"black"} ><div className={"t-child"}><p>{"child component"}</p></div></Callopsebox>
      </Linebox>
    </StyledObject>
  );
};

export const border = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"align"} className={"nomargin"} sample={samplecode('label={"{radius: "5px", color: "blue"}"} eid={"radius"}', "")}>
        <Callopsebox className={""} label={'{radius: "5px", color: "blue"}'} eid={"radius"} border={{ radius: '5px', color: "blue" }} ><div className={"t-child"}><p>{"child component"}</p></div></Callopsebox>
        <Callopsebox className={""} label={'{radius: "10px", color: "red", width: "2px"}'} eid={"color"} border={{ radius: "10px", color: "red", width: "2px" }} ><div className={"t-child"}><p>{"child component"}</p></div></Callopsebox>
        <Callopsebox className={""} label={'{radius: "15px", color: "black", width: "3px"}'} eid={"width"} border={{ radius: "15px", color: "black", width: "3px" }} ><div className={"t-child"}><p>{"child component"}</p></div></Callopsebox>
      </Linebox>
    </StyledObject>
  );
};

export const align = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"align"} className={"nomargin"} sample={samplecode('', "left")}>
        <Callopsebox className={"left"} label={"left"} eid={"left"} ><div className={"t-child"}><p>{"child component"}</p></div></Callopsebox>
        <Callopsebox className={"center"} label={"center"} eid={"center"} ><div className={"t-child"}><p>{"child component"}</p></div></Callopsebox>
        <Callopsebox className={"right"} label={"right"} eid={"right"} ><div className={"t-child"}><p>{"child component"}</p></div></Callopsebox>
      </Linebox>
    </StyledObject>
  );
};

export const theme = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"theme"} top={option.top} sample={samplecode("theme={'sky'}", "sky")}>
        <Callopsebox theme={'sky'}><div className={"primary t-child"}><p>{"child component"}</p></div></Callopsebox>
        <Callopsebox theme={'primary'}><div className={"primary t-child"}><p>{"child component"}</p></div></Callopsebox>
        <Callopsebox theme={'gray'}><div className={"primary t-child"}><p>{"child component"}</p></div></Callopsebox>
        <Callopsebox theme={'dark'}><div className={"primary t-child"}><p>{"child component"}</p></div></Callopsebox>
        <Callopsebox theme={'black'}><div className={"primary t-child"}><p>{"child component"}</p></div></Callopsebox>
      </Linebox>
    </StyledObject>
  );
};