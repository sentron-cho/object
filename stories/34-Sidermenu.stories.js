import React, { useState } from 'react';
import { withKnobs, text, boolean, radios } from '@storybook/addon-knobs';
import styled from 'styled-components';
import cx from 'classnames/bind'
import { Linebox } from './00-Frame';
import { cs, SidemenuActor, Button, Sidemenu, Editbox } from '../src';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../src/actor/Reducer';

const store = createStore(reducers);

const StyledObject = styled.span`{
  &.t-main {
    .lb-box { ${cs.w.get(1024)} ${cs.p.b30} }

    .lb-box .lb-li { ${cs.p.left(200)}  }
    .res-view { ${cs.h.get(100)} ${cs.w.get(800)} ${cs.bg.lightgray} }
  }
}`;

export default {
  title: 'object|Sidemenu', // 스토리북에서 보여질 그룹과 경로를 명시
  component: SidemenuActor, // 어떤 컴포넌트를 문서화 할지 명시
  decorators: [withKnobs], // 애드온 적용
};

const samplecode = (value, classname = '') => `<Confirm className={"${classname}"} ${value} />`;
const list = [
  { id: 'widget', name: 'widget', url: '?path=/story/object-widgetbox--object' },
  { id: 'daum', name: 'daum', url: 'http://www.daum.net' },
  { id: 'google', name: 'google', url: 'http://www.google.com' }
];

export const object = () => {
  const title = text('title', 'nuriweb');
  const [menu, setMenu] = useState(null);
  const [result, setResult] = useState(null);

  const onClick = (eid, e) => {
    setMenu({
      show: true,
      title: title || eid,
      // children: MenuChild,
      list: list,
      className: `${eid}`,
      onClicked: (eid) => {
        setResult(`onClick(eid, e) eid = ${eid}`);
      },
      onClickMenu: () => {
        setResult(`onClickMenu(eid, e) eid = ${eid}`);
      },
    });
  }

  const onClickSize = (eid, e) => {
    setMenu({
      show: true,
      title: title || eid,
      // children: MenuChild,
      list: list,
      className: `${eid}`,
      size: eid,
      onClicked: (eid) => {
        setResult(`onClick(eid, e) eid = ${eid}`);
      },
      onClickMenu: () => {
        setResult(`onClickMenu(eid, e) eid = ${eid}`);
      },
    });
  }

  const onClickTheme = (eid, e) => {
    setMenu({
      show: true,
      title: title || eid,
      // children: MenuChild,
      list: list,
      theme: eid,
      onClicked: (eid) => {
        setResult(`onClick(eid, e) eid = ${eid}`);
      },
      onClickMenu: () => {
        setResult(`onClickMenu(eid, e) eid = ${eid}`);
      },
    });
  }

  return (
    <Provider store={store} >
      <StyledObject className={"t-main"}>
        <Linebox title={"menu type"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."}>
          <Button className={"border "} title={"n/a"} onClick={onClick} eid={"none"} />
          <Button className={"white border"} title={"white"} onClick={onClick} eid={"white"} />
          <Button className={"sky border"} title={"sky"} onClick={onClick} eid={"sky"} />
          <Button className={"gray"} title={"gray"} onClick={onClick} eid={"gry"} />
          <Button className={"primary"} title={"primary"} onClick={onClick} eid={"primary"} />
          <Button className={"dark"} title={"dark"} onClick={onClick} eid={"dark"} />
          <Button className={"black"} title={"black"} onClick={onClick} eid={"black"} />
        </Linebox>

        <Linebox title={"size"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."}>
          <Button className={"primary"} title={"x small"} onClick={onClickSize} eid={"xs"} />
          <Button className={"primary"} title={"small"} onClick={onClickSize} eid={"sm"} />
          <Button className={"primary"} title={"middle"} onClick={onClickSize} eid={"md"} />
          <Button className={"primary"} title={"large"} onClick={onClickSize} eid={"lg"} />
          <Button className={"primary"} title={"x large"} onClick={onClickSize} eid={"xl"} />
        </Linebox>

        <Linebox title={"theme"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."}>
          <Button className={"white border"} title={"white"} onClick={onClickTheme} eid={"white"} />
          <Button className={"sky border"} title={"sky"} onClick={onClickTheme} eid={"sky"} />
          <Button className={"primary"} title={"primary"} onClick={onClickTheme} eid={"primary"} />
          <Button className={"gray"} title={"gray"} onClick={onClickTheme} eid={"gray"} />
          <Button className={"dark"} title={"dark"} onClick={onClickTheme} eid={"dark"} />
          <Button className={"black"} title={"black"} onClick={onClickTheme} eid={"black"} />
        </Linebox>

        <div className={"res-view"}>
          {result}
        </div>
      </StyledObject>

      <SidemenuActor {...menu} />
      <Sidemenu />
    </Provider>
  );
};


export const custom = () => {
  const [result, setResult] = useState(null);
  const [menu, setMenu] = useState(null);

  const onClick = (eid, e) => {
    setMenu({
      show: true,
      title: 'custom menu',
      children: MenuChild,
      className: `${eid}`,
      onClicked: (eid) => {
        setResult(`onClick(eid, e) eid = ${eid}`);
      },
      onClickMenu: () => {
        setResult(`onClickMenu(eid, e) eid = ${eid}`);
      },
    });
  }

  return (
    <StyledObject className={"t-main"}>
      <Provider store={store} >
        <Linebox title={"size"} id={"f0001"} className={'padding'} sample={samplecode('', 'xs border radius')}>
          <Button className={"primary"} title={"custom child"} onClick={onClick} eid={"custom"} />
        </Linebox>
        
        <SidemenuActor {...menu} />
        <Sidemenu />
      </Provider>

      <div className={"res-view"}>
        {result}
      </div>
    </StyledObject>
  );
};


export const align = () => {
  const [result, setResult] = useState(null);
  const [menu, setMenu] = useState(null);

  const onClick = (eid, e) => {
    setMenu({
      show: true,
      title: 'custom menu',
      children: MenuChild,
      className: `${eid}`,
      onClicked: (eid) => {
        setResult(`onClick(eid, e) eid = ${eid}`);
      },
      onClickMenu: () => {
        setResult(`onClickMenu(eid, e) eid = ${eid}`);
      },
    });
  }

  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"size"} id={"f0001"} className={'padding'} sample={samplecode('', 'xs border radius')}>
        <Button className={"primary"} title={"left"} onClick={onClick} eid={"left"} />
        <Button className={"primary"} title={"right"} onClick={onClick} eid={"right"} />
      </Linebox>

      <div className={"res-view"}>
        {result}
      </div>
    </StyledObject>
  );
};


const StyledMenu = styled.span`{
  &.m-body {
    .edit-box { ${cs.m.b10} }
  }
}`;


/*******************************************************************
  팝업
*******************************************************************/
const MenuChild = (props) => {
  var refs = {};

  const { data, state } = props;
  const { label = '', message = '' } = data;

  return (
    <StyledMenu className="m-body">
      <Editbox ref={ref => { refs.label = ref }} value={label} name="label" type="text" validate={true} focus={true} />
      <Editbox ref={ref => { refs.message = ref }} value={message} name="message" type="text" validate={true} />
    </StyledMenu>
  );
}

object.story = {
  name: 'Base'
};