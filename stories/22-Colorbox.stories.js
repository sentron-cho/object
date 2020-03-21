/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { optionsKnob as options, withKnobs, text, boolean } from '@storybook/addon-knobs';
import styled from 'styled-components';
import cx from 'classnames/bind'
import { Linebox } from './00-Frame';
import { cs, Colorbox } from '../src';

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

export default { title: 'object|Colorbox', component: Colorbox, decorators: [withKnobs] };

const samplecode = (value, classname = '') => `<Colorbox className={"${classname}"} ${value} />`;

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
        <Colorbox className={cx(size, bg)} options={opt} label={'colorbox'} clear={true} onChange={onChange} />
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
        <Colorbox clear={true} className={"trans"} label={"trans"} />
        <Colorbox clear={true} className={"sky"} label={"sky"} />
        <Colorbox clear={true} className={"orange"} label={"orange"} />
        <Colorbox clear={true} className={"green"} label={"green"} />
        <Colorbox clear={true} className={"red"} label={"red"} />
        <Colorbox clear={true} className={"primary"} label={"primary"} />
        <Colorbox clear={true} className={"gray"} label={"gray"} />
        <Colorbox clear={true} className={"dark"} label={"dark"} />
        <Colorbox clear={true} className={"black"} label={"black"} />
      </Linebox>
    </StyledObject>
  );
};

export const title = () => {
  return (
    <StyledObject className={"t-main"} id={"f0001"}>
      <Linebox title={"title options"} sample={samplecode('', 'sky')}>
        <Colorbox label={"trans"} options={{ title: { align: "left", color: "red" } }} />
        <Colorbox label={"trans"} options={{ title: { align: "center", color: "blue" } }} />
        <Colorbox label={"trans"} options={{ title: { align: "right", color: "black" } }} />
      </Linebox>
    </StyledObject>
  );
};

export const border = () => {
  return (
    <StyledObject className={"t-main"} id={"f0001"}>
      <Linebox title={"border options"} sample={samplecode('', 'sky')}>
        <Colorbox label={"trans"} options={{ border: { radius: '5px', color: "red", width: '1px' } }} />
        <Colorbox label={"trans"} options={{ border: { radius: '10px', color: "blue", width: '2px' } }} />
        <Colorbox label={"trans"}
          options={{ border: { radius: '20px', color: "black", width: '3px' }, title: { align: "center" } }}
        />
      </Linebox>
    </StyledObject>
  );
};


export const theme = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"theme"} sample={samplecode("theme={'sky'}", "sky")}>
        <Colorbox className={'primary'} label={"sky"} theme={'sky'} />
        <Colorbox className={'primary'} label={"primary"} theme={'primary'} />
        <Colorbox className={'primary'} label={"gray"} theme={'gray'} />
        <Colorbox className={'primary'} label={"dark"} theme={'dark'} />
        <Colorbox className={'primary'} label={"black"} theme={'black'} />
      </Linebox>
    </StyledObject>
  );
};