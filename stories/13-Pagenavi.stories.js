/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { optionsKnob as options, withKnobs, text } from '@storybook/addon-knobs';
import styled from 'styled-components';
import cx from 'classnames/bind'
import { Linebox } from './00-Frame';
import { cs, Pagenavi } from '../src';

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

export default { title: 'object|Pagenavi', component: Pagenavi, decorators: [withKnobs] };

const samplecode = (value, classname = '') => `<Pagenavi className={"${classname}"} ${value}></Pagenavi>`;

export const object = () => {
  const size = options('size',
    { 'sm(small)': 'sm', 'md(middle)': 'md', 'lg(large)': 'lg', 'none': '' },
    '', { display: 'inline-radio' }, 'Other');
  const bg = options('background',
    { primary: 'primary', gray: 'gray', dark: 'dark', none: '' },
    '', { display: 'inline-radio' }, 'Other');
  const fontcolor = text('fontcolor', '#353535');
  const fontsize = text('fontsize', '12px');
  const bgcolor = text('bgcolor', '#ffffff');
  const border = text('border color', '#909090');
  const radius = text('border radius', '0px');
  const width = text('border width', '0px');
  const bcolor = text('button color', '');
  const bhover = text('button hover color', '#4a92e4');
  const bactive = text('button select color', '#4a92e4');

  const [result, setResult] = useState(null);
  const [pos, setPos] = useState(1);

  const onClickPage = (page, e) => {
    setPos(page);
    setResult(`onClickPage(page = ${page}, e)`);
  }

  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"Pagenavi"} className={"nomargin"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."} box={false}
        sample={samplecode("", '')}>
        <Pagenavi className={cx(size, align, bg)} pos={pos} max={20} onClick={onClickPage}
          border={{ color: border, radius: radius, width: width }}
          font={{ color: fontcolor, size: fontsize }} bgcolor={bgcolor}
          button={{ color: bcolor, hover: bhover, active: bactive }}
        />
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
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"small"} className={"nomargin"} sample={samplecode("", "sm")} box={false}>
        <Pagenavi className={cx("sm")} pos={1} max={20} />
      </Linebox>

      <Linebox title={"middle"} className={"nomargin"} sample={samplecode("", "md")} box={false}>
        <Pagenavi className={cx("md")} pos={1} max={20} />
      </Linebox>

      <Linebox title={"none size"} className={"nomargin"} sample={samplecode("", "")} box={false}>
        <Pagenavi className={cx("")} pos={1} max={20} />
      </Linebox>

      <Linebox title={"large"} className={"nomargin"} sample={samplecode("", "lg")} box={false}>
        <Pagenavi className={cx("lg")} pos={1} max={20} />
      </Linebox>
    </StyledObject>
  );
};

export const color = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"green"} className={"nomargin"} sample={samplecode("", "green")} box={false}>
        <Pagenavi className={cx("green")} pos={1} max={20} />
      </Linebox>

      <Linebox title={"orange"} className={"nomargin"} sample={samplecode("", "orange")} box={false}>
        <Pagenavi className={cx("orange")} pos={1} max={20} />
      </Linebox>

      <Linebox title={"red"} className={"nomargin"} sample={samplecode("", "red")} box={false}>
        <Pagenavi className={cx("red")} pos={1} max={20} />
      </Linebox>

      <Linebox title={"primary"} className={"nomargin"} sample={samplecode("", "primary")} box={false}>
        <Pagenavi className={cx("primary")} pos={1} max={20} />
      </Linebox>

      <Linebox title={"gray"} className={"nomargin"} sample={samplecode("", "gray")} box={false}>
        <Pagenavi className={cx("gray")} pos={1} max={20} />
      </Linebox>

      <Linebox title={"dark"} className={"nomargin"} sample={samplecode("", "dark")} box={false}>
        <Pagenavi className={cx("dark")} pos={1} max={20} />
      </Linebox>
    </StyledObject>
  );
};

export const align = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"align left"} className={"nomargin align"} sample={samplecode("", "left")} box={true}>
        <Pagenavi className={cx("border left")} pos={1} max={20} />
      </Linebox>

      <Linebox title={"align center"} className={"nomargin align"} sample={samplecode("", "center")} box={true}>
        <Pagenavi className={cx("border center")} pos={1} max={20} />
      </Linebox>

      <Linebox title={"align right"} className={"nomargin align"} sample={samplecode("", "right")} box={true}>
        <Pagenavi className={cx("border right")} pos={1} max={20} />
      </Linebox>
    </StyledObject>
  );
};

export const border = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"border"} className={"nomargin"} sample={samplecode("", "green border")} box={true}>
        <Pagenavi className={cx("")} border={{ color: "#ff0000", radius: "5px", width: "1px" }} pos={1} max={20} />
      </Linebox>

      <Linebox title={"border"} className={"nomargin"} sample={samplecode("", "green border")} box={true}>
        <Pagenavi className={cx("")} border={{ color: "#00ff00", radius: "10px", width: "2px" }} pos={1} max={20} />
      </Linebox>

      <Linebox title={"border"} className={"nomargin"} sample={samplecode("", "green border")} box={true}>
        <Pagenavi className={cx("")} border={{ color: "#0000ff", radius: "20px", width: "3px" }} pos={1} max={20} />
      </Linebox>
    </StyledObject>
  );
};

export const rest = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"font color and size"} className={"nomargin"} sample={samplecode("", "green border")} box={true}>
        <Pagenavi className={cx("")} font={{ color: "#ff0000", size: '12px' }} pos={1} max={20} />
      </Linebox>

      <Linebox title={"font color and size"} className={"nomargin"} sample={samplecode("", "green border")} box={true}>
        <Pagenavi className={cx("")} font={{ color: "#0000ff", size: '18px' }} pos={1} max={20} />
      </Linebox>

      <Linebox title={"bgcolor"} className={"nomargin"} sample={samplecode("", "green border")} box={true}>
        <Pagenavi className={cx("")} bgcolor={"#ff0000"} pos={1} max={20} />
      </Linebox>

      <Linebox title={"bgcolor radius"} className={"nomargin"} sample={samplecode("", "green border")} box={true}>
        <Pagenavi className={cx("radius")} bgcolor={"#0000ff"} pos={1} max={20} />
      </Linebox>

      <Linebox title={"button color"} className={"nomargin"} sample={samplecode("", "green border")} box={true}>
        <Pagenavi className={cx("")} button={{ color: "#ff0000", hover: "#aa0000", active: "#aa0000" }} pos={1} max={20} />
      </Linebox>

      <Linebox title={"button color"} className={"nomargin"} sample={samplecode("", "green border")} box={true}>
        <Pagenavi className={cx("")} button={{ color: "#0000ff", hover: "#0000aa", active: "#0000aa" }} pos={1} max={20} />
      </Linebox>
    </StyledObject>
  );
};

export const theme = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"theme"} top={option.top} sample={samplecode("theme={'sky'}", "sky")}>
        <Pagenavi className={"primary"} theme={'sky'} pos={1} max={20} />
        <Pagenavi className={"primary"} theme={'primary'} pos={1} max={20}  />
        <Pagenavi className={"primary"} theme={'gray'} pos={1} max={20} />
        <Pagenavi className={"primary"} theme={'dark'} pos={1} max={20} />
        <Pagenavi className={"primary"} theme={'black'} pos={1} max={20} />
      </Linebox>
    </StyledObject>
  );
};