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
            <div id={this.props.id} className="container">
                {/*section*/}
                <div className="row">
                    <div className="col s12 m12">
                        <div className="card light-fill">
                            <div className="card-content primary-text">
                                <span className="card-title">August 16th, 2017 - Day 3</span>
                                <h4>Action Items</h4>
                                <p>
                                    <input type="checkbox" id="test1"/>
                                    <label for="test1">Test1</label>
                                </p>
                                <p>
                                    <input type="checkbox" id="test2" checked="checked"/>
                                    <label for="test2">Test2</label>
                                </p>

                            </div>
                            {/*<div className="card-action">*/}
                            {/*<a href="#" className="primary-text">This is a link</a>*/}
                            {/*<a href="#" className="primary-text">This is a link</a>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}