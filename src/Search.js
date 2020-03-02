import React from 'react';
import cx from 'classnames/bind';
import styled from 'styled-components';
import { Editbox, Svg, cs, Combobox } from './index';

const StyledObject = styled.div` {
  &.search-box {
    ${cs.pos.relative} ${cs.w.full} ${cs.disp.inblock} ${cs.max.height(40)} ${cs.p.get("2px 10px")} ${cs.bg.white} ${cs.box.radius}

    .sc-in { ${cs.disp.inblock} ${cs.w.get("calc(100% - 155px)")} ${cs.m.l30} }
    .sc-btn { ${cs.align.ycenter} }
    .sc-combo { ${cs.align.ycenter} ${cs.right(0)} ${cs.w.get(120)} ${cs.right(-1)}
      .cb-sel { ${cs.border.radius("0 5px 5px 0")} } 
    }

    &.box { ${cs.box.line} }
  }
}`;

export default class Search extends React.PureComponent {
  constructor(props) {
    super(props);
    const key = props.searchkey ? props.searchkey : props.list ? props.list[0].id : '';
    this.state = { value: props.value || '', list: props.list || null, key: key };
  }

  onClicked = (e) => {
    this.props.onClick && this.props.onClick(this.state.value, this.state.key, e);
  }

  onEnter = (e) => {
    this.props.onClick && this.props.onClick(this.state.value, this.state.key, e);
  }

  onChange = (value, e) => {
    this.setState({ value: value });
    this.props.onChange && this.props.onChange(this.state.value, this.state.key, e);
  }

  onClickCombo = (eid, e, value) => {
    // const { props } = this;
    // props.onChange && props.onChange();
    this.setState({ key: value.id } );
  }

  render() {
    const { state, props } = this;
    const { list } = state;
    const style = list ? { width: 'calc(100% - 155px)' } : { width: 'calc(100% - 35px)' };
    const pos = list ? list.findIndex(item => item.id === state.key) : 0;

    return (
      <StyledObject className={cx("search-box", props.className)}>
        <Svg className="sc-btn sm" color={'black'} onClick={this.onClicked} icon={'find'} />
        <Editbox type="text" className="sc-in transparent" guide={props.guide} value={state.value}
          onEnter={this.onEnter} onChange={this.onChange} style={style} />
        {list && <Combobox className="sc-combo dark lg" pos={pos}
          list={list} onClick={this.onClickCombo} inline={true} />
        }
      </StyledObject>
    )
  }
}