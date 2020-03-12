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
    { 'none': '', 'sm(small)': 'sm', 'lg(large)': 'lg', },
    '', { display: 'inline-radio' }, 'Other');
  const bg = options('background',
    { none: '', primary: 'primary', gray: 'gray', dark: 'dark' },
    '', { display: 'inline-radio' }, 'Other');
  // const bgcolor = text('background color', '#ffffff');
  const animtime = text('animation time', '1s');
  const animtype = options('animation',
    {
      none: '', slidein: 'slidein', slideout: 'slideout',
      fadein: 'fadein', fadeout: 'fadeout',
      slidedown: 'slidedown', slideup: 'slideup',
    }, '',
    { display: 'inline-radio' }, 'Other');
  const isborder = boolean('border', false);
  const border = isborder ? text('border color', '#909090') : '';
  const radius = isborder ? text('border radius', '1px') : '';
  const width = isborder ? text('border width', '1px') : '';
  const padding = isborder ? text('border padding', '5px') : '';

  const [result, setResult] = useState(null);

  const onSelected = (eid, rowid, e) => {
    setResult(`onSelected(eid = ${eid}, rowid = ${rowid}, e)`);
  }

  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"formgroup"} className={"nomargin"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."} sample={samplecode("", "")} box={false}>
        <Formgroup className={cx(size, bg)} anim={{ type: animtype, time: animtime }}
          child={Widgetbox} flex={true} list={jsonlist(3)}
          style={{ width: '80px' }}
          config={{ child: { className: size } }}
          border={isborder ? { color: border, radius: radius, width: width, padding: padding } : null}
          onSelected={onSelected} />
      </Linebox>

      <Linebox title={"formgroup"} className={"nomargin"} sample={samplecode("", "")} box={false}>
        <Formgroup className={cx(size, bg)} anim={{ type: animtype, time: animtime }}
          child={Widgetbox} flex={true} list={jsonlist(5)}
          style={{ width: '80px' }}
          config={{ child: { className: size } }}
          border={isborder ? { color: border, radius: radius, width: width, padding: padding } : null}
          onSelected={onSelected} />
      </Linebox>

      <div className={"res-view"}>
        <p>onClick</p>
        <p>{result}</p>
      </div>
    </StyledObject>
  );
};

object.story = { name: 'Base' };

export const color = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"no color"} className={"nomargin"} sample={samplecode("", "")} box={false}>
        <Formgroup className={''} child={Widgetbox} flex={true} list={jsonlist(3)} onSelected={() => { }} />
      </Linebox>

      <Linebox title={"primary"} className={"nomargin"} sample={samplecode("", "")} box={false}>
        <Formgroup className={'primary'} child={Widgetbox} flex={true} list={jsonlist(3)} onSelected={() => { }} />
      </Linebox>

      <Linebox title={"dark radius(child sm dark)"} className={"nomargin"} sample={samplecode('child={Widgetbox} config={{ child: { className: "noborder" } }}', "dark radius")} box={false}>
        <Formgroup className={'dark radius'} child={Widgetbox}
          config={{ child: { className: "sm dark" } }}
          flex={true} list={jsonlist(3)} onSelected={() => { }} />
      </Linebox>

      <Linebox title={"gray"} className={"nomargin"} sample={samplecode("", "")} box={false}>
        <Formgroup className={'gray'} child={Widgetbox}
          config={{ child: { className: "sm dark" } }}
          flex={true} list={jsonlist(3)} onSelected={() => { }} />
      </Linebox>

      <Linebox title={"dark radius(child sm gray)"} className={"nomargin"} sample={samplecode('child={Widgetbox} config={{ child: { className: "noborder" } }}', "dark radius")} box={false}>
        <Formgroup className={'dark radius'} child={Widgetbox}
          config={{ child: { className: "sm gray" } }}
          flex={true} list={jsonlist(3)} onSelected={() => { }} />
      </Linebox>

      <Linebox title={"bgcolor option"} className={"nomargin"} sample={samplecode("", "")} box={false}>
        <Formgroup className={'radius'} child={Widgetbox}
          config={{ child: { className: "sm gray" } }} bgcolor={"#fff252"}
          flex={true} list={jsonlist(3)} onSelected={() => { }} />
      </Linebox>
    </StyledObject>
  );
};


export const border = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"no border"} className={"nomargin"} sample={samplecode("", "")} box={false}>
        <Formgroup className={''} child={Widgetbox} flex={true} list={jsonlist(3)} onSelected={() => { }} />
      </Linebox>

      <Linebox title={"border options"} className={""}
        sample={samplecode("border={{ color: 'red', radius: '5px', width: '1px', padding: '0' }}", "")}>
        <Formgroup className={''} child={Widgetbox} flex={true} list={jsonlist(3)} onSelected={() => { }}
          border={{ color: 'red', radius: '5px', width: '1px', padding: '0' }} />
      </Linebox>

      <Linebox title={"border options"} className={""}
        sample={samplecode("border={{ color: 'blue', radius: '10px', width: '2px', padding: '5px' }}", "")}>
        <Formgroup className={''} child={Widgetbox} flex={true} list={jsonlist(3)} onSelected={() => { }}
          border={{ color: 'blue', radius: '10px', width: '2px', padding: '5px' }} />
      </Linebox>

      <Linebox title={"border options"} className={""}
        sample={samplecode("border={{ color: 'black', radius: '20px', width: '10px', padding: '5px 10px' }}", "")}>
        <Formgroup className={''} child={Widgetbox} flex={true} list={jsonlist(3)} onSelected={() => { }}
          border={{ color: 'black', radius: '20px', width: '10px', padding: '5px 10px' }} />
      </Linebox>
    </StyledObject>
  );
};

export const animation = () => {
  const refresh = button('refresh', () => { });
  const value = text('time', '3s');

  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"slidein"} sample={samplecode('anim={{ type: "slidein", time: "0.3s" }} config={{ child: { className: "sm" } }}')}>
        <Formgroup className={'sm'} anim={{ type: 'slidein', time: value }}
          config={{ child: { className: "sm" } }}
          child={Widgetbox} flex={true} list={jsonlist(3)} />
        <Formgroup className={'border'} anim={{ type: 'slideout', time: value }}
          config={{ child: { className: "sm" } }}
          child={Widgetbox} flex={true} list={jsonlist(3)} />
      </Linebox>

      <Linebox title={"slideup/slidedown"} sample={samplecode('anim={{ type: "fadein", time: "0.3s" }} config={{ child: { className: "sm dark" } }}')} inline={true}>
        <Formgroup className={'border'} anim={{ type: 'slideup', time: value }}
          config={{ child: { className: "sm dark" } }}
          child={Widgetbox} flex={true} list={jsonlist(3)} />
        <Formgroup className={'border'} anim={{ type: 'slidedown', time: value }}
          config={{ child: { className: "sm dark" } }}
          child={Widgetbox} flex={true} list={jsonlist(3)} />
      </Linebox>

      <Linebox title={"showin/showout"} sample={samplecode('anim={{ type: "showin", time: "0.3s" }} config={{ child: { className: "sm" } }}')} inline={true} >
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