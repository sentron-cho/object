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
      onOk: (data) => {
        setResult(`${JSON.stringify(data)}`);
      },
      onCancel: () => {
        setResult(`cancel`);
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
      onOk: (data) => {
        setResult(`${JSON.stringify(data)}`);
      },
      onCancel: () => {
        setResult(`cancel`);
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
      onOk: (data) => {
        setResult(`${JSON.stringify(data)}`);
      },
      onCancel: () => {
        setResult(`cancel`);
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
          <Button className={"white border"} title={"white"} onClick={onClickTheme} eid={"white"}/>
          <Button className={"sky border"} title={"sky"} onClick={onClickTheme} eid={"sky"}/>
          <Button className={"primary"} title={"primary"} onClick={onClickTheme} eid={"primary"}/>
          <Button className={"gray"} title={"gray"} onClick={onClickTheme} eid={"gray"}/>
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

  // 팝업의 ok이 버튼일 클릭되면 여기에서 return할 데이터를 만들어 return한다.
  props.act.getData = (checkValidate) => {
    // validate 체크하여 통과하지 못하면 false를 리턴(창이 닫히지 않는다.)
    const isvalidate = Object.keys(refs).every((key) => refs[key].isValidate());
    if (!isvalidate) return false;

    // modified 될 경우 체크(수정사항이 발생하지 않으면 null 리턴하면 cancel과 동일시 된다.)
    // const modified = Object.keys(refs).filter((key) => refs[key].isModified()).length;
    // if (modified <= 0) return null;

    // 아래의 방법을 통해서도 체크가 가능하다...
    // const datas = checkValidate(refs);
    // if (datas === 'modified') return null;
    // if (datas === 'notvalid') return false;

    const { state } = props;
    let datas = {};
    Object.keys(refs).map(key => datas[key] = refs[key].getValue());

    return { 'state': state, ...datas };
  }

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