import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { SearchFrame, Pagenavi, Nodata, Util, Svg, cs, Guidebox, Dragable } from './index';
import { ST } from './Config';

const StyledObject = styled.div`{
  &.list-box {
    ${cs.pos.relative} ${cs.noliststyle}

    .search-frame { ${cs.m.b10} }
    
    .lbx-body {
      ${cs.pos.relative} ${cs.size.hauto} ${cs.font.md}
      ${cs.box.inner} ${cs.noselect} ${cs.font.dark} ${cs.over.hidden}

      .lbx-li { ${cs.pos.relative} ${cs.h.auto} ${cs.border.bottom} ${cs.border.gray}
        ${({ height }) => cs.h.get(height)};
        ${cs.p.get("4px 10px")}
        
        .lbx-tl { ${cs.align.ycenter} ${cs.pos.relative} ${cs.disp.inblock}
          ${cs.font.ellipsis} ${cs.max.w("calc(100% - 80px)")}
          &.left { ${cs.font.left} };
          &.center { ${cs.font.center} };
          &.right { ${cs.font.right} };
        }

        .lbx-date { 
          ${cs.pos.absolute} ${cs.opac.get(0.7)} ${cs.p.h5} ${cs.box.round} ${cs.z.front} ${cs.font.xs}

          &.top { ${cs.pos.rtop} }
          &.right { ${cs.pos.rbottom} &.delete { ${cs.right(30)} } }
          &.bottom { ${cs.pos.rbottom} }
          &.left { ${cs.pos.lbottom} }
          &.center { ${cs.pos.bottom} ${cs.bottom(-10)} }
        }

        .lbx-cnt {
          ${cs.m.l10} ${cs.min.width(8)} ${cs.font.xs} ${cs.p.h5}
          ${cs.bg.sky} ${cs.box.round} ${cs.align.ycenter} ${cs.pos.relative}
        }

        .lbx-icon {
          ${cs.align.right} ${cs.opac.hide} ${cs.right(5)} ${cs.align.ycenter} 
        }

        .btn-move { ${cs.left(-5)} ${cs.align.ycenter} ${cs.pos.relative} ${cs.m.r0} ${cs.opac.get(0.3)} }

        &.selection { ${cs.mouse.pointer}
          &:hover, &.active { ${cs.bg.hover} 
            .lbx-icon { ${cs.opac.alpha} &:hover { ${cs.opac.show} } }
            .btn-move { ${cs.opac.show} }
          }
        }

        &.active {  ${cs.bg.hover} }
      }

      &.disable { ${cs.font.gray} ${cs.opac.get(0.8)}
        &.selection { ${cs.mouse.default}  &:hover { ${cs.opac.show} } }
      }

    }

    .total-txt { ${cs.font.right} ${cs.p.a3} ${cs.m.t5} ${cs.font.sm} ${cs.opac.get(0.7)} }
    .page-navi { ${cs.m.t10} }

    &.border { .lbx-body { ${cs.box.line} .lbx-li:last-child { ${cs.border.trans} } } }

    &.sm { 
      .lbx-body { ${cs.font.sm} 
        .lbx-li { 
          ${({ height }) => cs.h.get(height - 6)};
        }
      } 
    }

    &.lg { 
      .lbx-body { ${cs.font.lg} 
        .lbx-li { 
          ${({ height }) => cs.h.get(height + 6)};
        }
      }
    }

    &.sky {
      .lbx-body { ${cs.bg.sky} ${cs.font.black}
        .lbx-cnt { ${cs.bg.get("#a4e2ff")} ${cs.font.primary} }
        .lbx-date { ${cs.bg.primary} ${cs.font.white} }
        .lbx-li.selection:hover, &.lbx-li.selection.active { ${cs.bg.lightgray} }
        .lbx-icon { .svg-path { ${cs.fill.dark} } } 
      }
      .btn-new { ${cs.bg.sky} ${cs.font.dark} }
    }
    &.primary {
      .lbx-body { ${cs.bg.primary} ${cs.font.white}
        .lbx-cnt { ${cs.bg.get("#a4e2ff")} ${cs.font.blue} }
        .lbx-date { ${cs.bg.blue} ${cs.font.white} }
        .lbx-li.selection:hover, .lbx-li.selection.active { ${cs.bg.primaryhover} }
        .lbx-icon { .svg-path { ${cs.fill.white} } } 
      }
      .btn-new { ${cs.bg.primary} ${cs.font.white} }
    }
    &.gray {
      .lbx-body { ${cs.bg.lightgray} 
        .lbx-li.selection:hover, .lbx-li.selection.active { ${cs.bg.grayhover} }
        .lbx-icon { ${cs.opac.get(0.5)} .svg-path { ${cs.fill.white} } } 
      }
      .btn-new { ${cs.bg.lightblack} ${cs.font.white} }
    }
    &.dark {
      .lbx-body { ${cs.bg.dark} ${cs.font.white} 
        .lbx-cnt { ${cs.bg.lightgray} ${cs.font.dark} }
        .lbx-li.selection:hover, .lbx-li.selection.active { ${cs.bg.black} }
        .lbx-icon { .svg-path { ${cs.fill.white} } } 
      }
      .btn-new { ${cs.bg.black} ${cs.font.white} }
    }
    &.black {
      .lbx-body { ${cs.bg.black} ${cs.font.white} 
        .lbx-cnt { ${cs.bg.lightgray} ${cs.font.black} }
        .lbx-li.selection:hover, .lbx-li.selection.active { ${cs.bg.darkhover} }
        .lbx-icon { .svg-path { ${cs.fill.white} } } 
      }
      .btn-new { ${cs.bg.black} ${cs.font.white} }
    }

    &.theme-sky {
      .lbx-body { ${cs.bg.sky} ${cs.font.black}
        .lbx-cnt { ${cs.bg.get("#a4e2ff")} ${cs.font.primary} }
        .lbx-date { ${cs.bg.primary} ${cs.font.white} }
        .lbx-li.selection:hover, .lbx-li.selection.active { ${cs.bg.lightgray} }
        .lbx-icon { .svg-path { ${cs.fill.dark} } } 
      }
      .btn-new { ${cs.bg.sky} ${cs.font.dark} }
    }
    &.theme-primary {
      .lbx-body { ${cs.bg.primary} ${cs.font.white}
        .lbx-cnt { ${cs.bg.get("#a4e2ff")} ${cs.font.blue} }
        .lbx-date { ${cs.bg.blue} ${cs.font.white} }
        .lbx-li.selection:hover, .lbx-li.selection.active { ${cs.bg.primaryhover} }
        .lbx-icon { .svg-path { ${cs.fill.white} } } 
      }
      .btn-new { ${cs.bg.primary} ${cs.font.white} }
    }
    &.theme-gray {
      .lbx-body { ${cs.bg.lightgray} 
        .lbx-li.selection:hover, .lbx-li.selection.active { ${cs.bg.grayhover} }
        .lbx-icon { ${cs.opac.get(0.5)} .svg-path { ${cs.fill.white} } } 
      }
      .btn-new { ${cs.bg.lightblack} ${cs.font.white} }
    }
    &.theme-dark {
      .lbx-body { ${cs.bg.dark} ${cs.font.white} 
        .lbx-cnt { ${cs.bg.lightgray} ${cs.font.dark} }
        .lbx-li.selection:hover, .lbx-li.selection.active { ${cs.bg.darkhover} }
        .lbx-icon { .svg-path { ${cs.fill.white} } } 
      }
      .btn-new { ${cs.bg.black} ${cs.font.white} }
    }
    &.theme-black {
      .lbx-body { ${cs.bg.black} ${cs.font.white} 
        .lbx-cnt { ${cs.bg.lightgray} ${cs.font.black} }
        .lbx-li.selection:hover, .lbx-li.selection.active { ${cs.bg.darkhover} }
        .lbx-icon { .svg-path { ${cs.fill.white} } } 
      }
      .btn-new { ${cs.bg.black} ${cs.font.white} }
    }

    ${({ border }) => border && `.lbx-body { ${cs.box.line} .lbx-li:last-child { ${cs.border.trans} } }`}
    ${({ border }) => border && border.color && `.lbx-body { ${cs.border.color(border.color + " !important")} }`}
    ${({ border }) => border && border.radius && `.lbx-body { ${cs.border.radius(border.radius + " !important")} }`}
    ${({ border }) => border && border.width && `.lbx-body { ${cs.border.width(border.width + " !important")} }`}
    
    ${({ font }) => font && font.size && `.lbx-body { ${cs.font.size(font.size + " !important")} }`}
    ${({ font }) => font && font.color && `.lbx-body { ${cs.font.color(font.color)} }`}
    ${({ font }) => font && font.align && `.lbx-body { ${cs.font.align(font.align)} }`}
    
    ${({ bgcolor }) => bgcolor && `.lbx-body { ${cs.bg.color(bgcolor)} }`}

    @media screen and (max-width : 860px) { 
      ${cs.p.a0} ${cs.font.sm} ${cs.p.b30} ${cs.p.t10}
      .search { ${cs.w.calc("100% - 100px")} }
      .btn-new { ${cs.top(10)} }
    }
  }
}`

const Listbox = (props) => {
  const {
    divider, children = null, total = 0, theme, rowid, selpos = -1,
    disable = false, height = 30, formatter = null,
  } = props;
  const [list, setList] = useState(props.list);

  useEffect(() => {
    setList(props.list);
  }, [props.list])

  let styled = {};
  if (divider != null) {
    styled.borderBottom = divider;
    if (divider.indexOf(" ") <= 1) {
      styled.borderBottom += ' solid #ccc';
    }
  }

  const onSelect = (e, item) => {
    if (disable) return;
    const rid = e.currentTarget.getAttribute('rowid');
    props.onSelect && props.onSelect(rid, e, item);
  }

  const onClickPage = (page, e) => {
    props.onClickPage && props.onClickPage(page, e);
  }

  const onClickDelete = (eid, e) => {
    e.stopPropagation();
    // const rowid = e.currentTarget.getAttribute('rowid');
    const rid = eid;
    props.onClickDelete && props.onClickDelete(rid, e);
  }

  const { titlealign = 'left', datealign = 'right', countalign = 'right' } = props;
  const selection = (props.onSelect !== null);

  const renderGuide = () => {
    let guide = null;
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
    <StyledObject className={cx("list-box", props.className, { disable }, theme && `theme-${theme}`)}
      eid="select" style={styled} height={height}
      border={props.border} font={props.font} bgcolor={props.bgcolor} >

      <SearchFrame searchs={props.searchs} searchkey={props.searchkey}
        onClickSearch={props.onClickSearch && ((value, key, e) => props.onClickSearch(value, key, e))}
        onClickNew={props.onClickNew && ((e) => props.onClickNew(e))} />

      {/* error guid */}
      {renderGuide()}

      {/* no data view */}
      {(!list || list.length < 1) && <div className="frame"><Nodata /></div>}

      {children && children}

      <DndProvider backend={Backend}>
        {list && <ul className={"lbx-body"}>
          {list.map((item, index) => {
            const rid = rowid != null ? list[index][rowid] : list[index]['rowid'];
            const active = selpos === index;

            return (
              <Dragable key={rid} id={rid} index={index} onDragDrop={dragdrop ? onDragDrop : null} disable={!dragdrop} >
                <li key={index} className={cx("lbx-li", { selection }, { active })} rowid={item[rowid]} onClick={(e) => onSelect(e, item)}>
                  {props.onDragDrop &&
                    <Svg className="i-btn btn-move xs" eid={rid} name={"move"} />
                  }

                  {formatter ? formatter(item) : <Line titlealign={titlealign} countalign={countalign} datealign={datealign} item={item} />}
                  {/* <p className={cx('lbx-tl', titlealign)}>{stitle}
                      {scount >= 0 && <span className={cx('lbx-cnt', countalign)}>{scount}</span>}
                    </p>
                    {sdate && <p className={cx('lbx-date', datealign, props.onClickDelete && 'delete')}>{sdate}</p>}
                  </div> */}

                  {props.onClickDelete &&
                    <Svg className="lbx-icon sm" name={'delete'} color={cs.color.darkgray} onClick={onClickDelete} eid={item[rowid]} />
                  }
                </li>
              </Dragable>
            )
          })}
        </ul>}
      </DndProvider>

      {total > 0 && <div className="total-txt">{`${ST.TOTAL} : ${total}`}</div>}

      {/* page navi */}
      <Pagenavi className={cx(props.theme, props.naviClass)} pos={props.pos || 1} max={props.max || 1} onItemClick={onClickPage} />
      {/* {props.onClickPage && <Pagenavi className={props.className} pos={props.pos} max={props.max} onItemClick={onClickPage} />} */}
    </StyledObject >
  );
};

const Line = (props) => {
  const { titlealign, countalign, datealign, item } = props;
  const { title, date, count } = props.keys || { title: 'title', date: 'date', count: 'count' };

  const stitle = item[title] || '';
  const sdate = item[date] ? Util.toStringSymbol(item[date].substr(0, 8)) : '';
  const scount = item[count] >= 0 ? item[count] : -1;

  return <span>
    <span className={cx('lbx-tl', titlealign)}>{stitle}
      {scount >= 0 && <span className={cx('lbx-cnt', countalign)}>{scount}</span>}
    </span>
    {sdate && <span className={cx('lbx-date', datealign, props.onClickDelete && 'delete')}>{sdate}</span>}
  </span>
}

export default Listbox;