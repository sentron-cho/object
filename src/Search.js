import React, { useState, useEffect } from 'react';
import cx from 'classnames/bind';
import styled from 'styled-components';
import { Editbox, Svg, cs, Combobox, Button } from './index';
import { EID, ST } from './Config';

const StyledObject = styled.div` {
  &.search-box {
    ${cs.pos.relative} ${cs.w.calc('100% - 20px')} ${cs.disp.inblock} ${cs.p.h10} 
    ${cs.bg.white} ${cs.box.radius} ${cs.bg.sky} ${cs.box.inner} //${cs.over.hidden}

    .sc-in { ${cs.disp.inblock} ${cs.align.ycenter} ${cs.pos.relative} }
    .sc-btn { ${cs.align.ycenter} ${cs.right(5)} }
    .sc-combo { 
      ${cs.align.ycenter} ${cs.left(0)} ${cs.pos.relative}
      .cb-sel { ${cs.border.radius("0")} ${cs.border.none} ${cs.border.right} 
        ${cs.border.color(cs.color.lightgray)}  ${cs.p.a0} ${cs.font.center} } 
    }

    &.box, &.border { ${cs.box.line} .sc-combo, .sc-combo .cb-sel { ${cs.h.calc('100%')} } }
    &.radius { ${cs.border.radius} }

    &.md { ${cs.h.md} 
      .sc-combo, .sc-combo .cb-sel { ${cs.w.get(140)} } 
      .sc-in { ${cs.p.r30} &.combo { ${cs.w.calc('100% - 140px')} } } 
    }
    &.xs { ${cs.h.xs} 
      .sc-combo, .sc-combo .cb-sel { ${cs.w.get(100)} } 
      .sc-in { ${cs.p.r15} &.combo { ${cs.w.calc('100% - 100px')} }  } .sc-btn { ${cs.m.left(-4)} ${cs.m.top(-3)} } 
    }
    &.sm { ${cs.h.sm} 
      .sc-combo, .sc-combo .cb-sel { ${cs.w.get(120)} } 
      .sc-in { ${cs.p.r25}  &.combo { ${cs.w.calc('100% - 120px')} } }
    }
    &.lg { ${cs.h.lg} 
      .sc-combo, .sc-combo .cb-sel { ${cs.w.get(160)} } 
      .sc-in { ${cs.p.r40} .box .input { ${cs.h.get(32)} ${cs.min.h(32)} } &.combo { ${cs.w.calc('100% - 200px')} } }
    }
    &.xl { ${cs.h.xl} 
      .sc-combo, .sc-combo .cb-sel { ${cs.w.get(200)} } 
      .sc-in { ${cs.p.right(50)} &.combo { ${cs.w.calc('100% - 250px')} } }
    }
    
    &.left { }
    &.right {  }
    &.center {  }

    &.sky { ${cs.bg.sky} .sc-btn .svg-path { ${cs.fill.dark} } .sc-combo .cb-sel { ${cs.border.lightgray} ${cs.bg.sky} } }
    &.orange { ${cs.bg.orange} .sc-btn .svg-path { ${cs.fill.white} } .sc-combo .cb-sel { ${cs.border.orange} ${cs.bg.orangehover} } }
    &.green { ${cs.bg.green} .sc-btn .svg-path { ${cs.fill.white} } .sc-combo .cb-sel { ${cs.border.green} ${cs.bg.greenhover} } }
    &.red { ${cs.bg.red} .sc-btn .svg-path { ${cs.fill.white} } .sc-combo .cb-sel { ${cs.border.red} ${cs.bg.redhover} } }
    &.primary { ${cs.bg.primary} .sc-btn .svg-path { ${cs.fill.white} } .sc-combo .cb-sel { ${cs.border.primary} ${cs.bg.primaryhover} } }
    &.gray { ${cs.bg.lightgray} .sc-btn .svg-path { ${cs.fill.dark} } .sc-combo .cb-sel { ${cs.border.darkgray} ${cs.bg.grayhover} } }
    &.dark { ${cs.bg.dark} .sc-btn .svg-path { ${cs.fill.white} } .sc-combo .cb-sel { ${cs.border.dark} ${cs.bg.darkhover} } }
    &.black { ${cs.bg.black} .sc-btn .svg-path { ${cs.fill.white} } .sc-combo .cb-sel { ${cs.border.black} ${cs.bg.dark} } }

    &.theme-sky { ${cs.bg.sky} .sc-btn .svg-path { ${cs.fill.dark} } .sc-combo .cb-sel { ${cs.border.lightgray} ${cs.bg.sky} } }
    &.theme-primary { ${cs.bg.primary} .sc-btn .svg-path { ${cs.fill.white} } .sc-combo .cb-sel { ${cs.border.primary} ${cs.bg.primaryhover} } }
    &.theme-gray { ${cs.bg.lightgray} .sc-btn .svg-path { ${cs.fill.dark} } .sc-combo .cb-sel { ${cs.border.darkgray} ${cs.bg.grayhover} } }
    &.theme-dark { ${cs.bg.dark} .sc-btn .svg-path { ${cs.fill.white} } .sc-combo .cb-sel { ${cs.border.dark} ${cs.bg.darkhover} } }
    &.theme-black { ${cs.bg.black} .sc-btn .svg-path { ${cs.fill.white} } .sc-combo .cb-sel { ${cs.border.black} ${cs.bg.dark} } }
  }
}`;

// export default class Search extends React.PureComponent {
//   constructor(props) {
//     super(props);
//     const key = props.searchkey ? props.searchkey : props.list ? props.list[0].id : '';
//     this.state = { value: props.value || '', list: props.list || null, key: key };
//   }

//   onClicked = (e) => {
//     this.props.onClick && this.props.onClick(this.state.value, this.state.key, e);
//   }

//   onEnter = (e) => {
//     this.props.onClick && this.props.onClick(this.state.value, this.state.key, e);
//   }

//   onChange = (value, e) => {
//     this.setState({ value: value });
//     this.props.onChange && this.props.onChange(this.state.value, this.state.key, e);
//   }

//   onClickCombo = (eid, e, value) => {
//     // const { props } = this;
//     // props.onChange && props.onChange();
//     this.setState({ key: value.id });
//   }

//   render() {
//     const { state, props } = this;
//     const { frameid = 'body', className, theme, color } = props;
//     const { list } = state;
//     // const combo = 120;
//     // const edit = list ? `calc(100% - ${combo + 25}px)` : 'calc(100% - 35px)';
//     const pos = list ? list.findIndex(item => item.id === state.key) : 0;
//     // const innercs = className.replace('border', '');

//     return (
//       <StyledObject className={cx("search-box md", className, color, theme && `theme-${theme}`)} >
//         {list && <Combobox className={cx("sc-combo sky md", color)}
//           pos={pos} frameid={frameid} theme={theme}
//           list={list} onClick={this.onClickCombo} inline={true} />
//         }
//         <Editbox type="text" className={cx("sc-in", color, list && 'combo')}
//           guide={props.guide} value={state.value} theme={theme}
//           onEnter={this.onEnter} onChange={this.onChange} onClear={this.props.onClear} />
//         <Svg className={cx("sc-btn", color)} color={'black'} onClick={this.onClicked} icon={'find'} />
//       </StyledObject>
//     )
//   }
// }


const Search = (props) => {
  const [value, setValue] = useState(props.value || '');
  // const [list, setList] = useState(props.list || null);
  const [key, setKey] = useState(props.searchkey ? props.searchkey : props.list ? props.list[0].id : '');

  useEffect(() => {
    setKey(props.searchkey);
    return () => { }
  }, [props.searchkey]);

  const onClicked = (e) => {
    props.onClick && props.onClick(value, key, e);
  }

  const onEnter = (e) => {
    props.onClick && props.onClick(value, key, e);
  }

  const onChange = (v, e) => {
    setValue(v);
    props.onChange && props.onChange(v, key, e);
  }

  const onClickCombo = (eid, e, v) => {
    setKey(v.id);
  }

  const { frameid = 'body', className, theme, color } = props;
  const pos = props.list ? props.list.findIndex(item => item.id === key) : 0;

  return (
    <StyledObject className={cx("search-box md", className, color, theme && `theme-${theme}`)} >
      {props.list && <Combobox className={cx("sc-combo sky md", color)}
        pos={pos} frameid={frameid} theme={theme}
        list={props.list} onClick={onClickCombo} inline={true} />
      }
      <Editbox type="text" className={cx("sc-in", color, props.list && 'combo')}
        guide={props.guide} value={value} theme={theme}
        onEnter={onEnter} onChange={onChange} onClear={props.onClear} />
      <Svg className={cx("sc-btn", color)} color={'black'} onClick={onClicked} icon={'find'} />
    </StyledObject>
  )
}

export default Search;

const StyledFrame = styled.div`{
  &.search-frame { ${cs.min.height(30)}
    // .btn-dumy { ${cs.h.get(30)} ${cs.disp.inblock} ${cs.disp.hidden} }
    .search-box { ${cs.w.half} ${cs.disp.inblock} & + .btn-dumy { ${cs.disp.none} } }
    .btn-new { ${cs.pos.rtop} ${cs.pos.absolute} ${cs.z.front} ${cs.w.get(70)} }
  }
}`

export const SearchFrame = (props) => {
  const onClickNew = (eid, e) => {
    props.onClickNew && props.onClickNew(e);
  }

  const onClickSearch = (value, key, e) => {
    props.onClickSearch && props.onClickSearch(value, key, e);
  }

  if (!props.onClickNew && !props.onClickSearch) {
    return null;
  } else {
    return <StyledFrame className={cx("search-frame", props.className)}>
      {props.onClickSearch && <Search guide={ST.SEARCH} onClick={onClickSearch}
        className={cx("search", props.className)} list={props.searchs} searchkey={props.searchkey} />}
      {props.onClickNew && <Button className={"btn-new green md"} title={ST.ADD} onClick={onClickNew} eid={EID.NEW} />}
    </StyledFrame>
  }
}