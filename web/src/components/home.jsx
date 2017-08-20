import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'


export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id={this.props.id}>
                <section className="hero is-primary is-bold is-fullheight">
                    <div className="hero-body">
                        <div className="container">
                            <nav className="level is-mobile">
                                <div className="level-left">
                                    <div className="level-item">
                                        <h1 className="title">
                                            18/18. Let's do this.
                                        </h1>
                                    </div>
                                </div>

                                <div className="level-right">
                                    <Link className="button is-primary is-inverted"
                                          to="/atc/basics">Basics</Link>
                                </div>
                            </nav>
                        </div>
                    </div>
                </section>

            </div>
        );
    }
}