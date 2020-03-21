import React from 'react';
import cx from 'classnames/bind';
import styled from 'styled-components';
import { Editbox, cs } from './index';

const StyledObject = styled.div`{
  &.date-box {
    ${cs.w.full} ${cs.font.white} ${cs.z.over} ${cs.h.fit} ${cs.font.line(30)} ${cs.pos.relative}
    ${cs.pos.relative} ${cs.disp.get('table')} ${cs.w.full} border-collapse: separate;

      
    .dtb-addon { 
      ${cs.w.get(40)} ${cs.font.md} ${cs.disp.get("table-cell")}
      ${cs.font.gray} ${cs.font.center} ${cs.font.space('nowrap')} ${cs.m.top(-10)}
    }

    & > div { ${cs.disp.get('table-cell')} }

    
    &.theme-sky { .dtb-addon { ${cs.bg.lightwhite} } }
    &.theme-primary { .dtb-addon { ${cs.bg.primaryhover} } }
    &.theme-gray { .dtb-addon { ${cs.bg.darkwhite} } }
    &.theme-dark { .dtb-addon { ${cs.bg.black} } }
    &.theme-black { .dtb-addon { ${cs.bg.dark} } }

    @media screen and (max-width : 767px) { }
  }
}`;
class Datebox extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { start: props.sdate, end: props.end };
  }

  onChangeStart = (value) => {
    const { props } = this;
    this.setState({ start: value });
    props.onChange && props.onChange('start', value);
  }

  onChangeEnd = (value) => {
    const { props } = this;
    this.setState({ end: value });
    props.onChange && props.onChange('end', value);
  }

  getValue = () => {
    const { start, end } = this.state;
    return { start, end };
  }

  render() {
    const { props } = this;
    const {
      slabel, elabel, sguide, eguide, sdate, edate, theme,
      className, bordercolor, bgcolor, fontcolor, to = 'to'
    } = props;

    return (
      <StyledObject className={cx("date-box", className, theme && `theme-${theme}`)}>
        <Editbox className={className} value={sdate} name="start" type="date" inline={slabel}
          bordercolor={bordercolor} bgcolor={bgcolor} fontcolor={fontcolor} theme={theme}
          guide={sguide} label={slabel} onChange={this.onChangeStart} />
        <span className={"dtb-addon"}>{to}</span>
        <Editbox className={className} value={edate} name="end" type="date" inline={elabel}
          bordercolor={bordercolor} bgcolor={bgcolor} fontcolor={fontcolor} theme={theme}
          guide={eguide} label={elabel} onChange={this.onChangeEnd} />
      </StyledObject>
    );
  }
};

export default Datebox;