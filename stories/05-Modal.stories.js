/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import styled from 'styled-components';
import { Linebox } from './00-Frame';
import { cs, ModalActor, Button, Modal, Editbox } from '../src';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../src/actor/Reducer';

const store = createStore(reducers);

const StyledObject = styled.span`{
  &.t-main {
    .lb-box { ${cs.w.get(800)} ${cs.p.b30} }

    .lb-box .lb-li > * { ${cs.m.r10} }
    .res-view { ${cs.h.get(100)} ${cs.w.get(800)} ${cs.bg.lightgray} }
  }
}`;

export default {
  title: 'object|Modal', // 스토리북에서 보여질 그룹과 경로를 명시
  component: ModalActor, // 어떤 컴포넌트를 문서화 할지 명시
  decorators: [withKnobs], // 애드온 적용
};

const samplecode = (value, classname = '') => `<Confirm className={"${classname}"} ${value} />`;

export const object = () => {
  const title = text('title', null);
  const label = text('label', 'label');
  const message = text('message', '');
  const [modal, setModal] = useState(null);
  const [result, setResult] = useState(null);


  const onClick = (eid, e) => {
    setModal({
      show: true,
      title: title || eid,
      children: ModalChild,
      className: `${eid}`,
      data: { label: label, message: message },
      onOk: (data) => {
        setResult(`${JSON.stringify(data)}`);
      },
      onCancel: () => {
        setResult(`cancel`);
      },
    });
  }

  const onClickSize = (eid, e) => {
    setModal({
      show: true,
      title: title || eid,
      children: ModalChild,
      className: `${eid}`,
      size: eid,
      data: { label: label, message: message },
      onOk: (data) => {
        setResult(`${JSON.stringify(data)}`);
      },
      onCancel: () => {
        setResult(`cancel`);
      },
    }); 
  }

  const onClickTheme = (eid, e) => {
    setModal({
      show: true,
      title: title || eid,
      children: ModalChild,
      theme: eid,
      data: { label: label, message: message },
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
        <Linebox title={"modal type"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."} sample={samplecode()}>
          <Button className={"primary"} title={"n/a"} onClick={onClick} eid={"none"} />
          <Button className={"primary"} title={"dark"} onClick={onClick} eid={"dark"} />
          <Button className={"primary"} title={"white"} onClick={onClick} eid={"white"} />
        </Linebox>

        <Linebox title={"size"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."}>
          <Button className={"primary"} title={"x large"} onClick={onClickSize} eid={"xl"} />
          <Button className={"primary"} title={"large"} onClick={onClickSize} eid={"lg"} />
          <Button className={"primary"} title={"middle"} onClick={onClickSize} eid={"md"} />
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

        <div className={"res-view"}>
          {result}
        </div>
      </StyledObject>

      <ModalActor {...modal} />
      <Modal />
    </Provider>
  );
};


const StyledModal = styled.span`{
  &.m-body {
    .edit-box { ${cs.m.b10} }
  }
}`;

/*******************************************************************
  팝업
*******************************************************************/
const ModalChild = (props) => {
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

  const { data } = props;
  const { label = '', message = '' } = data;

  return (
    <StyledModal className="m-body">
      <Editbox ref={ref => { refs.label = ref }} value={label} name="label" type="text" validate={true} focus={true} />
      <Editbox ref={ref => { refs.message = ref }} value={message} name="message" type="text" validate={true} />
    </StyledModal>
  );
}

object.story = {
  name: 'Base'
};