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

    .lb-box .lb-li { ${cs.h.get(140)} }

    .lb-box .lb-li > * { ${cs.m.r10} }

    .lb-box .lb-li.full { ${cs.h.get(180)} }

    .res-view { 
      ${cs.h.get(100)} ${cs.w.get(800)} ${cs.bg.lightgray} 
      p { ${cs.m.a5} }
    }    
  }
}`;

export default { title: 'object|Togglebox', component: Togglebox, decorators: [withKnobs] };

const samplecode = (value, classname = '') => `<Togglebox className={"${classname}"} ${value} />`;

const list = [
  { eid: 'card1', title: 'card1', icon: 'thead' },
  { eid: 'card2', title: 'card2', icon: 'list' },
  { eid: 'card3', title: 'card3', icon: 'menu' },
  { eid: 'card4', title: 'card4', icon: 'user' },
]

export const object = () => {
  const size = options('size',
    { 'none': '', 'xs(x small)': 'xs', 'sm(small)': 'sm', 'md(middle)': 'md', 'lg(large)': 'lg', 'xl(x large)': 'xl' },
    '', { display: 'inline-radio' }, 'Other');
  const bg = options('background',
    { primary: 'primary', orange: 'orange', green: 'green', red: 'red', gray: 'gray', dark: 'dark', black: 'black' },
    'primary', { display: 'inline-radio' }, 'Other');

  const [result, setResult] = useState(null);

  const onClick = (eid, e) => {
    setResult(`onClick(eid = ${eid}, e)`);
  }

  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"toggle button"} className={"nomargin"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."} sample={samplecode("", "")} box={false}>
        <Togglebox className={cx(size, bg)} list={list} icon={false} onClick={onClick} />
      </Linebox>

      <Linebox title={"toggle button icon type"} className={"nomargin"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."} sample={samplecode("", "")} box={false}>
        <Togglebox className={cx(size, bg)} list={list} icon={true} onClick={onClick} />
      </Linebox>

      <div className={"res-view"}>
        <p>onClick</p>
        <p>{result}</p>
      </div>
    </StyledObject>
  );
};

object.story = { name: 'Base' };