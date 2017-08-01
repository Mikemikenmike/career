import React from "react";
import Module from "./module.jsx";

export default class Enroute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modules: {}
        };
        console.log("Enroute Constructed");
    }

    async componentDidMount() {
        let user_modules = await this.props.Database.Get(`permissions/${this.props.user.uid}/modules`);
        let modules = await this.props.Database.Get(`modules`);
        console.log(modules.val());
        this.setState({modules: modules.val(), user_modules: user_modules.val()});
    }

    render() {
        return (
            <div id={this.props.id} className="row">
                {Object.entries(this.state.modules).map(([name, val], i) => {
                    return <Module key={name + i}
                                   name={name}
                                   description={val.description}
                    />
                })}
            </div>
        );
    }
}