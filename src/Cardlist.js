import React from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import cs from './css-style';
import { Pagenavi, Nodata, Util, Svg, SearchFrame } from './index';
import { EID, ST } from './Config';
import moment from 'moment';

const StyledObject = styled.div`{
  &.card-list { ${cs.pos.relative} ${cs.w.full} ${cs.h.fit} ${cs.p.b50} ${cs.min.h((props) => props.min)}
    
    .search-frame { ${cs.m.l5} ${cs.w.calc('100% - 10px')} }

    .tline { ${cs.size.full} ${cs.pos.relative} ${cs.font.md} ${cs.m.t10}
      .trow { ${cs.h.full} ${cs.disp.inblock} ${cs.pos.relative} 
        ${cs.disp.inblock} ${cs.w.calc("25% - 10px")} ${cs.min.width(200)} ${cs.p.a5} ${cs.m.a5}
        ${(props) => cs.mouse.get(props.cursor)}; ${cs.box.line} ${cs.box.radius}

        .tcol { ${cs.disp.block} ${cs.m.a2} ${cs.h.get(20)} ${cs.font.sm} ${cs.opac.show} //${cs.font.line(20)}
          ${({ height }) => cs.font.line(height)};
          ${({ height }) => cs.h.get(height)};

          & > p { 
            ${cs.font.left} ${cs.font.ellipsis} ${cs.disp.inblock} ${cs.max.w("30%")}
            &:last-child { ${cs.font.right} ${cs.align.right} ${cs.max.w('calc(70% - 10px)')} ${cs.right(10)} }
          }
          & > p:first-child { ${cs.opac.get(0.7)} ${cs.font.sm} }
          & > p:last-child { ${cs.font.md} }

          &.no {
            margin-bottom: 10px; ${cs.font.thickbold}  ${cs.font.md}
            & > p:first-child { ${cs.opac.show} ${cs.font.sm} }
            & > p:last-child { ${cs.pos.relative} ${cs.p.l10} }
          }

          .tcol-unit { ${cs.font.xs} ${cs.m.l1} }
        }          

        &.selection:hover {
          ${cs.bg.primary} ${cs.border.black};
          .tcol-button { ${cs.opac.show} ${cs.anim.show} }
        }
        
        .tcol-button { ${cs.align.rtop} ${cs.opac.hide} ${cs.z.over} }
      }

      .total-txt { ${cs.font.right} ${cs.p.a3} ${cs.font.sm} ${cs.opac.get(0.7)} }
    }

    &.shadow {
      .tline .trow { ${cs.box.shadow} }
    }

    .page-navi { ${cs.m.t10} }

    
    &.sky {
      .tline .trow {
        ${cs.bg.sky} ${cs.font.dark} 

        &.selection:hover { ${cs.bg.darkwhite} }
      }
    }

    &.primary {
      .tline .trow {
        ${cs.bg.primary} ${cs.font.white} 

        &.selection:hover { ${cs.bg.primaryhover} }
      }
    }

    &.gray {
      .tline .trow {
        ${cs.bg.lightgray} ${cs.font.black} 

        &.selection:hover { ${cs.bg.grayhover} }
      }
    }

    &.dark {
      .tline .trow {
        ${cs.bg.dark} ${cs.font.white} 

        &.selection:hover { ${cs.bg.darkhover} }
      }
    }

    &.black {
      .tline .trow {
        ${cs.bg.black} ${cs.font.white} 

        &.selection:hover { ${cs.bg.dark} }
      }
    }

    &.theme-sky {
      .tline .trow {
        ${cs.bg.sky} ${cs.font.dark} 

        &.selection:hover { ${cs.bg.darkwhite} }
      }
    }

    &.theme-primary {
      .tline .trow {
        ${cs.bg.primary} ${cs.font.white} 

        &.selection:hover { ${cs.bg.primaryhover} }
      }
    }

    &.theme-gray {
      .tline .trow {
        ${cs.bg.gray} ${cs.font.black} 

        &.selection:hover { ${cs.bg.grayhover} }
      }
    }

    &.theme-dark {
      .tline .trow {
        ${cs.bg.dark} ${cs.font.white} 

        &.selection:hover { ${cs.bg.darkhover} }
      }
    }

    &.theme-black {
      .tline .trow {
        ${cs.bg.black} ${cs.font.white} 

        &.selection:hover { ${cs.bg.dark} }
      }
    }

    @media screen and (max-width : 1024px) {
      .tline .trow {
        ${cs.w.calc("33% - 10px")}
        .tcol.tablet { ${cs.disp.none} }
      }

      .tcol { ${cs.font.md} }
    }
  
    @media screen and (max-width : 860px) {
      ${cs.p.a0} ${cs.p.b30} ${cs.p.t10} ${cs.font.sm}
      ${cs.m.h10} ${cs.w.calc('100% - 20px')}

      .search-frame .search-box { ${cs.w.full} }
      .tline {
        .trow { 
          ${cs.w.calc("50% - 10px")}
          
          .tcol { ${cs.font.md} }
        }
      }
    }

    @media screen and (max-width : 600px) {
      .tline .trow { ${cs.w.full} ${cs.max.w("100%")} ${cs.m.h0} } 
    }
  }
}`;

const Cardlist = (props) => {
  const { head, list, total = '', height = 30, theme, rowid } = props;
  const cursor = props.onSelect == null ? 'default' : "pointer";
  const min = props.min ? props.min : "100px";
  const width = props.width ? props.width : "240px";
  const style = { cursor, min, width, height };
  const selection = props.onSelect;

  const onSelect = (e) => {
    const rowid = e.currentTarget.getAttribute("rowid");
    props.onSelect && props.onSelect(rowid, e);
  }

  const onClickDelete = (rowid, e) => {
    e.stopPropagation();
    props.onClickDelete && props.onClickDelete(rowid, e);
  }

  const onClickPage = (page, e) => {
    props.onClickPage && props.onClickPage(page, e);
  }

  const renderColumnElem = (item, head, pos) => {
    return item.map((col, index) => {
      const { value } = col;
      index = (index > head.length - 1) ? head.length - 1 : index;
      let { type, title, unit = '', color = null, format = null, getcolor = null, formatter = null  } = head[index];
      let data = value;

      // switch (type) {
      //   case "datetime": data = moment(value).format(format || "YYYY.MM.DD hh:mm:ss"); break;
      //   case "date": data = moment(value).format(format || "YYYY.MM.DD"); break;
      //   case "phone": data = Util.toStringPhone(value); break;
      //   case "json": title = col.title; break;
      //   case "number": data = Util.commas(value); break;
      //   default: data = value; break;
      // }

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
        //   case "json": title = col.title; break;
        default: data = formatter ? formatter(value, list[pos], pos) : value; break;
      }

      let styled = {};
      if (type === "color") {
        styled = { 'color': data, 'textTransform': 'uppercase' };
      }
      
      if (color) {
        styled['color'] = color instanceof Function ? color(value, list[pos], pos) : color;
      }

      const vcolor = getcolor && getcolor(value);
      
      return <div key={String(col.key)} className={cx("tcol", col.key)}>
        <p className="tcol-label">{title}{unit && <span className="tcol-unit">{`[${unit}]`}</span>}</p>
        <p className={cx("tcol-txt", vcolor)} style={styled}>{data}</p>
      </div>
    })
  }

  const makeTableItem = (list, tags = []) => {
    let array = list == null || list.length < 1 ? [] : list.map(item => {
      let temps = [];
      tags.map(key => {
        if (key === 'json') {
          const jsons = Util.parseJson(item[key]);
          if (jsons) {
            let addlist = jsons.map(json => {
              return { key: json.id, value: json.value, title: json.label };
            })

            // 일단은 3개까지만 표시하자...
            if (addlist.length > 3) {
              addlist = addlist.slice(0, 3);
            }

            temps = [...temps, ...addlist];
          }
        } else {
          temps = [...temps, { key: key, value: item[key] }];
        }
        return temps;
      })
      return temps;
    })

    return array;
  }

  const tlist = makeTableItem(list, head.map(item => item.key));

  return (
    <StyledObject className={cx('card-list', props.className, theme && `theme-${theme}`)} {...style}
      border={props.border} font={props.font} bgcolor={props.bgcolor} >
      <SearchFrame list={props.searchs} searchkey={props.searchkey}
        onClickSearch={props.onClickSearch && ((value, key, e) => props.onClickSearch(value, key, e))}
        onClickNew={props.onClickNew && ((e) => props.onClickNew(e))} />

      {Util.isEmpty(tlist) && <div className="no-data"><Nodata /></div>}
      {/* body */}
      {!Util.isEmpty(tlist) && <ul className="tline body">
        {/* row */}
        {tlist.map((item, index) => {
          const rowid = props.rowid != null ? list[index][props.rowid] : list[index]['rowid'];
          return <li className={cx("trow", { selection })} key={String(index)} rowid={rowid} onClick={onSelect} eid={EID.SELECT}>
            {/* col */}
            {renderColumnElem(item, head, index)}
            {props.onClickDelete &&
              <div className="tcol-button">
                <Svg className="btn-edit sm" onClick={onClickDelete} name={"delete"} eid={rowid} color={props.color} />
              </div>
            }
          </li>
        })}

        {total && <div className="total-txt">{`${ST.TOTAL} : ${total}`}</div>}
      </ul>}

      {/* page navi */}
      {props.onClickPage && <Pagenavi className={props.theme} pos={props.pos || 1} max={props.max || 1} onItemClick={onClickPage} />}
    </StyledObject>
  );
}

export default Cardlist;