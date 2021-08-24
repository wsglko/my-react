import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../components/w3.css";

const Home = () => {
    return (
        <div>
            <Navbar />
            <br />
            <br />
            <div className="w3-container w3-animate-opacity">
                <h3>Home Page</h3>
                <p>
                    Please choose your options from top-bar, this page is yet
                    not fully configured. please wait unitll some chanbges.
                </p>
                <Link to="/newimg" className="w3-btn w3-green">
                    Image
                </Link>
                <Link to="/cimage" className="w3-btn w3-blue">
                    Cloudinary Image
                </Link>
            </div>
        </div>
    );
};

export default Home;
