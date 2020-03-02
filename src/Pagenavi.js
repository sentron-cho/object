/* eslint-disable react/no-direct-mutation-state */
import React from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import { EID } from './Config';
import { Svg, Util } from './index';

const StyledObject = styled.div`{
    height: 60px; width: 100%; position: relative; text-align: center; padding: 10px;
    display: inline-block; background: transparent;

    &.s-mobile { padding: 0px; .pgn-frame { margin: 10px 0px; } }

    &.s-tablet { padding: 0px; .pgn-frame { margin: 10px 0px; } }

    .pgn-frame {
        height: 40px; width: 100%;
        .pg-no {
            height: 40px; width: 36px; border: 1px solid transparent; border-radius: 2px;
            margin: 0 1px; display: inline-block; line-height: 40px; opacity: 0.6;
            text-align: center; font-size: 14px; font-weight: 600; position: relative;

            &:hover { border-color: #337ab7; opacity: 1; .svg-icon { opacity: 1; } }
            &.active { background: #337ab7; opacity: 1; }
            &.invisable { visibility: hidden; }
            
            .svg-icon { position: relative; left: 0; top: 3px; display: inline-block; float: none; } }
        }

    };
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
        <StyledObject className={cx('page-navi', (type))}>
          <ul className={cx('pgn-frame', className)}>
            <li className={cx('pg-no pg-icon')} onClick={this.onClicked} eid={EID.PREV}>
              <Svg className="prev sm" name={"prev"} color={this.props.color} />
            </li>
            {items.map((item, index) => (
              <li className={cx('pg-no', String(item.page) === String(pos) ? 'active' : '')} key={String(index)} onClick={this.onClicked} eid={EID.PAGE}>{item.page}</li>
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