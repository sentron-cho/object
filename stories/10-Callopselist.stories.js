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
  const multi = boolean('multi', false);
  const size = options('size',
    { 'sm(small)': 'sm', 'lg(large)': 'lg', 'none': '' },
    '', { display: 'inline-radio' }, 'Other');
  const bg = options('background',
    { primary: 'primary', gray: 'gray', dark: 'dark', none: '' },
    '', { display: 'inline-radio' }, 'Other');
  const fontsize = text('fontsize', '14px');
  const fontcolor = text('fontcolor', '#353535');
  const align = options('align', { 'left': 'left', 'center': 'center', 'right': 'right' },
    '', { display: 'inline-radio' }, 'Other');
  const border = text('border color', '#909090');
  const radius = text('border radius', '0px');
  const width = text('border width', '1px');

  const bgcolor = text('border color', '#ffffff');
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
          border={{ color: border, radius: radius, width: width }}
          font={{ color: fontcolor, size: fontsize, align: align }}
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