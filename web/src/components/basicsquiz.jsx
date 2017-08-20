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
            questions: questions,
            current_id: Object.keys(questions)[0],
            solved: []
        }
    }

    render() {
        return (
            <div id={this.props.id}>
                <div className="tile is-ancestor">
                    <div className="tile is-vertical is-8">
                        <div className="tile is-parent">
                            <article className="tile is-child notification box">
                                <div className="content">
                                    {this.state.questions[this.state.current_id].type == "multiple_choice" &&
                                        <MultipleChoice id={this.state.current_id} question={this.state.questions[this.state.current_id]} next_question={this.next_question}/> }


                                    {this.state.questions[this.state.current_id].type == "multiple_select" &&
                                        <MultipleSelect id={this.state.current_id} question={this.state.questions[this.state.current_id]} next_question={this.next_question}/> }

                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    next_question = (solved) => {
        console.log(solved);
        let possible_questions = Object.keys(this.state.questions);
        let rand_key = null;
        let rand = null;
        do {
            // console.log(possible_questions);
            rand = Math.floor(Math.random() * possible_questions.length);
            rand_key = possible_questions[rand];
        } while ($.inArray(rand_key, this.state.solved) >= 0 || rand_key == solved);

        this.state.solved.push(solved);
        this.state.current_id = rand_key;
        this.setState(this.state);
        this.setState({current_id: rand_key})
    }


}