import DaumPostcode from 'react-daum-postcode';
import React, { useState } from 'react';
import cx from 'classnames/bind';
import styled from 'styled-components';
import { cs, Svg, Button } from './index';

const StyledObject = styled.span`{
  &.post-code { 
  }
}`;

const Postcode = (props) => {
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

    console.log(fullAddress);  // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    props.onComplete && props.onComplete(fullAddress);
  }

  return (
    <StyledObject className={'post-code'}>
      <DaumPostcode onComplete={handleComplete} {...props} />
    </StyledObject>
  );
}

export default Postcode;