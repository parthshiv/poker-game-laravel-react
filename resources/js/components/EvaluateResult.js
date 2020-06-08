import React, { Component } from "react";
import axios from "axios";
import GameBoard from "./GameBoard";

const POKER_SYMBOLS = [
    "2", // 0
    "3", // 1
    "4", // 2
    "5", // 3
    "6", // 4
    "7", // 5
    "8", // 6
    "9", // 7
    "10", // 8
    "J", // 9
    "Q", // 10
    "K", // 11
    "A" // 12
];

class EvaluateResult extends Component {
    constructor(props) {
        super(props);
        //Initialize the state in the constructor
        this.state = {
            playerName: "",
            playerScore: "",
            generatedScore: "",
            gameResult: "",
            playerInput: "",
            message: "",
            generatedCards: "",
            results: [],
            callBack: true
        };
    }
    handleChange = event => {
        const { name, value } = event.target;

        this.setState({
            ...this.state,
            [name]: value
        });
    };

    compareWith = (playerHand, opponentHand) => {
        const player = playerHand;
        const opponent = opponentHand;

        //console.log(player);
        return this.getResult(player, opponent);
    };

    generateCards = length => {
        //console.log(length);
        if (this.state.playerInput) {
            let result = "";
            const characters = "23456789JKQA";
            let charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                result +=
                    characters.charAt(
                        Math.floor(Math.random() * charactersLength)
                    ) + " ";
            }
            this.setState({ generatedCards: result.toUpperCase() });
            //document.getElementById("player2").value = result.toUpperCase();
            return result.trim();
        }
    };

    getHighCard = hand => {
        const highIndex = [];
        let cardsIndex = new Map();
        //console.log(hand);
        this.getHandDenominations(hand.split(" ")).map((ele, itemIndex) => {
            cardsIndex.set(itemIndex, POKER_SYMBOLS.indexOf(ele));
        });

        cardsIndex.forEach((ind, itemIndex) => {
            highIndex.push(ind);
        });
        //console.log(highIndex);
        return highIndex;
    };
    getResult = (playerhand, opponenthand) => {
        //console.log(playerhand);
        const playerIndex = playerhand;
        const opponentIndex = opponenthand;
        let playerCount = 0;
        let opponentCount = 0;
        let message, messagePrint;
        const playerInd = Object.values(playerIndex);
        const oppoInd = Object.values(opponentIndex);

        for (let i = 0; i < playerInd.length; i++) {
            if (playerInd[i] > oppoInd[i]) {
                playerCount++;
            } else if (playerInd[i] < oppoInd[i]) {
                opponentCount++;
            }
        }
        if (playerCount > opponentCount) {
            message = "You are the Winner!";
            this.setState({ gameResult: 1 });
        } else if (playerCount < opponentCount) {
            message = "You Lost, Better Luck next Time!";
            this.setState({ gameResult: 0 });
        } else {
            message = "It's a Tie!!";
            this.setState({ gameResult: 0 });
        }
        // console.log(playerCount);
        // console.log(opponentCount);
        this.setState({
            playerScore: playerCount,
            generatedScore: opponentCount
        });
        console.log(this.state);

        messagePrint = "You have " + playerCount + " High Card(s). <br />";
        messagePrint +=
            "Opponent has " + opponentCount + " High Card(s). <br />";
        return messagePrint + message;
    };

    /*componentDidMount() is a lifecycle method
     * that gets called after the component is rendered
     */
    componentDidMount() {
        /* fetch API in action */
        //console.log("component started");
        this.callAPI();
    }
    callAPI = () => {
        axios
            .get("./api/showAll")
            .then(response => {
                //console.log(response);
                return response.data;
            })
            .then(results => {
                //Fetched product is stored in the state
                this.setState({ results });
            })
            .catch(error => {
                this.setState({ message: error });
            });
    };
    renderResults = () => {
        return this.state.results.map(result => {
            return (
                /* When using list you need to specify a key
                 * attribute that is unique for each list item
                 */
                <tr key={result.vUserName}>
                    <td>{result.vUserName}</td>
                    <td>{result.totalGames}</td>
                    <td>{result.totalWins}</td>
                </tr>
            );
        });
    };
    componentDidUpdate(prevState, prevProps) {
        if (
            prevProps.generatedCards.split(" ").join("") !=
            this.state.generatedCards.split(" ").join("")
        ) {
            this.setState({ callBack: false });
            console.log("in update");
            const resultData = {
                vUserName: this.state.playerName,
                iUserScore: this.state.playerScore,
                iGeneratedScore: this.state.generatedScore,
                bResult: this.state.gameResult,
                playerInput: this.state.playerInput
            };
            //console.log(resultData);
            axios
                .post("./api/results/", resultData)
                .then(response => {
                    this.callAPI();
                })
                .catch(error => {
                    if (
                        typeof error.response.status !== "undefined" &&
                        error.response.status == 422
                    ) {
                        let printMsg = "";
                        const errors = error.response.data;
                        const errorItems = Object.keys(errors.errors).map(
                            (key, i) => {
                                const error = errors.errors[key][0];

                                printMsg += "<li>" + error + "</li>";
                                //return <li key={i}>{error}</li>;
                            }
                        );

                        printMsg = "<ul>" + printMsg + "</ul>";

                        this.setState({
                            message: printMsg
                        });
                        //return printMsg;
                    }
                });
        }
    }
    storeResults(callBack) {
        // if (
        //     prevProps.generatedCards.split(" ").join("") !=
        //     this.state.generatedCards.split(" ").join("")
        // ) {
        //console.log(this.state);
        if (callBack) {
            const resultData = {
                vUserName: this.state.playerName,
                iUserScore: this.state.playerScore,
                iGeneratedScore: this.state.generatedScore,
                bResult: this.state.gameResult,
                playerInput: this.state.playerInput
            };
            //console.log(resultData);
            axios
                .post("./api/results/", resultData)
                .then(response => {
                    this.callAPI();
                })
                .catch(error => {
                    if (
                        typeof error.response.status !== "undefined" &&
                        error.response.status == 422
                    ) {
                        let printMsg = "";
                        const errors = error.response.data;
                        const errorItems = Object.keys(errors.errors).map(
                            (key, i) => {
                                const error = errors.errors[key][0];

                                printMsg += "<li>" + error + "</li>";
                                //return <li key={i}>{error}</li>;
                            }
                        );

                        printMsg = "<ul>" + printMsg + "</ul>";

                        this.setState({
                            message: printMsg
                        });
                        //return printMsg;
                    }
                });
        }
    }

    getHandDenominations = cards => {
        return cards.map(ele => ele[0]);
    };

    submitHandler = () => {
        // let messageText = document.getElementById("message");
        // let playerOneResult = document.getElementById("playerResult");
        // let playerTwoResult = document.getElementById("oppoResult");
        let playerOneHand, playerTwoHand, playerOneValue, playerTwoValue;
        let results;

        playerOneValue = this.state.playerInput.toUpperCase().trim();

        if (this.state.playerName)
            playerTwoValue = this.generateCards(
                playerOneValue.split(" ").length
            );
        if (this.state.playerName && this.state.playerInput)
            playerOneHand = this.getHighCard(playerOneValue);
        if (playerTwoValue) playerTwoHand = this.getHighCard(playerTwoValue);

        if (this.state.playerName && playerOneHand && playerTwoHand) {
            results = this.compareWith(playerOneHand, playerTwoHand);
            this.setState({ message: results });
        }

        this.storeResults(this.state.callBack);
        //
        //} else {
        // this.setState({ message: "Please enter valid Value" });
        // document.getElementById("player2").value = "";
        //}
    };
    getHeader = () => {
        return (
            <tr>
                <th>Player Name</th>
                <th>Total Games</th>
                <th>Games Won</th>
            </tr>
        );
    };
    render() {
        return (
            <GameBoard
                message={this.state.message}
                clicked={this.submitHandler}
                changed={event => this.handleChange(event)}
                tableData={this.renderResults()}
                tableHeader={this.getHeader()}
                opponentCards={this.state.generatedCards}
                errorMessages={this.state.errorMessages}
            />
        );
    }
}

export default EvaluateResult;
