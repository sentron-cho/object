import React, { useState } from 'react';
import cx from 'classnames/bind';
import styled from 'styled-components';
import { cs, Svg, Button } from './index';

const StyledObject = styled.span`{
  &.toggle-box { ${cs.anim.hide} ${cs.z.front} ${cs.pos.relative} ${cs.disp.inblock}

    .tgb-curr { ${cs.disp.inblock}  }
    
    &.anim {
      .tgb-next { ${cs.pos.ltop} ${cs.pos.absolute} ${cs.disp.none}
        ${cs.anim.showin('0.5s')}  ${cs.anim.timing('step-start')}
      }

      &:hover { 
        .tgb-curr { ${cs.anim.showout('0.5s')}  ${cs.anim.timing('step-start')} }
        .tgb-next { 
          ${cs.disp.inblock}
        }
      }
    }

    .tgb-btn { ${cs.w.get(60)} }
    
    &.xs { .tgb-btn { ${cs.w.get(40)} } }
    &.sm { .tgb-btn { ${cs.w.get(60)} } }
    &.lg { .tgb-btn { ${cs.w.get(80)} } }
    &.xl { .tgb-btn { ${cs.w.get(100)} } }
  }
}`;

const Togglebox = (props) => {
  const { list, icon = null, anim = false } = props;

  if (!list) {
    return <div style={{ color: `${cs.color.gray}` }}>no items</div>
  } else {
    const onClicked = (eid, e) => {
      // let index = list.findIndex(a => a.eid === item.eid);
      // (index >= list.length - 1) ? index = 0 : index++;

      // setSelect(list[index].eid);
      // setItem(list[index]);
      setItem(next);
      setNext(nextItem(next.eid));
      props.onClick && props.onClick(eid, next);
    }

    const nextItem = (eid) => {
      let index = list.findIndex(a => a.eid === eid);
      (index >= list.length - 1) ? index = 0 : index++;
      return list[index];
    }

    const select = props.select || props.eid || null;
    const [item, setItem] = useState(select ? list.find(item => item.eid === select) : list[0]);
    const [next, setNext] = useState(nextItem(item.eid));

    return <StyledObject className={cx("toggle-box", props.className, { anim })}>
      <span className={"tgb-curr"}>
        {!icon &&
          <Button className={cx("primary tgb-btn", props.className)} onClick={onClicked} title={item.title} eid={item.eid} />
        }
        {icon &&
          <Svg className={cx("icon md tgb-icon", icon, props.className)} onClick={onClicked} eid={item.eid} name={item.icon} color={props.color} />
        }
      </span>
      {anim && <span className={"tgb-next"}>
        {!icon &&
          <Button className={cx("primary tgb-btn", props.className)} onClick={onClicked} title={next.title} eid={next.eid} />
        }
        {icon &&
          <Svg className={cx("icon md tgb-icon", icon, props.className)} onClick={onClicked} eid={next.eid} name={next.icon} color={props.color} />
        }
      </span>}
    </StyledObject>
  }
}

export default Togglebox;