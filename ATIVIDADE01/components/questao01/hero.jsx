import React from "react";
const hero = props =>{
    return(   
        <div>
            Hero : {props.name}
            <img src={props.img} alt="Imagem" />
        </div>);
}
export default hero;