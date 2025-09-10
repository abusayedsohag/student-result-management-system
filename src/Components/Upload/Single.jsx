import React from 'react';

const Single = () => {




    return (
        <div>
            <div className='w-11/12 mx-auto'>
                <div className="p-6 space-y-6">
                    <form className="">
                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 grid grid-cols-2">
                            <legend className="fieldset-legend text-center text-3xl">Upload Diploma Result</legend>

                            <div>
                                <label className='label'>Exam</label>
                                <select className='select w-full' required>
                                    <option value="" selected disabled>Select Exam</option>
                                    <option value="DIPLOMA IN ENGINEERING" selected="">Diploma In Engineering</option>
                                    <option value="DIPLOMA IN TEXTILE ENGINEERING">Diploma In Textile Engineering</option>
                                    <option value="DIPLOMA IN AGRICULTURE">Diploma In Agriculture</option>
                                    <option value="DIPLOMA IN FISHERIES">Diploma In Fisheries</option>
                                    <option value="DIPLOMA IN FORESTRY">Diploma In Forestry</option>
                                    <option value="DIPLOMA IN COMMERCE">Diploma In Commerce</option>
                                </select>
                            </div>

                            <div>
                                <label className='label'>Regulation</label>
                                <select className='select w-full' required>
                                    <option value="" selected disabled>Select Regulation</option>
                                    <option value="2016">2016</option>
                                    <option value="2022">2022</option>
                                </select>
                            </div>

                            <div>
                                <label className="label">Roll</label>
                                <input type="number" className="input w-full" placeholder="Roll" required />
                            </div>

                            <div>
                                <label className="label">Registration</label>
                                <input type="number" className="input w-full" placeholder="Registration" required />
                            </div>

                            <div>
                                <label className="label">Department</label>
                                <input type="number" className="input w-full" placeholder="Department" required />
                            </div>

                            <div>
                                <input type="submit" className='btn btn-neutral mt-4' value="Verify" />
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Single;