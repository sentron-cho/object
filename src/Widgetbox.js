import React from 'react';
import cx from 'classnames/bind';
import styled from 'styled-components';
import { Svg, cs } from './index';

const StyledObject = styled.div`{
  &.widget-box { 
    ${cs.noselect} ${cs.noliststyle} ${cs.box.inner} ${cs.pos.relative} ${cs.disp.inblock} 
    ${cs.bg.trans} ${cs.font.center} ${cs.w.get(160)} ${cs.box.radius} ${cs.box.line} 
    ${cs.border.lightgray} ${cs.over.hidden}

    width: ${(props) => props.width};
    height: ${(props) => props.height};

    .label { ${cs.font.ellipsis} }
  
    &.flex {
      ${cs.disp.get('flex; flex-direction: column;')} ${cs.min.width(0)} ${cs.w.auto} flex: 1, 1, 140px;
    }

    .t-icon {
      .icon { ${cs.size.get(100)} ${cs.align.center} }
      .label { ${cs.align.bottom} ${cs.font.center} ${cs.w.full} ${cs.p.b5} }
    }

    .t-image { 
      ${cs.size.full} ${cs.opac.show} ${cs.p.b50} ${cs.over.hidden} ${cs.font.gray} ${cs.font.sm}

      .icon { ${cs.size.full} ${cs.max.width(300)} }
      .label { ${cs.p.v3}
        ${cs.font.center} ${cs.w.full} ${cs.pos.absolute}
        ${cs.pos.ltop} ${cs.z.front} ${cs.border.none} ${cs.bg.get('#000000e0')}
        ${cs.opac.alpha} 
      }
      .cont { 
        ${cs.opac.alpha} ${cs.bg.get('#000000e0')} 
        ${cs.font.center} ${cs.w.full} ${cs.align.bottom}
        ${cs.min.height(40)} 
        .p-cont { ${cs.align.center} }
      }

      &:hover { .label, .cont { ${cs.opac.show} } }
    }

    .t-label { 
      ${cs.size.full} ${cs.pos.relative} ${cs.p.a0}
      .icon { ${cs.w.get(40)} ${cs.right(10)} ${cs.top(10)} ${cs.float.right} }

      .cont-body { 
        ${cs.align.center} ${cs.size.full}
        .st-txt { 
          ${cs.w.full} ${cs.align.center} ${cs.font.weight(500)} ${cs.font.orange} ${cs.font.center}
          &.nodata { ${cs.font.size("16px !important")} ${cs.font.weight(400)} ${cs.font.lightgray} }
        }
        .st-label { ${cs.align.cbottom} ${cs.opac.show} }
      }
    }

    &.hover {
      &:not(.disable):hover { ${cs.mouse.pointer} ${cs.opac.get(0.7)}
        .t-image { ${cs.opac.show} } 
      }
    }
    
    &.active {
      ${cs.bg.primary}
      &:hover { ${cs.mouse.pointer} ${cs.bg.hover} }
      .t-image { ${cs.opac.show} }
    }

    &.disable {
      ${cs.bg.black}
      &:hover { ${cs.mouse.default} ${cs.bg.darkhover} }
      &.active { ${cs.bg.gray} }
    }
    
    &.md { ${cs.h.get(160)} ${cs.min.height(160)} ${cs.w.get(140)} 
      .t-label {
        .icon { ${cs.icon.md} }
        .cont-body { .st-txt { ${cs.font.get(48)} } .st-label { ${cs.font.sm} } }
      }
      .t-icon { .icon { ${cs.size.get(80)} } }
    }
    &.sm { ${cs.h.get(120)} ${cs.min.height(120)} ${cs.w.get(100)} 
      .t-label {
        .icon { ${cs.icon.sm} }
        .cont-body { .st-txt { ${cs.font.get(24)} } .st-label { ${cs.font.xs} } }
      }
      .t-icon { .icon { ${cs.size.get(40)} } .label {} }
    }
    &.lg { ${cs.h.get(200)} ${cs.min.height(200)} ${cs.w.get(180)} 
      .t-label {
        .icon { ${cs.icon.lg} }
        .cont-body { .st-txt { ${cs.font.get(60)} } .st-label { ${cs.font.lg} } }
      }
      .t-icon { .icon { ${cs.size.get(100)} } }
    }
    &.full { ${cs.size.full} }

    &.noradius { ${cs.border.radius(0)} }
    &.noborder { ${cs.border.trans} }
    
    &.sky {
      ${cs.bg.sky} ${cs.font.dark} ${cs.border.lightgray}
      .icon .svg-path { ${cs.fill.dark} }
      &.hover:hover { ${cs.bg.lightgray} }
    }
    &.primary {
      ${cs.bg.primary} ${cs.font.white} ${cs.border.primary}
      .icon .svg-path { ${cs.fill.white} }
      &.hover:hover { ${cs.bg.primaryhover} }
    }
    &.gray {
      ${cs.bg.lightgray} ${cs.font.dark} ${cs.border.gray}
      .icon .svg-path { ${cs.fill.dark} }
      &.hover:hover { ${cs.bg.grayhover} }
    }
    &.dark {
      ${cs.bg.dark} ${cs.font.white} ${cs.border.black}
      .icon .svg-path { ${cs.fill.white} }
      &.hover:hover { ${cs.bg.darkhover} }
    }
    &.black {
      ${cs.bg.black} ${cs.font.white} ${cs.border.darkgray}
      .icon .svg-path { ${cs.fill.white} }
      &.hover:hover { ${cs.bg.darkhover} }
    }

    
    &.theme-sky {
      ${cs.bg.sky} ${cs.font.dark} ${cs.border.lightgray}
      .icon .svg-path { ${cs.fill.dark} }
      &.hover:hover { ${cs.bg.lightgray} }
    }
    &.theme-primary {
      ${cs.bg.primary} ${cs.font.white} ${cs.border.primary}
      .icon .svg-path { ${cs.fill.white} }
      &.hover:hover { ${cs.bg.primaryhover} }
    }
    &.theme-gray {
      ${cs.bg.lightgray} ${cs.font.dark} ${cs.border.gray}
      .icon .svg-path { ${cs.fill.dark} }
      &.hover:hover { ${cs.bg.grayhover} }
    }
    &.theme-dark {
      ${cs.bg.dark} ${cs.font.white} ${cs.border.black}
      .icon .svg-path { ${cs.fill.white} }
      &.hover:hover { ${cs.bg.darkhover} }
    }
    &.theme-black {
      ${cs.bg.black} ${cs.font.white} ${cs.border.darkgray}
      .icon .svg-path { ${cs.fill.white} }
      &.hover:hover { ${cs.bg.darkhover} }
    }

    &.left {
      .st-font { ${cs.p.h5} ${cs.w.get("calc(100% - 10px) !important")} ${cs.font.align('left !important')} }
    }
    &.center {
      .st-font { ${cs.p.h5} ${cs.w.get("calc(100% - 10px) !important")} ${cs.font.align('center !important')} }
    }
    &.right {
      .st-font { ${cs.p.h5} ${cs.w.get("calc(100% - 10px) !important")} ${cs.font.align('right !important')} }
    }

    ${({ border }) => border && `${cs.box.line}`}
    ${({ border }) => border && border.color && `${cs.border.color(border.color)}`}
    ${({ border }) => border && border.radius && `${cs.border.radius(border.radius)}`}
    ${({ border }) => border && border.width && `${cs.border.width(border.width)}`}
    
    ${({ font }) => font && font.size && `.st-font { ${cs.font.size(font.size + '!important')} }`}
    ${({ font }) => font && font.color && `.st-font { ${cs.font.color(font.color + '!important')} }`}
    ${({ font }) => font && font.align && `.st-font { ${cs.p.h5} ${cs.w.get("calc(100% - 10px) !important")} ${cs.font.align(font.align + '!important')} }`}

    ${({ labelcolor }) => labelcolor && `.st-font-label { ${cs.font.color(labelcolor + '!important')} }`}
    
    ${({ bgcolor }) => bgcolor && `${cs.bg.color(bgcolor)}`}

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
    
    const onClick = props.onClick || props.onClicked;
    const name = e.currentTarget.getAttribute('name');
    onClick && onClick(name, e);
  };

  const { className = null, type = 'label', flex = false, full = false, size = 'md', disable = false, theme } = props;

  const onClick = props.onClick || props.onClicked;
  const active = onClick && props.active ? props.active : false;
  const hover = onClick ? true : false;
  
  return (
    <StyledObject className={cx('widget-box', size, { hover }, { active }, { flex }, { full }, { disable }, className, theme && `theme-${theme}`)} 
      name={props.name} onClick={onClicked} {...props.style} labelcolor={props.labelcolor}
      border={props.border} font={props.font} bgcolor={props.bgcolor} >
      {type === "label" &&
        <div className={cx("t-label")} >
          {props.icon && <Svg className={cx("icon", size)} name={props.icon} color={props.color} />}
          <div className="cont-body">
            {<p className={cx("st-txt", !props.value && 'nodata', 'st-font-label')}>{props.value || 'nodata'}</p>}
            {props.name && <p className="st-label st-font">{props.name}</p>}
          </div>
        </div>
      }
      {type === "icon" &&
        <div className="t-icon">
          <div className="text-muted text-right">
            <Svg className={cx("icon", size)} name={props.icon} color={props.color} />
            {/* <img alt="img" className={'icon'} src={props.icon} alt='icon' /> */}
          </div>
          {props.name && <p className="label st-font">{props.name}</p>}
        </div>}
      {type === "image" &&
        <div className="t-image">
          <img className={cx("icon", size)} src={props.src || props.icon} alt='icon' />
          {props.name && <p className="label st-font">{props.name}</p>}
          {props.cont && <div className="cont">
            <p className="p-cont st-font-label">{props.cont}</p>
          </div>}
        </div>}      
    </StyledObject >
  );
};

export default Widgetbox;
