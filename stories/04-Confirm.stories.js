import React, {useState} from 'react';
import { withKnobs, text, boolean, radios } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';
import cx from 'classnames/bind'
import { Linebox } from './00-Frame';
import { cs, ConfirmActor, Button, Confirm } from '../src';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../src/actor/Reducer';

const store = createStore(reducers);

const StyledObject = styled.span`{
  &.t-main {
    .lb-box { ${cs.w.get(800)} ${cs.p.b10} }

    .lb-box .lb-li > * { ${cs.m.r10} }
  }
}`;

export default {
  title: 'object|Confirm', // 스토리북에서 보여질 그룹과 경로를 명시
  component: ConfirmActor, // 어떤 컴포넌트를 문서화 할지 명시
  decorators: [withKnobs], // 애드온 적용
};

const samplecode = (value, classname = '') => `<Confirm className={"${classname}"} ${value} />`;

export const object = () => {
  const classname = text('classname', null);
  const title = text('title', null);
  const msg = text('message', null);
  const textalign = radios('textalign', { left: 'left', center: 'center', right: 'right' }, '', 'Other');
  const size = radios('size', { large: 'lg', small: 'sm', xsmall: 'xs' }, '', 'Other');

  const [confirm, setConfirm] = useState(null);
  const [message, setMessage] = useState('confirm box.');

  const get = (eid, value, classname) => {
    return {
      show: true,
      title: title|| eid,
      msg: msg || message,
      type: eid,
      className: `${textalign} ${size} ${classname}`,
      ...value,
      onClicked: (isOk) => { },
    }
  }

  const onClick = (eid, e) => {
    setConfirm({
      show: true,
      title: title|| eid,
      msg: msg || message,
      type: eid,
      className: `${textalign} ${size}`,
      onClicked: (isOk) => { },
    });
  }

  const onClickAlign = (eid, e) => {
    setConfirm({
      show: true,
      title: title|| eid,
      msg: msg || message,
      type: 'info',
      className: `${size} ${eid}`,
      onClicked: (isOk) => { },
    });
  }

  const onClickSize = (eid, e) => {
    setConfirm({
      show: true,
      title: title|| eid,
      msg: msg || message,
      type: 'info',
      className: `${textalign} ${eid}`,
      onClicked: (isOk) => { },
    });
  }

  const onClickTheme = (eid, e) => {
    setConfirm({
      show: true,
      title: title || eid,
      msg: msg || message,
      type: 'info',
      theme: eid,
      onClicked: (isOk) => { },
    });
  }

  return (
    <Provider store={store} >
      <StyledObject className={"t-main"}>
        <Linebox title={"confirm type"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."}>
          <Button className={"primary"} title={"info"} onClick={onClick} eid={"info"}/>
          <Button className={"primary"} title={"warning"} onClick={onClick} eid={"warn"} />
          <Button className={"primary"} title={"error"} onClick={onClick} eid={"err"} />
          <Button className={"primary"} title={"dark"} onClick={onClick} eid={"dark"} />
          <Button className={"primary"} title={"white"} onClick={onClick} eid={"white"} />
        </Linebox>

        <Linebox title={"text align"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."}>
          <Button className={"primary"} title={"left"} onClick={onClickAlign} eid={"left"}/>
          <Button className={"primary"} title={"center"} onClick={onClickAlign} eid={"center"} />
          <Button className={"primary"} title={"right"} onClick={onClickAlign} eid={"right"} />
        </Linebox>

        <Linebox title={"size"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."}>
          <Button className={"primary"} title={"large"} onClick={onClickSize} eid={"lg"}/>
          <Button className={"primary"} title={"small"} onClick={onClickSize} eid={"sm"} />
          <Button className={"primary"} title={"x small"} onClick={onClickSize} eid={"xs"} />
        </Linebox>

        <Linebox title={"theme"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."}>
          <Button className={"primary"} title={"sky"} onClick={onClickTheme} eid={"sky"}/>
          <Button className={"primary"} title={"primary"} onClick={onClickTheme} eid={"primary"}/>
          <Button className={"primary"} title={"gray"} onClick={onClickTheme} eid={"gray"}/>
          <Button className={"primary"} title={"dark"} onClick={onClickTheme} eid={"dark"} />
          <Button className={"primary"} title={"black"} onClick={onClickTheme} eid={"black"} />
        </Linebox>        
      </StyledObject>

      <ConfirmActor {...confirm} />
      <Confirm />
    </Provider>
  );
};

object.story = {
  name: 'Base'
};

const option = {
  top: "20px",
}