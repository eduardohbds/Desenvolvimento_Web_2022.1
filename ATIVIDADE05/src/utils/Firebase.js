// import { initializeApp } from 'firebase/app'
// import { getFirestore } from 'firebase/firestore'
// import { firebaseConfig } from '../keys/firebase_keys'

import firebase from 'firebase/compat/app'
import { getFirestore } from 'firebase/firestore'
import key from '../keys/firebase_key'
//import firebase_keys from '../keys/firebase_keys'

export default class Firebase {
  constructor() {
    //this.app = initializeApp(firebaseConfig)
    firebase.initializeApp(key)
  }
  getFirestore() {
    return getFirestore()
  }
}