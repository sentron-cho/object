import React, { useState, useCallback, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { Nodata, Svg, Thumbbox, Guidebox, Dragable, cs } from './index';

const DT = { CARD: 'card' };

const StyledObject = styled.div`{
  &.thumb-list { 
    ${cs.pos.relative} ${cs.m.t5} ${cs.box.line} ${cs.border.lightgray} 
    ${cs.noselect} ${cs.noliststyle} ${cs.w.full} ${cs.box.inner} ${cs.over.hidden}

    .thb-new { ${cs.align.rtop} ${cs.opac.get(0.3)} ${cs.top(2)} ${cs.left(2)} ${cs.float.right} }

    .v-line { ${cs.over.xauto} ${cs.scrollbar.t3} ${cs.disp.get("flex")} ${cs.w.full}
      .v-item { 
        ${cs.disp.inblock} ${cs.p.a5} ${cs.pos.relative} ${cs.opac.show}

        .thb-delete { ${cs.align.rbottom} ${cs.opac.get(0.2)} ${cs.bottom(13)} ${cs.right(8)} }

        &:hover {
          .thb-delete { ${cs.opac.show} } 
        }

        ${({ cursor }) => cursor && cs.mouse.get(cursor)};
      }
    }

    &:hover { .thb-new { ${cs.opac.show} } }

    &.primary { ${cs.box.line} ${cs.box.radius} ${cs.bg.primary} }
    &.gray { ${cs.box.line} ${cs.box.radius} ${cs.bg.gray} }
    &.dark { ${cs.box.line} ${cs.box.radius} ${cs.bg.dark} }

    &.full { ${cs.size.full} .tmb-img { ${cs.object.contain} } }
    &.border { ${cs.box.line} }
    &.radius { ${cs.box.radius} }

    &.sm { .thb-new { ${cs.size.get(20)} } }
    &.md { }
    &.lg { .thb-new { ${cs.size.get(28)} } .v-line { ${cs.scrollbar.t4} } }

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
      .v-cont .v-line .v-item .thb-delete { display: block; }
    }

    @media screen and (max-width : 600px) {
      .v-cont .v-line {
        justify-content: center; 
      }
    }
  }
}`;

const Thumblist = (props) => {
  const cursor = props.onSelect && "pointer";
  const { head, path = null, rowid = 'rowid', uuid = null, size = null } = props;
  const { config = { child: null } } = props;
  const [anim, setAnim] = useState(props.anim);
  const [list, setList] = useState(props.list);

  useEffect(() => {
    setAnim(props.anim);
  }, [props.anim]);

  // useList(() => {
  //   setAnim(props.anim);
  //   console.log(props.anim);
  // }, [props.anim])

  const onSelectItem = (e) => {
    const rowid = e.currentTarget.getAttribute("rowid");
    onSelect(rowid, e);
  }

  const onSelect = (rowid, e) => {
    // let rowid = e.currentTarget.getAttribute("rowid");
    (props.onSelect != null) && props.onSelect(rowid, e);
  }

  const onClickDelete = (rowid, e) => {
    e.stopPropagation();
    (props.onClickDelete != null) && props.onClickDelete(rowid, e);
  }

  const onClickNew = (eid, e) => {
    (props.onClickNew != null) && props.onClickNew(e);
  }

  const onWheel = (e) => {
    e.preventDefault();
    const fr = document.getElementById(`s-frame${uuid || ''}`);
    const pos = fr.scrollLeft + e.deltaY / 2;
    fr.scrollTo({ top: 0, left: pos, behaviour: 'smooth' })
  }

  const renderGuide = () => {
    let guide = null;
    if (!head) {
      guide = "You must set head props.\n"
        + "ex. const head = [{ key: 'no', title: 'utime', type: 'date', align: 'left', flex: '1 1 40px' }, {...}\n"
        + "key and title is required. Rest is optional.\n"
        + "type is text or date or datetime";
    }

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

  // tags 배열에 나열된 아이템들만 추출
  const makeItems = (list = null, head = null) => {
    if (list && head) {
      return list.map(item => {
        let temps = [];
        head.map(key => temps = [...temps, { key: key, value: item[key] }]);
        return temps;
      })
    } else {
      return null;
    }
  }

  // 테이블 아이템중에 head에 설정된 col만 추출하자.
  const tlist = makeItems(list, head && head.map(item => item.key));

  const dragdrop = props.onDragDrop ? true : false;
  const onDragDrop = useCallback((eid, dragIndex, hoverIndex) => {
    const dragitem = list[dragIndex];
    const array = update(list, { $splice: [[dragIndex, 1], [hoverIndex, 0, dragitem]] });
    setList(array);

    if (eid === 'drag') {
      props.onDraging && props.onDraging(eid, array);
    } else if (eid === 'drop') {
      props.onDragDrop && props.onDragDrop(eid, array);
    }

    // if (eid === 'drag') {
    //   const array = list.map(item => {
    //     item["hover"] = (item.index === hoverIndex) ? true : false;
    //     console.log(hoverIndex, item.index, item.hover);
    //     return item;
    //   });
    //   console.log(array);
    //   // setList(array);
    //   // props.onDragDrop && props.onDragDrop(eid, null, dragIndex, hoverIndex);
    // } else if (eid === 'drop') {
    //   // setList(array);
    //   // const dragitem = list[dragIndex];
    //   // const array = update(list, { $splice: [[dragIndex, 1], [hoverIndex, 0, dragitem]] });
    //   // props.onDragDrop && props.onDragDrop(eid, array, startpos, hoverIndex);
    // }
    // }
  }, [list]);

  return (
    <StyledObject className={cx('thumb-list', props.className, (anim && "anim"), size)} cursor={cursor}
      border={props.border} bgcolor={props.bgcolor} anim={anim}
      onAnimationEnd={onAnimEnd} onAnimationStart={onAnimStart}>
      {props.onClickNew && <Svg className="thb-new md" onClick={onClickNew} icon={'add'} color={cs.color.lightwhite} />}

      {/* error guid */}
      {renderGuide()}

      {/* no data view */}
      {!tlist && <div className="no-data"><Nodata /></div>}

      <DndProvider backend={Backend}>
        {tlist && <div className={cx("v-line", { dragdrop })} id={`s-frame${uuid || ''}`}>
          {/* items */}
          {list.map((item, index) => {
            item.index = index;
            const url = path ? path + item.url : item.url;
            const rid = item[rowid] || index;
            const odr = item.odr || item.no || index + 1;

            return (
              <Dragable key={rid} id={rid} index={index} onDragDrop={dragdrop ? onDragDrop : null} disable={!dragdrop} >
                <span className={cx("v-item drag-li")} rowid={rid} onClick={onSelectItem} onWheel={onWheel}>
                  <Thumbbox className={cx("border radius", size)} {...config.child} odr={odr} thumb={url} anim={true} delay={index * 50} />
                  {props.onClickDelete &&
                    <Svg className="thb-delete delete sm" onClick={onClickDelete} eid={rid} icon={'delete'} color={cs.color.lightgray} />
                  }
                </span>
              </Dragable>
            )
          })}
        </div>}
      </DndProvider>
    </StyledObject >
  );
}

export default Thumblist;
