import React from 'react';
import cx from 'classnames/bind';
import styled from 'styled-components';
import Cardbox from './Cardbox';
import cs from './css-style';

const StyledObject = styled.div`{
  &.head-summary {
    ${cs.bg.sky} ${cs.font.dark} ${cs.noselect} ${cs.noliststyle} // ${cs.p.v10}
    
    .hs-frame { ${cs.h.full} ${cs.p.a0} ${cs.font.sm}
      .t-title {
        ${cs.font.xxl}${cs.font.thickbold} ${cs.bg.primary} ${cs.font.white}
        ${cs.border.bottom} ${cs.border.dark} ${cs.m.b5} ${cs.p.a5} ${cs.font.center}
      }

      .t-div { ${cs.pos.relative} ${cs.m.v5} 
        ${({maxwidth}) => cs.max.width(maxwidth)} ${cs.align.xcenter} ${cs.pos.relative}
        .li-itm {
          ${cs.border.left} ${({width}) => cs.w.get(width)} ${cs.disp.inblock} ${cs.box.inner}

          span {
            ${cs.disp.block} ${cs.w.full} ${cs.h.r50} ${cs.font.center} ${cs.pos.relative}

            &.li-tl { ${cs.font.md} }
            &.li-txt { ${cs.m.t5} }
          }
        }
      }

      .b-div { ${cs.pos.relative} ${cs.bg.primary} ${cs.font.white} ${cs.font.center} ${cs.h.get(30)}
        .grp { ${cs.disp.block} ${cs.h.full} ${cs.pos.relative}
          .li-itm {
            ${cs.border.left} ${cs.align.ycenter} 
            ${cs.disp.inblock} ${cs.p.get("0 15px")} ${cs.pos.relative}

            span {
              ${cs.disp.inblock} ${cs.w.r25} ${cs.h.full}  ${cs.font.center}
              
              &.li-tl { ${cs.font.right} ${cs.p.r10} ${cs.w.auto} }
              &.li-txt { ${cs.font.left} ${cs.w.auto} }
            }
          }
        }
      }

      .li-itm:first-child { border-left: transparent !important; }

      .noitem { ${cs.font.lightgray} ${cs.font.center} }
    }

    &.sky { 
      .hs-frame { 
          .t-title { ${cs.bg.lightwhite} ${cs.border.gray} ${cs.font.dark} } 
          .b-div { ${cs.bg.lightwhite} ${cs.font.gray} } 
        }
      }
    }
    &.primary { 
      ${cs.font.lightwhite} ${cs.bg.primary} 
      .hs-frame { 
          .t-title { ${cs.bg.alphablack} ${cs.border.lightgray} } 
          .b-div { ${cs.bg.alphablack} ${cs.font.lightwhite} } 
        }
      }
    }
    &.gray { 
      ${cs.font.lightwhite} ${cs.bg.gray} 
      .hs-frame { 
          .t-title { ${cs.bg.alphablack} ${cs.font.white}  ${cs.border.lightgray} } 
          .b-div { ${cs.bg.alphablack} ${cs.font.lightgray} } 
        }
      }
    }
    &.dark { 
      ${cs.bg.dark} 
      .hs-frame { 
          .t-title { ${cs.bg.alphablack} ${cs.border.gray} } 
          .b-div { ${cs.bg.alphablack} ${cs.font.lightgray} } 
        }
      }
    }
    &.black { 
      ${cs.bg.black} 
      .hs-frame { 
          .t-title { ${cs.bg.alphablack} ${cs.border.gray} } 
          .b-div { ${cs.bg.alphablack} ${cs.font.lightgray} } 
        }
      }
    }

    
    &.theme-sky { 
      .hs-frame { 
          .t-title { ${cs.bg.lightwhite} ${cs.border.gray} ${cs.font.dark} } 
          .b-div { ${cs.bg.lightwhite} ${cs.font.gray} } 
        }
      }
    }
    &.theme-primary { 
      ${cs.font.lightwhite} ${cs.bg.primary} 
      .hs-frame { 
          .t-title { ${cs.bg.alphablack} ${cs.border.lightgray} } 
          .b-div { ${cs.bg.alphablack} ${cs.font.lightwhite} } 
        }
      }
    }
    &.theme-gray { 
      ${cs.font.lightwhite} ${cs.bg.gray} 
      .hs-frame { 
          .t-title { ${cs.bg.alphablack} ${cs.font.white}  ${cs.border.lightgray} } 
          .b-div { ${cs.bg.alphablack} ${cs.font.lightgray} } 
        }
      }
    }
    &.theme-dark { 
      ${cs.bg.dark} 
      .hs-frame { 
          .t-title { ${cs.bg.alphablack} ${cs.border.gray} } 
          .b-div { ${cs.bg.alphablack} ${cs.font.lightgray} } 
        }
      }
    }
    &.theme-black { 
      ${cs.bg.black} 
      .hs-frame { 
          .t-title { ${cs.bg.alphablack} ${cs.border.gray} } 
          .b-div { ${cs.bg.alphablack} ${cs.font.lightgray} } 
        }
      }
    }

    &.sm { 
      .hs-frame { ${cs.font.xs} 
        .t-title { ${cs.font.lg} ${cs.p.a2} } 
        .t-div .li-itm span.li-tl { ${cs.font.sm} } 
        .t-div { ${cs.p.v2} } .b-div { ${cs.h.get(20)} } 
      } 
    }
    &.md { 
      .hs-frame { ${cs.font.sm} 
        .t-title { ${cs.font.xl} ${cs.p.a5} } 
        .t-div .li-itm span.li-tl { ${cs.font.md} } 
        .t-div { ${cs.p.v5} } .b-div { ${cs.h.get(30)} } 
      } 
    }
    &.lg { 
      .hs-frame { ${cs.font.md} 
        .t-title { ${cs.font.xxl} ${cs.p.a10} } 
        .t-div .li-itm span.li-tl { ${cs.font.lg} } 
        .t-div { ${cs.p.v10} } .b-div { ${cs.h.get(40)} } 
      } 
    }

    &.head-summary {
      .hs-frame, .hs-frame .b-div, .hs-frame > .t-title {
        ${({ fontcolor }) => fontcolor && fontcolor && cs.font.color(fontcolor)}
      }
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
const Summarybox = (props) => {
  const { data, label, title = '', maxwidth = '1280px', className, theme, border, fontcolor } = props;
  const width = data ? `${100 / data.length}%` : `100%`;

  return (
    <StyledObject className={cx("head-summary", className, theme && `theme-${theme}`)} 
      type={props.type} width={width} maxwidth={maxwidth} fontcolor={fontcolor}>
      <Cardbox className={cx("hs-frame no-box", className, theme, {border})} type="full" border={border}>
        {title && <p className={'t-title'}>{title}</p>}
        {data ? <div className="t-div">
          {data.map((item, index) => {
            return <span key={index} className="li-itm">
              <span className="li-tl">{item.title}</span>
              <span className="li-txt">{item.value}</span>
            </span>
          })}
        </div> : <div className={"noitem"}>Noitem</div>}
        <div className="b-div">
          {label ? <div className="grp">
            {label.map((item, index) => {
              return <span key={index} className="li-itm">
                <span className="li-tl">{item.title}</span>
                <span className="li-txt">{item.value}</span>
              </span>
            })}
          </div> : <div className={"noitem"}>Noitem</div>}
        </div>
      </Cardbox>
    </StyledObject>
  );
}

export default Summarybox;