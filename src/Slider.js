import 'rc-slider/assets/index.css';
import React, { useEffect, useState } from 'react';
import Slider from 'rc-slider';
import styled from 'styled-components';
import { cs } from './index';
import cx from 'classnames/bind';
import { Util } from './Utils'

const StyledObject = styled.div`{
  &.slide-bar {
    .sb-label { ${cs.m.b5} }
    .sb-guide { ${cs.font.xs} ${cs.font.gray} ${cs.pos.relative} ${cs.disp.block}
      ${cs.min.h(14)} ${cs.p.v2}
      .sb-min { ${cs.border.radius(3)} ${cs.p.h0} ${cs.p.v2} }
      .sb-max { ${cs.align.right} ${cs.border.radius(3)} ${cs.p.h0} ${cs.p.v2} }
      .sb-val { ${cs.align.xcenter} ${cs.border.radius(3)} ${cs.p.h5} ${cs.p.v2} ${cs.bg.alphablack} }
    }

    &.center { .sb-label { ${cs.font.center} } }
    &.left { .sb-label { ${cs.font.left} } }
    &.right { .sb-label { ${cs.font.right} } }
  }
}`;

// const SliderWithTooltip = createSliderWithTooltip(Slider);

const Slidebar = (props) => {
  const { min = 0, max = 100, label = '', className } = props;
  const [value, setValue] = useState(0);

  useEffect(() => {
    const v = props.value ? Number(Util.replaceAll(props.value, "px")) : props.min;
    if (v) {
      setValue(v)
    }

    return () => {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value]);

  const onChange = (v) => {
    setValue(v);
    props.onChange && props.onChange(v);
  };

  return (
    <StyledObject className={cx('slide-bar', className)}>
      {label && <div className={'sb-label'}>{label}</div>}
      <Slider value={value} onChange={onChange} min={min} max={max} />
      <div className={'sb-guide'}>
        {min !== null && <span className={'sb-min'}>{min}</span>}
        <span className={'sb-val'}>{value}</span>
        {max !== null && <span className={'sb-max'}>{max}</span>}
      </div>
    </StyledObject>
  );
}

export default Slidebar;