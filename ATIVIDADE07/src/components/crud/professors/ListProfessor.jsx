import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FirebaseContext from '../../../utils/FirebaseContext'
import FirebaseServiceProfessor from '../../../services/FirebaseServiceProfessor'
import ProfessorTableRow from "./ProfessorTableRow";
import RestrictPage from "../../../utils/RestrictPage";

const ListProfessorPage = ({ setShowToast, setToast }) =>
    <FirebaseContext.Consumer>
        {
            (firebase) => {
                return (
                    <RestrictPage isLogged={firebase.getUser() != null}>
                        <ListProfessor
                            firebase={firebase}
                            setShowToast={setShowToast}
                            setToast={setToast} />
                    </RestrictPage>
                )
            }
        }
    </FirebaseContext.Consumer>

function ListProfessor(props) {

    const [professor, setProfessor] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(
        () => {
            setLoading(true)
            FirebaseServiceProfessor.list_onSnapshot(
                props.firebase.getFirestoreDb(),
                (professores) => {
                    setLoading(false)
                    setProfessor(professores)
                }
            )
        }
        ,
        [props.firebase]
    )

    function deleteProfessorById(_id) {
        let professoresTemp = professor
        for (let i = 0; i < professoresTemp.length; i++) {
            if (professoresTemp[i]._id === _id) {
                professoresTemp.splice(i, 1)
            }
        }
        setProfessor([...professoresTemp]) //deve-se criar um outro array para disparar o re-render
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
                        <th>Nome</th>
                        <th>Universidade</th>
                        <th>Degree</th>
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
        if (!professor) return
        return professor.map(
            (student, i) => {
                return <ProfessorTableRow
                    professor={professor}
                    key={i}
                    deleteProfessorById={deleteProfessorById}
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

export default ListProfessorPage;