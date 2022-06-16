export default class FirebaseServiceProfessor {
  static list = (firestore, callback) => {
    let ref = firestore.collection('professores')
    ref.onSnapshot((query) => {
      let professores = []
      query.forEach((doc) => {
        const { name,university,degree } = doc.data()
        professores.push({
          _id: doc.id,
          name,
          university,
          degree
        })//push
      })//forEach
      callback(professores)
      //this._isMounted && this.setState({ professores: professores, loading: false })
    })
  }
  static delete = (firestore, callback, id) => {
    firestore.collection('professores').doc(id).delete()
      .then(
        () => {
          //console.log(`${nome} apagado.`)
          callback('ok')
        }
      )
      .catch(
        (error) => {
          //console.log(error)
          callback('nok')
        }
      )
  }
  static create = (firestore, callback, professor) => {
    firestore.collection('professores').add(
      {
        name: professor.name,
        university: professor.university,
        degree: professor.degree
      }
    )
      .then(
        () => {
          callback('ok')
        }
      )
      .catch(
        (error) => {
          callback('nok')
        }
      )
  }
  static retrieve = (firestore, callback, id) => {
    firestore.collection('professores').doc(id).get()
      .then((doc) => {
        const professor = {
          nome: doc.data().nome,
          university: doc.data().university,
          degree: doc.data().degree
        }
        callback(professor)
      })
      .catch(error => callback(null))
  }
  static edit = (firestore, callback, id, professor) => {
    firestore.collection('professores').doc(id).set({
      nome: professor.nome,
      university: professor.university,
      degree: professor.degree
    })
      .then(() => {
        callback('ok')
      })
      .catch(() => {
        callback('ok')
      });
  }
}
/**
 * 20th century boys
green blood
ajin
innocent
monster
oyasumi pun pun */