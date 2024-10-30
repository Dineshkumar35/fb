import React from "react";
 
function ButtonComponent(props){
      return(
            <button onClick={props.handleClick} className={props.className} >{props.BtnText}</button>
       );
}
export default ButtonComponent;