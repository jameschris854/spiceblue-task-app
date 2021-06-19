import React from "react";
import "./Button.styles.css";

const Button = ({type,text,...otherprops}) => {

    return(
        <button className={`${type==='save'?'save':type==='cancel'?'cancel':'default'}`} {...otherprops}>{text}</button>
    )
}

export default Button