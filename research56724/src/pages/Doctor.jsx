import React from 'react';
import { Link } from "react-router-dom";

function Doctor() {
  return (
    <div className='header'>
      <Link style={{ color: "white" }} to="/">Home</Link>
      <h1 style={{ marginTop: "20px" }}>Patient Data</h1>
      <p>Anomaly Reported: <b>USER 1</b></p>
      <h2>Details:</h2>
      <ul>
        <li>Patient Name: <b>USER 1</b></li>
        <li>Address: <b>A-542/1, Ranjit Avenue, Amritsar-143001, Punjab</b></li>
        <li>Time to reach: <b>9 mins</b></li>
        <p>Use this to communicate with Authorities</p>
        <p id='noti'></p><i class="gg-copy"></i>
      </ul>
      <details>
        <summary style={{ marginBottom: 5 }}>First Instance</summary>
        <ul>
          <li>Problem Metric: <b>SPO2</b></li>
          <li>Recorded at: <b>2023-08-14 15:33:14</b></li>
          <li>Normal Range: <b>(90-96)%</b></li>
          <li>Your Value: <b>87.03%</b></li>
        </ul>
      </details>
      <details>
        <summary style={{ marginBottom: 5 }}>Second Instance</summary>
        <ul>
          <li>Problem Metric: <b>SPO2</b></li>
          <li>Recorded at: <b>2023-08-14 15:38:18</b></li>
          <li>Normal Range: <b>(90-96)%</b></li>
          <li>Your Value: <b>74.97%</b></li>
        </ul>
      </details>
    </div>
  )
}

export default Doctor