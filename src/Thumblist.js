import React from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import { Nodata, Svg, Dragbox, Thumbbox, Guidebox, cs } from './index';

const StyledObject = styled.div`{
  &.thumb-list { 
    ${cs.pos.relative} ${cs.m.t5} ${cs.box.line} ${cs.border.lightgray} 
    ${cs.noselect} ${cs.noliststyle}

    .thb-new { ${cs.align.rbottom} }

    .v-line { ${cs.over.xauto} ${cs.disp.get("flex")} ${cs.over.xauto} ${cs.scrollbar.t3}
      ${cs.mouse.pointer}
      .v-item { 
        ${cs.disp.inblock} ${cs.p.a5} ${cs.pos.relative} ${cs.opac.show}

        .thb-delete { ${cs.align.rbottom} ${cs.opac.get(0.2)} ${cs.bottom(13)} ${cs.right(8)} }

        &:hover {
          .thb-delete { ${cs.opac.show} } 
        }
      }

      &.dragdrop { ${cs.mouse.move} }
    }

    &.flex { ${cs.disp.get('flex; flex-wrap: wrap;')} }
    
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
  const cursor = props.onSelect == null ? 'default' : "pointer";
  const style = { cursor };
  const { head, list, path = null, rowid = null } = props;

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

  const onDrag = (...args) => {
    props.onDragDrop && props.onDragDrop(...args);
  }

  const onWheel = (e) => {
    e.preventDefault();
    const fr = document.getElementById('s-frame');
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

    if (list && list[0]) {
      const item = list[0];
      if (item.rowid == null || item.rowid === undefined) {
        guide = "'rowid' is required in the list.\n"
          + "ex. const list = [{ rowid: 'a12345', title: 'tablebox', url: 'abc/abc.jpg', utime: '20200101' }, {...}\n"
          + "rowid and text is required. Rest is optional.\n"
          + "rowid is used to show or hide text(contents)";
      }
    }

    if (props.onDrag) {
      guide = "Use onDragDrop() instead of onDrag()";
    }

    if (guide) {
      return <Guidebox text={guide} />
    }
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

  return (
    <StyledObject className={cx('thumb-list', props.className)} {...style} >
      {props.onClickNew && <Svg className="thb-new lg" onClick={onClickNew} icon={'add'} />}

      {/* error guid */}
      {renderGuide()}

      {/* no data view */}
      {!tlist && <div className="no-data"><Nodata /></div>}

      {tlist && <ul className={cx("v-line", {dragdrop})} id={'s-frame'}>
        {/* items */}
        {list.map((item, index) => {
          const url = path ? path + item.url : item.url;
          const rid = rowid ? item[rowid] : -1;
          const odr = item.odr ? item.odr : index + 1;

          return (
            <li key={rid} className={cx("v-item drag-li")} rowid={rid} onClick={onSelectItem} onWheel={onWheel}>
              <Thumbbox className={"border radius"} odr={odr} thumb={url} anim={true} delay={index * 50} />
              {props.onClickDelete &&
                <Svg className="thb-delete delete sm" onClick={onClickDelete} eid={rid} icon={'delete'} color={cs.color.lightgray}/>
              }
            </li>
          )
        })}
      </ul>}
    </StyledObject >
  );
}

export default Thumblist;