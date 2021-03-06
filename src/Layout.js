
import React from 'react';
import cx from 'classnames/bind';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { EID, SCREEN } from './Config';
import { Util, Storage } from './Utils';
import cs from './css-style';

const StyledObject = styled.div`{
  &.layout { 
    ${cs.pos.absolute} ${cs.m.a0} ${props => cs.h.get(`calc(100vh - ${props.top})`)}
    ${cs.over.xhidden} ${cs.h.full} ${cs.w.full} ${props => cs.min.width(`calc(100vw - ${props.width})`)}
    ${cs.font.md} ${props => cs.p.left(props.width)} ${props => cs.p.top(props.top)}
    ${cs.scrollbar.t1}
    
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
    // 메뉴 표시/미표시 버튼 클릭후 메인 하면이 표시될때 좌우 깜박임 발생 방지
    if (this.props.layout != null) { this.props.layout.anim = false; this.props.layout.time = 0; }
  }

  render() {
    const { props } = this;
    const { layout, leftPadding = "235px", topPadding = "6px" } = props;
    const { time } = layout;
    const fade = { time: time == null ? 0 : time };
    const show = Storage.getSessionItem('sidemenu');
    const menubar = (!show || show === EID.SHOW) ? 'menuin' : 'menuout'; //act && act === EID.SHOW ? 'menuin' : 'menuout';
    const anim = this.state.type !== SCREEN.ST.MOBILE ? true : false;

    return (
      <StyledObject className={cx('layout', this.props.className, { anim }, menubar)} fade={fade} width={leftPadding} top={topPadding} >
        {this.props.children}
      </StyledObject>
    )
  }
}

export default connect((state) => ({ layout: state.layout }), null)(Layout);