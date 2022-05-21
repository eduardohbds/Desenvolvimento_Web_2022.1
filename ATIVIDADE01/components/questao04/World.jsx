import React from "react";

const arena = (props) =>{
    <div>
        {React.Children.map(props.children,lutadores=>
            {return React.cloneElement(lutadores,{...props})})}
    </div>
};

export default arena;