import React from "react";

function LabelComponent(props){
   return(
       <span className={props.className}>{props.textName}</span>
   )
}

export default LabelComponent;