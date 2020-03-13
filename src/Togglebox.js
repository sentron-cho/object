import React, { useState } from 'react';
import cx from 'classnames/bind';
import styled from 'styled-components';
import { cs, Svg, Button } from './index';

const StyledObject = styled.span`{
  &.toggle-box { ${cs.anim.hide} ${cs.z.front}

    // &.fixed {
    //   position: fixed; padding: 10px; z-index: 9999999; ${cs.opac.alpha}
    //   &.top { top: 0; left: 50%; transform: translate(-50%, -60%); }
    //   &.bottom { bottom: 0; left: 50%; transform: translate(-50%, 60%); }
      
    //   &.left { left: 0; bottom: 50%; transform: translate(-60%, -50%); }
    //   &.ltop { top: 10px; left: 0; transform: translateX(-60%); }
    //   &.lbottom { bottom: 10px; left: 0; transform: translateX(-60%); }

    //   &.right { right: 0; bottom: 50%; transform: translate(60%, -50%); }
    //   &.rtop { top: 10px; right: 0; transform: translateX(60%); }
    //   &.rbottom { bottom: 10px; right: 0; transform: translateX(60%); }

    //   &.center { left: 50%; bottom: 50%; }

  
    //   &:hover { ${cs.anim.show} ${cs.opac.show}
    //     &.left, &.right { transform: translate(0%, -50%); }
    //     &.lbottom, &.ltop, &.rbottom, &.rtop { transform: translateX(0%); }

    //     &.top { transform: translate(-50%, 0%); }
    //     &.bottom { transform: translate(-50%, 0%); }
    //     &.center { }
    //   }
    // }

    // .svg-icon.box { padding: 8px; }
  }
}`;

const Togglebox = (props) => {
  const { list, icon = null } = props;
  
  if (!list) {
    return <div style={{ color: `${cs.color.gray}` }}>no items</div>
  } else {
    const select = props.select || props.eid || null;
    const [item, setItem] = useState(select ? list.find(item => item.eid === select) : list[0]);

    const onClicked = (eid, e) => {
      let index = list.findIndex(a => a.eid === item.eid);
      (index >= list.length - 1) ? index = 0 : index++;

      // setSelect(list[index].eid);
      setItem(list[index]);
      props.onClick && props.onClick(eid, list[index]);
    }

    return <StyledObject className={cx("toggle-box", props.className)}>
      {!icon && <Button className={cx("primary", props.className)} onClick={onClicked} title={item.title} eid={item.eid} />}
      {icon && <Svg className={cx("icon md", icon, props.className)} onClick={onClicked} eid={item.eid} name={item.icon} color={props.color} />}
    </StyledObject>
  }
}

export default Togglebox;