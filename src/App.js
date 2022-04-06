import './App.css';
import Chat from './components/Chat';
import SignIn from './components/SignIn';
import { auth } from './firebase.js'
// google 계정을 사용하여 로그인했는지 확인하기 위해 사용
import { useAuthState } from 'react-firebase-hooks/auth'

function App() {
  const [user] = useAuthState(auth) // 로그인한 경우 true, 아니면 false
  return ( // true이면 채팅을 표시 / false는 true반환 true는 false 반환
    <>
      {user ? <Chat /> : <SignIn />}
    </>
  );
}

export default App;
