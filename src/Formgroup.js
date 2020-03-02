import React from 'react';
import cx from 'classnames/bind';
import styled from 'styled-components';
import { Util, } from './index';

const StyledObject = styled.div`{
  &.form-grp { width: 100%; 
    .row { margin: 0; padding: 0; width: 100%; display: flex; justify-content: space-between;
      .col { 
        flex-direction: column; min-width: 0; width: auto; flex: 1 1 200px; margin: 5px 0; margin-right: 10px; 
        width: ${(props) => props.width}; height: ${(props) => props.height}; min-width: ${(props) => props.minWidth};
      }
      .col:last-child { margin-right: 0; }
      ${(props) => props.justify && `justify-content: ${props.justify}`};
    }

    &.inline { 
      .row { 
        .col { margin: 0; margin: 5px;
          ${(props) => props.flex && `flex: ${props.flex}`};
        }
        // .col:last-child { margin-right: 0; }
      }
    }

    &.vertical { display: inline-block; }

    &.flexwrap {
      .row { 
        flex-flow: wrap;
      }
    }

    &.right {
      text-align: right;
    }

    &.anim { animation: ${({ anim }) => anim && anim.type ? anim.type : "fadein"} ${({ anim }) => anim && anim.time ? anim.time : "0.3s"}; }

    @media screen and (max-width : 1280px) {
    }
  
    @media screen and (max-width : 1024px) {
      .row .col { margin: 5px; }
    }
  
    @media screen and (max-width : 860px) {
      .row .col { margin: 2px; }

      &.inline { 
        .row { display: block;
          .col { margin: 10px 0; width: auto; }
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

  componentDidMount() {
  }

  onAnimEnd = (e) => {
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

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.list) {
      this.setState({ selected: nextProps.selected, list: nextProps.list });

      (Util.isEmpty(nextProps.selected) || nextProps.selected < 1) && this.setState({ anim: nextProps.anim });
    }
  }

  render() {
    const { state, props } = this;
    const { child, inline, children, flexwrap, disable } = props;
    const { list, selected, anim } = state;
    const Child = child;

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
          return <div className={cx("col", type, name)} key={index} style={styled}>{item}</div>
        });
      } else {
        return <div className="col">{children}</div>
      }
    }

    return (
      <StyledObject className={cx('form-grp', props.className, { inline }, { flexwrap }, (anim && "anim"), { disable })} {...props.options}
        {...props.style} anim={state.anim} onAnimationEnd={this.onAnimEnd}>
        <div className="row">
          {children && renderChildren()}
          {props.list && list.map((item, index) =>
            <div className="col" key={index}>
              <Child {...item} onClicked={this.props.onSelected ? this.onSelected : null} active={item.id === selected} full={true} disable={disable} />
            </div>)
          }
        </div>
      </StyledObject>
    );
  };
};
