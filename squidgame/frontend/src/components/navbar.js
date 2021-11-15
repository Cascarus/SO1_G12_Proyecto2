import { Fragment } from "react"

const NavBar = function () {

    return (

        <Fragment>
            <nav className="nav" style={{ marginBottom: "50px" }}>
                <div className="container">
                    <div className="logo">
                        <img src="images/squidgame.png" alt="alt" width="150px" />
                    </div>
                    <div id="mainListDiv" className="main_list">
                        <ul className="navlinks">
                            <li><a href="/">Players</a></li>
                            <li><a href="/">Games</a></li>
                            <li><a href="/">Logs</a></li>
                            <li><a href="/">Workers</a></li>
                        </ul>
                    </div>
                    <span className="navTrigger">
                        <i></i>
                        <i></i>
                        <i></i>
                    </span>
                </div>
            </nav>
            <section className="home"></section>
        </Fragment>
    )

}


export default NavBar