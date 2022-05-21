import React from "react";
const enemy = props =>{
    return(   
        <div>
            Enemy : {props.name}
            <img src={props.img} alt="Imagem" />
        </div>);
}
export default enemy;