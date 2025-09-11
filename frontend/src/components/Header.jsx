import "./index.css";

function HeaderCompopnent() {
    return (
        <div className="head">
            <nav className="links">
                <div className="logo">
                    <a href="index.jsx">Momo Hackathon</a>
                </div>
                <div className="pages">
                    <a href="Home.jsx">Home</a>
                    <a href="Login.jsx">Login</a>
                    <a href="Register.jsx">Register</a>
                </div>
            </nav>
        </div>
    )
}

export default HeaderCompopnent;