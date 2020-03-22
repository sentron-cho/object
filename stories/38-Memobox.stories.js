/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { optionsKnob as options, withKnobs, text, boolean, button } from '@storybook/addon-knobs';
import styled from 'styled-components';
import cx from 'classnames/bind'
import { Linebox, op } from './00-Frame';
import { cs, Memobox, Button } from '../src';

const StyledObject = styled.span`{
  &.t-main {
    .lb-box { ${cs.w.full} }

    .lb-box .lb-li { ${cs.h.fit} ${cs.m.b30} ${cs.w.get(1200)} ${cs.p.a10} & > * { ${cs.m.b50} } }
    .lb-box.full .lb-li { ${cs.h.fit} ${cs.m.b30} ${cs.w.get(1200)} ${cs.p.a10} & > * { ${cs.m.b50} } }

    .res-view { ${cs.over.yauto} ${cs.scrollbar.t2}
      ${cs.h.get(200)} ${cs.w.get(780)} ${cs.bg.lightgray} 
      p { ${cs.m.a5} ${cs.font.preline} ${cs.font.breakall} }
    }    
  }
}`;

export default { title: 'object|Memobox', component: Memobox, decorators: [withKnobs] };

const samplecode = (value, classname = '') => `<Memobox className={"${classname}"} ${value} />`;

export const object = () => {
  button('refresh(옵션을 변경 후 버튼을 클릭하세요)', () => { });
  const size = options('size', op.size('s'), '', op.radio(), 'Other');
  const bg = options('color', op.color('n'), '', op.radio(), 'Other');

  const isborder = boolean('border options', false);
  const border = isborder ? text('border color', '#909090') : '';
  const radius = isborder ? text('border radius', '5px') : '';
  const borderwidth = isborder ? text('border width', '1px') : '';

  const isfont = boolean('font options', false);
  const fontcolor = isfont ? text('font color', '#909090') : '';
  const fontsize = isfont ? text('font size', '1px') : '';

  const shadow = boolean('shadow', false);

  const [result, setResult] = useState(null);
  const [show, setShow] = useState(false);

  const onClick = (eid, e) => {
    setShow(true);
  }

  const onClickMemo = (eid, item, e) => {
    setShow(false);
    setResult(`onClickMemo() eid = ${eid}, item = ${JSON.stringify(item)}, e`);
  }

  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"toggle Memobox"} className={"nomargin"}
        desc={"Knobs 옵션을 통해 미리보기가 가능합니다."} sample={samplecode("", "")} box={false}>
        <Button className={'primary'} title={!show ? 'show' : 'hide'} onClick={onClick} />
        <Memobox className={cx(size, { shadow }, bg)} item={{ value: "memo box...." }} show={show} onClick={onClickMemo}
          border={isborder ? { color: border, width: borderwidth, radius: radius } : null}
          font={isfont ? { color: fontcolor, size: fontsize } : null}
        />
      </Linebox>

      <div className={"res-view"}>
        <p>{result}</p>
      </div>
    </StyledObject>
  );
};

object.story = { name: 'Base' };

export const color = () => {
  const pre = '\n\n\n\n\n\n\n\n\n\n\n\n\n';

  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"type"} className={"nomargin"} sample={samplecode()}>
        <Memobox className={"sm white"} item={{ value: pre + "white box...." }} show={true} />
        <Memobox className={"sm sky"} item={{ value: pre + "sky box...." }} show={true} />
        <Memobox className={"sm orange"} item={{ value: pre + "orange box...." }} show={true} />
        <Memobox className={"sm green"} item={{ value: pre + "green box...." }} show={true} />
        <Memobox className={"sm red"} item={{ value: pre + "red box...." }} show={true} />
        <Memobox className={"sm primary"} item={{ value: pre + "primary box...." }} show={true} />
        <Memobox className={"sm gray"} item={{ value: pre + "gray box...." }} show={true} />
        <Memobox className={"sm dark"} item={{ value: pre + "dark box...." }} show={true} />
        <Memobox className={"sm black"} item={{ value: pre + "black box...." }} show={true} />
      </Linebox>
    </StyledObject>
  );
};

export const size = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"type"} className={"nomargin full"} sample={samplecode()}>
        <Memobox className={""} item={{ value: "full size...." }} show={true} />
        <Memobox className={"sm"} item={{ value: "small size width 320px...." }} show={true} />
        <Memobox className={"md"} item={{ value: "small size width 640px...." }} show={true} />
        <Memobox className={"lg"} item={{ value: "small size width 1024px...." }} show={true} />
      </Linebox>
    </StyledObject>
  );
};

export const border = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"border radius"} sample={samplecode("", 'border')} >
        <Memobox className={""} item={{ value: "small size width 1024px...." }} show={true}
          border={{ radius: '5px', color: "blue", width: '1px' }} />
        <Memobox className={""} item={{ value: "small size width 1024px...." }} show={true}
          border={{ radius: '10px', color: "red", width: '2px' }} />
        <Memobox className={""} item={{ value: "small size width 1024px...." }} show={true}
          border={{ radius: '20px', color: "black", width: '5px' }} />
      </Linebox>
    </StyledObject>
  );
};

export const font = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"border radius"} sample={samplecode("", '')} >
        <Memobox className={""} item={{ value: "small size width 1024px...." }} show={true}
          font={{ size: '10px', color: "black" }} />
        <Memobox className={""} item={{ value: "small size width 1024px...." }} show={true}
          font={{ size: '14px', color: "black" }} />
        <Memobox className={""} item={{ value: "small size width 1024px...." }} show={true}
          font={{ size: '16px', color: "black" }} />
      </Linebox>
    </StyledObject>
  );
};

export const theme = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"type"} className={"nomargin"} sample={samplecode()}>
        <Memobox theme={"sky"} className={""} item={{ value: "sky theme box...." }} show={true} />
        <Memobox theme={"primary"} className={""} item={{ value: "primary theme box...." }} show={true} />
        <Memobox theme={"gray"} className={""} item={{ value: "gray theme box...." }} show={true} />
        <Memobox theme={"dark"} className={""} item={{ value: "dark theme box...." }} show={true} />
        <Memobox theme={"black"} className={""} item={{ value: "black theme box...." }} show={true} />
      </Linebox>
    </StyledObject>
  );
};