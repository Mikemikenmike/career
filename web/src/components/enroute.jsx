import React from "react";
import Module from "./module.jsx";
import Study from "./study.jsx";
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

export default class Enroute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modules: {},
            user_modules: {}
        };
        console.log("Enroute Constructed");
        console.log(`${this.props.match.url}/:module`);
    }


    async componentDidMount() {
        let user_modules = await this.props.Database.Get(`permissions/${this.props.user.uid}/modules`);
        let modules = await this.props.Database.Get(`modules`);
        this.setState({modules: modules.val(), user_modules: user_modules.val()});
    }

    render() {
        return (
            <div id={this.props.id} className="row">
                {Object.entries(this.state.modules).map(([name, val], i) => {
                    return <Module key={name + i}
                                   name={name}
                                   lock={!this.state.user_modules[name]}
                                   description={val.description}
                                   {...this.props}
                    />
                })}
            </div>

        );
    }
}