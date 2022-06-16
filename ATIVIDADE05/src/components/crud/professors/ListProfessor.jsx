import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FirebaseContext from '../../../utils/FirebaseContext'
import FirebaseService from '../../../services/FirebaseService'
import ProfessorTableRow from "./ProfessorTableRow";

const ListProfessorPage = () => (
    <FirebaseContext.Consumer>
        {firebase => <ListProfessor firebase={firebase} />}
    </FirebaseContext.Consumer>
)
function ListProfessor(props) {

    const [professor, setProfessor] = useState([])

    useEffect(
        () => {
        //     axios.get("http://localhost:3002/professor")
        //         .then(
        //             (res) => {
        //                 setProfessor(res.data)
        //             }
        //         )
        //         .catch(
        //             (error) => {
        //                 console.log(error)
        //             }
        //         )
            FirebaseService.list_onSnapshot(
                props.firebase.getFirestoreDb(),
                (professores) => {
                    setProfessor(professores)
                }
            )
        }       
        ,
        [props]
    )
    function deleteProfessorById(_id) {
        let professorTemp = professor
        for (let i = 0; i < professorTemp.length; i++) {
            if (professorTemp[i]._id === _id) {
                //console.log("1")
                professorTemp.splice(i, 1)
            }
        }
        setProfessor([...professorTemp])
    }
    
    function generateTable() {
        if (!professor) return
        return professor.map(
            (professor, i) => {
                return <ProfessorTableRow
                    professor={professor}
                    key={i}
                    deleteProfessorById={deleteProfessorById}
                    firestoreDb={props.firebase.getFirestoreDb()}
                />
            }
        )
    }

    return (
        <>
            <main>
                <h2>
                    List Professor
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

export default ListProfessorPage;