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
  const samplecode = (value, classname='') => `<Editbox type={"text"} className={"${classname}"} label={"readonly"} guide={"readonly"} value={"readonly"} readonly={true} ${value} />`;

  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"normal"} inline={true} sample={samplecode()}>
        <Editbox className={cx('')} type={"text"} label={"guide"} guide={"guide"} />
        <Editbox className={cx('')} type={"text"} label={"focus"} guide={"focus"} value={"focus"} focus={true} />
        <Editbox className={cx('')} type={"text"} label={"readonly"} guide={"readonly"} value={"readonly"} readonly={true} />
        <Editbox className={cx('')} type={"text"} label={"disabled"} guide={"disabled"} value={"disabled"} disabled={true} />
      </Linebox>

      <Linebox title={"clear && event"} inline={true} sample={samplecode(`onClear={} onEnter={} onChange={}`)}>
        <Editbox className={cx('')} type={"text"} label={"onClear"} guide={"onClear"} value={"onClear"} onClear={action('onClear')} />
        <Editbox className={cx('')} type={"text"} label={"onEnter"} guide={"onEnter"} value={"onClear"} onEnter={action('onEnter')} />
        <Editbox className={cx('')} type={"text"} label={"onChange"} guide={"onChange"} value={"onChange"} onChange={action('onClear')} />
      </Linebox>

      <Linebox title={"inline"} sample={samplecode('inline={true}')}>
        <Editbox className={cx('')} type={"text"} label={"inline"} guide={"inline"} value={"inline"} inline={true} />
      </Linebox>
    
      <Linebox title={"align"} sample={samplecode('type={"left"}', 'left')} inline={true}>
        <Editbox className={cx('left')} type={"text"} label={"left"} guide={"left"} value={"left"} />
        <Editbox className={cx('center')} type={"text"} label={"center"} guide={"center"} value={"center"} />
        <Editbox className={cx('right')} type={"text"} label={"right"} guide={"right"} value={"right"} />
      </Linebox>

      <Linebox title={"type"} sample={samplecode('type={"left"}', 'left')} inline={true}>
        <Editbox className={cx('')} type={"text"} label={"text"} guide={"text"} value={"text"} />
        <Editbox className={cx('')} type={"number"} label={"number"} guide={"number"} value={"number"} />
        <Editbox className={cx('')} type={"date"} label={"date"} guide={"date"} value={"2019-10-10"} />
      </Linebox>

      <Linebox title={"textarea"} sample={samplecode('type={"left"}', 'left')} inline={true}>
        <Editbox className={cx('')} type={"text"} label={"text"} guide={"text"} value={"text"} multi={true}/>
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