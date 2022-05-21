import baki from "../baki.jpg"
import yujiro from "../yujiro.jpg"

const arena = () =>{
    const Enemy = props =>{
    return(   
        <div>
            Enemy : {props.name}
            <img src={props.img} alt="Imagem" />
        </div>);
    }

    const Hero = props =>{
    return(   
        <div>
            Hero : {props.name}
            <img src={props.img} alt="Imagem" />
        </div>);
}

    return(   
        <div>
            <Hero name = 'Baki' img = {baki}/>
            <Enemy name = 'Yujiro' img = {yujiro}/>
        </div>)
};

export default arena;