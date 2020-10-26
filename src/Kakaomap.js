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

    .nodata { ${cs.font.gray} ${cs.box.line} ${cs.font.center} ${cs.pos.relative} ${cs.size.full} 
      & > span { ${cs.align.center} } 
    }

    .cancel { ${cs.z.menu} ${cs.bottom(5)} ${cs.right(5)} }
  }
}`;

const makesid = (count = 5) => {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < count; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text + new Date().getTime();
};

const Kakaomap = (props) => {
  // eslint-disable-next-line no-unused-vars
  const [map, setMap] = useState(null);
  const [elemid, setElemid] = useState(makesid(5));
  const [maker, setMaker] = useState(null);

  useEffect(() => {
    const kakaokey = props.kakaokey;
    const position = props.position || [0, 0];
    // const rowid = props.rowid || new Date();

    const creatMapbox = () => {
      let container = document.getElementById(elemid);
      if (!container) return;

      if (!map) {
        let options = {
          center: new kakao.maps.LatLng(Number(position[0]), Number(position[1])),
          level: 3
        };

        const tmap = new kakao.maps.Map(container, options);
        setMap(tmap);

        // var geocoder = new kakao.maps.services.Geocoder();
        // console.dir(geocoder);
        new kakao.maps.Marker({ map: tmap, position: new kakao.maps.LatLng(Number(position[0]), Number(position[1])) });
      } else {
        map.panTo(new kakao.maps.LatLng(Number(position[0]), Number(position[1])));
        // map.setMaker(new kakao.maps.LatLng(Number(position[0]), Number(position[1])));
        new kakao.maps.Marker({ map: map, position: new kakao.maps.LatLng(Number(position[0]), Number(position[1])) });
      }
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
  }, [elemid, props.kakaokey, props.position]);

  // if (!props.rowid) {
  //   return <StyledObject className={cx('kakao-map nodata', props.className)} >
  //   </StyledObject>
  // }
  return <StyledObject id={elemid} className={cx('kakao-map', props.className)}>
    {(!props.rowid || !props.position) && <div className={'nodata'}><span>NO DATA</span></div>}
  </StyledObject>
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