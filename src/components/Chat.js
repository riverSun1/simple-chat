import React, { useState, useEffect, useRef } from 'react'
// use stat hook을 생성하여 새상태를 가져온다.
import { db, auth } from '../firebase'
import SendMessage from './SendMessage'
import SignOut from './SignOut'

function Chat() {
    const scroll = useRef()
    const [messages, setMessages] = useState([]) // 메세지 상태는 빈 배열
    
    // 이러한 효과 내부의 배열 내부에서 변경될 때마다 전체 사용효과가 다시 실행되어 배열에 전달 
    // 배열에 따라 업데이트가 될 것이므로 메세지가 변경될 때마다, 메세지를 보낼때마다 효과를 업데이트한다.
    // firebase에는 스냅샷에 대해 호출된 것이 있으므로 실제로 그렇게 할 필요는 없다.
    // 우리는 firebase에서 db를 가져올 것이므로 firebase에서 import db를 자동으로 가져오고 
    // 데이터베이스에 엑세스 할 것이므로 firebase.js에서 const of db를 설정하여 이 변수를 firebaseApp으로 설정하여 이 앱에 엑세스한다.
    
    // 생성된 기준으로 배열을 정렬 - create.timestamp을 생성
    // 모든 메시지를 가장 최근에 전송된 순서대로 정렬한다. - createdAt
    // 최신 메시지가 맨 아래에 위치하도록
    // 이 사용효과에 의해 수신되는 메시지의 양을 50개의 메시지로 제한한다.
    // 이 채팅에 수천개의 메시지가 있다고 가정해보면
    // 페이지를 실제로 보기까지 한 시간 정도 걸릴 수 있으므로
    // 최신 페이지를 로드하고 싶기 때문에 50개만 로드할 것 입니다.
    // 여기에서 이벤트를 사용할 것입니다.
    // 리스너는 스냅샷에서 호출되므로 메시지 컬렉션 내에서 무언가가 변경될 때마다
    // 이것은 스냅샷에서 실행되고 스냅샷에서는 해당 화살표 함수 내부에 오류 기능이 있을 것이므로
    // 스냅샷은 단순히 스냅샷의 스냅샷일 뿐입니다.
    // 컬렉션 내부의 데이터와 메시지 배열을 스냅샷이 무엇이든 간에 스냅샷 dot docs.map으로 설정할 것이므로
    // 이 문서에서 가져오는 메시지 컬렉션의 문서로 이동합니다.
    // 그쪽으로 매핑 t. 해당 컬렉션의 모든 문서와 각 문서에 대해 데이터를 전달하기만 하면 doc dot data
    
    // 와 같은 데이터를 여기에서 매핑하고 메시지를 매핑하여 messages.map()을 수행하고
    // => 각 메시지에 대해 div내부에 div를 반환하면 이미지와 단락 텍스트가 있으므로
    // 이미지는 프로필 사진이 되고 태그는 그 사람이 보낸 텍스트 또는 메시지가 됩니다.
    
    // messages.map(({ id, text, photoURL, uid } 여기에서
    // 우리는 몇가지 변수를 구조화할 것이다. id, text, photoURL, uid
    // 구조화하여 나중에 이것을 전달하여 사용자가 보낼 때마다
    // 그들의 메시지... ? 는 firebase에 의해 자동으로 생성될 것이므로 기본적으로
    // 텍스트는 입력 photoURL에 입력하는 텍스트이다.
    // google ac의 프로필사진입니다.
    // 그들이 로그인하고 id는 단지 자동 id ,,,???? 라고 계산합니다.
    

    useEffect(() => {
        db.collection('messages').orderBy('createdAt').limit(50).onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => doc.data()))
        })
    }, [])
    return (
        <div>
            <SignOut />
            <div className="msgs">
                {messages.map(({ id, text, photoURL, uid }) => (
                    <div>
                        <div key={id} className={`msg ${uid === auth.currentUser.uid ? 'sent' : 'received'}`}>
                            <img src={photoURL} alt="" />
                            <p>{text}</p>
                        </div>
                    </div>
                ))}
            </div>
            <SendMessage scroll={scroll} />
            <div ref={scroll}></div>
        </div>
    )
}

export default Chat
