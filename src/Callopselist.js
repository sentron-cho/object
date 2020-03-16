import React, { useState } from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import { SearchFrame, Pagenavi, Nodata, Util, Svg, Button, Guidebox, cs } from './index';
import { EID, ST } from './Config';
import { Svgbox } from './Svg';

const style = {
  border: '1px solid rgba(180, 180, 180, 0.2)',
};

const StyledObject = styled.div`{
  &.callopse-list { ${cs.pos.relative} ${cs.font.dark} ${cs.noliststyle}
    .csl-body { ${cs.pos.relative} ${cs.size.hauto} ${cs.font.md} ${cs.m.t10}
      ${cs.box.line} ${cs.box.inner}

      .csl-row { ${cs.w.full} ${cs.disp.block} ${cs.p.a0} 
        ${cs.h.fit} ${cs.border.top}
        transition: all .5s ease-in-out;
        &:first-child { ${cs.border.none} }
        
        .csl-line {
          ${({ height }) => cs.font.line(height)};
          ${cs.disp.get("flex; flex-direction: row")}
          cursor: ${(props) => props.cursor}; 
          ${cs.noselect}
        }

        .csl-col { 
          ${cs.disp.inblock} ${cs.over.hidden} ${cs.p.a4} ${cs.font.ellipsis}
          ${cs.disp.flex("1 1 60px")}

          ${({ flex }) => `flex : ${flex};`};
          ${({ align }) => cs.font.align(align)};
        }

        .csl-col:first-child { ${cs.p.l10} }
        .csl-col:last-child { ${cs.p.r10} }
      }

      .csl-cont { ${cs.border.lightwhite} ${cs.p.a10} //${cs.anim.showin("3s")}
        ${cs.h.fit} ${cs.font.prewrap} ${cs.over.yauto} ${cs.pos.relative} ${cs.scrollbar.t4} 
        ${cs.border.lightwhite} ${cs.border.top} ${cs.font.line(20)}
        // ${({ height }) => cs.font.line(height - 10)};

        animation: slidedown linear 1 forwards 0.2s; 
        @keyframes slidedown { 
          from  { ${cs.h.get(0)} ${cs.opac.get(0.7)} } 
          to { height: 
            ${({ inner }) => inner && inner.height ? inner.height + 'px' : '200px'}; 
            ${cs.opac.show}
          } 
        };
      }

      .cls-icon { ${cs.m.l5} ${cs.m.top(2)} ${cs.opac.show} }

      .cls-cont-btns {
        ${cs.font.right} ${cs.p.t5} ${cs.border.top} ${cs.bg.lightgray} 
        .svg-icon { ${cs.opac.get(0.3)} }

        &:hover { .svg-icon { ${cs.opac.get(0.7)} } }
      }
    }

    .page-navi { ${cs.m.t40} }
    .csl-border { ${cs.border.gray} }

    &.sm { 
      .csl-body { ${cs.font.sm} 
        .csl-row { 
          ${({ height }) => cs.font.line(height - 6)};
        }
      } 
    }

    &.lg { 
      .csl-body { ${cs.font.lg} 
        .csl-row { 
          ${({ height }) => cs.font.line(height + 6)};
        }
      }
    }

    &.sky {
      .csl-body { ${cs.bg.sky} ${cs.font.dark} 
        .csl-border { ${cs.border.lightgray} } 
        .cls-icon { .svg-path { ${cs.fill.gray} } } 
        .cls-cont-btns { ${cs.bg.sky} .svg-icon .svg-path { ${cs.fill.dark} } } 
      }
      .btn-new { ${cs.bg.primary} ${cs.font.white} }
    }
    &.primary {
      .csl-body { ${cs.bg.primary} ${cs.font.white} 
        .csl-border { ${cs.border.semiblack} } 
        .cls-icon { .svg-path { ${cs.fill.lightgray} } } 
        .cls-cont-btns { ${cs.bg.alphagray} .svg-icon .svg-path { ${cs.fill.white} } } 
      }
      .btn-new { ${cs.bg.primary} ${cs.font.white} }
    }
    &.gray {
      .csl-body { ${cs.bg.lightgray} ${cs.font.dark}
        .csl-border { ${cs.border.semiblack} } 
        .cls-cont-btns { ${cs.bg.alphagray} .svg-icon .svg-path { ${cs.fill.dark} } } 
      }
      .btn-new { ${cs.bg.lightblack} ${cs.font.white} }
    }
    &.dark {
      .csl-body { ${cs.bg.dark} ${cs.font.white} 
        .csl-border { ${cs.border.black} } 
        .cls-cont-btns { ${cs.bg.dark} .svg-icon .svg-path { ${cs.fill.white} } } 
      }
      .btn-new { ${cs.bg.dark} ${cs.font.white} }
    }
    &.black {
      .csl-body { ${cs.bg.black} ${cs.font.white} 
        .csl-border { ${cs.border.dark} } 
        .cls-cont-btns { ${cs.bg.black} .svg-icon .svg-path { ${cs.fill.white} } } 
      }
      .btn-new { ${cs.bg.black} ${cs.font.white} }
    }

    &.theme-sky {
      .csl-body { ${cs.bg.sky} ${cs.font.dark} 
        .csl-border { ${cs.border.lightgray} } 
        .cls-icon { .svg-path { ${cs.fill.gray} } } 
        .cls-cont-btns { ${cs.bg.sky} .svg-icon .svg-path { ${cs.fill.dark} } } 
      }
      .btn-new { ${cs.bg.primary} ${cs.font.white} }
    }
    &.theme-primary {
      .csl-body { ${cs.bg.primary} ${cs.font.white} 
        .csl-border { ${cs.border.semiblack} } 
        .cls-icon { .svg-path { ${cs.fill.lightgray} } } 
        .cls-cont-btns { ${cs.bg.alphagray} .svg-icon .svg-path { ${cs.fill.white} } } 
      }
      .btn-new { ${cs.bg.primary} ${cs.font.white} }
    }
    &.theme-gray {
      .csl-body { ${cs.bg.lightgray} ${cs.font.dark}
        .csl-border { ${cs.border.semiblack} } 
        .cls-cont-btns { ${cs.bg.alphagray} .svg-icon .svg-path { ${cs.fill.dark} } } 
      }
      .btn-new { ${cs.bg.lightblack} ${cs.font.white} }
    }
    &.theme-dark {
      .csl-body { ${cs.bg.dark} ${cs.font.white} 
        .csl-border { ${cs.border.black} } 
        .cls-cont-btns { ${cs.bg.dark} .svg-icon .svg-path { ${cs.fill.white} } } 
      }
      .btn-new { ${cs.bg.dark} ${cs.font.white} }
    }
    &.theme-black {
      .csl-body { ${cs.bg.black} ${cs.font.white} 
        .csl-border { ${cs.border.dark} } 
        .cls-cont-btns { ${cs.bg.black} .svg-icon .svg-path { ${cs.fill.white} } } 
      }
      .btn-new { ${cs.bg.black} ${cs.font.white} }
    }

    &.radius { .csl-body { ${cs.box.radius} } }

    ${({ border }) => border && `.csl-body { ${cs.box.line} }`}
    ${({ border }) => border && border.color && `.csl-border { ${cs.border.color(border.color + " !important")} }`}
    ${({ border }) => border && border.radius && `.csl-body { ${cs.border.radius(border.radius + " !important")} }`}
    ${({ border }) => border && border.width && `.csl-body { ${cs.border.width(border.width + " !important")} }`}
    
    ${({ font }) => font && font.size && `.csl-body { ${cs.font.size(font.size + " !important")} }`}
    ${({ font }) => font && font.color && `.csl-body { ${cs.font.color(font.color)} }`}
    ${({ font }) => font && font.align && `.csl-body { ${cs.font.align(font.align)} }`}
    
    ${({ bgcolor }) => bgcolor && `.csl-body { ${cs.bg.color(bgcolor)} }`}
    
    @media screen and (max-width : 1280px) { }

    @media screen and (max-width : 1024px) { }

    @media screen and (max-width : 860px) {
      ${cs.p.a0} ${cs.font.sm} ${cs.p.b30} ${cs.p.t10}
      .search { ${cs.w.calc("100% - 100px")} }
      .btn-new { ${cs.top(10)} }

      // .tline .trow {
      //   .tcol.mobile { display: none; }
      //   .i-btn { opacity: 0.8; }
      // } 
      
      // .tcol {font-size: 12px;}
    }    
  }
}`;

const Callopselist = (props) => {
  // const [select, setSelect] = useState(-1);  
  const { height = 30, tags = null, list = null, datakey = "text", multi = false, theme } = props;
  const { inner } = props.options || { inner: null, label: null };
  const align = 'center';
  const cursor = 'pointer'; //props.onSelect ? 'pointer' : 'default';
  const style = { cursor, height, align, inner };
  const [data, setData] = useState(list);

  const onSelect = (e) => {
    const rowid = e.currentTarget.getAttribute("rowid");

    if (multi) {
      const item = data && data.find(item => String(item.rowid) === String(rowid));
      if (item) {
        item.show ? item.show = !item.show : item["show"] = true;
      };
    } else {
      data.map(item => String(item.rowid) === String(rowid) ? item["show"] = item["show"] ? !item["show"] : true : item["show"] = false);
    }

    setData([...data]);
    // setSelect(rowid === select ? -1 : rowid);
    props.onSelect && props.onSelect(rowid, e);
  }

  const onClickItem = (eid, rowid, e) => {
    e.stopPropagation();
    props.onClickItem && props.onClickItem(eid, rowid, e);
  }

  const onClickPage = (page, e) => {
    props.onClickPage && props.onClickPage(page, e);
  }

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
        + "ex. const tags = [{ key: 'no', title: 'utime', type: 'date', align: 'left', flex: '1 1 40px' }, {...}\n"
        + "key and title is required. Rest is optional.\n"
        + "type is text or date or datetime";
    }

    if (data && data[0]) {
      const item = data[0];
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

  const tlist = makeTableItem(data, tags && tags.map(item => item.key));
  return (
    <StyledObject className={cx('callopse-list', props.className, `theme-${theme}`)} {...style}
      border={props.border} font={props.font} bgcolor={props.bgcolor} >
      
      <SearchFrame list={props.searchs} searchkey={props.searchkey}
        onClickSearch={props.onClickSearch && ((value, key, e) => props.onClickSearch(value, key, e))}
        onClickNew={props.onClickNew && ((e) => props.onClickNew(e))} />

      {/* error guid */}
      {renderGuide()}

      {/* no data view */}
      {!tlist && <div className="frame"><Nodata /></div>}

      {/* callopse list  */}
      {tlist && <ul className="csl-body csl-border">
        {/* row */}
        {tlist.map((item, index) => {
          const rowid = props.rowid != null ? data[index][props.rowid] : data[index]['rowid'];
          // const show = (String(select) === String(rowid));
          const text = data[index][datakey];
          const { show = false } = data[index];

          return (
            <li className={cx("csl-row csl-border")} key={String(index)} >

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
                <Svg className="cls-icon md" name={show ? "arrowup" : "arrowdn"} color={cs.color.darkgray} />
              </div>

              {/* show/hide callopse contents */}
              {show && <div className={cx("csl-cont csl-border")} rowid={rowid}>
                {text}
              </div>}
              
              {show && props.onClickItem &&
                <Svgbox className={cx('cls-cont-btns full')} size={"sm"} rowid={rowid} list={[{ icon: EID.EDIT }, { icon: EID.DELETE }]} onClick={onClickItem} />
              }
            </li>
          )
        })}
      </ul>}

      {/* page navi */}
      <Pagenavi className={props.className} pos={props.pos} max={props.max} onItemClick={onClickPage} clolr="white" />
    </StyledObject >
  );
};

export default Callopselist;