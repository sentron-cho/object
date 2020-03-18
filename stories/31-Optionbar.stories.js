import React, { useState } from 'react';
import { optionsKnob as options, withKnobs, text, boolean, radios, array, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';
import cx from 'classnames/bind'
import { Linebox } from './00-Frame';
import { cs, Optionbar } from '../src';

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
  title: 'object|Optionbar', // 스토리북에서 보여질 그룹과 경로를 명시
  component: Optionbar, // 어떤 컴포넌트를 문서화 할지 명시
  decorators: [withKnobs], // 애드온 적용
};

const samplecode = (value, classname = '') => `<Optionbar  className={"${classname}"} ${value} />`;
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
  const title = text('title', 'Optionbar');

  const [result, setResult] = useState(null);

  const onClick = (eid, e) => {
    setResult(`eid = ${eid}, e`);
  }

  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"Optionbar"} className={"v-align"} id={"f0001"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."} top={option.top}
        sample={samplecode('title={"Optionbar"} onClick={onClick} onChange={onChange}', 'primary')} box={true}>
        <Optionbar className={cx(classname, bg, size, halign, valign)} title={title}  onClick={onClick} />
      </Linebox>

      <div className={"res-view"}>
        <p>onClick</p>
        <p>{result}</p>
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
      <Linebox title={"size"} sample={samplecode('title={"Optionbar"}', 'primary')}>
        <Optionbar className={"xs border radius"} title={"No Data(xsmall)"} />
        <Optionbar className={"sm border radius"} title={"No Data(small)"} />
        <Optionbar className={"md border radius"} title={"No Data(middle)"} />
        <Optionbar className={"lg border radius"} title={"No Data(large)"} />
        <Optionbar className={"xl border radius"} title={"No Data(xlarge)"} />
      </Linebox>
    </StyledObject>
  );
};

export const align = () => {
  return (
    <StyledObject className={"t-main"} id={"f0001"}>
      <Linebox title={"horizontal align"} className={"align"} sample={samplecode('title={"Optionbar"}', '')} box={true}>
        <Optionbar className={"border left"} title={"No Data(left)"} />
        <Optionbar className={"border right"} title={"No Data(right)"} />
        <Optionbar className={"border center"} title={"No Data(center)"} />
      </Linebox>

      <Linebox title={"vertical align"} className={"align"} sample={samplecode('title={"Optionbar"}', '')} box={true}>
        <Optionbar className={"border top"} title={"No Data(top)"} />
        <Optionbar className={"border middle"} title={"No Data(middle)"} />
        <Optionbar className={"border bottom"} title={"No Data(bottom)"} />
      </Linebox>

      <Linebox title={"align"} className={"align"} mple={samplecode('title={"Optionbar"}', '')} box={true}>
        <Optionbar className={"border left top"} title={"No Data(left top)"} />
        <Optionbar className={"border center top"} title={"No Data(center top)"} />
        <Optionbar className={"border right top"} title={"No Data(right top)"} />

        <Optionbar className={"border left middle"} title={"No Data(left middle)"} />
        <Optionbar className={"border center middle"} title={"No Data(center middle)"} />
        <Optionbar className={"border right middle"} title={"No Data(right middle)"} />

        <Optionbar className={"border left bottom"} title={"No Data(left bottom)"} />
        <Optionbar className={"border center bottom"} title={"No Data(center bottom)"} />
        <Optionbar className={"border right bottom"} title={"No Data(right bottom)"} />
      </Linebox>
    </StyledObject>
  );
};

export const color = () => {
  return (
    <StyledObject className={"t-main"} id={"f0001"}>
      <Linebox title={"color"} sample={samplecode('title={"Optionbar"}', 'sky')}>
        <Optionbar className={"trans"} title={"trans"} />
        <Optionbar className={"sky"} title={"sky"} />
        <Optionbar className={"orange"} title={"orange"} />
      </Linebox>

      <Linebox title={""} sample={samplecode('title={"Optionbar"}', 'primary')}>
        <Optionbar className={"green"} title={"green"} />
        <Optionbar className={"red"} title={"red"} />
        <Optionbar className={"primary"} title={"primary"} />
      </Linebox>

      <Linebox title={""} sample={samplecode('title={"Optionbar"}', 'dark')}>
        <Optionbar className={"gray"} title={"gray"} />
        <Optionbar className={"dark"} title={"dark"} />
        <Optionbar className={"black"} title={"black"} />
      </Linebox>
    </StyledObject>
  );
};

export const font = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"no options"} className={""} sample={samplecode("", "")} box={false}>
        <Optionbar className={"primary"} title={"blue radius"} />
      </Linebox>

      <Linebox title={"font options(contents left)"} className={""}
        sample={samplecode("font={{ color: 'red', size: '12px' }}", "primary")} box={false}>
        <Optionbar className={"primary"} title={"blue radius"}  frameid={"f0001"}
          font={{ color: 'red', size: '12px'}} />
      </Linebox>

      <Linebox title={"font options(contents center)"} className={""}
        sample={samplecode("font={{ color: 'blue', size: '16px' }}", "primary")} box={false}>
        <Optionbar className={"primary"} title={"blue radius"}  frameid={"f0001"}
          font={{ color: 'blue', size: '16px'}} />
      </Linebox>

      <Linebox title={"font options(contents right)"} className={""}
        sample={samplecode("font={{ color: '#123456', size: '18px' }}", "primary")} box={false}>
        <Optionbar className={"primary"} title={"blue radius"}  frameid={"f0001"}
          font={{ color: '#123456', size: '18px'}} />
      </Linebox>
    </StyledObject>
  );
};

export const border = () => {
  return (
    <StyledObject className={"t-main"} id={"f0001"}>
      <Linebox title={"border options"} sample={samplecode('title={"Optionbar"}', 'border')}>
        <Optionbar className={"primary"} title={"blue radius"}  border={{ radius: '5px', color: "blue" }} />
        <Optionbar className={"primary"} title={"red radius 2px"}  border={{ radius: '10px', color: "red", width: "2px" }} />
        <Optionbar className={"primary"} title={"black radius 3px"}  border={{ radius: '15px', color: "black", width: "3px" }} />
      </Linebox>
    </StyledObject>
  );
};

export const theme = () => {
  return (
    <StyledObject className={"t-main"} id={"f0001"}>
      <Linebox title={"theme"} top={option.top} sample={samplecode("theme={'sky'}", "sky")}>
        <Optionbar className={"primary"} theme={'sky'} />
        <Optionbar className={"primary"} theme={'primary'} />
        <Optionbar className={"primary"} theme={'gray'} />
      </Linebox>

      <Linebox title={"theme"} top={option.top} sample={samplecode("theme={'sky'}", "sky")}>
        <Optionbar className={"primary"} theme={'dark'} />
        <Optionbar className={"primary"} theme={'black'} />
      </Linebox>
    </StyledObject>
  );
};