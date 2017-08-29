import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import questions from "../data/b1_l2.json";
import {MultipleChoice, MultipleSelect} from "./quiz_questions.jsx";


export default class BasicsQuiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            complete: false,
            solved: []
        }
    }

    async componentDidMount() {
        let questions = (await this.props.Database.Get(`lessons/${this.props.match.params.id}`)).val();
        this.setState({questions: questions, current_id: Object.keys(questions)[Math.floor(Math.random() * Object.keys(questions).length)]});
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.id != nextProps.match.params.id) {
            this.setState({
                current_id: Object.keys(this.state.questions)[0],
                solved: [],
                complete: false
            })
        }
    }

    render() {
        return (
            <div id={this.props.id}>
                <div className="tile is-ancestor">
                    <div className="tile is-vertical is-8">
                        <div className="tile is-parent">
                            <article className="tile is-child notification box">
                                <div className="content is-loading">
                                    {this.state.questions ?

                                        this.state.complete ? <h2>Good work!</h2> :
                                            [
                                                this.state.questions[this.state.current_id].type == "multiple_choice" &&
                                                <MultipleChoice id={this.state.current_id}
                                                                key="0"
                                                                question={this.state.questions[this.state.current_id]}
                                                                next_question={this.next_question}/>,


                                                this.state.questions[this.state.current_id].type == "multiple_select" &&
                                                <MultipleSelect id={this.state.current_id}
                                                                key="1"
                                                                question={this.state.questions[this.state.current_id]}
                                                                next_question={this.next_question}/>
                                            ]

                                        : <a className="button is-loading is-fullwidth"></a> }

                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    next_question = (solved) => {

        let possible_questions = Object.keys(this.state.questions);
        let rand_key = null;
        let rand = null;
        if (solved) {
            this.state.solved.push(solved);
        }

        if (this.state.solved.length >= possible_questions.length) {
            this.state.solved = [];
            this.setState({complete: true});
            return;
        }

        do {
            // console.log(possible_questions);
            rand = Math.floor(Math.random() * possible_questions.length);
            rand_key = possible_questions[rand];
        } while ($.inArray(rand_key, this.state.solved) >= 0 || rand_key == solved);

        this.state.current_id = rand_key;
        this.state.questions[rand_key].choices = shuffleArray(this.state.questions[rand_key].choices);
        this.setState(this.state);
    }


}

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}