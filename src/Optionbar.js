import React from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import { Button, Svg } from './index';
import { EID, ST } from './Config';

const StyledObject = styled.div`{
  &.option-bar {
    height: 100vh; position: fixed; width: 600px; top: 0; right: 0; background: rgb(88, 86, 86); z-index: 99999; padding: 2px; opacity: 0;

    .option-header { min-height: 60px; 
      .opt-tl { display: block; font-size: 16px; font-weight: 500; padding: 20px; text-align: center; }
      .btn-close { position: absolute; right: 10px; top: 20px; }
    }

    .option-frame {
      overflow: auto; width: 100%; height: 100vh; padding-bottom: 40px;
    }

    .option-body { min-height: 200px; }
    .option-footer { min-height: 100px; padding-right: 20px; padding-top: 10px; }
    
    &.slidein { animation: open-in linear 1 forwards ${ (fade) => fade.time}; };
    &.slideout { animation: open-out linear 1 forwards ${ (fade) => fade.time}; };

    @media screen and (max-width : 1280px) {
    }

    @media screen and (max-width : 1080px) {
    }

    @media screen and (max-width : 860px) {
      width: 100%;
    }
  }

  @keyframes open-in {
    from { opacity: 0.5; transform: translateX(100%); }
    to { opacity: 1; display: block; transform: translateX(0%); } 
  }

  @keyframes open-out {
    from { opacity: 1; transform: transform: translateX(0%); }
    to { opacity: 0.5; display: none; transform: translateX(100%); }
  }
}`;

class Optionbar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.interval = '200ms';
    this.object = null;
    this.state = { title: props.title, modefied: false, children: props.children };
  }

  onClicked = (eid, e) => {
    const value = this.object.getData();
    this.props.onClick && this.props.onClick(eid, value, e);
  }

  onChanged = (eid, e) => {
    this.setState({ modefied: true });
    this.props.onChanged && this.props.onChanged();
  }

  render() {
    const { state, props, interval } = this;
    const { onClicked } = this;
    const fade = { time: interval };
    const Component = state.children;

    return (
      <StyledObject className={cx("option-bar slidein")} {...fade}>
        <div className="option-header">
          <span className="opt-tl">{state.title}</span>
          <Svg className="btn-close sm" name={"close"} onClick={this.onClicked} eid={EID.CANCEL} color={props.color} />
        </div>

        <div className="option-frame scrollbar-3">
          <div className="option-body">
            {Component && <Component ref={ref => this.object = ref} {...props} onChanged={this.onChanged} />}
            {!Component && <p className="no-child">The child component does not exist.</p>}
          </div>

          <div className="option-footer">
            <Button className={cx("gray right")} onClick={onClicked} title={ST.CANCEL} eid={EID.CANCEL} />
            <Button className={cx("save-next mR20 red right")} onClick={onClicked} title={ST.SAVE} eid={EID.SAVE} disabled={!state.modefied} />
          </div>
        </div>
      </StyledObject >
    )
  };
};

export default Optionbar;