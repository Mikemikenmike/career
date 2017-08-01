import React from "react";


export default class Home extends React.Component {
    constructor(props) {
        super(props);
        console.log("Home Constructor");
    }

    render() {
        return (
            <div id={this.props.id} className="row">
                HOME :D
            </div>
        );
    }
}