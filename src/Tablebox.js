import React from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import { Search, Pagenavi, Nodata, Util, Svg, Button, cs } from './index';
import { EID, ST } from './Config';

// const svg = {
//   arrowup: { name: "arrowup", viewbox: "70 150 170 220", path: "M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z" },
//   arrowdn: { name: "arrowdn", viewbox: "70 150 170 220", path: "M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"}
// }

const StyledObject = styled.div`{
  &.table-box { width: 100%; height: fit-content; min-height: ${(props) => props.boxHeight}; position: relative;
    padding-bottom: 50px;
    .search-box { width: 50%; display: inline-block; margin-bottom: 20px; }
    .btn-new { top: 0; right: 0px; position: absolute; z-index: 99; width: 70px; height: 38px; }
    
    .tline { width: 100%; height: fit-content; display: block; position: relative; font-size: 14px; 
      .trow { width: 100%; position: relative; display: flex; flex-direction: row;
        line-height: ${(props) => props.height};
        height: ${(props) => props.height};
        .tcol {  text-align: center; display: inline-block; padding: 0 4px; height: 100%;
            vertical-align: middle; border-bottom: solid rgba(0, 0, 0, 0.1) 1px; font-size: 14px; 
            overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: ${(props) => props.flex};

            p { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; text-align: ${(props) => props.align}; }
            .last { padding-right: 30px; }

            &:nth-child(1) { padding-left: 10px; }
        }

        &:hover {
          .i-btn { opacity: 0.8; transition: all 200ms ease-in; }
        }

        &.selection {
          &:hover { ${cs.bg.primary} }
        }

        .i-btn { position: absolute; top: 50%; transform: translateY(-50%); z-index: 100; opacity: 0; 
          &.btn-del { right: 5px; }
          &.btn-move { left: 10px; }
        }
        
        &:first-child { .btn-up { visibility: hidden; } }
        &:last-child { .btn-dn { visibility: hidden; } }

        &.active { 
          background: rgba(57, 107, 255, 0.9) !important; 
    
          &.green { background:${cs.color.green} !important; color:#fff; }
          &.yellow { background:${cs.color.yellow} !important; color: #fff; }
          &.orange { background:${cs.color.orange} !important; }
          &.red { background:${cs.color.red} !important; }
          &.dark { background:${cs.color.dark} !important; color:#fff; border: 1px solid rgba(148, 148, 148, 0.8); }
        }
        
        &.disable { background: transparent; color:#ffffff33; }
      }

      .total-txt { text-align: right; padding: 3px; font-size: 11px; opacity: 0.7; }
    }

    .tline.head { font-size: 16px; font-weight: 600; .trow { background: #2e3338 } }
    .tline.body .trow { cursor: ${(props) => props.cursor}; border-left: 1px solid #2e3338; border-right: 1px solid #2e3338; }

    .page-navi { margin-top: 40px; }

    @media screen and (max-width : 1280px) {
    }
  
    @media screen and (max-width : 1024px) {
      .tline .trow {
        .tcol.tablet { display: none; }
      }

      .tcol {font-size: 13px;}
    }
  
    @media screen and (max-width : 860px) {
      padding: 0; font-size: 12px; padding-bottom: 30px; padding-top: 10px;
      .tline .trow {
        .tcol.mobile { display: none; }
        .i-btn { opacity: 0.8; }
      } 
      
      .tcol {font-size: 12px;}
      .search { width: calc(100% - 100px); }
      .btn-new { top: 10px; }
    }
  }
}`;

const lineHeight = 40;

class Tablebox extends React.PureComponent {
  onSelect = (e) => {
    const rowid = e.currentTarget.getAttribute("rowid");
    this.props.onSelect && this.props.onSelect(rowid, e);
  }

  onClickDelete = (rowid, e) => {
    e.stopPropagation();
    this.props.onClickDelete && this.props.onClickDelete(rowid, e);
  }

  onClickNew = (eid, e) => {
    this.props.onClickNew && this.props.onClickNew(e);
  }

  onClickPage = (page, e) => {
    this.props.onPageClick && this.props.onPageClick(page, e);
  }

  onClickSearch = (value, key, e) => {
    this.props.onSearchClick && this.props.onSearchClick(value, key, e);
  }

  onClickHead = (e) => {
    const eid = e.currentTarget.getAttribute("eid");
    this.props.onHeadClick && this.props.onHeadClick(eid, e);
  }

  onClickMove = (rowid, e) => {
    e.stopPropagation();
    this.props.onClickMove && this.props.onClickMove(rowid, e);
  }

  renderColumnElem = (item, head) => {
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
        // let textcolor = parseInt(Util.replaceAll(data, "#", ""), 16);
        // textcolor = textcolor ^ 0xffffff;
        // textcolor = (textcolor + 0x1000000).toString(16).substr(-6).toUpperCase();
        // color = { 'background': data, 'color': `#${textcolor}` };
        color = { 'color': data, 'textTransform': 'uppercase' }
      }

      const styled = { flex: flex, textAlign: align };
      return <div key={String(index)} style={styled} className={cx("tcol", col.key, (mobile === 'hide' || tablet === 'hide') && 'mobile', tablet === 'hide' && 'tablet')}>
        <p style={color}>{data}</p>
      </div>
    })
  }

  render() {
    const makeTableItem = (list, tags = []) => {
      let array = list == null || list.length < 1 ? [] : list.map(item => {
        let temps = [];
        tags.map(key => temps = [...temps, { key: key, value: item[key] }]);
        return temps;
      })

      return array;
    }

    const { props } = this;
    const { head, list } = props;
    const cursor = props.onSelect == null ? 'default' : "pointer";
    const height = `${lineHeight}px`;
    const boxHeight = `${lineHeight * 11}px`; //header 포함
    const style = { cursor, height, boxHeight };
    const searchbox = props.onSearchClick == null ? false : true;
    const selection = (cursor === 'pointer');
    // const drag = this.props.onDrag == null ? false : true;

    // 테이블 아이템중에 head에 설정된 col만 추출하자.
    const tlist = makeTableItem(list, head.map(item => item.key));

    return (
      <StyledObject className={cx('table-box', props.className, { searchbox })} {...style}>
        {props.onSearchClick && <Search guide={ST.SEARCH} onClick={this.onClickSearch} className="" list={props.searchs} searchkey={props.searchkey}/>}
        {props.onClickNew &&
          <Button className="btn-new green md" title={ST.ADD} onClick={this.onClickNew} eid={EID.NEW} />
          // <Svg className="btn-new md" onClick={this.onClickNew} eid={EID.NEW} name={"editable"} color={'white'} />
        }

        {/* head */}
        <div className="tline head">
          <div className="trow" >
            {head.map((item, index) => {
              const { tablet = 'show', mobile = 'show', flex } = item;
              const styled = { flex: flex, };
              return <div key={index} style={styled} onClick={this.onClickHead} eid={item.id}
                className={cx("tcol", item.id, item.key, (mobile === 'hide' || tablet === 'hide') && 'mobile', tablet === 'hide' && 'tablet')} >{item.title}</div>
            })}
          </div>
        </div>

        {Util.isEmpty(tlist) && <div className="no-data"><Nodata /></div>}
        {/* body */}
        {!Util.isEmpty(tlist) && <ul className="tline body">
          {/* row */}
          {tlist.map((item, index) => {
            const rowid = props.rowid != null ? list[index][props.rowid] : list[index]['rowid'];
            const active = Number(this.props.sel) === Number(index);
            const color = this.props.activeColor ? this.props.activeColor : '';
            return <li className={cx("trow green", color, {selection}, {active})} key={String(index)} rowid={rowid} onClick={this.onSelect} eid={EID.SELECT}>
              {/* col */}
              {this.renderColumnElem(item, head)}
              {props.onClickDelete &&
                <Svg className="i-btn btn-del sm" onClick={this.onClickDelete} eid={rowid} name={"delete"} color={'white'} />
              }
              {props.onClickMove &&
                <Svg className="i-btn btn-move sm" onClick={this.onClickMove} eid={rowid} name={"move"} color={'white'} />
              }
            </li>
          })}

          <div className="total-txt">{`${ST.TOTAL} : ${props.total}`}</div>
        </ul>}

        {/* page navi */}
        <Pagenavi pos={props.pos} max={props.max} onItemClick={this.onClickPage} color="white" />
      </StyledObject>
    );
    // }
  }
}

export default Tablebox;