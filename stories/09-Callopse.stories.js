import React, { useState } from 'react';
import { optionsKnob as options, withKnobs, text, boolean, radios } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';
import cx from 'classnames/bind'
import { Linebox } from './00-Frame';
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
  // const classname = text('classname', null);
  const title = text('title', "callopse");
  const eid = text('eid', "12345");
  const size = options('size',
    { 'lg(large)': 'lg', 'sm(small)': 'sm', 'xs(xsmall)': 'xs' },
    '', { display: 'inline-radio' }, 'Other');
  const align = options('align', { 'left': 'left', 'center': 'center', 'right': 'right' },
    '', { display: 'inline-radio' }, 'Other');
  const bg = options('background',
    { trans: 'trans', white: 'white', sky: 'sky', orange: 'orange', green: 'green', red: 'red', primary: 'primary', gray: 'gray', dark: 'dark', black: 'black' },
    '', { display: 'inline-radio' }, 'Other');

  const [result, setResult] = useState(null);
  const [change, setChange] = useState(null);

  const onClick = (eid, title, active, e) => {
    setResult(`eid = ${eid}, title = ${title}, show = ${active}`);
  }

  // const onChange = (eid, e, list) => {
  //   setChange(`eid = ${eid}, ${JSON.stringify(list)}`);
  // }

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

      {/* <div className={"res-view"}>
        <p>onChange</p>
        <p>{change}</p>
      </div> */}
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
      <Linebox title={"x small"} className={"nomargin"} sample={samplecode('eid={"xs"}', "xs")}>
        <Callopsebox className={"xs"} label={"x small"} eid={"xs"} >
          <div className={"t-child"}><p>{"child component"}</p></div>
        </Callopsebox>
      </Linebox>

      <Linebox title={"small"} className={"nomargin"} sample={samplecode('eid={"sm"}', "xs")}>
        <Callopsebox className={"sm"} label={"small"} eid={"sm"} >
          <div className={"t-child"}><p>{"child component"}</p></div>
        </Callopsebox>
      </Linebox>

      <Linebox title={"no size"} className={"nomargin"} sample={samplecode('eid={"lg"}', "xs")}>
        <Callopsebox className={""} label={"no size"} eid={"none"} >
          <div className={"t-child"}><p>{"child component"}</p></div>
        </Callopsebox>
      </Linebox>

      <Linebox title={"large"} className={"nomargin"} sample={samplecode('eid={"lg"}', "xs")}>
        <Callopsebox className={"lg"} label={"large"} eid={"lg"} >
          <div className={"t-child"}><p>{"child component"}</p></div>
        </Callopsebox>
      </Linebox>
    </StyledObject>
  );
};

export const color = () => {
  const [active, setactive] = useState(null);
  const [time, settime] = useState(null);

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
      <Linebox title={"x small"} className={"nomargin"} sample={samplecode('eid={"xs"}', "xs")} >
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
      <Linebox title={"align"} className={"nomargin"} sample={samplecode('eid={"xs"}', "xs")}>
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
      <Linebox title={"align"} className={"nomargin"} sample={samplecode('eid={"xs"}', "xs")}>
        <Callopsebox className={"left"} label={"left"} eid={"left"} ><div className={"t-child"}><p>{"child component"}</p></div></Callopsebox>
        <Callopsebox className={"center"} label={"center"} eid={"center"} ><div className={"t-child"}><p>{"child component"}</p></div></Callopsebox>
        <Callopsebox className={"right"} label={"right"} eid={"right"} ><div className={"t-child"}><p>{"child component"}</p></div></Callopsebox>
      </Linebox>
    </StyledObject>
  );
};