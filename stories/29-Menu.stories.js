import React, { useState } from 'react';
import { optionsKnob as options, withKnobs, text, boolean, radios, number, button } from '@storybook/addon-knobs';
import styled from 'styled-components';
import cx from 'classnames/bind'
import { Linebox } from './00-Frame';
import { cs, Menu, Util } from '../src';
import { IMG } from './sample/index';

const StyledObject = styled.span`{
  &.t-main {
    .lb-box { ${cs.w.full} ${cs.p.b30} ${cs.max.width(1200)}}

    // .lb-box .lb-li > * { ${cs.m.b10} ${cs.h.get(400)} }
    .lb-box .lb-li { ${cs.h.fit} ${({ height }) => height && cs.h.get(height)} }
    .v-align .lb-li { ${cs.h.get(400)} } 

    .res-view { 
      ${cs.h.get(100)} ${cs.w.get(800)} ${cs.bg.lightgray} 
      p { ${cs.m.a5} }
    }    
  }
}`;

export default { title: 'object|Menu', component: Menu, decorators: [withKnobs] };

const samplecode = (value, classname = '') => `<Menu className={"${classname}"} ${value} />`;

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
  const [refresh, setRefresh] = useState(false);

  const onClick = (eid, e) => {
    setResult(`onChange(eid = ${eid}, e)`);
  }

  const onRefresh = (e) => {
    setRefresh(true);
    setTimeout(() => setRefresh(false), 200);
  }

  const opt = {
    border: isborder ? { color: border, width: borderwidth, radius: radius } : null,
  };

  return (
    <StyledObject className={"t-main"} width={width}>
      <Linebox title={"toggle Menu"} className={"nomargin"}
        desc={"Knobs 옵션을 통해 미리보기가 가능합니다."} sample={samplecode("", "")} box={true}>
        {!refresh && <Menu className={cx(size, halign, valign, 'border')} fit={fit} options={opt} size={size}
          src={IMG.Image1} title={"scroll(float)"} onClick={onClick} eid={'Menu'} />}
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
      <Linebox title={"size normal(4:3)"} sample={samplecode("size={'normal'}", 'left')} >
        <Menu src={''} className={'border'} size={'normal'} />
      </Linebox>

      <Linebox title={"size wide(16:9)"} sample={samplecode("size={'wide'}", 'left')} >
        <Menu src={IMG.Image3} className={'border'} size={'wide'} />
      </Linebox>

      <Linebox title={"size xwide(21:9)"} sample={samplecode("size={'xwide'}", 'left')} >
        <Menu src={IMG.Image1} className={'border'} size={'xwide'} />
      </Linebox>

      <Linebox title={"size fwide(28:9)"} sample={samplecode("size={'fwide'}", 'left')} >
        <Menu src={IMG.Image4} className={'border'} size={'fwide'} />
      </Linebox>

      <Linebox title={"size full(w:100%)"} sample={samplecode("size={'full'}", 'left')} >
        <Menu src={IMG.Image2} className={'border'} size={'full'} />
      </Linebox>
    </StyledObject>
  );
};

export const box = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"border"} sample={samplecode("size={'wide'}", 'border')} >
        <Menu src={IMG.Image1} className={'border'} size={'wide'} />
      </Linebox>

      <Linebox title={"border radius"} sample={samplecode("size={'wide'}", 'border radius')} >
        <Menu src={IMG.Image1} className={'border radius'} size={'wide'} />
      </Linebox>
    </StyledObject>
  );
};

export const align = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"horizontal align"} className={"align"} sample={samplecode()} box={true}>
        <Menu src={IMG.Image1} size={'wide'} maxheight={"100px"} className={"left"} />
        <Menu src={IMG.Image1} size={'wide'} maxheight={"100px"} className={"center"} />
        <Menu src={IMG.Image1} size={'wide'} maxheight={"100px"} className={"right"} />
      </Linebox>

      <Linebox title={"vertical align"} className={"align v-align"} sample={samplecode()} box={true}>
        <Menu src={IMG.Image1} size={'wide'} maxheight={"100px"} className={"top"} />
        <Menu src={IMG.Image1} size={'wide'} maxheight={"100px"} className={"middle"} />
        <Menu src={IMG.Image1} size={'wide'} maxheight={"100px"} className={"bottom"} />
      </Linebox>

      <Linebox title={"align"} className={"align v-align"} sample={samplecode()} box={true}>
        <Menu src={IMG.Image1} size={'wide'} maxheight={"100px"} className={"left top"} />
        <Menu src={IMG.Image1} size={'wide'} maxheight={"100px"} className={"center top"} />
        <Menu src={IMG.Image1} size={'wide'} maxheight={"100px"} className={"right top"} />

        <Menu src={IMG.Image1} size={'wide'} maxheight={"100px"} className={"left middle"} />
        <Menu src={IMG.Image1} size={'wide'} maxheight={"100px"} className={"center middle"} />
        <Menu src={IMG.Image1} size={'wide'} maxheight={"100px"} className={"right middle"} />

        <Menu src={IMG.Image1} size={'wide'} maxheight={"100px"} className={"left bottom"} />
        <Menu src={IMG.Image1} size={'wide'} maxheight={"100px"} className={"center bottom"} />
        <Menu src={IMG.Image1} size={'wide'} maxheight={"100px"} className={"right bottom"} />
      </Linebox>
    </StyledObject>
  );
};

export const border = () => {
  return (
    <StyledObject className={"t-main"} >
      <Linebox title={"border options"} sample={samplecode('', 'sky')}>
        <Menu className={"cover lg"} src={IMG.Image1} size={'wide'} options={{ border: { color: "red", width: '1px', radius: "5px" } }} />
      </Linebox>

      <Linebox title={"border options"} sample={samplecode('', 'sky')}>
        <Menu className={"cover lg"} src={IMG.Image1} size={'wide'} options={{ border: { color: "blue", width: '2px', radius: "10px" } }} />
      </Linebox>

      <Linebox title={"border options"} sample={samplecode('', 'sky')}>
        <Menu className={"cover lg"} src={IMG.Image1} size={'wide'} options={{ border: { color: "black", width: '5px', radius: "20px" } }} />
      </Linebox>
    </StyledObject>
  );
};

export const edited = () => {
  return (
    <StyledObject className={"t-main"} >
      <Linebox title={"border options"} sample={samplecode('', 'sky')}>
        <Menu className={"border"} src={''} size={'wide'} edited={true}/>
      </Linebox>
    </StyledObject>
  );
};
