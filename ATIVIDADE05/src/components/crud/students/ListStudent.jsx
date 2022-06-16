import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StudentTableRow from "./StudentTableRow";
import FirebaseContext from '../../../utils/FirebaseContext'
import FirebaseService from '../../../services/FirebaseService'

const ListStudentPage = () => (
    <FirebaseContext.Consumer>
        {firebase => <ListStudent firebase={firebase} />}
    </FirebaseContext.Consumer>
)

function ListStudent(props) {

    const [estudantes, setEstudantes] = useState([])

    useEffect(
        () => {
            // axios.get("http://localhost:3002/estudantes")
            //     .then(
            //         (res) => {
            //             setEstudantes(res.data)
            //         }
            //     )
            //     .catch(
            //         (error) => {
            //             console.log(error)
            //         }
            //     )
            FirebaseService.list_onSnapshot(
                props.firebase.getFirestoreDb(),
                (estudantes) => {
                    setEstudantes(estudantes)
                }
            )
        }
        ,
        [props]
    )
    function deleteStudentById(_id) {
        let estudantesTemp = estudantes
        for (let i = 0; i < estudantesTemp.length; i++) {
            if (estudantesTemp[i]._id === _id) {
                //console.log("1")
                estudantesTemp.splice(i, 1)
            }
        }
        setEstudantes([...estudantesTemp])
    }
    function generateTable() {

        if (!estudantes) return
        return estudantes.map(
            (student, i) => {
                return <StudentTableRow
                    student={student}
                    key={i}
                    deleteStudentById={deleteStudentById}
                    firestoreDb={props.firebase.getFirestoreDb()}
                />
            }
        )

    }

    return (
        <>
            <main>
                <h2>
                    List Student
                </h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Curso</th>
                            <th>IRA</th>
                            <th colSpan={2} style={{ textAlign: "center" }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {generateTable()}
                    </tbody>
                </table>
            </main>
            <nav>
                <Link to="/">Home</Link>
            </nav>
        </>
    );
}

export default ListStudentPage;