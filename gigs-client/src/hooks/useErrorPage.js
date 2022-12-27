import { useNavigate } from 'react-router-dom';

/**
 * 
 * @returns 에러 페이지로 이동할 수 있는 함수
 */
const useErrorPage = () => {
  const navigate = useNavigate();

  const move = (msg) => {
    navigate('/error', {state: msg});
  };

  return {
    serverError: () => move('서버에 문제가 발생했습니다.'),
  } 
};

export default useErrorPage;