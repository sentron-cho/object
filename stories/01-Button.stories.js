import React from 'react';
import Button from '../src/Button';
import { withKnobs, text, boolean, radios } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';
import cx from 'classnames/bind'

const StyledObject = styled.span`{
  &.t-main {
    h2 { text-transform: uppercase; }
    .t-li { margin-top: 10px; max-width: 100%; overflow: hidden;
      width: calc(100% - 20px);
    }
    
    .button { margin: 0 10px; }

    .nomargin { .button { margin: 0; } }
  }
}`;

export default {
  title: 'object|Button', // 스토리북에서 보여질 그룹과 경로를 명시
  component: Button, // 어떤 컴포넌트를 문서화 할지 명시
  decorators: [withKnobs], // 애드온 적용
};

export const object = () => {
  // knobs 만들기
  const classname = text('classname', 'primary');
  const title = text('title', 'Button');
  const options = {xl:'xl', lg:'lg', md:'md', sm:'sm', xs:'xs'};
  const value = radios('size', options, 'md', 'Other');

  return (
    <StyledObject className={"t-main"}>
      <h2>sample</h2>
      <div className={"t-li sample"}>
        <Button className={cx('b-s', value, classname)} title={title} onClick={action('onClick')} />
      </div>

      <h2>normal</h2>
      <div className={"t-li"}>
        <Button className={""} title={title} onClick={action('onClick')} />
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
        <Button className={"disabled"} title={"disabled"} onClick={action('onClick')} />
      </div>

      <h2>disabled</h2>
      <div className={"t-li"}>
        <Button className={""} title={"null"} onClick={action('onClick')} />
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
      </div>
      
      <h2>size</h2>
      <div className={"t-li full"}>
        <Button className={"primary xs"} title={"primary xs"} onClick={action('onClick')} />
        <Button className={"primary sm"} title={"primary sm"} onClick={action('onClick')} />
        <Button className={"primary md"} title={"primary md"} onClick={action('onClick')} />
        <Button className={"primary lg"} title={"primary lg"} onClick={action('onClick')} />
        <Button className={"primary xl"} title={"primary xl"} onClick={action('onClick')} />
      </div>

      <h2>icon type</h2>
      <div className={"t-li"}>
        <Button className={"primary xs"} icon={"menu"} title={"icon xs"} onClick={action('onClick')} />
        <Button className={"primary sm"} icon={"menu"} title={"icon sm"} onClick={action('onClick')} />
        <Button className={"primary md"} icon={"menu"} title={"icon md"} onClick={action('onClick')} />
        <Button className={"primary lg"} icon={"menu"} title={"icon lg"} onClick={action('onClick')} />
        <Button className={"primary xl"} icon={"menu"} title={"icon xl"} onClick={action('onClick')} />
      </div>

      <h2>align</h2>
      <div className={"t-li"}>
        <Button className={"primary left"} title={"primary left"} onClick={action('onClick')} />
        <Button className={"primary right"} title={"primary right"} onClick={action('onClick')} />
        <Button className={"primary center"} title={"primary center"} onClick={action('onClick')} />
      </div>

      <h2>type</h2>
      <div className={"t-li nomargin"}>
        <Button className={"primary ltype"} title={"primary ltype"} onClick={action('onClick')} />
        <Button className={"primary ctype"} title={"primary ctype"} onClick={action('onClick')} />
        <Button className={"primary rtype"} title={"primary rtype"} onClick={action('onClick')} />
      </div>

      <h2>full</h2>
      <div className={"t-li full"}>
        <Button className={"primary full"} title={"primary full"} onClick={action('onClick')} />
      </div>

    </StyledObject>
  );
};

object.story = {
  name: 'Base'
};

// export const standard = () => <Button name="Storybook" />;