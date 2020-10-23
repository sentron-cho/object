/*global kakao*/
import React, { useState, useEffect } from 'react';
import DaumPostCode from 'react-daum-postcode';
import cx from 'classnames/bind';
import styled from 'styled-components';
import { cs, Svg, Button } from './index';
import Loading from './Loading';
import { ST } from './Config';

const StyledObject = styled.span`{
  &.kakao-map {
    ${cs.size.full} ${cs.pos.relative} ${cs.disp.block} 
    ${cs.min.w(300)} ${cs.min.h(200)} ${cs.scrollbar.t1}

    .cancel { ${cs.z.menu} ${cs.bottom(5)} ${cs.right(5)} }
  }
}`;

const Kakaomap = (props) => {
  // eslint-disable-next-line no-unused-vars
  const [map, setMap] = useState(null);

  useEffect(() => {
    const kakaokey = props.kakaokey;
    const position = props.position || [0, 0];
    const rowid = props.rowid;

    const creatMapbox = () => {
      let container = document.getElementById(rowid);
      let options = {
        center: new kakao.maps.LatLng(Number(position[0]), Number(position[1])),
        level: 3
      };

      const map = new kakao.maps.Map(container, options);
      setMap(map);

      // var geocoder = new kakao.maps.services.Geocoder();
      // console.dir(geocoder);
      new kakao.maps.Marker({ map: map, position: new kakao.maps.LatLng(Number(position[0]), Number(position[1])) });
    }

    creatKakaomapScript(kakaokey, () => {
      creatMapbox();
    })

    // let object = document.getElementsByClassName('kakaomap-script');
    // let script = null;
    // if (object && object.length <= 0) {
    //   script = document.createElement("script");
    //   script.async = true;
    //   script.className = 'kakaomap-script';
    //   script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaokey}&autoload=false&libraries=services`;
    //   document.head.appendChild(script);

    //   script.onload = () => {
    //     kakao.maps.load(() => {
    //       creatMapbox();
    //     });
    //   };
    // } else {
    //   creatMapbox();
    // }
  }, [props.kakaokey, props.position, props.rowid]);

  if (!props.rowid) return null;
  return <StyledObject id={props.rowid} className={cx('kakao-map', props.className)} />
}

export default Kakaomap;

export const creatKakaomapScript = (kakaokey = '', callback = null) => {
  let object = document.getElementsByClassName('kakaomap-script');
  if (object && object.length > 0) {
    object[0].remove();
  }

  // let script = null;
  // if (object && object.length <= 0) {
    let script = document.createElement("script");
    script.async = true;
    script.className = 'kakaomap-script';
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaokey}&autoload=false&libraries=services`;
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        callback && callback();
      });
    };
  // } else {
  //   callback && callback();
  // }
}