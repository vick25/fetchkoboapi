"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';

// interface UserProps {
//     token: string;
// }

export default function Connect({ token }) {
    console.log(token);
    const url = "https://kf.kobotoolbox.org/api/v2/assets.json"; // Replace with your actual kpi URL
    const headers = { "Authorization": `Token ${token}` };
    const [koboData, setKoboData] = useState([]);

    useEffect(() => {
        const fetchKoboData = async () => {
            try {
                const response = await axios.get(url, { headers: headers });
                setKoboData(response.data);

                console.log(response);
            } catch (error) {
                if (!error.response)
                    console.log(`Error: ${error.message}`);

                console.log(error.response?.data);
                console.log(error.response?.status);
                console.log(error.response?.headers);
            }
        };
        fetchKoboData();
    }, []);


    return (
        <>
            <h1>Connect</h1>
            <div>
                <ul>
                    {koboData &&
                        koboData.map((result) => (
                            <li key={result.uid}>{result.name}</li>
                        ))
                    }
                </ul>
            </div>
        </>
    )
}