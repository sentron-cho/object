import React, { useState } from 'react';
import { withKnobs, text, boolean, radios } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';
import cx from 'classnames/bind'
import { Linebox } from './00-Frame';
import { cs, Checkbox } from '../src';

const StyledObject = styled.span`{
  &.t-main {
    .lb-box { ${cs.w.get(800)} ${cs.p.b30} }

    .lb-box .lb-li > * { ${cs.m.r10} ${cs.m.t10} }
    .res-view { 
      ${cs.h.get(100)} ${cs.w.get(800)} ${cs.bg.lightgray} 
      p { ${cs.m.a5} }
    }
  }
}`;

export default {
  title: 'object|Checkbox', // 스토리북에서 보여질 그룹과 경로를 명시
  component: Checkbox, // 어떤 컴포넌트를 문서화 할지 명시
  decorators: [withKnobs], // 애드온 적용
};

const samplecode = (value, classname = '') => `<Checkbox className={"${classname}"} ${value} />`;

export const object = () => {
  const title = text('title', null);
  const label = text('label', 'label');
  const message = text('message', '');
  const [modal, setModal] = useState(null);
  const [result, setResult] = useState(null);
  const [change, setChange] = useState(null);

  const onClick = (eid, e, list) => {
    setResult(`eid = ${eid}, ${JSON.stringify(list)}`);
  }

  const onChange = (value) => {
    setChange(`${JSON.stringify(value)}`);
  }

  const list1 = [{ id: 1, name: 'check 1', check: true }, { id: 2, name: 'check 2', check: false }];
  const list2 = [{ id: 1, name: 'check 1', check: true }, { id: 2, name: 'check 2', check: true }];

  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"checkbox"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."} top={option.top} sample={samplecode('label={"label"} list={list} radio={true}', '')}>
        <Checkbox className={"primary"} onClick={onClick} onChange={onChange} />
        <Checkbox className={"primary"} label={"title : "} list={list2} onClick={onClick} onChange={onChange} />
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


object.story = {
  name: 'Base'
};

const option = {
  top: "20px",
}

export const size = () => {
  const list = [{ id: 1, name: 'check', check: true }];

  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"size"} top={option.top} sample={samplecode('label={"label"} list={list}', '')}>
        <Checkbox className={"xs"} label={"xs : "} list={list} />
        <Checkbox className={"sm"} label={"sm : "} list={list} />
        <Checkbox className={"md"} label={"md : "} list={list} />
        <Checkbox className={"lg"} label={"lg : "} list={list} />
        <Checkbox className={"xl"} label={"xl : "} list={list} />
      </Linebox>
    </StyledObject>
  );
};

export const border = () => {
  const list = [{ id: 1, name: 'check', check: true }];

  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"border and radius"} top={option.top} sample={samplecode('label={"label"} list={list}', '')}>
        <Checkbox className={"border"} label={"box : "} list={list} />
        <Checkbox className={"border radius"} label={"radius : "} list={list} />
        <Checkbox className={"border round"} label={"round : "} list={list} />
      </Linebox>

      <Linebox title={"color"} top={option.top} sample={samplecode('label={"label"} list={list}', '')}>
        <Checkbox className={"border green"} label={"green : "} list={list} />
        <Checkbox className={"border primary"} label={"primary : "} list={list} />
        <Checkbox className={"border red"} label={"red : "} list={list} />
      </Linebox>

      <Linebox title={"color"} top={option.top} sample={samplecode('label={"label"} list={list}', '')}>
        <Checkbox className={"border gray"} label={"green : "} list={list} />
        <Checkbox className={"border dark"} label={"primary : "} list={list} />
        <Checkbox className={"border black"} label={"red : "} list={list} />
      </Linebox>

      <Linebox title={"border options"} top={option.top} sample={samplecode('label={"label"} list={list}', '')}>
        <Checkbox className={"primary"} label={"blue radius"} list={list} border={{radius: '5px', color: "blue"}} />
        <Checkbox className={"primary"} label={"red radius 2px"} list={list} border={{radius: '10px', color: "red", width: "2px"}} />
        <Checkbox className={"primary"} label={"black radius 3px"} list={list} border={{radius: '15px', color: "black", width: "3px"}} />
      </Linebox>

      <Linebox title={"modal type"} top={option.top} sample={samplecode('label={"label"} list={list}', '')}>
        <Checkbox className={"border full"} label={"border full : "} list={list} />
      </Linebox>
    </StyledObject>
  );
};

export const color = () => {
  const list = [{ id: 1, name: 'check', check: true }];

  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"background"} top={option.top} sample={samplecode('label={"label"} list={list}', '')}>
        <Checkbox className={"green"} label={"green : "} list={list} />
        <Checkbox className={"primary"} label={"primary : "} list={list} />
        <Checkbox className={"round red"} label={"round red : "} list={list} />
      </Linebox>

      <Linebox title={"background"} top={option.top} sample={samplecode('label={"label"} list={list}', '')}>
        <Checkbox className={"gray"} label={"gray : "} list={list} />
        <Checkbox className={"dark"} label={"dark : "} list={list} />
        <Checkbox className={"round black"} label={"round black : "} list={list} />
      </Linebox>      
    </StyledObject>
  );
};

export const radiobox = () => {
  const [result, setResult] = useState(null);
  const [change, setChange] = useState(null);

  const onClick = (eid, e, list) => {
    setResult(`eid = ${eid}, ${JSON.stringify(list)}`);
  }

  const onChange = (value) => {
    setChange(`${JSON.stringify(value)}`);
  }

  const list = [{ id: 1, name: 'radio' }];
  const list3 = [{ id: 1, name: 'radio 1', check: true }, { id: 2, name: 'radio 2', check: false }];

  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"radio type"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."} top={option.top} sample={samplecode('label={"label"} list={list} radio={true}', '')}>
        <Checkbox className={"primary"} label={"radio : "} list={list3} radio={true} onClick={onClick} onChange={onChange} />
      </Linebox>

      <StyledObject className={"t-main"}>
        <Linebox title={"radio size"} top={option.top} sample={samplecode('label={"label"} list={list}', '')}>
          <Checkbox className={"xs"} label={"xs : "} list={list} radio={true} />
          <Checkbox className={"sm"} label={"sm : "} list={list} radio={true} />
          <Checkbox className={"md"} label={"md : "} list={list} radio={true} />
          <Checkbox className={"lg"} label={"lg : "} list={list} radio={true} />
          <Checkbox className={"xl"} label={"xl : "} list={list} radio={true} />
        </Linebox>
      </StyledObject>

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

export const theme = () => {
  const list = [{ id: 1, name: 'radio' }];
  
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"theme"} top={option.top} sample={samplecode("theme={'sky'}", "sky")} inline={true}>
        <Checkbox list={list} theme={'sky'}>sky</Checkbox>
        <Checkbox list={list} theme={'primary'}>primary</Checkbox>
        <Checkbox list={list} theme={'gray'}>gray</Checkbox>
        <Checkbox list={list} theme={'dark'}>dark</Checkbox>
        <Checkbox list={list} theme={'black'}>black</Checkbox>
      </Linebox>
    </StyledObject>
  );
};