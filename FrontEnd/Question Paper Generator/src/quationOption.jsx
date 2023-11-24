import React, { useState } from "react";
import { toast } from 'react-toastify';

import './secation1.css'

let DifficultySelector = () => {
    const [isFocused, setIsFocused] = useState(false);
    let [quationPaper, setQuationPaper] = useState();
    var inputData = {};

    let getData = (e) => {
        let dataInput = e.target.value;
        let name = e.target.name;
        console.log(dataInput, name);
        inputData = { ...inputData, [name]: dataInput };
    }

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    let generateTheQuations = async () => {
        try {
            console.log(inputData);

            let { tot, easy, medium, hard } = inputData;
            if (Object.keys(inputData).length != 4) {
                toast.error("Insufficient data", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                return;
            }
            easy = parseInt(easy);
            medium = parseInt(medium);
            hard = parseInt(hard);

            inputData.easy = easy;
            inputData.medium = medium;
            inputData.hard = hard;


            if (easy + medium + hard != 100) {
                console.log("The error is occured");
                toast.error("The added percentages are incorrect they should total 100%. Please adjust and re-enter the percentages.", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                return;
            }

            let res = await fetch('api/sendPost', {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(inputData)
            });
            let resData1 = await res.json();

            if (resData1) {
                let quationpaperGen = resData1.quationPaper;
                setQuationPaper(quationpaperGen);
                console.log(quationpaperGen);
            }
            document.getElementById('form8Example3').value = '';
            document.getElementById('form8Example4').value = '';
            document.getElementById('form8Example5').value = '';
            document.getElementById('form8Example6').value = '';

        } catch (e) {
            console.log(e);
        }
    }



    return (
        <>
            <div data-mdb-theme="dark">
                <h3 className="p-2" >
                    Input the Necessary Data to Generate Your Exam Paper
                </h3>
                <div className="p-4">
                    <div className="row">
                        <div className="col ">

                            <div data-mdb-input-init className="form ">
                                <label className="form-label" htmlFor="form8Example3">Total Marks For Paper</label>
                                <input type="number" id="form8Example3" className={`form-control ${isFocused ? '' : 'border'}`} onChange={getData} name="tot" />

                            </div>
                        </div>
                        <div className="col">

                            <div data-mdb-input-init className="form">
                                <label className="form-label" htmlFor="form8Example4">Easy Questions Percentage</label>
                                <input type="number" id="form8Example4" className={`form-control ${isFocused ? '' : 'border'}`} onChange={getData} name="easy" />

                            </div>
                        </div>
                        <div className="col">

                            <div data-mdb-input-init className="form">
                                <label className="form-label" htmlFor="form8Example5">Medium Questions Percentage</label>
                                <input type="number" id="form8Example5" className={`form-control ${isFocused ? '' : 'border'}`} onChange={getData} name="medium" />

                            </div>
                        </div>
                        <div className="col">

                            <div data-mdb-input-init className="form">
                                <label className="form-label" htmlFor="form8Example5">Hard Questions Percentage</label>
                                <input type="number" id="form8Example6" className={`form-control ${isFocused ? '' : 'border'}`} onChange={getData} name="hard" />

                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center aline-item-center p-3">
                    <button type="button" className="btn btn-primary" data-mdb-ripple-init onClick={generateTheQuations}>Generate Paper</button>
                </div>
            </div>
            <div className="p-4">

                {
                    (quationPaper) ? (quationPaper.map((question, index) => {
                        console.log(question, index);
                        return < div className="row" key={index} >
                            <div className="col mb-4 p-0">
                                <div className="card p-2">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="d-flex align-items-center">

                                                <div className="ms-3">
                                                    <p className="fw-bold mb-1"> Q.{index + 1}</p>

                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <div className="ms-3 p-2">
                                                    <p className="fw-bold mb-1">{question.question}</p>

                                                </div>
                                            </div>
                                            <span className="badge rounded-pill badge-success">{question.difficulty}</span>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>




                    })) :
                        (
                            <div className="row">
                                <div className="col mb-4 p-0">
                                    <div className="card p-2">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-center">

                                                <div className="d-flex align-items-center">
                                                    <div className="ms-3 p-2">
                                                        <p className="fw-bold mb-1">The question paper has not been generated yet</p>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        )

                }



            </div >


        </>
    )
}

export default DifficultySelector;
