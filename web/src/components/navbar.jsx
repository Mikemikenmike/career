import React from 'react';
import user_background_img from "../external/images/background-2529716_1280.jpg";

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.side_nav = null;
    }

    render() {
        return (
            <nav className="nav-extended">
                <div className={`nav-wrapper default-primary-color`}>
                    <a href="#" className="brand-logo  center primary-text">Logo</a>
                    <ul id="nav-right" className="right">
                        <li>
                            {!$.isEmptyObject(this.props.user) ?
                                <a href="#"
                                   className="primary-text"
                                   data-activates="slide-out"
                                   ref={button => {
                                       this.side_nav = button;
                                       $(button).sideNav();
                                   }}>
                                    <i className="material-icons">menu</i>
                                </a>
                                :
                                <a href="#"
                                   className="primary-text"
                                   onClick={() => {
                                       this.props.showLoginPage(true);
                                   }}>
                                    Sign In
                                </a>
                            }
                        </li>
                    </ul>
                    <ul id="slide-out" className="side-nav">
                        <li>
                            <div className="user-view">
                                <div className="background">
                                    <img src={user_background_img}/>
                                </div>
                                <a href="#!user"><img className="circle" src={this.props.user.photoURL}/></a>
                                <a href="#!name"><span className="white-text name">{this.props.user.displayName}</span></a>
                                <a href="#!email"><span className="white-text email">{this.props.user.email}</span></a>
                            </div>
                        </li>
                        <li><a className="wave-effect" href="#" onClick={() => {
                            this.props.signOut();
                            $(this.side_nav).sideNav("hide");
                            $(this.side_nav).sideNav("destroy");
                        }}>Sign Out</a></li>
                    </ul>
                </div>
                <div className="nav-content light-primary-color">
                    {/*<Link className={`primary-text`} to={"/enroute"}>{"saw"}</Link>*/}
                    <ul className="tabs tabs-transparent" ref={(tabs) => {
                        $(tabs).tabs();
                    }}>
                        <div className="indicator default-secondary-color" style={{zIndex: 1}}/>
                        {/*<li className="tab"><a className="active" href="#test1">Home</a></li>*/}
                        {/*<li className="tab"><a href="#test2">Enroute</a></li>*/}
                        {this.props.tabs.map((tab, i) => {
                            return (
                                <li key={i} className="tab">
                                    <a className={`primary-text ${this.props.location.pathname.includes(tab.href) ? 'active' : ''}`}
                                       onClick={() => {
                                           this.props.history.push(`/${tab.href}`);
                                       }}
                                       href={`#${tab.href}`}>{tab.label}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </nav>
        );
    }
}