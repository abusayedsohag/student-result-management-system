import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCourses, fetchStudents } from '../../assets/api';
import sessionData from "../../assets/info/session.json"
import Swal from 'sweetalert2';

const Form = () => {

    const navi = useNavigate()

    const [courseInfo, setCourseInfo] = useState([]);
    const [regulation, setRegulations] = useState([]);
    const [students, setStudents] = useState([])

    const [course, setCourse] = useState("")
    const [regu, setRegu] = useState("")
    const [roll, setRoll] = useState("")

    useEffect(() => {
        fetchStudents()
            .then(res => setStudents(res.data))
    }, [])

    useEffect(() => {
        fetchCourses()
            .then(res => setCourseInfo(res.data))
    }, [])

    useEffect(() => {
        const session = sessionData.map(data => data.regulation)
        setRegulations(session)
    }, [])

    const category = courseInfo.map(name => name.course_name)


    const handleSearch = () => {
        const results = students.find(st =>
            String(st.course_name) === String(course) &&
            String(st.regulation) === String(regu) &&
            String(st.roll) === String(roll)
        );

        if (!results) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Info is not Currect",
            });
        } else {
            navi(`/result/${roll}`);
        }
    }

    return (
        <div className='md:w-1/2 mx-auto'>
            <div className="p-6 space-y-6">
                <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="">
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <legend className="fieldset-legend text-center text-3xl">Diploma Result</legend>

                        <label className='label'>Exam</label>
                        <select className='select w-full' onChange={(e) => setCourse(e.target.value)} name='course' value={course} required>
                            <option value="" disabled>Select Course</option>
                            {
                                category.map((data, index) =>
                                    <option key={index} value={data}>{data}</option>
                                )
                            }
                        </select>

                        <label className='label'>Regulation</label>
                        <select name="regulation" value={regu} onChange={(e) => setRegu(e.target.value)} className='select w-full' required>
                            <option value="" disabled>Select Regulation</option>
                            {
                                regulation.map((data, index) =>
                                    <option key={index} value={data}>{data}</option>
                                )
                            }
                        </select>

                        <label className="label">Roll</label>
                        <input
                            type="number"
                            name='roll'
                            value={roll}
                            onChange={(e) => setRoll(e.target.value)}
                            className="input w-full"
                            placeholder="Roll"
                            required />

                        <button type="submit" className='btn btn-neutral mt-4'>Find Result</button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default Form;