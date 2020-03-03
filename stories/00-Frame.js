import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import { cs, Button, Util } from '../src';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const StyledBox = styled.div`{
  &.lb-box { ${cs.m.a5} ${cs.m.t20} ${props => cs.w.get(props.width)} ${cs.disp.inblock}

    .lb-tl { ${cs.disp.inblock} ${cs.font.md} ${cs.font.upper} }
    .lb-desc { ${cs.disp.inblock} ${cs.font.sm} ${cs.p.l10} ${cs.font.darkgray} }

    .lb-li { ${cs.m.t5} ${cs.max.width("100%")} ${cs.over.hidden}
      ${cs.w.calc("100% - 20px")}

      & > * { ${cs.m.r10} }
    }

    .lb-show { ${cs.m.t5} ${cs.m.r30} &.ok{ ${cs.font.red} } }
    .lb-ex { ${cs.font.white} ${cs.bg.dark} ${cs.box.radius} ${cs.anim.show} ${cs.min.height(20)} ${cs.over.yauto}
      ${cs.w.get("calc(100% - 50px)")} ${cs.m.r20} ${cs.m.t5} ${cs.font.preline} ${cs.p.a10} ${cs.max.height(130)} ${cs.font.md}
    }

    &.inline {
      .lb-li { 
        & > * { ${cs.disp.inblock} ${props => props.cwidth && cs.w.get(`calc(${props.cwidth} - 10px)`)} }
      } 
    }
  }
}`;

export const Linebox = (props) => {
  const [copy, setCopy] = useState("code copy");

  useEffect(() => {
    setCopy("code copy");
  }, []);

  const { className='', width = "calc(100% - 20px)", inline = false, sample = 'There is no sample code.' } = props;

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

  return <StyledBox className={cx("lb-box", className, { inline })} width={width} cwidth={cwidth}>
    <label className={"lb-tl"}>{props.title}</label>
    {props.desc && <p className={"lb-desc"}>{props.desc}</p>}
    <div className={cx("lb-li", props.className)}>
      {props.children}
    </div>
    <CopyToClipboard text={sample} onCopy={onClick} >
      <Button className={cx("lb-show gd-gray xs right", iscopy && 'ok')} title={copy} />
    </CopyToClipboard>
    
    {iscopy && <p className={"lb-ex"}>{sample}</p>}
  </StyledBox>
}

// export const standard = () => <Button name="Storybook" />;