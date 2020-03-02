import React from 'react';
import cx from 'classnames/bind';
import styled from 'styled-components';
import { Svg, cs } from './index';

// display: flex;
// justify-content: space-between;

const StyledObject = styled.div`{
  &.widget-box { position: relative; display: inline-block; break-word; background-color: transparent;
    ${cs.box.line} ${cs.box.radius} ${cs.border.darkgray}

    text-align: center; width: 160px;
    width: ${(props) => props.width};
    height: ${(props) => props.height};

    .label { overflow: hidden; text-overflow: ellipsis; }
    
    &.sm { height: 100px; min-height: 100px; }
    &.md { height: 160px; min-height: 160px; }
    &.lg { height: 200px; min-height: 200px; }
    &.full { width: 100%; height: 100%; }

    &.flex {
      display: flex; flex-direction: column; min-width: 0; width: auto; flex: 1, 1, 140px;
    }

    .t-icon { padding: 10px 30px;
      .icon { width: 100px; height: 100px; }
      .label { text-align: center; width: 100px; }
    }

    .t-image { width: 100%; height: 100%; padding: 2px; opacity: 0.8; padding: 30px 10px; padding-bottom: 50px;
      .icon { width: 100%; height: 100%; max-width: 300px; }
      .label { text-align: center; width: 100%; font-size: 14px; padding: 2px 10px; position: absolute; 
        left: 0; top: 0px; z-index: 1; line-height: 24px; background: rgba(120,120,120,0.5); border-radius: 0; }
      .cont { text-align: center; width: 100%; font-size: 12px; padding: 0 10px; left: 0; position: absolute; 
        bottom: 0; background: rgba(0,0,0,0.5); min-height: 40px; display: table;
        .p-cont { display: table-cell; vertical-align: middle; white-space: pre-wrap; }
      }
    }

    .t-label { padding: 0; height: 100%; width: 100%; position: relative;
      // .btn-edit { cursor: pointer; float: right; margin-top: 5px; margin-right: 5px; }
      .icon { width: 40px; float: right; right: 10px; top: 10px; position: absolute; }

      .cont-body { position: absolute; top: 50%; left: 50%; width: 100%; height: 100%;
        transform: translate(-50%, -50%); text-align: left;
        .st-txt { position: absolute; width: 100%; top: 50%; left: 50%; transform: translate(-50%, -50%); 
          font-size: 50px; line-height: 50px; font-weight: 500; color: #ff9009; text-align: center; 
        }
        .st-label { position: absolute; bottom: 5px; font-size: 14px; line-height: 20px; opacity: 0.9; padding: 0 10px; }
      }

      .cont-foot { height: 40px; text-align:right; border-top: #c3d8ff 1px solid; }      
    }

    &.hover {
      &:not(.disable):hover { cursor: pointer; ${cs.bg.primary}
        .t-image { opacity: 1; } 
      }
    }
    
    &.active {
      ${cs.bg.primary}
      &:hover { cursor: pointer; ${cs.bg.primary} }
      .t-image { opacity: 1; }
    }

    &.disable {
      ${cs.bg.black}
      &:hover { cursor: default; ${cs.bg.black} }

      &.active { ${cs.bg.gray} }
    }

    @media screen and (max-width : 1024px) {
    }

    @media screen and (max-width : 860px) {
      .t-label {
        .icon { width: 20px; height: 16px; }
        .cont-body { .st-label { font-size: 12px; padding: 0; text-align: center; } .st-txt { font-size: 24px; } }
      }
    }
  }
}`;

const Widgetbox = (props) => {
  const onClicked = (e) => {
    if (props.disable) return;

    const name = e.currentTarget.getAttribute('name');
    props.onClicked && props.onClicked(name, e);
  };

  const type = props.type ? props.type : 'label';
  const active = props.onClicked && props.active ? props.active : false;
  const flex = props.flex ? props.flex : false;
  const full = props.full ? props.full : false;
  const hover = props.onClicked ? true : false;
  const size = props.size ? props.size : 'md';
  const disable = props.disable || false;

  return (
    <StyledObject className={cx('widget-box', size, { hover }, { active }, { flex }, { full }, { disable })}
      name={props.name} onClick={onClicked} {...props.style}>
      {type === "icon" &&
        <div className="t-icon">
          <div className="text-muted text-right">
            <Svg className={cx("icon", size)} name={props.icon} color={props.color ? props.color : 'white'} />
            {/* <img alt="img" className={'icon'} src={props.icon} alt='icon' /> */}
          </div>
          <p className="label text-uppercase font-weight-bold">{props.name}</p>
        </div>}
      {type === "image" &&
        <div className="t-image">
          <img className={cx("icon", size)} src={props.icon} alt='icon' />
          <p className="label">{props.name}</p>
          <div className="cont">
            <p className="p-cont">{props.cont}</p>
          </div>
        </div>}
      {type === "label" &&
        <div className={cx("t-label")} >
          <Svg className={cx("icon", size)} name={props.icon} color={props.color ? props.color : 'white'} />
          <div className="cont-body">
            <p className="st-txt">{props.value}</p>
            <p className="st-label">{props.name}</p>
          </div>
        </div>
      }
    </StyledObject >
  );
};

export default Widgetbox;
