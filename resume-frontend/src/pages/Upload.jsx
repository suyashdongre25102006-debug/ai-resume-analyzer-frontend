import { useState } from "react";
import axios from "axios";

function Upload() {
    const [file, setFile] = useState(null);
    const [analysis, setAnalysis] = useState(null);
    const [status, setStatus] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const API = import.meta.env.VITE_API_URL;

    const uploadResume = async () => {

        if (!file) {
            setStatus("⚠ Please select a resume first.");
            return;
        }

        setIsUploading(true);
        setShowSuccess(false);
        setStatus("Analyzing your resume...");

        try {

            const formData = new FormData();
            formData.append("file", file);

            const token = localStorage.getItem("token");

            const response = await axios.post(

                `${API}/upload`,

                formData,

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                }

            );

            const result = response.data;

            setAnalysis(result);

            setShowSuccess(true);

            setStatus("Resume analyzed successfully.");

        }
        catch (error) {

            console.error(error);

            if (error.response) {

                setStatus(

                    error.response.data ||

                    "Upload Failed"

                );

            }

            else {

                setStatus(

                    "Server not reachable."

                );

            }

            setShowSuccess(false);

        }
        finally {

            setIsUploading(false);

        }

    };

    return (

        <>

            <div className="container upload-card">

                <h1>
                    AI Resume Analyzer
                </h1>

                <p className="helper-text">
                    Upload your resume and receive AI-powered ATS style
                    feedback with strengths, weaknesses and suggestions.
                </p>

                {
                    status &&

                    <div className="status-chip">

                        {status}

                    </div>
                }

                <input

                    type="file"

                    accept=".pdf,.doc,.docx"

                    onChange={(e) =>
                        setFile(
                            e.target.files[0]
                        )
                    }

                />

                {

                    file &&

                    <p className="file-name">

                        Selected File :
                        <br />
                        <strong>{file.name}</strong>

                    </p>

                }

                <button

                    onClick={uploadResume}

                    disabled={isUploading}

                >

                    {

                        isUploading

                            ?

                            "Analyzing Resume..."

                            :

                            "Upload Resume"

                    }

                </button>

                {

                    showSuccess &&

                    <div className="success-alert">

                        Resume analyzed successfully!

                    </div>
                }

                {
                    analysis &&

                    <div className="analysis-card">
                        <h2>Resume Analysis</h2>
                        <div className="score">
                            {analysis.score}/100
                        </div>
                        <div className="analysis-section">
                            <h3>ATS Score</h3>
                            <p>{analysis.atsScore}/100</p>
                        </div>
                        <div className="analysis-section">
                            <h3>Overall Rating</h3>
                            <p>{analysis.overallRating}</p>
                        </div>
                        <div className="analysis-section">
                            <h3>Strengths</h3>
                            <ul>
                                {analysis.strengths?.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="analysis-section">
                            <h3>Weaknesses</h3>
                            <ul>
                                {analysis.weaknesses?.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="analysis-section">
                            <h3>Missing Skills</h3>
                            <ul>
                                {analysis.missingSkills?.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="analysis-section">
                            <h3>Suggestions</h3>
                            <ul>
                                {analysis.suggestions?.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="verdict">
                            <h3>Final Verdict</h3>
                            <p>{analysis.verdict}</p>
                        </div>
                    </div>
                }

            </div>

        </>

    );

}

export default Upload;