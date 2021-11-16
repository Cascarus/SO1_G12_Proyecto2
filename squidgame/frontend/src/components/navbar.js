import { Component, Fragment } from "react"


class NavBar extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        console.log(this)
    }

    render() {
        return (

            <Fragment>
                <nav className="nav" style={{ marginBottom: "50px" }}>
                    <div className="container">
                        <div className="logo">
                            <img src="images/squidgame.png" alt="alt" width="150px" />
                        </div>
                        <div id="mainListDiv" className="main_list">
                            <ul className="navlinks">
                                <li><a href="/players">Players</a></li>
                                <li><a href="/games">Games</a></li>
                                <li><a href="/logs">Logs</a></li>
                                <li><a href="/workers">Workers</a></li>
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
}

export default NavBar