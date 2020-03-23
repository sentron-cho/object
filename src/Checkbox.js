import React from 'react';
import cx from 'classnames/bind';
import styled from 'styled-components';
import { Svg, cs } from './index';

const StyledObject = styled.div` {
  &.chk-box { ${cs.w.fit} ${cs.disp.inblock}
    ul, li { list-style: none; ${cs.m.a0} ${cs.p.a0} }

    .chk-group {
      ${cs.disp.inblock} ${cs.w.auto}

      .chk-itm { 
        ${cs.max.width('100%')} ${cs.p.v5} ${cs.disp.inblock} ${cs.m.r5}
        .chk-icon { ${cs.float.left} ${cs.m.r5} }

        &:hover { ${cs.mouse.pointer} ${cs.opac.get(0.8)} }
      }

    }

    .chk-guide { 
      ${cs.font.xs} ${cs.font.darkgray} ${cs.disp.block} 
      ${cs.p.l15} ${cs.m.get(-3)} ${cs.m.b5} 
    }

    .chk-label, .chk-txt { ${cs.disp.inblock} ${cs.p.r5} }

    .no-data { ${cs.font.red} }

    &.md { ${cs.font.md} .chk-txt, .chk-label { ${cs.font.md} ${cs.font.line(16)} } .chk-icon { ${cs.icon.sm} } }
    &.xl { ${cs.font.xl} .chk-txt, .chk-label { ${cs.font.xxl} ${cs.font.line(26)}  } .chk-icon { ${cs.icon.md} } }
    &.lg { ${cs.font.lg} .chk-txt, .chk-label { ${cs.font.xl} ${cs.font.line(16)}  } .chk-icon { ${cs.w.get(20)} ${cs.h.get(20)} } }
    &.sm { ${cs.font.sm} .chk-txt, .chk-label { ${cs.font.sm} ${cs.font.line(14)}  } .chk-icon { ${cs.icon.xs} ${cs.m.t1} } }
    &.xs { ${cs.font.xs} .chk-txt, .chk-label { ${cs.font.xs} ${cs.font.line(12)}  } .chk-icon { ${cs.icon.xxs} ${cs.m.t1} } }
  
    &:not(.border) {
      &.white { ${cs.bg.white} ${cs.font.dark} .svg-path { ${cs.fill.dark} } }
      &.green { ${cs.bg.green} }
      &.primary { ${cs.bg.primary} ${cs.font.lightwhite} .svg-path { ${cs.fill.white} } }
      &.red { ${cs.bg.red} ${cs.font.lightwhite} .svg-path { ${cs.fill.white} } }
      &.gray { ${cs.bg.gray} .svg-path { ${cs.fill.white} } }
      &.dark { ${cs.bg.dark} ${cs.font.lightwhite} .svg-path { ${cs.fill.white} } }
      &.black { ${cs.bg.black} ${cs.font.lightwhite} .svg-path { ${cs.fill.white} } }

      &.theme-sky { ${cs.bg.sky} ${cs.font.dark} .svg-path { ${cs.fill.dark} } }
      &.theme-primary { ${cs.bg.primary} ${cs.font.lightwhite} .svg-path { ${cs.fill.white} } }
      &.theme-gray { ${cs.bg.gray} .svg-path { ${cs.fill.white} } }
      &.theme-dark { ${cs.bg.dark} ${cs.font.lightwhite} .svg-path { ${cs.fill.white} } }
      &.theme-black { ${cs.bg.black} ${cs.font.lightwhite} .svg-path { ${cs.fill.white} } }      
    }

    &.border { 
      ${cs.box.line} ${cs.box.inner}

      &.white { ${cs.border.white} }
      &.green { ${cs.border.green} }
      &.primary { ${cs.border.primary} }
      &.red { ${cs.border.red} }
      &.gray { ${cs.border.gray} }
      &.dark { ${cs.border.dark} }
      &.black { ${cs.border.black} }
    }
    
    &.radius { ${cs.box.radius} }
    &.round { ${cs.border.radius('100px')} }
    &.full { ${cs.w.full} }

    ${({ border }) => border && cs.box.line}
    ${({ border }) => border && border.color && cs.border.color(border.color)}
    ${({ border }) => border && border.radius && cs.border.radius(border.radius)}
    ${({ border }) => border && border.width && cs.border.width(border.width)}

    ${({ bgcolor }) => bgcolor && cs.bg.color(bgcolor + '!important')}
  
    @media screen and (max-width : 860px) {
      ${cs.font.sm}
      .chk-itm { div { ${cs.m.r5} .chk-txt { ${cs.m.l2} } } }
    }
  }
}`;

export default class Checkbox extends React.PureComponent {
  constructor(props) {
    super(props);
    const list = props.list && props.value ? props.list.map(item => {
      item.check = (item.id === props.value);
      return item;
    }) : props.list;

    this.state = { list: list || null, noti: false, modified: false };
  }

  isValidate = () => {
    if (this.isEmpty()) {
      return this.showNoti();
    }

    return true;
  };

  isModified = () => (this.state.modified);

  isEmpty = () => {
    if (this.props.radio) {
      const items = this.state.list.filter(item => item.check === true && item);
      return !items || items.length < 1;
    } else {
      return false;
    }
  }

  getValue = () => {
    const items = this.state.list.filter(item => item.check === true && item);
    const array = items.map(item => item.id);
    if (this.state.list.length === 1) {
      return items.length === 1;
    }
    return this.isEmpty() ? null : this.props.radio ? array[0] : array;
  }

  showNoti = (value) => {
    return false;
  }

  onClickItem = (e) => {
    let eid = e.currentTarget.getAttribute('eid');
    const array = [...this.state.list];
    const { radio } = this.props;

    if (radio) {
      array.map(item => item.check = item.id.toString() !== eid ? false : true);
    } else {
      array.map(item => item.check = item.id.toString() === eid ? !item.check : item.check);
    }

    this.setState({ list: array, modified: true });

    this.props.onClick && this.props.onClick(eid, e, array);

    const value = this.state.list.find(o => String(o.id) === String(eid));
    this.props.onChange && this.props.onChange(value);
  }

  render() {
    const { label, guide } = this.props;
    const { list } = this.state;
    const { radio, theme = '', type = '', border, bgcolor, className } = this.props;

    return (
      <StyledObject className={cx('chk-box md', className, { radio }, { type }, theme && `theme-${theme}`)} border={border} bgcolor={bgcolor} >
        {label && <div className="chk-label">{label}</div>}
        <ul className={'chk-group'}>
          {list ? list.map((item, index) => {
            const icon = radio ? item.check ? 'radio' : 'unradio' : item.check ? 'check' : 'uncheck';
            return <li key={index} className="chk-itm" onClick={this.onClickItem} eid={item.id}>
              {<React.Fragment><Svg className="chk-icon" name={icon} /> <span className="chk-txt">{item.name}</span></React.Fragment>}
            </li>;
          }) : <span className={'no-data'}>no list</span>}
        </ul>
        {guide && <div className="chk-guide">{guide}</div>}
      </StyledObject>
    );
  }
}
