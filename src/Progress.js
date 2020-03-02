import React from 'react';
import styled from 'styled-components';
import cx from 'classnames';
import Svg from './Svg';

const StyledObject = styled.div`{
  &.prog-box {
    width: ${(props) => props.width};
    height: ${(props) => props.height}; display: block; position: relative; border-radius: 4px;
    background: #f1f1f1; float: right; margin: 0;

    .bar-txt {
      position: absolute; color: #a4a4a4; font-size: 10px; line-height: 10px;
      z-index: 1; top: 50%; transform: translateY(-50%); right: 4px;
    }

    .bar { background: #63c2de; height: 100%; width: 0; display: inline-block; 
      border: 1px solid transparent; margin-bottom: 1px; float: left; border-radius: 4px 0 0 4px;
      
      &.primary { background: #63c2de; }

      &.norm { background: #2aaa64; }
      &.warn { background: #ff8400; }
      &.err { background: #f86c6b; }

      // &.level1 { background: #2aaa64; }
      // &.level2 { background: #ff8400; }
      // &.level3 { background: #f86c6b; }

      &.full { border-radius: 4px; }
    }

    .pg-icon { width: 16px; height: 16px; z-index: 10; opacity: 0.9; position: absolute; left: -6px; top: -6px; 
      border: 1px solid rgba(250, 250, 250, 0.95); padding: 2px; border-radius: 20px; background: #fff677;
    }

    &.nobg { background: transparent; border: 1px solid #515b65; }
    &.dark { background: #515b65; .bar-txt {color: #fff; } }
  }
}`;

const Progress = (props) => {

  const { max = 100, min = 0, value = 0, limit=70, unit='' } = props;
  let rate = props.rate;
  if (max > 0 && value > 0) {
    rate = Math.floor(value / (max - min) * 100);
    // console.dir(rate);
  }

  let bar_style = 'norm';
  if (rate >= 100) {
    bar_style = 'err';
  } else if (rate >= limit) {
    bar_style = 'warn';
  } else if (rate > 50) {
    bar_style = 'norm';
  }

  let alarm = bar_style === 'warn' || bar_style === 'err' ? bar_style : null;

  const prog = { width: `${rate}%` }
  const full = (rate >= 100);

  return (
    <StyledObject className={cx("prog-box", props.className, (full))} width={(props.width != null ? props.width : '100%')}
      height={(props.height != null ? props.height : '16px')}>
      {rate > 0 && <span className="bar-txt">{`${rate} ${unit ? unit : ''}`}</span>}
      {rate > 0 && <span className={cx("bar", bar_style)} style={prog}></span>}
      {alarm && <Svg className="pg-icon md" icon={alarm === "warn" ? 'warning' : 'alarm'} color={"#d50000"} />}
    </StyledObject>
  )
}

export default Progress;