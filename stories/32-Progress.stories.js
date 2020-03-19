import React, { useState } from 'react';
import { optionsKnob as options, withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import styled from 'styled-components';
import cx from 'classnames/bind'
import { Linebox } from './00-Frame';
import { cs, Progress } from '../src';

const StyledObject = styled.span`{
  &.t-main {
    .lb-box { ${cs.w.get(800)} ${cs.p.b30} }
    .lb-box .lb-li { ${cs.min.height(100)} overflow: initial; }
    .lb-box .lb-li > * { ${cs.m.right(100)} ${cs.m.b20} }
    .res-view { 
      ${cs.h.get(100)} ${cs.w.get(800)} ${cs.bg.lightgray} 
      p { ${cs.m.a5} }
    }
  }
}`;

export default {
  title: 'object|Progress', // 스토리북에서 보여질 그룹과 경로를 명시
  component: Progress, // 어떤 컴포넌트를 문서화 할지 명시
  decorators: [withKnobs], // 애드온 적용
};

const samplecode = (value, classname = '') => `<Progress  className={"${classname}"} ${value} />`;
export const sobject = () => {

  const size = options('size',
    { 'md(middle)': 'md', 'xl(xlarge)': 'xl', 'lg(large)': 'lg', 'sm(small)': 'sm', 'xs(xsmall)': 'xs' },
    '', { display: 'inline-radio' }, 'Other');
  const bg = options('background',
    { trans: 'trans', orange: 'orange', green: 'green', red: 'red', primary: 'primary', gray: 'gray', dark: 'dark', black: 'black' },
    '', { display: 'inline-radio' }, 'Other');
  const label = text('label', '');

  const max = number('max value', 100);
  const min = number('min value', 0);
  const current = number('current value', 50);
  const limit = number('limit value(alert limit)', 80);

  const [result, setResult] = useState(null);

  const onClick = (eid, e) => {
    setResult(`eid = ${eid}, e`);
  }

  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"Progress"} className={""} id={"f0001"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."} top={option.top}
        sample={samplecode('title={"Progress"} onClick={onClick} onChange={onChange}', 'primary')} box={true}>
        <Progress className={cx(bg, size)} label={label} onClick={onClick} 
          max={max} min={min} value={current} limit={limit} />
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

export const size = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"size"} sample={samplecode('', 'xs border radius')}>
        <Progress className={"xs border radius"} max={100} min={0} value={10} limit={80} label={"No Data(xsmall)"} />
        <Progress className={"sm border radius"} max={100} min={0} value={30} limit={80} label={"No Data(small)"} />
        <Progress className={"md border radius"} max={100} min={0} value={50} limit={80} label={"No Data(middle)"} />
        <Progress className={"lg border radius"} max={100} min={0} value={70} limit={80} label={"No Data(large)"} />
        <Progress className={"xl border radius"} max={100} min={0} value={90} limit={95} label={"No Data(xlarge)"} />
      </Linebox>

      <Linebox title={"size"} sample={samplecode('', 'xs border radius')}>
        <Progress className={"xs border radius"} max={100} min={0} value={10} limit={10} label={"No Data(xsmall)"} />
        <Progress className={"sm border radius"} max={100} min={0} value={30} limit={10} label={"No Data(small)"} />
        <Progress className={"md border radius"} max={100} min={0} value={50} limit={10} label={"No Data(middle)"} />
        <Progress className={"lg border radius"} max={100} min={0} value={70} limit={10} label={"No Data(large)"} />
        <Progress className={"xl border radius"} max={100} min={0} value={90} limit={10} label={"No Data(xlarge)"} />
      </Linebox>      
    </StyledObject>
  );
};

export const color = () => {
  return (
    <StyledObject className={"t-main"} id={"f0001"}>
      <Linebox title={"color"} sample={samplecode('title={"Progress"}', 'sky')}>
        <Progress className={"trans"} max={100} min={0} value={50} limit={80} label={"trans"} />
        <Progress className={"sky"} max={100} min={0} value={50} limit={80} label={"sky"} />
        <Progress className={"orange"} max={100} min={0} value={50} limit={80} label={"orange"} />
        <Progress className={"green"} max={100} min={0} value={50} limit={80} label={"green"} />
        <Progress className={"red"} max={100} min={0} value={50} limit={80} label={"red"} />
        <Progress className={"primary"} max={100} min={0} value={50} limit={80} label={"primary"} />
        <Progress className={"gray"} max={100} min={0} value={50} limit={80} label={"gray"} />
        <Progress className={"dark"} max={100} min={0} value={50} limit={80} label={"dark"} />
        <Progress className={"black"} max={100} min={0} value={50} limit={80} label={"black"} />
      </Linebox>

      <Linebox title={"color"} sample={samplecode('title={"Progress"}', 'sky')}>
        <Progress className={"trans"} max={100} min={0} value={90} limit={80} label={"trans"} />
        <Progress className={"sky"} max={100} min={0} value={90} limit={80} label={"sky"} />
        <Progress className={"orange"} max={100} min={0} value={90} limit={80} label={"orange"} />
        <Progress className={"green"} max={100} min={0} value={90} limit={80} label={"green"} />
        <Progress className={"red"} max={100} min={0} value={90} limit={80} label={"red"} />
        <Progress className={"primary"} max={100} min={0} value={90} limit={80} label={"primary"} />
        <Progress className={"gray"} max={100} min={0} value={90} limit={80} label={"gray"} />
        <Progress className={"dark"} max={100} min={0} value={90} limit={80} label={"dark"} />
        <Progress className={"black"} max={100} min={0} value={90} limit={80} label={"black"} />
      </Linebox>      
    </StyledObject>
  );
};

export const border = () => {
  return (
    <StyledObject className={"t-main"} id={"f0001"}>
      <Linebox title={"border options"} sample={samplecode('title={"Progress"}', 'border')}>
        <Progress className={"primary"} max={100} min={0} value={10} limit={80} border={{ radius: '5px', color: "blue" }} />
        <Progress className={"primary"} max={100} min={0} value={10} limit={80} border={{ radius: '10px', color: "red", width: "2px" }} />
        <Progress className={"primary"} max={100} min={0} value={10} limit={80} border={{ radius: '15px', color: "black", width: "3px" }} />
      </Linebox>
    </StyledObject>
  );
};

export const theme = () => {
  return (
    <StyledObject className={"t-main"} id={"f0001"}>
      <Linebox title={"theme"} top={option.top} sample={samplecode("theme={'sky'}", "sky")}>
        <Progress className={"primary"} max={100} min={0} value={10} limit={80} theme={'sky'} />
        <Progress className={"primary"} max={100} min={0} value={10} limit={80} theme={'primary'} />
        <Progress className={"primary"} max={100} min={0} value={10} limit={80} theme={'gray'} />
        <Progress className={"primary"} max={100} min={0} value={10} limit={80} theme={'dark'} />
        <Progress className={"primary"} max={100} min={0} value={10} limit={80} theme={'black'} />
      </Linebox>
    </StyledObject>
  );
};