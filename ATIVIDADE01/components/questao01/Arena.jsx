import React from "react";
import Enemy from "./enemy";
import Hero from "./hero";
import baki from "../baki.jpg"
import yujiro from "../yujiro.jpg"

const arena = () =>{
    return(   
        <div>
            <Hero name = 'Baki' img = {baki}/>
            <Enemy name = 'Yujiro' img = {yujiro}/>
        </div>)
};

export default arena;