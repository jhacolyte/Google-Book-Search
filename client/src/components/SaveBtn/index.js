import React from "react";
import "./style.css";

function SaveBook({ type = "default", className, children, onClick }){
    return (
        // <span className="save-btn" {...props} role="submit-button" tabIndex="0">
        // <span className="save-btn btn-info" role="submit-button" tabIndex="0">
        // SaveBook
        // </span>
     <button onClick={onClick} className={["btn btn-lg btn-info float-right" , `btn-${type}`, className].join(" ")}>
        Save Book
      </button>
    );
}

export default SaveBook;