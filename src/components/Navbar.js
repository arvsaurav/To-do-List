import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({focusedPage, setFocusedPage}) {

    const handleClick = (event, currentPage) => {
        console.log(currentPage);
        setFocusedPage(currentPage);
    }

    return (
        <div className="navbar-parent-div">
            <div className="navbar-child-div" style={{fontSize: "20px", fontWeight: "700"}}>
                To do
            </div>
            <div className="navbar-child-div">
                <Link 
                    to="/"
                    style={{
                        color: focusedPage==="homepage"? "#d9d9d9":"aliceblue",
                        textDecoration: focusedPage==="homepage"? "underline":"none",
                        textDecorationThickness: focusedPage==="homepage"? "2px":"0px",
                        textUnderlineOffset: focusedPage==="homepage"? "16.3px":"0px"
                    }}
                    onClick={(event) => {
                        handleClick(event, "homepage");
                    }}
                >
                    Home
                </Link>
            </div>
            <div className="navbar-child-div">
                <Link 
                    to="/about" 
                    style={{
                        color: focusedPage==="about"? "#d9d9d9":"aliceblue",
                        textDecoration: focusedPage==="about"? "underline":"none",
                        textDecorationThickness: focusedPage==="about"? "2px":"0px",
                        textUnderlineOffset: focusedPage==="about"? "16.3px":"0px"
                    }}
                    onClick={(event) => {
                        handleClick(event, "about");
                    }}
                >
                    About
                </Link>
            </div>
            <div className="navbar-child-div">
                <Link 
                    to="/contact-us"
                    style={{
                        color: focusedPage==="contactus"? "#d9d9d9":"aliceblue",
                        textDecoration: focusedPage==="contactus"? "underline":"none",
                        textDecorationThickness: focusedPage==="contactus"? "2px":"0px",
                        textUnderlineOffset: focusedPage==="contactus"? "16.3px":"0px"
                    }}
                    onClick={(event) => {
                        handleClick(event, "contactus");
                    }}
                >
                    Contact Us
                </Link>
            </div>
        </div>
    )
}

export default Navbar;