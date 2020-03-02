import React from 'react';
import cx from 'classnames/bind';
import styled from 'styled-components';
import Editbox from './Editbox';

const StyledObject = styled.div`{
    width: 100%; color: #fff; z-index: 999; height: fit-content; line-height: 30px; position: relative; color:#000;

    &.group { position: relative; display: table; border-collapse: separate; width: 100%}
    .addon { font-size: 14px; font-weight: 400; line-height: 1; color: #555;
      text-align: center; border: none; display: table-cell; width: 40px;
      white-space: nowrap; vertical-align: bottom; padding-bottom: 10px;}

    & > div { display: table-cell;}

    @media screen and (max-width : 767px) { }
  }`;

class Datebox extends React.Component {
  constructor(props) {
    super(props);
  }

  /*
  onClickItem = (e) => {
    e.currentTarget.setAttribute('eid', 'select');
    props.onClick(e);
  }
  */

  startObj = () => {
    return this.refStart;
  }

  endObj = () => {
    return this.refEnd;
  }

  getStart = () => {
    return this.refStart.getValue();
  }

  getEnd = () => {
    return this.refEnd.getValue();
  }

  render() {
    const props = this.props;
    return (
      <StyledObject className={cx("group", props.className)}>
        <Editbox ref={ref => { this.refStart = ref }} value={props.sdate} name="start" type="date" guide={props.sguide} label={props.isLabel && 'start day'} />
        <div className="addon">to</div>
        <Editbox ref={ref => { this.refEnd = ref }} value={props.edate} name="end" type="date" guide={props.eguide} label={props.isLabel && 'end day'} />
      </StyledObject>
    );
  }
};

export default Datebox;