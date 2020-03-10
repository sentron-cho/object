import React from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import { Search, Pagenavi, Nodata, Util, Svg, Button, cs, Guidebox } from './index';
import { EID, ST } from './Config';

const StyledObject = styled.div`{
  &.table-box { 
    ${cs.pos.relative} ${cs.font.dark} ${cs.noliststyle}

    .search-box { ${cs.w.half} ${cs.disp.inblock} }
    .btn-new { ${cs.pos.rtop} ${cs.pos.absolute} ${cs.z.front} ${cs.w.get(70)} }
    
    .tb-line { ${cs.w.full} ${cs.h.fit} ${cs.disp.block} 
      ${cs.pos.relative} ${cs.font.md} ${cs.noselect}

      .tb-row { 
        ${cs.w.full} ${cs.pos.relative} ${cs.disp.get("flex; flex-direction: row;")}
        ${cs.border.bottom}
        ${({ height }) => cs.font.line(height)};
        ${({ height }) => cs.h.get(height)};
        cursor: ${(props) => props.cursor};

        .tb-col {  
          ${cs.font.center} ${cs.disp.inblock} ${cs.p.v4} ${cs.h.full}
          ${cs.over.hidden} ${cs.font.ellipsis}
          ${({ flex }) => flex && cs.disp.flex(flex)};
          ${cs.border.right} ${cs.border.white}

          p { ${cs.font.ellipsis} ${({ align }) => cs.font.align(align)}; }

          // &:nth-child(1) { ${cs.p.l10} }
          &:last-child { ${cs.border.none} }
        }

        .btn-head { ${cs.disp.hidden} }

        &:hover {
          .i-btn { ${cs.opac.show} ${cs.anim.show} }
        }

        .i-btn { ${cs.align.ycenter} ${cs.z.icon} ${cs.opac.hide} ${cs.pos.relative}
          &.btn-del { ${cs.right(5)} ${cs.pos.relative} ${cs.m.l10} }
          &.btn-move { ${cs.left(5)} ${cs.pos.relative} }
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

      &.tb-head { ${cs.font.lg} ${cs.font.weight(600)} ${cs.bg.gray} ${cs.m.t10}
        .tb-row { .tb-col { ${cs.border.darkgray} } } 
      }

      .selection {
        &:hover { ${cs.bg.hover} }
      }
    }
    
    .total-txt { ${cs.font.right} ${cs.p.a3} ${cs.font.sm} ${cs.opac.get(0.7)} }
    .page-navi { ${cs.m.t40} }

    
    &.sm { 
      .tb-row { 
        ${({ height }) => cs.font.line(height - 6)};
        ${({ height }) => cs.h.get(height - 6)};
        .i-btn { ${cs.w.get(14)} ${cs.h.get(14)} }
      }
      .tb-body { ${cs.font.sm} } 
      .tb-head { ${cs.font.md} }
    }

    &.lg { 
      .tb-row { 
        ${({ height }) => cs.font.line(height + 6)};
        ${({ height }) => cs.h.get(height + 6)};
      }
      .tb-body { ${cs.font.lg} }
      .tb-head { ${cs.font.xl} }
    }

    
    &.primary {
      .tb-body { ${cs.bg.primary} ${cs.font.white} 
        .i-btn { .svg-path { ${cs.fill.lightgray} } }
      }
      .tb-head { ${cs.bg.blue} ${cs.font.white} }

      .selection:hover { ${cs.bg.primaryhover} }
    }
    &.gray {
      .tb-body { ${cs.bg.lightgray} 
        .tb-border { ${cs.border.semiblack} } 
        .i-btn { .svg-path { ${cs.fill.dark} } }
      }
    }
    &.dark {
      .tb-body { ${cs.bg.dark} ${cs.font.white} 
        .tb-border { ${cs.border.black} } 
        .i-btn { .svg-path { ${cs.fill.white} } }
      }
      .tb-head { ${cs.bg.black} ${cs.font.white} }
      .selection:hover { ${cs.bg.primaryhover} }
    }

    @media screen and (max-width : 1280px) {}
  
    @media screen and (max-width : 1024px) {
      .tb-line .tb-row {
        .tb-col.tablet { ${cs.disp.none} }
      }

      .tb-col {font-size: 13px;}
    }
  
    @media screen and (max-width : 860px) {
      padding: 0; font-size: 12px; padding-bottom: 30px; padding-top: 10px;
      .tb-line .tb-row {
        .tb-col.mobile { display: none; }
        .i-btn { opacity: 0.8; }
      } 
      
      .tb-col {font-size: 12px;}
      .search { width: calc(100% - 100px); }
      .btn-new { top: 10px; }
    }
  }
}`;

const Tablebox = (props) => {
  const { head = null, list = null, total = '', height = 30 } = props;
  const cursor = 'pointer'; //props.onSelect ? 'pointer' : 'default';
  const align = 'center';
  const style = { cursor, height, align };
  const selection = (cursor === 'pointer');

  const onSelect = (e) => {
    const rowid = e.currentTarget.getAttribute("rowid");
    props.onSelect && props.onSelect(rowid, e);
  }

  const onClickDelete = (rowid, e) => {
    e.stopPropagation();
    props.onClickDelete && props.onClickDelete(rowid, e);
  }

  const onClickNew = (eid, e) => {
    props.onClickNew && props.onClickNew(e);
  }

  const onClickPage = (page, e) => {
    props.onClickPage && props.onClickPage(page, e);
  }

  const onClickSearch = (value, key, e) => {
    props.onClickSearch && props.onClickSearch(value, key, e);
  }

  const onClickHead = (e) => {
    const eid = e.currentTarget.getAttribute("eid");
    props.onClickHead && props.onClickHead(eid, e);
  }

  const onClickMove = (rowid, e) => {
    e.stopPropagation();
    props.onClickMove && props.onClickMove(rowid, e);
  }

  const renderColumnElem = (item, head) => {
    return item.map((col, index) => {
      const { value } = col;
      const { type, tablet = 'show', mobile = 'show', align, flex } = head[index];
      let data = value;

      switch (type) {
        case "datetime": data = Util.toStringSymbol(value); break;
        case "date": data = Util.toStringSymbol(value).substr(0, 10); break;
        case "phone": data = Util.toStringPhone(value); break;
        default: data = value; break;
      }

      let color = {};
      if (type === "color") {
        // let textb-color = parseInt(Util.replaceAll(data, "#", ""), 16);
        // textb-color = textb-color ^ 0xffffff;
        // textb-color = (textb-color + 0x1000000).toString(16).substr(-6).toUpperCase();
        // color = { 'background': data, 'color': `#${textb-color}` };
        color = { 'color': data, 'textTransform': 'uppercase' }
      }

      const styled = { flex: flex, textAlign: align };
      return <div key={String(index)} style={styled} className={cx("tb-col", col.key, (mobile === 'hide' || tablet === 'hide') && 'mobile', tablet === 'hide' && 'tablet')}>
        <p style={color}>{data}</p>
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
      if (item.rowid == null || item.rowid === undefined) {
        guide = "'rowid' is required in the list.\n"
          + "ex. const list = [{ rowid: 'a12345', title: 'title', text: 'text', utime: '20200101' }, {...}\n"
          + "rowid and text is required. Rest is optional.\n"
          + "rowid is used to show or hide text(contents)";
      }
    }

    if (guide) {
      return <Guidebox text={guide} />
    }
  }

  const makeTableItem = (list = null, tags = []) => {
    if (list && tags) {
      return list.map(item => {
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

  return (
    <StyledObject className={cx('table-box', props.className)} {...style}>
      {props.onClickSearch && <Search guide={ST.SEARCH} onClick={onClickSearch} className="" list={props.searchs} searchkey={props.searchkey} />}
      {props.onClickNew &&
        <Button className="btn-new green md" title={ST.ADD} onClick={onClickNew} eid={EID.NEW} />
        // <Svg className="btn-new md" onClick={onClickNew} eid={EID.NEW} name={"editable"} color={'white'} />
      }

      {/* error guid */}
      {renderGuide()}

      {/* head */}
      {head && <div className="tb-line tb-head">
        <div className="tb-row" >
          {props.onClickMove && <Svg className="i-btn btn-head sm" name={""} />}
          {head.map((item, index) => {
            const { tablet = 'show', mobile = 'show', flex } = item;
            const styled = { flex: flex, };
            return <div key={index} style={styled} onClick={onClickHead} eid={item.id}
              className={cx("tb-col", item.id, item.key, (mobile === 'hide' || tablet === 'hide') && 'mobile',
                tablet === 'hide' && 'tablet')} >{item.title}</div>
          })}
          {props.onClickDelete && <Svg className="i-btn btn-head btn-del sm" name={""} />}
        </div>
      </div>}

      {/* {!tlist && <div className="no-data"><Nodata /></div>} */}
      {/* body */}
      {tlist && <ul className="tb-line tb-body">
        {/* row */}
        {tlist.map((item, index) => {
          const rowid = props.rowid != null ? list[index][props.rowid] : list[index]['rowid'];
          const active = Number(props.sel) === Number(index);
          const color = props.activeColor ? props.activeColor : '';
          return <li className={cx("tb-row green", color, { selection }, { active }, props.onClickDelete && 'delete')}
            key={String(index)} rowid={rowid} onClick={onSelect} eid={EID.SELECT}>
            {/* col */}
            {props.onClickMove &&
              <Svg className="i-btn btn-move sm" onClick={onClickMove} eid={rowid} name={"move"} />
            }
            {renderColumnElem(item, head)}
            {props.onClickDelete &&
              <Svg className="i-btn btn-del sm" onClick={onClickDelete} eid={rowid} name={"delete"} />
            }
          </li>
        })}
      </ul>}

      {total && <div className="total-txt">{`${ST.TOTAL} : ${total}`}</div>}

      {/* page navi */}
      <Pagenavi className={props.className} pos={props.pos} max={props.max} onItemClick={onClickPage} />
    </StyledObject>
  );
}

export default Tablebox;