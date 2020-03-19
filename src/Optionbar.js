import React from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import { Button, Svg, cs, CloseButton } from './index';

const StyledObject = styled.div`{
  &.option-bar {
    ${cs.h.get('100vh')} ${cs.pos.fixed} ${cs.pos.rtop} ${cs.z.top} 
    ${cs.border.left} ${cs.border.lightgray}

    .ob-box {
      ${({ width }) => cs.w.get(width)} ${cs.p.a2} display: none;
      .ob-header { ${cs.min.height(40)} ${cs.border.bottom} ${cs.border.alphagray}
        .opt-tl { ${cs.disp.block} ${cs.font.md} ${cs.font.thickbold} ${cs.font.center} ${cs.p.a10} }
      }

      .ob-frame {
        ${cs.over.auto} ${cs.w.full} ${cs.h.get('100vh')} ${cs.p.b40}
        .ob-body { 
          min-height: 200px; ${cs.p.h10} 
          .no-child { ${cs.opac.alpha} ${cs.align.center} ${cs.w.full} ${cs.font.center} }
        }
        .ob-footer { 
          ${cs.align.bottom} ${cs.min.height(60)} ${cs.p.r20} 
          ${cs.p.t10} ${cs.w.full} ${cs.font.right}
  
          .button { ${cs.m.r20} }
        }        
      }
    }
    
    &.slidein { ${ ({ time }) => cs.anim.slidein(time, '100%', '0')}; .ob-box { display: block; } };
    &.slideout { ${ ({ time }) => cs.anim.slideout(time, '0', '100%')}; };
    
    &.md { .ob-box { ${cs.w.get(600)} } }
    &.lg { .ob-box { ${cs.w.get(800)} } }
    &.sm { .ob-box { ${cs.w.get(300)} } }

    &.white { ${cs.bg.get('#fdfdfd')} ${cs.font.dark} }
    &.sky { ${cs.bg.sky} ${cs.font.dark} }
    &.orange { ${cs.bg.orange} ${cs.font.white} .ob-header { ${cs.border.lightgray} } }
    &.green { ${cs.bg.green} ${cs.font.white} .ob-header { ${cs.border.lightgray} } }
    &.red { ${cs.bg.red} ${cs.font.white} .ob-header { ${cs.border.lightgray} } }
    &.gray { ${cs.bg.gray} ${cs.font.dark} .ob-header { ${cs.border.lightgray} } }
    &.primary { ${cs.bg.primary} ${cs.font.white} .ob-header { ${cs.border.lightgray} } }
    &.dark { ${cs.bg.dark} ${cs.font.white} }
    &.black { ${cs.bg.black} ${cs.font.white} }

    &.theme-sky { ${cs.bg.sky} ${cs.font.dark} }
    &.theme-gray { ${cs.bg.gray} ${cs.font.dark} .ob-header { ${cs.border.lightgray} } }
    &.theme-primary { ${cs.bg.primary} ${cs.font.white} .ob-header { ${cs.border.lightgray} } }
    &.theme-dark { ${cs.bg.dark} ${cs.font.white} }
    &.theme-black { ${cs.bg.black} ${cs.font.white} }
    
    .ob-box .ob-header .opt-tl {
      ${({ font }) => font && font.color && cs.font.color(font.color)}
      ${({ font }) => font && font.align && cs.font.align(font.align)}
      ${({ font }) => font && font.size && cs.font.size(font.size)}
    }

    @media screen and (max-width : 1280px) {
    }

    @media screen and (max-width : 1080px) {
    }

    @media screen and (max-width : 860px) {
      width: 100%;
    }
  }
}`;

export default class Optionbar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.interval = '200ms';
    this.object = {};
    this.state = { modefied: false, children: props.children, show: props.show || false };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // this.setState({modefied : false});
  }

  onClicked = (eid, e) => {
    const { object } = this;
    const value = object ? object.getData && object.getData() : null;
    this.setState({ show: !this.state.show, modefied: false });
    this.props.onClick && this.props.onClick(eid, value, e);
  }

  onChange = (eid, e) => {
    this.setState({ modefied: true });
    this.props.onChange && this.props.onChange();
  }

  onClickButton = (eid, e) => {
    const { show } = this.state;
    this.props.onClick && this.props.onClick(!show ? 'open' : 'close', null, e);
    this.setState({ show: !show, modefied: false });
    // this.props.onClick && this.props.onClick('close', null, e);
  }

  onAnimEnd = (e) => {
    // if (this.state.show) {
    //   this.setState({ show: false });
    // }
  }

  render() {
    const { state, props, interval } = this;
    const { onClicked } = this;
    const { width = 600, theme, className } = props;
    const { modefied, show } = state;
    const fade = { time: interval };
    const Component = state.children;
    const { title, label } = props.options || { title: null, label: null };
    const cancel = (label && label.cancel) || 'cancel';
    const save = (label && label.save) || 'save';

    return (
      <StyledObject className={cx("option-bar white", className, theme && `theme-${theme}`, show ? 'slidein' : 'slideout')}
        {...fade} width={width} font={title} onAnimationEnd={this.onAnimEnd}>
        <CloseButton className={className} theme={theme} onClick={this.onClickButton} show={show} />
        {<div className={'ob-box'}>
          <div className="ob-header">
            <span className="opt-tl">{props.title || "Option Bar"}</span>
          </div>

          <div className="ob-frame scrollbar-3">
            <div className="ob-body">
              {Component && <Component refs={this.object} {...props} onChange={this.onChange} />}
              {!Component && <p className="no-child">The child component does not exist.</p>}
            </div>

            <div className="ob-footer">
              <Button className={cx("ob-save gd-gray")} onClick={onClicked} title={save} eid={'save'} disabled={!modefied} />
              <Button className={cx("ob-cancel gd-gray")} onClick={onClicked} title={cancel} eid={'cancel'} />
            </div>
          </div>
        </div>}
      </StyledObject >
    )
  };
};