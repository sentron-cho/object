import React, { useState } from 'react';
import { optionsKnob as options, withKnobs, text, boolean, radios, number, button } from '@storybook/addon-knobs';
import styled from 'styled-components';
import cx from 'classnames/bind'
import { Linebox } from './00-Frame';
import { cs, Formgroup, Widgetbox, Util } from '../src';

const StyledObject = styled.span`{
  &.t-main {
    .lb-box { ${cs.w.get(800)} ${cs.p.b30} }

    // .lb-box .lb-li > * { ${cs.m.b10} }

    .t-child { ${cs.h.get(100)} & > p { ${cs.align.center} } }

    .res-view { 
      ${cs.h.get(100)} ${cs.w.get(800)} ${cs.bg.lightgray} 
      p { ${cs.m.a5} }
    }    
  }
}`;

export default { title: 'object|Formgroup', component: Formgroup, decorators: [withKnobs] };

const samplecode = (value, classname = '') => `<Formgroup className={"${classname}"} ${value} />`;

const jsonlist = (count = 5) => {
  let data = [];
  for (let i = 0; i < count; i++) {
    data.push({ id: i + 1, name: `label-${i}`, value: i + 1, icon: 'user' });
  }

  return data;
};

export const object = () => {
  const size = options('size',
    { 'sm(small)': 'sm', 'lg(large)': 'lg', 'none': '' },
    '', { display: 'inline-radio' }, 'Other');
  const bg = options('background',
    { primary: 'primary', gray: 'gray', dark: 'dark', none: '' },
    '', { display: 'inline-radio' }, 'Other');
  const animtype = options('animation',
    {
      slidein: 'slidein', slideout: 'slideout',
      fadein: 'fadein', fadeout: 'fadeout',
      slidedown: 'slidedown', slideup: 'slideup'
    }, '',
    { display: 'inline-radio' }, 'Other');
  const border = text('border color', '#909090');
  const radius = text('border radius', '0px');
  const width = text('border width', '1px');

  const bgcolor = text('border color', '#ffffff');
  const [result, setResult] = useState(null);

  const onSelected = (eid, rowid, e) => {
    setResult(`onSelected(eid = ${eid}, rowid = ${rowid}, e)`);
  }

  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"formgroup"} className={"nomargin"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."} sample={samplecode("", "")} box={true}>
        <Formgroup className={cx(size, bg)}
          child={Widgetbox} flex={true} list={jsonlist(3)}
          style={{ width: "80px" }}
          config={{ child: { className: `${size}` } }}
          border={{ color: border, radius: radius, width: width }}
          onSelected={onSelected} />
      </Linebox>

      <Linebox title={"formgroup"} className={"nomargin"} sample={samplecode("", "")} box={true}>
        <Formgroup className={cx(size, bg)}
          child={Widgetbox} flex={true} list={jsonlist(5)}
          config={{ child: { className: `${size}` } }}
          border={{ color: border, radius: radius, width: width }}
          onSelected={onSelected} />
      </Linebox>

      <div className={"res-view"}>
        <p>onClick</p>
        <p>{result}</p>
      </div>
    </StyledObject>
  );
};


export const color = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"no color"} className={"nomargin"} sample={samplecode("", "")} box={false}>
        <Formgroup className={''} child={Widgetbox} flex={true} list={jsonlist(3)} onSelected={() => { }}/>
      </Linebox>

      <Linebox title={"primary"} className={"nomargin"} sample={samplecode("", "")} box={false}>
        <Formgroup className={'primary'} child={Widgetbox} flex={true} list={jsonlist(3)} onSelected={() => { }}/>
      </Linebox>
      
      <Linebox title={"dark radius(child sm dark)"} className={"nomargin"} sample={samplecode('child={Widgetbox} config={{ child: { className: "noborder" } }}', "dark radius")} box={false}>
        <Formgroup className={'dark radius'} child={Widgetbox}
          config={{ child: { className: "sm dark" } }}
          flex={true} list={jsonlist(3)} onSelected={() => { }}/>
      </Linebox>  
      
      <Linebox title={"gray"} className={"nomargin"} sample={samplecode("", "")} box={false}>
        <Formgroup className={'gray'} child={Widgetbox}
          config={{ child: { className: "sm dark" } }}
          flex={true} list={jsonlist(3)} onSelected={() => { }} />
      </Linebox>

      <Linebox title={"dark radius(child sm gray)"} className={"nomargin"} sample={samplecode('child={Widgetbox} config={{ child: { className: "noborder" } }}', "dark radius")} box={false}>
        <Formgroup className={'dark radius'} child={Widgetbox}
          config={{ child: { className: "sm gray" } }}
          flex={true} list={jsonlist(3)} onSelected={() => { }}/>
      </Linebox>        
    </StyledObject>
  );
};

export const animation = () => {
  const refresh = button('refresh', () => { });
  const value = text('time', '3s');

  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"slidein"} top={option.top} sample={samplecode('anim={{ type: "slidein", time: "0.3s" }} config={{ child: { className: "sm" } }}')}>
        <Formgroup className={'sm'} anim={{ type: 'slidein', time: value }}
          config={{ child: { className: "sm" } }}
          child={Widgetbox} flex={true} list={jsonlist(3)} />
        <Formgroup className={'border'} anim={{ type: 'slideout', time: value }}
          config={{ child: { className: "sm" } }}
          child={Widgetbox} flex={true} list={jsonlist(3)} />
      </Linebox>

      <Linebox title={"slideup/slidedown"} top={option.top} sample={samplecode('anim={{ type: "fadein", time: "0.3s" }} config={{ child: { className: "sm dark" } }}')} inline={true}>
        <Formgroup className={'border'} anim={{ type: 'slideup', time: value }}
          config={{ child: { className: "sm dark" } }}
          child={Widgetbox} flex={true} list={jsonlist(3)} />
        <Formgroup className={'border'} anim={{ type: 'slidedown', time: value }}
          config={{ child: { className: "sm dark" } }}
          child={Widgetbox} flex={true} list={jsonlist(3)} />
      </Linebox>

      <Linebox title={"showin/showout"} top={option.top} sample={samplecode('anim={{ type: "showin", time: "0.3s" }} config={{ child: { className: "sm" } }}')} inline={true} >
        <Formgroup className={'border'} anim={{ type: 'showin', time: value }}
          config={{ child: { className: "sm" } }}
          child={Widgetbox} flex={true} list={jsonlist(3)} />
        <Formgroup className={'border'} anim={{ type: 'showout', time: value }}
          config={{ child: { className: "sm" } }}
          child={Widgetbox} flex={true} list={jsonlist(3)} />
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