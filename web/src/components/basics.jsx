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
        // console.log(this.state);
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
                <div className="container is-fluid is-mobile" style={{paddingTop: "24px"}}>
                    <div className="columns">
                        <div className="column is-one-quarter-desktop">
                            <aside className="menu">
                                <p className="menu-label">
                                    Lessons
                                </p>
                                <ul className="menu-list">
                                    {menu.map((item, i) => {
                                        return <li key={i}>
                                            <Link to={`${this.props.match.url}/${item.location}`}
                                                  className={`${this.state.active == item.location && 'is-active'}`}
                                                  onClick={(e) => {
                                                      this.setState({active: item.location})
                                                  }}>
                                                {item.name}
                                            </Link>
                                        </li>
                                    })}
                                    {this.props.permissions.roles.admin &&
                                    <li>
                                        <a className="button has-text-centered" style={{margin: "0 12px"}}>
                                        <span className="icon">
                                          <i className="fa fa-plus"/>
                                        </span>
                                        </a>
                                    </li>
                                    }
                                </ul>
                                <hr/>
                                <ul className="menu-list">
                                    <li>
                                        <a className="button has-text-centered">
                                        <span className="icon">
                                          <i className="fa fa-plus"/>
                                        </span>
                                        </a>
                                    </li>
                                </ul>
                            </aside>
                        </div>
                        <div className="column">
                            <Route path={`${this.props.match.url}/:id`}
                                   component={(props) => <BasicsQuiz Database={this.props.Database}  {...props}/>}/>
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
        location: "2",
        name: "02 - ATC System and NAS"
    },
    {
        location: "4",
        name: "04 - Airports"
    },
    {
        location: "5",
        "name": "05 - Separation"
    },
    {
        location: "10",
        name: "10 - Principles of Flight"
    }
];