import React from "react";
import BasicsQuiz from "./basicsquiz.jsx";
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'


export default class Basics extends React.Component {
    constructor(props) {
        super(props);
        let uri = window.location.href.split('/');
        let active = null;
        if ($.isNumeric(uri[uri.length - 1])) {
            active = uri[uri.length - 1];
        }
        this.state = {active: active};

    }

    componentWillReceiveProps() {
        this.set_active();

    }

    set_active = () => {
        let uri = window.location.href.split('/');
        let active = null;
        if ($.isNumeric(uri[uri.length - 1])) {
            active = uri[uri.length - 1];
        }
        this.setState({active: active});
    };

    render() {
        return (
            <div id={this.props.id}>
                <section className="hero is-primary">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                                Basics
                            </h1>
                        </div>
                    </div>
                </section>
                <div className="container is-fluid" style={{paddingTop: "24px"}}>
                    <div className="columns">
                        <div className="column is-one-quarter-desktop">
                            <aside className="menu">
                                <p className="menu-label">
                                    Lessons
                                </p>
                                <ul className="menu-list">
                                    {menu.map((item, i) => {
                                        return <li key={i}>
                                            <Link to={`${this.props.match.url}/${i}`}
                                                  className={`${this.state.active == i && 'is-active'}`}
                                                  onClick={(e) => {
                                                      this.setState({active: i})
                                                  }}>
                                                {item.name}
                                            </Link>
                                        </li>
                                    })}
                                </ul>
                            </aside>
                        </div>
                        <div className="column">
                            <Route path={`${this.props.match.url}/:id`} component={BasicsQuiz}/>
                            <Route exact path={`${this.props.match.url}`} component={(props) => {
                                return <h1 className="title is-1">Select a Lesson</h1>
                            }}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const menu = [
    {
        name: "01 - Course Overview"
    },
    {
        name: "02 - ATC System and NAS"
    },
    {
        name: "03 - Crew Resource Management"
    },
    {}
];