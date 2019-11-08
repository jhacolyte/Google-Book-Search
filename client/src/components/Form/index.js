import React from "react";

export function Input(props){
    return(
        <div className="form-group">
            <input className="form-control" {...props} />
        </div>
    )
}

export function FormBtn(props){
    return (
        <button {...props} className="btn btn-success">
            {props.children}
        </button>
    )
}


export function BookBtn(props){
    return (
        <button {...props} className="btn btn-info float-right">
            {props.children}
        </button>
    )
}