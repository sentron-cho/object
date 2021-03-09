/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import cx from 'classnames/bind';
import styled from 'styled-components';
import { cs, Svg, Button } from './index';

const StyledObject = styled.span`{
  &.tab-button { ${cs.z.front} ${cs.pos.relative} ${cs.disp.inblock}
  // ${cs.anim.hide}

    .tab-label { ${cs.font.md} ${cs.p.b5} }
    .tab-frame { ${cs.disp.inblock} ${cs.group(2)}  ${cs.w.fit}
      .tab-btn { ${cs.min.w(60)} ${cs.w.fit}  }
    }
    
    &.full { ${cs.w.full} .tab-frame { ${cs.w.full} } }
    &.xs { .tab-btn { ${cs.w.get(40)} } .tab-label { ${cs.font.xs} } }
    &.sm { .tab-btn { ${cs.w.get(60)} } .tab-label { ${cs.font.sm} } }
    &.lg { .tab-btn { ${cs.w.get(80)} } .tab-label { ${cs.font.lg} } }
    &.xl { .tab-btn { ${cs.w.get(100)} } .tab-label { ${cs.font.xl} } }
  }
}`;

const TabButton = (props) => {
  const { list, icon = null, theme, color = 'primary', size = 'md', className = '', activeColor = 'green', disabled = false, label = '' } = props;

  if (!list || list.length < 1) {
    return <div style={{ color: `${cs.color.gray}` }}>no tab items</div>
  } else {
    const [select, setSelect] = useState(props.select || list[0].id);

    useEffect(() => {
      setSelect(props.select);
      return () => {
      }
    }, [props.select, props.list])

    const onClicked = (eid, e) => {
      const item = list.find(a => a.id === eid);
      props.onClick && props.onClick(eid, item, e);
      props.onChange && props.onChange(eid, item, e);
      setSelect(item.id);
    }

    const temps = className && className.split(' ');
    const isfull = temps && temps.includes("full");
    return <StyledObject className={cx("tab-button", className, theme)}>
      {label && <p className={"tab-label"}>{label}</p>}
      <span className={"tab-frame"}>
        {list.map((a, i) => {
          const active = a.id === select;
          const btncolor = active ? (a.color || activeColor) : color;

          if (icon)
            return <Svg key={i} className={cx("icon tab-icon", btncolor, icon, size)} theme={theme} onClick={onClicked}
              eid={a.id} name={a.icon} color={color} />
          else
            return <Button key={i} className={cx("tab-btn", btncolor, size)} theme={theme}
              onClick={onClicked} title={a.title} eid={a.id} disabled={disabled}
              style={isfull ? { width: `${Number(100 / list.length).toFixed(5)}%` } : {}} />
        })}
      </span>
    </StyledObject>
  }
}

export default TabButton;