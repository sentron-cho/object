import React, { useState } from 'react';
import { optionsKnob as options, withKnobs, text, boolean, radios, array, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';
import cx from 'classnames/bind'
import { Linebox } from './00-Frame';
import { cs, Combobox } from '../src';

const StyledObject = styled.span`{
  &.t-main {
    .lb-box { ${cs.w.get(800)} ${cs.p.b30} }

    .lb-box .lb-li { ${cs.min.height(200)} ${cs.over.unset} }
    .lb-box .lb-li > * { ${cs.m.r30} }
    .res-view { 
      ${cs.h.get(100)} ${cs.w.get(800)} ${cs.bg.lightgray} 
      p { ${cs.m.a5} }
    }

    .lb-box.align .lb-li { ${cs.min.height(300)} & > * { ${cs.m.r0} } }
  }
}`;

export default {
  title: 'object|Combobox', // 스토리북에서 보여질 그룹과 경로를 명시
  component: Combobox, // 어떤 컴포넌트를 문서화 할지 명시
  decorators: [withKnobs], // 애드온 적용
};

const samplecode = (value, classname = '') => `<Combobox list={list} className={"${classname}"} ${value} />`;

export const sobject = () => {

  const classname = text('classname', '');
  const size = options('size',
    { 'md(middle)': 'md', 'xl(xlarge)': 'xl', 'lg(large)': 'lg', 'sm(small)': 'sm', 'xs(xsmall)': 'xs', 'full': 'full' },
    '', { display: 'inline-radio' }, 'Other');
  const halign = options('horizontal', { 'left': 'left', 'center': 'center', 'right': 'right' },
    '', { display: 'inline-radio' }, 'Other');
  const valign = options('vertical', { 'top': 'top', 'middle': 'middle', 'bottom': 'bottom' },
    '', { display: 'inline-radio' }, 'Other');
  const bg = options('background',
    { trans: 'trans', orange: 'orange', green: 'green', red: 'red', primary: 'primary', gray: 'gray', dark: 'dark', black: 'black', 'primary-line': 'primary-line' },
    '', { display: 'inline-radio' }, 'Other');
  const label = text('label', 'combo');
  const disable = boolean('disable', false);

  // const size = radios('size', { md: 'md', xl: 'xl', lg: 'lg', sm: 'sm', xs: 'xs', full: 'full' }, '', 'Other');

  const [result, setResult] = useState(null);
  const [change, setChange] = useState(null);

  const onClick = (eid, e, list) => {
    setResult(`eid = ${eid}, ${JSON.stringify(list)}`);
  }

  const onChange = (eid, e, list) => {
    setChange(`eid = ${eid}, ${JSON.stringify(list)}`);
  }

  const list = [{ id: 1, name: 'combo 1', check: true }, { id: 2, name: 'combo 2', check: false }, { id: 3, name: 'check 1', check: true }];

  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"checkbox"} className={"align"} id={"f0001"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."} top={option.top}
        sample={samplecode('label={"combo"} onClick={onClick} onChange={onChange}', 'primary')} box={true}>
        <Combobox className={cx(classname, bg, size, { disable }, halign, valign)} label={label} list={list} onClick={onClick} onChange={onChange} frameid={"f0001"} />
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
  const list = [{ id: 1, name: 'com1', check: false }, { id: 2, name: 'com2', check: true }];

  return (
    <StyledObject className={"t-main"} id={"f0001"}>
      <Linebox title={"size"} sample={samplecode('label={"combo"}', 'primary')}>
        <Combobox className={"xs"} label={"xsmall"} list={list} frameid={"f0001"} />
        <Combobox className={"sm"} label={"small"} list={list} pos={1} frameid={"f0001"} />
        <Combobox className={"md"} label={"middle"} list={list} frameid={"f0001"} />
        <Combobox className={"lg"} label={"large"} list={list} pos={2} frameid={"f0001"} />
        <Combobox className={"xl"} label={"xlarge"} list={list} frameid={"f0001"} />
      </Linebox>

      <Linebox title={"full"} sample={samplecode('label={"combo"}', 'primary')}>
        <Combobox className={"full"} label={"full"} list={list} frameid={"f0001"} />
      </Linebox>
    </StyledObject>
  );
};

export const align = () => {
  const list = [{ id: 1, name: 'com1', check: false }, { id: 2, name: 'com2', check: true }];

  return (
    <StyledObject className={"t-main"} id={"f0001"}>
      <Linebox title={"horizontal align"} className={"align"} sample={samplecode('label={"combo"}', '')} box={true}>
        <Combobox className={"primary left"} label={"left"} list={list} frameid={"f0001"} />
        <Combobox className={"primary right"} label={"right"} list={list} frameid={"f0001"} />
        <Combobox className={"primary center"} label={"center"} list={list} frameid={"f0001"} />
      </Linebox>

      <Linebox title={"vertical align"} className={"align"} sample={samplecode('label={"combo"}', '')} box={true}>
        <Combobox className={"primary top"} label={"top"} list={list} frameid={"f0001"} />
        <Combobox className={"primary middle"} label={"middle"} list={list} frameid={"f0001"} />
        <Combobox className={"primary bottom"} label={"bottom"} list={list} frameid={"f0001"} />
      </Linebox>

      <Linebox title={"align"} className={"align v-align"} mple={samplecode('label={"combo"}', '')} box={true}>
        <Combobox className={"primary left top"} label={"left top"} list={list} frameid={"f0001"} />
        <Combobox className={"primary center top"} label={"center top"} list={list} frameid={"f0001"} />
        <Combobox className={"primary right top"} label={"right top"} list={list} frameid={"f0001"} />

        <Combobox className={"primary left middle"} label={"left middle"} list={list} frameid={"f0001"} />
        <Combobox className={"primary center middle"} label={"center middle"} list={list} frameid={"f0001"} />
        <Combobox className={"primary right middle"} label={"right middle"} list={list} frameid={"f0001"} />

        <Combobox className={"primary left bottom"} label={"left bottom"} list={list} frameid={"f0001"} />
        <Combobox className={"primary center bottom"} label={"center bottom"} list={list} frameid={"f0001"} />
        <Combobox className={"primary right bottom"} label={"right bottom"} list={list} frameid={"f0001"} />
      </Linebox>
    </StyledObject>
  );
};

export const color = () => {
  const list = [{ id: 1, name: 'com1', check: false }, { id: 2, name: 'com2', check: true }];

  return (
    <StyledObject className={"t-main"} id={"f0001"}>
      <Linebox title={"color"} sample={samplecode('label={"combo"}', 'sky')}>
        <Combobox className={"trans"} label={"trans"} list={list} frameid={"f0001"} />
        <Combobox className={"sky"} label={"sky"} list={list} pos={1} frameid={"f0001"} />
        <Combobox className={"orange"} label={"orange"} list={list} pos={1} frameid={"f0001"} />
      </Linebox>

      <Linebox title={""} sample={samplecode('label={"combo"}', 'primary')}>
        <Combobox className={"green"} label={"green"} list={list} frameid={"f0001"} />
        <Combobox className={"red"} label={"red"} list={list} pos={2} frameid={"f0001"} />
        <Combobox className={"primary"} label={"primary"} list={list} frameid={"f0001"} />
      </Linebox>

      <Linebox title={""} sample={samplecode('label={"combo"}', 'dark')}>
        <Combobox className={"gray"} label={"gray"} list={list} frameid={"f0001"} />
        <Combobox className={"dark"} label={"dark"} list={list} pos={1} frameid={"f0001"} />
        <Combobox className={"black"} label={"black"} list={list} frameid={"f0001"} />
      </Linebox>
    </StyledObject>
  );
};

export const disable = () => {
  const list = [{ id: 1, name: 'com1', check: false }, { id: 2, name: 'com2', check: true }];

  return (
    <StyledObject className={"t-main"} id={"f0001"}>
      <Linebox title={"color"} sample={samplecode('label={"combo"}', 'sky')}>
        <Combobox className={"trans"} label={"trans"} list={list} frameid={"f0001"} disable={true} />
        <Combobox className={"sky"} label={"sky"} list={list} pos={1} frameid={"f0001"} disable={true} />
        <Combobox className={"orange"} label={"orange"} list={list} pos={1} frameid={"f0001"} disable={true} />
      </Linebox>

      <Linebox title={""} sample={samplecode('label={"combo"}', 'primary')}>
        <Combobox className={"green"} label={"green"} list={list} frameid={"f0001"} disable={true} />
        <Combobox className={"red"} label={"red"} list={list} pos={2} frameid={"f0001"} disable={true} />
        <Combobox className={"primary"} label={"primary"} list={list} frameid={"f0001"} disable={true} />
      </Linebox>

      <Linebox title={""} sample={samplecode('label={"combo"}', 'dark')}>
        <Combobox className={"gray"} label={"gray"} list={list} frameid={"f0001"} disable={true} />
        <Combobox className={"dark"} label={"dark"} list={list} pos={1} frameid={"f0001"} disable={true} />
        <Combobox className={"black"} label={"black"} list={list} frameid={"f0001"} disable={true} />
      </Linebox>
    </StyledObject>
  );
};


export const label = () => {
  const list = [{ id: 1, name: 'com1', check: false }, { id: 2, name: 'com2', check: true }];

  return (
    <StyledObject className={"t-main"} id={"f0001"}>
      <Linebox title={"align"} sample={samplecode('label={"combo"}', 'primary')}>
        <Combobox className={"primary"} label={"left"} options={{ label: { align: "left", color: "red" } }} list={list} frameid={"f0001"} />
        <Combobox className={"primary"} label={"center"} options={{ label: { align: "center", color: "green" } }} list={list} frameid={"f0001"} />
        <Combobox className={"primary"} label={"right"} options={{ label: { align: "right", color: "blue" } }} list={list} frameid={"f0001"} />
      </Linebox>

      <Linebox title={"align"} sample={samplecode('label={"combo"}', 'primary')}>
        <Combobox className={"primary"} label={"left"} options={{ text: { align: "left", color: "red" } }} list={list} frameid={"f0001"} />
        <Combobox className={"primary"} label={"center"} options={{ text: { align: "center", color: "green" } }} list={list} frameid={"f0001"} />
        <Combobox className={"primary"} label={"right"} options={{ text: { align: "right", color: "blue" } }} list={list} frameid={"f0001"} />
      </Linebox>
    </StyledObject>
  );
};

export const border = () => {
  const list = [{ id: 1, name: 'com1', check: false }, { id: 2, name: 'com2', check: true }];

  return (
    <StyledObject className={"t-main"} id={"f0001"}>
      <Linebox title={"border options"} sample={samplecode('label={"combo"}', 'border')}>
        <Combobox className={"primary"} label={"blue radius"} list={list} frameid={"f0001"} border={{ radius: '5px', color: "blue" }} />
        <Combobox className={"primary"} label={"red radius 2px"} list={list} frameid={"f0001"} border={{ radius: '10px', color: "red", width: "2px" }} />
        <Combobox className={"primary"} label={"black radius 3px"} list={list} frameid={"f0001"} border={{ radius: '15px', color: "black", width: "3px" }} />
      </Linebox>
    </StyledObject>
  );
};