import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainContext } from '../../Provider/Context';
import dept from "../../assets/info/type.json"
import { toast } from 'react-toastify';

const Form = () => {

    const navi = useNavigate()
    const { searchinfo , result} = useContext(MainContext);

    const category = dept.diploma_disciplines.map(data => data.name)


    const Result = (e) => {
        e.preventDefault();
        const form = e.target;
        const roll = form.roll.value;
        const exam = form.exam.value;

        console.log(exam);
        searchinfo(roll)

        if (result === 401) {
            toast("Information Not Currect")
        } else {
            navi("/result");
        }
    }

    return (
        <div className='w-1/2 mx-auto'>
            <div className="p-6 space-y-6">
                <form onSubmit={Result} className="">
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <legend className="fieldset-legend text-center text-3xl">Diploma Result</legend>

                        <label className='label'>Exam</label>
                        <select className='select w-full' name='exam' required>
                            <option value="" selected disabled>Select Exam</option>
                            {
                                category.map(data => <>
                                    <option key={data} value={data}>{data}</option>
                                </>)
                            }
                        </select>

                        <label className='label'>Regulation</label>
                        <select className='select w-full' required>
                            <option value="" selected disabled>Select Regulation</option>
                            <option value="2016">2016</option>
                            <option value="2022">2022</option>
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

export default Form;