import React from "react";
import update from "immutability-helper";

export class MultipleChoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null,
            correct: null
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.question.question != nextProps.question.question) {
            this.setState({
                selected: null,
                correct: null,
                answered: null
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

                {this.props.question.choices.map((choice, i) => {
                    return <div className="field" key={i}>
                        <label className="radio">
                            <input type="radio" name="answer"
                                   disabled={this.state.answered && true}
                                   checked={choice == this.state.selected && true}
                                   onClick={() => {
                                       this.setState({selected: choice, correct: null});
                                   }}/> {"" + choice} {this.state.answered && this.is_correct(choice)}
                        </label>
                    </div>
                })}

                <hr />

                <nav className="level is-mobile">
                    <div className="level-left">
                        <div className="level-item">
                            <p className="subtitle is-5">
                                <div className="field">
                                    Page <strong>{this.props.question.page}</strong>
                                </div>
                            </p>
                        </div>
                    </div>

                    <div className="level-right">
                        <p className="level-item">
                            <div className="field">
                                <div className="control">
                                    <button className="button is-primary" onClick={(e) => {
                                        if (this.state.answered) {
                                            this.props.next_question(this.props.id);
                                        }
                                        this.setState({answered: true});
                                    }}>
                                        {this.state.answered ? "Next" : "Check"}
                                    </button>
                                </div>
                            </div>
                        </p>
                    </div>
                </nav>
            </div>
        )
    }

    is_correct = (choice) => {
        if (this.state.selected == choice && choice == this.props.question.answer) {
            return <span className="icon" style={{color: 'hsl(141, 71%, 48%)'}}><i className="fa fa-check"/></span>
        } else if (this.state.selected == choice && choice != this.props.question.answer) {
            return <span className="icon" style={{color: 'hsl(348, 100%, 61%)'}}><i className="fa fa-close"/></span>
        } else if (choice == this.props.question.answer) {
            return <span className="icon" style={{color: 'hsl(141, 71%, 48%)'}}><i className="fa fa-check"/></span>
        }

    }


}

export class MultipleSelect extends React
    .Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: {},
            correct: null,
            answered: false
        }
    }


    componentWillReceiveProps(nextProps) {
        if (this.props.question.question != nextProps.question.question) {
            this.setState({
                selected: {},
                correct: null,
                answered: null
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

                {this.props.question.choices.map((choice, i) => {
                    return <div className="field" key={i}>
                        <label className="checkbox">
                            <input type="checkbox"
                                   checked={this.state.selected[choice]}
                                   disabled={this.state.answered && true}
                                   onChange={() => {
                                       this.setState(update(this.state, {
                                           selected: {$merge: {[choice]: !this.state.selected[choice]}},
                                           correct: {$set: null}
                                       }));
                                   }}/> {"" + choice} {this.state.answered && this.is_correct(choice)}
                        </label>
                    </div>
                })}

                <hr />

                <nav className="level is-mobile">
                    <div className="level-left">
                        <div className="level-item">
                            <p className="subtitle is-5">
                                <div className="field">
                                    Page <strong>{this.props.question.page}</strong>
                                </div>
                            </p>
                        </div>
                    </div>

                    <div className="level-right">
                        <p className="level-item">
                            <div className="field">
                                <div className="control">
                                    <button className="button is-primary" onClick={(e) => {
                                        if (this.state.answered) {
                                            this.props.next_question(this.props.id);
                                        }
                                        this.setState({answered: true});
                                    }}>
                                        {this.state.answered ? "Next" : "Check"}
                                    </button>
                                </div>
                            </div>
                        </p>
                    </div>
                </nav>
            </div>
        );
    }

    is_correct = (choice) => {
        if ($.inArray(choice, this.props.question.answer) >= 0 && this.state.selected[choice]) {
            return <span className="icon" style={{color: 'hsl(141, 71%, 48%)'}}><i className="fa fa-check"/></span>
        } else if ($.inArray(choice, this.props.question.answer) < 0 && !this.state.selected[choice]) {
            return <span className="icon" style={{color: 'hsl(141, 71%, 48%)'}}><i className="fa fa-check"/></span>
        } else {
            return <span className="icon" style={{color: 'hsl(348, 100%, 61%)'}}><i className="fa fa-close"/></span>
        }
    }
}
