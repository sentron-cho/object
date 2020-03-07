import React from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import { Search, Pagenavi, Nodata, Util, Svg, Button, cs } from './index';
import { EID, ST } from './Config';

const style = {
  border: '1px solid rgba(180, 180, 180, 0.2)',
};

const StyledObject = styled.div`{
  &.callopse-list { position: relative;
    // .top-frame { margin-bottom: 10px; padding-right: 50px;
    //   .search-box { width: 50%; display: inline-block; }
    //   .info-label { display: inline-block; height: 100%; font-size: 18px; font-weight: 500; text-align: left;
    //     float: right; position: relative; line-height: 48px;
    //   }
    // }

    .search-box { width: 50%; display: inline-block; margin-bottom: 20px; }
    .btn-new { top: 0; right: 0px; position: absolute; z-index: 99; width: 70px; }
    
    .callopse-body { width: 100%; height: auto; position: relative; font-size: 14px; 
      min-height: ${(props) => props.boxHeight};
      border-top: ${style.border};
      .li-row { width: 100%; display: block; padding: 0;
        border-bottom: ${style.border};
        border-left: ${style.border};
        border-right: ${style.border};
        height: auto; min-height: ${(props) => props.height};
        line-height: ${(props) => props.height};
        .li-line { display: flex; flex-direction: row;
          cursor: ${(props) => props.cursor};
        }
        .li-col { text-align: ${(props) => props.align}; display: inline-block; overflow: hidden; padding: 4px; 
            text-overflow: ellipsis; vertical-align: middle; white-space: nowrap; padding: 0 4px; flex: 1 1 60px;
            flex: ${(props) => props.flex};
        }

        .li-col:first-child { padding-left: 10px; }
        .li-col:last-child { padding-right: 10px; }
      }

      .tr-cont { height: 0; white-space: pre-wrap; overflow-y: hidden; position: relative;
        opacity: 0.9; display: none; line-height: 25px; color: rgba(256, 256, 256, 0.9);
        &.show, &.active { min-height: 0px; margin: 5px 0; padding: 10px; height: auto; max-height: auto; 
          display: block; overflow-y: auto; background: rgba(180, 180, 180, 0.1); }
  
        .edit-layer { min-height: 120px;
          .image>img { padding: 10px; text-align: center; display: block; margin: 0 auto; max-width: 100%; } 
          .image-style-side { float: right; margin-left: 1.5em; max-width: 50%; }

          figcaption { margin: 10px; background: rgba(0,0,0,0.1); color: rgba(256, 256, 256, 0.7); } 

          .btn-edit { ${cs.align.rtop} ${cs.opac.hide} ${cs.anim.hide} }

          &.eidatable { cursor: pointer; 
            &:hover { .btn-edit { ${cs.opac.show} } ${cs.anim.show} }
          }
        }
      }

      .li-col-button { position: absolute; float: right; right: 0; }

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

const lineHeight = 40;

class Callopselist extends React.PureComponent {
  onSelect = (e) => {
    const rowid = e.currentTarget.getAttribute("rowid");
    (this.props.onSelect != null) && this.props.onSelect(rowid, e);
  }

  onClickNew = (eid, e) => {
    (this.props.onClickNew != null) && this.props.onClickNew(e);
  }

  onClickItem = (rowid, e) => {
    e.stopPropagation();
    this.props.onClickItem && this.props.onClickItem(EID.EDIT, rowid, e);
  }

  onClickPage = (page, e) => {
    this.props.onClickPage && this.props.onClickPage(page, e);
  }

  onClickSearch = (value, key, e) => {
    this.props.onClickSearch && this.props.onClickSearch(value, key, e);
  }

  renderBody = () => {
    const { props } = this;
    const { tags = null, list = null } = props;
    // const eidatable = this.props.onClickItem ? true : false;
    if (!tags || !list) {
      return <div className="frame"><Nodata /></div>
    }

    // tags 배열에 나열된 아이템들만 추출
    const makeTableItem = (list, tags = []) => {
      let array = list == null || list.length < 1 ? [] :
        list.map(item => {
          let temps = [];
          tags.map(key => temps = [...temps, { key: key, value: item[key], mobile: true, tablet: true }]);
          return temps;
        })

      return array;
    }

    // 테이블 아이템중에 head에 설정된 col만 추출하자.
    const tlist = makeTableItem(list, tags.map(item => item.key));
    if (!tlist || tlist.length < 1) {
      return <div className="frame"><Nodata /></div>
    } else {
      return <React.Fragment>
        {/* callopse body  */}
        <ul className="callopse-body">
          {/* row */}
          {tlist.map((item, index) => {
            const rowid = props.rowid != null ? list[index][props.rowid] : list[index]['rowid'];
            const show = (props.select === rowid);
            const text = show ? list[index].txt : Util.toShort(list[index].txt, 20);
            return <li className="li-row" key={String(index)}>
              {/* col */}
              <div className="li-line" rowid={rowid} onClick={this.onSelect} eid={EID.SELECT}>
                {item.map((col, index) => {
                  const { mobile, tablet, value } = col;
                  const { type, align, flex } = tags[index];
                  const styled = { flex: flex, textAlign: align };
                  const data = type === "datetime" ? Util.toStringSymbol(value)
                    : type === "date" ? Util.toStringSymbol(value).substr(0, 10) : value;
                  return <p key={String(index)} style={styled} className={cx("li-col", col.key, { mobile }, { tablet })}>{data}</p>
                })}
              </div>
              <div className={cx("tr-cont scrollbar-3", { show })} >
                {<div className="edit-layer" rowid={rowid}>{text}</div>}
              </div>
            </li>
          })}
        </ul>

        {/* page navi */}
        <Pagenavi pos={props.pos} max={props.max} onItemClick={this.onClickPage} clolr="white" />
      </React.Fragment>
    }
  }

  render() {
    const { props } = this;
    const align = 'center';
    const cursor = props.onSelect == null ? 'default' : "pointer";
    const height = `${lineHeight}px`;
    const boxHeight = `${lineHeight * 10}px`; //header 포함
    const style = { cursor, height, boxHeight, align };

    return (
      <StyledObject className={cx('callopse-list', props.className)} {...style}>
        {/* button group */}
        {/* <div className="top-frame">
          <div className="search-box"><Search guide={ST.SEARCH} onClick={this.onClickSearch} className="box" /></div>
          <div className="info-label"> <span className="info">{`${ST.TOTAL} : ${props.total}`}</span></div>
        </div> */}

        {props.onClickSearch && <Search guide={ST.SEARCH} onClick={this.onClickSearch} className="" list={props.searchs} searchkey={props.searchkey} />}
        {props.onClickNew &&
          <Button className="btn-new green md" title={ST.ADD} onClick={this.onClickNew} eid={EID.NEW} />
          // <Svg className="btn-new md" onClick={this.onClickNew} eid={EID.NEW} name={"editable"} color={'white'} />
        }

        {this.renderBody()}
      </StyledObject >
    );
  }
}

export default Callopselist;