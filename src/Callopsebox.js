import React from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';

const StyledObject = styled.div`{
  &.callopse-box { position: relative; border: 1px solid rgba(0, 0, 0, 0.2); border-radius: 3px;
    background: ${ (props) => props.bgcolor};

    .cls-title {
      padding: 10px; cursor: pointer;
      &:hover { background: rgba(0, 0, 0, 0.2); }
    }

    .cls-frame { width: 100%; position: relative; font-size: 14px; 
      visibility: hidden; height: 0; min-height: 0; padding: 0;
      border-top: 1px solid rgba(0, 0, 0, 0.2);
    }

    &.active {
      .cls-title {
        background: rgba(0, 0, 0, 0.2);
      }
      .cls-frame {
        background: rgba(0, 0, 0, 0.2);
        animation: callopse-in ease-out 1 forwards ${ (fade) => fade.time};
      }
    }

    @media screen and (max-width : 1280px) {
    }

    @media screen and (max-width : 1024px) {
    }

    @media screen and (max-width : 860px) {
      padding: 0; font-size: 12px;
    }

    @keyframes callopse-in {
      0% { opacity: 0; height: 0; visibility: hidden; }
      50% { opacity: 0; height: fit-content; padding: 10px; visibility: hidden; }
      100% { opacity: 1; height: fit-content; padding: 10px; visibility: visible; } 
    }
  }
}`;

class Callopsebox extends React.PureComponent {
  constructor(props) {
    super(props);
    this.interval = '200ms';
    this.state = { active: props.active };
  }

  onClicked = (e) => {
    // const rowid = e.currentTarget.getAttribute("rowid");
    // this.setState({ active: !this.state.active });
    (this.props.onClick != null) && this.props.onClick(this.props.label, this.props.rowid, e);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({ active: nextProps.active });
  }

  render() {
    const { props, state, interval } = this;
    const fade = { time: interval };
    const align = props.align;
    const active = state.active;
    const minHeight = props.minHeight ? props.minHeight : '100px';

    return (
      <StyledObject className={cx('callopse-box', props.className, { active })} align={align} minHeight={minHeight} {...fade} bgcolor={props.bgcolor}>
        <div className="cls-title" onClick={this.onClicked}>{props.label}</div>
        <div className="cls-frame">
          {props.children}
        </div>
      </StyledObject >
    );
  }
}

export default Callopsebox;