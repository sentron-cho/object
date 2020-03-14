import React, { useState } from 'react';
import { optionsKnob as options, withKnobs, text, boolean, radios, number, button } from '@storybook/addon-knobs';
import styled from 'styled-components';
import cx from 'classnames/bind'
import { Linebox } from './00-Frame';
import { cs, Carousel, Util } from '../src';
import { IMG } from './sample/index';

const StyledObject = styled.span`{
  &.t-main {
    .lb-box { ${cs.w.full} ${cs.p.b30} }

    .res-view { 
      ${cs.h.get(100)} ${cs.w.get(800)} ${cs.bg.lightgray} 
      p { ${cs.m.a5} }
    }
  }
}`;

export default { title: 'object|Carousel', component: Carousel, decorators: [withKnobs] };

const samplecode = (value, classname = '') => `<Carousel className={"${classname}"} ${value} />`;

const jsonlist = (count = 5, lines = 10) => {
  let data = [];
  for (let i = 0; i < count; i++) {
    data.push({ no: i + 1, rowid: i, title: `title-${i}`, text: `text-${i}`, url: IMG[`Image${i + 1}`], date: Util.getCurrentDate() });
  }

  return data;
};

export const object = () => {
  const [refresh, setRefresh] = useState(false);
  const onRefresh = (e) => {
    setRefresh(true);
    setTimeout(() => setRefresh(false), 200);
  }
  button('refresh(옵션을 변경 후 버튼을 클릭하세요)', onRefresh);

  const size = options('size',
    { 'none': '', 'xs(x small)': 'xs', 'sm(small)': 'sm', 'md(middle)': 'md', 'lg(large)': 'lg' },
    '', { display: 'inline-radio' }, 'Other');
  const title = text('title', 'Carousel');
  const slideauto = boolean('auto slide', true);
  
  const istitle = boolean('title option', false);
  const titlecolor = istitle ? text('title color', '') : '';
  const titlesize = istitle ? text('title size', '3rem') : '';
  const titleoutline = istitle ? text('title outline color', '#ffffff') : '';
  const titlealign = istitle ? options('title align', { 'left': 'left', 'center': 'center', 'right': 'right' },
  '', { display: 'inline-radio' }, 'Other') : '';

  const istext = boolean('text option', false);
  const textcolor = istext ? text('text color', '') : '';
  const textsize = istext ? text('text size', '1rem') : '';
  const textoutline = istext ? text('text outline color', '#ffffff') : '';
  const textalign = istext ? options('text align', { 'left': 'left', 'center': 'center', 'right': 'right' },
  '', { display: 'inline-radio' }, 'Other') : '';
  
  const isborder = boolean('border option', false);
  const border = isborder ? text('border color', '#909090') : '';
  const radius = isborder ? text('border radius', '1px') : '';
  const width = isborder ? text('border width', '1px') : '';
  const time = text('animation time', '3s');

  const [result, setResult] = useState(null);

  const onClick = (eid, checked, e) => {
    setResult(`onClick(eid = ${eid}, checked = ${checked}, e)`);
  }

  const opt = {
    border: isborder ? { radius: radius, color: border, width: width } : null,
    title: { size: titlesize, align: titlealign, color: titlecolor, outline: titleoutline },
    text: { size: textsize, align: textalign, color: textcolor, outline: textoutline }
  };

  if(refresh) { return null; }

  const list = jsonlist(5).map(item => { item.title = title || item.title; return item; });
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"Carousel button"} className={"nomargin"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."} sample={samplecode("", "")} box={false}>
        <Carousel className={cx(size)} list={list} anim={slideauto} time={time}
          options={opt} onClick={onClick} />
      </Linebox>

      <div className={"res-view"}>
        <p>onClick</p>
        <p>{result}</p>
      </div>
    </StyledObject>
  );
};

object.story = { name: 'Base' };

export const size = () => {
  const anim = boolean('auto slide', true);

  return (
    <StyledObject className={"t-main"} >
      <Linebox title={"x small"} sample={samplecode('', 'xs')}>
        <Carousel className={"xs"} anim={anim} list={jsonlist(3)} onClick={() => { }} />
      </Linebox>

      <Linebox title={"small"} sample={samplecode('', 'xs')}>
        <Carousel className={"sm"} anim={anim} list={jsonlist(3)} onClick={() => { }} />
      </Linebox>

      <Linebox title={"middle"} sample={samplecode('', 'xs')}>
        <Carousel className={"md"} anim={anim} list={jsonlist(3)} onClick={() => { }} />
      </Linebox>

      <Linebox title={"large"} sample={samplecode('', 'xs')}>
        <Carousel className={"lg"} anim={anim} list={jsonlist(3)} onClick={() => { }} />
      </Linebox>

      <Linebox title={"full"} sample={samplecode('', 'xs')}>
        <Carousel className={"full"} anim={anim} list={jsonlist(3)} onClick={() => { }} />
      </Linebox>
    </StyledObject>
  );
};

export const font = () => {
  const anim = boolean('auto slide', true);
  const title = text('title', 'title');
  const desc = text('text', 'text');
  
  const list = jsonlist(3).map(item => {
    item.title = title || item.title;
    item.text = desc || item.text;
    return item;
  });
  
  const [refresh, setRefresh] = useState(false);
  const onRefresh = (e) => {
    setRefresh(true);
    setTimeout(() => setRefresh(false), 200);
  }
  button('refresh', onRefresh);

  if(refresh) {
    return null;
  }

  return (
    <StyledObject className={"t-main"} >
      <Linebox title={"font lef"} sample={samplecode('', '')}>
        <Carousel className={"xxs"} anim={anim} list={list}
          options={
            {
              title: { size: "2rem", align: "left", color: "red", outline: '' },
              text: { size: "1rem", align: "left", color: "red", outline: '' }
            }
          } />
      </Linebox>

      <Linebox title={"font center"} sample={samplecode('', '')}>
        <Carousel className={"xxs"} anim={anim} list={list}
          options={
            {
              title: { size: "2.5rem", align: "center", color: "black", outline: 'white' },
              text: { size: "1rem", align: "center", color: "black", outline: '' }
            }
          } />
      </Linebox>

      <Linebox title={"font right"} sample={samplecode('', '')}>
        <Carousel className={"xxs"} anim={anim} list={list}
          options={
            {
              title: { size: "3rem", align: "right", color: "blue", outline: '' },
              text: { size: "1rem", align: "right", color: "blue", outline: '' }
            }
          } />
      </Linebox>
    </StyledObject>
  );
};

export const border = () => {
  const anim = boolean('auto slide', true);
  const list = jsonlist(3);

  return (
    <StyledObject className={"t-main"} >
      <Linebox title={"border options"} sample={samplecode('', 'border')}>
        <Carousel className={"xxs"} list={list} options={{ border: { radius: '5px', color: "blue" } }} anim={anim} />
      </Linebox>

      <Linebox title={"border options"} sample={samplecode('', 'border')}>
        <Carousel className={"xxs"} list={list} options={{ border: { radius: '10px', color: "red", width: "2px" } }} anim={anim} />
      </Linebox>

      <Linebox title={"border options"} sample={samplecode('', 'border')}>
        <Carousel className={"xxs"} list={list} options={{ border: { radius: '15px', color: "black", width: "3px" } }} anim={anim} />
      </Linebox>

      <Linebox title={"border options"} sample={samplecode('', 'border')}>
        <Carousel className={"xxs"} list={list} options={{ border: { radius: '30px', color: "blue", width: "3px" } }} anim={anim} />
      </Linebox>                  
    </StyledObject>
  );
};

export const animation = () => {
  const anim = boolean('auto slide', true);
  const time = text('animation time', '3s');
  const list = jsonlist(3);

  return (
    <StyledObject className={"t-main"} >
      <Linebox title={"border options"} sample={samplecode('', 'border')}>
        <Carousel className={"xxs"} list={list} time={time} anim={anim} />
      </Linebox>
    </StyledObject>
  );
};