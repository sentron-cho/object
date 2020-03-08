/* eslint-disable react/no-direct-mutation-state */
import React from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import { EID } from './Config';
import { Svg, Util, cs } from './index';

const StyledObject = styled.div`{
  &.page-navi {
    ${cs.font.dark} ${cs.h.get(60)} ${cs.w.full} ${cs.pos.relative} 
    ${cs.font.center} ${cs.p.a10} ${cs.disp.inblock}

    .pgn-frame {
      ${cs.h.get(40)} ${cs.w.full}
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

    &.s-mobile { ${cs.p.a0} .pgn-frame { ${cs.m.get("10px 0px")} } }

    &.s-tablet {  ${cs.p.a0} .pgn-frame { ${cs.m.get("10px 0px")} } }
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

  // componentWillMount() {
  //   this.checkScreen();
  // }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkScreen);
  }

  checkScreen = () => {
    // let screen = window.innerWidth;
    // const type = (screen <= SCREEN.MOBILE) ? "s-mobile" : (screen <= SCREEN.TABLET) ? "s-tablet" : 's-pc';
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

    this.state.pos = page;

    if (this.props.onItemClick != null) {
      this.props.onItemClick(page, e);
    }
  }

  render() {
    const { className, pos, max } = this.props;
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

    if (items.length <= 1) {
      return null;
    } else {
      return (
        <StyledObject className={cx('page-navi', (type), className)}>
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