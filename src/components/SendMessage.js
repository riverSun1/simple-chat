import React, { useState } from 'react'
import { db, auth } from '../firebase'
import firebase from 'firebase'
import { Input, Button } from '@material-ui/core'

function SendMessage({ scroll }) {
    // 실제로 사용 상태 hook의 반응을 가져오는 것이다.
    // 상태를 사용하도록 설정하고 이것을 빈 문자열의 기본값으로 설정하고
    // <Input value={msg}
    // 이 입력값을 메시지로 설정하고 입력에 업데이트가 있을 때마다 
    // 누군가 입력에 무언가를 입력할 때마다 우리는 함수를 실행할 것이므로
    // 여기에 작은 화살표 함수만 있으면 onChange={e => setMsg(e.target.value)
    // 해당함수는 e의 매개변수를 취합니다.
    // 이벤트 및 우리는 단지 이벤트 메시지를 e.target.value로 설정할 것이므로 ???
    // 기본적으로 제어된 구성 요소가 어떻게 작동하는지 모르는 경우 입력할 때마다 변경 시 이 기능을 실행하고 있다.
    // 메시지를 다시 설정하여 이 메시지 상태를 값으로 설정하고 값이 메시지이므로
    // 입력과 상태 사이에 일종의 양방향 데이터 바인딩을 생성하고 이제 입력에 무언가를 입력할 때마다 
    // 여기서 우리의 오류는 재료 ui에서 가져온 입력과 버튼이 있기 때문입니다.
    // 화면에서 보면 우리가 텍스트를 입력할때마다 메시지상태를 업데이트하고있다.
    const [msg, setMsg] = useState('')

    // 비동기식 함수
    async function sendMessage(e) {
        e.preventDefault() // 버튼을 누를때 페이지가 새로 고쳐지지 않도록 이벤트 방지 기본값을 수행
        
        const { uid, photoURL } = auth.currentUser

        await db.collection('messages').add({
            text: msg,
            photoURL,
            uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
            // 메세지가 밀리초 단위로 전송.
            // 2개의 메시지가 동시에 전송된 경우 어떤 메시지가 먼저 설정되었는지 알수있다.
            // 배열 내에서 올바르게 정렬되고

        })
        setMsg('') // 마지막으로 이 함수 내에서 메시지를 비우므로 전송 후 메시지 보내기를 누르고 데이터베이스로 메시지를 보냅니다.
        // 사용자가 원하는 경우 다른 메시지를 보낼 수 있도록 입력 상자를 비울 것입니다.

        scroll.current.scrollIntoView({ behavior: 'smooth' })
    }

    // 메시지를 입력할 입력창과 보낼 버튼을 갖도록
    return (
        <div>
            <form onSubmit={sendMessage}>
                <div className="sendMsg">
                    <Input style={{ width: '78%', fontSize: '15px', fontWeight: '550', marginLeft: '5px', marginBottom: '-3px' }} placeholder='Message...' type="text" value={msg} onChange={e => setMsg(e.target.value)} />
                    <Button style={{ width: '18%', fontSize: '15px', fontWeight: '550', margin: '4px 5% -13px 5%', maxWidth: '200px'}} type="submit">Send</Button>
                </div>
            </form>
        </div>
    )
}

export default SendMessage
