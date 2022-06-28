import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, updateDoc } from 'firebase/firestore'

export default class FirebaseService {
  

  static list = (firestore, callback) => {
    getDocs(collection(firestore, 'estudante'))
      .then((querySnapshot) => {
        let estudantes = []
        querySnapshot.forEach(
          (doc) => {
            const { name, course, ira } = doc.data()
            estudantes.push({ _id: doc.id, name, course, ira })
          }
        )
        callback(estudantes)
      })
      .catch((error) => console.log(error))
  }

  static list_onSnapshot(firestore, callback) {

    const q = query(collection(firestore, 'estudante'))
    FirebaseService.unscribe = onSnapshot(
      q,
      (querySnapshot) => {
        let estudantes = []
        querySnapshot.forEach(
          (doc) => {
            const { name, course, ira } = doc.data()
            estudantes.push({ _id: doc.id, name, course, ira })
          }
        )
        callback(estudantes)
      })
  }

  static create = (firestore, callback, data) => {
    addDoc(collection(firestore, 'estudante'), data)
      .then(
        (doc) => {
          console.log("CREATE:" + doc.id)
          callback()
        }
      )
      .catch((error) => console.log(error))
  }


  static retrieve = async (firestore, callback, _id) => {

    const docRef = doc(firestore, "estudante", _id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      //console.log("Document data:", docSnap.data());
      callback(docSnap.data())
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }

  }

  static retrieve_promisse = (firestore, callback, _id) => {
    const docRef = doc(firestore, "estudante", _id);
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists) callback(docSnap.data())
      })
      .catch(error => console.log(error))
  }

  static update = (firestore, callback, _id, body) => {
    const docRef = doc(firestore, "estudante", _id);
    updateDoc(docRef, body)
      .then(
        () => {
          callback()
        }
      )
      .catch((error) => console.log(error))
  }

  static delete = (firestore, callback, _id) => {
    const docRef = doc(firestore, "estudante", _id);
    deleteDoc(docRef)
      .then(
        () => {
          callback()
        }
      )
      .catch((error) => console.log(error))
  }
}
/**
 * 20th century boys
green blood
ajin
innocent
monster
oyasumi pun pun */