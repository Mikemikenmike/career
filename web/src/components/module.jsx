import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

export default class Module extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col s12 m6 l4 xl3">
                <div className="card light-fill">
                    <div className="card-content primary-text">
                        <span className="card-title">{this.props.name}</span>
                        <p>{this.props.description}</p>
                        { this.props.lock &&
                        <a className="btn-floating btn-large halfway-fab waves-effect waves-light dark-secondary-color secondary-text">
                            <i className="material-icons">lock_outline</i>
                        </a>
                        }
                    </div>
                    <div className="card-action default-primary-color">
                        <Link
                            className={`btn waves-effect default-secondary-color secondary-text ${this.props.lock && "disabled"}`}
                            to={`${this.props.match.url}/${this.props.name}`}>
                            Open
                        </Link>
                        {/*<a href="#" className="btn text-primary-color disabled">This is a link</a>*/}

                    </div>
                </div>
            </div>
        );
    }
}