import React, { useState } from 'react';
import { optionsKnob as options, withKnobs, text, boolean, radios } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';
import cx from 'classnames/bind'
import { Linebox } from './00-Frame';
import { cs, Callopselist, Tablebox, Button, Util } from '../src';

const StyledObject = styled.span`{
  &.t-main {
    .lb-box { ${cs.w.get(800)} ${cs.p.b30} }

    // .lb-box .lb-li > * { ${cs.m.b10} }

    .t-child { ${cs.h.get(100)} & > p { ${cs.align.center} } }
  }
}`;

export default { title: 'object|Callopselist', component: Callopselist, decorators: [withKnobs] };

const samplecode = (value, classname = '') => `<Callopselist className={"${classname}"} ${value}><div className={"t-child"}><p>{"child component"}</p></div></Callopselist>`;

const tags = [
  { key: 'no', title: 'number', flex: '1 1 40px', align: 'left' },
  { key: 'name', title: 'name', flex: '10 1 100px', mobile: 'hide', align: 'center' },
  // { key: 'text', title: 'text', flex: '20 1 200px', tablet: 'hide', align: 'left' },
  { key: 'utime', title: 'uptime', flex: '3 1 120px', type: 'date', tablet: 'hide', align: 'right' }
];

const jsonlist = (count = 5, lines = 10) => {
  let texts = "collpse list contents - 1";
  for (let i = 0; i < lines - 1; i++) {
    texts += "\ncollpse list contents - " + (i + 2);
  }

  let data = [];
  for (let i = 0; i < count; i++) {
    data.push({ no: i + 1, rowid: i, name: `title-${i}`, cont: `${texts}`, utime: Util.getCurrentDate() });
    // data.push({no: i+1, rowid: i, name: `data-${i}`, text: `${texts}-${i}`, utime: Util.getCurrentDate()});
  }

  return data;
};

export const object = () => {
  // const classname = text('classname', null);
  const multi = boolean('multi', false);
  const size = options('size',
    { 'lg(large)': 'lg', 'sm(small)': 'sm', 'xs(xsmall)': 'xs' },
    '', { display: 'inline-radio' }, 'Other');
  const align = options('align', { 'left': 'left', 'center': 'center', 'right': 'right' },
    '', { display: 'inline-radio' }, 'Other');
  const bg = options('background',
    { trans: 'trans', white: 'white', sky: 'sky', orange: 'orange', green: 'green', red: 'red', primary: 'primary', gray: 'gray', dark: 'dark', black: 'black' },
    '', { display: 'inline-radio' }, 'Other');
   
  const perpage = 10; // 페이지당 표시 개수
  const alldata = jsonlist(50);
  const [result, setResult] = useState(null);
  const [pos, setPos] = useState(1);
  const [list, setList] = useState([...alldata.slice(0, perpage)]);

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
    const array = [...alldata.slice((page-1) * perpage, page * perpage)]
    setList(array);
    setPos(page);
    setResult(`onClickPage(page = ${page}, e)`);
  }

  const onClickSearch = (value, key, e) => {
    setResult(`onClickSearch(value = ${value}, key = ${key}, e)`);
  }

  const max = Math.floor(alldata.length / perpage);
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"callopse"} className={"nomargin"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."} sample={samplecode("", "")} box={false}>
        <Callopselist className={cx(size, align, bg)} pos={pos} max={max} multi={multi}
          tags={tags} list={list} datakey={"cont"} options={{ inner: { height: 160 } }}
          onClickSearch={onClickSearch} onSelect={onSelect} onClickNew={onClickNew}
          onClickItem={onClickItem} onClickPage={onClickPage} />
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
        <Linebox title={"small"} className={"nomargin"} sample={samplecode("", "")} box={false}>
          <Callopselist className={cx("sm")} pos={1} max={10} tags={tags} list={jsonlist(5)} datakey={"cont"} />
        </Linebox>

        <Linebox title={"none size"} className={"nomargin"} sample={samplecode("", "")} box={false}>
          <Callopselist className={cx("")} pos={1} max={10} tags={tags} list={jsonlist(5)} datakey={"cont"} />
        </Linebox>

        <Linebox title={"large"} className={"nomargin"} sample={samplecode("", "")} box={false}>
          <Callopselist className={cx("lg")} pos={1} max={10} tags={tags} list={jsonlist(5)} datakey={"cont"} />
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
      <Button className={"primary"} title={"close all"} onClick={onClickClose} eid={"info"} />
      <Button className={"primary"} title={"open all"} onClick={onClickOpen} eid={"info"} />
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