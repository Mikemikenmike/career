import React from "react";

export default class Study extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authorized: false,
            init: false
        };
        console.log("STUDY");
    }


    async componentDidMount() {
        let permissions = await this.props.Database.Get(`permissions/${this.props.user.uid}/modules`);
        this.setState({authorized: this.props.name in permissions})
    }

    render() {
        return (
            <div>{this.props.match.params.module}</div>
            // this.state.authorized ?
            //     <div>study</div>
            //     : <div>unauthorized</div>

        );
    }
}