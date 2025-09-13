import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainContext } from '../../Provider/Context';
import { toast } from 'react-toastify';

const UploadResult = () => {


    const navi = useNavigate()
    const { searchinfo, student } = useContext(MainContext);

    const category = [...new Set(student.map(data => data.course_name))];
    const regulation = [...new Set(student.map(data => data.regulation))].sort((a, b) => a - b);

    const Result = (e) => {
        e.preventDefault();
        const form = e.target;
        const roll = form.roll.value;
        const course = form.course.value;
        const regulation = form.regulation.value;

        const result = searchinfo(course, regulation, roll)

        if (!result) {
            toast("Information Not Correct");
        } else {
            // navi("/result");
            navi(`/edit?course=${course}&regulation=${regulation}&roll=${roll}`);
        }
    }

    return (
        <div className='w-1/2 mx-auto'>
            <div className="p-6 space-y-6">
                <form onSubmit={Result} className="">
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <legend className="fieldset-legend text-center text-3xl">Diploma Result</legend>

                        <label className='label'>Exam</label>
                        <select className='select w-full' name='course' required>
                            <option value="" selected disabled>Select Exam</option>
                            {
                                category.map((data) => <>
                                    <option key={data.index} value={data}>{data}</option>
                                </>)
                            }
                        </select>

                        <label className='label'>Regulation</label>
                        <select name="regulation" className='select w-full' required>
                            <option value="" selected disabled>Select Regulation</option>
                            {
                                regulation.map((data) => <>
                                    <option key={data.index} value={data}>{data}</option>
                                </>)
                            }
                        </select>

                        <label className="label">Roll</label>
                        <input type="number" name='roll' className="input w-full" placeholder="Roll" required />

                        <input type="submit" className='btn btn-neutral mt-4' value="Result" />
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default UploadResult;