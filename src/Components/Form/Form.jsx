import React from 'react';
import { Link, Navigate } from 'react-router-dom';

const Form = () => {

    const Result = () => {
        return <Navigate to="/result" />;
    }



    return (
        <div className='w-1/2 mx-auto'>
            <div className="p-6 space-y-6">
                <form onSubmit={Result} className="">
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <legend className="fieldset-legend text-center text-3xl">Diploma Result</legend>

                        <label className='label'>Exam</label>
                        <select className='select w-full' required>
                            <option value="" selected disabled>Select Exam</option>
                            <option value="DIPLOMA IN ENGINEERING" selected="">Diploma In Engineering</option>
                            <option value="DIPLOMA IN TEXTILE ENGINEERING">Diploma In Textile Engineering</option>
                            <option value="DIPLOMA IN AGRICULTURE">Diploma In Agriculture</option>
                            <option value="DIPLOMA IN FISHERIES">Diploma In Fisheries</option>
                            <option value="DIPLOMA IN FORESTRY">Diploma In Forestry</option>
                            <option value="DIPLOMA IN LIVESTOCK">Diploma In Livestock</option>
                            <option value="DIPLOMA IN MEDICAL TECHNOLOGY">Diploma In Medical Technology</option>
                            <option value="CERTIFICATE IN MEDICAL ULTRASOUND">Certificate In Medical Ultrasound</option>
                            <option value="DIPLOMA IN COMMERCE">Diploma In Commerce</option>
                        </select>

                        <label className='label'>Regulation</label>
                        <select className='select w-full' required>
                            <option value="" selected disabled>Select Regulation</option>
                            <option value="2016">2016</option>
                            <option value="2022">2022</option>
                        </select>

                        <label className="label">Roll</label>
                        <input type="number" className="input w-full" placeholder="Roll" required />

                        <Link to="/result"><input type="submit" className='btn btn-neutral mt-4' value="Result" /></Link>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default Form;