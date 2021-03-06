import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { SearchFrame, Pagenavi, Util, Svg, cs, Guidebox, Dragable, Nodata } from './index';
import { EID, ST } from './Config';
import moment from 'moment';

const StyledObject = styled.div`{
  &.table-box { 
    ${cs.pos.relative} ${cs.font.dark} ${cs.noliststyle} 

    .search-frame { ${cs.z.header} ${cs.p.b10} }

    .tb-line { ${cs.w.full} ${cs.h.fit} ${cs.disp.block}
      ${cs.pos.relative} ${cs.font.md} ${cs.noselect}

      .tb-row { 
        ${cs.w.full} ${cs.pos.relative} ${cs.disp.get("flex; flex-direction: row;")}
        ${cs.border.bottom} ${cs.h.fit} ${cs.p.v3} 

        cursor: ${(props) => props.cursor};

        .tb-col {  
          ${cs.font.center} ${cs.disp.inblock} ${cs.p.v4} ${cs.h.full}
          ${cs.over.hidden} ${cs.font.ellipsis}
          ${({ flex }) => flex && cs.disp.flex(flex)};
          ${cs.border.left} ${cs.border.white} ${cs.p.h10}
          ${({ height }) => cs.font.line(height)};
          ${({ height }) => cs.h.get(height)};

          p { ${cs.font.ellipsis} ${({ align }) => cs.font.align(align)}; ${cs.pos.relative} }

          .tb-u { ${cs.font.xs} ${cs.m.l1} ${cs.opac.get(0.7)} }
        }

        .btn-head { ${cs.disp.hidden} }

        &:hover {
          .i-btn { ${cs.opac.show} ${cs.anim.show} }
        }

        .i-btn { ${cs.z.icon} ${cs.opac.hide} ${cs.align.ycenter} 
          &.btn-del { ${cs.right(5)} ${cs.m.l10} }
          &.btn-move { ${cs.left(5)} }
        }
        
        &:first-child { .btn-up { ${cs.disp.hidden} } }
        &:last-child { .btn-dn { ${cs.disp.hidden} } }

        &.active { ${cs.bg.hover}
          &.green { background:${cs.color.green} !important; ${cs.font.white} }
          &.yellow { background:${cs.color.yellow} !important; ${cs.font.white} }
          &.orange { background:${cs.color.orange} !important; }
          &.red { background:${cs.color.red} !important; }
          &.dark { background:${cs.color.dark} !important; ${cs.font.white} ${cs.box.line} }
        }
        
        &.disable { ${cs.bg.trans} ${cs.font.gray} }
      }

      &.tb-head { ${cs.font.lg} ${cs.font.weight(600)} ${cs.bg.lightgray} 
        ${cs.pos.relative} ${cs.top(0)} ${cs.z.thead} ${cs.border.bottom} ${cs.border.gray}
        .tb-row { .tb-col { ${cs.border.lightwhite} } } 
      }

      &.tb-body { ${cs.m.t0} }

      .selection {
        &:hover { ${cs.bg.hover} }
      }      
    }

    .total-txt { ${cs.font.right} ${cs.p.a3} ${cs.font.sm} ${cs.opac.get(0.7)} }
    .page-navi { ${cs.p.t5} ${cs.align.xcenter} ${cs.pos.relative} }
    
    &.sm { 
      .tb-row { 
        .tb-col {
          ${({ height }) => cs.font.line(height - 6)};
          ${({ height }) => cs.h.get(height - 6)};
        }
        .i-btn { ${cs.w.get(14)} ${cs.h.get(14)} }
      }
      .tb-body { ${cs.font.sm} ${cs.m.t0} } 
      .tb-head { ${cs.font.md} }
    }

    &.md { 
      .tb-row { 
        .tb-col {
          ${({ height }) => cs.font.line(height)};
          ${({ height }) => cs.h.get(height)};
        }
        .i-btn { ${cs.w.get(14)} ${cs.h.get(14)} }
      }
      .tb-body { ${cs.font.md} ${cs.m.t0} } 
      .tb-head { ${cs.font.md} }
    }

    &.lg { 
      .tb-row { 
        .tb-col {
          ${({ height }) => cs.font.line(height + 10)};
          ${({ height }) => cs.h.get(height + 10)};
        }
      }
      .tb-body { ${cs.font.lg} }
      .tb-head { ${cs.font.xl} }
    }

    
    &.trans {
      .tb-body { ${cs.bg.trans} ${cs.font.dark} 
        .i-btn { .svg-path { ${cs.fill.dark} } }
        .tb-row { .tb-col { ${cs.border.trans} } } 
      }
      .tb-head { ${cs.bg.white} ${cs.font.dark} 
        .tb-row { .tb-col { ${cs.border.trans} } } 
      }
      .selection:hover { ${cs.bg.frame} }
      .btn-new { ${cs.bg.frame} ${cs.font.dark} }
    }
    &.white {
      .tb-body { ${cs.bg.white} ${cs.font.dark} 
        .i-btn { .svg-path { ${cs.fill.dark} } }
        .tb-row { .tb-col { ${cs.border.lightgray} } } 
      }
      .tb-head { ${cs.bg.white} ${cs.font.dark} 
        .tb-row { .tb-col { ${cs.border.lightwhite} } } 
      }
      .selection:hover { ${cs.bg.sky} }
      .btn-new { ${cs.bg.sky} ${cs.font.dark} }
    }
    &.sky {
      .tb-body { ${cs.bg.sky} ${cs.font.dark} 
        .i-btn { .svg-path { ${cs.fill.dark} } }
        .tb-row { .tb-col { ${cs.border.lightgray} } } 
      }
      .tb-head { ${cs.bg.lightgray} ${cs.font.dark} 
        .tb-row { .tb-col { ${cs.border.lightwhite} } } 
      }
      .selection:hover { ${cs.bg.darkwhite} }
      .btn-new { ${cs.bg.sky} ${cs.font.dark} }
    }
    &.primary {
      .tb-body { ${cs.bg.primary} ${cs.font.white} 
      .tb-row { ${cs.border.lightgray} .tb-col { ${cs.border.lightgray} } } 
        .i-btn { .svg-path { ${cs.fill.lightgray} } }
      }
      .tb-head { ${cs.bg.blue} ${cs.font.white} }
      .selection:hover { ${cs.bg.primaryhover} }
      .btn-new { ${cs.bg.primary} ${cs.font.white} }
    }
    &.gray {
      .tb-body { ${cs.bg.lightgray} 
        .tb-row { ${cs.border.lightwhite} .tb-col { ${cs.border.lightwhite} } } 
        .i-btn { .svg-path { ${cs.fill.dark} } }
      }
      .tb-head { ${cs.bg.gray} ${cs.font.black} 
        .tb-row { ${cs.border.lightwhite} .tb-col { ${cs.border.lightwhite} } } 
      }
      .selection:hover { ${cs.bg.grayhover} }
      .btn-new { ${cs.bg.lightblack} ${cs.font.white} }
    }
    &.dark {
      .tb-body { ${cs.bg.dark} ${cs.font.white} 
        .tb-row { ${cs.border.semiblack} .tb-col { ${cs.border.semiblack} } } 
        .i-btn { .svg-path { ${cs.fill.white} } }
      }
      .tb-head { ${cs.bg.black} ${cs.font.white} 
        .tb-row { ${cs.border.semiblack} .tb-col { ${cs.border.semiblack} } } 
      }
      .total-txt { ${cs.font.white} }
      .selection:hover { ${cs.bg.darkhover} }
      .btn-new { ${cs.bg.black} ${cs.font.white} } 
    }
    &.black {
      .tb-body { ${cs.bg.black} ${cs.font.white} 
        .tb-row { ${cs.border.dark} .tb-col { ${cs.border.dark} } } 
        .i-btn { .svg-path { ${cs.fill.white} } }
      }
      .tb-head { ${cs.bg.dark} ${cs.font.white} 
        .tb-row { ${cs.border.black} .tb-col { ${cs.border.black} } } 
      }
      .selection:hover { ${cs.bg.darkhover} }
      .btn-new { ${cs.bg.dark} ${cs.font.white} }
    }
    
    &.theme-sky {
      .tb-body { ${cs.bg.sky} ${cs.font.dark} 
        .i-btn { .svg-path { ${cs.fill.dark} } }
        .tb-row { .tb-col { ${cs.border.lightgray} } } 
      }
      .tb-head { ${cs.bg.lightgray} ${cs.font.dark} 
        .tb-row { .tb-col { ${cs.border.lightwhite} } } 
      }
      .selection:hover { ${cs.bg.darkwhite} }
      .btn-new { ${cs.bg.sky} ${cs.font.dark} }
    }
    &.theme-primary {
      .tb-body { ${cs.bg.primary} ${cs.font.white} 
      .tb-row { ${cs.border.lightgray} .tb-col { ${cs.border.lightgray} } } 
        .i-btn { .svg-path { ${cs.fill.lightgray} } }
      }
      .tb-head { ${cs.bg.blue} ${cs.font.white} }
      .selection:hover { ${cs.bg.primaryhover} }
      .btn-new { ${cs.bg.primary} ${cs.font.white} }
    }
    &.theme-gray {
      .tb-body { ${cs.bg.lightgray} 
        .tb-row { ${cs.border.lightwhite} .tb-col { ${cs.border.lightwhite} } } 
        .i-btn { .svg-path { ${cs.fill.dark} } }
      }
      .tb-head { ${cs.bg.gray} ${cs.font.black} 
        .tb-row { ${cs.border.lightwhite} .tb-col { ${cs.border.lightwhite} } } 
      }
      .selection:hover { ${cs.bg.grayhover} }
      .btn-new { ${cs.bg.lightblack} ${cs.font.white} }
    }
    &.theme-dark {
      .tb-body { ${cs.bg.dark} ${cs.font.white} 
        .tb-row { ${cs.border.semiblack} .tb-col { ${cs.border.semiblack} } } 
        .i-btn { .svg-path { ${cs.fill.white} } }
      }
      .tb-head { ${cs.bg.black} ${cs.font.white} 
        .tb-row { ${cs.border.semiblack} .tb-col { ${cs.border.semiblack} } } 
      }
      .selection:hover { ${cs.bg.darkhover} }
      .btn-new { ${cs.bg.black} ${cs.font.white} }
    }
    &.theme-black {
      .tb-body { ${cs.bg.black} ${cs.font.white} 
        .tb-row { ${cs.border.dark} .tb-col { ${cs.border.dark} } } 
        .i-btn { .svg-path { ${cs.fill.white} } }
      }
      .tb-head { ${cs.bg.dark} ${cs.font.white} 
        .tb-row { ${cs.border.black} .tb-col { ${cs.border.black} } } 
      }
      .selection:hover { ${cs.bg.darkhover} }
      .btn-new { ${cs.bg.dark} ${cs.font.white} }
    }

    ${({ border }) => border && `.tb-frame { ${cs.box.line} .tb-body .tb-row:last-child { ${cs.border.none} } }`}
    ${({ border }) => border && border.color && `.tb-frame { ${cs.border.color(border.color)} }`}
    ${({ border }) => border && border.radius && `.tb-frame { ${cs.border.radius(border.radius)} }`}
    ${({ border }) => border && border.width && `.tb-frame { ${cs.border.width(border.width)} }`}
    
    ${({ font }) => font && font.size && `.tb-body { ${cs.font.size(font.size)} }`}
    ${({ font }) => font && font.color && `.tb-body { ${cs.font.color(font.color)} }`}
    ${({ font }) => font && font.align && `.tb-body { ${cs.font.align(font.align)} }`}
    
    ${({ bgcolor }) => bgcolor && `.tb-body { ${cs.bg.color(bgcolor)} }`}

    .tb-line .tb-row .tb-col.first { ${cs.border.none} }

    @media screen and (max-width : 1280px) {}
  
    @media screen and (max-width : 1024px) {
      .tb-line .tb-row {
        .tb-col.tablet { ${cs.disp.none} }
      }

      .tb-col { ${cs.font.sm} }
    }
  
    @media screen and (max-width : 860px) {
      ${cs.p.a0} ${cs.font.sm} ${cs.p.b30} ${cs.p.t10}
      .tb-line .tb-row {
        .tb-col.mobile { ${cs.disp.none} }
        .i-btn { ${cs.opac.get(0.8)} }
      } 
      
      .tb-col { ${cs.font.sm} }
      .search { ${cs.w.calc('100% - 100px')} }
      .btn-new { ${cs.top(10)} }
    }
  }
}`;

const Tablebox = (props) => {
  const { head = null, total = '', height = 30, theme, rowid, nodata = null } = props;
  const cursor = props.onSelect ? 'pointer' : 'default';
  const align = 'center';
  const style = { cursor, height, align };
  const selection = (cursor === 'pointer');
  const [list, setList] = useState(props.list);

  useEffect(() => {
    setList(props.list);
  }, [props.list]);

  const onSelect = (e) => {
    const rid = e.currentTarget.getAttribute("rowid");
    props.onSelect && props.onSelect(rid, e);
  }

  const onClickDelete = (rid, e) => {
    e.stopPropagation();
    props.onClickDelete && props.onClickDelete(rid, e);
  }

  const onClickPage = (page, e) => {
    props.onClickPage && props.onClickPage(page, e);
  }

  const onClickHead = (e) => {
    const eid = e.currentTarget.getAttribute("eid");
    props.onClickHead && props.onClickHead(eid, e);
  }

  const renderColumnElem = (item, header, pos) => {
    return item.map((col, index) => {
      const { value } = col;
      const { type, tablet = 'show', mobile = 'show', align, flex, getcolor = null, color = null, format = null, formatter = null } = header[index];
      let data = value;

      switch (type) {
        case "datetime": {
          let v = String(value);
          v = value.length === 14 ? `${value.substr(0, 8)} ${value.substr(8, 6)}` : value;
          data = formatter ? formatter(v, list[pos], pos) : moment(v).format(format || "YYYY.MM.DD HH:mm:ss"); break;
        }
        case "date": data = formatter ? formatter(value, list[pos], pos) : moment(`${value} 000000`).format(format || "YYYY.MM.DD"); break;
        case "time": data = formatter ? formatter(value, list[pos], pos) : moment(`00000000 ${value}`).format(format || "HH:mm:ss"); break;
        case "phone": data = formatter ? formatter(value, list[pos], pos) : Util.toStringPhone(value); break;
        case "number": data = formatter ? formatter(value, list[pos], pos) : Util.commas(value); break;
        default: data = formatter ? formatter(value, list[pos], pos) : value; break;
      }

      let styled = { textAlign: align };
      if (type === "color") {
        styled = { 'color': data, 'textTransform': 'uppercase' };
      }

      if (color) {
        styled['color'] = color instanceof Function ? color(value, list[pos], pos) : color;
      }

      const vcolor = getcolor && getcolor(value);
      const first = index === 0;

      return <div key={String(index)} style={{ flex: flex }} className={cx("tb-col", col.key, { first },
        (mobile === 'hide' || tablet === 'hide') && 'mobile', tablet === 'hide' && 'tablet')}>
        {formatter ? <div style={styled} className={cx('tb-p', vcolor)}>{data}</div> : <p style={styled} className={cx('tb-p', vcolor)}>{data}</p>}
      </div>
    })
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
      if (item[rowid] == null || item[rowid] === undefined) {
        guide = "'rowid' is required in the list.\n"
          + "ex. const list = [{ rowid: 'a12345', title: 'title', text: 'text', utime: '20200101' }, {...}\n"
          + "rowid and text is required. Rest is optional.\n"
          + "rowid is used to show or hide text(contents)";
      }
    }

    if (props.onClickMove) {
      guide = "Use onDragDrop() instead of onClickMove()";
    }

    if (guide) {
      return <Guidebox text={guide} />
    }
  }

  const makeTableItem = (slist = null, tags = []) => {
    if (slist && tags) {
      return slist.map(item => {
        let temps = [];
        tags.map(key => temps = [...temps, { key: key, value: item[key] }]);
        return temps;
      })
    } else {
      return null;
    }
  }

  // 테이블 아이템중에 head에 설정된 col만 추출하자.
  const tlist = makeTableItem(list, head && head.map(item => item.key));
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
  }, [list, props]);

  return (
    <StyledObject className={cx('table-box', props.className, theme && `theme-${theme}`)} {...style}
      border={props.border} font={props.font} bgcolor={props.bgcolor} >

      <SearchFrame searchs={props.searchs} searchkey={props.searchkey}
        onClickSearch={props.onClickSearch && ((value, key, e) => props.onClickSearch(value, key, e))}
        onClickNew={props.onClickNew && ((e) => props.onClickNew(e))} />

      {/* error guid */}
      {renderGuide()}

      <div className={"tb-frame"}>
        {/* head */}
        {head && <div className="tb-line tb-head">
          <div className="tb-row" >
            {props.onDragDrop && <Svg className="i-btn btn-head sm" name={""} />}
            {head.map((item, index) => {
              const { tablet = 'show', mobile = 'show', flex, unit = '' } = item;
              const first = index === 0;
              return <div key={index} style={{ flex: flex }} onClick={onClickHead} eid={item.id}
                className={cx("tb-col", item.id, item.key, { first },
                  (mobile === 'hide' || tablet === 'hide') && 'mobile', tablet === 'hide' && 'tablet')}>{item.title}
                {unit && <span className="tb-u">{`[${unit}]`}</span>}
              </div>
            })}
            {props.onClickDelete && <Svg className="i-btn btn-head btn-del sm" name={""} />}
          </div>
        </div>}

        {/* {!tlist && <div className="no-data"><Nodata /></div>} */}
        {/* body */}
        {tlist && tlist.length > 0 && <DndProvider backend={Backend}>
          {tlist && <ul className="tb-line tb-body">
            {/* row */}
            {tlist.map((item, index) => {
              const rid = props.rowid != null ? list[index][props.rowid] : list[index]['rowid'];
              const active = Number(props.sel) === Number(index);
              const color = props.activeColor ? props.activeColor : '';

              return (
                <Dragable key={rid} id={rid} index={index} onDragDrop={dragdrop ? onDragDrop : null} disable={!dragdrop} >
                  <li className={cx("tb-row green", color, { selection }, { active }, props.onClickDelete && 'delete')}
                    rowid={rid} onClick={onSelect} eid={EID.SELECT}>
                    {/* col */}
                    {props.onDragDrop &&
                      <Svg className="i-btn btn-move sm" eid={rid} name={"move"} />
                    }
                    {renderColumnElem(item, head, index)}
                    {props.onClickDelete &&
                      <Svg className="i-btn btn-del sm" onClick={onClickDelete} eid={rid} name={"delete"} />
                    }
                  </li>
                </Dragable>)
            })}
          </ul>}
        </DndProvider>}
        {(nodata && (!tlist || tlist.length < 1)) && <Nodata className={'sm center middle'} title={nodata} />}
      </div>

      {total && <div className="total-txt">{`${ST.TOTAL} : ${total}`}</div>}

      {/* page navi */}
      <Pagenavi className={cx(props.theme, props.naviClass)} pos={props.pos || 1} max={props.max || 1} onItemClick={onClickPage} />
    </StyledObject >
  );
}

export default Tablebox;