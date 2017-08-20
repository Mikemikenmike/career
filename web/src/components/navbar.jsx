import React from 'react';
import user_background_img from "../external/images/background-2529716_1280.jpg";
import {Link} from 'react-router-dom';

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.side_nav = null;
    }

    render() {
        return (
            <nav className="navbar ">
                <div className="navbar-brand">
                    <Link to="/" className="navbar-item">Class of 8/14</Link>

                    <Link className="navbar-item is-hidden-desktop" to="/signin" target="_blank">
                       Sign In
                    </Link>

                    <div className="navbar-burger burger" data-target="nav_menu" onClick={(e) => {
                        let ele = $(e.target);
                        ele.toggleClass("is-active");
                        $("#nav_menu").toggleClass("is-active");
                    }}>
                        <span/>
                        <span/>
                        <span/>
                    </div>
                </div>
                <div id="nav_menu" className="navbar-menu">
                    <div className="navbar-start">
                        <div className="navbar-item has-dropdown is-hoverable">
                            <Link className="navbar-link is-active" to="/atc/basics">
                                ATC
                            </Link>
                            <div className="navbar-dropdown ">
                                <Link className="navbar-item " to="/atc/basics">
                                    Basics
                                </Link>
                                <Link className="navbar-item " to="/atc/enroute">
                                    Enroute
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }



}