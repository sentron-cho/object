/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import styled from 'styled-components';
import { Linebox } from './00-Frame';
import { cs, SidemenuActor, Button, Sidemenu, Svg } from '../src';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../src/actor/Reducer';

const store = createStore(reducers);

const StyledObject = styled.span`{
  &.t-main {
    .lb-box { ${cs.w.get(1024)} ${cs.p.b30} }

    .lb-box .lb-li { ${cs.p.left(200)} }
    .res-view { ${cs.p.left(200)} ${cs.h.get(100)} ${cs.w.get(800)} ${cs.bg.lightgray} }
  }
}`;

export default {
  title: 'object|Sidemenu', // 스토리북에서 보여질 그룹과 경로를 명시
  component: SidemenuActor, // 어떤 컴포넌트를 문서화 할지 명시
  decorators: [withKnobs], // 애드온 적용
};

const samplecode = (value, classname = '') => `<Confirm className={"${classname}"} ${value} />`;
const list = [
  { id: 'daum', name: 'daum', url: 'http://www.daum.net' },
  { id: 'google', name: 'google', url: 'http://www.google.com' },
  { id: 'widget', name: 'widget', url: '?path=/story/object-widgetbox--object' }
];

export const object = () => {
  const title = text('title', 'nuriweb');
  const [menu, setMenu] = useState(null);
  const [click, setClick] = useState(null);
  const [result, setResult] = useState(null);

  const onClick = (eid, e) => {
    setMenu({
      show: true,
      title: title || eid,
      // children: MenuChild,
      list: list,
      className: `${eid}`,
      onClicked: (eid, e) => {
        setClick(`onClick(eid, e) eid = ${eid}`);
      },
      onClickMenu: (eid, url, e) => {
        setResult(`onClickMenu(eid, e) eid = ${eid}, url = ${url}`);
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
      onClicked: (eid, e) => {
        setClick(`onClicked(eid, e) eid = ${eid}`);
      },
      onClickMenu: null,
      // onClickMenu: (eid, e) => {
      //   setResult(`onClickMenu(eid, e) eid = ${eid}`);
      // },
    });
  }

  const onClickTheme = (eid, e) => {
    setMenu({
      show: true,
      title: title || eid,
      // children: MenuChild,
      list: list,
      theme: eid,
      onClicked: (eid, e) => {
        setClick(`onClicked(eid, e) eid = ${eid}`);
      },
      onClickMenu: (eid, url, e) => {
        setResult(`onClickMenu(eid, e) eid = ${eid}, url = ${url}`);
      },
    });
  }

  return (
    <Provider store={store} >
      <StyledObject className={"t-main"} id={"body"} >
        <Linebox title={"menu type"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."}>
          <Button className={"border "} title={"n/a"} onClick={onClick} eid={"none"} />
          <Button className={"white border"} title={"white"} onClick={onClick} eid={"white"} />
          <Button className={"sky border"} title={"sky"} onClick={onClick} eid={"sky"} />
          <Button className={"gray"} title={"gray"} onClick={onClick} eid={"gry"} />
          <Button className={"primary"} title={"primary"} onClick={onClick} eid={"primary"} />
          <Button className={"dark"} title={"dark"} onClick={onClick} eid={"dark"} />
          <Button className={"black"} title={"black"} onClick={onClick} eid={"black"} />
        </Linebox>

        <Linebox title={"size"} desc={"item에 url을 설정하고 onClickMenu 함수가 없을 경우 메뉴를 클릭하면 onClickMenu 함수 호출."}>
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
          <div>{result}</div>
          <div>{click}</div>
        </div>
      </StyledObject>

      <SidemenuActor {...menu} />
      <Sidemenu />
    </Provider>
  );
};


export const custom = () => {
  const [result, ] = useState(null);
  const [click, setClick] = useState(null);
  const [menu, setMenu] = useState(null);

  const onClick = (eid, e) => {
    setMenu({
      show: true,
      title: 'custom menu',
      children: MenuChild,
      className: `${eid}`,
      onClicked: (eid, e) => {
        setClick(`onClicked(eid, e) eid = ${eid}`);
      },
      onClickMenu: null,
      // onClickMenu: (eid, url, e) => {
      //   setResult(`onClickMenu(eid, e) eid = ${eid}, url = ${url}`);
      // },
    });
  }

  return (
    <StyledObject className={"t-main"} id={"body"} >
      <Provider store={store} >
        <Linebox title={"size"} className={'padding'} sample={samplecode('', 'xs border radius')}>
          <Button className={"primary"} title={"custom child"} onClick={onClick} eid={"custom"} />
        </Linebox>

        <SidemenuActor {...menu} />
        <Sidemenu />
      </Provider>

      <div className={"res-view"}>
        <div>{result}</div>
        <div>{click}</div>
      </div>
    </StyledObject>
  );
};


export const align = () => {
  const [result, setResult] = useState(null);
  const [click, ] = useState(null);
  const [menu, setMenu] = useState(null);

  const onClick = (eid, e) => {
    setMenu({
      show: true,
      align: `${eid}`,
      title: 'custom menu',
      children: MenuChild,
      onClicked: (eid) => {
        setResult(`onClicked(eid, e) eid = ${eid}`);
      },
      onClickMenu: () => {
        setResult(`onClickMenu(eid, e) eid = ${eid}`);
      },
    });
  }

  return (
    <StyledObject className={"t-main"} id={"body"} >
      <Provider store={store} >
        <Linebox title={"size"} id={"f0001"} className={'padding'} sample={samplecode('', 'xs border radius')}>
          <Button className={"primary"} title={"left"} onClick={onClick} eid={"left"} />
          <Button className={"primary"} title={"right"} onClick={onClick} eid={"right"} />
        </Linebox>

        <SidemenuActor {...menu} />
        <Sidemenu />
      </Provider>

      <div className={"res-view"}>
        <div>{result}</div>
        <div>{click}</div>
      </div>
    </StyledObject>
  );
};


const StyledMenu = styled.span`{
  &.m-body {
    ${cs.pos.relative} ${cs.m.top(30)} ${cs.disp.block} ${cs.p.r10}
    .m-li { ${cs.h.get(40)} ${cs.font.line(40)} ${cs.disp.block} ${cs.align.ycenter} 
      ${cs.pos.relative} ${cs.font.t1} ${cs.font.primary} ${cs.font.ycenter}
      ${cs.p.l10} ${cs.m.b10}

      &:hover, &.active { ${cs.bg.primaryhover} ${cs.font.white} .svg-icon .svg-path { ${cs.fill.white} } } 
      .svg-icon { ${cs.m.r10} .svg-path{ ${cs.fill.primary} } }
    }
  }
}`;


/*******************************************************************
  팝업
*******************************************************************/
const MenuChild = (props) => {
  const onClick = (e) => {
    // url/eid를 자식 노드에 설정하고 자동으로 동작시킬 경우..
    props.onClickMenu && props.onClickMenu(e);

    // url 속성에서 가져와 수동으로 동작시킬 경우
    // const url = e.currentTarget.getAttribute("url");
    // url && window.open(url);

    // 메뉴 클릭후 화면을 닫고자 할 경우..
    // props.onClose && props.onClose();
  }

  return (
    <StyledMenu className="m-body">
      <span className={'m-li'} url={'http://naver.com'} eid={'naver'} onClick={onClick}><Svg className={'sm'} icon="delete" />naver</span>
      <span className={'m-li'} url={'http://google.com'} eid={'google'} onClick={onClick}><Svg className={'sm'} icon="edit" />google</span>
      <span className={'m-li'} url={'http://netflix.com'} eid={'netflix'} onClick={onClick}><Svg className={'sm'} icon="new" />netflix</span>
      <span className={'m-li'} url={'http://youtube.com'} eid={'youtube'} onClick={onClick}><Svg className={'sm'} icon="media" />youtube</span>
    </StyledMenu>
  );
}

object.story = {
  name: 'Base'
};