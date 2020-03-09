import React, { useState } from 'react';
import { withKnobs, text, boolean, radios } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';
import cx from 'classnames/bind'
import { Linebox } from './00-Frame';
import { cs, Svg, Svgbox, Svglist } from '../src';

const StyledObject = styled.span`{
  &.t-main {
    .lb-box { ${cs.w.get(800)} ${cs.pos.relative} }

    // .lb-box .lb-li { ${cs.min.height(60)} }
    // .lb-box .lb-li > * { ${cs.m.r10} ${cs.m.t10} }

    // .lb-box.align .lb-li > * { ${cs.m.a0} }
    .res-view { 
      ${cs.h.get(100)} ${cs.w.get(800)} ${cs.bg.lightgray} 
      p { ${cs.m.a5} }
    }
  }
}`;

export default {
  title: 'object|Svg', // 스토리북에서 보여질 그룹과 경로를 명시
  component: Svg, // 어떤 컴포넌트를 문서화 할지 명시
  decorators: [withKnobs], // 애드온 적용
};

const samplecode = (value, classname = '') => `<Svg className={"${classname}"} ${value} />`;

export const object = () => {
  const title = text('title', null);
  const label = text('label', 'label');
  const message = text('message', '');
  const [result, setResult] = useState(null);

  const onClick = (eid, e) => {
    setResult(`eid = ${eid}, e`);
  }

  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"size"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."} top={option.top} sample={samplecode('', 'sm')} box={true}>
        <Svg className="xs" name={"edit"} eid={'svg'} onClick={onClick} />
        <Svg className="sm" name={"edit"} eid={'svg'} onClick={onClick} />
        <Svg className="md" name={"edit"} eid={'svg'} onClick={onClick} />
        <Svg className="lg" name={"edit"} eid={'svg'} onClick={onClick} />
        <Svg className="xl" name={"edit"} eid={'svg'} onClick={onClick} />
        <Svg className="xxl" name={"edit"} eid={'svg'} onClick={onClick} />
      </Linebox>

      <Linebox title={"position"} className={'align v-align'} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."} top={option.top} sample={samplecode('', 'left middle')} box={true}>
        <Svg className="left" name={"edit"} eid={'left'} onClick={onClick} />
        <Svg className="center" name={"edit"} eid={'center'} onClick={onClick} />
        <Svg className="right" name={"edit"} eid={'right'} onClick={onClick} />
        
        <Svg className="left middle" name={"edit"} eid={'left middle'} onClick={onClick} />
        <Svg className="center middle" name={"edit"} eid={'center middle'} onClick={onClick} />
        <Svg className="right middle" name={"edit"} eid={'right middle'} onClick={onClick} />

        <Svg className="left bottom" name={"edit"} eid={'left bottom'} onClick={onClick} />
        <Svg className="center bottom" name={"edit"} eid={'center bottom'} onClick={onClick} />
        <Svg className="right bottom" name={"edit"} eid={'right bottom'} onClick={onClick} />
      </Linebox>      

      <div className={"res-view"}>
        <p>onClick</p>
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

export const size = () => {
  const list = [{ id: 1, name: 'check', check: true }];

  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"size"} top={option.top} sample={samplecode('label={"label"} list={list}', '')}>
      </Linebox>
    </StyledObject>
  );
};