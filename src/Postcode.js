import React, { useState, useEffect } from 'react';
import DaumPostCode from 'react-daum-postcode';
import cx from 'classnames/bind';
import styled from 'styled-components';
import { cs, Svg, Button } from './index';
import Loading from './Loading';
import { ST } from './Config';

const StyledObject = styled.span`{
  &.post-code {
    ${cs.size.full} ${cs.pos.relative} ${cs.disp.block} ${cs.bg.frame} ${cs.box.light}
    ${cs.min.w(300)} ${cs.min.h(460)} ${cs.scrollbar.t1}

    .cancel { ${cs.z.menu} ${cs.bottom(5)} ${cs.right(5)} }

    & > div > div { ${cs.disp.block} position: absolute !important; }
  }
}`;

var timer1 = null;
var timer2 = null;

const Postcode = (props) => {


  const modalStyle = {
    display: "block",
    position: "absolute",
    top: "0px",
    left: "0px",
    zIndex: "100",
    padding: "0px",
    overflow: "hidden"
  }

  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true);

    timer1 = setTimeout(() => setShow(false), 200);
    timer2 = setTimeout(() => setShow(true), 1000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    }
  }, []);


  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }

    // console.log(fullAddress);  // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    props.onComplete && props.onComplete(fullAddress, data);
  }

  const onCancel = (eid, e) => {
    props.onCancel && props.onCancel('cancel', e);
  }

  return (
    <StyledObject className={cx('post-code', props.className)}>
      {show ? <DaumPostCode onComplete={handleComplete} autoClose width={'100%'} height={'100%'}
        style={modalStyle} /> : <Loading />
      }
      <Button className={'gd-gray right bottom cancel'} title={ST.CANCEL} onClick={onCancel} />
    </StyledObject>
  );
}

export default Postcode;