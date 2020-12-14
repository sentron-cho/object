import React, { useState, useEffect } from 'react';
import DaumPostCode from 'react-daum-postcode';
import cx from 'classnames/bind';
import styled from 'styled-components';
import { cs, Button } from './index';
import Loading from './Loading';
import { ST } from './Config';

const StyledObject = styled.span`{
  &.post-code {
    ${cs.size.full} ${cs.pos.relative} ${cs.disp.block} ${cs.bg.frame} ${cs.box.light}
    ${cs.min.w(300)} ${cs.min.h(460)} ${cs.scrollbar.t1}

    .cancel { ${cs.z.menu} ${cs.bottom(5)} ${cs.right(20)} }

    & > div > div { ${cs.disp.block} position: absolute !important; }

    @media screen and (max-width : 600px) { 

    }
  }
}`;

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

  const [show, setShow] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setShow(true);

    setTimeout(() => setShow(false), 200);
    setTimeout(() => { setShow(true); setLoaded(true); }, 1000);
    return () => {
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
      {loaded && <Button className={'dark sm right bottom cancel'} title={ST.CLOSE} onClick={onCancel}/>}
    </StyledObject>
  );
}

export default Postcode;