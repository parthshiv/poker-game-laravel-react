import React from "react";

const gameBoard = props => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="containerInput">
                        <div className="inputPlayer">
                            <label htmlFor="playerOneName">Your Name :</label>
                            <input
                                type="text"
                                name="playerName"
                                onChange={props.changed}
                            />
                        </div>
                        <div className="inputPlayer">
                            <label htmlFor="playerOneInput">Your Cards:</label>
                            <input
                                type="text"
                                name="playerInput"
                                onChange={props.changed}
                            />
                        </div>
                        <div className="inputPlayer ">
                            <label htmlFor="inputOther">
                                Auto Generated Cards :
                            </label>
                            <input
                                type="text"
                                value={props.opponentCards}
                                disabled
                            />
                        </div>
                        <div className="inputPlayer ">
                            <button
                                className="btn btn-primary"
                                type="submit"
                                onClick={props.clicked}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                    <div
                        dangerouslySetInnerHTML={{ __html: props.message }}
                    ></div>
                </div>

                <div className="col-md-12">
                    <table className="table table-striped">
                        <thead>{props.tableHeader}</thead>
                        <tbody>{props.tableData}</tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
export default gameBoard;
