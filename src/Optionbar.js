import React from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import { Button, Svg, cs } from './index';

const StyledObject = styled.div`{
  &.option-bar {
    ${cs.h.get('100vh')} ${cs.pos.fixed} ${cs.pos.rtop} ${cs.bg.dark} ${cs.z.top}
    // ${cs.opac.invisible}

    .ob-box {
      ${({ width }) => cs.w.get(width)} ${cs.p.a2} display: none;
      .ob-header { ${cs.min.height(40)} ${cs.border.bottom} ${cs.border.alphagray}
        .opt-tl { ${cs.disp.block} ${cs.font.md} ${cs.font.thickbold} ${cs.font.center} ${cs.p.a10} }
      }

      .ob-frame {
        overflow: auto; width: 100%; height: 100vh; padding-bottom: 40px;
      }

      .ob-body { min-height: 200px; }
      .ob-footer { min-height: 100px; padding-right: 20px; padding-top: 10px; }
    }
    
    &.slidein { ${ ({time}) => cs.anim.slidein(time, '100%', '0')}; .ob-box { display: block; } };
    &.slideout { ${ ({time}) => cs.anim.slideout(time, '0', '100%')}; };

    @media screen and (max-width : 1280px) {
    }

    @media screen and (max-width : 1080px) {
    }

    @media screen and (max-width : 860px) {
      width: 100%;
    }
  }

  // @keyframes open-in {
  //   from { opacity: 0.5; transform: translateX(100%); }
  //   to { opacity: 1; display: block; transform: translateX(0%); } 
  // }

  // @keyframes open-out {
  //   from { opacity: 1; transform: transform: translateX(0%); }
  //   to { opacity: 0.5; display: none; transform: translateX(100%); }
  // }
}`;

export default class Optionbar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.interval = '200ms';
    this.object = null;
    this.state = { modefied: false, children: props.children, show: props.show || false };
  }

  onClicked = (eid, e) => {
    const value = this.object.getData();
    this.props.onClick && this.props.onClick(eid, value, e);
  }

  onChanged = (eid, e) => {
    this.setState({ modefied: true });
    this.props.onChanged && this.props.onChanged();
  }

  onClickButton = (eid, e) => {
    this.setState({ show: !this.state.show });
    this.props.onClick && this.props.onClick('close', null, e);
  }

  onAnimEnd = (e) => {
    // if (this.state.show) {
    //   this.setState({ show: false });
    // }
  }

  render() {
    const { state, props, interval } = this;
    const { onClicked } = this;
    const { width = 600, theme, className, title = "Option Bar" } = props;
    const { modefied, show } = state;
    const fade = { time: interval };
    const Component = state.children;
    const { border, label } = props.options || { border: null, label: null };
    const cancel = (label && label.cancel) || 'cancel';
    const save = (label && label.save) || 'save';

    return (
      <StyledObject className={cx("option-bar", className, theme && `theme-${theme}`, show ? 'slidein' : 'slideout')}
        {...fade} width={width} border={border} label={label} onAnimationEnd={this.onAnimEnd}>
        <CloseButton onClick={this.onClickButton} show={show} />
        {<div className={'ob-box'}>
          <div className="ob-header">
            <span className="opt-tl">{title}</span>
          </div>

          <div className="ob-frame scrollbar-3">
            <div className="ob-body">
              {Component && <Component ref={ref => this.object = ref} {...props} onChanged={this.onChanged} />}
              {!Component && <p className="no-child">The child component does not exist.</p>}
            </div>

            <div className="ob-footer">
              <Button className={cx("gray right")} onClick={onClicked} title={cancel} eid={'cancel'} />
              <Button className={cx("save-next mR20 red right")} onClick={onClicked} title={save} eid={'save'} disabled={!modefied} />
            </div>
          </div>
        </div>}
      </StyledObject >
    )
  };
};

const StyledButton = styled.div`{
  &.close-btn { 
    ${cs.bg.alphablack} ${cs.border.radius('5px 0 0 5px')} ${cs.box.line} ${cs.box.inner}
    ${cs.w.get(10)} ${cs.left(-10)}

    .svg-icon { ${cs.opac.show} ${cs.w.get(6)} }

    &.left { ${cs.align.ycenter} ${cs.h.get(60)} }
    &.right { }
    &.top { } 
    &.bottom { }

    &:hover { ${cs.w.get(30)} ${cs.left(-30)} .svg-icon { ${cs.opac.show} ${cs.w.get(20)} } }
  }
}`;

const CloseButton = (props) => {
  const onClicked = (eid, e) => {
    props.onClick && props.onClick(eid, e);
  }

  const { className, theme, align = 'left', show = false } = props;

  return (
    <StyledButton className={cx("close-btn", className, align, theme && `theme-${theme}`)}>
      <Svg className="md center middle" name={show ? "right" : "left"} onClick={onClicked} eid={'cancel'} color={'white'} />
    </StyledButton>
  );
};