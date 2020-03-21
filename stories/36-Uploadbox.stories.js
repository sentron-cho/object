import React, { useState } from 'react';
import { optionsKnob as options, withKnobs, text, boolean, radios, number, button } from '@storybook/addon-knobs';
import styled from 'styled-components';
import cx from 'classnames/bind'
import { Linebox } from './00-Frame';
import { cs, Uploadbox, Button } from '../src';
import { IMG } from './sample/index';

const StyledObject = styled.span`{
  &.t-main {
    .lb-box { ${cs.w.full} }

    .lb-box .lb-li { ${cs.h.fit} }
    .v-align .lb-li { ${cs.h.get(800)} } 

    .res-view { ${cs.over.yauto} ${cs.scrollbar.t2}
      ${cs.h.get(200)} ${cs.w.get(780)} ${cs.bg.lightgray} 
      p { ${cs.m.a5} ${cs.font.preline} ${cs.font.breakall} ${cs.font.xs} }
    }    
  }
}`;

export default { title: 'object|Uploadbox', component: Uploadbox, decorators: [withKnobs] };

const samplecode = (value, classname = '') => `<Uploadbox className={"${classname}"} ${value} />`;

export const object = () => {
  button('refresh(옵션을 변경 후 버튼을 클릭하세요)', () => onRefresh());
  const size = options('size',
    { 'none': '', 'full(100%)': 'full', 'normal(4:3)': 'normal', 'wide(16:9)': 'wide', 'xwide(21:9)': 'xwide', 'fwide(28:9)': 'fwide' },
    '', { display: 'inline-radio' }, 'Other');
  const width = text('width size', 'full');

  const fit = options('object fit', { 'none': '', 'contain': 'contain', 'cover': 'cover', 'scale-down': 'scale-down', 'fill': 'fill' },
    '', { display: 'inline-radio' }, 'Other');

  const halign = options('horizantal align', { 'left': 'left', 'center': 'center', 'right': 'right' },
    '', { display: 'inline-radio' }, 'Other');
  const valign = options('vertical align', { 'top': 'top', 'middle': 'middle', 'bottom': 'bottom' },
    '', { display: 'inline-radio' }, 'Other');


  const isborder = boolean('border options', false);
  const border = isborder ? text('border color', '#909090') : '';
  const radius = isborder ? text('border radius', '5px') : '';
  const borderwidth = isborder ? text('border width', '1px') : '';

  const [result, setResult] = useState(null);

  let rObject;
  const onClick = (eid, e) => {
    const value = rObject.getValue();
    setResult(`${value}`);
  }

  const opt = {
    border: isborder ? { color: border, width: borderwidth, radius: radius } : null,
  };

  return (
    <StyledObject className={"t-main"} width={width}>
      <Linebox title={"toggle Uploadbox"} className={"nomargin"}
        desc={"Knobs 옵션을 통해 미리보기가 가능합니다."} sample={samplecode("", "")} box={false}>
        <Uploadbox ref={(ref) => rObject = ref} className={cx(size, halign, valign, 'border')} fit={fit} options={opt} size={size}
          src={IMG.Image1} title={"scroll(float)"} onClick={onClick} eid={'Uploadbox'} />
        <Button className={'primary'} title={"getValue"} onClick={onClick} />
      </Linebox>

      <div className={"res-view"}>
        <p>{result}</p>
      </div>
    </StyledObject>
  );
};

object.story = { name: 'Base' };

export const size = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"xsmall normal(4:3) w:240px"} sample={samplecode("size={'normal'}", '')} >
        <Uploadbox value={IMG.Image1} className={'xs'} />
      </Linebox>

      <Linebox title={"small normal(4:3) w:320px"} sample={samplecode("size={'normal'}", '')} >
        <Uploadbox value={IMG.Image1} className={'sm'} />
      </Linebox>

      <Linebox title={"middle normal(4:3) w:480px"} sample={samplecode("size={'normal'}", '')} >
        <Uploadbox value={IMG.Image2} className={'md'} />
      </Linebox>

      <Linebox title={"large normal(4:3) w:640px"} sample={samplecode("size={'normal'}", '')} >
        <Uploadbox value={IMG.Image3} className={'lg'} />
      </Linebox>

      <Linebox title={"xlarge normal(4:3) w:800px"} sample={samplecode("size={'normal'}", '')} >
        <Uploadbox value={IMG.Image3} className={'xl'} />
      </Linebox>

      <Linebox title={"xlarge normal(4:3) w:1024px"} sample={samplecode("size={'normal'}", '')} >
        <Uploadbox value={IMG.Image3} className={'xxl'} />
      </Linebox>

      <Linebox title={"wide large normal(4:3) w:1280px"} sample={samplecode("size={'normal'}", '')} >
        <Uploadbox value={IMG.Image3} className={'wl'} />
      </Linebox>
    </StyledObject>
  );
};

export const widesize = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"xsmall wide(16:9) w:240px"} sample={samplecode("", '')} >
        <Uploadbox value={IMG.Image1} className={'xs wide'} />
      </Linebox>

      <Linebox title={"small wide(16:9) w:320px"} sample={samplecode("", '')} >
        <Uploadbox value={IMG.Image1} className={'sm wide'} />
      </Linebox>

      <Linebox title={"middle wide(16:9) w:480px"} sample={samplecode("", '')} >
        <Uploadbox value={IMG.Image2} className={'md wide'} />
      </Linebox>

      <Linebox title={"large wide(16:9) w:640px"} sample={samplecode("", '')} >
        <Uploadbox value={IMG.Image3} className={'lg wide'} />
      </Linebox>

      <Linebox title={"xlarge wide(16:9) w:800px"} sample={samplecode("", '')} >
        <Uploadbox value={IMG.Image3} className={'xl wide'} />
      </Linebox>

      <Linebox title={"xxlarge wide(16:9) w:1024px"} sample={samplecode("", '')} >
        <Uploadbox value={IMG.Image3} className={'xxl wide'} />
      </Linebox>

      <Linebox title={"widelarge wide(16:9) w:1280px"} sample={samplecode("", '')} >
        <Uploadbox value={IMG.Image3} className={'wl wide'} />
      </Linebox>
    </StyledObject>
  );
};

export const xwidesize = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"xsmall xwide(21:9) w:240px"} sample={samplecode("", '')} >
        <Uploadbox value={IMG.Image1} className={'xs xwide'} />
      </Linebox>

      <Linebox title={"small xwide(21:9) w:320px"} sample={samplecode("", '')} >
        <Uploadbox value={IMG.Image1} className={'sm xwide'} />
      </Linebox>

      <Linebox title={"middle xwide(21:9) w:480px"} sample={samplecode("", '')} >
        <Uploadbox value={IMG.Image2} className={'md xwide'} />
      </Linebox>

      <Linebox title={"large xwide(21:9) w:640px"} sample={samplecode("", '')} >
        <Uploadbox value={IMG.Image3} className={'lg xwide'} />
      </Linebox>

      <Linebox title={"xlarge xwide(21:9) w:800px"} sample={samplecode("", '')} >
        <Uploadbox value={IMG.Image3} className={'xl xwide'} />
      </Linebox>

      <Linebox title={"xxlarge xwide(21:9) w:1024px"} sample={samplecode("", '')} >
        <Uploadbox value={IMG.Image3} className={'xxl xwide'} />
      </Linebox>

      <Linebox title={"wide large xwide(21:9) w:1280px"} sample={samplecode("", '')} >
        <Uploadbox value={IMG.Image3} className={'wl xwide'} />
      </Linebox>
    </StyledObject>
  );
};

export const fullsize = () => {
  return (
    <StyledObject className={"t-main"} desc={'full은 부모 width를 100%로 맞춥니다.'}>
      <Linebox title={"xsmall full"} sample={samplecode("", '')} >
        <Uploadbox value={IMG.Image1} className={'xs full'} />
      </Linebox>

      <Linebox title={"small full"} sample={samplecode("", '')} >
        <Uploadbox value={IMG.Image1} className={'sm full'} />
      </Linebox>

      <Linebox title={"middle full"} sample={samplecode("", '')} >
        <Uploadbox value={IMG.Image2} className={'md full'} />
      </Linebox>

      <Linebox title={"large full"} sample={samplecode("", '')} >
        <Uploadbox value={IMG.Image3} className={'lg full'} />
      </Linebox>

      <Linebox title={"xlarge full"} sample={samplecode("", '')} >
        <Uploadbox value={IMG.Image3} className={'xl full'} />
      </Linebox>
    </StyledObject>
  );
};

export const border = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"border radius"} sample={samplecode("", 'border')} >
        <Uploadbox value={IMG.Image1} className={'border radius sm'} />
      </Linebox>

      <Linebox title={"border option"} sample={samplecode("", 'border')} >
        <Uploadbox value={IMG.Image1} className={'sm'} border={{ radius: '5px', color: "blue", width: '1px' }} />
      </Linebox>

      <Linebox title={"border option"} sample={samplecode("", 'border radius')} >
        <Uploadbox value={IMG.Image1} className={'sm'} border={{ radius: '10px', color: "red", width: '2px' }} />
      </Linebox>

      <Linebox title={"border option"} sample={samplecode("", 'border radius')} >
        <Uploadbox value={IMG.Image1} className={'sm'} border={{ radius: '20px', color: "black", width: '5px' }} />
      </Linebox>
    </StyledObject>
  );
};


export const color = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"sky"} sample={samplecode("", 'sky')} >
        <Uploadbox value={IMG.Image1} className={'sm sky'} />
      </Linebox>

      <Linebox title={"gray"} sample={samplecode("", 'gray')} >
        <Uploadbox value={IMG.Image1} className={'sm gray'} />
      </Linebox>

      <Linebox title={"primary"} sample={samplecode("", 'gray')} >
        <Uploadbox value={IMG.Image1} className={'sm primary'} />
      </Linebox>

      <Linebox title={"dark"} sample={samplecode("", 'dark')} >
        <Uploadbox value={IMG.Image1} className={'sm dark'} />
      </Linebox>

      <Linebox title={"black"} sample={samplecode("", 'black')} >
        <Uploadbox value={IMG.Image1} className={'sm black'} />
      </Linebox>      
    </StyledObject>
  );
};

export const theme = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"sky"} sample={samplecode("", 'sky')} >
        <Uploadbox value={IMG.Image1} className={'sm primary'} theme={'sky'}/>
      </Linebox>

      <Linebox title={"gray"} sample={samplecode("", 'gray')} >
        <Uploadbox value={IMG.Image1} className={'sm'} theme={'gray'}/>
      </Linebox>

      <Linebox title={"primary"} sample={samplecode("", 'gray')} >
        <Uploadbox value={IMG.Image1} className={'sm'} theme={'primary'}/>
      </Linebox>

      <Linebox title={"dark"} sample={samplecode("", 'dark')} >
        <Uploadbox value={IMG.Image1} className={'sm'} theme={'dark'}/>
      </Linebox>

      <Linebox title={"black"} sample={samplecode("", 'black')} >
        <Uploadbox value={IMG.Image1} className={'sm'} theme={'black'}/>
      </Linebox>      
    </StyledObject>
  );
};

export const select = () => {
  const [result, setResult] = useState(null);

  const onSelect = (eid, e) => {
    setResult(`eid = ${eid}, e`);
  }

  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"sky"} sample={samplecode("", 'sky')} >
        <Uploadbox value={IMG.Image1} className={'sm'} theme={'sky'} onSelectedMedia={onSelect}/>
      </Linebox>

      <Linebox title={"primary"} sample={samplecode("", 'primary')} >
        <Uploadbox value={IMG.Image1} className={'sm'} theme={'primary'} onSelectedMedia={onSelect}/>
      </Linebox>

      <Linebox title={"gray"} sample={samplecode("", 'gray')} >
        <Uploadbox value={IMG.Image1} className={'sm'} theme={'gray'} onSelectedMedia={onSelect}/>
      </Linebox>

      <Linebox title={"dark"} sample={samplecode("", 'dark')} >
        <Uploadbox value={IMG.Image1} className={'sm'} theme={'dark'} onSelectedMedia={onSelect}/>
      </Linebox>

      <Linebox title={"black"} sample={samplecode("", 'black')} >
        <Uploadbox value={IMG.Image1} className={'sm'} theme={'black'} onSelectedMedia={onSelect}/>
      </Linebox>
      
      <div className={"res-view"}>
        <p>{result}</p>
      </div>
    </StyledObject>
  );
};