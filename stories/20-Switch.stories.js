/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { optionsKnob as options, withKnobs, text, boolean } from '@storybook/addon-knobs';
import styled from 'styled-components';
import cx from 'classnames/bind'
import { Linebox } from './00-Frame';
import { cs, Switch } from '../src';

const StyledObject = styled.span`{
  &.t-main {
    .lb-box { ${cs.w.get(800)} ${cs.p.b30} }

    .lb-box.align .lb-li { ${cs.min.height(140)} & > * { ${cs.m.r0} } }

    .res-view { 
      ${cs.h.get(100)} ${cs.w.get(800)} ${cs.bg.lightgray} 
      p { ${cs.m.a5} }
    }
  }
}`;

export default { title: 'object|Switch', component: Switch, decorators: [withKnobs] };

const samplecode = (value, classname = '') => `<Switch className={"${classname}"} ${value} />`;

export const object = () => {
  const size = options('size',
    { 'none': '', 'xs(x small)': 'xs', 'sm(small)': 'sm', 'md(middle)': 'md', 'lg(large)': 'lg' },
    '', { display: 'inline-radio' }, 'Other');
  const bg = options('background',
    { none: '', trans: 'trans', orange: 'orange', green: 'green', red: 'red', primary: 'primary', gray: 'gray', dark: 'dark', black: 'black' },
    '', { display: 'inline-radio' }, 'Other');
  const label = text('label', 'switch');
  const symbol = boolean('symbol type', false);
  const on = text('on title', 'ON');
  const off = text('off title', 'OFF');
  const isborder = boolean('border', false);
  const fontcolor = text('fontcolor', '#353535');
  const fontalign = options('align', { 'left': 'left', 'center': 'center', 'right': 'right' },
    '', { display: 'inline-radio' }, 'Other');
  const border = isborder ? text('border color', '#909090') : '';
  const radius = isborder ? text('border radius', '1px') : '';
  const width = isborder ? text('border width', '1px') : '';

  const [result, setResult] = useState(null);

  const onClick = (eid, checked, e) => {
    setResult(`onClick(eid = ${eid}, checked = ${checked}, e)`);
  }

  const opt = {
    border: isborder ? { radius: radius, color: border, width: width } : null,
    label: { align: fontalign, color: fontcolor }
  };
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"switch button"} className={"nomargin"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."} sample={samplecode("", "")} box={false}>
        <Switch className={cx(size, bg)} label={label} symbol={symbol}
          options={opt} on={on} off={off} onClick={onClick} />
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
  return (
    <StyledObject className={"t-main"} >
      <Linebox title={"size"} sample={samplecode('', 'xs')}>
        <Switch className={"xs"} label={"xsmall"} onClick={() => { }} />
        <Switch className={"sm"} label={"small"} onClick={() => { }} />
        <Switch className={""} label={"no size"} onClick={() => { }} />
        <Switch className={"lg"} label={"large"} onClick={() => { }} />
      </Linebox>

      <Linebox title={"size"} sample={samplecode('', 'xs')}>
        <Switch className={"xs"} label={"xsmall"} symbol={true} onClick={() => { }} />
        <Switch className={"sm"} label={"small"} symbol={true} onClick={() => { }} />
        <Switch className={""} label={"no size"} symbol={true} onClick={() => { }} />
        <Switch className={"lg"} label={"large"} symbol={true} onClick={() => { }} />
      </Linebox>
    </StyledObject>
  );
};

export const align = () => {
  return (
    <StyledObject className={"t-main"} >
      <Linebox title={"horizontal align"} className={"nomargin"} sample={samplecode('label={"combo"}', '')} box={true}>
        <Switch className={"left"} label={"left"} />
        <Switch className={"right"} label={"right"} />
        <Switch className={"center"} label={"center"} />
      </Linebox>

      <Linebox title={"vertical align"} className={"align"} sample={samplecode('label={"combo"}', '')} box={true}>
        <Switch className={"top"} label={"top"} />
        <Switch className={"middle"} label={"middle"} />
        <Switch className={"bottom"} label={"bottom"} />
      </Linebox>

      <Linebox title={"align"} className={"align v-align"} mple={samplecode('label={"combo"}', '')} box={true}>
        <Switch className={"left top"} label={"left top"} />
        <Switch className={"center top"} label={"center top"} />
        <Switch className={"right top"} label={"right top"} />

        <Switch className={"left middle"} label={"left middle"} />
        <Switch className={"center middle"} label={"center middle"} />
        <Switch className={"right middle"} label={"right middle"} />

        <Switch className={"left bottom"} label={"left bottom"} />
        <Switch className={"center bottom"} label={"center bottom"} />
        <Switch className={"right bottom"} label={"right bottom"} />
      </Linebox>

      <Linebox title={"no label align"} className={"align v-align"} mple={samplecode('label={"combo"}', '')} box={true}>
        <Switch className={"left top"} />
        <Switch className={"center top"} />
        <Switch className={"right top"} />

        <Switch className={"left middle"} />
        <Switch className={"center middle"} />
        <Switch className={"right middle"} />

        <Switch className={"left bottom"} />
        <Switch className={"center bottom"} />
        <Switch className={"right bottom"} />
      </Linebox>

      <Linebox title={"symbol align"} className={"align v-align"} mple={samplecode('label={"combo"}', '')} box={true}>
        <Switch symbol={true} className={"left top"} />
        <Switch symbol={true} className={"center top"} />
        <Switch symbol={true} className={"right top"} />
        <Switch symbol={true} className={"left middle"} />
        <Switch symbol={true} className={"center middle"} />
        <Switch symbol={true} className={"right middle"} />
        <Switch symbol={true} className={"left bottom"} />
        <Switch symbol={true} className={"center bottom"} />
        <Switch symbol={true} className={"right bottom"} />
      </Linebox>
    </StyledObject>
  );
};

export const color = () => {
  return (
    <StyledObject className={"t-main"} >
      <Linebox title={"color"} sample={samplecode('label={"combo"}', 'sky')}>
        <Switch className={"trans"} label={"trans"} />
        <Switch className={"sky"} label={"sky"} />
        <Switch className={"orange"} label={"orange"} />
        <Switch className={"green"} label={"green"} />
        <Switch className={"red"} label={"red"} pos={2} />
        <Switch className={"primary"} label={"primary"} />
        <Switch className={"gray"} label={"gray"} />
        <Switch className={"dark"} label={"dark"} />
        <Switch className={"black"} label={"black"} />
      </Linebox>

      <Linebox title={"color"} sample={samplecode('label={"combo"}', 'sky')}>
        <Switch symbol={true} className={"trans"} label={"trans"} />
        <Switch symbol={true} className={"sky"} label={"sky"} />
        <Switch symbol={true} className={"orange"} label={"orange"} />
        <Switch symbol={true} className={"green"} label={"green"} />
        <Switch symbol={true} className={"red"} label={"red"} pos={2} />
        <Switch symbol={true} className={"primary"} label={"primary"} />
        <Switch symbol={true} className={"gray"} label={"gray"} />
        <Switch symbol={true} className={"dark"} label={"dark"} />
        <Switch symbol={true} className={"black"} label={"black"} />
      </Linebox>
    </StyledObject>
  );
};

export const disable = () => {
  return (
    <StyledObject className={"t-main"} >
      <Linebox title={"color"} sample={samplecode('label={"combo"}', 'sky')}>
        <Switch className={"trans"} label={"trans"} disable={true} />
        <Switch className={"sky"} label={"sky"} disable={true} />
        <Switch className={"orange"} label={"orange"} disable={true} />
        <Switch className={"green"} label={"green"} disable={true} />
        <Switch className={"red"} label={"red"} pos={2} disable={true} />
        <Switch className={"primary"} label={"primary"} disable={true} />
        <Switch className={"gray"} label={"gray"} disable={true} />
        <Switch className={"dark"} label={"dark"} disable={true} />
        <Switch className={"black"} label={"black"} disable={true} />
      </Linebox>

      <Linebox title={"color"} sample={samplecode('label={"combo"}', 'sky')}>
        <Switch symbol={true} className={"trans"} label={"trans"} disable={true} />
        <Switch symbol={true} className={"sky"} label={"sky"} disable={true} />
        <Switch symbol={true} className={"orange"} label={"orange"} disable={true} />
        <Switch symbol={true} className={"green"} label={"green"} disable={true} />
        <Switch symbol={true} className={"red"} label={"red"} pos={2} disable={true} />
        <Switch symbol={true} className={"primary"} label={"primary"} disable={true} />
        <Switch symbol={true} className={"gray"} label={"gray"} disable={true} />
        <Switch symbol={true} className={"dark"} label={"dark"} disable={true} />
        <Switch symbol={true} className={"black"} label={"black"} disable={true} />
      </Linebox>
    </StyledObject>
  );
};


export const label = () => {
  return (
    <StyledObject className={"t-main"} >
      <Linebox title={"label align"} sample={samplecode('label={"combo"}', 'primary')}>
        <Switch className={""} label={"left"} options={{ label: { align: "left", color: "red" } }} />
        <Switch className={""} label={"center"} options={{ label: { align: "center", color: "green" } }} />
        <Switch className={""} label={"right"} options={{ label: { align: "right", color: "blue" } }} />
      </Linebox>

      <Linebox title={"label align"} sample={samplecode('label={"combo"}', 'primary')}>
        <Switch className={""} symbol={true} label={"left"} options={{ label: { align: "left", color: "red" } }} />
        <Switch className={""} symbol={true} label={"center"} options={{ label: { align: "center", color: "green" } }} />
        <Switch className={""} symbol={true} label={"right"} options={{ label: { align: "right", color: "blue" } }} />
      </Linebox>
    </StyledObject>
  );
};

export const border = () => {
  return (
    <StyledObject className={"t-main"} >
      <Linebox title={"border options"} sample={samplecode('label={"combo"}', 'border')}>
        <Switch className={"primary"} label={"blue radius"} options={{ border: { radius: '5px', color: "blue" } }} />
        <Switch className={"primary"} label={"red radius 10px"} options={{ border: { radius: '10px', color: "red", width: "2px" } }} />
        <Switch className={"primary"} label={"black radius 15px"} options={{ border: { radius: '15px', color: "black", width: "3px" } }} />
        <Switch className={"primary"} label={"black radius 30px"} options={{ border: { radius: '30px', color: "blue", width: "3px" } }} />
      </Linebox>

      <Linebox title={"border options"} sample={samplecode('label={"combo"}', 'border')}>
        <Switch className={"primary"} symbol={true} label={"blue radius"} options={{ border: { radius: '5px', color: "blue" } }} />
        <Switch className={"primary"} symbol={true} label={"red radius 10px"} options={{ border: { radius: '10px', color: "red", width: "2px" } }} />
        <Switch className={"primary"} symbol={true} label={"black radius 15px"} options={{ border: { radius: '15px', color: "black", width: "3px" } }} />
        <Switch className={"primary"} symbol={true} label={"black radius 30px"} options={{ border: { radius: '30px', color: "blue", width: "3px" } }} />
      </Linebox>
    </StyledObject>
  );
};

export const theme = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"theme"} sample={samplecode("theme={'sky'}", "sky")}>
        <Switch className={'primary'} label={"sky"} theme={'sky'} />
        <Switch className={'primary'} label={"primary"} theme={'primary'} />
        <Switch className={'primary'} label={"gray"} theme={'gray'} />
        <Switch className={'primary'} label={"dark"} theme={'dark'} />
        <Switch className={'primary'} label={"black"} theme={'black'} />
      </Linebox>

      <Linebox title={"theme"} sample={samplecode("theme={'sky'}", "sky")}>
        <Switch className={'primary'} symbol={true} label={"sky"} theme={'sky'} />
        <Switch className={'primary'} symbol={true} label={"primary"} theme={'primary'} />
        <Switch className={'primary'} symbol={true} label={"gray"} theme={'gray'} />
        <Switch className={'primary'} symbol={true} label={"dark"} theme={'dark'} />
        <Switch className={'primary'} symbol={true} label={"black"} theme={'black'} />
      </Linebox>      
    </StyledObject>
  );
};