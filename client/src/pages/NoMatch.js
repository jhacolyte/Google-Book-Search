import React from "react";
import Jumbotron from  "../components/Jumbotron";

function NoMatch(){

    return(
        <div>
            <Jumbotron>
                <h1 className="text-center">404 Page Not Found</h1>
            </Jumbotron>
            <div className="text-center"><button className="btn btn-danger btn-small"><a href="/">Go To Home Page</a></button></div>
        </div>
    );
};

export default NoMatch;
