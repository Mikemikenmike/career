import React from "react";
import * as update from "immutability-helper";

export class MultipleChoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null,
            correct: null,
            choice_set: shuffleArray(this.props.question.choices || [])
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.question != nextProps.question) {
            this.setState({
                selected: null,
                correct: null,
                choice_set: shuffleArray(nextProps.question.choices || [])
            })
        }

    }

    render() {
        return (
            <div>
                <h2>
                    {this.props.question.question}
                </h2>

                <p className="subtitle">Select the Correct Answer</p>

                {this.state.choice_set.map((choice, i) => {
                    return <div className="field" key={i}>
                        <label className="radio">
                            <input type="radio" name="answer"
                                   selected={i == this.state.selected ? true : false}
                                   onClick={() => {
                                       this.setState({selected: i, correct: null});
                                   }}/> {"" + choice} {this.state.correct != null ? this.state.selected == i ? this.state.correct ?
                                    <span className="icon">
                                      <i className="fa fa-check"/>
                                    </span> : <span className="icon">
                                      <i className="fa fa-close"/>
                                    </span> : null : null}
                        </label>
                    </div>
                })}


                <div className="field is-pulled-right">
                    <div className="control">
                        <button className="button is-success" onClick={(e) => {
                            if (this.state.correct) {
                                this.props.next_question(this.props.id);
                            }
                            if (this.state.choice_set[this.state.selected] == this.props.question.answer) {
                                this.setState({correct: true})
                            } else {
                                this.setState({correct: false})
                            }
                        }}>
                            {this.state.correct != null ? this.state.correct ? "Next" : "Try Again" : "Check"}
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export class MultipleSelect extends React.Component {
    constructor(props) {
        super(props);
        console.log(update);
        this.state = {
            selected: {},
            correct: null
        }
    }

    render() {
        return (
            <div>
                <h2>
                    {this.props.question.question}
                </h2>

                <p className="subtitle">Select the Correct Answer</p>

                {this.props.choices.map((choice, i) => {
                    return <div className="field" key={i}>
                        <label className="checkbox">
                            <input type="checkbox"
                                   checked={this.state.selected[choice]}
                                   onClick={() => {
                                       this.setState(update(this.state, {selected: {$merge: {choice: !this.state.selected[choice]}}, correct: {$set: null}}));
                                   }}/> {"" + choice}
                        </label>
                    </div>
                })}

            </div>
        );
    }
}

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
    console.log(array);
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}