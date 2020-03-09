import React from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import { Search, Pagenavi, Nodata, Util, Svg, cs, Button, Guidebox } from './index';
import { EID, ST } from './Config';

const StyledObject = styled.div`{
  &.list-box {
    ${cs.noliststyle} ${cs.noselect}
    ${cs.w.full} ${cs.z.front} ${cs.h.fit} ${cs.pos.relative}
    ${cs.box.line} ${cs.border.trans} ${cs.max.height("100%")} ${cs.opac.show}

    .search-box { ${cs.w.half} ${cs.disp.inblock} }
    .btn-new { ${cs.pos.rtop} ${cs.pos.absolute} ${cs.z.front} ${cs.w.get(70)} }
    
    .li-body {
      .lbx-li { ${cs.pos.relative} ${cs.h.auto} ${cs.border.bottom} ${cs.min.height(20)}
        ${cs.p.get("4px 10px")}
        
        .lbx-tl { 
          padding: 5px 10px; position: relative;
          &.right { text-align: right };
          &.left { text-align: left };
          &.center { text-align: center };
        }

        .lbx-date { 
          position: absolute; font-size: 12px; line-height: 18px; opacity: 0.7;
          padding: 0 5px; z-index: 1; ${cs.bg.alphagray} ${cs.box.round}

          &.top { right: 0px; top: 0px; }
          &.right { ${cs.align.rbottom} }
          &.bottom { right: 0px; bottom: 0px; }
          &.left { ${cs.align.lbottom} }
          &.center { ${cs.align.bottom} bottom: -10px; }
        }

        .lbx-cnt {
          margin-left: 10px; min-width: 20px; font-size: 10px; padding: 1px 5px;
          ${cs.font.dark} ${cs.bg.lightgray} ${cs.box.round} ${cs.align.ycenter} position: relative;
        }

        &.selection { cursor: pointer; 
          &:hover { ${cs.bg.primary} }
        }

        &.active {  ${cs.bg.primary} }
      }

      &.disable { color: #ffffffaf; opacity: 0.8;
        &.selection { cursor: default;  &:hover { ${cs.opac.show} } }
      }

      .total-txt { text-align: right; padding: 3px; font-size: 11px; opacity: 0.7; }
    }

    .page-navi { margin-top: 40px; }

    @media screen and (max-width : 860px) { 
      padding: 10px; position: relative;
      .search { width: calc(100% - 100px); }
      .btn-new { right: 10px; }
    }
  }
}`

const Listbox = (props) => {
  const {
    divider, list = null, children = null, rowid = 'rowid',
    title = 'title', date = 'date', count = 'count', disable = false
  } = props;

  let styled = {};
  if (divider != null) {
    styled.borderBottom = divider;
    if (divider.indexOf(" ") <= 1) {
      styled.borderBottom += ' solid #ccc';
    }
  }

  const onSelect = (e) => {
    if (disable) return;
    const rowid = e.currentTarget.getAttribute('rowid');
    props.onSelect && props.onSelect(rowid, e);
  }

  const onClickNew = (eid, e) => {
    props.onClickNew && props.onClickNew(e);
  }

  const onClickPage = (page, e) => {
    props.onPageClick && props.onPageClick(page, e);
  }

  const onClickSearch = (value, e) => {
    props.onClickSearch && props.onClickSearch(value, e);
  }

  // const renderList = (title, list) => {
  //   // const array = list.map(item => { return { "key": key, value: item[key] } });
  //   const talign = props.titlealign || 'left';
  //   const dalign = props.datealign || 'right';
  //   const calign = props.countalign || 'right';
  //   const selection = (props.onSelect !== null);

  //   return list.map((item, index) => {
  //     const active = false; //selpos === index;
  //     const stitle = item[title] || '';
  //     const sdate = item[date] ? Util.toStringSymbol(item[date]) : '';
  //     const scount = item[count] >= 0 ? item[count] : -1;

  //     return <li key={index} className={cx("lbx-li", { selection }, { active })} rowid={item[rowid]} onClick={onSelect}>
  //       <p className={cx('lbx-tl', talign)}>{stitle}
  //         {scount >= 0 && <span className={cx('lbx-cnt', calign)}>{scount}</span>}
  //       </p>
  //       <p className={cx('lbx-date', dalign)}>{sdate}</p>
  //       {props.onClickDelete &&
  //         <Svg className="i-btn btn-del sm" onClick={this.onClickDelete} eid={rowid} name={"delete"} color={'white'} />
  //       }
  //     </li>
  //   })
  // }


  // const renderGuide = () => {
  //   if (data && data[0]) {
  //     const item = data[0];
  //     if (item.rowid == null || item.rowid === undefined) {
  //       guide = "'rowid' is required in the list.\n"
  //         + "ex. const list = [{ rowid: 'a12345', title: 'callopse', text: 'callopse test', utime: '20200101' }, {...}\n"
  //         + "rowid and text is required. Rest is optional.\n"
  //         + "rowid is used to show or hide text(contents)";
  //     }
  //   }

  //   if (guide) {
  //     return <Guidebox text={guide} />
  //   }
  // }

  const talign = props.titlealign || 'left';
  const dalign = props.datealign || 'right';
  const calign = props.countalign || 'right';
  const selection = (props.onSelect !== null);

  return (
    <StyledObject className={cx("list-box", props.className, { disable })} eid="select" style={styled}>
      {props.onClickSearch && <Search guide={ST.SEARCH} onClick={onClickSearch} className="search box" list={props.searchs} searchkey={props.searchkey} />}
      {props.onClickNew && <Button className="btn-new green md" title={ST.ADD} onClick={onClickNew} eid={EID.NEW} />}

      {/* error guid */}
      {/* {renderGuide()} */}

      {/* no data view */}
      {!list && <div className="frame"><Nodata /></div>}

      {children && children}
      {list && <ul className={"li-body"}>
        {list.map((item, index) => {
          const stitle = item[title] || '';
          const sdate = item[date] ? Util.toStringSymbol(item[date]) : '';
          const scount = item[count] >= 0 ? item[count] : -1;

          return <li key={index} className={cx("lbx-li", { selection })} rowid={item[rowid]} onClick={onSelect}>
            <p className={cx('lbx-tl', talign)}>{stitle}
              {scount >= 0 && <span className={cx('lbx-cnt', calign)}>{scount}</span>}
            </p>
            <p className={cx('lbx-date', dalign)}>{sdate}</p>
            {props.onClickDelete &&
              <Svg className="i-btn btn-del sm" onClick={this.onClickDelete} eid={rowid} name={"delete"} color={'white'} />
            }
          </li>
        })}
        <div className="total-txt">{`${ST.TOTAL} : ${props.total}`}</div>
      </ul>}

      {/* page navi */}
      <Pagenavi pos={props.pos} max={props.max} onItemClick={onClickPage} color="white" />
    </StyledObject >
  );
};

export default Listbox;