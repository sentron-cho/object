import React from 'react';
import cx from 'classnames/bind';
import styled from 'styled-components';
import Cardbox from './Cardbox';
import cs from './css-style';

const StyledObject = styled.div`{
  &.head-summary {
    ${cs.bg.dark}
    
    .hs-frame { ${cs.h.full} ${cs.p.a0} ${cs.font.sm}

      .t-title {
        ${cs.font.xxl} ${cs.font.white} ${cs.font.thickbold} ${cs.bg.alphablack}
        ${cs.border.bottom} ${cs.border.black} ${cs.m.b5} ${cs.p.a5} ${cs.font.center}
      }

      .t-div { ${cs.pos.relative} ${cs.m.v5} ${cs.font.white} 
        max-width: ${props => props.maxwidth}; ${cs.align.xcenter} ${cs.pos.relative}
        .li-itm {
          ${cs.border.left} width: ${props => props.width}; ${cs.disp.inblock}

          span {
            ${cs.disp.block} ${cs.w.full} ${cs.h.r50} ${cs.font.center} ${cs.pos.relative}

            &.li-tl { ${cs.font.md} }
            &.li-txt { ${cs.font.sm} ${cs.m.t5} }
          }
        }
      }

      .b-div { ${cs.pos.relative} ${cs.bg.alphablack} ${cs.font.gray} ${cs.font.center} height: calc(30px);

        .grp { ${cs.disp.block} ${cs.h.full} position: relative; 
        
        //float: right; right: 20px; max-width: ${props => props.maxwidth};
          .li-itm {
            ${cs.border.left} ${cs.align.ycenter} 
            ${cs.disp.inblock} padding: 0 15px; ${cs.pos.relative}

            span {
              ${cs.disp.inblock} ${cs.w.r25} ${cs.h.full}  ${cs.font.center}
              
              &.li-tl { ${cs.font.right} ${cs.p.r10} width: auto; }
              &.li-txt { ${cs.font.left} width: auto; }
            }
          }
        }
      }

      .li-itm:first-child { border-left: transparent !important; }

    }

    @media screen and (max-width : 860px) {
      .hs-frame .t-div .li-itm {
        .li-tl { ${cs.font.sm} } 
        .li-txt { ${cs.font.xs} } 
      }
    }
  }
}`;


/*******************************************************************
 Profile
*******************************************************************/
const SummaryBox = (props) => {
  const { data, label, title = '', maxwidth = '1280px' } = props;
  const width = data ? `${100 / data.length}%` : `100%`;

  return (
    <StyledObject className={cx("head-summary")} type={props.type} width={width} maxwidth={maxwidth}>
      <Cardbox className={cx("hs-frame no-box", props.className)} type="full">
        {title && <p className={'t-title'}>{title}</p>}
        <div className="t-div">
          {data.map((item, index) => {
            return <span key={index} className="li-itm">
              <span className="li-tl">{item.title}</span>
              <span className="li-txt">{item.value}</span>
            </span>
          })}
        </div>
        <div className="b-div">
          <div className="grp">
            {label.map((item, index) => {
              return <span key={index} className="li-itm">
                <span className="li-tl">{item.title}</span>
                <span className="li-txt">{item.value}</span>
              </span>
            })}
          </div>
        </div>
      </Cardbox>
    </StyledObject>
  );
}

export default SummaryBox;