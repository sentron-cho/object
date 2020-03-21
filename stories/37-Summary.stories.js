import React, { useState } from 'react';
import { optionsKnob as options, withKnobs, text, boolean, radios, number, button } from '@storybook/addon-knobs';
import styled from 'styled-components';
import cx from 'classnames/bind'
import { Linebox } from './00-Frame';
import { cs, Summarybox, Button } from '../src';
import { IMG } from './sample/index';

const StyledObject = styled.span`{
  &.t-main {
    .lb-box { ${cs.w.full} }

    .lb-box .lb-li > * { ${cs.h.fit} ${cs.m.b30} ${cs.w.get(800)} }

    .res-view { ${cs.over.yauto} ${cs.scrollbar.t2}
      ${cs.h.get(200)} ${cs.w.get(780)} ${cs.bg.lightgray} 
      p { ${cs.m.a5} ${cs.font.preline} ${cs.font.breakall} ${cs.font.xs} }
    }    
  }
}`;

export default { title: 'object|Summarybox', component: Summarybox, decorators: [withKnobs] };

const samplecode = (value, classname = '') => `<Summarybox className={"${classname}"} ${value} />`;

const jsonlist = (count = 5, title = 'title') => {
  let data = [];
  for (let i = 0; i < count; i++) {
    data.push({ title: 'title' + i, value: i * 1000 });
  }

  return data;
};

export const object = () => {
  button('refresh(옵션을 변경 후 버튼을 클릭하세요)', () => onRefresh());
  const size = options('size',
    { 'none': '', 'full(100%)': 'full', 'normal(4:3)': 'normal', 'wide(16:9)': 'wide', 'xwide(21:9)': 'xwide', 'fwide(28:9)': 'fwide' },
    '', { display: 'inline-radio' }, 'Other');
  const width = text('width size', 'full');

  const fit = options('object fit', { 'none': '', 'contain': 'contain', 'cover': 'cover', 'scale-down': 'scale-down', 'fill': 'fill' },
    '', { display: 'inline-radio' }, 'Other');

  const halign = options('horizantal align', { 'left': 'left', 'center': 'center', 'right': 'right' },
    '', { display: 'inline-radio' }, 'Other');
  const valign = options('vertical align', { 'top': 'top', 'middle': 'middle', 'bottom': 'bottom' },
    '', { display: 'inline-radio' }, 'Other');


  const isborder = boolean('border options', false);
  const border = isborder ? text('border color', '#909090') : '';
  const radius = isborder ? text('border radius', '5px') : '';
  const borderwidth = isborder ? text('border width', '1px') : '';

  const [result, setResult] = useState(null);

  let rObject;
  const onClick = (eid, e) => {
    const value = rObject.getValue();
    setResult(`${value}`);
  }

  const opt = {
    border: isborder ? { color: border, width: borderwidth, radius: radius } : null,
  };

  return (
    <StyledObject className={"t-main"} width={width}>
      <Linebox title={"toggle Summarybox"} className={"nomargin"}
        desc={"Knobs 옵션을 통해 미리보기가 가능합니다."} sample={samplecode("", "")} box={false}>
        <Summarybox className={cx(size, halign, valign, 'border')} fit={fit} options={opt} size={size}
          src={IMG.Image1} title={"Summary"} onClick={onClick} eid={'Summarybox'} />
      </Linebox>

      <div className={"res-view"}>
        <p>{result}</p>
      </div>
    </StyledObject>
  );
};

object.story = { name: 'Base' };



export const color = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"type"} className={"nomargin"} sample={samplecode()}>
        <Summarybox className={"sky"} title={"sky"} />
        <Summarybox className={"primary"} title={"primary"} />
        <Summarybox className={"gray"} title={"gray"} />
        <Summarybox className={"dark"} title={"dark"} />
        <Summarybox className={"black"} title={"black"} />
      </Linebox>
    </StyledObject>
  );
};