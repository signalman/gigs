import { Box, Button, styled } from '@mui/material';
import React, { useCallback, useRef, useState } from 'react';
// import KakaoBtn from '../../../public/img/kakao_login_button.png';
import axios from 'axios';
import { API } from '../../utils/Constants';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

const {kakao} = window;

const Container = styled(Box)((p) => ({
  width: '1200px',
  margin: '0 auto',
  height: '1500px', // 임시
  backgroundColor: 'pink',
}));

/**
 * gigs 접속 시 제일 처음 보여지는 페이지
 * gigs에 대한 안내 혹은 홍보, 이벤트 등이 보여짐
 */
const Main = ({
  children,
}) => {
  const editor = useRef();

  const [text, setText] = useState("");

  const handleClick = useCallback(async () => {
    await axios.get(API.testApi);
  }, []);

  return (
    <>
      <Container>
        {children}
        <SunEditor
          lang="ko"
          defaultValue={text}
          onChange={(content) => {setText(content)}}
          getSunEditorInstance={(sunEditor) => {editor.current = sunEditor}}
          setOptions={{
            buttonList: [
              ['fontSize', 'align'],
              // ['paragraphStyle', 'blockquote'],
              ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
              ['fontColor', 'hiliteColor', 'textStyle'],
              ['removeFormat'],
              ['outdent', 'indent'],
              // ['align', 'horizontalRule', 'list', 'lineHeight'],
            ]
          }}
        />
        <Button onClick={() => {
          console.log(`text: ${text}`)
          console.log(editor.current.getContents());
        }} >하하</Button>
      </Container>
    </>
  );
};

export default Main;