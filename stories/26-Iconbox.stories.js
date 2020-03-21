/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { optionsKnob as options, withKnobs, text, boolean } from '@storybook/addon-knobs';
import styled from 'styled-components';
import cx from 'classnames/bind'
import { Linebox } from './00-Frame';
import { cs, Iconbox } from '../src';
import { ICON, IMG } from '../src/Icons';

const StyledObject = styled.span`{
  &.t-main {
    .lb-box { ${cs.w.get(800)} ${cs.p.b30} }

    // .lb-box .lb-li > * { ${cs.m.b10} }

    .res-view { 
      ${cs.h.get(100)} ${cs.w.get(800)} ${cs.bg.lightgray} 
      p { ${cs.m.a5} }
    }    
  }
}`;

export default { title: 'object|Iconbox', component: Iconbox, decorators: [withKnobs] };

const samplecode = (value, classname = '') => `<Iconbox className={"${classname}"} ${value} />`;

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
      <Linebox title={"toggle Iconbox"} className={"v-align nomargin"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."} sample={samplecode("", "")} box={true}>
        <Iconbox className={cx(size, halign, valign)} options={opt} src={ICON.Nuriweb} title={"scroll(float)"} onClick={onClick} eid={'iconbox'}/>
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
        <Iconbox src={ICON.Nuriweb} className={'xs'} guide={"x small"} />
        <Iconbox src={ICON.Nuriweb} className={'sm'} guide={"small"} />
        <Iconbox src={ICON.Nuriweb} className={'md'} guide={"middle"} />
        <Iconbox src={ICON.Nuriweb} className={'lg'} guide={"large"} />
        <Iconbox src={ICON.Nuriweb} className={'xl'} guide={"x large"} />
        <Iconbox src={ICON.Nuriweb} className={'xxl'} guide={"xx large"} />
      </Linebox>
    </StyledObject>
  );
};

export const align = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"horizontal align"} className={"align"} sample={samplecode()} box={true}>
        <Iconbox src={ICON.Nuriweb} className={"primary left"} />
        <Iconbox src={ICON.Nuriweb} className={"primary center"} />
        <Iconbox src={ICON.Nuriweb} className={"primary right"} />
      </Linebox>

      <Linebox title={"vertical align"} className={"align v-align"} sample={samplecode()} box={true}>
        <Iconbox src={ICON.Nuriweb} className={"primary top"} />
        <Iconbox src={ICON.Nuriweb} className={"primary middle"} />
        <Iconbox src={ICON.Nuriweb} className={"primary bottom"} />
      </Linebox>

      <Linebox title={"align"} className={"align v-align"} sample={samplecode()} box={true}>
        <Iconbox src={ICON.Nuriweb} className={"primary left top"} />
        <Iconbox src={ICON.Nuriweb} className={"primary center top"} />
        <Iconbox src={ICON.Nuriweb} className={"primary right top"} />
        
        <Iconbox src={ICON.Nuriweb} className={"primary left middle"} />
        <Iconbox src={ICON.Nuriweb} className={"primary center middle"} />
        <Iconbox src={ICON.Nuriweb} className={"primary right middle"} />
        
        <Iconbox src={ICON.Nuriweb} className={"primary left bottom"} />
        <Iconbox src={ICON.Nuriweb} className={"primary center bottom"} />
        <Iconbox src={ICON.Nuriweb} className={"primary right bottom"} />
      </Linebox>
    </StyledObject>
  );
};

export const border = () => {
  return (
    <StyledObject className={"t-main"} >
      <Linebox title={"border options"} sample={samplecode('', 'sky')}>
        <Iconbox className={"cover lg"} title={"red"} src={IMG.Sample} options={{ border: { color: "red", width: '1px', radius: "5px" } }} />
        <Iconbox className={"cover lg"} title={"blue"} src={IMG.Sample} options={{ border: { color: "blue", width: '2px', radius: "20px" } }} />
        <Iconbox className={"cover lg"} title={"black"} src={IMG.Sample} options={{ border: { color: "black", width: '5px', radius: "50%"} }} />
      </Linebox>
    </StyledObject>
  );
};
