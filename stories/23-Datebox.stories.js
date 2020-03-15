import React, { useState, useRef } from 'react';
import { optionsKnob as options, withKnobs, text, boolean, radios, number, button } from '@storybook/addon-knobs';
import styled from 'styled-components';
import cx from 'classnames/bind'
import { Linebox } from './00-Frame';
import { cs, Datebox, Util, Button } from '../src';

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
  
  let rObject;
  const onChange = (eid, value, e) => {
    setResult(`onChange(eid = ${eid}, value = ${value}, e)`);
  }

  const onClick = () => {
    const {start, end} = rObject.getValue();
    setResult(`getValue() start = ${start}, end = ${end}`);
  }

  const opt = {
    border: isborder ? { radius: radius, color: border, width: width } : null,
    title: istitle ? { align: titlealign, color: titlecolor } : null,
  };

  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"toggle button"} className={"nomargin"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."} sample={samplecode("", "")} box={false}>
        <Datebox ref={(ref) => rObject = ref} className={cx(size, bg)} 
          slabel={"start"} elabel={"end"} options={opt} onChange={onChange} />
        <Button className={'primary'} title={"getValue"} onClick={onClick} />
      </Linebox>

      <div className={"res-view"}>
        <p>onClick</p>
        <p>{result}</p>
      </div>
    </StyledObject>
  );
};

object.story = { name: 'Base' };

export const align = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"align"} sample={samplecode('type={"left"}', 'left')} >
        <Datebox className={'left'} guide={"left"} />
        <Datebox className={'center'} guide={"center"} />
        <Datebox className={'right'} guide={"right"} />
      </Linebox>
    </StyledObject>
  );
};

export const size = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"size"} sample={samplecode('type={"left"}', 'left')} >
        <Datebox className={'sm'} guide={"small"} />
        <Datebox className={'lg'} guide={"large"} />
      </Linebox>
    </StyledObject>
  );
};

export const border = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"border"} sample={samplecode('bordercolor={""}', 'border')} >
        <Datebox className={'border'} guide={"color none"} />
        <Datebox className={'border'} guide={"black"} bordercolor={"black"} />
        <Datebox className={'border'} guide={"red"} bordercolor={"red"} />
        <Datebox className={'border'} guide={cs.color.primary} bordercolor={cs.color.primary} />
      </Linebox>
    </StyledObject>
  );
};

export const bgcolor = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"bgcolor & fontcolor"} sample={samplecode('bgcolor={""}')} >
        <Datebox className={''} label={"bgcolor"} guide={"bgcolor none"} />
        <Datebox className={''} label={"bgcolor"} value={'bgcolor={"black"} fontcolor={"white"}'} bgcolor={"black"} fontcolor={"white"} />
        <Datebox className={''} label={"bgcolor"} value={'bgcolor={"red"} fontcolor={"black"}'} bgcolor={"red"} fontcolor={"black"} />
        <Datebox className={''} label={"bgcolor"} value={`bgcolor={"${cs.color.primary}"} fontcolor={"${cs.color.red}"}`} bgcolor={cs.color.primary} fontcolor={cs.color.yellow} />
      </Linebox>
    </StyledObject>
  );
};