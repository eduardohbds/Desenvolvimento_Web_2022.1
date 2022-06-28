import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { firebaseConfig } from '../keys/firebase_key'
import { getAuth } from 'firebase/auth'

export default class Firebase {
  constructor() {
    this.app = initializeApp(firebaseConfig)
    this.user = null
  }

  getFirestoreDb() {
    return getFirestore()
  }

  getAuthentication() {
    return getAuth(this.app)
  }

  setUser(user) {
    this.user = user
  }

  getUser() {
    return this.user
  }

}