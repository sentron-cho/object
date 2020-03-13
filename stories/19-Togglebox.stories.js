import React, { useState } from 'react';
import { optionsKnob as options, withKnobs, text, boolean, radios, number, button } from '@storybook/addon-knobs';
import styled from 'styled-components';
import cx from 'classnames/bind'
import { Linebox } from './00-Frame';
import { cs, Togglebox, Util } from '../src';
import { IMG } from '../src/Icons';

const StyledObject = styled.span`{
  &.t-main {
    .lb-box { ${cs.w.get(800)} ${cs.p.b30} }

    .lb-box .lb-li > * { ${cs.m.r20} }

    .res-view { 
      ${cs.h.get(100)} ${cs.w.get(800)} ${cs.bg.lightgray} 
      p { ${cs.m.a5} }
    }    
  }
}`;

export default { title: 'object|Togglebox', component: Togglebox, decorators: [withKnobs] };

const samplecode = (value, classname = '') => `<Togglebox className={"${classname}"} ${value} />`;

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
    { primary: 'primary', orange: 'orange', green: 'green', red: 'red', gray: 'gray', dark: 'dark', black: 'black' },
    'primary', { display: 'inline-radio' }, 'Other');
  const anim = boolean('animaion', false);

  const [result, setResult] = useState(null);

  const onClick = (eid, e) => {
    setResult(`onClick(eid = ${eid}, e)`);
  }

  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"toggle button"} className={"nomargin"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."} sample={samplecode("", "")} box={false}>
        <Togglebox className={cx(size, bg)} list={list} icon={false} anim={anim} onClick={onClick} />
      </Linebox>

      <Linebox title={"toggle button icon type"} className={"nomargin"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."} sample={samplecode("", "")} box={false}>
        <Togglebox className={cx(size, bg)} list={list} icon={true} anim={anim} onClick={onClick} />
      </Linebox>

      <div className={"res-view"}>
        <p>onClick</p>
        <p>{result}</p>
      </div>
    </StyledObject>
  );
};

object.story = { name: 'Base' };