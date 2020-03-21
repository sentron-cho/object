/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import { cs } from './index';

const StyledBox = styled.div`{
    &.guide-box { 
      ${cs.font.sm} ${cs.font.red} ${cs.pos.absolute} ${cs.pos.ltop}
      ${cs.size.full} ${cs.z.over}
      
      .gb-bg { ${cs.bg.get("#ffde3c87")} ${cs.size.full} }
      .gb-txt, .gb-desc { 
        ${cs.pos.absolute} ${cs.pos.ltop} ${cs.p.a2}
        ${cs.font.color("#ff3636")} ${cs.font.preline}
        // ${cs.font.center} ${cs.align.center} 
      }

      .bg-here { ${cs.p.h5} ${cs.font.underline} ${cs.mouse.pointer} }

      .gb-txt { ${cs.noselect} }
      .gb-desc {
        ${cs.font.left} ${cs.pos.ltop} ${cs.w.calc("100% - 20px")}
        ${cs.h.fit} ${cs.bg.alphablack} ${cs.p.a10} ${cs.font.white} ${cs.font.md}
      }
    }
  }`;

const Guidebox = (props) => {
  const { text = null } = props;
  const [show, setShow] = useState(false);

  console.error(text);
  const onClick = () => {
    setShow(!show);
  }

  const onClickHide = () => {
    setShow(false);
  }

  if (text) {
    return (
      <StyledBox className={cx("guide-box")}>
        <div className={"gb-bg"} onClick={onClickHide}/>
        <div className={"gb-txt"}>
          There is a problem using the component.<br />Check the console
          <span className={"bg-here"} onClick={onClick}>here</span>
          for details.
        </div>
        {show && <div className={cx("gb-desc")} onClick={onClickHide}>{text}</div>}
      </StyledBox>
    )
  } else {
    return null;
  }
}

export default Guidebox;