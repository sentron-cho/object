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

    .res-view { 
      ${cs.h.get(100)} ${cs.w.get(800)} ${cs.bg.lightgray} 
      p { ${cs.m.a5} }
    }    
  }
}`;

export default { title: 'object|Callopselist', component: Callopselist, decorators: [withKnobs] };

const samplecode = (value, classname = '') => `<Callopselist className={"${classname}"} ${value} />`;

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
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"no color"} className={"nomargin"} sample={samplecode("", "")} box={false}>
        <Callopselist className={cx("")} pos={1} max={10} tags={tags} list={jsonlist(5)} datakey={"cont"}
          onClickDelete={()=>{}} onClickSearch={()=>{}} onSelect={()=>{}} onClickNew={()=>{}} />
      </Linebox>
      
      <Linebox title={"sky"} className={"nomargin"} sample={samplecode("", "")} box={false}>
        <Callopselist className={cx("sky")} pos={1} max={10} tags={tags} list={jsonlist(5)} datakey={"cont"}
          onClickDelete={()=>{}} onClickSearch={()=>{}} onSelect={()=>{}} onClickNew={()=>{}} />
      </Linebox>

      <Linebox title={"primary"} className={"nomargin"} sample={samplecode("", "")} box={false}>
        <Callopselist className={cx("primary")} pos={1} max={10} tags={tags} list={jsonlist(5)} datakey={"cont"}
          onClickDelete={()=>{}} onClickSearch={()=>{}} onSelect={()=>{}} onClickNew={()=>{}} />
      </Linebox>

      <Linebox title={"gray"} className={"nomargin"} sample={samplecode("", "")} box={false}>
        <Callopselist className={cx("gray")} pos={1} max={10} tags={tags} list={jsonlist(5)} datakey={"cont"}
          onClickDelete={()=>{}} onClickSearch={()=>{}} onSelect={()=>{}} onClickNew={()=>{}} />
      </Linebox>

      <Linebox title={"dark"} className={"nomargin"} sample={samplecode("", "")} box={false}>
        <Callopselist className={cx("dark")} pos={1} max={10} tags={tags} list={jsonlist(5)} datakey={"cont"}
          onClickDelete={()=>{}} onClickSearch={()=>{}} onSelect={()=>{}} onClickNew={()=>{}} />
      </Linebox>

      
      <Linebox title={"black"} className={"nomargin"} sample={samplecode("", "")} box={false}>
        <Callopselist className={cx("black")} pos={1} max={10} tags={tags} list={jsonlist(5)} datakey={"cont"}
          onClickDelete={()=>{}} onClickSearch={()=>{}} onSelect={()=>{}} onClickNew={()=>{}} />
      </Linebox>      
    </StyledObject>
  );
};

export const border = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"radius"} className={""} sample={samplecode("", "primary")} box={false}>
        <Callopselist className={cx("radius")} pos={1} max={10} tags={tags} list={jsonlist(5)} datakey={"cont"} />
      </Linebox>

      <Linebox title={"border options"} className={""} sample={samplecode("options={{ border: { color: 'black', radius: 10, width: 1 } }}", "primary")} box={false}>
        <Callopselist className={cx("radius")} pos={1} max={10} tags={tags} list={jsonlist(5)} datakey={"cont"}
          border={{ color: 'red', radius: '5px', width: '1px' }} />
      </Linebox>

      <Linebox title={"border options"} className={""} sample={samplecode("options={{ border: { color: 'black', radius: 10, width: 1 } }}", "primary")} box={false}>
        <Callopselist className={cx("")} pos={1} max={10} tags={tags} list={jsonlist(5)} datakey={"cont"}
          border={{ color: 'blue', radius: '10px', width: '2px' }} />
      </Linebox>

      <Linebox title={"border options"} className={""} sample={samplecode("options={{ border: { color: 'black', radius: 10, width: 1 } }}", "primary")} box={false}>
        <Callopselist className={cx("dark")} pos={1} max={10} tags={tags} list={jsonlist(5)} datakey={"cont"}
          border={{ color: 'black', radius: '20px', width: '5px' }} />
      </Linebox>      
    </StyledObject>
  );
};

export const font = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"no options"} className={""} sample={samplecode("", "")} box={false}>
        <Callopselist className={cx("")} pos={1} max={10} tags={tags} list={jsonlist(5)} datakey={"cont"} />
      </Linebox>

      <Linebox title={"font options(contents left)"} className={""} sample={samplecode("options={{ border: { color: 'black', radius: 10, width: 1 } }}", "primary")} box={false}>
        <Callopselist className={cx("radius")} pos={1} max={10} tags={tags} list={jsonlist(5)} datakey={"cont"}
          font={{ color: 'red', size: '12px', align: 'left' }} />
      </Linebox>

      <Linebox title={"font options(contents center)"} className={""} sample={samplecode("options={{ border: { color: 'black', radius: 10, width: 1 } }}", "primary")} box={false}>
        <Callopselist className={cx("radius")} pos={1} max={10} tags={tags} list={jsonlist(5)} datakey={"cont"}
          font={{ color: 'blue', size: '16px', align: 'center' }} />
      </Linebox>

      <Linebox title={"font options(contents right)"} className={""} sample={samplecode("options={{ border: { color: 'black', radius: 10, width: 1 } }}", "primary")} box={false}>
        <Callopselist className={cx("radius")} pos={1} max={10} tags={tags} list={jsonlist(5)} datakey={"cont"}
          font={{ color: '#123456', size: '18px', align: 'right' }} />
      </Linebox>
    </StyledObject>
  );
};

export const event = () => {
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
    const array = [...alldata.slice((page - 1) * perpage, page * perpage)]
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
      <Linebox title={"callopse events"} className={"nomargin"} box={false}
      sample={samplecode("", 'pos={pos} max={max} tags={tags} list={list} datakey={"cont"} ' + 
      'onClickSearch={onClickSearch} onSelect={onSelect} onClickNew={onClickNew} ' +
      'onClickItem={onClickItem} onClickPage={onClickPage} ')}>
        <Callopselist className={cx('')} pos={pos} max={max}
          tags={tags} list={list} datakey={"cont"}
          onClickSearch={onClickSearch} onSelect={onSelect} onClickNew={onClickNew}
          onClickItem={onClickItem} onClickPage={onClickPage} />
      </Linebox>

      <div className={"res-view"}>
        <p>onClick</p>
        <p>{result}</p>
      </div>
    </StyledObject>
  );
};


export const theme = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"sky"} className={""} sample={samplecode("", "primary")}>
        <Callopselist className={cx("primary")} theme={"sky"} pos={1} max={10} tags={tags} list={jsonlist(5)} datakey={"cont"}
          onClickDelete={()=>{}} onClickSearch={()=>{}} onSelect={()=>{}} onClickNew={()=>{}} />
      </Linebox>

      <Linebox title={"primary"} className={""} sample={samplecode("", "primary")}>
        <Callopselist className={cx("primary")} theme={"primary"} pos={1} max={10} tags={tags} list={jsonlist(5)} datakey={"cont"}
          onClickDelete={()=>{}} onClickSearch={()=>{}} onSelect={()=>{}} onClickNew={()=>{}} />
      </Linebox>
      
      <Linebox title={"gray"} className={""} sample={samplecode("", "primary")}>
        <Callopselist className={cx("primary")} theme={"gray"} pos={1} max={10} tags={tags} list={jsonlist(5)} datakey={"cont"}
          onClickDelete={()=>{}} onClickSearch={()=>{}} onSelect={()=>{}} onClickNew={()=>{}} />
      </Linebox>
      
      <Linebox title={"dark"} className={""} sample={samplecode("", "primary")}>
        <Callopselist className={cx("primary")} theme={"dark"} pos={1} max={10} tags={tags} list={jsonlist(5)} datakey={"cont"}
          onClickDelete={()=>{}} onClickSearch={()=>{}} onSelect={()=>{}} onClickNew={()=>{}} />
      </Linebox>
      
      <Linebox title={"black"} className={""} sample={samplecode("", "primary")}>
        <Callopselist className={cx("primary")} theme={"black"} pos={1} max={10} tags={tags} list={jsonlist(5)} datakey={"cont"}
          onClickDelete={()=>{}} onClickSearch={()=>{}} onSelect={()=>{}} onClickNew={()=>{}} />
      </Linebox>
    </StyledObject>
  );
};