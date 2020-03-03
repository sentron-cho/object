import React from 'react';
import Button from '../src/Button';
import { withKnobs, text, boolean, radios } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';
import cx from 'classnames/bind'
import { Linebox } from './00-Frame';
import { cs } from '../src';

const StyledObject = styled.span`{
  &.t-main {
    .lb-box.type .lb-li > * { margin: 0; }
    .lb-box.size .lb-li { height: 48px; }
  }
}`;

export default {
  title: 'object|Button', // 스토리북에서 보여질 그룹과 경로를 명시
  component: Button, // 어떤 컴포넌트를 문서화 할지 명시
  decorators: [withKnobs], // 애드온 적용
};

const samplecode = (value) => `<Button className={""} ${value} title={"button"} onClick={} />`;

export const object = () => {
  return (
    <StyledObject className={"t-main"}>
      <Linebox title={"normal"} sample={samplecode()}>
        <Button className={""} title={"button"} onClick={action('onClick')} />
        <Button className={"trans"} title={"trans"} onClick={action('onClick')} />
        <Button className={"primary"} title={"primary"} onClick={action('onClick')} />
        <Button className={"yellow"} title={"yellow"} onClick={action('onClick')} />
        <Button className={"orange"} title={"orange"} onClick={action('onClick')} />
        <Button className={"red"} title={"red"} onClick={action('onClick')} />
        <Button className={"green"} title={"green"} onClick={action('onClick')} />
        <Button className={"dark"} title={"dark"} onClick={action('onClick')} />
        <Button className={"black"} title={"black"} onClick={action('onClick')} />
        <Button className={"primary-line"} title={"primary-line"} onClick={action('onClick')} />
        <Button className={"lightgray"} title={"lightgray"} onClick={action('onClick')} />
        <Button className={"gray"} title={"gray"} onClick={action('onClick')} />
        <Button className={"white"} title={"white"} onClick={action('onClick')} />
        <Button className={"gray-line"} title={"gray-line"} onClick={action('onClick')} />
        <Button className={"gd-gray"} title={"gd-gray"} onClick={action('onClick')} />
      </Linebox>

      <Linebox title={"disabled"} sample={samplecode()}>
        <Button className={"disabled"} title={"disabled"} onClick={action('onClick')} />
        <Button className={"disabled trans"} title={"trans"} onClick={action('onClick')} />
        <Button className={"disabled primary"} title={"primary"} onClick={action('onClick')} />
        <Button className={"disabled yellow"} title={"yellow"} onClick={action('onClick')} />
        <Button className={"disabled orange"} title={"orange"} onClick={action('onClick')} />
        <Button className={"disabled red"} title={"red"} onClick={action('onClick')} />
        <Button className={"disabled green"} title={"green"} onClick={action('onClick')} />
        <Button className={"disabled dark"} title={"dark"} onClick={action('onClick')} />
        <Button className={"disabled black"} title={"black"} onClick={action('onClick')} />
        <Button className={"disabled primary-line"} title={"primary-line"} onClick={action('onClick')} />
        <Button className={"disabled lightgray"} title={"lightgray"} onClick={action('onClick')} />
        <Button className={"disabled gray"} title={"gray"} onClick={action('onClick')} />
        <Button className={"disabled white"} title={"white"} onClick={action('onClick')} />
        <Button className={"disabled gray-line"} title={"gray-line"} onClick={action('onClick')} />
        <Button className={"disabled gd-gray"} title={"gd-gray"} onClick={action('onClick')} />
      </Linebox>

      <Linebox title={"align"} sample={samplecode()}>
        <Button className={"primary left"} title={"primary left"} onClick={action('onClick')} />
        <Button className={"primary right"} title={"primary right"} onClick={action('onClick')} />
        <Button className={"primary center"} title={"primary center"} onClick={action('onClick')} />
      </Linebox>

      <Linebox title={"type"} className={"type"} sample={samplecode()}>
        <Button className={"primary ltype"} title={"primary ltype"} onClick={action('onClick')} />
        <Button className={"primary ctype"} title={"primary ctype"} onClick={action('onClick')} />
        <Button className={"primary rtype"} title={"primary rtype"} onClick={action('onClick')} />
      </Linebox>

      <Linebox title={"full"} sample={samplecode()}>
        <Button className={"primary full"} title={"primary full"} onClick={action('onClick')} />
      </Linebox>

      <Linebox title={"size"} className={"size"} sample={samplecode()}>
        <Button className={"primary xs"} title={"primary xs"} onClick={action('onClick')} />
        <Button className={"primary sm"} title={"primary sm"} onClick={action('onClick')} />
        <Button className={"primary md"} title={"primary md"} onClick={action('onClick')} />
        <Button className={"primary lg"} title={"primary lg"} onClick={action('onClick')} />
        <Button className={"primary xl"} title={"primary xl"} onClick={action('onClick')} />

        <Button className={"primary xs top"} title={"primary top"} onClick={action('onClick')} />
        <Button className={"primary xs middle"} title={"primary middle"} onClick={action('onClick')} />
        <Button className={"primary xs bottom"} title={"primary bottom"} onClick={action('onClick')} />
      </Linebox>

      <Linebox title={"icon type"} sample={samplecode('icon={"menu"}')}>
        <Button className={"primary xs"} icon={"menu"} title={"icon xs"} onClick={action('onClick')} />
        <Button className={"primary sm"} icon={"menu"} title={"icon sm"} onClick={action('onClick')} />
        <Button className={"primary md"} icon={"menu"} title={"icon md"} onClick={action('onClick')} />
        <Button className={"primary lg"} icon={"menu"} title={"icon lg"} onClick={action('onClick')} />
        <Button className={"primary xl"} icon={"menu"} title={"icon xl"} onClick={action('onClick')} />
      </Linebox>

      <Linebox title={"icon color"} sample={samplecode('icon={"menu"} iconcolor={"white"}')}>
        <Button className={"dark sm"} icon={"menu"} title={cs.color.primary} iconcolor={cs.color.primary} onClick={action('onClick')} />
        <Button className={"primary sm"} icon={"menu"} title={"white"} iconcolor={"white"} onClick={action('onClick')} />
        <Button className={"primary sm"} icon={"menu"} title={"black"} iconcolor={"black"} onClick={action('onClick')} />
        <Button className={"primary sm"} icon={"menu"} title={"red"} iconcolor={"red"} onClick={action('onClick')} />
        <Button className={"primary sm"} icon={"menu"} title={"orange"} iconcolor={"orange"} onClick={action('onClick')} />
        <Button className={"primary sm"} icon={"menu"} title={"blue"} iconcolor={"blue"} onClick={action('onClick')} />
        <Button className={"primary sm"} icon={"menu"} title={"dark"} iconcolor={"dark"} onClick={action('onClick')} />
        <Button className={"primary sm"} icon={"menu"} title={"gray"} iconcolor={"gray"} onClick={action('onClick')} />
      </Linebox>

      <Linebox title={"running"} sample={samplecode('icon={"menu"} isrun={true}')}>
        <Button className={"dark sm"} icon={"menu"} title={"running false"} isrun={false} onClick={action('onClick')} />
        <Button className={"dark sm"} icon={"menu"} title={"running true"} isrun={true} onClick={action('onClick')} />
        <Button className={"primary sm"} title={"running false"} isrun={false} onClick={action('onClick')} />
        <Button className={"primary sm"} title={"running true"} isrun={true} onClick={action('onClick')} />
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
      <Linebox title={"sample"} desc={"Knobs 옵션을 통해 미리보기가 가능합니다."} sample={samplecode()}>
        <Button className={cx('b-s', value, classname)} title={title} onClick={action('onClick')} />
      </Linebox>
    </StyledObject>
  );
};