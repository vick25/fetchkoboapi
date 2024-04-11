"use client";
import { useEffect, useState } from 'react';
import Link from "next/link";
import { fetchFormData } from '@/actions/kobo';

// interface UserProps {
//     token: string;
// }

export default function FormSelector({ token, forms }) {
    // const [forms, setForms] = useState([]);
    const [selectedForm, setSelectedForm] = useState(null);
    const [formData, setFormData] = useState(null);
    const [uniqueForm, setUniqueForm] = useState([]);

    // console.log(token);
    // const url = "https://kf.kobotoolbox.org/api/v2/assets.json"; // Replace with your actual kpi URL
    const headers = { "Authorization": `Token ${token}`, "Access-Control-Allow-Origin": 'http://localhost:3000' };
    const [koboData, setKoboData] = useState([]);

    // useEffect(async () => {
    //     const fetchKoboData = async () => {
    //         try {
    //             const response = await axios.get(url, { headers: headers });
    //             setKoboData(response.data);

    //             console.log(response);
    //         } catch (error) {
    //             if (!error.response)
    //                 console.log(`Error: ${error.message}`);

    //             console.log(error.response?.data);
    //             console.log(error.response?.status);
    //             console.log(error.response?.headers);
    //         }
    //     };
    //     fetchKoboData();
    // }, []);

    // useEffect(async () => {
    //     try {// `/api/kobo?formId=${formId}`
    //         const response = await axios.get(`https://kf.kobotoolbox.org/api/v2/assets/${selectedForm}/data/`, { headers: headers });
    //         setFormData(response.data);
    //     } catch (error) {
    //         console.error('Error fetching form data:', error);
    //     }
    // }, selectedForm);

    // const fetchFormData = async (formId) => {
    //     try {// `/api/kobo?formId=${formId}`
    //         const response = await axios.get(`https://kf.kobotoolbox.org/api/v2/assets/${formId}/data/`, { headers: headers });
    //         setFormData(response.data);
    //     } catch (error) {
    //         console.error('Error fetching form data:', error);
    //     }
    // };

    const handleFormChange = async (event) => {
        const selectedFormId = event.target.value;
        // console.log(selectedFormId);
        setSelectedForm(selectedFormId);
        if (selectedFormId) {
            // console.log(selectedFormId)
            const kbData = await fetchFormData(selectedFormId);
            setFormData(kbData);
            setUniqueForm(forms.filter((form) => form.uid === selectedFormId));
        }
    };

    return (
        <>
            <div>
                <label htmlFor="form-selector">Select Form :</label>
                <input type='text' id="form-selector" list="form-datalist" onChange={handleFormChange} />
                <datalist id="form-datalist">
                    {forms.map((form) => (
                        <option key={form.uid} value={form.uid}>
                            {form.name}
                        </option>
                    ))}
                </datalist>
            </div>

            <div>
                <h3>Export links</h3>
                {
                    uniqueForm.map(uf => (
                        uf.export_settings.map(setting => (
                            <div key={setting.uid}>
                                <div>
                                    <Link href={setting.data_url_csv} target="_blank" rel="noopener noreferrer">CSV 🔗</Link>
                                    <br />
                                    <Link href={setting.data_url_xlsx} target="_blank" rel="noopener noreferrer">XLSX 🔗</Link>
                                </div>
                            </div>
                        ))
                    ))
                }
            </div>

            <div>
                {formData && (
                    <div>
                        <h2>Form Data for {selectedForm} :</h2>
                        <pre>
                            {JSON.stringify(formData, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </>
    )
}