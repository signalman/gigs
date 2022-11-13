import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { COLOR } from '../../utils/Constants';

const { kakao } = window;

const Container = styled(Box)((props) => ({
  width: '1180px',
  height: '280px',
  margin: '0 auto',
  marginTop: '25px',
  padding: '10px',
  boxShadow: '0 0 2px black',
}));

const NotFoundBox = styled(Box)((props) => ({
  width: '1180px',
  height: '280px',
  lineHeight: '280px',
  fontSize: '30px',
  color: COLOR.grey,
  textAlign: 'center',
  userSelect: 'none',
}));

const MapBox = ({
  address,
}) => {
  const [map, setMap] = useState(null);
  const [isValidAddress, setValidAddress] = useState(true);

  useEffect(() => {
    // 지도 생성
    const mapContainer = document.getElementById('kakao_map');
    const options = { //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 1 //지도의 레벨(확대, 축소 정도)
    };

    setMap(new kakao.maps.Map(mapContainer, options));
  }, []);

  useEffect(() => {
    // 아직 지도가 로드되지 않았다면 실행 취소
    if(!map) return;

    console.log(address.road);

    // 주소로 위치 검색
    const geocoder = new kakao.maps.services.Geocoder();
    console.log("Search!")
    geocoder.addressSearch(address.road, (result, status) => {
      if(status === kakao.maps.services.Status.OK) {
        setValidAddress(true);

        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // 마커 표시
        const marker = new kakao.maps.Marker({
          map: map,
          position: coords,
        });

        // 중심으로 이동
        map.setCenter(coords);
      } else {
        // TODO: 지도 검색 실패 시
        console.log(`주소 검색 실패: ${address.road}`);
        setValidAddress(false);
      }
    });
  }, [address, map]);

  return (
    <Container>
      {/* 이 div가 없으면 카카오 맵에서 에러가 뜬다 */}
      <div
        id='kakao_map'
        style={{
          width: '1180px',
          height: isValidAddress ? '280px' : '0',
        }}
      ></div>
      {isValidAddress || (
        <NotFoundBox>지도를 불러오는 중입니다...</NotFoundBox>
      )}
      
    </Container>
    
  );
};

export default MapBox;