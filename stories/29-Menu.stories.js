import React, { useState } from 'react';
import { optionsKnob as options, withKnobs, text, boolean, radios, array, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';
import cx from 'classnames/bind'
import { Linebox } from './00-Frame';
import { cs, Menu } from '../src';

const StyledObject = styled.span`{
  &.t-main {
    .lb-box { ${cs.w.get(800)} ${cs.p.b30} }

    .lb-box .lb-li { ${cs.min.height(100)} ${cs.over.unset} }
    .lb-box .lb-li > * { ${cs.m.right(100)} }
    .res-view { 
      ${cs.h.get(100)} ${cs.w.get(800)} ${cs.bg.lightgray} 
      p { ${cs.m.a5} }
    }

    .lb-box.v-align{ ${cs.m.bottom(50)} .lb-li { ${cs.min.height(300)} & > * { ${cs.m.r0} } } }
  }
}`;

export default {
  title: 'object|Menu', // 스토리북에서 보여질 그룹과 경로를 명시
  component: Menu, // 어떤 컴포넌트를 문서화 할지 명시
  decorators: [withKnobs], // 애드온 적용
};

const samplecode = (value, classname = '') => `<Menu list={list} className={"${classname}"} ${value} />`;
const list = [{ id: 1, name: 'menu 1' }, { id: 2, name: 'menu 2' }];

export const sobject = () => {

  const classname = text('classname', '');
  const size = options('size',
    { 'md(middle)': 'md', 'xl(xlarge)': 'xl', 'lg(large)': 'lg', 'sm(small)': 'sm', 'xs(xsmall)': 'xs' },
    '', { display: 'inline-radio' }, 'Other');
  const halign = options('horizontal', { 'left': 'left', 'center': 'center', 'right': 'right' },
    '', { display: 'inline-radio' }, 'Other');
  const valign = options('vertical', { 'top': 'top', 'middle': 'middle', 'bottom': 'bottom' },
    '', { display: 'inline-radio' }, 'Other');
  const bg = options('background',
    { trans: 'trans', orange: 'orange', green: 'green', red: 'red', primary: 'primary', gray: 'gray', dark: 'dark', black: 'black' },
    '', { display: 'inline-radio' }, 'Other');
  const label = text('label', 'menu');
  const disable = boolean('disable', false);

  const [result, setResult] = useState(null);
  const [change, setChange] = useState(null);

  const onClick = (eid, e, list) => {
    setResult(`eid = ${eid}, ${JSON.stringify(list)}`);
  }

  const onChange = (eid, e, list) => {
    setChange(`eid = ${eid}, ${JSON.stringify(list)}`);
  }

  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"Menu"} className={"v-align"} id={"f0001"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."} top={option.top}
        sample={samplecode('label={"menu"} onClick={onClick} onChange={onChange}', 'primary')} box={true}>
        <Menu className={cx(classname, bg, size, halign, valign)} label={label} list={list} 
          disable={disable} onClick={onClick} onChange={onChange} frameid={"f0001"} />
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

const show = true;

export const size = () => {
  return (
    <StyledObject className={"t-main"} id={"f0001"}>
      <Linebox title={"size"} sample={samplecode('label={"menu"}', 'primary')}>
        <Menu show={show} lassName={"xs"} label={"xsmall"} list={list} frameid={"f0001"} />
        <Menu show={show} className={"sm"} label={"small"} list={list} pos={1} frameid={"f0001"} />
        <Menu show={show} className={"md"} label={"middle"} list={list} frameid={"f0001"} />
        <Menu show={show} className={"lg"} label={"large"} list={list} pos={2} frameid={"f0001"} />
        <Menu show={show} className={"xl"} label={"xlarge"} list={list} frameid={"f0001"} />
      </Linebox>
    </StyledObject>
  );
};

export const align = () => {
  return (
    <StyledObject className={"t-main"} id={"f0001"}>
      <Linebox title={"horizontal align"} className={"align"} sample={samplecode('label={"menu"}', '')} box={true}>
        <Menu show={show} className={"left"} label={"left"} list={list} frameid={"f0001"} show={true} />
        <Menu show={show} className={"right"} label={"right"} list={list} frameid={"f0001"} />
        <Menu show={show} className={"center"} label={"center"} list={list} frameid={"f0001"} />
      </Linebox>

      <Linebox title={"vertical align"} className={"v-align"} sample={samplecode('label={"menu"}', '')} box={true}>
        <Menu show={show} className={"top"} label={"top"} list={list} frameid={"f0001"} />
        <Menu show={show} className={"middle"} label={"middle"} list={list} frameid={"f0001"} />
        <Menu show={show} className={"bottom"} label={"bottom"} list={list} frameid={"f0001"} />
      </Linebox>

      <Linebox title={"align"} className={"align v-align"} mple={samplecode('label={"menu"}', '')} box={true}>
        <Menu show={show} className={"left top"} label={"left top"} list={list} frameid={"f0001"} />
        <Menu show={show} className={"center top"} label={"center top"} list={list} frameid={"f0001"} />
        <Menu show={show} className={"right top"} label={"right top"} list={list} frameid={"f0001"} />

        <Menu show={show} className={"left middle"} label={"left middle"} list={list} frameid={"f0001"} />
        <Menu show={show} className={"center middle"} label={"center middle"} list={list} frameid={"f0001"} />
        <Menu show={show} className={"right middle"} label={"right middle"} list={list} frameid={"f0001"} />

        <Menu show={show} className={"left bottom"} label={"left bottom"} list={list} frameid={"f0001"} />
        <Menu show={show} className={"center bottom"} label={"center bottom"} list={list} frameid={"f0001"} />
        <Menu show={show} className={"right bottom"} label={"right bottom"} list={list} frameid={"f0001"} />
      </Linebox>
    </StyledObject>
  );
};

export const color = () => {
  return (
    <StyledObject className={"t-main"} id={"f0001"}>
      <Linebox title={"color"} sample={samplecode('label={"menu"}', 'sky')}>
        <Menu show={show} className={"trans"} label={"trans"} list={list} frameid={"f0001"} />
        <Menu show={show} className={"sky"} label={"sky"} list={list} pos={1} frameid={"f0001"} />
        <Menu show={show} className={"orange"} label={"orange"} list={list} pos={1} frameid={"f0001"} />
      </Linebox>

      <Linebox title={""} sample={samplecode('label={"menu"}', 'primary')}>
        <Menu show={show} className={"green"} label={"green"} list={list} frameid={"f0001"} />
        <Menu show={show} className={"red"} label={"red"} list={list} pos={2} frameid={"f0001"} />
        <Menu show={show} className={"primary"} label={"primary"} list={list} frameid={"f0001"} />
      </Linebox>

      <Linebox title={""} sample={samplecode('label={"menu"}', 'dark')}>
        <Menu show={show} className={"gray"} label={"gray"} list={list} frameid={"f0001"} />
        <Menu show={show} className={"dark"} label={"dark"} list={list} pos={1} frameid={"f0001"} />
        <Menu show={show} className={"black"} label={"black"} list={list} frameid={"f0001"} />
      </Linebox>
    </StyledObject>
  );
};

export const disable = () => {
  return (
    <StyledObject className={"t-main"} id={"f0001"}>
      <Linebox title={"color"} sample={samplecode('label={"menu"}', 'sky')}>
        <Menu show={show} className={"trans"} label={"trans"} list={list} frameid={"f0001"} disable={true} />
        <Menu show={show} className={"sky"} label={"sky"} list={list} pos={1} frameid={"f0001"} disable={true} />
        <Menu show={show} className={"orange"} label={"orange"} list={list} pos={1} frameid={"f0001"} disable={true} />
      </Linebox>

      <Linebox title={""} sample={samplecode('label={"menu"}', 'primary')}>
        <Menu show={show} className={"green"} label={"green"} list={list} frameid={"f0001"} disable={true} />
        <Menu show={show} className={"red"} label={"red"} list={list} pos={2} frameid={"f0001"} disable={true} />
        <Menu show={show} className={"primary"} label={"primary"} list={list} frameid={"f0001"} disable={true} />
      </Linebox>

      <Linebox title={""} sample={samplecode('label={"menu"}', 'dark')}>
        <Menu show={show} className={"gray"} label={"gray"} list={list} frameid={"f0001"} disable={true} />
        <Menu show={show} className={"dark"} label={"dark"} list={list} pos={1} frameid={"f0001"} disable={true} />
        <Menu show={show} className={"black"} label={"black"} list={list} frameid={"f0001"} disable={true} />
      </Linebox>
    </StyledObject>
  );
};


export const font = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"no options"} className={""} sample={samplecode("", "")} box={false}>
        <Menu show={show} className={"primary"} label={"blue radius"} list={list} frameid={"f0001"} />
      </Linebox>

      <Linebox title={"font options(contents left)"} className={""}
        sample={samplecode("font={{ color: 'red', size: '12px' }}", "primary")} box={false}>
        <Menu show={show} className={"primary"} label={"blue radius"} list={list} frameid={"f0001"}
          font={{ color: 'red', size: '12px', align: 'left'}} />
      </Linebox>

      <Linebox title={"font options(contents center)"} className={""}
        sample={samplecode("font={{ color: 'blue', size: '16px' }}", "primary")} box={false}>
        <Menu show={show} className={"primary"} label={"blue radius"} list={list} frameid={"f0001"}
          font={{ color: 'blue', size: '16px', align: 'center'}} />
      </Linebox>

      <Linebox title={"font options(contents right)"} className={""}
        sample={samplecode("font={{ color: '#123456', size: '18px' }}", "primary")} box={false}>
        <Menu show={show} className={"primary"} label={"blue radius"} list={list} frameid={"f0001"}
          font={{ color: '#123456', size: '18px', align: 'right'}} />
      </Linebox>
    </StyledObject>
  );
};

export const border = () => {
  return (
    <StyledObject className={"t-main"} id={"f0001"}>
      <Linebox title={"border options"} sample={samplecode('label={"menu"}', 'border')}>
        <Menu show={show} className={"primary"} label={"blue radius"} list={list} frameid={"f0001"} border={{ radius: '5px', color: "blue" }} />
        <Menu show={show} className={"primary"} label={"red radius 2px"} list={list} frameid={"f0001"} border={{ radius: '10px', color: "red", width: "2px" }} />
        <Menu show={show} className={"primary"} label={"black radius 3px"} list={list} frameid={"f0001"} border={{ radius: '15px', color: "black", width: "3px" }} />
      </Linebox>
    </StyledObject>
  );
};

export const theme = () => {
  return (
    <StyledObject className={"t-main"} id={"f0001"}>
      <Linebox title={"theme"} top={option.top} sample={samplecode("theme={'sky'}", "sky")}>
        <Menu show={show} className={"primary"} list={list} frameid={"f0001"} theme={'sky'}>sky</Menu>
        <Menu show={show} className={"primary"} list={list} frameid={"f0001"} theme={'primary'}>primary</Menu>
        <Menu show={show} className={"primary"} list={list} frameid={"f0001"} theme={'gray'}>gray</Menu>
      </Linebox>

      <Linebox title={"theme"} top={option.top} sample={samplecode("theme={'sky'}", "sky")}>
        <Menu show={show} className={"primary"} list={list} frameid={"f0001"} theme={'dark'}>dark</Menu>
        <Menu show={show} className={"primary"} list={list} frameid={"f0001"} theme={'black'}>black</Menu>
      </Linebox>
    </StyledObject>
  );
};