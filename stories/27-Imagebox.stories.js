import React, { useState } from 'react';
import { optionsKnob as options, withKnobs, text, boolean, radios, number, button } from '@storybook/addon-knobs';
import styled from 'styled-components';
import cx from 'classnames/bind'
import { Linebox } from './00-Frame';
import { cs, Imagebox, Util } from '../src';
import { ICON, IMG } from '../src/Icons';

const StyledObject = styled.span`{
  &.t-main {
    .lb-box { ${cs.w.get(800)} ${cs.p.b30} }

    // .lb-box .lb-li > * { ${cs.m.b10} ${cs.h.get(400)} }
    .lb-box .lb-li { ${cs.h.get(100)} }

    .res-view { 
      ${cs.h.get(100)} ${cs.w.get(800)} ${cs.bg.lightgray} 
      p { ${cs.m.a5} }
    }    
  }
}`;

export default { title: 'object|Imagebox', component: Imagebox, decorators: [withKnobs] };

const samplecode = (value, classname = '') => `<Imagebox className={"${classname}"} ${value} />`;

export const object = () => {
  const size = options('size',
  { 'none': '', 'xs(x small)': 'xs', 'sm(small)': 'sm', 'md(middle)': 'md', 'lg(large)': 'lg', 'xl(x large)': 'xl', 'xxl(xx large)': 'xxl' },
  '', { display: 'inline-radio' }, 'Other');

  const halign = options('horizantal align', { 'left': 'left', 'center': 'center', 'right': 'right' },
    '', { display: 'inline-radio' }, 'Other');
  const valign = options('vertical align', { 'top': 'top', 'middle': 'middle', 'bottom': 'bottom' },
    '', { display: 'inline-radio' }, 'Other');

  const isborder = boolean('border options', false);
  const border = isborder ? text('border color', '#909090') : '';
  const radius = isborder ? text('border radius', '5px') : '';
  const width = isborder ? text('border width', '1px') : '';

  const [result, setResult] = useState(null);

  const onClick = (eid, e) => {
    setResult(`onChange(eid = ${eid}, e)`);
  }

  const opt = {
    border: isborder ? { color: border, width: width, radius: radius } : null,
  };

  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"toggle Imagebox"} className={"v-align nomargin"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."} sample={samplecode("", "")} box={true}>
        <Imagebox className={cx(size, halign, valign)} options={opt} src={null} title={"scroll(float)"} onClick={onClick} eid={'Imagebox'}/>
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
    <StyledObject className={"t-main"}>
      <Linebox title={"size"} sample={samplecode('type={"left"}', 'left')} >
        <Imagebox src={''} className={'xs'} guide={"x small"} />
        {/* <Imagebox src={IMG.Sample} className={'sm'} guide={"small"} />
        <Imagebox src={IMG.Sample} className={'md'} guide={"middle"} />
        <Imagebox src={IMG.Sample} className={'lg'} guide={"large"} />
        <Imagebox src={IMG.Sample} className={'xl'} guide={"x large"} />
        <Imagebox src={IMG.Sample} className={'xxl'} guide={"xx large"} /> */}
      </Linebox>
    </StyledObject>
  );
};

export const align = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"horizontal align"} className={"align"} sample={samplecode()} box={true}>
        <Imagebox src={IMG.Sample} className={"primary left"} />
        <Imagebox src={IMG.Sample} className={"primary center"} />
        <Imagebox src={IMG.Sample} className={"primary right"} />
      </Linebox>

      <Linebox title={"vertical align"} className={"align v-align"} sample={samplecode()} box={true}>
        <Imagebox src={IMG.Sample} className={"primary top"} />
        <Imagebox src={IMG.Sample} className={"primary middle"} />
        <Imagebox src={IMG.Sample} className={"primary bottom"} />
      </Linebox>

      <Linebox title={"align"} className={"align v-align"} sample={samplecode()} box={true}>
        <Imagebox src={IMG.Sample} className={"primary left top"} />
        <Imagebox src={IMG.Sample} className={"primary center top"} />
        <Imagebox src={IMG.Sample} className={"primary right top"} />
        
        <Imagebox src={IMG.Sample} className={"primary left middle"} />
        <Imagebox src={IMG.Sample} className={"primary center middle"} />
        <Imagebox src={IMG.Sample} className={"primary right middle"} />
        
        <Imagebox src={IMG.Sample} className={"primary left bottom"} />
        <Imagebox src={IMG.Sample} className={"primary center bottom"} />
        <Imagebox src={IMG.Sample} className={"primary right bottom"} />
      </Linebox>
    </StyledObject>
  );
};

export const border = () => {
  return (
    <StyledObject className={"t-main"} >
      <Linebox title={"border options"} sample={samplecode('', 'sky')}>
        <Imagebox className={"cover lg"} title={"red"} src={IMG.Sample} options={{ border: { color: "red", width: '1px', radius: "5px" } }} />
        <Imagebox className={"cover lg"} title={"blue"} src={IMG.Sample} options={{ border: { color: "blue", width: '2px', radius: "20px" } }} />
        <Imagebox className={"cover lg"} title={"black"} src={IMG.Sample} options={{ border: { color: "black", width: '5px', radius: "50%"} }} />
      </Linebox>
    </StyledObject>
  );
};
