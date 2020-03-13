
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import cx from 'classnames/bind';
import { useDrag, useDrop } from 'react-dnd';
import { cs } from './index';

export const DT = { CARD: 'card' };

const StyledFrame = styled.span`{
  &.drag-drop {
    ${cs.disp.inblock} ${cs.opac.visible}
    &.draging {
      ${cs.opac.get(0.2)}
    }

    &:not(.disable) { ${cs.mouse.move} }
    // &:hover { &:first-child { ${cs.box.line} ${cs.border.primary} } }
    // ${cs.w.get(100)} ${cs.h.get(80)} ${cs.box.line}
    // ${cs.w.full}
  }
}`;

const Dragable = (props) => {
  const { id, index, onDragDrop, children, disable = false } = props;

  // disable이면 그냥 child만 리턴하자...
  if (disable) {
    return (children);
  }

  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: DT.CARD,
    hover(item, monitor) {
      if (!ref.current) { return; };
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) { return; };
      // // Determine rectangle on screen
      // const hoverBoundingRect = ref.current.getBoundingClientRect();
      // // Get vertical middle
      // const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // // Determine mouse position
      // const clientOffset = monitor.getClientOffset();
      // // Get pixels to the top
      // const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // // Only perform the move when the mouse has crossed half of the items height
      // // When dragging downwards, only move when the cursor is below 50%
      // // When dragging upwards, only move when the cursor is above 50%
      // // Dragging downwards
      // if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) { return; };
      // // Dragging upwards
      // if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) { return; };
      // // Time to actually perform the action
      // (!disable && onDragDrop) && onDragDrop('drag', dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      (!disable && onDragDrop) && onDragDrop('drag', dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
    drop(item) {
      (!disable && onDragDrop) && onDragDrop('drop', item.index, item.index);
    },
  });
  const [{ isDragging }, drag] = useDrag({
    item: { type: DT.CARD, id, index },
    collect: monitor => ({ isDragging: monitor.isDragging() }),
  });
  drag(drop(ref));

  return (
    <StyledFrame className={cx('drag-drop', isDragging && 'draging', (index), { disable })} ref={ref}>
      {children}
      {/* <span>test</span> */}
    </StyledFrame>
  )
}

export default Dragable;