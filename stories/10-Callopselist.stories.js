import React, { useState } from 'react';
import { optionsKnob as options, withKnobs, text, boolean, radios } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';
import cx from 'classnames/bind'
import { Linebox } from './00-Frame';
import { cs, Callopselist, Tablebox, Button } from '../src';

const StyledObject = styled.span`{
  &.t-main {
    .lb-box { ${cs.w.get(800)} ${cs.p.b30} }

    .lb-box .lb-li > * { ${cs.m.b10} }

    .t-child { ${cs.h.get(100)} & > p { ${cs.align.center} } }
  }
}`;

export default { title: 'object|Callopselist', component: Callopselist, decorators: [withKnobs] };

const samplecode = (value, classname = '') => `<Callopselist className={"${classname}"} ${value}><div className={"t-child"}><p>{"child component"}</p></div></Callopselist>`;

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

  const onSelect = (rowid, e) => {
    setResult(`onSelect(rowid = ${rowid}, e)`);
  }

  const onClickNew = (e) => {
    setResult(`onClickNew(e)`);
  }

  const onClickItem = (eid, rowid, e) => {
    setResult(`onClickItem(eid = ${eid}, rowid = ${rowid}, e)`);
  }

  const onClickPage = (page, e) => {
    setResult(`onClickPage(page = ${page}, e)`);
  }

  const onClickSearch = (value, key, e) => {
    setResult(`onClickSearch(value = ${value}, key = ${key}, e)`);
  }

  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"callopse"} className={"nomargin"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."} sample={samplecode("", "")} box={true}>
        <Callopselist className={cx(size, align, bg)} label={title} onClickSearch={onClickSearch}
          onSelect={onSelect} onClickNew={onClickNew} onClickItem={onClickItem} onClickPage={onClickPage} >
          <div className={"t-child"}><p>{"child component"}</p></div>
        </Callopselist>
      </Linebox>

      <Linebox title={"callopse"} className={"nomargin"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."} sample={samplecode("", "")} box={true}>
        <Tablebox className={cx(size, align, bg)} label={title} onClickSearch={onClickSearch}
          onSelect={onSelect} onClickNew={onClickNew} onClickItem={onClickItem} onClickPage={onClickPage} >
          <div className={"t-child"}><p>{"child component"}</p></div>
        </Tablebox>
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
        <Callopselist className={"xs"} label={"x small"} eid={"xs"} >
          <div className={"t-child"}><p>{"child component"}</p></div>
        </Callopselist>
      </Linebox>

      <Linebox title={"small"} className={"nomargin"} sample={samplecode('eid={"sm"}', "xs")}>
        <Callopselist className={"sm"} label={"small"} eid={"sm"} >
          <div className={"t-child"}><p>{"child component"}</p></div>
        </Callopselist>
      </Linebox>

      <Linebox title={"no size"} className={"nomargin"} sample={samplecode('eid={"lg"}', "xs")}>
        <Callopselist className={""} label={"no size"} eid={"none"} >
          <div className={"t-child"}><p>{"child component"}</p></div>
        </Callopselist>
      </Linebox>

      <Linebox title={"large"} className={"nomargin"} sample={samplecode('eid={"lg"}', "xs")}>
        <Callopselist className={"lg"} label={"large"} eid={"lg"} >
          <div className={"t-child"}><p>{"child component"}</p></div>
        </Callopselist>
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
        <Callopselist className={"trans"} label={"transparent"} active={active} eid={"trans"} ><div className={"t-child"}><p>{"child component"}</p></div></Callopselist>
        <Callopselist className={"white"} label={"white"} active={active} eid={"white"} ><div className={"t-child"}><p>{"child component"}</p></div></Callopselist>
        <Callopselist className={"sky"} label={"sky"} active={active} eid={"sky"} ><div className={"t-child"}><p>{"child component"}</p></div></Callopselist>
        <Callopselist className={"orange"} label={"orange"} active={active} eid={"orange"} ><div className={"t-child"}><p>{"child component"}</p></div></Callopselist>
        <Callopselist className={"green"} label={"green"} active={active} eid={"green"} ><div className={"t-child"}><p>{"child component"}</p></div></Callopselist>
        <Callopselist className={"red"} label={"red"} active={active} eid={"red"} ><div className={"t-child"}><p>{"child component"}</p></div></Callopselist>
        <Callopselist className={"primary"} label={"primary"} active={active} eid={"primary"} ><div className={"t-child"}><p>{"child component"}</p></div></Callopselist>
        <Callopselist className={"gray"} label={"gray"} active={active} eid={"gray"} ><div className={"t-child"}><p>{"child component"}</p></div></Callopselist>
        <Callopselist className={"dark"} label={"dark"} active={active} eid={"dark"} ><div className={"t-child"}><p>{"child component"}</p></div></Callopselist>
        <Callopselist className={"black"} label={"black"} active={active} eid={"black"} ><div className={"t-child"}><p>{"child component"}</p></div></Callopselist>
      </Linebox>
    </StyledObject>
  );
};

export const border = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"align"} className={"nomargin"} sample={samplecode('eid={"xs"}', "xs")} box={true}>
        <Callopselist className={""} label={'{radius: "5px", color: "blue"}'} eid={"radius"} border={{ radius: '5px', color: "blue" }} ><div className={"t-child"}><p>{"child component"}</p></div></Callopselist>
        <Callopselist className={""} label={'{radius: "10px", color: "red", width: "2px"}'} eid={"color"} border={{ radius: "10px", color: "red", width: "2px" }} ><div className={"t-child"}><p>{"child component"}</p></div></Callopselist>
        <Callopselist className={""} label={'{radius: "15px", color: "black", width: "3px"}'} eid={"width"} border={{ radius: "15px", color: "black", width: "3px" }} ><div className={"t-child"}><p>{"child component"}</p></div></Callopselist>
      </Linebox>
    </StyledObject>
  );
};

export const align = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"align"} className={"nomargin"} sample={samplecode('eid={"xs"}', "xs")} box={true}>
        <Callopselist className={"left"} label={"left"} eid={"left"} ><div className={"t-child"}><p>{"child component"}</p></div></Callopselist>
        <Callopselist className={"center"} label={"center"} eid={"center"} ><div className={"t-child"}><p>{"child component"}</p></div></Callopselist>
        <Callopselist className={"right"} label={"right"} eid={"right"} ><div className={"t-child"}><p>{"child component"}</p></div></Callopselist>
      </Linebox>
    </StyledObject>
  );
};