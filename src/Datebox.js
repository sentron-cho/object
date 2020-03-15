import React, { useRef, useState } from 'react';
import cx from 'classnames/bind';
import styled from 'styled-components';
import { Editbox, cs } from './index';

const StyledObject = styled.div`{
  ${cs.w.full} ${cs.font.white} ${cs.z.over} ${cs.h.fit} ${cs.font.line(30)} ${cs.pos.relative}

    &.group { position: relative; display: table; border-collapse: separate; width: 100%}
    .addon { font-size: 14px; font-weight: 400; line-height: 1; color: #555;
      text-align: center; border: none; display: table-cell; width: 40px;
      white-space: nowrap; vertical-align: bottom; padding-bottom: 10px;}

    & > div { display: table-cell;}

    @media screen and (max-width : 767px) { }
  }`;

class Datebox extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {start: props.sdate, end: props.end};
  }
  
  onChangeStart = (value) => {
    const {props} = this;
    this.setState({start: value});
    props.onChange && props.onChange('start', value);
  }

  onChangeEnd = (value) => {
    const {props} = this;
    this.setState({end: value});
    props.onChange && props.onChange('end', value);
  }

  getValue = () => {
    const {start, end} = this.state;
    return {start, end};
  }
  
  render() {
    const {props} = this;
    const { slabel, elabel, sguide, eguide, sdate, edate, className } = props;

    return (
      <StyledObject className={cx("group", className)}>
        <Editbox value={sdate} name="start" type="date"
          guide={sguide} label={slabel} onChange={this.onChangeStart} />
        <span className="addon">to</span>
        <Editbox value={edate} name="end" type="date"
          guide={eguide} label={elabel} onChange={this.onChangeEnd} />
      </StyledObject>
    );
  }
};

export default Datebox;