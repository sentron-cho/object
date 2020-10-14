import React from 'react';
import cx from 'classnames/bind';
import styled from 'styled-components';
import { Util, Guidebox, cs } from './index';

const StyledObject = styled.div`{
  &.form-grp { 
    ${cs.w.full} ${cs.box.inner} ${cs.over.hidden}
    .fg-row { 
      ${cs.m.a0} ${cs.p.a0} ${cs.w.full} ${cs.disp.get("flex")}
      .fg-col { 
        ${cs.w.auto} ${cs.disp.flex("1 1 200px; flex-direction: column;")}
        ${cs.m.r10} ${cs.min.width(0)} //${cs.m.v5}
        ${({ width }) => width && cs.w.get(width)} 
        ${({ height }) => height && cs.h.get(height)} 
        ${({ minWidth }) => minWidth && cs.min.width(minWidth)}
      }
      .fg-col:last-child { ${cs.m.r0} }
      ${(props) => props.justify && `justify-content: ${props.justify}`};
    }

    &.inline { 
      .fg-row { 
        .fg-col { ${cs.m.a5}
          ${(props) => props.flex && `flex: ${props.flex}`};
        }

        .fg-col:first-child { ${cs.m.l0} }
        .fg-col:last-child { ${cs.m.r0} }
      }
    }

    &.vertical { ${cs.disp.inblock} }

    &.flexwrap {
      .fg-row { 
        flex-flow: wrap;
      }
    }

    &.right {
      ${cs.font.right}
    }

    &.anim { 
      ${(props) => (props.anim && props.anim.type) && cs.anim[props.anim.type](props.anim.time || "0.2s")}
    }

    &.sky { ${cs.p.a10} ${cs.w.calc("100% - 20px")} ${cs.bg.sky} }
    &.primary { ${cs.p.a10} ${cs.w.calc("100% - 20px")} ${cs.bg.primary} }
    &.gray { ${cs.p.a10} ${cs.w.calc("100% - 20px")} ${cs.bg.gray} }
    &.dark { ${cs.p.a10} ${cs.w.calc("100% - 20px")} ${cs.bg.dark} }
    &.black { ${cs.p.a10} ${cs.w.calc("100% - 20px")} ${cs.bg.black} }

    &.theme-sky { ${cs.p.a10} ${cs.w.calc("100% - 20px")} ${cs.bg.sky} }
    &.theme-primary { ${cs.p.a10} ${cs.w.calc("100% - 20px")} ${cs.bg.primary} }
    &.theme-gray { ${cs.p.a10} ${cs.w.calc("100% - 20px")} ${cs.bg.gray} }
    &.theme-dark { ${cs.p.a10} ${cs.w.calc("100% - 20px")} ${cs.bg.dark} }
    &.theme-black { ${cs.p.a10} ${cs.w.calc("100% - 20px")} ${cs.bg.black} }

    &.radius { ${cs.box.radius} }
    &.border { ${cs.box.line} }

    ${({ border }) => border && `${cs.box.line}`}
    ${({ border }) => border && border.color && `${cs.border.color(border.color)}`}
    ${({ border }) => border && border.radius && `${cs.border.radius(border.radius)}`}
    ${({ border }) => border && border.width && `${cs.border.width(border.width)}`}
    ${({ border }) => border && border.padding && `${cs.p.get(border.padding)}`}

    ${({ bgcolor }) => bgcolor && `${cs.p.a10} ${cs.w.calc("100% - 20px")} ${cs.bg.color(bgcolor)}`}

    @media screen and (max-width : 1280px) { }
  
    @media screen and (max-width : 1024px) {
      .fg-row .fg-col { margin: 5px; }
    }
  
    @media screen and (max-width : 860px) {
      .fg-row .fg-col { margin: 2px; }

      &.inline { 
        .fg-row { display: block;
          .fg-col { margin: 10px 0; width: auto; }
        }
      }
    }
  }
}`;

export default class Formgroup extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { selected: null, list: null };
    if (props.list) {
      this.state = { selected: props.selected, list: props.list, modified: false, anim: props.anim };
    }
  }

  isValidate = () => {
    if (this.props.validate != null && this.props.validate === false) return true;
    if (this.isEmpty()) { return this.showNoti(); }
    return true;
  };

  isModified = () => (this.state.modified);

  isEmpty = () => {
    const items = this.getChecked();
    return items == null || items.length < 1;
  }

  getValue = () => {
    return this.isEmpty() ? null : this.getChecked().id;
  }

  getChecked = () => {
    return this.state.list.find(item => item.check === true && item);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.anim != null) {
      this.setState({ anim: nextProps.anim });
    }

    if (nextProps.list) {
      this.setState({ selected: nextProps.selected, list: nextProps.list });
      (Util.isEmpty(nextProps.selected) || nextProps.selected < 1) && this.setState({ anim: nextProps.anim });
    }
  }

  // onAnimEnd = (e) => {
  //   this.setState({ anim: '' });
  // }

  onAnimStart = (e) => {
    this.props.onAnimation && this.props.onAnimation('start', e);
  }

  onAnimEnd = (e) => {
    this.props.onAnimation && this.props.onAnimation('end', e);
    this.setState({ anim: '' });
  }

  onSelected = (name, e) => {
    if (this.props.disable) return;

    if (this.props.list) {
      let pos = 0;
      const item = this.state.list.find((item, index) => { pos = index; return item.name === name; });
      this.setState({ selected: item.id, modified: true });
      this.props.onSelected && this.props.onSelected(pos, e, item);
    }
  }

  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   if (nextProps.list) {
  //     this.setState({ selected: nextProps.selected, list: nextProps.list });

  //     (Util.isEmpty(nextProps.selected) || nextProps.selected < 1) && this.setState({ anim: nextProps.anim });
  //   }
  // }

  render() {
    const { state, props } = this;
    const { child, inline, children, flexwrap, disable, theme } = props;
    const { config = { child: null } } = props;
    const { list, selected, anim } = state;

    const renderGuide = () => {
      let guide = null;
      if (!child && !children) {
        guide = "One of both 'children' and 'child' must be in props.\n"
          + "ex. <Formgroup child={<div>child</div>} .../> or <Formgroup><div>children</div></Formgroup>";
      }

      if (guide) {
        return <Guidebox text={guide} />
      }
    }

    const renderChildren = () => {
      if (inline && children.length > 0) {

        // 자식 컨텐츠가 리스트의 형식일 경우
        const isarray = children.find((item) => Array.isArray(item));
        let list = children;
        if (isarray) {
          list = [];
          children.map(item => {
            const is = Array.isArray(item);
            list = is ? [...list, ...item] : [...list, item];
            return list;
          })
        }

        return list.map((item, index) => {
          const { flex, name } = item.props;
          const styled = { "flex": flex };
          const type = item.type.name ? item.type.name.toLowerCase() : item.type.toLowerCase();
          return <div className={cx("fg-col", type, name)} key={index} style={styled}>{item}</div>
        });
      } else {
        return <div className="fg-col">{children}</div>
      }
    }

    const Child = child;
    return (
      <StyledObject className={cx('form-grp', props.className, { inline }, { flexwrap }, (anim && "anim"), { disable }, theme && `theme-${theme}`)} 
        {...props.options} {...props.style} border={props.border} bgcolor={props.bgcolor}
        anim={state.anim} onAnimationEnd={this.onAnimEnd}>

        {renderGuide()}

        <div className="fg-row">
          {children && renderChildren()}

          {child && props.list && list.map((item, index) =>
            <div className="fg-col" key={index}>
              <Child {...item} {...config.child} active={item.id === selected} full={true} disable={disable}
                onClicked={this.props.onSelected ? this.onSelected : null} />
            </div>)
          }
        </div>
      </StyledObject>
    );
  };
};
