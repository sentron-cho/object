import React from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import { cs } from '../src';

const StyledBox = styled.div`{
  &.lb-box { ${cs.m.a5} ${cs.m.t20}

    .lb-tl { ${cs.disp.inblock} ${cs.font.md} ${cs.font.upper} }
    .lb-desc { ${cs.disp.inblock} ${cs.font.sm} ${cs.p.l10} ${cs.font.darkgray} }

    .lb-li { ${cs.m.t5} ${cs.max.width("100%")} ${cs.over.hidden}
      ${cs.w.calc("100% - 20px")}

      & > * { ${cs.m.r10} }
    }
  }
}`;

export const Linebox = (props) => {

  const tag = props.title.split(" ").join("-");
  return <StyledBox className={cx("lb-box", tag)}>
    <label className={"lb-tl"}>{props.title}</label>
    {props.desc && <p className={"lb-desc"}>{props.desc}</p>}
    <div className={cx("lb-li", props.className)}>
      {props.children}
    </div>
  </StyledBox>
}

// export const standard = () => <Button name="Storybook" />;