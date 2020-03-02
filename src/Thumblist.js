import React from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import { Nodata, Svg, Dragbox, Thumbbox } from './index';
import { EID } from './Config';

const StyledObject = styled.div`{
  &.thumb-list { position: relative; margin-top: 5px;
    .btn-new { position: absolute; bottom: 10px; right: 10px; }

    .v-line { background: rgb(43, 43, 43); padding: 5px; display: flex; flex-wrap: wrap;
    
      .v-item { display: inline-block; padding: 5px; position: relative; opacity: 0.8;
        .t-img, .t-noimg { width: 120px; height: 80px; position: relative; border: 1px solid rgba(255,255,255,0.2); border-radius: 6px;
          .loading-box { top: 0; left: 0; }
          &:hover { border: 1px solid rgba(255, 198, 5, 0.9); }
          .center-box { height: 100px; width: 100%; text-align: center; transform: translate(-50%, -50%); 
            left: 50%; top: 50%; position: absolute;
          }
        }
        
        .t-noimg { display: block; text-align: center; line-height: 70px; color: rgba(250,250,250,0.4); }
        // .t-odr { position: absolute; opacity: 0.7; right: 15px; top: 10px; font-size: 12px; }

        &:hover { opacity: 1; cursor: pointer; .btn-icon { display: block; } }
        .btn-icon { position: absolute; right: 15px; bottom: 15px; display: none; }
        .btn-icon.link { bottom: 45px }
        .btn-icon.edit { bottom: 45px }
      }
    }

    .drag { display: none;
      .v-item {
        .t-img { border: 1px solid rgba(216, 0, 0, 0.9) !important;
          // background: rgba(0, 0, 0, 0.8);
          .preview { opacity: 0.7 !important; }
        }
      }
    }

    .drop-box {
      .v-item { .btn-icon, .odr { display: none; } }
    }
    
    @media screen and (max-width : 1280px) {
    }

    @media screen and (max-width : 860px) {
      .v-cont .v-line .v-item .btn-icon { display: block; }
    }

    @media screen and (max-width : 600px) {
      .v-cont .v-line {
        justify-content: center; 
      }
    }
  }
}`;

export default class Thumblist extends React.PureComponent {
  onSelectItem = (e) => {
    const rowid = e.currentTarget.getAttribute("rowid");
    this.onSelect(rowid, e);
  }

  onSelect = (rowid, e) => {
    // let rowid = e.currentTarget.getAttribute("rowid");
    (this.props.onSelect != null) && this.props.onSelect(rowid, e);
  }

  onClickDelete = (rowid, e) => {
    e.stopPropagation();
    (this.props.onClickDelete != null) && this.props.onClickDelete(rowid, e);
  }

  onClickNew = (eid, e) => {
    (this.props.onClickNew != null) && this.props.onClickNew(e);
  }

  onDrag = (...args) => {
    this.props.onDrag && this.props.onDrag(...args);
  }

  renderBody = () => {
    const { props } = this;
    const { head, list } = props;

    const makeItems = (list, tags = []) => {
      let array = list == null || list.length < 1 ? [] :
        list.map(item => {
          let temps = [];
          tags.map(key => {
            temps = [...temps, { key: key, value: item[key] }];
            return 0;
          })
          return temps;
        })

      return array;
    }

    // 테이블 아이템중에 head에 설정된 col만 추출하자.
    const tlist = makeItems(list, head.map(item => item.key));

    if (tlist == null || tlist.length < 1) {
      return <div className="no-data"><Nodata /></div>
    } else {
      return <React.Fragment>
        <ul className="v-line" onMouseDown={this.onMouseDown}>
          {/* items */}
          {list.map((item, index) => {
            const url = this.props.path + item.url;
            const rowid = item[props.rowid];
            const odr = item.odr ? item.odr : index + 1;

            return (
              /* item */
              <Dragbox key={rowid} rowid={rowid} frameClass={"thumb-list"} onDrag={this.onDrag} >
                <li key={rowid} className={cx("v-item drag-li")} rowid={rowid} onClick={this.onSelectItem}>
                  <Thumbbox className={"thumb-item"} odr={odr} thumb={url} anim={true} delay={index * 50} />
                  {props.onClickDelete &&
                    <Svg className="btn-icon delete sm" onClick={this.onClickDelete} eid={rowid} icon={'delete'} />
                  }
                </li>
              </Dragbox>
            )
          })}
        </ul>
      </React.Fragment>
    }
  }

  render() {
    const { props } = this;
    const cursor = props.onSelect == null ? 'default' : "pointer";
    const style = { cursor };

    return (
      <StyledObject ref={ref => this.frame = ref} className={cx('thumb-list', props.className)} {...style} >
        {props.onClickNew && <Svg className="btn-new md box radius" onClick={this.onClickNew} eid={EID.NEW} icon={'new'} />}
        {this.renderBody()}
      </StyledObject >
    );
  }
}