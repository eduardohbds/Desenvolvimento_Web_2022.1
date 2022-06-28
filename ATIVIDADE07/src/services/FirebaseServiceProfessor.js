import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, updateDoc } from 'firebase/firestore'

export default class FirebaseServiceProfessor {
  static list = (firestore, callback) => {
    getDocs(collection(firestore, 'professores'))
      .then(
        (querySnapshot) => {
          //callback('Deu certo!')
          let professores = []
          querySnapshot.forEach(
            (document) => {
              //console.log(document.data())
              professores.push(
                {
                  _id: document.id,
                  name: document.data().name,
                  university: document.data().university,
                  degree: document.data().degree
                }
              )
            }
          )
          callback(professores)
        }
      )
      .catch(error => console.log(error))
  }

  static list_onSnapshot = (firestore, callback) => {
    const q = query(collection(firestore, 'professores'))
    onSnapshot(
      q,
      (querySnapshot) => {
        let students = []
        querySnapshot.forEach(
          (document) => {
            //console.log(document.data())
            students.push(
              {
                _id: document.id,
                name: document.data().name,
                university: document.data().university,
                degree: document.data().degree
              }
            )
          }
        )
        callback(students)
      }
    )
  }

  static create = (firestore, callback, professores) => {
    const coll = collection(firestore, 'professores')
    addDoc(coll, professores)
      .then(
        (document) => {
          console.log('CREATE: ' + document.id)
          callback()
        }
      )
      .catch(error => console.log(error))
  }

  static retrieve = (firestore, callback, _id) => {
    const documentRef = doc(firestore, 'professores', _id)
    getDoc(documentRef)
      .then(
        (documentSnap) => {
          callback(documentSnap.data())
        }
      )
      .catch(error => console.log(error))
  }

  static update = (firestore, callback, _id, professores) => {
    const documentRef = doc(firestore, 'professores', _id)
    updateDoc(documentRef, professores)
      .then(
        () => {
          callback()
        }
      )
      .catch(error => console.log(error))
  }

  static delete = (firestore, callback, _id) => {
    const documentRef = doc(firestore, 'student', _id)
    deleteDoc(documentRef)
      .then(() => callback())
      .catch(error => console.log(error))
  }

}
