import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";

// '#FF3333' (Red): Extremely Low (Critical) SPO2 range (<= 78%)
// '#FF9933' (Orange): Very Low (Severe) SPO2 range (< 90%)
// '#FFFF33' (Yellow): Low (Moderate) SPO2 range (< 92%)
// '#66CC66' (Green): Average (Mild) SPO2 range (92-96%)
// '#3333FF' (Blue): High SPO2 range (> 96%)

const getColorForSPO2 = (spo2) => {
    if (spo2 <= 78) {
        return '#FF3333'; // Critical - Red
    } else if (spo2 < 90) {
        return '#FF9933'; // Severe - Orange
    } else if (spo2 < 92) {
        return '#FFFF33'; // Moderate - Yellow
    } else if (spo2 <= 96) {
        return '#66CC66'; // Mild - Green
    } else {
        return '#3333FF'; // High - Blue
    }
};

const getColorForSBP = (sbp) => {
    if (sbp < 90) {
        return '#FF3333'; // Normal - Red
    } else if (sbp < 110) {
        return '#FF9933'; // Mild - Orange
    } else if (sbp < 120) {
        return '#FFFF33'; // Moderate - Yellow
    } else if (sbp < 130) {
        return '#66CC66'; // Severe - Green
    } else {
        return '#3333FF'; // Critical - Blue
    }
};

const getColorForDBP = (dbp) => {
    if (dbp < 60) {
        return '#FF3333'; // Critical - Red
    } else if (dbp < 80) {
        return '#FF9933'; // Severe - Orange
    } else if (dbp < 90) {
        return '#FFFF33'; // Moderate - Yellow
    } else if (dbp < 120) {
        return '#66CC66'; // Mild - Green
    } else {
        return '#3333FF'; // High - Blue
    }
};

const getColorForTemp = (temp) => {
    if (temp < 90) {
        return '#3333FF'; // Blue
    } else if (temp < 96) {
        return '#66CC66'; // Green
    } else if (temp < 100) {
        return '#FFFF33'; // Yellow
    } else {
        return '#FF3333'; // Red
    }
};

const getColorForPR = (pr) => {
    if (pr < 50) {
        return '#FF3333'; // Red
    } else if (pr < 60) {
        return '#FF9933'; // Orange
    } else if (pr < 100) {
        return '#66CC66'; // Green
    } else if (pr < 120) {
        return '#FFFF33'; // Yellow
    } else {
        return '#3333FF'; // Blue
    }
};

const getColorForRR = (rr) => {
    if (rr < 10) {
        return '#FF3333'; // Red
    } else if (rr < 12) {
        return '#FF9933'; // Orange
    } else if (rr < 20) {
        return '#FFFF33'; // Yellow
    } else if (rr < 30) {
        return '#66CC66'; // Green
    } else {
        return '#3333FF'; // Blue
    }
};

function Home() {
    const [data, setData] = useState([]);
    const [num, setNum] = useState(1);
    const field = useRef();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://research56724api.azurewebsites.net/data/' + num);
                const jsonData = await response.json();
                const sortedData = jsonData.sort((a, b) => a.SerialNumber - b.SerialNumber).reverse();
                setData(sortedData);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        // Fetch data initially
        fetchData();

        // Fetch data every 5 seconds
        const interval = setInterval(fetchData, 5000);

        // Clean up interval on component unmount
        return () => clearInterval(interval);
    }, [num]);

    const handleButtonClick = () => {
        const inputValue = field.current.value;
        setNum(Number(inputValue));
    };

    function copyText() {
        var copyText = document.getElementById("noti");
        navigator.clipboard.writeText(copyText.innerHTML);
        alert("Text copied to clipboard!");
    }

    return (
        <div>
            <div className='header'>
                <h1>Human Vitals Data</h1>
                <h3>Login: USER1 | <a style={{ color: "inherit" }} href="#">Family Reports</a></h3>
                <p id='noti'></p><i onClick={copyText} class="gg-copy"></i>
            </div>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Timestamp</th>
                        <th>SPO2</th>
                        <th>SBP</th>
                        <th>DBP</th>
                        <th>TEMP</th>
                        <th>PR</th>
                        <th>RR</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.Timestamp}</td>
                            <td style={{ color: getColorForSPO2(item.SPO2) }}>{item.SPO2}</td>
                            <td style={{ color: getColorForSBP(item.SBP) }}>{item.SBP}</td>
                            <td style={{ color: getColorForDBP(item.DBP) }}>{item.DBP}</td>
                            <td style={{ color: getColorForTemp(item.TEMP) }}>{item.TEMP}</td>
                            <td style={{ color: getColorForPR(item.PR) }}>{item.PR}</td>
                            <td style={{ color: getColorForRR(item.RR) }}>{item.RR}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to='/reports' >Navigate to Reports</Link>
            <span>&nbsp; | &nbsp;</span>
            <Link to='/doctor' >Navigate to Doctor</Link>
        </div>
    )
}

export default Home