import React from 'react';
import { Link } from "react-router-dom";

function Reports() {
    function copyText() {
        var copyText = document.getElementById("noti");
        navigator.clipboard.writeText(copyText.innerHTML);
        alert("Text copied to clipboard!");
    }
    return (
        <div className='header'>
            <Link style={{ color: "white" }} to="/">Home</Link>
            <h1 style={{ marginTop: 20 }}>Anomaly Reported</h1>
            <h3>Authorities and your family have been notified and will be reaching to your registered address.</h3>
            Current Registered Address: <span>A-542/1, Ranjit Avenue, Amritsar-143001, Punjab</span>
            <p id='noti'></p><i onClick={copyText} class="gg-copy"></i>
            <h2 style={{ marginTop: "0px" }}>What went wrong:</h2>
            <p>Severe conditions in your <b>SPO2 (Saturation of Peripheral Oxygen)</b> levels were detected continously. View the details below to know more.</p>
            <ul>
                <h4 style={{ marginBottom: 5 }}>First Instance</h4>
                <li>Problem Metric: <b>SPO2</b></li>
                <li>Recorded at: <b>2023-08-14 15:33:14</b></li>
                <li>Normal Range: <b>(90-96)%</b></li>
                <li>Your Value: <b>87.03%</b></li>
            </ul>
            <ul>
                <h4 style={{ marginBottom: 5 }}>Second Instance</h4>
                <li>Problem Metric: <b>SPO2</b></li>
                <li>Recorded at: <b>2023-08-14 15:38:18</b></li>
                <li>Normal Range: <b>(90-96)%</b></li>
                <li>Your Value: <b>74.97%</b></li>
            </ul>
        </div>
    )
}

export default Reports