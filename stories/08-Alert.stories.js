/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import styled from 'styled-components';
import { Linebox } from './00-Frame';
import { cs, AlertActor, Button, Alert } from '../src';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../src/actor/Reducer';

const store = createStore(reducers);

const StyledObject = styled.span`{
  &.t-main {
    .lb-box { ${cs.w.get(800)} ${cs.p.b30} }

    .lb-box .lb-li > * { ${cs.m.r10} }
  }
}`;

export default {
  title: 'object|Alert', // 스토리북에서 보여질 그룹과 경로를 명시
  component: AlertActor, // 어떤 컴포넌트를 문서화 할지 명시
  decorators: [withKnobs], // 애드온 적용
};

const samplecode = (value, classname = '') => `<Alert className={"${classname}"} ${value} />`;

export const object = () => {
  // const classname = text('classname', null);
  // const title = text('title', null);
  const msg = text('message', null);
  // const align = radios('textalign', { left: 'left', center: 'center', right: 'right' }, '', 'Other');
  // const size = radios('size', { large: 'lg', small: 'sm', xsmall: 'xs' }, '', 'Other');

  const [alert, setAlert] = useState(null);
  const [message] = useState('alert box.');

  const onClick = (eid, e) => {
    setAlert({
      show: true,
      // title: title|| eid,
      msg: msg || message,
      type: eid,
      // className: `${textalign} ${size}`,
      onClicked: (isOk) => { },
    });
  }

  const onClickAlign = (eid, e) => {
    setAlert({
      show: true,
      // title: title || eid,
      msg: msg || message,
      type: 'info',
      align: eid,
      // className: `${textalign} ${size}`,
      onClicked: (isOk) => { },
    });
  }

  const onClickSize = (eid, e) => {
    setAlert({
      show: true,
      // title: title|| eid,
      msg: msg || message,
      type: 'info',
      size: `${eid}`,
      // className: `${textalign}`,
      onClicked: (isOk) => { },
    });
  }

  return (
    <Provider store={store} >
      <StyledObject className={"t-main"}>
        <Linebox title={"confirm type"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."} sample={samplecode('title={"info"}', 'primary')}>
          <Button className={"primary"} title={"info"} onClick={onClick} eid={"info"}/>
          <Button className={"primary"} title={"warning"} onClick={onClick} eid={"warn"} />
          <Button className={"primary"} title={"error"} onClick={onClick} eid={"err"} />
          <Button className={"primary"} title={"white"} onClick={onClick} eid={"white"} />
          <Button className={"primary"} title={"yellow"} onClick={onClick} eid={"yellow"} />

          <Button className={"primary"} title={"green"} onClick={onClick} eid={"green"} />
          <Button className={"primary"} title={"orange"} onClick={onClick} eid={"orange"} />
          <Button className={"primary"} title={"gray"} onClick={onClick} eid={"gray"} />
          <Button className={"primary"} title={"alpha"} onClick={onClick} eid={"alpha"} />
          <Button className={"primary"} title={"dark"} onClick={onClick} eid={"dark"} />
        </Linebox>

        <Linebox title={"align"} sample={samplecode('title={"info"}', 'primary')}>
          <Button className={"primary"} title={"left"} onClick={onClickAlign} eid={"left"}/>
          <Button className={"primary"} title={"center"} onClick={onClickAlign} eid={"center"} />
          <Button className={"primary"} title={"right"} onClick={onClickAlign} eid={"right"} />
        </Linebox>

        <Linebox title={"size"} sample={samplecode('title={"info"}', 'primary')}>
          <Button className={"primary"} title={"large"} onClick={onClickSize} eid={"lg"}/>
          <Button className={"primary"} title={"small"} onClick={onClickSize} eid={"sm"} />
          <Button className={"primary"} title={"x small"} onClick={onClickSize} eid={"xs"} />
        </Linebox>
      </StyledObject>

      <AlertActor {...alert} />
      <Alert />
    </Provider>
  );
};

object.story = {
  name: 'Base'
};