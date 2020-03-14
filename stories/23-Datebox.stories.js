import React, { useState } from 'react';
import { optionsKnob as options, withKnobs, text, boolean, radios, number, button } from '@storybook/addon-knobs';
import styled from 'styled-components';
import cx from 'classnames/bind'
import { Linebox } from './00-Frame';
import { cs, Datebox, Util } from '../src';

const StyledObject = styled.span`{
  &.t-main {
    .lb-box { ${cs.w.get(800)} ${cs.p.b30} }

    .lb-box .lb-li > * { ${cs.m.b10} }

    .res-view { 
      ${cs.h.get(100)} ${cs.w.get(800)} ${cs.bg.lightgray} 
      p { ${cs.m.a5} }
    }    
  }
}`;

export default { title: 'object|Datebox', component: Datebox, decorators: [withKnobs] };

const samplecode = (value, classname = '') => `<Datebox className={"${classname}"} ${value} />`;

const list = [
  { eid: 'card', title: 'card', icon: 'thead' },
  { eid: 'list', title: 'list', icon: 'list' },
  { eid: 'menu', title: 'menu', icon: 'menu' },
  { eid: 'user', title: 'user', icon: 'user' },
]

export const object = () => {
  const size = options('size',
    { 'none': '', 'xs(x small)': 'xs', 'sm(small)': 'sm', 'md(middle)': 'md', 'lg(large)': 'lg', 'xl(x large)': 'xl' },
    '', { display: 'inline-radio' }, 'Other');
  const bg = options('background',
    { none: '', primary: 'primary', orange: 'orange', green: 'green', red: 'red', gray: 'gray', dark: 'dark', black: 'black' },
    '', { display: 'inline-radio' }, 'Other');

  const istitle = boolean('title options', false);
  const titlecolor = text('title color', '#353535');
  const titlealign = options('title align', { 'left': 'left', 'center': 'center', 'right': 'right' },
    '', { display: 'inline-radio' }, 'Other');

  const isborder = boolean('border options', false);
  const border = isborder ? text('border color', '#909090') : '';
  const radius = isborder ? text('border radius', '1px') : '';
  const width = isborder ? text('border width', '1px') : '';

  const [result, setResult] = useState(null);

  const onChange = (hex, rgb, e) => {
    setResult(`onChange(hex = ${hex}, rgb = ${rgb}, e)`);
  }

  const opt = {
    border: isborder ? { radius: radius, color: border, width: width } : null,
    title: istitle ? { align: titlealign, color: titlecolor } : null,
  };

  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"toggle button"} className={"nomargin"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."} sample={samplecode("", "")} box={false}>
        <Datebox className={cx(size, bg)} options={opt} label={'Datebox'} clear={true} onChange={onChange} />
      </Linebox>

      <div className={"res-view"}>
        <p>onClick</p>
        <p>{result}</p>
      </div>
    </StyledObject>
  );
};

object.story = { name: 'Base' };


export const color = () => {
  return (
    <StyledObject className={"t-main"} id={"f0001"}>
      <Linebox title={"color"} sample={samplecode('', 'sky')}>
        <Datebox clear={true} className={"trans"} label={"trans"} />
        <Datebox clear={true} className={"sky"} label={"sky"} />
        <Datebox clear={true} className={"orange"} label={"orange"} />
        <Datebox clear={true} className={"green"} label={"green"} />
        <Datebox clear={true} className={"red"} label={"red"} />
        <Datebox clear={true} className={"primary"} label={"primary"} />
        <Datebox clear={true} className={"gray"} label={"gray"} />
        <Datebox clear={true} className={"dark"} label={"dark"} />
        <Datebox clear={true} className={"black"} label={"black"} />
      </Linebox>
    </StyledObject>
  );
};

export const title = () => {
  return (
    <StyledObject className={"t-main"} id={"f0001"}>
      <Linebox title={"title options"} sample={samplecode('', 'sky')}>
        <Datebox label={"trans"} options={{ title: { align: "left", color: "red" } }} />
        <Datebox label={"trans"} options={{ title: { align: "center", color: "blue" } }} />
        <Datebox label={"trans"} options={{ title: { align: "right", color: "black" } }} />
      </Linebox>
    </StyledObject>
  );
};

export const border = () => {
  return (
    <StyledObject className={"t-main"} id={"f0001"}>
      <Linebox title={"border options"} sample={samplecode('', 'sky')}>
        <Datebox label={"trans"} options={{ border: { radius: '5px', color: "red", width: '1px' } }} />
        <Datebox label={"trans"} options={{ border: { radius: '10px', color: "blue", width: '2px' } }} />
        <Datebox label={"trans"}
          options={{ border: { radius: '20px', color: "black", width: '3px' }, title: { align: "center" } }}
        />
      </Linebox>
    </StyledObject>
  );
};