import React from 'react';
import { withKnobs, text, boolean, radios } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';
import cx from 'classnames/bind'
import { Linebox } from './00-Frame';
import { cs, Cardbox } from '../src';

const StyledObject = styled.span`{
  &.t-main {
    .lb-box { ${cs.w.get(800)} }

    .lb-box.type .lb-li > * { margin: 0; }
    .lb-box.size .lb-li { height: 48px; }
  }
}`;

export default {
  title: 'object|Cardbox', // 스토리북에서 보여질 그룹과 경로를 명시
  component: Cardbox, // 어떤 컴포넌트를 문서화 할지 명시
  decorators: [withKnobs], // 애드온 적용
};

const samplecode = (value, classname = '') => `<Cardbox type={"text"} className={"${classname}"} label={"readonly"} guide={"readonly"} value={"readonly"} readonly={true} ${value} />`;

export const object = () => {
  // const classname = text('classname', 'primary');
  // const label = text('label', 'Editbox');
  // const guide = text('guide', 'Editbox');
  // const value = text('value', '');
  // const helper = text('helper', 'help text');
  // const multi = boolean('multi', false);
  // const inline = boolean('inline', false);
  // const readonly = boolean('readonly', false);
  // const disabled = boolean('disabled', false);
  // const select = radios('size', { lg: 'lg', sm: 'sm' }, '', 'Other');
  // const type = radios('type', { text: 'text', date: 'date', number: 'number' }, 'text', 'Other');
  // const bordercolor = text('bordercolor', '');
  // const border = bordercolor ? true : false;
  // const fontcolor = text('fontcolor', '');
  // const bgcolor = text('bgcolor', '');

  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"sample"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."} sample={samplecode()}>
        {/* <Cardbox className={cx('b-s', select, classname, { border })} type={type} label={label} helper={helper}
          guide={guide} value={value} inline={inline} multi={multi} readonly={readonly} disabled={disabled}
          bordercolor={bordercolor} bgcolor={bgcolor} fontcolor={fontcolor} /> */}
      </Linebox>
    </StyledObject>
  );
};

object.story = {
  name: 'Base'
};

const option = {
  top: "20px",
}

export const normal = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"normal"} top={option.top} sample={samplecode()}>
        <Cardbox className={'border'}>Cardbox</Cardbox>
      </Linebox>
    </StyledObject>
  );
};

export const color = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"color"} top={option.top} sample={samplecode()} inline={true}>
        <Cardbox className={'sky'}>sky</Cardbox>
        <Cardbox className={'yellow'}>yellow</Cardbox>
        <Cardbox className={'green'}>green</Cardbox>
        <Cardbox className={'orange'}>orange</Cardbox>
      </Linebox>

      <Linebox title={""} top={option.top} sample={samplecode()} inline={true}>
        <Cardbox className={'red'}>red</Cardbox>
        <Cardbox className={'primary'}>primary</Cardbox>
        <Cardbox className={'blue'}>blue</Cardbox>
        <Cardbox className={'alphagray'}>red</Cardbox>
      </Linebox>

      <Linebox title={""} top={option.top} sample={samplecode()} inline={true}>
        <Cardbox className={'gray'}>primary</Cardbox>
        <Cardbox className={'alphablack'}>red</Cardbox>
        <Cardbox className={'dark'}>red</Cardbox>
        <Cardbox className={'black'}>primary</Cardbox>
      </Linebox>      
    </StyledObject>
  );
};