import React, { useState } from 'react';
import { optionsKnob as options, withKnobs, text, boolean, radios, number } from '@storybook/addon-knobs';
import styled from 'styled-components';
import cx from 'classnames/bind'
import { Linebox } from './00-Frame';
import { cs, Tablebox, Util } from '../src';

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

export default { title: 'object|Tablebox', component: Tablebox, decorators: [withKnobs] };

const samplecode = (value, classname = '') => `<Tablebox className={"${classname}"} ${value} />`;

const tags = [
  { key: 'no', title: 'no', flex: '1 1 40px', align: 'left' },
  { key: 'name', title: 'name', flex: '10 1 100px', mobile: 'hide', align: 'center' },
  { key: 'text', title: 'text', flex: '20 1 200px', tablet: 'hide', align: 'left' },
  { key: 'utime', title: 'update time', flex: '3 1 120px', type: 'date', tablet: 'hide', align: 'right' }
];

const jsonlist = (count = 5, lines = 10) => {

  let data = [];
  for (let i = 0; i < count; i++) {
    data.push({ no: i + 1, rowid: i, name: `title-${i}`, text: `text-${i}`, utime: Util.getCurrentDate() });
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

  const onClickDelete = (rowid, e) => {
    setResult(`onClickDelete(rowid = ${rowid}, e)`);
  }

  const onDragDrop = (eid, array) => {
    setResult(`onDragDrop() eid = ${eid}, [array]`);
    setList(array);
  }

  const max = Math.floor(alldata.length / perpage);
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"callopse"} className={"nomargin"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."} sample={samplecode("", "")} box={false}>
        <Tablebox className={cx(size, align, bg)} pos={pos} max={max} head={tags} list={list}
          border={{ color: border, radius: radius, width: width }}
          font={{ color: fontcolor, size: fontsize, align: align }}
          onClickSearch={onClickSearch} onSelect={onSelect} onClickNew={onClickNew}
          onClickDelete={onClickDelete} onDragDrop={onDragDrop}
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
        <Tablebox className={cx("sm")} pos={1} max={10} head={tags} list={jsonlist(5)} 
        onClickDelete={()=>{}} onClickMove={()=>{}}/>
      </Linebox>

      <Linebox title={"none size"} className={"nomargin"} sample={samplecode("", "")} box={false}>
        <Tablebox className={cx("")} pos={1} max={10} head={tags} list={jsonlist(5)} 
        onClickDelete={()=>{}} onClickMove={()=>{}}/>
      </Linebox>

      <Linebox title={"large"} className={"nomargin"} sample={samplecode("", "")} box={false}>
        <Tablebox className={cx("lg")} pos={1} max={10} head={tags} list={jsonlist(5)}
        onClickDelete={()=>{}} onClickMove={()=>{}}/>
      </Linebox>
    </StyledObject>
  );
};

export const color = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"no color"} className={"nomargin"} sample={samplecode("", "")} box={false}>
        <Tablebox className={cx("")} pos={1} max={10} head={tags} list={jsonlist(5)}
          onClickDelete={()=>{}} onClickMove={()=>{}}
          onClickSearch={()=>{}} onSelect={()=>{}} onClickNew={()=>{}} />
      </Linebox>

      <Linebox title={"primary"} className={"nomargin"} sample={samplecode("", "")} box={false}>
        <Tablebox className={cx("primary")} pos={1} max={10} head={tags} list={jsonlist(5)}
          onClickDelete={()=>{}} onClickMove={()=>{}}
          onClickSearch={()=>{}} onSelect={()=>{}} onClickNew={()=>{}} />
      </Linebox>

      <Linebox title={"gray"} className={"nomargin"} sample={samplecode("", "")} box={false}>
        <Tablebox className={cx("gray")} pos={1} max={10} head={tags} list={jsonlist(5)}
          onClickDelete={()=>{}} onClickMove={()=>{}}
          onClickSearch={()=>{}} onSelect={()=>{}} onClickNew={()=>{}} />
      </Linebox>

      <Linebox title={"dark"} className={"nomargin"} sample={samplecode("", "")} box={false}>
        <Tablebox className={cx("dark")} pos={1} max={10} head={tags} list={jsonlist(5)}
          onClickDelete={()=>{}} onClickMove={()=>{}}
          onClickSearch={()=>{}} onSelect={()=>{}} onClickNew={()=>{}} />
      </Linebox>
    </StyledObject>
  );
};

export const border = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"radius"} className={""} sample={samplecode("", "primary")} box={false}>
        <Tablebox className={cx("")} pos={1} max={10} head={tags} list={jsonlist(5)} 
        onClickSearch={()=>{}} onSelect={()=>{}} onClickNew={()=>{}} />
      </Linebox>

      <Linebox title={"border options"} className={""} sample={samplecode("options={{ border: { color: 'black', radius: 10, width: 1 } }}", "primary")} box={false}>
        <Tablebox className={cx("")} pos={1} max={10} head={tags} list={jsonlist(5)} datakey={"cont"}
          border={{ color: 'red', radius: '5px', width: '1px' }} 
          onClickSearch={()=>{}} onSelect={()=>{}} onClickNew={()=>{}} />
      </Linebox>

      <Linebox title={"border options"} className={""} sample={samplecode("options={{ border: { color: 'black', radius: 10, width: 1 } }}", "primary")} box={false}>
        <Tablebox className={cx("")} pos={1} max={10} head={tags} list={jsonlist(5)} datakey={"cont"}
          border={{ color: 'blue', radius: '10px', width: '2px' }} 
          onClickSearch={()=>{}} onSelect={()=>{}} onClickNew={()=>{}} />
      </Linebox>

      <Linebox title={"border options"} className={""} sample={samplecode("options={{ border: { color: 'black', radius: 10, width: 1 } }}", "primary")} box={false}>
        <Tablebox className={cx("dark")} pos={1} max={10} head={tags} list={jsonlist(5)} datakey={"cont"}
          border={{ color: 'black', radius: '20px', width: '5px' }} 
          onClickSearch={()=>{}} onSelect={()=>{}} onClickNew={()=>{}} />
      </Linebox>      
    </StyledObject>
  );
};

export const font = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"no options"} className={""} sample={samplecode("", "")} box={false}>
        <Tablebox className={cx("")} pos={1} max={10} head={tags} list={jsonlist(5)} />
      </Linebox>

      <Linebox title={"font options(contents left)"} className={""} sample={samplecode("options={{ border: { color: 'black', radius: 10, width: 1 } }}", "primary")} box={false}>
        <Tablebox className={cx("radius")} pos={1} max={10} head={tags} list={jsonlist(5)} datakey={"cont"}
          font={{ color: 'red', size: '12px', align: 'left' }} 
          onClickSearch={()=>{}} onSelect={()=>{}} onClickNew={()=>{}} />
      </Linebox>

      <Linebox title={"font options(contents center)"} className={""} sample={samplecode("options={{ border: { color: 'black', radius: 10, width: 1 } }}", "primary")} box={false}>
        <Tablebox className={cx("radius")} pos={1} max={10} head={tags} list={jsonlist(5)} datakey={"cont"}
          font={{ color: 'blue', size: '16px', align: 'center' }} 
          onClickSearch={()=>{}} onSelect={()=>{}} onClickNew={()=>{}} />
      </Linebox>

      <Linebox title={"font options(contents right)"} className={""} sample={samplecode("options={{ border: { color: 'black', radius: 10, width: 1 } }}", "primary")} box={false}>
        <Tablebox className={cx("radius")} pos={1} max={10} head={tags} list={jsonlist(5)} datakey={"cont"}
          font={{ color: '#123456', size: '18px', align: 'right' }}
          onClickSearch={()=>{}} onSelect={()=>{}} onClickNew={()=>{}} />
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
      sample={samplecode("", 'pos={pos} max={max} head={tags} list={list} ' + 
      'onClickSearch={onClickSearch} onSelect={onSelect} onClickNew={onClickNew} ' +
      'onClickItem={onClickItem} onClickPage={onClickPage} ')}>
        <Tablebox className={cx('')} pos={pos} max={max}
          head={tags} list={list} datakey={"cont"}
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

export const dragdrop = () => {
  const [result, setResult] = useState(null);
  const [list, setList] = useState(jsonlist(10));

  const onDragDrop = (eid, array) => {
    setResult(`onDragDrop() eid = ${eid}, [array]`);
    array.map((item, i) => item.no = i + 1);
    setList(array);
    console.dir(array);
  }

  const onDraging = (eid, array) => {
    setResult(`onDraging() eid = ${eid}, [array]`);
  }

  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"callopse"} className={"nomargin"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."} box={false}
        sample={samplecode("", 'list={list}')}>
        <Tablebox className={cx('')} head={tags} list={list} datakey={"cont"}
          onDragDrop={onDragDrop} onDraging={onDraging} onClickNew={() => { }}/>
      </Linebox>

      <div className={"res-view"}>
        <p>onClick</p>
        <p>{result}</p>
      </div>
    </StyledObject>
  );
}