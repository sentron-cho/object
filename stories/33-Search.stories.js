/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { optionsKnob as options, withKnobs } from '@storybook/addon-knobs';
import styled from 'styled-components';
import cx from 'classnames/bind'
import { Linebox } from './00-Frame';
import { cs, Search } from '../src';

const StyledObject = styled.span`{
  &.t-main {
    .lb-box { ${cs.w.get(800)} ${cs.p.b30} }
    .lb-box .lb-li { ${cs.min.height(100)} overflow: initial; }
    .lb-box .lb-li > * { ${cs.m.a0} ${cs.m.bottom(10)} }
    .padding.lb-box .lb-li > * { ${cs.m.a0} ${cs.m.bottom(60)} }

    .res-view { 
      ${cs.h.get(100)} ${cs.w.get(800)} ${cs.bg.lightgray} 
      p { ${cs.m.a5} }
    }
  }
}`;

export default {
  title: 'object|Search', // 스토리북에서 보여질 그룹과 경로를 명시
  component: Search, // 어떤 컴포넌트를 문서화 할지 명시
  decorators: [withKnobs], // 애드온 적용
};

const samplecode = (value, classname = '') => `<Search  className={"${classname}"} ${value} />`;
const list = [{ id: 1, name: 'name', check: true }, { id: 2, name: 'id', check: false }];

export const sobject = () => {

  const size = options('size',
    { 'md(middle)': 'md', 'xl(xlarge)': 'xl', 'lg(large)': 'lg', 'sm(small)': 'sm', 'xs(xsmall)': 'xs' },
    '', { display: 'inline-radio' }, 'Other');
  const bg = options('background',
    { none: '', orange: 'orange', green: 'green', red: 'red', primary: 'primary', gray: 'gray', dark: 'dark', black: 'black' },
    '', { display: 'inline-radio' }, 'Other');

  const [result, setResult] = useState(null);
  const [change, setChange] = useState(null);

  const onClick = (value, key, e) => {
    setResult(`value = ${value}, key = ${key}, e`);
  }

  const onChange = (value, key, e) => {
    setChange(`value = ${value}, key = ${key}, e`);
  }

  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"Search"} className={""} id={"f0001"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."} top={option.top}
        sample={samplecode('title={"Search"} onClick={onClick} onChange={onChange}', 'primary')} box={false}>
        <Search className={cx(bg, size)} onClick={onClick} onChange={onChange} list={list} frameid={'f0001'} />
      </Linebox>

      <div className={"res-view"}>
        <p>onClick</p>
        <p>{result}</p>
      </div>

      <div className={"res-view"}>
        <p>onChange</p>
        <p>{change}</p>
      </div>
    </StyledObject>
  );
};


sobject.story = {
  name: 'Base'
};

const option = {
  top: "20px",
}

export const size = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"size"} id={"f0001"} className={'padding'} sample={samplecode('', 'xs border radius')}>
        <Search className={"xs border radius"} list={list} frameid={'f0001'} />
        <Search className={"sm border radius"} list={list} frameid={'f0001'} />
        <Search className={"md border radius"} list={list} frameid={'f0001'} />
        <Search className={"lg border radius"} list={list} frameid={'f0001'} />
        <Search className={"xl border radius"} list={list} frameid={'f0001'} />
      </Linebox>      
    </StyledObject>
  );
};

export const color = () => {
  return (
    <StyledObject className={"t-main"} id={"f0001"}>
      <Linebox title={"color"} sample={samplecode('title={"Search"}', 'sky')}>
        <Search className={"sky"} />
        <Search className={"orange"} />
        <Search className={"green"} />
        <Search className={"red"} />
        <Search className={"primary"} />
        <Search className={"gray"} />
        <Search className={"dark"} />
        <Search className={"black"} />
      </Linebox>

      <Linebox title={"color"} className={'padding'} sample={samplecode('title={"Search"}', 'sky')}>
        <Search className={"sky"} list={list} frameid={'f0001'} />
        <Search className={"orange"} list={list} frameid={'f0001'} />
        <Search className={"green"} list={list} frameid={'f0001'} />
        <Search className={"red"} list={list} frameid={'f0001'} />
        <Search className={"primary"} list={list} frameid={'f0001'} />
        <Search className={"gray"} list={list} frameid={'f0001'} />
        <Search className={"dark"} list={list} frameid={'f0001'} />
        <Search className={"black"} list={list} frameid={'f0001'} />
      </Linebox>      
    </StyledObject>
  );
};

// export const border = () => {
//   return (
//     <StyledObject className={"t-main"} id={"f0001"}>
//       <Linebox title={"border options"} sample={samplecode('title={"Search"}', 'border')}>
//         <Search className={"primary"} max={100} min={0} value={10} limit={80} border={{ radius: '5px', color: "blue" }} />
//         <Search className={"primary"} max={100} min={0} value={10} limit={80} border={{ radius: '10px', color: "red", width: "2px" }} />
//         <Search className={"primary"} max={100} min={0} value={10} limit={80} border={{ radius: '15px', color: "black", width: "3px" }} />
//       </Linebox>
//     </StyledObject>
//   );
// };

export const theme = () => {
  return (
    <StyledObject className={"t-main"} id={"f0001"}>
      <Linebox title={"theme"} top={option.top} sample={samplecode("theme={'sky'}", "sky")}>
        <Search className={"primary"} theme={'sky'} />
        <Search className={"primary"} theme={'primary'} />
        <Search className={"primary"} theme={'gray'} />
        <Search className={"primary"} theme={'dark'} />
        <Search className={"primary"} theme={'black'} />
      </Linebox>

      <Linebox title={"theme"} top={option.top} classname={'padding'} sample={samplecode("theme={'sky'}", "sky")}>
        <Search className={"primary"} list={list} theme={'sky'} />
        <Search className={"primary"} list={list} theme={'primary'} />
        <Search className={"primary"} list={list} theme={'gray'} />
        <Search className={"primary"} list={list} theme={'dark'} />
        <Search className={"primary"} list={list} theme={'black'} />
      </Linebox>      
    </StyledObject>
  );
};