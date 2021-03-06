/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import Editbox from '../src/Editbox';
import { optionsKnob as options, withKnobs, text, boolean, radios } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';
import cx from 'classnames/bind'
import { Linebox, op } from './00-Frame';
import { cs, Button } from '../src';

const StyledObject = styled.span`{
  &.t-main {
    .lb-box { ${cs.w.get(800)} }

    .lb-box.type .lb-li > * { ${cs.m.a0} }
    .lb-box.size .lb-li { ${cs.h.get(48)} }

    .res-view { 
      ${cs.h.get(100)} ${cs.w.get(800)} ${cs.bg.lightgray} 
      p { ${cs.m.a5} }
    }
  }
}`;

export default {
  title: 'object|Editbox', // 스토리북에서 보여질 그룹과 경로를 명시
  component: Editbox, // 어떤 컴포넌트를 문서화 할지 명시
  decorators: [withKnobs], // 애드온 적용
};

const samplecode = (value, classname = '') => `<Editbox type={"text"} className={"${classname}"} label={"readonly"} guide={"readonly"} value={"readonly"} readonly={true} ${value} />`;

export const object = () => {
  const bg = options('background', op.color('f'), '', op.radio(), 'Other');
  const size = options('size', op.size('n'), '', op.radio(), 'Other');

  const label = text('label', 'Editbox');
  const guide = text('guide', 'Editbox');
  const value = text('value', '');
  const helper = text('helper', 'help text');
  const multi = boolean('multi', false);
  const inline = boolean('inline', false);
  const readonly = boolean('readonly', false);
  const disabled = boolean('disabled', false);
  const type = radios('type', { text: 'text', date: 'date', number: 'number' }, 'text', 'Other');
  const bordercolor = text('bordercolor', '');
  const border = bordercolor ? true : false;
  const fontcolor = text('fontcolor', '');
  const radius = boolean('border radius', false);

  const [result, setResult] = useState(null);

  let rObject;
  const onClick = (eid, e) => {
    const value = rObject.getValue() || 'null';
    setResult(`${value}`);
  }

  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"sample"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."} sample={samplecode()}>
        <Editbox className={cx('b-s', { border }, { radius }, bg, size)}
          ref={(ref) => rObject = ref} type={type} label={label} helper={helper}
          guide={guide} value={value} inline={inline} multi={multi} readonly={readonly} disabled={disabled}
          bordercolor={bordercolor} fontcolor={fontcolor} />
        <Button className={'primary'} title={"getValue"} onClick={onClick} />
      </Linebox>

      <div className={"res-view"}>
        <p>{result}</p>
      </div>
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
        <Editbox className={''} type={"text"} label={"focus"} guide={"focus"} focus={true} />
        <Editbox className={''} type={"text"} label={"readonly"} guide={"readonly"} value={"readonly"} readonly={true} />
        <Editbox className={''} type={"text"} label={"disabled"} guide={"disabled"} value={"disabled"} disabled={true} />
      </Linebox>
    </StyledObject>
  );
};

export const event = () => {
  const [result, setResult] = useState(null);

  const onEnter = (isok, e, value) => {
    setResult(`onEnter() isok = ${isok}, value = ${value}, e`);
  }

  const onClear = (value, e) => {
    setResult(`onClear() value = ${value}, e`);
  }

  const onChange = (value, e) => {
    setResult(`onChange() value = ${value}, e`);
  }

  return (
    <StyledObject className={"t-main"} >
      <Linebox title={"clear && event"} top={option.top} sample={samplecode(`onClear={} onEnter={} onChange={}`)}>
        <Editbox className={''} type={"text"} label={"onClear"} guide={"onClear"} onClear={onClear} />
        <Editbox className={''} type={"text"} label={"onEnter"} guide={"onEnter"} onEnter={onEnter} />
        <Editbox className={''} type={"text"} label={"onChange"} guide={"onChange"} onChange={onChange} />
      </Linebox>

      <div className={"res-view"}>
        <p>{result}</p>
      </div>
    </StyledObject>
  );
};

export const align = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"align"} sample={samplecode('type={"left"}', 'left')} top={option.top} width={option.width}>
        <Editbox className={'left'} type={"text"} label={"left"} guide={"left"} />
        <Editbox className={'center'} type={"text"} label={"center"} guide={"center"} />
        <Editbox className={'right'} type={"text"} label={"right"} guide={"right"} />
      </Linebox>
    </StyledObject>
  );
};

export const size = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"size"} sample={samplecode('type={"left"}', 'left')} top={option.top} width={option.width}>
        <Editbox className={'sm'} type={"text"} label={"size small"} guide={"small"} />
        <Editbox className={'lg'} type={"text"} label={"size large"} guide={"large"} />
      </Linebox>
    </StyledObject>
  );
};

export const type = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"type"} sample={samplecode('type={"left"}', 'left')} top={option.top} width={option.width}>
        <Editbox className={''} type={"text"} label={"text"} guide={"text"} />
        <Editbox className={''} type={"number"} label={"number"} guide={100} />
        <Editbox className={''} type={"date"} label={"date"} guide={"date"} value={"2019-10-10"} />
      </Linebox>
    </StyledObject>
  );
};

export const border = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"border"} sample={samplecode('bordercolor={""}', 'border')} top={option.top} width={option.width}>
        <Editbox className={'border'} type={"text"} label={"border"} guide={"color none"} />
        <Editbox className={'border'} type={"text"} label={"border"} guide={"black"} bordercolor={"black"} />
        <Editbox className={'border'} type={"text"} label={"border"} guide={"red"} bordercolor={"red"} />
        <Editbox className={'border'} type={"text"} label={"border"} guide={cs.color.primary} bordercolor={cs.color.primary} />
      </Linebox>
    </StyledObject>
  );
};

export const bgcolor = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"bgcolor & fontcolor"} sample={samplecode('bgcolor={""}')} top={option.top} width={option.width}>
        <Editbox className={'trans'} type={"text"} label={"trans"} guide={"trans"} />
        <Editbox className={'sky'} type={"text"} label={"sky"} guide={"sky"} />
        <Editbox className={'orange'} type={"text"} label={"orange"} guide={"orange"} />
        <Editbox className={'green'} type={"text"} label={"green"} guide={"green"} />
        <Editbox className={'red'} type={"text"} label={"red"} guide={"red"} />
        <Editbox className={'primary'} type={"text"} label={"primary"} guide={"primary"} />
        <Editbox className={'gray'} type={"text"} label={"gray"} guide={"gray"} />
        <Editbox className={'dark'} type={"text"} label={"dark"} guide={"dark"} />
        <Editbox className={'black'} type={"text"} label={"black"} guide={"black"} />
        <Editbox className={''} type={"text"} label={"bgcolor"} value={`bgcolor={"${cs.color.primary}"} fontcolor={"${cs.color.red}"}`} bgcolor={cs.color.primary} fontcolor={cs.color.yellow} />
      </Linebox>
    </StyledObject>
  );
};

export const helper = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"helper"} sample={samplecode('helper={"help text"} helpcolor={""}')} top={option.top} width={option.width}>
        <Editbox className={''} type={"text"} label={"helper"} guide={"color none"} helper={"도움말은 여기에 표시됩니다."} />
        <Editbox className={''} type={"text"} label={"helper"} guide={"black"} helper={"도움말은 여기에 표시됩니다."} helpcolor={"black"} />
        <Editbox className={''} type={"text"} label={"helper"} guide={"red"} helper={"도움말은 여기에 표시됩니다."} helpcolor={"red"} />
        <Editbox className={''} type={"text"} label={"helper"} guide={cs.color.primary} helper={"도움말은 여기에 표시됩니다."} helpcolor={cs.color.primary} />
      </Linebox>
    </StyledObject>
  );
};

export const inline = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"inline"} sample={samplecode('inline={true}')} top={option.top} width={option.width}>
        <Editbox className={''} type={"text"} label={"inline"} guide={"inline"} inline={true} />
      </Linebox>
    </StyledObject>
  );
};

export const textarea = () => {
  return (
    <StyledObject className={"t-main"} top={option.top} width={option.width}>
      <Linebox title={"textarea"} sample={samplecode('multi={true}', 'scroll-t4')} top={option.top} width={option.width}>
        <Editbox className={''} type={"text"} label={"multi(n/a or scroll-t4)"} multi={true} guide={"1\n2\n3\n4\n5\n6\n7\n"} />
        <Editbox className={'scroll-t1'} type={"text"} label={"multi(scroll-t1)"} multi={true} guide={"1\n2\n3\n4\n5\n6\n7\n"} />
        <Editbox className={'scroll-t2'} type={"text"} label={"multi(scroll-t2)"} multi={true} guide={"1\n2\n3\n4\n5\n6\n7\n"} />
        <Editbox className={'scroll-t3'} type={"text"} label={"multi(scroll-t3)"} multi={true} guide={"1\n2\n3\n4\n5\n6\n7\n"} />
        <Editbox className={'scroll-t4'} type={"text"} label={"multi(scroll-t4)"} multi={true} value={"1\n2\n3\n4\n5\n6\n7\n"} onClear={action('onClear')} />
      </Linebox>
    </StyledObject>
  );
};

export const theme = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"theme"} sample={samplecode('bgcolor={""}')} top={option.top} width={option.width}>
        <Editbox className={'primary'} theme={'sky'} type={"text"} label={"sky"} guide={"sky"} />
        <Editbox className={'primary'} theme={'primary'} type={"text"} label={"primary"} guide={"primary"} />
        <Editbox className={'primary'} theme={'gray'} type={"text"} label={"gray"} guide={"gray"} />
        <Editbox className={'primary'} theme={'dark'} type={"text"} label={"dark"} guide={"dark"} />
        <Editbox className={'primary'} theme={'black'} type={"text"} label={"black"} guide={"black"} />
      </Linebox>
    </StyledObject>
  );
};