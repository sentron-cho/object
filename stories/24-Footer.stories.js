/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { optionsKnob as options, withKnobs, text, boolean } from '@storybook/addon-knobs';
import styled from 'styled-components';
import cx from 'classnames/bind'
import { Linebox } from './00-Frame';
import { cs, Footer } from '../src';

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

export default { title: 'object|Footer', component: Footer, decorators: [withKnobs] };

const samplecode = (value, classname = '') => `<Footer className={"${classname}"} ${value} />`;

export const object = () => {
  const size = options('size',
    { 'none': '', 'sm(small)': 'sm', 'md(middle)': 'md', 'lg(large)': 'lg', 'xl(x large)': 'xl' },
    '', { display: 'inline-radio' }, 'Other');
  const bg = options('background',
    { none: '', sky: 'sky', primary: 'primary', gray: 'gray', dark: 'dark', black: 'black' },
    '', { display: 'inline-radio' }, 'Other');

  const isfont = boolean('font options', false);
  const fontcolor = text('font color', '#353535');
  const fontalign = options('font align', { 'left': 'left', 'center': 'center', 'right': 'right' },
    '', { display: 'inline-radio' }, 'Other');

  const isborder = boolean('border options', false);
  const border = isborder ? text('border color', '#909090') : '';
  const width = isborder ? text('border width', '1px') : '';

  const [result, setResult] = useState(null);

  const onChange = (hex, rgb, e) => {
    setResult(`onChange(hex = ${hex}, rgb = ${rgb}, e)`);
  }

  const opt = {
    border: isborder ? { color: border, width: width } : null,
    font: isfont ? { align: fontalign, color: fontcolor } : null,
  };

  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"toggle button"} className={"nomargin"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."} sample={samplecode("", "")} box={false}>
        <Footer className={cx(size, bg)} options={opt} label={'Footer'} clear={true} onChange={onChange} />
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
        <Footer className={"trans"} label={"trans"} />
        <Footer className={"sky"} label={"sky"} />
        <Footer className={"primary"} label={"primary"} />
        <Footer className={"gray"} label={"gray"} />
        <Footer className={"dark"} label={"dark"} />
        <Footer className={"black"} label={"black"} />
      </Linebox>
    </StyledObject>
  );
};


export const size = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"size"} sample={samplecode('type={"left"}', 'left')} >
        <Footer className={"dark"} label={"trans"} />
        <Footer className={"dark"} label={"gray"} />
        <Footer className={"dark"} label={"dark"} />
        <Footer className={"dark"} label={"black"} />
      </Linebox>
    </StyledObject>
  );
};

export const title = () => {
  return (
    <StyledObject className={"t-main"} id={"f0001"}>
      <Linebox title={"title options"} sample={samplecode('', 'sky')}>
        <Footer label={"trans"} options={{ font: { align: "left", color: "red" } }} />
        <Footer label={"trans"} options={{ font: { align: "center", color: "blue" } }} />
        <Footer label={"trans"} options={{ font: { align: "right", color: "black" } }} />
      </Linebox>
    </StyledObject>
  );
};

export const border = () => {
  return (
    <StyledObject className={"t-main"} id={"f0001"}>
      <Linebox title={"border options"} sample={samplecode('', 'sky')}>
        <Footer label={"trans"} options={{ border: { radius: '5px', color: "red", width: '1px' } }} />
        <Footer label={"trans"} options={{ border: { radius: '10px', color: "blue", width: '2px' } }} />
        <Footer label={"trans"}
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
        <Footer className={'primary'} label={"sky"} theme={'sky'} />
        <Footer className={'primary'} label={"primary"} theme={'primary'} />
        <Footer className={'primary'} label={"gray"} theme={'gray'} />
        <Footer className={'primary'} label={"dark"} theme={'dark'} />
        <Footer className={'primary'} label={"black"} theme={'black'} />
      </Linebox>
    </StyledObject>
  );
};