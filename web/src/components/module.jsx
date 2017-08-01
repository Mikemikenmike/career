import React from "react";

export default class Module extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col s12 m6 l4 xl3">
                <div className="card default-primary-color">
                    <div className="card-content white-text">
                        <span className="card-title">{this.props.name}</span>
                        <p>{this.props.description}</p>
                    </div>
                    <div className="card-action dark-primary-color">
                        <a href="#" className="text-accent-color">This is a link</a>
                        <a href="#">This is a link</a>
                    </div>
                </div>
            </div>
        );
    }
}