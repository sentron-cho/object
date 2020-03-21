import React, { useState } from 'react';
import { optionsKnob as options, withKnobs, text, boolean, radios, number, button } from '@storybook/addon-knobs';
import styled from 'styled-components';
import cx from 'classnames/bind'
import { Linebox } from './00-Frame';
import { cs, Uploadbox, Button } from '../src';
import { IMG } from './sample/index';

const StyledObject = styled.span`{
  &.t-main {
    .lb-box { ${cs.w.full} ${cs.max.width(800)} }

    .lb-box .lb-li { ${cs.h.fit} ${cs.h.get(800)} ${({ height }) => height && cs.h.get(height)} }
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
      <Linebox title={"size normal(4:3)"} sample={samplecode("size={'normal'}", 'left')} >
        <Uploadbox src={''} className={'border'} size={'normal'} />
      </Linebox>

      <Linebox title={"size wide(16:9)"} sample={samplecode("size={'wide'}", 'left')} >
        <Uploadbox src={IMG.Image3} className={'border'} size={'wide'} />
      </Linebox>

      <Linebox title={"size xwide(21:9)"} sample={samplecode("size={'xwide'}", 'left')} >
        <Uploadbox src={IMG.Image1} className={'border'} size={'xwide'} />
      </Linebox>

      <Linebox title={"size fwide(28:9)"} sample={samplecode("size={'fwide'}", 'left')} >
        <Uploadbox src={IMG.Image4} className={'border'} size={'fwide'} />
      </Linebox>

      <Linebox title={"size full(w:100%)"} sample={samplecode("size={'full'}", 'left')} >
        <Uploadbox src={IMG.Image2} className={'border'} size={'full'} />
      </Linebox>
    </StyledObject>
  );
};

export const box = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"border"} sample={samplecode("size={'wide'}", 'border')} >
        <Uploadbox src={IMG.Image1} className={'border'} size={'wide'} />
      </Linebox>

      <Linebox title={"border radius"} sample={samplecode("size={'wide'}", 'border radius')} >
        <Uploadbox src={IMG.Image1} className={'border radius'} size={'wide'} />
      </Linebox>
    </StyledObject>
  );
};

export const align = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"horizontal align"} className={"align"} sample={samplecode()} box={true}>
        <Uploadbox src={IMG.Image1} size={'wide'} maxheight={"100px"} className={"left"} />
        <Uploadbox src={IMG.Image1} size={'wide'} maxheight={"100px"} className={"center"} />
        <Uploadbox src={IMG.Image1} size={'wide'} maxheight={"100px"} className={"right"} />
      </Linebox>

      <Linebox title={"vertical align"} className={"align v-align"} sample={samplecode()} box={true}>
        <Uploadbox src={IMG.Image1} size={'wide'} maxheight={"100px"} className={"top"} />
        <Uploadbox src={IMG.Image1} size={'wide'} maxheight={"100px"} className={"middle"} />
        <Uploadbox src={IMG.Image1} size={'wide'} maxheight={"100px"} className={"bottom"} />
      </Linebox>

      <Linebox title={"align"} className={"align v-align"} sample={samplecode()} box={true}>
        <Uploadbox src={IMG.Image1} size={'wide'} maxheight={"100px"} className={"left top"} />
        <Uploadbox src={IMG.Image1} size={'wide'} maxheight={"100px"} className={"center top"} />
        <Uploadbox src={IMG.Image1} size={'wide'} maxheight={"100px"} className={"right top"} />

        <Uploadbox src={IMG.Image1} size={'wide'} maxheight={"100px"} className={"left middle"} />
        <Uploadbox src={IMG.Image1} size={'wide'} maxheight={"100px"} className={"center middle"} />
        <Uploadbox src={IMG.Image1} size={'wide'} maxheight={"100px"} className={"right middle"} />

        <Uploadbox src={IMG.Image1} size={'wide'} maxheight={"100px"} className={"left bottom"} />
        <Uploadbox src={IMG.Image1} size={'wide'} maxheight={"100px"} className={"center bottom"} />
        <Uploadbox src={IMG.Image1} size={'wide'} maxheight={"100px"} className={"right bottom"} />
      </Linebox>
    </StyledObject>
  );
};

export const border = () => {
  return (
    <StyledObject className={"t-main"} >
      <Linebox title={"border options"} sample={samplecode('', 'sky')}>
        <Uploadbox className={"cover lg"} src={IMG.Image1} size={'wide'} options={{ border: { color: "red", width: '1px', radius: "5px" } }} />
      </Linebox>

      <Linebox title={"border options"} sample={samplecode('', 'sky')}>
        <Uploadbox className={"cover lg"} src={IMG.Image1} size={'wide'} options={{ border: { color: "blue", width: '2px', radius: "10px" } }} />
      </Linebox>

      <Linebox title={"border options"} sample={samplecode('', 'sky')}>
        <Uploadbox className={"cover lg"} src={IMG.Image1} size={'wide'} options={{ border: { color: "black", width: '5px', radius: "20px" } }} />
      </Linebox>
    </StyledObject>
  );
};

export const edited = () => {
  return (
    <StyledObject className={"t-main"} >
      <Linebox title={"border options"} sample={samplecode('', 'sky')}>
        <Uploadbox className={"border"} src={''} size={'wide'} edited={true}/>
      </Linebox>
    </StyledObject>
  );
};
