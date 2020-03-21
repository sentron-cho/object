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

    .res-view { 
      ${cs.h.get(100)} ${cs.w.get(800)} ${cs.bg.lightgray} 
      p { ${cs.m.a5} }
    }

    .s-box .lb-li > * { ${cs.m.t10} ${cs.m.r0} }
    .icon-list { ${cs.max.width(1280)} ${cs.w.get("auto")} ${cs.h.get("auto")} }
  }
}`;

export default {
  title: 'object|Svg', // 스토리북에서 보여질 그룹과 경로를 명시
  component: Svg, // 어떤 컴포넌트를 문서화 할지 명시
  decorators: [withKnobs], // 애드온 적용
};

const samplecode = (value, classname = '') => `<Svg className={"${classname}"} ${value} />`;

export const object = () => {
  const icon = text('iconname', 'edit');
  const [result, setResult] = useState(null);

  const onClick = (eid, e) => {
    setResult(`eid = ${eid}, e`);
  }

  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"size"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."}
        top={option.top} sample={samplecode('icon={"edit"}', 'sm')} box={true}>
        <Svg className="xs" icon={icon} eid={'svg'} onClick={onClick} />
        <Svg className="sm" icon={icon} eid={'svg'} onClick={onClick} />
        <Svg className="md" icon={icon} eid={'svg'} onClick={onClick} />
        <Svg className="lg" icon={icon} eid={'svg'} onClick={onClick} />
        <Svg className="xl" icon={icon} eid={'svg'} onClick={onClick} />
        <Svg className="xxl" icon={icon} eid={'svg'} onClick={onClick} />
      </Linebox>

      <Linebox title={"size"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."}
        top={option.top} sample={samplecode('icon={"edit"}', 'sm')} box={true}>
        <Svg className="xs box" icon={'user'} eid={'svg'} onClick={onClick} />
        <Svg className="sm box" icon={'user'} eid={'svg'} onClick={onClick} />
        <Svg className="md box" icon={'user'} eid={'svg'} onClick={onClick} />
        <Svg className="lg box" icon={'user'} eid={'svg'} onClick={onClick} />
        <Svg className="xl box" icon={'user'} eid={'svg'} onClick={onClick} />
        <Svg className="xxl box" icon={'user'} eid={'svg'} onClick={onClick} />
      </Linebox>

      <Linebox title={"size"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."}
        top={option.top} sample={samplecode('icon={"edit"}', 'sm')} box={true}>
        <Svg className="xs box radius" icon={'user'} eid={'svg'} onClick={onClick} />
        <Svg className="sm box radius" icon={'user'} eid={'svg'} onClick={onClick} />
        <Svg className="md box radius" icon={'user'} eid={'svg'} onClick={onClick} />
        <Svg className="lg box radius" icon={'user'} eid={'svg'} onClick={onClick} />
        <Svg className="xl box radius" icon={'user'} eid={'svg'} onClick={onClick} />
        <Svg className="xxl box radius" icon={'user'} eid={'svg'} onClick={onClick} />
      </Linebox>      

      <Linebox title={"position"} className={'align v-align'}
        top={option.top} sample={samplecode('icon={"edit"}', 'left middle')} box={true}>
        <Svg className="left top" icon={icon} eid={'left top'} onClick={onClick} />
        <Svg className="center top" icon={icon} eid={'center top'} onClick={onClick} />
        <Svg className="right top" icon={icon} eid={'right top'} onClick={onClick} />

        <Svg className="left middle" icon={icon} eid={'left middle'} onClick={onClick} />
        <Svg className="center middle" icon={icon} eid={'center middle'} onClick={onClick} />
        <Svg className="right middle" icon={icon} eid={'right middle'} onClick={onClick} />

        <Svg className="left bottom" icon={icon} eid={'left bottom'} onClick={onClick} />
        <Svg className="center bottom" icon={icon} eid={'center bottom'} onClick={onClick} />
        <Svg className="right bottom" icon={icon} eid={'right bottom'} onClick={onClick} />
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

export const icons = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox className={"icon-list"} title={"icon list"} top={option.top} sample={samplecode('label={"label"} list={list}', '')}>
        <Svglist className={'showcase'} show={true} size={"lg"} />
      </Linebox>
    </StyledObject>
  );
};

export const svgbox = () => {
  const [result, setResult] = useState(null);

  const onClick = (eid, rowid, e) => {
    setResult(`eid = ${eid}, rowid = ${rowid}, e`);
  }

  const sample = (value, classname = '') => `<Svgbox className={primary left top} 'size={"sm"} rowid={"a1"} onClick={onClick}' 
    list = {[{ icon: 'edit' }, { icon: 'delete' }, { icon: 'new' }]}/>`;
  const icons = [{ icon: 'edit' }, { icon: 'delete' }, { icon: 'new' }];
  return (
    <StyledObject className={"t-main"}>
      <Linebox className={"align v-align"} title={"svg box(group)"} top={option.top} box={true} sample={sample()} >
        <Svgbox className={cx('primary left top')} size={"sm"} rowid={'a1'} onClick={onClick} list={icons} />
        <Svgbox className={cx('primary center top')} size={"sm"} rowid={'a2'} onClick={onClick} list={icons} />
        <Svgbox className={cx('primary right top')} size={"sm"} rowid={'a3'} onClick={onClick} list={icons} />

        <Svgbox className={cx('gray left middle')} size={"sm"} rowid={'a4'} onClick={onClick} list={icons} />
        <Svgbox className={cx('dark center middle')} size={"sm"} rowid={'a5'} onClick={onClick} list={icons} />
        <Svgbox className={cx('orange right middle')} size={"sm"} rowid={'a6'} onClick={onClick} list={icons} />

        <Svgbox className={cx('yellow left bottom')} size={"sm"} rowid={'a7'} onClick={onClick} list={icons} />
        <Svgbox className={cx('alphablack center bottom')} size={"sm"} rowid={'a8'} onClick={onClick} list={icons} />
        <Svgbox className={cx('primary right bottom')} size={"sm"} rowid={'a9'} onClick={onClick} list={icons} />
      </Linebox>

      <Linebox className={"align"} title={"gray full left"} top={option.top} sample={sample()} >
        <Svgbox className={cx('gray full left')} size={"sm"} rowid={'a123'} onClick={onClick} list={icons} />
      </Linebox>

      <Linebox className={"align"} title={"gray full center"} top={option.top} sample={sample()} >
        <Svgbox className={cx('gray full center')} size={"sm"} rowid={'a123'} onClick={onClick} list={icons} />
      </Linebox>

      <Linebox className={"align"} title={"gray full right"} top={option.top} sample={sample()} >
        <Svgbox className={cx('gray full right')} size={"sm"} rowid={'a123'} onClick={onClick} list={icons} />                
      </Linebox>      
      
      <div className={"res-view"}>
        <p>onClick</p>
        <p>{result}</p>
      </div>
    </StyledObject>
  );
};