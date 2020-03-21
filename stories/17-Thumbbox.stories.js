/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { optionsKnob as options, withKnobs, text, boolean } from '@storybook/addon-knobs';
import styled from 'styled-components';
import cx from 'classnames/bind'
import { Linebox } from './00-Frame';
import { cs, Thumbbox } from '../src';
import { IMG } from '../src/Icons';

const StyledObject = styled.span`{
  &.t-main {
    .lb-box { ${cs.w.get(800)} ${cs.p.b30} }

    .lb-box .lb-li { ${cs.h.get(140)} }

    .lb-box .lb-li > * { ${cs.m.r10} }

    .lb-box .lb-li.full { ${cs.h.get(180)} }

    .res-view { 
      ${cs.h.get(100)} ${cs.w.get(800)} ${cs.bg.lightgray} 
      p { ${cs.m.a5} }
    }    
  }
}`;

export default { title: 'object|Thumbbox', component: Thumbbox, decorators: [withKnobs] };

const samplecode = (value, classname = '') => `<Thumbbox className={"${classname}"} ${value} />`;

export const object = () => {
  const size = options('size',
    { 'none': '', 'sm(small)': 'sm', 'md(middle)': 'md', 'lg(large)': 'lg', },
    '', { display: 'inline-radio' }, 'Other');
  const animtime = text('animation time', '1s');
  const animtype = options('animation',
    {
      none: '', slidein: 'slidein', slideout: 'slideout',
      fadein: 'fadein', fadeout: 'fadeout',
      slidedown: 'slidedown', slideup: 'slideup',
    }, '',
    { display: 'inline-radio' }, 'Other');
  const isradius = boolean('radius', false);
  const isborder = boolean('border', false);
  const border = isborder ? text('border color', '#909090') : '';
  const radius = isborder ? text('border radius', '1px') : '';
  const width = isborder ? text('border width', '1px') : '';

  const [result, setResult] = useState(null);

  const onClick = (eid, e) => {
    setResult(`onClick(eid = ${eid}, e)`);
  }

  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"thumbbox"} className={"nomargin"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."} sample={samplecode("", "")} box={false}>
        <Thumbbox className={cx(size, isradius && 'radius')} anim={{ type: animtype, time: animtime }} src={IMG.Sample}
          border={isborder ? { color: border, radius: radius, width: width } : null}
          onClick={onClick} />
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
      <Linebox title={"size"} className={"nomargin"} sample={samplecode("", "sm")} box={true}>
        <Thumbbox className={cx('sm')} src={IMG.Sample} onClick={() => { }} />
        <Thumbbox className={cx('md')} src={IMG.Sample} onClick={() => { }} />
        <Thumbbox className={cx('lg')} src={IMG.Sample} onClick={() => { }} />
      </Linebox>

      <Linebox title={"full"} className={"nomargin full"} sample={samplecode("", "full")} box={true}>
        <Thumbbox className={cx('full')} src={IMG.Sample} onClick={() => { }} />
      </Linebox>

    </StyledObject>
  );
};

export const border = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"no border"} className={"nomargin"} sample={samplecode("", "")} box={false}>
        <Thumbbox className={cx('')} onClick={() => { }} />
        <Thumbbox className={cx('')} src={IMG.Sample} onClick={() => { }} />
      </Linebox>

      <Linebox title={"border radius"} className={""}
        sample={samplecode("", "border radius")}>
        <Thumbbox className={cx('border radius noimage')} onClick={() => { }} />
        <Thumbbox className={cx('border radius')} src={IMG.Sample} onClick={() => { }} />
      </Linebox>

      <Linebox title={"border options"} className={""}
        sample={samplecode("border={{ color: 'red', radius: '5px', width: '1px'}}", "")}>
        <Thumbbox className={cx('')} onClick={() => { }}
          border={{ color: 'red', radius: '5px', width: '1px' }} />
        <Thumbbox className={cx('')} onClick={() => { }} src={IMG.Sample}
          border={{ color: 'red', radius: '5px', width: '1px' }} />
      </Linebox>

      <Linebox title={"border options"} className={""}
        sample={samplecode("border={{ color: 'blue', radius: '10px', width: '3px' }}", "")}>
        <Thumbbox className={cx('')} onClick={() => { }}
          border={{ color: 'blue', radius: '10px', width: '3px' }} />
        <Thumbbox className={cx('')} onClick={() => { }} src={IMG.Sample}
          border={{ color: 'blue', radius: '10px', width: '3px' }} />
      </Linebox>

      <Linebox title={"border options"} className={""}
        sample={samplecode("border={{ color: 'black', radius: '20px', width: '10px'}}", "")}>
        <Thumbbox className={cx('')} onClick={() => { }}
          border={{ color: 'black', radius: '20px', width: '10px' }} />
        <Thumbbox className={cx('')} onClick={() => { }} src={IMG.Sample}
          border={{ color: 'black', radius: '20px', width: '10px' }} />
      </Linebox>
    </StyledObject>
  );
};


export const animation = () => {
  const value = text('time', '3s');

  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"slidein"} sample={samplecode('anim={{ type: "slidein", time: "0.3s" }} config={{ child: { className: "sm" } }}')}>
        <Thumbbox className={''} src={IMG.Sample} anim={{ type: 'slidein', time: value }} />
      </Linebox>

      <Linebox title={"slideout"} sample={samplecode('anim={{ type: "slideout", time: "0.3s" }} config={{ child: { className: "sm" } }}')}>
        <Thumbbox className={''} src={IMG.Sample} anim={{ type: 'slideout', time: value }} />
      </Linebox>

      <Linebox title={"slideup/slidedown"} sample={samplecode('anim={{ type: "fadein", time: "0.3s" }} config={{ child: { className: "sm dark" } }}')}>
        <Thumbbox className={''} src={IMG.Sample} anim={{ type: 'slideup', time: value }} />
        <Thumbbox className={''} src={IMG.Sample} anim={{ type: 'slidedown', time: value }} />
      </Linebox>

      <Linebox title={"showin/showout"} sample={samplecode('anim={{ type: "showin", time: "0.3s" }} config={{ child: { className: "sm" } }}')} >
        <Thumbbox className={''} src={IMG.Sample} anim={{ type: 'showin', time: value }} />
        <Thumbbox className={''} src={IMG.Sample} anim={{ type: 'showout', time: value }} />
      </Linebox>
    </StyledObject>
  );
};