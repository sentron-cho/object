/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import cx from 'classnames/bind';
import styled from 'styled-components';
import { cs, Svg, Button } from './index';

const StyledObject = styled.span`{
  &.tab-button { ${cs.anim.hide} ${cs.z.front} ${cs.pos.relative} ${cs.disp.inblock}

    .tab-frame { ${cs.disp.inblock} ${cs.group(2)}  ${cs.w.fit}
      .tab-btn { ${cs.min.w(60)} ${cs.w.fit}  }
    }
    
    
    &.xs { .tab-btn { ${cs.w.get(40)} } }
    &.sm { .tab-btn { ${cs.w.get(60)} } }
    &.lg { .tab-btn { ${cs.w.get(80)} } }
    &.xl { .tab-btn { ${cs.w.get(100)} } }
  }
}`;

const TabButton = (props) => {
  const { list, icon = null, theme, color = 'primary', size = 'md', className = '', activeColor = 'green', disabled = false } = props;

  if (!list) {
    return <div style={{ color: `${cs.color.gray}` }}>no items</div>
  } else {
    const [select, setSelect] = useState(props.select || list[0].id);

    useEffect(() => {
      setSelect(props.select);
      return () => {
      }
    }, [props.select])

    const onClicked = (eid, e) => {
      const item = list.find(a => a.id === eid);
      props.onClick && props.onClick(eid, item, e);
      setSelect(item.id);
    }

    return <StyledObject className={cx("tab-button", className, theme)}>
      <span className={"tab-frame"}>
        {list.map((a, i) => {
          const active = a.id === select;
          const btncolor = active ? (a.color || activeColor) : color;

          if (icon)
            return <Svg key={i} className={cx("icon tab-icon", btncolor, icon, size)} theme={theme} onClick={onClicked}
              eid={a.id} name={a.icon} color={color} />
          else
            return <Button key={i} className={cx("tab-btn", btncolor, size)} theme={theme}
              onClick={onClicked} title={a.title} eid={a.id} disabled={disabled} />
        })}
      </span>
    </StyledObject>
  }
}

export default TabButton;