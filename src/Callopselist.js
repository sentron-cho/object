import React, { useState } from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import { Search, Pagenavi, Nodata, Util, Svg, Button, Guidebox, cs } from './index';
import { EID, ST } from './Config';

const style = {
  border: '1px solid rgba(180, 180, 180, 0.2)',
};

const StyledObject = styled.div`{
  &.callopse-list { ${cs.pos.relative} ${cs.font.dark} ${cs.noliststyle}
    .search-box { ${cs.w.half} ${cs.disp.inblock} }
    .btn-new { ${cs.pos.rtop} ${cs.pos.absolute} ${cs.z.front} ${cs.w.get(70)} }
    
    .csl-body { ${cs.pos.relative} ${cs.size.hauto} ${cs.font.md} ${cs.m.t20}
      ${({ boxHeight }) => boxHeight && cs.min.height(boxHeight)}; 
      // ${({ border }) => border && cs.border.top(border)};

      .csl-row { ${cs.w.full} ${cs.disp.block} ${cs.p.a0} ${cs.h.fit} ${cs.over.yhidden}
        ${({ height }) => cs.font.line(height)};
        ${({ height }) => cs.min.height(height)};
        ${({ height }) => cs.h.get(height)};

        ${cs.border.top}

        &.show { 
          ${cs.h.fit} 
          animation: slidedown linear 1 forwards 0.2s; 
          @keyframes slidedown { 
            from  { ${({ height }) => cs.h.get(height)} opacity: 1; } 
            to { ${cs.h.get(140)}; opacity: 1; } 
          };
        }
        &:last-child { ${cs.border.bottom} }

        // border-bottom: ${style.border};
        // border-left: ${style.border};
        // border-right: ${style.border};
        .csl-line { display: flex; flex-direction: row;
          cursor: ${(props) => props.cursor}; 
        }
        .csl-col { text-align: ${(props) => props.align}; display: inline-block; overflow: hidden; padding: 4px; 
            text-overflow: ellipsis; vertical-align: middle; white-space: nowrap; padding: 0 4px; flex: 1 1 60px;
            flex: ${(props) => props.flex};
        }

        .csl-col:first-child { padding-left: 10px; }
        .csl-col:last-child { padding-right: 10px; }
      }

      .csl-cont { ${cs.border.lightwhite} ${cs.p.a10} //${cs.anim.showin("3s")}
        ${cs.h.fit} ${cs.font.prewrap} ${cs.over.yhidden} ${cs.pos.relative}
        // animation: slidedown linear 1 forwards 3s; 
        // @keyframes slidedown { 
        //   from  { transform: translateY(calc(-100% + ${({height}) => height}px)); opacity: 0.3; } 
        //   to { transform: translateY(0%); opacity: 1; } 
        // };

        // &.show, &.active { min-height: 0px; margin: 5px 0; padding: 10px; height: auto; max-height: auto; 
        //   display: block; overflow-y: auto; background: rgba(180, 180, 180, 0.1); }
  
        .cslc-child { min-height: 120px;
          .image>img { padding: 10px; text-align: center; display: block; margin: 0 auto; max-width: 100%; } 
          .image-style-side { float: right; margin-left: 1.5em; max-width: 50%; }

          figcaption { margin: 10px; background: rgba(0,0,0,0.1); } 

          .btn-edit { ${cs.align.rtop} ${cs.opac.hide} ${cs.anim.hide} }

          &.eidatable { cursor: pointer; 
            &:hover { .btn-edit { ${cs.opac.show} } ${cs.anim.show} }
          }
        }
      }

      .csl-col-button { position: absolute; float: right; right: 0; }

      .iframe-layer { width: 90%; min-height: 40vw; border: 2px solid rgba(255, 255, 255, 0.5); 
        position: relative; left: 50%; transform: translateX(-50%); padding: 3px; border-radius: 5px;
      }
    }
    
    .page-navi { margin-top: 40px; }

    @media screen and (max-width : 1280px) {
    }

    @media screen and (max-width : 1024px) {
    }

    @media screen and (max-width : 860px) {
      padding: 0; font-size: 12px; 
      .top-frame { padding: 10px 0; padding-right: 50px;
        .search-box { width: 100%; }
        .info-label { float: right; position: absolute; top: 70px; right: 0; height: 50px;
          .info { display: none; }
        }
      }

      .btn-new { top: 20px; }
    }
  }
}`;

const Callopselist = (props) => {
  const onSelect = (e) => {
    const rowid = e.currentTarget.getAttribute("rowid");
    setSelect(rowid === select ? -1 : rowid);
    props.onSelect && props.onSelect(rowid, e);
  }

  const onClickNew = (eid, e) => {
    props.onClickNew && props.onClickNew(e);
  }

  const onClickItem = (rowid, e) => {
    e.stopPropagation();
    props.onClickItem && props.onClickItem(EID.EDIT, rowid, e);
  }

  const onClickPage = (page, e) => {
    props.onClickPage && props.onClickPage(page, e);
  }

  const onClickSearch = (value, key, e) => {
    props.onClickSearch && props.onClickSearch(value, key, e);
  }

  const [select, setSelect] = useState(-1);
  const { height = 30, tags = null, list = null, datakey = "text" } = props;
  const align = 'center';
  const cursor = props.onSelect ? 'pointer' : 'default';
  const boxHeight = height * 10; //header 포함
  const style = { cursor, height, boxHeight, align };

  // tags 배열에 나열된 아이템들만 추출
  const makeTableItem = (list = null, tags = null) => {
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

  const renderGuide = () => {
    let guide = null;
    if (!tags) {
      guide = "You must set tags props.\n"
        + "ex. const tags = [{ key: 'no', title: 'utime', type: 'date', flex: '1 1 40px' }, {...}\n"
        + "key and title is required. Rest is optional.\n"
        + "type is text or date or datetime";
    }

    if (list && list[0]) {
      const item = list[0];
      if (item.rowid == null || item.rowid === undefined) {
        guide = "'rowid' is required in the list.\n"
          + "ex. const list = [{ rowid: 'a12345', title: 'callopse', text: 'callopse test', utime: '20200101' }, {...}\n"
          + "rowid and text is required. Rest is optional.\n"
          + "rowid is used to show or hide text(contents)";
      }
    }

    if (guide) {
      return <Guidebox text={guide} />
    }
  }

  const tlist = makeTableItem(list, tags && tags.map(item => item.key));
  return (
    <StyledObject className={cx('callopse-list', props.className)} {...style}>
      {props.onClickSearch && <Search guide={ST.SEARCH} onClick={onClickSearch} className="" list={props.searchs} searchkey={props.searchkey} />}
      {props.onClickNew && <Button className="btn-new green md" title={ST.ADD} onClick={onClickNew} eid={EID.NEW} />}

      {/* error guid */}
      {renderGuide()}

      {/* no data view */}
      {!tlist && <div className="frame"><Nodata /></div>}

      {/* callopse list  */}
      {tlist && <ul className="csl-body">
        {/* row */}
        {tlist.map((item, index) => {
          const rowid = props.rowid != null ? list[index][props.rowid] : list[index]['rowid'];
          const show = (String(select) === String(rowid));
          const text = list[index][datakey];

          return (
            <li className={cx("csl-row", {show})} key={String(index)}>
              
              {/* col title */}
              <div className="csl-line" rowid={rowid} onClick={onSelect} eid={EID.SELECT}>
                {item.map((col, index) => {
                  const { value } = col;
                  const { type, align, flex } = tags[index];
                  const styled = { flex: flex, textAlign: align };
                  const data = type === "datetime" ? Util.toStringSymbol(value)
                    : type === "date" ? Util.toStringSymbol(value).substr(0, 10) : value;
                  return <p key={String(index)} style={styled} className={cx("csl-col", col.key)}>{data}</p>
                })}
              </div>

              {/* show/hide callopse contents */}
              {<div className={cx("csl-cont")} >
                {<div className="cslc-child" rowid={rowid}>{text}</div>}
              </div>}
            </li>
          )
        })}
      </ul>}

      {/* page navi */}
      <Pagenavi pos={props.pos} max={props.max} onItemClick={onClickPage} clolr="white" />
    </StyledObject >
  );
};

export default Callopselist;