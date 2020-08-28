import React from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';

import { Util } from './Utils';
import { ST } from './Config';


const StyledFrame = styled.div`{
  &.advert-box {
    min-width: 400px; max-width: 680px; position: relative; left: 50%; transform: translateX(-50%); min-height: 125px; 
    margin: 0; text-align: center; color: rgba(255, 191, 43, 0.9); font-size: 5rem;

    .ad-img { font-size: 2rem; object-fit: fill; position: fixed; float: left; left: 50%; top: 50%;  transform: translate(-50%, -50%); }

    &.box { border: 1px solid rgba(231, 231, 231, 0.1); background: rgba(255,255,255,0.3)}

    .ad-text { text-align: center; position: fixed; width: 100%; float: left; height: 100%;
      .ad-title { position: relative; float: left; left: 50%; top: 50%; transform: translate(-50%, -60%); font-weight: 700; letter-spacing: 5px; }
      .ad-cont { position: absolute; font-size: 1.4rem; color: rgba(255,255,255,0.7); float: left; left: 50%; bottom: 10%; transform: translateX(-50%); }}
    }
  }

  &.pointer { cursor: pointer };

  @media screen and (max-width : 860px) {
    &.advert-box { min-height: 90px;
      .ad-img {}
      .ad-text {
        .ad-title { font-size: 3.8rem; }
        .ad-cont { font-size: 1.4rem; padding-right: 10px; bottom: 2px; }
      }
    }
  }
}`;

const disptime = 10; // 10초

export default class Advertbox extends React.PureComponent {
  state = {
    timer: null,
    selected: null,
    data: { 'phone': '000-0000-0000', 'email': 'test@test.net' },
  };

  constructor(props) {
    super(props);

    this.state.data = props.data != null && props.data;
  }

  componentDidMount = (e) => {
    this.timer = setInterval(() => {
      this.setState({ selected: '' });
    }, 1000 * disptime);
  }

  componentWillUnmount(e) { this.timer != null && clearInterval(this.timer) }

  onClicked = (e) => {
    const item = this.state.selected;
    if (this.isUrl(item.url)) {
      const url = item.url.indexOf("http://") < 0 ? `http://${item.url}` : item.url;
      !Util.isEmpty(item.url) && window.open(url);
    }
  }

  isUrl = (url) => {
    return !Util.isEmpty(url) && url !== 'localhost' ? true : false;
  }

  render() {
    const props = this.props;
    const show = props.show === true ? true : false;

    const { list } = props;
    let pointer = true, item = null;

    if (list != null && list.length > 0) {
      const index = Math.floor((Math.random() * list.length - 1) + 1);
      // eslint-disable-next-line react/no-direct-mutation-state
      item = this.state.selected = list[index];

      pointer = this.isUrl(item.url);
    }

    const isImage = (!Util.isEmpty(item) && !Util.isEmpty(item.image) && item.image !== 'none')

    if (!show) {
      return null;
    } else {
      return (
        <StyledFrame className={cx("advert-box", { pointer })}
          onClick={this.onClicked}>
          {item != null &&
            < React.Fragment >
              {!isImage && <div className="ad-text"><strong className="ad-title">{item.title}</strong><p className="ad-cont">{item.text}</p></div>}
              {isImage && <img className="ad-img" src={item.image.charAt(0) !== '/' ? `/${item.image}` : item.image} alt={ST.NOIMAGE} />}
            </React.Fragment>
          }
        </StyledFrame >
      )
    }
  }
}