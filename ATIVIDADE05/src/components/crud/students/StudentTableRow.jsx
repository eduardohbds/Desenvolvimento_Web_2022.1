import React from "react";
import { Link } from "react-router-dom";

import FirebaseService from "../../../services/FirebaseService";

const StudentTableRow = (props) => {
    const { _id, name, course, ira } = props.student
    function deleteStudent() {
        if (window.confirm(`Deseja excluir o elemento de ID: ${_id}?`)) {
            FirebaseService.delete(
                props.firestoreDb,
                () => { },
                _id
            )

        }
    }
    return (
        <tr>
            <td>
                {_id}
            </td>
            <td>
                {name}
            </td>
            <td>
                {course}
            </td>
            <td>
                {ira}
            </td>
            <td style={{textAlign:"center"}}>
                <Link to={`/editStudent/${_id}`} className="btn btn-primary">Editar</Link>
            </td>
            <td style={{textAlign:"center"}}>
                <button className="btn btn-danger" onClick={() => deleteStudent()}>Apagar</button>
            </td>
        </tr>
    )
}

export default StudentTableRow