import React from 'react';
import Editbox from '../src/Editbox';
import { withKnobs, text, boolean, radios } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';
import cx from 'classnames/bind'
import { Linebox } from './00-Frame';
import { cs } from '../src';

const StyledObject = styled.span`{
  &.t-main {
    .lb-box
    .lb-box.type .lb-li > * { margin: 0; }
    .lb-box.size .lb-li { height: 48px; }
  }
}`;

export default {
  title: 'object|Editbox', // 스토리북에서 보여질 그룹과 경로를 명시
  component: Editbox, // 어떤 컴포넌트를 문서화 할지 명시
  decorators: [withKnobs], // 애드온 적용
};

export const object = () => {
  // knobs 만들기
  // const classname = text('classname', 'primary');
  // const title = text('title', 'Button');
  // const options = { xl: 'xl', lg: 'lg', md: 'md', sm: 'sm', xs: 'xs' };
  // const value = radios('size', options, 'md', 'Other');

  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"normal"} inline={true}>
        <Editbox className={cx('')} label={"guide"} guide={"guide"} />
        <Editbox className={cx('')} label={"focus"} guide={"focus"} value={"focus"} focus={true} />
        <Editbox className={cx('')} label={"readonly"} guide={"readonly"} value={"readonly"} readonly={true} />
        <Editbox className={cx('')} label={"disabled"} guide={"disabled"} value={"disabled"} disabled={true} />
      </Linebox>

      <Linebox title={"clear && event"} inline={true}>
        <Editbox className={cx('')} label={"onClear"} guide={"onClear"} value={"onClear"} onClear={action('onClear')} />
        <Editbox className={cx('')} label={"onEnter"} guide={"onEnter"} value={"onClear"} onEnter={action('onEnter')} />
        <Editbox className={cx('')} label={"onChange"} guide={"onChange"} value={"onChange"} onChange={action('onClear')} />
      </Linebox>

      <Linebox title={"inline"}>
        <Editbox className={cx('')} label={"inline"} guide={"inline"} value={"inline"} inline={true} />
      </Linebox>
    </StyledObject>
  );
};

object.story = {
  name: 'Base'
};

export const sample = () => {
  const classname = text('classname', 'primary');
  const title = text('title', 'Button');
  const options = { xl: 'xl', lg: 'lg', md: 'md', sm: 'sm', xs: 'xs' };
  const value = radios('size', options, 'md', 'Other');

  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"sample"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."}>
        {/* <Button className={cx('b-s', value, classname)} title={title} onClick={action('onClick')} /> */}
      </Linebox>
    </StyledObject>
  );
};