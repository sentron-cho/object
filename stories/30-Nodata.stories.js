import React, { useState } from 'react';
import { optionsKnob as options, withKnobs, text, boolean, radios, array, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';
import cx from 'classnames/bind'
import { Linebox } from './00-Frame';
import { cs, Nodata } from '../src';

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
  title: 'object|Nodata', // 스토리북에서 보여질 그룹과 경로를 명시
  component: Nodata, // 어떤 컴포넌트를 문서화 할지 명시
  decorators: [withKnobs], // 애드온 적용
};

const samplecode = (value, classname = '') => `<Nodata  className={"${classname}"} ${value} />`;
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
  const title = text('title', 'Nodata');
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
      <Linebox title={"Nodata"} className={"v-align"} id={"f0001"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."} top={option.top}
        sample={samplecode('title={"Nodata"} onClick={onClick} onChange={onChange}', 'primary')} box={true}>
        <Nodata className={cx(classname, bg, size, halign, valign)} title={title}  onClick={onClick} />
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
      <Linebox title={"size"} sample={samplecode('title={"Nodata"}', 'primary')}>
        <Nodata className={"xs border radius"} title={"No Data(xsmall)"} />
        <Nodata className={"sm border radius"} title={"No Data(small)"} />
        <Nodata className={"md border radius"} title={"No Data(middle)"} />
        <Nodata className={"lg border radius"} title={"No Data(large)"} />
        <Nodata className={"xl border radius"} title={"No Data(xlarge)"} />
      </Linebox>
    </StyledObject>
  );
};

export const align = () => {
  return (
    <StyledObject className={"t-main"} id={"f0001"}>
      <Linebox title={"horizontal align"} className={"align"} sample={samplecode('title={"Nodata"}', '')} box={true}>
        <Nodata className={"border left"} title={"No Data(left)"} />
        <Nodata className={"border right"} title={"No Data(right)"} />
        <Nodata className={"border center"} title={"No Data(center)"} />
      </Linebox>

      <Linebox title={"vertical align"} className={"align"} sample={samplecode('title={"Nodata"}', '')} box={true}>
        <Nodata className={"border top"} title={"No Data(top)"} />
        <Nodata className={"border middle"} title={"No Data(middle)"} />
        <Nodata className={"border bottom"} title={"No Data(bottom)"} />
      </Linebox>

      <Linebox title={"align"} className={"align"} mple={samplecode('title={"Nodata"}', '')} box={true}>
        <Nodata className={"border left top"} title={"No Data(left top)"} />
        <Nodata className={"border center top"} title={"No Data(center top)"} />
        <Nodata className={"border right top"} title={"No Data(right top)"} />

        <Nodata className={"border left middle"} title={"No Data(left middle)"} />
        <Nodata className={"border center middle"} title={"No Data(center middle)"} />
        <Nodata className={"border right middle"} title={"No Data(right middle)"} />

        <Nodata className={"border left bottom"} title={"No Data(left bottom)"} />
        <Nodata className={"border center bottom"} title={"No Data(center bottom)"} />
        <Nodata className={"border right bottom"} title={"No Data(right bottom)"} />
      </Linebox>
    </StyledObject>
  );
};

export const color = () => {
  return (
    <StyledObject className={"t-main"} id={"f0001"}>
      <Linebox title={"color"} sample={samplecode('title={"Nodata"}', 'sky')}>
        <Nodata className={"trans"} title={"trans"} />
        <Nodata className={"sky"} title={"sky"} />
        <Nodata className={"orange"} title={"orange"} />
      </Linebox>

      <Linebox title={""} sample={samplecode('title={"Nodata"}', 'primary')}>
        <Nodata className={"green"} title={"green"} />
        <Nodata className={"red"} title={"red"} />
        <Nodata className={"primary"} title={"primary"} />
      </Linebox>

      <Linebox title={""} sample={samplecode('title={"Nodata"}', 'dark')}>
        <Nodata className={"gray"} title={"gray"} />
        <Nodata className={"dark"} title={"dark"} />
        <Nodata className={"black"} title={"black"} />
      </Linebox>
    </StyledObject>
  );
};

export const font = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"no options"} className={""} sample={samplecode("", "")} box={false}>
        <Nodata className={"primary"} title={"blue radius"} />
      </Linebox>

      <Linebox title={"font options(contents left)"} className={""}
        sample={samplecode("font={{ color: 'red', size: '12px' }}", "primary")} box={false}>
        <Nodata className={"primary"} title={"blue radius"}  frameid={"f0001"}
          font={{ color: 'red', size: '12px'}} />
      </Linebox>

      <Linebox title={"font options(contents center)"} className={""}
        sample={samplecode("font={{ color: 'blue', size: '16px' }}", "primary")} box={false}>
        <Nodata className={"primary"} title={"blue radius"}  frameid={"f0001"}
          font={{ color: 'blue', size: '16px'}} />
      </Linebox>

      <Linebox title={"font options(contents right)"} className={""}
        sample={samplecode("font={{ color: '#123456', size: '18px' }}", "primary")} box={false}>
        <Nodata className={"primary"} title={"blue radius"}  frameid={"f0001"}
          font={{ color: '#123456', size: '18px'}} />
      </Linebox>
    </StyledObject>
  );
};

export const border = () => {
  return (
    <StyledObject className={"t-main"} id={"f0001"}>
      <Linebox title={"border options"} sample={samplecode('title={"Nodata"}', 'border')}>
        <Nodata className={"primary"} title={"blue radius"}  border={{ radius: '5px', color: "blue" }} />
        <Nodata className={"primary"} title={"red radius 2px"}  border={{ radius: '10px', color: "red", width: "2px" }} />
        <Nodata className={"primary"} title={"black radius 3px"}  border={{ radius: '15px', color: "black", width: "3px" }} />
      </Linebox>
    </StyledObject>
  );
};

export const theme = () => {
  return (
    <StyledObject className={"t-main"} id={"f0001"}>
      <Linebox title={"theme"} top={option.top} sample={samplecode("theme={'sky'}", "sky")}>
        <Nodata className={"primary"} theme={'sky'} />
        <Nodata className={"primary"} theme={'primary'} />
        <Nodata className={"primary"} theme={'gray'} />
      </Linebox>

      <Linebox title={"theme"} top={option.top} sample={samplecode("theme={'sky'}", "sky")}>
        <Nodata className={"primary"} theme={'dark'} />
        <Nodata className={"primary"} theme={'black'} />
      </Linebox>
    </StyledObject>
  );
};