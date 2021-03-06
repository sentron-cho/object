/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { optionsKnob as options, withKnobs, text, boolean } from '@storybook/addon-knobs';
import styled from 'styled-components';
import cx from 'classnames/bind'
import { Linebox, op } from './00-Frame';
import { cs, Widgetbox } from '../src';
import { IMG } from '../src/Icons';

const StyledObject = styled.span`{
  &.t-main {
    .lb-box { ${cs.w.get(800)} ${cs.p.b40} }

    .lb-box .lb-li > * { ${cs.m.r10} }

    .t-child { ${cs.h.get(240)} .lb-li > * { ${cs.m.r10} } }

    .res-view { 
      ${cs.h.get(100)} ${cs.w.get(800)} ${cs.bg.lightgray} 
      p { ${cs.m.a5} }
    }    
  }
}`;

export default { title: 'object|Widgetbox', component: Widgetbox, decorators: [withKnobs] };

const samplecode = (value, classname = '') => `<Widgetbox className={"${classname}"} ${value} />`;

export const object = () => {
  const size = options('size', op.size('s'), '', op.radio(), 'Other');
  const bg = options('color', op.color('s'), '', op.radio(), 'Other');
  const align = options('align', op.halign(), '', op.radio(), 'Other');

  const option = boolean('font option', false);
  const fontcolor = option ? text('font color', '#353535') : '';
  const fontsize = option ? text('font size', '12px') : '';

  const isborder = boolean('border', false);
  const border = isborder ? text('border color', '#909090') : '';
  const radius = isborder ? text('border radius', '5px') : '';
  const width = isborder ? text('border width', '1px') : '';

  const islabel = boolean('label option', false);
  const labelcolor = islabel ? text('label color', '#353535') : '';

  const [result, setResult] = useState(null);

  const onClick = (eid, rowid, e) => {
    setResult(`onClick(eid = ${eid}, rowid = ${rowid}, e)`);
  }

  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"widgetbox"} className={"nomargin"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."} sample={samplecode("", "")} box={false}>
        <Widgetbox className={cx(size, align, bg)}
          name={'widget'} value={"123"} icon={"user"} type={"label"}
          border={{ color: border, radius: radius, width: width }}
          font={{ color: fontcolor, size: fontsize, align: align }}
          labelcolor={labelcolor}
          onClick={onClick} />

        <Widgetbox className={cx(size, align, bg)}
          name={'widget'} value={"123"} icon={"user"} type={"icon"}
          border={{ color: border, radius: radius, width: width }}
          font={{ color: fontcolor, size: fontsize, align: align }}
          labelcolor={labelcolor}
          onClick={onClick} />

        <Widgetbox className={cx(size, align, bg)}
          name={'widget'} value={"123"} icon={"user"} type={"image"}
          border={{ color: border, radius: radius, width: width }}
          font={{ color: fontcolor, size: fontsize, align: align }}
          labelcolor={labelcolor}
          cont={"123\ngood image"} src={IMG.Sample}
          onClick={onClick} />
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


export const type = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"label"} className={"t-child nomargin"} sample={samplecode("", "")} box={true}>
        <Widgetbox className={cx("sm")} type={"label"} name={'widget'} value={"123"} icon={"user"} onClick={() => { }} />
        <Widgetbox className={cx("md")} type={"label"} name={'widget'} value={"123"} icon={"user"} onClick={() => { }} />
        <Widgetbox className={cx("lg")} type={"label"} name={'widget'} value={"123"} icon={"user"} onClick={() => { }} />
      </Linebox>

      <Linebox title={"icon"} className={"t-child nomargin"} sample={samplecode("", "")} box={true}>
        <Widgetbox className={cx("sm")} type={"icon"} name={'media'} value={"123"} icon={"media"} onClick={() => { }} />
        <Widgetbox className={cx("md")} type={"icon"} name={'youtube'} value={"123"} icon={"youtube"} onClick={() => { }} />
        <Widgetbox className={cx("lg")} type={"icon"} name={'note'} value={"123"} icon={"note"} onClick={() => { }} />
      </Linebox>

      <Linebox title={"image"} className={"t-child nomargin"} sample={samplecode("", "")} box={true}>
        <Widgetbox className={cx("sm")} type={"image"} name={'widget'} cont={"123\ngood image"} icon={IMG.Sample} onClick={() => { }} />
        <Widgetbox className={cx("md")} type={"image"} name={'widget'} cont={"123\ngood image"} icon={IMG.Sample} onClick={() => { }} />
        <Widgetbox className={cx("lg")} type={"image"} name={'widget'} cont={"123\ngood image"} icon={IMG.Sample} onClick={() => { }} />
      </Linebox>
    </StyledObject>
  );
};

export const size = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"label type"} className={"t-child nomargin"} sample={samplecode("", "")} box={true}>
        <Widgetbox className={cx("sm")} type={"label"} name={'widget'} value={"123"} icon={"user"} onClick={() => { }} />
        <Widgetbox className={cx("md")} type={"label"} name={'widget'} value={"123"} icon={"user"} onClick={() => { }} />
        <Widgetbox className={cx("lg")} type={"label"} name={'widget'} value={"123"} icon={"user"} onClick={() => { }} />
      </Linebox>

      <Linebox title={"icon type"} className={"t-child nomargin"} sample={samplecode("", "")} box={true}>
        <Widgetbox className={cx("sm")} type={"icon"} name={'widget'} value={"123"} icon={"user"} onClick={() => { }} />
        <Widgetbox className={cx("md")} type={"icon"} name={'widget'} value={"123"} icon={"user"} onClick={() => { }} />
        <Widgetbox className={cx("lg")} type={"icon"} name={'widget'} value={"123"} icon={"user"} onClick={() => { }} />
      </Linebox>

      <Linebox title={"image type"} className={"t-child nomargin"} sample={samplecode("", "")} box={true}>
        <Widgetbox className={cx("sm")} type={"image"} name={'widget'} value={"123"}
          cont={"123\ngood image"} src={IMG.Sample} onClick={() => { }} />
        <Widgetbox className={cx("md")} type={"image"} name={'widget'} value={"123"}
          cont={"123\ngood image"} src={IMG.Sample} onClick={() => { }} />
        <Widgetbox className={cx("lg")} type={"image"} name={'widget'} value={"123"}
          cont={"123\ngood image"} src={IMG.Sample} onClick={() => { }} />
      </Linebox>

      <Linebox title={"full"} className={"t-child nomargin"} sample={samplecode("", "")} box={true}>
        <Widgetbox className={cx("full")} name={'widget'} value={"123"} icon={"user"} onClick={() => { }} />
      </Linebox>

      <Linebox title={"full"} className={"t-child nomargin"} sample={samplecode("", "")} box={true}>
        <Widgetbox className={cx("full")} type={"icon"} name={'widget'} value={"123"} icon={"user"} onClick={() => { }} />
      </Linebox>

      <Linebox title={"full"} className={"t-child nomargin"} sample={samplecode("", "")} box={true}>
        <Widgetbox className={cx("full")} type={"image"} name={'widget'} value={"123"}
          cont={"123\ngood image"} icon={"user"} src={IMG.Sample} onClick={() => { }} />
      </Linebox>

      <Linebox title={"large full"} className={"t-child nomargin"} sample={samplecode("", "")} box={true}>
        <Widgetbox className={cx("lg full")} name={'widget'} value={"123"} icon={"user"} onClick={() => { }} />
      </Linebox>
    </StyledObject>
  );
};

export const color = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"no color"} className={"nomargin"} sample={samplecode("", "")} box={false}>
        <Widgetbox className={cx("")} type={"label"} name={'widget'} value={"123"} icon={"user"} onClick={() => { }} />
        <Widgetbox className={cx("")} type={"icon"} name={'widget'} value={"123"} icon={"user"} onClick={() => { }} />
        <Widgetbox className={cx("")} type={"image"} name={'widget'} value={"123"}
          cont={"123\ngood image"} src={IMG.Sample} onClick={() => { }} />
      </Linebox>

      <Linebox title={"primary"} className={"nomargin"} sample={samplecode("", "")} box={false}>
        <Widgetbox className={cx("primary")} type={"label"} name={'widget'} value={"123"} icon={"user"} onClick={() => { }} />
        <Widgetbox className={cx("primary")} type={"icon"} name={'widget'} value={"123"} icon={"user"} onClick={() => { }} />
        <Widgetbox className={cx("primary")} type={"image"} name={'widget'} value={"123"}
          cont={"123\ngood image"} src={IMG.Sample} onClick={() => { }} />
      </Linebox>

      <Linebox title={"primary"} className={"nomargin"} sample={samplecode("", "")} box={false}>
        <Widgetbox className={cx("gray")} type={"label"} name={'widget'} value={"123"} icon={"user"} onClick={() => { }} />
        <Widgetbox className={cx("gray")} type={"icon"} name={'widget'} value={"123"} icon={"user"} onClick={() => { }} />
        <Widgetbox className={cx("gray")} type={"image"} name={'widget'} value={"123"}
          cont={"123\ngood image"} src={IMG.Sample} onClick={() => { }} />
      </Linebox>

      <Linebox title={"primary"} className={"nomargin"} sample={samplecode("", "")} box={false}>
        <Widgetbox className={cx("dark")} type={"label"} name={'widget'} value={"123"} icon={"user"} onClick={() => { }} />
        <Widgetbox className={cx("dark")} type={"icon"} name={'widget'} value={"123"} icon={"user"} onClick={() => { }} />
        <Widgetbox className={cx("dark")} type={"image"} name={'widget'} value={"123"}
          cont={"123\ngood image"} src={IMG.Sample} onClick={() => { }} />
      </Linebox>

      <Linebox title={"bgcolor option"} className={"nomargin"} sample={samplecode("", "")} box={false}>
        <Widgetbox className={cx("")} type={"label"} name={'widget'}
          bgcolor={"#fff252"} value={"123"} icon={"user"} onClick={() => { }} />
        <Widgetbox className={cx("")} type={"icon"} name={'widget'}
          bgcolor={"#fff252"} value={"123"} icon={"user"} onClick={() => { }} />
        <Widgetbox className={cx("")} type={"image"} name={'widget'}
          bgcolor={"#fff252"} value={"123"} cont={"123\ngood image"} src={IMG.Sample} onClick={() => { }} />
      </Linebox>
    </StyledObject>
  );
};

export const border = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"no radius"} className={"nomargin"} sample={samplecode("", "")} box={false}>
        <Widgetbox className={cx("noradius")} type={"label"} name={'widget'} value={"123"} icon={"user"} onClick={() => { }} />
        <Widgetbox className={cx("noradius")} type={"icon"} name={'widget'} value={"123"} icon={"user"} onClick={() => { }} />
        <Widgetbox className={cx("noradius")} type={"image"} name={'widget'} value={"123"}
          cont={"123\ngood image"} src={IMG.Sample} onClick={() => { }} />
      </Linebox>

      <Linebox title={"no border"} className={"nomargin"} sample={samplecode("", "")} box={false}>
        <Widgetbox className={cx("noborder")} type={"label"} name={'widget'} value={"123"} icon={"user"} onClick={() => { }} />
        <Widgetbox className={cx("noborder")} type={"icon"} name={'widget'} value={"123"} icon={"user"} onClick={() => { }} />
        <Widgetbox className={cx("noborder")} type={"image"} name={'widget'} value={"123"}
          cont={"123\ngood image"} src={IMG.Sample} onClick={() => { }} />
      </Linebox>

      <Linebox title={"border options"} className={""} sample={samplecode("", "")} box={false}>
        <Widgetbox className={cx("")} type={"label"} name={'widget'}
          border={{ color: 'red', radius: '5px', width: '1px' }}
          value={"123"} icon={"user"} onClick={() => { }} />
        <Widgetbox className={cx("")} type={"icon"} name={'widget'}
          border={{ color: 'red', radius: '5px', width: '1px' }}
          value={"123"} icon={"user"} onClick={() => { }} />
        <Widgetbox className={cx("")} type={"image"} name={'widget'}
          border={{ color: 'red', radius: '5px', width: '1px' }}
          value={"123"} cont={"123\ngood image"} src={IMG.Sample} onClick={() => { }} />
      </Linebox>

      <Linebox title={"border options"} className={""} sample={samplecode("", "")} box={false}>
        <Widgetbox className={cx("")} type={"label"} name={'widget'}
          border={{ color: 'blue', radius: '10px', width: '2px' }}
          value={"123"} icon={"user"} onClick={() => { }} />
        <Widgetbox className={cx("")} type={"icon"} name={'widget'}
          border={{ color: 'blue', radius: '10px', width: '2px' }}
          value={"123"} icon={"user"} onClick={() => { }} />
        <Widgetbox className={cx("")} type={"image"} name={'widget'}
          border={{ color: 'blue', radius: '10px', width: '2px' }}
          value={"123"} cont={"123\ngood image"} src={IMG.Sample} onClick={() => { }} />
      </Linebox>

      <Linebox title={"border options"} className={""} sample={samplecode("", "")} box={false}>
        <Widgetbox className={cx("dark")} type={"label"} name={'widget'}
          border={{ color: 'black', radius: '20px', width: '10px' }}
          value={"123"} icon={"user"} onClick={() => { }} />
        <Widgetbox className={cx("dark")} type={"icon"} name={'widget'}
          border={{ color: 'black', radius: '20px', width: '10px' }}
          value={"123"} icon={"user"} onClick={() => { }} />
        <Widgetbox className={cx("dark")} type={"image"} name={'widget'}
          border={{ color: 'black', radius: '20px', width: '10px' }}
          value={"123"} cont={"123\ngood image"} src={IMG.Sample} onClick={() => { }} />
      </Linebox>
    </StyledObject>
  );
};

export const align = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"left"} className={""} sample={samplecode("", "")} box={false}>
        <Widgetbox className={cx("left")} name={'widget'} value={"123"} icon={"user"} />
      </Linebox>

      <Linebox title={"center"} className={""} sample={samplecode("", "")} box={false}>
        <Widgetbox className={cx("center")} name={'widget'} value={"123"} icon={"user"} />
      </Linebox>

      <Linebox title={"right"} className={""} sample={samplecode("", "")} box={false}>
        <Widgetbox className={cx("right")} name={'widget'} value={"123"} icon={"user"} />
      </Linebox>
    </StyledObject>
  );
};

export const font = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"no options"} className={""} sample={samplecode("", "")} box={false}>
        <Widgetbox className={cx("")} name={'widget'} value={"123"} icon={"user"} onClick={() => { }} />
        <Widgetbox className={cx("")} type={"icon"} name={'widget'} value={"123"} icon={"user"} onClick={() => { }} />
        <Widgetbox className={cx("")} type={"image"} name={'widget'}
          value={"123"} icon={"user"} cont={"123\ngood image"} src={IMG.Sample} onClick={() => { }} />
      </Linebox>

      <Linebox title={"font options"} className={""} sample={samplecode("", "")} box={false}>
        <Widgetbox className={cx("")} type={"label"} name={'widget'}
          font={{ color: 'red', size: '12px' }}
          value={"123"} icon={"user"} onClick={() => { }} />
        <Widgetbox className={cx("")} type={"icon"} name={'widget'}
          font={{ color: 'red', size: '12px' }}
          value={"123"} icon={"user"} onClick={() => { }} />
        <Widgetbox className={cx("")} type={"image"} name={'widget'}
          font={{ color: 'red', size: '12px' }}
          value={"123"} cont={"123\ngood image"} src={IMG.Sample} onClick={() => { }} />
      </Linebox>

      <Linebox title={"font options"} className={""} sample={samplecode("", "")} box={false}>
        <Widgetbox className={cx("")} type={"label"} name={'widget'}
          font={{ color: 'blue', size: '16px' }}
          value={"123"} icon={"user"} onClick={() => { }} />
        <Widgetbox className={cx("")} type={"icon"} name={'widget'}
          font={{ color: 'blue', size: '16px' }}
          value={"123"} icon={"user"} onClick={() => { }} />
        <Widgetbox className={cx("")} type={"image"} name={'widget'}
          font={{ color: 'blue', size: '16px' }}
          value={"123"} cont={"123\ngood image"} src={IMG.Sample} onClick={() => { }} />
      </Linebox>

      <Linebox title={"font left"} className={""} sample={samplecode("", "")} box={false}>
        <Widgetbox className={cx("")} type={"label"} name={'widget'}
          font={{ color: 'green', size: '14px', align: 'left' }}
          value={"123"} icon={"user"} onClick={() => { }} />
        <Widgetbox className={cx("")} type={"icon"} name={'widget'}
          font={{ color: 'green', size: '14px', align: 'left' }}
          value={"123"} icon={"user"} onClick={() => { }} />
        <Widgetbox className={cx("")} type={"image"} name={'widget'}
          font={{ color: 'green', size: '14px', align: 'left' }}
          value={"123"} cont={"123\ngood image"} src={IMG.Sample} onClick={() => { }} />
      </Linebox>

      <Linebox title={"font right"} className={""} sample={samplecode("", "")} box={false}>
        <Widgetbox className={cx("")} type={"label"} name={'widget'}
          font={{ color: 'green', size: '14px', align: 'right' }}
          value={"123"} icon={"user"} onClick={() => { }} />
        <Widgetbox className={cx("")} type={"icon"} name={'widget'}
          font={{ color: 'green', size: '14px', align: 'right' }}
          value={"123"} icon={"user"} onClick={() => { }} />
        <Widgetbox className={cx("")} type={"image"} name={'widget'}
          font={{ color: 'green', size: '14px', align: 'right' }}
          value={"123"} cont={"123\ngood image"} src={IMG.Sample} onClick={() => { }} />
      </Linebox>

      <Linebox title={"font options"} className={""} sample={samplecode("", "")} box={false}>
        <Widgetbox className={cx("")} type={"label"} name={'widget'}
          font={{ color: '#00ff00', size: '18px' }} labelcolor={'black'}
          value={"123"} icon={"user"} onClick={() => { }} />
        <Widgetbox className={cx("")} type={"icon"} name={'widget'}
          font={{ color: '#00ff00', size: '18px' }}
          value={"123"} icon={"user"} onClick={() => { }} />
        <Widgetbox className={cx("")} type={"image"} name={'widget'}
          font={{ color: '#00ff00', size: '18px' }}
          value={"123"} cont={"123\ngood image"} src={IMG.Sample} onClick={() => { }} />
      </Linebox>

      <Linebox title={"labelcolor"} className={""} sample={samplecode("", "")} box={false}>
        <Widgetbox className={cx("")} type={"label"} name={'widget'} labelcolor={'blue'}
          value={"123"} icon={"user"} onClick={() => { }} />
        <Widgetbox className={cx("")} type={"image"} name={'widget'} labelcolor={'orange'}
          value={"123"} cont={"123\ngood image"} src={IMG.Sample} onClick={() => { }} />
      </Linebox>
    </StyledObject>
  );
};


export const theme = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"theme"} top={option.top} sample={samplecode("theme={'sky'}", "sky")}>
        <Widgetbox className={"primary"} type={"label"} value={"123"} icon={"user"} name={'widget'} onClick={() => { }} theme={'sky'} />
        <Widgetbox className={"primary"} type={"label"} value={"123"} icon={"user"} name={'widget'} onClick={() => { }} theme={'primary'} />
        <Widgetbox className={"primary"} type={"label"} value={"123"} icon={"user"} name={'widget'} onClick={() => { }} theme={'gray'} />
        <Widgetbox className={"primary"} type={"label"} value={"123"} icon={"user"} name={'widget'} onClick={() => { }} theme={'dark'} />
        <Widgetbox className={"primary"} type={"label"} value={"123"} icon={"user"} name={'widget'} onClick={() => { }} theme={'black'} />
      </Linebox>
    </StyledObject>
  );
};