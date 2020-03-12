import React, { useState } from 'react';
import { optionsKnob as options, withKnobs, text, boolean, radios, number, button } from '@storybook/addon-knobs';
import styled from 'styled-components';
import cx from 'classnames/bind'
import { Linebox } from './00-Frame';
import { cs, Thumblist, Thumbbox, Util } from '../src';

const StyledObject = styled.span`{
  &.t-main {
    .lb-box { ${cs.w.get(800)} ${cs.p.b30} }

    // .lb-box .lb-li > * { ${cs.m.b10} }

    .t-child { ${cs.h.get(100)} & > p { ${cs.align.center} } }

    .res-view { 
      ${cs.h.get(100)} ${cs.w.get(800)} ${cs.bg.lightgray} 
      p { ${cs.m.a5} }
    }    
  }
}`;

export default { title: 'object|Thumblist', component: Thumblist, decorators: [withKnobs] };

const samplecode = (value, classname = '') => `<Thumblist className={"${classname}"} ${value} />`;

const jsonlist = (count = 5, lines = 10) => {
  let data = [];
  for (let i = 0; i < count; i++) {
    data.push({ no: i + 1, rowid: i, title: `title-${i}`, date: Util.getCurrentDate(), count: i});
  }

  return data;
};

export const object = () => {
  const size = options('size',
    { 'none': '', 'sm(small)': 'sm', 'lg(large)': 'lg', },
    '', { display: 'inline-radio' }, 'Other');
  const bg = options('background',
    { none: '', primary: 'primary', gray: 'gray', dark: 'dark' },
    '', { display: 'inline-radio' }, 'Other');
  // const bgcolor = text('background color', '#ffffff');
  const animtime = text('animation time', '1s');
  const animtype = options('animation',
    {
      none: '', slidein: 'slidein', slideout: 'slideout',
      fadein: 'fadein', fadeout: 'fadeout',
      slidedown: 'slidedown', slideup: 'slideup',
    }, '',
    { display: 'inline-radio' }, 'Other');
  const isdelete = boolean('delete icon and event', false);
  const isborder = boolean('border', false);
  const fontsize = text('fontsize', '14px');
  const fontcolor = text('fontcolor', '#353535');
  const border = isborder ? text('border color', '#909090') : '';
  const radius = isborder ? text('border radius', '1px') : '';
  const width = isborder ? text('border width', '1px') : '';
  const padding = isborder ? text('border padding', '5px') : '';
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

  const onClickDelete = (rowid, e) => {
    setResult(`onClickDelete(rowid = ${rowid}, e)`);
  }

  const onClickPage = (page, e) => {
    const array = [...alldata.slice((page - 1) * perpage, page * perpage)]
    setList(array);
    setPos(page);
    setResult(`onClickPage(page = ${page}, e)`);
  }

  const onClickSearch = (value, key, e) => {
    setResult(`onClickSearch(value = ${value}, key = ${key}, e)`);
  }

  const max = Math.floor(alldata.length / perpage);
  const lborder = !width || width === 0 || width === "0px" ? null : { color: border, radius: radius, width: width };
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"callopse"} className={"nomargin"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."} box={false}
        sample={samplecode("", 'pos={pos} max={max} list={list} options={{ inner: { height: 160 } }}')}>
        <Thumblist className={cx(size, bg )} pos={pos} max={max} list={list} total={alldata.length}
          border={lborder}
          font={{ color: fontcolor, size: fontsize}}
          onClickSearch={onClickSearch} onSelect={onSelect} onClickNew={onClickNew}
          onClickDelete={isdelete ? onClickDelete : null} onClickPage={onClickPage} />
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

object.story = { name: 'Base' };