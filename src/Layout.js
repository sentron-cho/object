
import React from 'react';
import cx from 'classnames/bind';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { EID, SCREEN } from './Config';
import { Util } from './Utils';

const StyledObject = styled.div`{
  &.layout { position: absolute; margin: 0px; min-height: 600px; overflow-x: hidden;
    height: calc(100vh); min-width: 400px; width: calc(100vw); font-size: 14px; 
    padding-left: ${props => props.width}; padding-top: ${props => props.top};
    
    &.anim.menuin { animation: menu-in linear 1 forwards ${props => props.fade.time}s};
    &.anim.menuout { animation: menu-out linear 1 forwards ${props => props.fade.time}s };

    @keyframes menu-in {
      from { padding-left: 0px; }
      to { padding-left: ${props => props.width}; }
    }
    
    @keyframes menu-out {
      from { padding-left: ${props => props.width}; }
      to { padding-left: 0px; }
    }

    @media screen and (max-width : 1280px) {
    }

    @media screen and (max-width : 1080px) {
    }

    @media screen and (max-width : 860px) {
      padding-left: 0;
    }
  }
}`;

class Layout extends React.PureComponent {

  constructor(props) {
    super(props);
    const { type } = Util.getScreenType();
    this.state = { type: type }
  }

  onResize = () => {
    const { type } = Util.getScreenType();
    this.setState({ 'type': type });
  }

  componentDidMount() {
    document.getElementById('body').addEventListener('mouseup', this.onClickBg);
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    document.getElementById('body').removeEventListener('mouseup', this.onClickBg);
    window.removeEventListener('resize', this.onResize);
  }

  componentDidUpdate() {
    // this.props.layout = {};
    // 메뉴 표시/미표시 버튼 클릭후 메인 하면이 표시될때 좌우 깜박임 발생 방지
    if (this.props.layout != null) { this.props.layout.anim = false; this.props.layout.time = 0; }
    // console.dir(this.props.layout);
  }

  render() {
    const { props } = this;
    const { layout, leftPadding = "235px", topPadding = "6px" } = props;
    const { act, time } = layout;
    const fade = { time: time == null ? 0 : time };
    const menubar = act == null ? '' : act === EID.SHOW ? 'menuin' : 'menuout';
    const anim = this.state.type !== SCREEN.ST.MOBILE ? true : false;

    return (
      <StyledObject className={cx('layout', this.props.className, { anim }, menubar)} fade={fade} width={leftPadding} top={topPadding} >
        {this.props.children}
      </StyledObject>
    )
  }
}

export default connect((state) => ({ layout: state.layout }), null)(Layout); 