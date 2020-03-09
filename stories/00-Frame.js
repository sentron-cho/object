import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import { cs, Button, Util } from '../src';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const StyledBox = styled.div`{
  &.lb-box { ${cs.m.a5} ${cs.m.t20} ${props => cs.w.get(props.width)} ${cs.disp.block}

    .lb-tl { ${cs.disp.inblock} ${cs.font.md} ${cs.font.upper} }
    .lb-desc { ${cs.disp.inblock} ${cs.font.sm} ${cs.p.l10} ${cs.font.darkgray} }

    .lb-li { ${cs.m.t5} ${cs.max.width("100%")} ${cs.over.hidden} ${cs.pos.relative}
      ${cs.w.calc("100% - 20px")} ${props => cs.m.top(props.top)}  ${cs.min.height(60)}

      & > * { ${cs.m.r10} }
    }
    
    &.align, &.nomargin { .lb-li > * { ${cs.m.a0} }}
    &.v-align { .lb-li { ${cs.h.get(140)} }}

    &.box {
      .lb-li { ${cs.box.dashed} }
    }

    .lb-show { ${cs.m.t5} ${cs.m.r20} ${cs.float.none} &.ok{ ${cs.font.red} } }
    .lb-ex { ${cs.font.white} ${cs.bg.dark} ${cs.box.radius} ${cs.anim.show} ${cs.min.height(20)} ${cs.over.yauto}
      ${cs.w.get("calc(100% - 50px)")} ${cs.m.r20} ${cs.m.t5} ${cs.font.preline} ${cs.p.a10} ${cs.max.height(130)} ${cs.font.md}
    }

    &.inline {
      .lb-li { 
        & > * { ${cs.m.r10} ${cs.disp.inblock} ${props => props.cwidth && cs.w.get(`calc(${props.cwidth} - 20px)`)} }
      } 
    }
  }
}`;

export const Linebox = (props) => {
  const [copy, setCopy] = useState("code copy");

  useEffect(() => {
    setCopy("code copy");
  }, []);

  const { className = '', width = "calc(100% - 20px)", inline = false, sample = null, top = "", box = false, id = null } = props;

  let cwidth = "";
  if (inline) {
    if (!props.children.length) {
      cwidth = "100%";
    } else {
      cwidth = `${(100 / props.children.length)}%`;
    }
  }
  // const tag = props.title.split(" ").join("-");

  const onClick = (e, eid) => {
    setCopy(copy === "copy ok" ? "code copy" : "copy ok");
  }

  const iscopy = copy === 'copy ok';

  return <StyledBox className={cx("lb-box", className, { inline }, { box })} id={id} width={width} cwidth={cwidth} top={top}>
    {props.title && <label className={"lb-tl"}>{props.title}</label>}
    {props.desc && <p className={"lb-desc"}>{props.desc}</p>}
    <div className={cx("lb-li", props.className)}>
      {props.children}
    </div>
    {sample && <CopyToClipboard text={sample} onCopy={onClick} >
      <Button className={cx("lb-show gd-gray xs", iscopy && 'ok')} title={copy} />
    </CopyToClipboard>}

    {iscopy && <p className={"lb-ex"}>{sample}</p>}
  </StyledBox>
}

// export const standard = () => <Button name="Storybook" />;