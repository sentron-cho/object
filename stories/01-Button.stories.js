/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import Button from '../src/Button';
import { optionsKnob as options, withKnobs, text, boolean } from '@storybook/addon-knobs';
import styled from 'styled-components';
import cx from 'classnames/bind';
import { Linebox, op } from './00-Frame';
import { cs } from '../src';

const StyledObject = styled.span`{
  &.t-main {
    .lb-box { ${cs.w.get(800)} ${cs.p.b30} }

    // .lb-box .lb-li > * { ${cs.m.r10} }
    .lb-box.type .lb-li > * { ${cs.m.a0} }
    .lb-box.size { .lb-li { ${cs.h.get(48)} }}

    .res-view { 
      ${cs.h.get(100)} ${cs.w.get(800)} ${cs.bg.lightgray} 
      p { ${cs.m.a5} }
    }
  }
}`;

export default {
  title: 'object|Button', // 스토리북에서 보여질 그룹과 경로를 명시
  component: Button, // 어떤 컴포넌트를 문서화 할지 명시
  decorators: [withKnobs], // 애드온 적용
};

const samplecode = (value) => `<Button className={""} ${value} title={"button"} onClick={} />`;

export const object = () => {
  const border = boolean('is border', true);
  const title = text('title', 'Button');
  const bg = options('background', op.color('f'), '', op.radio(), 'Other');
  const size = options('size', op.size('n'), '', op.radio(), 'Other');
  const halign = options('horizantal align', op.halign(), '', op.radio(), 'Other');
  const valign = options('vertical align', op.valign(), '', op.radio(), 'Other');

  const [result, setResult] = useState(null);

  const onClick = (eid, e) => {
    setResult(`eid = ${eid}, e`);
  }

  return (
    <StyledObject className={"t-main"}>
      <Linebox className={'v-align nomargin'} title={"sample"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."} sample={samplecode()} box={true}>
        <Button className={cx('b-s', bg, size, { border }, halign, valign)} title={title} onClick={onClick} />
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

export const normal = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"normal"} sample={samplecode()}>
        <Button className={""} title={"button"} onClick={() => {''}} />
        <Button className={"trans"} title={"trans"} onClick={() => {''}} />
        <Button className={"primary"} title={"primary"} onClick={() => {''}} />
        <Button className={"yellow"} title={"yellow"} onClick={() => {''}} />
        <Button className={"orange"} title={"orange"} onClick={() => {''}} />
        <Button className={"red"} title={"red"} onClick={() => {''}} />
        <Button className={"green"} title={"green"} onClick={() => {''}} />
        <Button className={"dark"} title={"dark"} onClick={() => {''}} />
      </Linebox>

      <Linebox title={""} sample={samplecode()}>
        <Button className={"black"} title={"black"} onClick={() => {''}} />
        <Button className={"gray"} title={"gray"} onClick={() => {''}} />
        <Button className={"white"} title={"white"} onClick={() => {''}} />
        <Button className={"lightgray"} title={"lightgray"} onClick={() => {''}} />
        <Button className={"primary-line"} title={"primary-line"} onClick={() => {''}} />
        <Button className={"gray-line"} title={"gray-line"} onClick={() => {''}} />
        <Button className={"gd-gray"} title={"gd-gray"} onClick={() => {''}} />
      </Linebox>
    </StyledObject>
  );
};

export const disabled = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"disabled"} sample={samplecode()}>
        <Button className={"disabled"} title={"disabled"} onClick={() => {''}} />
        <Button className={"disabled trans"} title={"trans"} onClick={() => {''}} />
        <Button className={"disabled primary"} title={"primary"} onClick={() => {''}} />
        <Button className={"disabled yellow"} title={"yellow"} onClick={() => {''}} />
        <Button className={"disabled orange"} title={"orange"} onClick={() => {''}} />
        <Button className={"disabled red"} title={"red"} onClick={() => {''}} />
        <Button className={"disabled green"} title={"green"} onClick={() => {''}} />
        <Button className={"disabled dark"} title={"dark"} onClick={() => {''}} />
      </Linebox>

      <Linebox title={""} sample={samplecode()}>
        <Button className={"disabled black"} title={"black"} onClick={() => {''}} />
        <Button className={"disabled gray"} title={"gray"} onClick={() => {''}} />
        <Button className={"disabled white"} title={"white"} onClick={() => {''}} />
        <Button className={"disabled lightgray"} title={"lightgray"} onClick={() => {''}} />
        <Button className={"disabled primary-line"} title={"primary-line"} onClick={() => {''}} />
        <Button className={"disabled gray-line"} title={"gray-line"} onClick={() => {''}} />
        <Button className={"disabled gd-gray"} title={"gd-gray"} onClick={() => {''}} />
      </Linebox>
    </StyledObject>
  );
};

export const align = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"horizontal align"} className={"align"} sample={samplecode()} box={true}>
        <Button className={"primary left"} title={"left"} onClick={() => {''}} />
        <Button className={"primary center"} title={"center"} onClick={() => {''}} />
        <Button className={"primary right"} title={"right"} onClick={() => {''}} />
      </Linebox>

      <Linebox title={"vertical align"} className={"align v-align"} sample={samplecode()} box={true}>
        <Button className={"primary top"} title={"top"} onClick={() => {''}} />
        <Button className={"primary middle"} title={"middle"} onClick={() => {''}} />
        <Button className={"primary bottom"} title={"bottom"} onClick={() => {''}} />
      </Linebox>

      <Linebox title={"align"} className={"align v-align"} sample={samplecode()} box={true}>
        <Button className={"primary left top"} title={"left top"} onClick={() => {''}} />
        <Button className={"primary center top"} title={"center top"} onClick={() => {''}} />
        <Button className={"primary right top"} title={"right top"} onClick={() => {''}} />

        <Button className={"primary left middle"} title={"left middle"} onClick={() => {''}} />
        <Button className={"primary center middle"} title={"center middle"} onClick={() => {''}} />
        <Button className={"primary right middle"} title={"right middle"} onClick={() => {''}} />

        <Button className={"primary left bottom"} title={"left bottom"} onClick={() => {''}} />
        <Button className={"primary center bottom"} title={"center bottom"} onClick={() => {''}} />
        <Button className={"primary right bottom"} title={"right bottom"} onClick={() => {''}} />
      </Linebox>
    </StyledObject>
  );
};

export const type = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"type"} className={"nomargin"} sample={samplecode()}>
        <Button className={"primary ltype"} title={"primary ltype"} onClick={() => {''}} />
        <Button className={"primary ctype"} title={"primary ctype"} onClick={() => {''}} />
        <Button className={"primary rtype"} title={"primary rtype"} onClick={() => {''}} />
      </Linebox>
    </StyledObject>
  );
};

export const full = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"full"} className={"nomargin"} sample={samplecode()}>
        <Button className={"primary full"} title={"primary full"} onClick={() => {''}} />
      </Linebox>
    </StyledObject>
  );
};

export const size = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"size"} className={"size"} sample={samplecode()}>
        <Button className={"primary xs"} title={"primary xs"} onClick={() => {''}} />
        <Button className={"primary sm"} title={"primary sm"} onClick={() => {''}} />
        <Button className={"primary md"} title={"primary md"} onClick={() => {''}} />
        <Button className={"primary lg"} title={"primary lg"} onClick={() => {''}} />
        <Button className={"primary xl"} title={"primary xl"} onClick={() => {''}} />
      </Linebox>
    </StyledObject>
  );
};

export const border = () => {
  const list = [{ id: 1, name: 'com1', check: false }, { id: 2, name: 'com2', check: true }];

  return (
    <StyledObject className={"t-main"} id={"f0001"}>
      <Linebox title={"border options"} sample={samplecode('label={"combo"}', 'border')}>
        <Button className={"primary"} title={"blue radius"} list={list} frameid={"f0001"} border={{ radius: '5px', color: "blue" }} />
        <Button className={"primary"} title={"red radius 2px"} list={list} frameid={"f0001"} border={{ radius: '10px', color: "red", width: "2px" }} />
        <Button className={"primary"} title={"black radius 3px"} list={list} frameid={"f0001"} border={{ radius: '15px', color: "black", width: "3px" }} />
      </Linebox>
    </StyledObject>
  );
};

export const icontype = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"icon type"} sample={samplecode('icon={"menu"}')}>
        <Button className={"primary xs"} icon={"menu"} title={"icon xs"} onClick={() => {''}} />
        <Button className={"primary sm"} icon={"menu"} title={"icon sm"} onClick={() => {''}} />
        <Button className={"primary md"} icon={"menu"} title={"icon md"} onClick={() => {''}} />
        <Button className={"primary lg"} icon={"menu"} title={"icon lg"} onClick={() => {''}} />
        <Button className={"primary xl"} icon={"menu"} title={"icon xl"} onClick={() => {''}} />
      </Linebox>
    </StyledObject>
  );
};

export const iconcolor = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"icon color"} sample={samplecode('icon={"menu"} iconcolor={"white"}')}>
        <Button className={"dark sm"} icon={"menu"} title={cs.color.primary} iconcolor={cs.color.primary} onClick={() => {''}} />
        <Button className={"primary sm"} icon={"menu"} title={"white"} iconcolor={"white"} onClick={() => {''}} />
        <Button className={"primary sm"} icon={"menu"} title={"black"} iconcolor={"black"} onClick={() => {''}} />
        <Button className={"primary sm"} icon={"menu"} title={"red"} iconcolor={"red"} onClick={() => {''}} />
        <Button className={"primary sm"} icon={"menu"} title={"orange"} iconcolor={"orange"} onClick={() => {''}} />
        <Button className={"primary sm"} icon={"menu"} title={"blue"} iconcolor={"blue"} onClick={() => {''}} />
        <Button className={"primary sm"} icon={"menu"} title={"dark"} iconcolor={"dark"} onClick={() => {''}} />
        <Button className={"primary sm"} icon={"menu"} title={"gray"} iconcolor={"gray"} onClick={() => {''}} />
      </Linebox>
    </StyledObject>
  );
};

export const running = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"running"} sample={samplecode('icon={"menu"} isrun={true}')}>
        <Button className={"dark sm"} icon={"menu"} title={"running false"} isrun={false} onClick={() => {''}} />
        <Button className={"dark sm"} icon={"menu"} title={"running true"} isrun={true} onClick={() => {''}} />
        <Button className={"primary sm"} title={"running false"} isrun={false} onClick={() => {''}} />
        <Button className={"primary sm"} title={"running true"} isrun={true} onClick={() => {''}} />
      </Linebox>
    </StyledObject>
  );
};


export const theme = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"theme"} sample={samplecode('')}>
        <Button className={"primary"} theme={'sky'} title={"sky"} />
        <Button className={"primary"} theme={'primary'} title={"primary"} />
        <Button className={"primary"} theme={'gray'} title={"gray"} />
        <Button className={"primary"} theme={'dark'} title={"dark"} />
        <Button className={"primary"} theme={'black'} title={"black"} />
      </Linebox>
    </StyledObject>
  );
};