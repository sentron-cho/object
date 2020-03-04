import React, {useState} from 'react';
import { withKnobs, text, boolean, radios } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';
import cx from 'classnames/bind'
import { Linebox } from './00-Frame';
import { cs, Cardbox, Button, Editbox } from '../src';

const StyledObject = styled.span`{
  &.t-main {
    .lb-box { ${cs.w.get(800)} }

    .lb-box .lb-li { ${cs.h.get(120)} ${cs.font.sm} }
    .anim-test { ${cs.h.get(60)}
      .anim-time { ${cs.w.get(100)} ${cs.disp.inblock} ${cs.float.left} ${cs.m.r20} }
    }
  }
}`;

export default {
  title: 'object|Cardbox', // 스토리북에서 보여질 그룹과 경로를 명시
  component: Cardbox, // 어떤 컴포넌트를 문서화 할지 명시
  decorators: [withKnobs], // 애드온 적용
};

const samplecode = (value, classname = '') => `<Cardbox className={"${classname}"} ${value} />`;

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
      <Linebox title={"color"} top={option.top} sample={samplecode("","sky")} inline={true}>
        <Cardbox className={'sky'}>sky</Cardbox>
        <Cardbox className={'yellow'}>yellow</Cardbox>
        <Cardbox className={'green'}>green</Cardbox>
        <Cardbox className={'orange'}>orange</Cardbox>
      </Linebox>

      <Linebox title={""} top={option.top} sample={samplecode("","primary")} inline={true}>
        <Cardbox className={'red'}>red</Cardbox>
        <Cardbox className={'primary'}>primary</Cardbox>
        <Cardbox className={'blue'}>blue</Cardbox>
        <Cardbox className={'alphagray'}>red</Cardbox>
      </Linebox>

      <Linebox title={""} top={option.top} sample={samplecode("","black")} inline={true}>
        <Cardbox className={'gray'}>primary</Cardbox>
        <Cardbox className={'alphablack'}>red</Cardbox>
        <Cardbox className={'dark'}>red</Cardbox>
        <Cardbox className={'black'}>primary</Cardbox>
      </Linebox>
    </StyledObject>
  );
};

export const type = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"full"} top={option.top} sample={samplecode('type={"w50"}', "border")} inline={false}>
        <Cardbox className={'border'} type={"full"}>full(width: 100%)</Cardbox>
      </Linebox>
      
      <Linebox title={"half"} top={option.top} sample={samplecode()} inline={false}>
        <Cardbox className={'border'} type={"half"}>half(width: 50%)</Cardbox>
        <Cardbox className={'border'} type={"w50"}>w50(width: 50%)</Cardbox>
      </Linebox>

      <Linebox title={"width size"} top={option.top} sample={samplecode()} inline={false}>
        <Cardbox className={'border'} type={"w33"}>w33(width: 33.3333%)</Cardbox>
        <Cardbox className={'border'} type={"w25"}>w25(width: 25%)</Cardbox>
        <Cardbox className={'border'} type={"w20"}>w20(width: 20%)</Cardbox>
        <Cardbox className={'border'} type={"w10"}>w10(width: 10%)</Cardbox>
      </Linebox>      
    </StyledObject>
  );
};

export const animation = () => {
  const [refresh, setRefresh] = useState(false);
  const [value, setValue] = useState("3s");
  let time = 0;

  const onClick = (e) => {
    setValue(time || '200ms');
    setRefresh(true);
    setTimeout(() => setRefresh(false), 200);
  };

  if(refresh) {
    return null;
  }

  return (
    <StyledObject className={"t-main"}>
      <Linebox className={"anim-test"} title={"test"} >
        <Editbox className={"anim-time"} type={"text"} value={value} onChange={(value, e) => time = value}/>
        <Button className={"primary sm"} title={"refresh"} onClick={onClick} />
      </Linebox>

      <Linebox title={"slide"} top={option.top} sample={samplecode('anim={{ type: "slidein", time: "0.3s" }}')} inline={true}>
        <Cardbox className={'border'} anim={{ type: 'slidein', time: value }}>{`slidein(${value})`}</Cardbox>
        <Cardbox className={'border'} anim={{ type: 'slideout', time: value }}>{`slideout(${value})`}</Cardbox>
      </Linebox>
      
      <Linebox title={"show"} top={option.top} sample={samplecode('anim={{ type: "showin", time: "0.3s" }}')} inline={true}>
        <Cardbox className={'border'} anim={{ type: 'showin', time: value }}>{`showin(${value})`}</Cardbox>
        <Cardbox className={'border'} anim={{ type: 'showout', time: value }}>{`showout(${value})`}</Cardbox>
      </Linebox>

      <Linebox title={"fade"} top={option.top} sample={samplecode('anim={{ type: "fadein", time: "0.3s" }}')} inline={true}>
        <Cardbox className={'border'} anim={{ type: 'fadein', time: value }}>{`fadein(${value})`}</Cardbox>
        <Cardbox className={'border'} anim={{ type: 'fadeout', time: value }}>{`fadeout(${value})`}</Cardbox>
      </Linebox>
    </StyledObject>
  );
};

export const margin = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"margin"} top={option.top} sample={samplecode('margin={"30px"}')} inline={true}>
        <Cardbox className={'border'} margin={"30px"}>{'margin={"30px"} ====> top = bottom = left = right = 30px;'}</Cardbox>
      </Linebox>
    </StyledObject>
  );
};

export const event = () => {
  return (
    <StyledObject className={"t-main"} >
      <Linebox title={"clear && event"} top={option.top} sample={samplecode(`onClear={} onEnter={} onChange={}`)}>
        <Cardbox className={'gray'} anim={true} onClick={action('onClick')}>{"onClick={}"}</Cardbox>
        <Cardbox className={'gray'} anim={true} onKeyPress={(e) => action('onKeyPress')}>{"onKeyPress={}"}</Cardbox>
      </Linebox>
    </StyledObject>
  );
};

export const customStyled = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"custom styled"} top={option.top} sample={samplecode('style={{ background: "rgba(0, 0, 0, 0.8)", overflow: "initial" }}')} inline={true}>
        <Cardbox className={'gray'} style={{ background: "rgba(0, 0, 0, 0.3)", overflow: "initial" }}>{'style={{ background: "rgba(0, 0, 0, 0.3)", overflow: "initial" }}'}</Cardbox>
      </Linebox>
    </StyledObject>
  );
};