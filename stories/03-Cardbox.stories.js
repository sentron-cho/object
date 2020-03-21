/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { optionsKnob as options, withKnobs, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';
import cx from 'classnames/bind'
import { Linebox } from './00-Frame';
import { cs, Cardbox } from '../src';

const StyledObject = styled.span`{
  &.t-main {
    .lb-box { ${cs.w.get(800)} }

    .lb-box .lb-li { ${cs.h.get(120)} ${cs.font.sm} }
    .anim-test { ${cs.h.get(60)}
      .anim-time { ${cs.w.get(100)} ${cs.disp.inblock} ${cs.float.left} ${cs.m.r20} }
    }

    .align { ${cs.pos.relative} }
  }
}`;

export default {
  title: 'object|Cardbox', // 스토리북에서 보여질 그룹과 경로를 명시
  component: Cardbox, // 어떤 컴포넌트를 문서화 할지 명시
  decorators: [withKnobs], // 애드온 적용
};

const samplecode = (value, classname = '') => `<Cardbox className={"${classname}"} ${value} />`;

export const object = () => {
  const classname = text('classname', '');
  const animtime = text('animtime', "1.5s");
  const radius = boolean('radius', false);
  const round = boolean('round', false);
  const shadow = boolean('shadow', false);
  const invisible = boolean('child invisible', false);
  const border = { color: null, width: null, radius: null };
  const bgcolor = text('bgcolor', '');
  const box = boolean('border', true);
  const width = text('width', '140px');
  const height = text('height', '100px');
  const align = options('align',
    { center: 'center', ycenter: 'ycenter', middle: 'middle' }, '',
    { display: 'inline-radio' }, 'Other');
  const animtype = options('animation',
    {
      slidein: 'slidein', slideout: 'slideout',
      fadein: 'fadein', fadeout: 'fadeout',
      slidedown: 'slidedown', slideup: 'slideup'
    }, '',
    { display: 'inline-radio' }, 'Other');
  const size = options('size',
    { 'w50(1/2)': 'w50', 'w33(1/3)': 'w33', 'w25(1/4)': 'w25', 'w20(1/5)': 'w20', 'w10(1/10)': 'w10', 'full': 'full', half: 'half' }, '',
    { display: 'inline-radio' }, 'Other');

  return (
    <StyledObject className={"t-main"}>
      <Linebox className={"align"} title={"sample"} box={true} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."} sample={samplecode()}>
        <Cardbox className={cx('b-s', classname, align, size, box && 'border', { radius }, { round }, { shadow }, { invisible })}
          bgcolor={bgcolor} border={border} width={width} height={height} anim={{ type: animtype, time: animtime }}>
          <div>child</div>
        </Cardbox>
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
      <Linebox title={"normal nobox nosize"} top={option.top} sample={samplecode("", "")} box={true}>
        <Cardbox className={''}><div style={{ background: "#aaa" }}>cardbox child</div></Cardbox>
      </Linebox>

      <Linebox title={"border"} top={option.top} box={true} sample={samplecode("", "border invisible")}>
        <Cardbox className={'border'} style={{ margin: "5px" }} width={"160px"} height={"100px"}><div style={{ background: "#aaa" }}>size 160 * 100</div></Cardbox>
      </Linebox>

      <Linebox title={"border child-invisible"} top={option.top} box={true} sample={samplecode("", "border invisible")}>
        <Cardbox className={'border invisible'} style={{ margin: "5px" }} width={"160px"} height={"100px"}><div style={{ background: "#aaa" }}>child</div></Cardbox>
      </Linebox>
    </StyledObject>
  );
};

export const color = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"color"} top={option.top} sample={samplecode("", "sky")} inline={true}>
        <Cardbox className={'sky'}>sky</Cardbox>
        <Cardbox className={'yellow'}>yellow</Cardbox>
        <Cardbox className={'green'}>green</Cardbox>
        <Cardbox className={'orange'}>orange</Cardbox>
      </Linebox>

      <Linebox title={""} top={option.top} sample={samplecode("", "primary")} inline={true}>
        <Cardbox className={'red'}>red</Cardbox>
        <Cardbox className={'primary'}>primary</Cardbox>
        <Cardbox className={'blue'}>blue</Cardbox>
        <Cardbox className={'alphagray'}>alphagray</Cardbox>
      </Linebox>

      <Linebox title={""} top={option.top} sample={samplecode("", "black")} inline={true}>
        <Cardbox className={'gray'}>gray</Cardbox>
        <Cardbox className={'dark'}>dark</Cardbox>
        <Cardbox className={'black'}>black</Cardbox>
        <Cardbox className={'alphablack'} bgcolor={cs.color.alphablack} >bgcolor option</Cardbox>
      </Linebox>
    </StyledObject>
  );
};

export const border = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"border and color"} top={option.top} sample={samplecode("", "border radius")} inline={true}>
        <Cardbox className={'border'}>border</Cardbox>
        <Cardbox className={'border radius'}>border radius</Cardbox>
        <Cardbox className={'border round'}>border round</Cardbox>
        <Cardbox className={'border shadow'} style={{ height: "calc(100% - 10px)" }} >border shadow</Cardbox>
      </Linebox>

      <Linebox title={""} top={option.top} sample={samplecode("", "border sky")} inline={true}>
        <Cardbox className={'border yellow'}>yellow</Cardbox>
        <Cardbox className={'border sky'}>sky</Cardbox>
        <Cardbox className={'border red'}>red</Cardbox>
        <Cardbox className={'border primary'}>primary</Cardbox>
      </Linebox>

      <Linebox title={""} top={option.top} sample={samplecode("", "border gray")} inline={true}>
        <Cardbox className={'border gray'}>gray</Cardbox>
        <Cardbox className={'border alphablack'}>alphablack</Cardbox>
        <Cardbox className={'border dark'}>dark</Cardbox>
        <Cardbox className={'border black'}>black</Cardbox>
      </Linebox>

      <Linebox title={""} top={option.top} sample={samplecode("", "border gray")} inline={true}>
        <Cardbox className={'border'} border={{ color: cs.color.alphagray }}>gray</Cardbox>
        <Cardbox className={'border'} border={{ width: "2px" }}>alphablack</Cardbox>
        <Cardbox className={'border'} border={{ radius: "20px" }}>dark</Cardbox>
        <Cardbox className={'border'} border={{ color: cs.color.alphagray, width: "2px", radius: "20px" }}>black</Cardbox>
      </Linebox>
    </StyledObject>
  );
};

export const sizetype = () => {
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

export const align = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox className={"align szie-c"} title={"align center"} box={true} desc={"parent {position: relative}"} top={option.top} sample={samplecode('center')}>
        <Cardbox className={'border center'} width={"140px"} height={"80px"}>x center</Cardbox>
      </Linebox>

      <Linebox className={"align szie-y"} title={"align ycenter"} box={true} desc={"parent {position: relative}"} top={option.top} sample={samplecode('ycenter')}>
        <Cardbox className={'border ycenter'} width={"140px"} height={"80px"}>y center</Cardbox>
      </Linebox>

      <Linebox className={"align szie-m"} title={"align middle"} box={true} desc={"parent {position: relative}"} top={option.top} sample={samplecode('middle')}>
        <Cardbox className={'border middle'} width={"140px"} height={"80px"}>x/y center</Cardbox>
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

      <Linebox title={"click && event"} top={option.top} sample={samplecode(`onClick={}`)}>
        <Cardbox className={'gray'} anim={true} onClick={action('onClick')}>{"onClick={}"}</Cardbox>
      </Linebox>

      {/* <Linebox title={"keypress && event"} top={option.top} sample={samplecode(`onKeyPress={}`)}>
        <Cardbox className={'gray'} anim={true} onKeyPress={(e) => action('onKeyPress')}>{"onKeyPress={}"}</Cardbox>
      </Linebox> */}
    </StyledObject>
  );
};

export const animation = () => {
  const value = text('time', '3s');

  // const [value, setValue] = useState("3s");
  const [, setAnimtag] = useState("");

  const onAnimation = (eid, e) => {
    if (eid === "start") {
      setAnimtag(eid);
    } else {  //end
      // setValue(time || '200ms');
      setTimeout(() => setAnimtag(eid), 500)
    }
  }

  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"slidein/out"} top={option.top} sample={samplecode('anim={{ type: "slidein", time: "0.3s" }}')} inline={true}>
        <Cardbox className={'border'} anim={{ type: 'slidein', time: value }} >{`slidein(${value})`}</Cardbox>
        <Cardbox className={'border'} anim={{ type: 'slideout', time: value }} >{`slideout(${value})`}</Cardbox>
      </Linebox>

      <Linebox title={"slideup/down"} top={option.top} sample={samplecode('anim={{ type: "fadein", time: "0.3s" }}')} inline={true}>
        <Cardbox className={'border'} anim={{ type: 'slidedown', time: value }}>{`slidedown(${value})`}</Cardbox>
        <Cardbox className={'border'} anim={{ type: 'slideup', time: value }}>{`slideup(${value})`}</Cardbox>
      </Linebox>

      <Linebox title={"showin/out & event"} top={option.top} sample={samplecode('anim={{ type: "showin", time: "0.3s" }}')} inline={true}>
        <Cardbox className={'border'} anim={{ type: 'showin', time: value }} onAnimation={onAnimation}>{`showin(${value}) - onAnimation(eid=start, e)`}</Cardbox>
        <Cardbox className={'border'} anim={{ type: 'showout', time: value }} onAnimation={onAnimation}>{`showout(${value}) - onAnimation(eid=end, e)`}</Cardbox>
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


export const theme = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"theme"} top={option.top} sample={samplecode("theme={'sky'}", "sky")} inline={true}>
        <Cardbox className={'primary'} theme={'sky'}>sky</Cardbox>
        <Cardbox className={'primary'} theme={'primary'}>primary</Cardbox>
        <Cardbox className={'primary'} theme={'gray'}>gray</Cardbox>
        <Cardbox className={'primary'} theme={'dark'}>dark</Cardbox>
        <Cardbox className={'primary'} theme={'black'}>black</Cardbox>
      </Linebox>
    </StyledObject>
  );
};