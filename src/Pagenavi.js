/* eslint-disable react/no-direct-mutation-state */
import React from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import { EID } from './Config';
import { Svg, Util, cs } from './index';

const StyledObject = styled.div`{
  &.page-navi {
    ${cs.font.dark} ${cs.h.get(60)} ${cs.w.full} ${cs.pos.relative} 
    ${cs.font.center} ${cs.disp.inblock}
    ${cs.noliststyle} ${cs.noselect}

    .pgn-frame {
      ${cs.h.get(40)} ${cs.w.fit} ${cs.box.inner} ${cs.p.a5} ${cs.p.h20}
      ${cs.m.left("auto")} ${cs.m.right("auto")}

      .pg-no {
        ${cs.mouse.pointer} ${cs.h.full} ${cs.w.get(36)} ${cs.border.radius(2)}
        ${cs.box.line} ${cs.border.trans} ${cs.disp.inblock} ${cs.m.h2} ${cs.opac.alpha}
        ${cs.font.md} ${cs.font.weight(600)} ${cs.pos.relative}

        &:hover { ${cs.border.primary} ${cs.opac.show} .svg-icon { ${cs.opac.show} } }
        &.active { ${cs.bg.primary} ${cs.font.white} ${cs.opac.show} }
        &.invisable { ${cs.disp.invisible} }
        
        span { ${cs.align.center} }
      }
    };

    &.sm { ${cs.h.get(40)} .pgn-frame { ${cs.h.get(30)} .pg-no { ${cs.w.get(24)} ${cs.m.h1} } } }
    &.md { ${cs.h.get(50)} .pgn-frame { ${cs.h.get(34)} .pg-no { ${cs.w.get(28)} ${cs.m.h2} } } }
    &.lg { ${cs.h.get(68)} .pgn-frame { ${cs.h.get(48)} .pg-no { ${cs.w.get(40)} ${cs.m.h3} } } }
    
    &.sky {
      .pg-no { &.active { ${cs.bg.sky} ${cs.font.dark} } &:hover { ${cs.border.sky} } .svg-icon { .svg-path { ${cs.fill.primary} } } } 
    }
    &.green {
      .pg-no { &.active { ${cs.bg.green} } &:hover { ${cs.border.green} } .svg-icon { .svg-path { ${cs.fill.green} } } } 
    }
    &.orange {
      .pg-no { &.active { ${cs.bg.orange} } &:hover { ${cs.border.orange} } .svg-icon { .svg-path { ${cs.fill.orange} } } } 
    }
    &.red {
      .pg-no { &.active { ${cs.bg.red} } &:hover { ${cs.border.red} } .svg-icon { .svg-path { ${cs.fill.red} } } } 
    }
    &.primary {
      .pg-no { &.active { ${cs.bg.primary} } &:hover { ${cs.border.primary} } .svg-icon { .svg-path { ${cs.fill.primary} } } } 
    }
    &.gray {
      .pg-no { &.active { ${cs.bg.gray} } &:hover { ${cs.border.darkgray} } .svg-icon { .svg-path { ${cs.fill.gray} } } } 
    }
    &.dark {
      .pg-no { &.active { ${cs.bg.dark} } &:hover { ${cs.border.dark} } .svg-icon { .svg-path { ${cs.fill.dark} } } } 
    }
    &.black {
      .pg-no { &.active { ${cs.bg.black} } &:hover { ${cs.border.black} } .svg-icon { .svg-path { ${cs.fill.black} } } } 
    }

    &.theme-sky {
      .pg-no { &.active { ${cs.bg.sky} ${cs.font.dark} } &:hover { ${cs.border.sky} } .svg-icon { .svg-path { ${cs.fill.primary} } } } 
    }
    &.theme-primary {
      .pg-no { &.active { ${cs.bg.primary} } &:hover { ${cs.border.primary} } .svg-icon { .svg-path { ${cs.fill.primary} } } } 
    }
    &.theme-gray {
      .pg-no { &.active { ${cs.bg.gray} } &:hover { ${cs.border.darkgray} } .svg-icon { .svg-path { ${cs.fill.gray} } } } 
    }
    &.theme-dark {
      .pg-no { &.active { ${cs.bg.dark} } &:hover { ${cs.border.dark} } .svg-icon { .svg-path { ${cs.fill.dark} } } } 
    }
    &.theme-black {
      .pg-no { &.active { ${cs.bg.black} } &:hover { ${cs.border.black} } .svg-icon { .svg-path { ${cs.fill.black} } } } 
    }

    &.border { .pgn-frame { ${cs.box.line} } }
    &.radius { .pgn-frame { ${cs.box.radius} } }
    
    &.left { .pgn-frame { ${cs.align.left} } }
    &.center { .pgn-frame { ${cs.align.xcenter} } }
    &.right { .pgn-frame { ${cs.align.right} } }

    &.s-mobile { ${cs.p.a0} .pgn-frame { ${cs.m.get("10px 0px")} } }

    &.s-tablet {  ${cs.p.a0} .pgn-frame { ${cs.m.get("10px 0px")} } }

    ${({ border }) => border && `.pgn-frame { ${cs.box.line} }`}
    ${({ border }) => border && border.color && `.pgn-frame { ${cs.border.color(border.color + " !important")} }`}
    ${({ border }) => border && border.radius && `.pgn-frame { ${cs.border.radius(border.radius + " !important")} }`}
    ${({ border }) => border && border.width && `.pgn-frame { ${cs.border.width(border.width + " !important")} }`}
    
    ${({ font }) => font && font.color && `.pgn-frame .pg-no { ${cs.font.color(font.color + " !important")} }`}
    ${({ font }) => font && font.size && `.pgn-frame .pg-no { ${cs.font.size(font.size + " !important")} }`}
    ${({ bgcolor }) => bgcolor && `.pgn-frame { ${cs.bg.color(bgcolor)} }`}

    ${({ button }) => button && button.color && `.pgn-frame .pg-no { ${cs.bg.color(button.color + " !important")} }`}
    ${({ button }) => button && button.hover && `.pgn-frame .pg-no:hover { ${cs.border.color(button.hover + " !important")} }`}
    ${({ button }) => button && button.active && `.pgn-frame .pg-no.active { ${cs.bg.color(button.active + " !important")} }`}
  }
}`;

class Pagenavi extends React.Component {

  constructor(props) {
    super(props);
    this.state = { type: 's-pc', pos: 1, max: 1, scp: 10 };
  }

  componentDidMount() {
    window.addEventListener('resize', this.checkScreen);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.pos) {
      this.setState({ pos: nextProps.pos });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkScreen);
  }

  checkScreen = () => {
    const { type } = Util.getScreenType();
    this.setState({ 'type': type });
  }

  getFirstPage = (pos, scp) => (Math.floor((pos - 1) / scp) * scp + 1);

  onClicked = (e) => {
    let eid = e.currentTarget.getAttribute('eid');
    const { pos, scp } = this.state;
    let first = this.getFirstPage(pos, scp);
    let page = pos;
    switch (eid) {
      case EID.PREV:
        page = first - scp;
        if (page < 1) {
          page = 1;
        }
        break;
      case EID.NEXT:
        page = first + scp;
        if (page >= this.max) {
          page = this.max;
        }
        break;
      default: page = e.currentTarget.textContent; break;
    }

    this.setState({ pos: page });

    this.props.onItemClick != null && this.props.onItemClick(page, e);
    this.props.onClick != null && this.props.onClick(page, e);
  }

  render() {
    const { className, max, border, font, bgcolor, button, theme } = this.props;
    const { pos } = this.state;
    const { type, scp } = this.state = { ...this.state, pos, max, scp: (this.state.type === "s-pc" ? 10 : 5) };

    const first = this.getFirstPage(pos, scp);
    let last = first + scp - 1;
    let invisable = true;
    // 전체 페이지수가 scp보다 크면...
    if (last < max) {
      invisable = false;
    } else if (last >= max) {
      last = max;
    }

    let items = [];
    for (let i = first; i <= last; i++) {
      items.push({ 'page': (i) });
    }

    if (items.length <= 1 && first <= 1) {
      return null;
    } else {
      return (
        <StyledObject className={cx('page-navi', (type), className, `theme-${theme}`)} button={button} border={border} font={font} bgcolor={bgcolor} >
          <ul className={cx('pgn-frame')}>
            <li className={cx('pg-no pg-icon')} onClick={this.onClicked} eid={EID.PREV}>
              <Svg className="prev sm" name={"prev"} color={this.props.color} />
            </li>
            {items.map((item, index) => (
              <li className={cx('pg-no', String(item.page) === String(pos) ? 'active' : '')}
                key={String(index)} onClick={this.onClicked} eid={EID.PAGE}><span>{item.page}</span>
              </li>
            ))}
            <li className={cx('pg-no pg-icon', { invisable })} onClick={this.onClicked} eid={EID.NEXT}>
              <Svg className="next sm" name={"next"} color={this.props.color} />
            </li>
          </ul>
        </StyledObject>
      )
    }
  };
}

export default Pagenavi;