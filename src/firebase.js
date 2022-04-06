import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAA_DLNRsxNgq3ou-_80Ek0NrnE2C7_ugA",
    authDomain: "simple-chat-3754c.firebaseapp.com",
    projectId: "simple-chat-3754c",
    storageBucket: "simple-chat-3754c.appspot.com",
    messagingSenderId: "855367157853",
    appId: "1:855367157853:web:b864255d5d47affb1de5b4"
})

const db = firebaseApp.firestore() // DB

const auth = firebase.auth() // 인증

export { db, auth } // db, auth 두 변수를 내보내 애플리케이션 전제체에서 사용할 수 있도록