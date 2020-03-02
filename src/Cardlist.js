import React from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import cs from './css-style';
import { Search, Pagenavi, Nodata, Util, Svg, Button } from './index';
import { EID, ST } from './Config';

const StyledObject = styled.div`{
  &.card-list { position: relative; width: 100%; height: fit-content; padding-bottom: 50px;
    min-height: ${(props) => props.min}; 
    
    .search-box { width: 50%; display: inline-block; margin-bottom: 20px; }
    .btn-new { top: 0; right: 0px; position: absolute; z-index: 99; }

    .tline { height: 100%; display: flex; position: relative; ${cs.font.md} flex-flow: row; flex-wrap: wrap; width: 100%;
      .trow { height: 100%; display: inline-block; position: relative; max-width: ${(props) => props.width}; width: ${(props) => props.width};
        cursor: ${(props) => props.cursor}; margin: 10px 0; margin-right: 10px; border: 1px solid #949494; padding: 10px; border-radius: 5px;
        .tcol { display: block; margin: 2px; height: 20px; ${cs.font.sm} line-height: 20px; opacity: 0.8;
          p { 
            ${cs.font.left} overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: inline-block; max-width: 30%;
            &:last-child { ${cs.font.right} float: right; right: 0; max-width: calc(70% - 10px);}
          }
          p:first-child { ${cs.opac.alpha} ${cs.font.xs} }
          p:last-child { ${cs.font.sm} }

          &.no {
            margin-bottom: 10px; ${cs.font.thickbold}  ${cs.font.md} 
            p:first-child { ${cs.opac.show} ${cs.font.sm} }
            p:last-child { float: none; padding-left: 5px; }
          } 
        }          

        &:hover {
          ${cs.bg.primary} ${cs.border.black};
          .tcol-button { ${cs.opac.show} ${cs.anim.show} }
        }

        .tcol-button { ${cs.align.rtop} ${cs.opac.hide} z-index: 100; }
      }

      .total-txt { text-align: left; padding: 3px; font-size: 11px; opacity: 0.7; height: auto;
        position: absolute; left: 10px; top: -10px; width: 100%; 
      }
    }

    &.shadow {
      .tline .trow { ${cs.box.shadow} }
    }

    .page-navi { margin-top: 40px; }

    @media screen and (max-width : 1024px) {
      .tline .trow {
        .tcol.tablet { display: none; }
      }

      .tcol {font-size: 13px;}
    }
  
    @media screen and (max-width : 860px) {
      padding: 0; ${cs.font.sm} padding-bottom: 30px; padding-top: 10px;
      
      .tline {
        .trow {
          .tcol { ${cs.font.md} }
        }
      }
      .search-box { margin-left: 10px; margin-right: 10px; width: calc(100% - 20px); }
      .btn-new { top: auto; bottom: 20px; right: 10px; }
    }

    @media screen and (max-width : 600px) {
      .tline .trow { width: 100%; max-width: 100%; margin-right: 0px;  } 
    }
  }
}`;

class Cardlist extends React.PureComponent {
  onSelect = (e) => {
    const rowid = e.currentTarget.getAttribute("rowid");
    (this.props.onSelect != null) && this.props.onSelect(rowid, e);
  }

  onClickDelete = (rowid, e) => {
    e.stopPropagation();
    (this.props.onClickDelete != null) && this.props.onClickDelete(rowid, e);
  }

  onClickNew = (eid, e) => {
    (this.props.onClickNew != null) && this.props.onClickNew(e);
  }

  onClickPage = (page, e) => {
    (this.props.onPageClick != null) && this.props.onPageClick(page, e);
  }

  onClickSearch = (value, key, e) => {
    (this.props.onSearchClick != null) && this.props.onSearchClick(value, key, e);
  }

  renderColumnElem = (item, head) => {
    return item.map((col, index) => {
      const { value } = col;
      index = (index > head.length - 1) ? head.length - 1 : index;
      let { type, title } = head[index];
      let data = value;

      switch (type) {
        case "datetime": data = Util.toStringSymbol(value); break;
        case "date": data = Util.toStringSymbol(value).substr(0, 10); break;
        case "phone": data = Util.toStringPhone(value); break;
        case "json": title = col.title; break;
        default: data = value; break;
      }

      let color = {};
      if (type === "color") {
        color = { 'color': data, 'textTransform': 'uppercase' }
      }

      return <div key={String(col.key)} className={cx("tcol", col.key)}>
        <p className="tcol-label">{title}</p><p className="tcol-txt" style={color}>{data}</p>
      </div>
    })
  }

  render() {
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

    const { props } = this;
    const { head, list } = props;
    const cursor = props.onSelect == null ? 'default' : "pointer";
    const min = props.min ? props.min : "100px";
    const width = props.width ? props.width : "240px";
    const style = { cursor, min, width };
    const tlist = makeTableItem(list, head.map(item => item.key));

    return (
      <StyledObject className={cx('card-list', props.className)} {...style}>
        {/* button group */}
        {props.onSearchClick && <Search guide={ST.SEARCH} onClick={this.onClickSearch} className="" list={props.searchs} searchkey={props.searchkey} />}
        {props.onClickNew &&
          <Button className="btn-new green md" title={ST.ADD} onClick={this.onClickNew} eid={EID.NEW} />
          // <Svg className="btn-new md" onClick={onClickNew} eid={EID.NEW} name={"editable"} color={'white'} />
        }

        {Util.isEmpty(tlist) && <div className="no-data"><Nodata /></div>}
        {/* body */}
        {!Util.isEmpty(tlist) && <ul className="tline body">
          {/* row */}
          {tlist.map((item, index) => {
            const rowid = props.rowid != null ? list[index][props.rowid] : list[index]['rowid'];
            return <li className="trow" key={String(index)} rowid={rowid} onClick={this.onSelect} eid={EID.SELECT}>
              {/* col */}
              {this.renderColumnElem(item, head)}
              {props.onClickDelete &&
                <div className="tcol-button">
                  <Svg className="btn-edit sm" onClick={this.onClickDelete} name={"delete"} eid={rowid} color={this.props.color} />
                </div>
              }
            </li>
          })}

          <div className="total-txt">{`${ST.TOTAL} : ${props.total}`}</div>
        </ul>}

        {/* page navi */}
        <Pagenavi pos={props.pos} max={props.max} onItemClick={this.onClickPage} clolr="white" />
      </StyledObject>
    );
    // }
  }
}

export default Cardlist;