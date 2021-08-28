import React, { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import Navbar from "../../components/Navbar";
import axios from "axios";
//import DatePicker from "react-date-picker";
//import { mdiInformation } from "@mdi/js";
//import moment from 'moment';
import swal from 'sweetalert';

const Cloudinary = () => {
    let history = useHistory();
    const [image, setImage] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");
    const [information, setInformation] = useState("");
    const [updateBy, setUpdateBy] = useState("SKS");
    const [updateOn, setUpdateOn] = useState(new Date());

    const imgPreview = (e) => {
        setImage(e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
    /*
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
    */
    const saveButton = () => {
        if (!imagePreview) {
            swal("Image Url is empty");
            return;
        }
        const img = new FormData();
        img.append("file", image);
        img.append("upload_preset", "bvtlbceo");
        img.append("cloud_name", "dy8tpvwmq");
        axios.post("https://api.cloudinary.com/v1_1/dy8tpvwmq/image/upload", img)
            .then((res) => {
                console.log(res.data);
                    axios.post("https://51e8-2405-201-6012-6032-6c65-de95-7ad3-43ed.in.ngrok.io/api/new-mm", { "category": category, "title": title, "imageUrl": res.data.url, "information": information, "updateBy": updateBy, "updateOn": updateOn })
                        .then((res) => {
                            //console.log(res.data);
                            //console.log(res.status);
                            if (res.status === 200) {
                                swal("Inforation updated to Server");
                                history.push("/");
                            } else {
                                swal("There was an error!");
                            }
                        }).catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }
    return (
        <div>
            <Navbar onClick={() => history.goBack()} />
            <br />
            <br />
            <div className="w3-container">
                <h4>Image Upload</h4>
                <input
                    type="file"
                    onChange={imgPreview}
                    className="w3-input"
                />
                <div className="w3-container">
                    {imagePreview ? <img src={imagePreview} height="100" width="150" /> : <div className="w3-panel w3-leftbar w3-light-gray"><p className="w3-large w3-serif"><i>"No Image Selected"</i></p><p><u>Developer</u></p></div>}
                </div>
                {imagePreview && (
                    <div className="w3-card-4">
                        <div className="w3-container w3-green">
                            <h3>Details</h3>
                        </div>
                        <form className="w3-container">
                            <label className="w3-label">Category</label>
                            <select className="w3-select" onChange={(e)=>setCategory(e.target.value)}>
                                <option value="">--Select--</option>
                                <option value="Personal">Personal</option>
                                <option value="official">Official</option>
                            </select>
                            <label className="w3-label">Title</label>
                            <input type="text" placeholder="Title" className="w3-input" onChange={(e)=>setTitle(e.target.value)} />
                            <label className="w3-label">Message/Information</label>
                            <textarea className="w3-input" rows="10" placeholder="Information or Message" onChange={(e)=>setInformation(e.target.value)}></textarea>
                        </form>
                        <button style={{ margin: 5 }} className="w3-btn w3-round w3-green" onClick={saveButton}>Save</button>
                    </div>)}
                <hr />
                <h5>{imageUrl}</h5>
            </div>
        </div>
    );
};
export default Cloudinary;
