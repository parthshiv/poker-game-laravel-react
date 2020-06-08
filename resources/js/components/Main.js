import React, { Component } from "react";
import ReactDOM from "react-dom";
import PokerGame from "./EvaluateResult";

/* Main Component */
class Main extends Component {
    render() {
        /* Some css code has been removed for brevity */
        return (
            <div>
                <PokerGame />
            </div>
        );
    }
}

/* The if statement is required so as to Render the component on pages that have a div with an ID of "root";
 */

if (document.getElementById("root")) {
    ReactDOM.render(<Main />, document.getElementById("root"));
}
