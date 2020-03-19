import React, { useState } from 'react';
import { optionsKnob as options, withKnobs, text, boolean, button, array, select } from '@storybook/addon-knobs';
import styled from 'styled-components';
import cx from 'classnames/bind'
import { Linebox } from './00-Frame';
import { cs, Optionbar, Editbox } from '../src';

const StyledObject = styled.span`{
  &.t-main {
    .lb-box { ${cs.w.get(800)} ${cs.p.b30} }

    .lb-box .lb-li { ${cs.min.height(100)} ${cs.over.unset} }
    .lb-box .lb-li > * { ${cs.m.right(100)} }
    .res-view { 
      ${cs.h.get(100)} ${cs.w.get(800)} ${cs.bg.lightgray} 
      p { ${cs.m.a5} }
    }

    .lb-box.v-align{ ${cs.m.bottom(50)} .lb-li { ${cs.min.height(300)} & > * { ${cs.m.r0} } } }
  }
}`;

export default {
  title: 'object|Optionbar', // 스토리북에서 보여질 그룹과 경로를 명시
  component: Optionbar, // 어떤 컴포넌트를 문서화 할지 명시
  decorators: [withKnobs], // 애드온 적용
};

const samplecode = (value, classname = '') => `<Optionbar  className={"${classname}"} ${value} />`;
export const sobject = () => {

  const classname = text('classname', '');
  const size = options('size',
    { 'none': '', 'lg(large)': 'lg', 'md(middle)': 'md', 'sm(small)': 'sm' },
    '', { display: 'inline-radio' }, 'Other');
  const bg = options('background',
    { none: '', white: 'white', orange: 'orange', green: 'green', red: 'red', primary: 'primary', gray: 'gray', dark: 'dark', black: 'black' },
    '', { display: 'inline-radio' }, 'Other');
  const theme = options('theme',
    { none: '', sky: 'sky', primary: 'primary', gray: 'gray', dark: 'dark', black: 'black' },
    '', { display: 'inline-radio' }, 'Other');    
  const title = text('title', 'Optionbar');
  const ischild = boolean('child component', true);
  button('refresh(child component 변경후 버튼을 클릭하세요)', () => onRefresh());
  
  const titlesize = text('title size', '14px');
  const titlecolor = text('title color', '#353535');
  const titlealign = options('title align', { 'left': 'left', 'center': 'center', 'right': 'right' },
    '', { display: 'inline-radio' }, 'Other');

  const [result, setResult] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const onClick = (eid, e) => {
    setResult(`eid = ${eid}, e`);
  }

  
  const onRefresh = (e) => {
    setRefresh(true);
    setTimeout(() => setRefresh(false), 200);
  }

  const opt = {
    title: { color: titlecolor, size: titlesize, align: titlealign },
  };

  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"Optionbar"} className={"v-align"} id={"f0001"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."} top={option.top}
        sample={samplecode('title={"Optionbar"} onClick={onClick} onChange={onChange}', 'primary')} box={true}>
        {!refresh && <Optionbar className={cx(classname, bg, size)} options={opt}
          theme={theme} title={title} onClick={onClick} children={ischild && OptionChild} /> }
        {/* title={ST.ADMIN.OPTIONS.TITLE} onClick={onClickOptions} children={LayerOptions} rowid={state.rowid} data={state.data} state={state.state} */}
      </Linebox>

      <div className={"res-view"}>
        <p>onClick</p>
        <p>{result}</p>
      </div>
    </StyledObject>
  );
};


sobject.story = {
  name: 'Base'
};

const option = {
  top: "20px",
}

const StyledOptions = styled.span`{
  &.m-opt {
    .edit-box { ${cs.m.v10} ${cs.w.calc('100%')} }
  }
}`;
/*******************************************************************
  팝업
*******************************************************************/
const OptionChild = (props) => {
  var refs = {};

  // 팝업의 ok이 버튼일 클릭되면 여기에서 return할 데이터를 만들어 return한다.
  // props.act.getData = (checkValidate) => {
  //   // validate 체크하여 통과하지 못하면 false를 리턴(창이 닫히지 않는다.)
  //   const isvalidate = Object.keys(refs).every((key) => refs[key].isValidate());
  //   if (!isvalidate) return false;

  //   const { state } = props;
  //   let datas = {};
  //   Object.keys(refs).map(key => datas[key] = refs[key].getValue());

  //   return { 'state': state, ...datas };
  // }

  const onChange = (value, e) => {
    props.onChange && props.onChange(value, e);
  }

  const { data, state } = props;

  return (
    <StyledOptions className="m-opt">
      <Editbox ref={ref => { refs.label = ref }} className={'border radius md'} onChange={onChange}
        label={'label'} guide={'label'} name="label" type="text" validate={true} focus={true} />
      <Editbox ref={ref => { refs.message = ref }} className={'border radius md'} onChange={onChange}
        label={'message'} guide={'message'} name="message" type="text" validate={true} />
    </StyledOptions>
  );
}