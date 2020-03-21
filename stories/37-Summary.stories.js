/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { optionsKnob as options, withKnobs, text, boolean, button } from '@storybook/addon-knobs';
import styled from 'styled-components';
import cx from 'classnames/bind'
import { Linebox } from './00-Frame';
import { cs, Summarybox } from '../src';

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
    data.push({ title: title + i, value: i * 1000 });
  }

  return data;
};

export const object = () => {
  button('refresh(옵션을 변경 후 버튼을 클릭하세요)', () => {});
  const size = options('size', { 'sm(small)': 'sm', 'md(middle)': 'md', 'lg(large)': 'lg' },
    '', { display: 'inline-radio' }, 'Other');
  const width = text('width size', 'full');

  const isborder = boolean('border options', false);
  const border = isborder ? text('border color', '#909090') : '';
  const radius = isborder ? text('border radius', '5px') : '';
  const borderwidth = isborder ? text('border width', '1px') : '';

  const [result, ] = useState(null);

  const opt = {
    border: isborder ? { color: border, width: borderwidth, radius: radius } : null,
  };

  return (
    <StyledObject className={"t-main"} width={width}>
      <Linebox title={"toggle Summarybox"} className={"nomargin"}
        desc={"Knobs 옵션을 통해 미리보기가 가능합니다."} sample={samplecode("", "")} box={false}>
        <Summarybox className={cx(size)} options={opt} title={"Summary"} data={jsonlist()} label={jsonlist(5, 'label')} />
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
        <Summarybox className={""} title={"none"} data={jsonlist()} label={jsonlist(5, 'label')} />
        <Summarybox className={"sky"} title={"sky"} data={jsonlist()} label={jsonlist(5, 'label')} />
        <Summarybox className={"primary"} title={"primary"} data={jsonlist()} label={jsonlist(5, 'label')} />
        <Summarybox className={"gray"} title={"gray"} data={jsonlist()} label={jsonlist(5, 'label')} />
        <Summarybox className={"dark"} title={"dark"} data={jsonlist()} label={jsonlist(5, 'label')} />
        <Summarybox className={"black"} title={"black"} data={jsonlist()} label={jsonlist(5, 'label')} />
      </Linebox>
    </StyledObject>
  );
};

export const size = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"type"} className={"nomargin"} sample={samplecode()}>
        <Summarybox className={""} title={"none"} data={jsonlist()} label={jsonlist(5, 'label')} />
        <Summarybox className={"sm"} title={"small"} data={jsonlist()} label={jsonlist(5, 'label')} />
        <Summarybox className={"md"} title={"middle"} data={jsonlist()} label={jsonlist(5, 'label')} />
        <Summarybox className={"lg"} title={"large"} data={jsonlist()} label={jsonlist(5, 'label')} />
      </Linebox>
    </StyledObject>
  );
};

export const border = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"border radius"} sample={samplecode("", 'border')} >
        <Summarybox className={""} title={"border option"} data={jsonlist()} label={jsonlist(5, 'label')}
          border={{ radius: '5px', color: "blue", width: '1px' }} />
        <Summarybox className={""} title={"border option"} data={jsonlist()} label={jsonlist(5, 'label')}
          border={{ radius: '10px', color: "red", width: '2px' }} />
        <Summarybox className={""} title={"border option"} data={jsonlist()} label={jsonlist(5, 'label')}
          border={{ radius: '20px', color: "black", width: '5px' }} />
      </Linebox>
    </StyledObject>
  );
};

export const font = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"border radius"} sample={samplecode("", '')} >
        <Summarybox className={""} title={"border option"} data={jsonlist()} label={jsonlist(5, 'label')}
          fontcolor={'red'} />
        <Summarybox className={""} title={"border option"} data={jsonlist()} label={jsonlist(5, 'label')}
          fontcolor={'blue'} />
        <Summarybox className={""} title={"border option"} data={jsonlist()} label={jsonlist(5, 'label')}
          fontcolor={'#123456'} />
      </Linebox>
    </StyledObject>
  );
};

export const theme = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"type"} className={"nomargin"} sample={samplecode()}>
        <Summarybox className={""} theme={"sky"} title={"sky"} data={jsonlist()} label={jsonlist(5, 'label')} />
        <Summarybox className={""} theme={"primary"} title={"primary"} data={jsonlist()} label={jsonlist(5, 'label')} />
        <Summarybox className={""} theme={"gray"} title={"gray"} data={jsonlist()} label={jsonlist(5, 'label')} />
        <Summarybox className={""} theme={"dark"} title={"dark"} data={jsonlist()} label={jsonlist(5, 'label')} />
        <Summarybox className={""} theme={"black"} title={"black"} data={jsonlist()} label={jsonlist(5, 'label')} />
      </Linebox>
    </StyledObject>
  );
};