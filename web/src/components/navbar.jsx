import React from 'react';
import user_background_img from "../external/images/background-2529716_1280.jpg";
import {Link} from 'react-router-dom';

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        console.log(props.user);
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.user);
    }

    render() {
        return (
            <nav className="navbar ">
                <div className="navbar-brand">
                    <Link to="/" className="navbar-item">Class of 8/14</Link>

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
                        {/*{this.props.permissions.roles.admin && <Link className="navbar-item" to="secret">Add</Link>}*/}
                    </div>
                    <div className="navbar-end">
                        {$.isEmptyObject(this.props.user) ?
                            <Link className="navbar-item" to="/login">
                                Sign In
                            </Link> :
                            <div className="navbar-item">Welcome, {`${this.props.user.displayName.split(' ')[0]}`}</div>
                        }
                    </div>
                </div>
            </nav>
        );
    }


}