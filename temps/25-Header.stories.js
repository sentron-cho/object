import React, { useState } from 'react';
import { optionsKnob as options, withKnobs, text, boolean, radios, number, button } from '@storybook/addon-knobs';
import styled from 'styled-components';
import cx from 'classnames/bind'
import { Linebox } from './00-Frame';
import { cs, Header, Util } from '../src';

const StyledObject = styled.span`{
  &.t-main {
    .lb-box { ${cs.w.auto} ${cs.p.b30} }

    .lb-box .lb-li > * { ${cs.m.b10} }

    .lb-box.scroll { ${cs.h.fit} ${cs.w.get(800)} ${cs.box.line} 
      .header .nav-frame { ${cs.w.get('800px !important')} &.float { ${cs.top(0)} } }
      .lb-li { ${cs.w.full} ${cs.m.a0} }
      .lb-li > * { ${cs.m.a0} }

      .s-1 { ${cs.h.get(600)} ${cs.bg.gray} }
      .s-2 { ${cs.h.get(600)} ${cs.bg.lightgray} }
      .s-3 { ${cs.h.get(600)} ${cs.bg.darkgray} }
    }

    .res-view { 
      ${cs.h.get(100)} ${cs.w.get(800)} ${cs.bg.lightgray} 
      p { ${cs.m.a5} }
    }    
  }
}`;

export default { title: 'object|Header', component: Header, decorators: [withKnobs] };

const samplecode = (value, classname = '') => `<Header className={"${classname}"} ${value} />`;
const list = [
  { id: 'widget', name: 'widget', url: '?path=/story/object-widgetbox--object' },
  { id: 'daum', name: 'daum', url: 'http://www.daum.net' },
  { id: 'google', name: 'google', url: 'http://www.google.com' }];

export const object = () => {
  const bg = options('background',
    { none: '', sky: 'sky', primary: 'primary', gray: 'gray', dark: 'dark', black: 'black' },
    '', { display: 'inline-radio' }, 'Other');

  const isfont = boolean('font options', false);
  const fontcolor = isfont ? text('font color', '#353535') : '';
  const fontsize = isfont ? text('font size', '16px') : '';
  const fonthover = isfont ? text('font hover color', '#35ff35') : '';

  const istitle = boolean('font options', false);
  const titlecolor = isfont ? text('title color', '#353535') : '';

  const align = options('font align', { 'left': 'left', 'center': 'center', 'right': 'right' },
    '', { display: 'inline-radio' }, 'Other');

  const isborder = boolean('border options', false);
  const border = isborder ? text('border color', '#909090') : '';
  const width = isborder ? text('border width', '1px') : '';

  const [result, setResult] = useState(null);

  const onClick = (hex, rgb, e) => {
    setResult(`onChange(hex = ${hex}, rgb = ${rgb}, e)`);
  }

  const opt = {
    border: isborder ? { color: border, width: width } : null,
    font: isfont ? { size: fontsize, color: fontcolor, hover: fonthover, title: titlecolor } : null,
  };

  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"toggle button"} className={"nomargin"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."} sample={samplecode("", "")} box={false}>
        <Header className={cx(bg)} align={align} options={opt} title={"scroll(float)"} list={list} onClick={onClick} />
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
    <StyledObject className={"t-main"} >
      <Linebox title={"color"} sample={samplecode('', 'sky')}>
        <Header className={"trans"} title={"trans"} list={list} />
        <Header className={"sky"} title={"sky"} list={list} />
        <Header className={"primary"} title={"primary"} list={list} />
        <Header className={"gray"} title={"gray"} list={list} />
        <Header className={"dark"} title={"dark"} list={list} />
        <Header className={"black"} title={"black"} list={list} />
      </Linebox>
    </StyledObject>
  );
};


export const title = () => {
  return (
    <StyledObject className={"t-main"} >
      <Linebox title={"title options"} sample={samplecode('', 'sky')}>
        <Header title={"red"} list={list} options={{ font: { size: "14px", color: "black", hover: "blue", title: "red" } }} />
        <Header title={"blue"} list={list} options={{ font: { size: "18px", color: "green", hover: "red", title: "gray" } }} />
        <Header title={"black"} list={list} options={{ font: { size: "24px", color: "gray", hover: "black", title: "blue" } }} />
      </Linebox>
    </StyledObject>
  );
};


export const border = () => {
  return (
    <StyledObject className={"t-main"} >
      <Linebox title={"border options"} sample={samplecode('', 'sky')}>
        <Header title={"red"} list={list} options={{ border: { color: "red", width: '1px' } }} />
        <Header title={"blue"} list={list} options={{ border: { color: "blue", width: '2px' } }} />
        <Header title={"black"} list={list} options={{ border: { color: "black", width: '5px' } }} />
      </Linebox>
    </StyledObject>
  );
};

export const align = () => {
  return (
    <StyledObject className={"t-main"} >
      <Linebox title={"border options"} sample={samplecode('aligh={"left"}', '')}>
        <Header title={"left"} align={"left"} list={list} />
        <Header title={"center"} align={"center"} list={list} />
        <Header title={"right"} align={"right"} list={list} />
      </Linebox>
    </StyledObject>
  );
};

export const theme = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"theme"} sample={samplecode("theme={'sky'}", "sky")}>
        <Header className={'primary'} title={"sky"} list={list} theme={'sky'} />
        <Header className={'primary'} title={"primary"} list={list} theme={'primary'} />
        <Header className={'primary'} title={"gray"} list={list}  theme={'gray'} />
        <Header className={'primary'} title={"dark"} list={list}  theme={'dark'} />
        <Header className={'primary'} title={"black"} list={list}  theme={'black'} />
      </Linebox>
    </StyledObject>
  );
};

export const scroll = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={""} className={"scroll"}>
        <Header className={''} title={"scroll(float)"} list={list} theme={'dark'} />
        <div className={"s-1"}>section 1</div>
        <div className={"s-2"}>section 2</div>
        <div className={"s-3"}>section 3</div>
      </Linebox>
    </StyledObject>
  );
};