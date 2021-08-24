import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Navbar from "../../components/Navbar";
import axios from "axios";
import DatePicker from "react-date-picker";

const Cloudinary = () => {
    let history = useHistory();
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");

    const uploadImage = () => {
        const img = new FormData();
        img.append("file", image);
        img.append("upload_preset", "bvtlbceo");
        img.append("cloud_name", "dy8tpvwmq");
        axios
            .post("https://api.cloudinary.com/v1_1/dy8tpvwmq/image/upload", img)
            .then((res) => {
                console.log(res.data);
                setUrl(res.data.url);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div>
            <Navbar onClick={() => history.goBack()} />
            <br />
            <br />
            <div className="w3-container">
                <h2>Welcome</h2>
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="w3-input"
                />
                <button
                    className="w3-btn w3-green w3-small w3-round"
                    onClick={uploadImage}
                >
                    Upload
                </button>
                <div>
                    <h3>Uploaded Image</h3>
                    <img src={url} height="100" width="150" />
                </div>
            </div>
        </div>
    );
};
export default Cloudinary;
