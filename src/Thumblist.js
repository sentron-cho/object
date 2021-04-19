import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { Nodata, Svg, Thumbbox, Guidebox, Dragable, cs } from './index';

const StyledObject = styled.div`{
  &.thumb-list { 
    ${cs.pos.relative} ${cs.m.t5} ${cs.min.h(60)} ${cs.bg.get("#00000020")}
    ${cs.noselect} ${cs.noliststyle} ${cs.w.full} ${cs.box.inner} ${cs.over.hidden}

    .thb-new { 
      ${cs.box.line} ${cs.box.dashed} ${cs.opac.get(0.3)} ${cs.w.get(60)} 
      ${cs.h.get(30)} ${cs.border.radius(5)} ${cs.pos.relative} ${cs.align.rbottom}
      .svg-icon {
        ${cs.size.get(26)} ${cs.align.center} 
      }
    }

    .v-line { ${cs.over.xauto} ${cs.scrollbar.t1} ${cs.disp.get("flex")} ${cs.w.full}
      .v-item { 
        ${cs.disp.inblock} ${cs.m.a2} ${cs.pos.relative} ${cs.opac.show}

        .thb-delete { ${cs.align.rbottom} ${cs.opac.get(0.5)} ${cs.bottom(5)} ${cs.right(3)} 
          ${cs.bg.alphablack} ${cs.border.dark}
          // .svg-icon { ${cs.bg.alphablack} } 
        }

        &:hover {
          .thb-delete { ${cs.opac.show} } 
        }

        &:first-child { ${cs.p.left(0)} }
        &:last-child { ${cs.p.right(0)} }

        .thumb-box { ${cs.box.line} ${cs.box.inner} ${cs.border.trans} 
          &.active { ${cs.box.orange} ${cs.opac.get(0.8)} }
        }

        ${({ cursor }) => cursor && cs.mouse.get(cursor)};
      }
    }

    .t-label { ${cs.align.right} ${cs.top(3)} ${cs.right(3)} ${cs.bg.alphablack} ${cs.p.h10} ${cs.border.radius(3)} 
      ${cs.font.lightgray} ${cs.font.sm} ${cs.disp.inblock} ${cs.p.v2}
    }

    .no-data { ${cs.h.get(100)} ${cs.w.fit} ${cs.align.center} .nodata-box { ${cs.min.h(20)} } }

    .thb-new:hover { ${cs.opac.show} ${cs.bg.alphablack} ${cs.mouse.pointer} }

    &.sky { ${cs.box.line} ${cs.box.radius} ${cs.bg.sky} }
    &.primary { ${cs.box.line} ${cs.box.radius} ${cs.bg.primary} }
    &.gray { ${cs.box.line} ${cs.box.radius} ${cs.bg.gray} }
    &.dark { ${cs.box.line} ${cs.box.radius} ${cs.bg.dark} }
    &.black { ${cs.box.line} ${cs.box.radius} ${cs.bg.black} }

    &.theme-sky { ${cs.box.line} ${cs.box.radius} ${cs.bg.sky} }
    &.theme-primary { ${cs.box.line} ${cs.box.radius} ${cs.bg.primary} }
    &.theme-gray { ${cs.box.line} ${cs.box.radius} ${cs.bg.gray} }
    &.theme-dark { ${cs.box.line} ${cs.box.radius} ${cs.bg.dark} }
    &.theme-black { ${cs.box.line} ${cs.box.radius} ${cs.bg.black} }

    &.full { ${cs.size.full} .tmb-img { ${cs.object.contain} } }
    &.border { ${cs.box.line} }
    &.radius { ${cs.box.radius} }

    &.sm { .thb-new { .svg-icon { ${cs.size.get(20)} } } }
    &.md { }
    &.lg { .thb-new { .svg-icon { ${cs.size.get(28)} } } .v-line { ${cs.scrollbar.t4} } }

    ${({ border }) => border && `${cs.box.line}`}
    ${({ border }) => border && border.color && `${cs.border.color(border.color)}`}
    ${({ border }) => border && border.radius && `${cs.border.radius(border.radius + "!important")}`}
    ${({ border }) => border && border.width && `${cs.border.width(border.width)}`}
    ${({ border }) => border && border.padding && `.v-line { ${cs.p.get(border.padding)} }`}

    ${({ bgcolor }) => bgcolor && `${cs.bg.color(bgcolor)}`}

    &.anim { 
      ${(props) => (props.anim && props.anim.type) && `.v-line { ${cs.anim[props.anim.type](props.anim.time || "0.2s")} }`}
    }
    
    @media screen and (max-width : 1280px) {}

    @media screen and (max-width : 860px) {
      .v-cont .v-line .v-item .thb-delete { ${cs.disp.block} }
    }

    @media screen and (max-width : 600px) {
      .v-cont .v-line {
        ${cs.align.justify('center')}
      }
    }
  }
}`;

const Thumblist = (props) => {
  const cursor = props.onSelect && "pointer";
  const { path = null, rowid = 'rowid', uuid = null, size = null, theme, pos = -1, total = 0 } = props;
  const { config = { child: null } } = props;
  const [anim, setAnim] = useState(props.anim);
  const [list, setList] = useState(props.list);

  useEffect(() => {
    setAnim(props.anim);
    setList(props.list);
  }, [props.anim, props.list]);

  useEffect(() => {
    const fr = document.getElementById(`s-frame${uuid || ''}`);
    const child = fr && fr.children[props.pos];
    if (child) {
      const start = fr.scrollLeft;
      const end = fr.offsetWidth + fr.scrollLeft;
      const left = child.offsetLeft;

      if (left > end || left < start) {
        fr.scrollTo({ top: 0, left: left, behaviour: 'smooth' })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.pos]);

  const onSelect = (rid, e, item) => {
    (props.onSelect != null) && props.onSelect(rid, e, item);
  }

  const onClickDelete = (rid, e) => {
    e.stopPropagation();
    (props.onClickDelete != null) && props.onClickDelete(rid, e);
  }

  const onClickNew = (eid, e) => {
    (props.onClickNew != null) && props.onClickNew(e);
  }

  const onWheel = (e) => {
    e.preventDefault();
    const fr = document.getElementById(`s-frame${uuid || ''}`);
    const index = fr.scrollLeft + e.deltaY / 2;
    fr.scrollTo({ top: 0, left: index, behaviour: 'smooth' })
  }

  const renderGuide = () => {
    let guide = null;

    if (props.onDrag) {
      guide = "Use onDragDrop() instead of onDrag()";
    }

    if (guide) {
      return <Guidebox text={guide} />
    }
  }

  const onAnimStart = (e) => {
    props.onAnimation && props.onAnimation('start', e);
  }

  const onAnimEnd = (e) => {
    props.onAnimation && props.onAnimation('end', e);
    setAnim({ anim: '' });
  }

  // 테이블 아이템중에 head에 설정된 col만 추출하자.
  const tlist = list && list.map(a => { return { ...a, rowid: a[rowid], url: a.url } });

  const dragdrop = props.onDragDrop ? true : false;
  const onDragDrop = useCallback((eid, dragIndex, hoverIndex) => {
    const dragitem = list[dragIndex];
    const array = update(list, { $splice: [[dragIndex, 1], [hoverIndex, 0, dragitem]] });
    setList(array);

    const temps = array && array.map(a => {
      delete a['index'];
      return a;
    });
    if (eid === 'drag') {
      props.onDraging && props.onDraging(eid, temps);
    } else if (eid === 'drop') {
      props.onDragDrop && props.onDragDrop(eid, temps);
    }
  }, [list, props]);

  return (
    <StyledObject className={cx('thumb-list', props.className, (anim && "anim"), size, theme && `theme-${theme}`)} cursor={cursor}
      border={props.border} bgcolor={props.bgcolor} anim={anim}
      onAnimationEnd={onAnimEnd} onAnimationStart={onAnimStart}>
      {/* {props.onClickNew && <Svg className="thb-new md" onClick={onClickNew} icon={'add'} color={cs.color.lightwhite} />} */}

      {/* error guid */}
      {renderGuide()}

      {/* no data view */}
      {!tlist && <div className="no-data"><Nodata /></div>}

      <DndProvider backend={Backend}>
        {tlist && <div className={cx("v-line", { dragdrop })} id={`s-frame${uuid || ''}`}>
          {/* items */}
          {list.map((item, index) => {
            if (!item) return null;

            item.index = index;
            const url = item.url && item.url.indexOf('http') === 0 ? item.url : path ? path + item.url : item.url;
            const rid = item[rowid] || index;
            const odr = item.odr || item.no || index + 1;
            const active = pos >= 0 && index === pos;

            return (
              <Dragable key={`${rid}-${index}`} id={rid} index={index} onDragDrop={dragdrop ? onDragDrop : null} disable={!dragdrop} >
                <span className={cx("v-item drag-li")} rowid={rid} onWheel={onWheel} onClick={(e) => onSelect(rid, e, item)} >
                  <Thumbbox className={cx(props.itemClassName, size, { active })} {...config.child}
                    odr={props.showno ? odr : null} thumb={url} anim={true} delay={index * 50} />
                  {props.onClickDelete &&
                    <Svg className="thb-delete delete md box radius white" onClick={onClickDelete} eid={rid} icon={'delete'} color={cs.color.lightgray} />
                  }
                </span>
              </Dragable>
            )
          })}
        </div>}
      </DndProvider>
      {total > 0 && pos > -1 && <span className={'t-label'}>
        {pos > -1 && <span>{pos + 1}</span>}
        {total > 0 && <span>{`/${total}`}</span>}
      </span>}
      {props.onClickNew && <span className={'thb-new'} onClick={(e) => onClickNew('new', e)}>
        <Svg className="md" onClick={onClickNew} icon={'add'} color={cs.color.lightwhite} />
      </span>}
    </StyledObject >
  );
}

export default Thumblist;
