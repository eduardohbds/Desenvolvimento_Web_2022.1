import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StudentTableRow from "./StudentTableRow";
import FirebaseContext from "../../../utils/FirebaseContext";
import FirebaseStudentService from "../../../services/FirebaseStudentService";
import RestrictPage from "../../../utils/RestrictPage";

const ListStudentPage = ({ setShowToast, setToast }) =>
    <FirebaseContext.Consumer>
        {
            (firebase) => {
                return (
                    <RestrictPage isLogged={firebase.getUser() != null}>
                        <ListStudent
                            firebase={firebase}
                            setShowToast={setShowToast}
                            setToast={setToast} />
                    </RestrictPage>
                )
            }
        }
    </FirebaseContext.Consumer>
function ListStudent(props) {

    const [estudantes, setStudents] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(
        () => {
            setLoading(true)
            FirebaseStudentService.list_onSnapshot(
                props.firebase.getFirestoreDb(),
                (estudantes) => {
                    setLoading(false)
                    setStudents(estudantes)
                }
            )
        }
        ,
        [props.firebase]
    )

    function deleteStudentById(_id) {
        let estudantesTemp = estudantes
        for (let i = 0; i < estudantesTemp.length; i++) {
            if (estudantesTemp[i]._id === _id) {
                estudantesTemp.splice(i, 1)
            }
        }
        setStudents([...estudantesTemp]) //deve-se criar um outro array para disparar o re-render
        //setStudents(estudantesTemp)
        //setFlag(!flag)
    }

    function renderTable() {

        if (loading) {
            //mostrar um spinner!
            return (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 100
                }}>
                    <div className="spinner-border"
                        style={{ width: '3rem', height: '3rem' }}
                        role="status" />
                    Carregando...
                </div>
            )
        }


        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Curso</th>
                        <th>IRA</th>
                        <th>Nome</th>
                        <th colSpan={2} style={{ textAlign: "center" }}></th>
                    </tr>
                </thead>
                <tbody>
                    {renderTableBody()}
                </tbody>
            </table>
        )
    }

    function renderTableBody() {
        if (!estudantes) return
        return estudantes.map(
            (student, i) => {
                return <StudentTableRow
                    student={student}
                    key={i}
                    deleteStudentById={deleteStudentById}
                    firestore={props.firebase.getFirestoreDb()}
                    setShowToast={props.setShowToast}
                    setToast={props.setToast}
                />
            }
        )
    }

    return (
        <>
            <main>
                <h2>
                    Listar Estudantes
                </h2>
                {renderTable()}
            </main>
            <nav>
                <Link to="/">Home</Link>
            </nav>
        </>
    );
}

export default ListStudentPage