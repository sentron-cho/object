import React, { useState } from 'react';
import { optionsKnob as options, withKnobs, text, boolean, radios, number, button } from '@storybook/addon-knobs';
import styled from 'styled-components';
import cx from 'classnames/bind'
import { Linebox } from './00-Frame';
import { cs, Thumblist, Util } from '../src';
import { IMG } from '../src/Icons';

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

const tags = [
  { key: 'url', title: 'url', flex: '4 1 200px', align: 'left' },
  { key: 'color', title: 'text color', flex: '2 1 100px', align: 'center', type: 'color' },
  { key: 'title', title: 'title', flex: '3 1 100px', align: 'left' },
];

const jsonlist = (count = 5, lines = 10) => {

  let data = [];
  for (let i = 0; i < count; i++) {
    data.push({ no: i + 1, uuid: i + 1, title: `title-${i}`, url: IMG[`Sample${(i % 3) + 1}`], utime: Util.getCurrentDate() });
    // data.push({no: i+1, rowid: i, name: `data-${i}`, text: `${texts}-${i}`, utime: Util.getCurrentDate()});
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
  const [result, setResult] = useState(null);
  const [list, setList] = useState(jsonlist(10));


  const onSelect = (rowid, e) => {
    setResult(`onSelect(rowid = ${rowid}, e)`);
  }

  const onClickNew = (e) => {
    setResult(`onClickNew(e)`);
  }

  const onClickItem = (eid, rowid, e) => {
    setResult(`onClickItem(eid = ${eid}, rowid = ${rowid}, e)`);
  }

  const onClickDelete = (rowid, e) => {
    setResult(`onClickDelete(rowid = ${rowid}, e)`);
  }

  const onDragDrop = (eid, array) => {
    // console.dir(eid);
    // if (eid === 'drop') {
      // console.dir(eid);
      setList(array);
    // }
  }

  const lborder = !width || width === 0 || width === "0px" ? null : { color: border, radius: radius, width: width };
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"callopse"} className={"nomargin"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."} box={false}
        sample={samplecode("", 'list={list}')}>
        <Thumblist className={cx(size, bg)} list={list} head={tags} rowid={"uuid"}
          border={{ color: border, radius: radius, width: width }}
          font={{ color: fontcolor, size: fontsize }}
          onSelect={onSelect} onClickNew={onClickNew} onClickItem={onClickItem}
          onClickDelete={onClickDelete} onDragDrop={onDragDrop} />
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


export const color = () => {
  const list = jsonlist(10);
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"no color"} className={"nomargin"} sample={samplecode("", "")} box={false}>
        <Thumblist className={''} fid={'1'} list={list} head={tags} rowid={"uuid"}
          onSelect={() => { }} onClickNew={() => { }} onClickDelete={() => { }} onSelected={() => { }} />
      </Linebox>

      <Linebox title={"primary"} className={"nomargin"} sample={samplecode("", "")} box={false}>
        <Thumblist className={'primary'} fid={'2'} list={list} head={tags} rowid={"uuid"}
          onSelect={() => { }} onClickNew={() => { }} onClickDelete={() => { }} onSelected={() => { }} />
      </Linebox>

      <Linebox title={"dark radius(child sm)"} className={"nomargin"} sample={samplecode('child={Widgetbox} config={{ child: { className: "noborder" } }}', "dark radius")} box={false}>
        <Thumblist className={'dark radius'} fid={'3'} list={list} head={tags} rowid={"uuid"}
          config={{ child: { className: "sm" } }}
          onSelect={() => { }} onClickNew={() => { }} onClickDelete={() => { }} onSelected={() => { }} />
      </Linebox>

      <Linebox title={"gray radius(child md)"} className={"nomargin"} sample={samplecode("", "")} box={false}>
        <Thumblist className={'gray'} fid={'4'} list={list}
          config={{ child: { className: "md" } }} head={tags} rowid={"uuid"}
          onSelect={() => { }} onClickNew={() => { }} onClickDelete={() => { }} onSelected={() => { }} />
      </Linebox>

      <Linebox title={"dark radius(child lg)"} className={"nomargin"} sample={samplecode('child={Widgetbox} config={{ child: { className: "noborder" } }}', "dark radius")} box={false}>
        <Thumblist className={'dark radius'} fid={'5'} list={list} head={tags} rowid={"uuid"}
          config={{ child: { className: "lg" } }}
          onSelect={() => { }} onClickNew={() => { }} onClickDelete={() => { }} onSelected={() => { }} />
      </Linebox>
    </StyledObject>
  );
};

export const border = () => {
  const list = jsonlist(10);
  return (
    <StyledObject className={"t-main"}>
    <Linebox title={"no color"} className={"nomargin"} sample={samplecode("", "")} box={false}>
      <Thumblist className={''} fid={'1'} list={list} head={tags} rowid={"uuid"}
        onSelect={() => { }} onClickNew={() => { }} onClickDelete={() => { }} onSelected={() => { }} />
      </Linebox>
    </StyledObject>
  );
};