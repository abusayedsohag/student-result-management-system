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
        <div className='max-w-lg mx-auto my-10'>
            <h1 className='text-5xl font-bold text-center'>Diploma Result</h1>
            <p className='text-center pt-3 uppercase'>"Your hard work, your result, your Future"</p>
            <div className="pt-8">
                <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
                    <fieldset className="fieldset bg-[#F4FCFF] border-base-300 shadow-2xl shadow-blue-300 rounded-2xl border p-8">

                        <label>Curriculum</label>
                        <select className='select w-full bg-sky-100' onChange={(e) => setCourse(e.target.value)} name='course' value={course} required>
                            <option value="" disabled>Select Curriculum</option>
                            {
                                category.map((data, index) =>
                                    <option key={index} value={data}>{data}</option>
                                )
                            }
                        </select>

                        <label>Regulation</label>
                        <select name="regulation" value={regu} onChange={(e) => setRegu(e.target.value)} className='select w-full bg-sky-100' required>
                            <option value="" disabled>Select Regulation</option>
                            {
                                regulation.map((data, index) =>
                                    <option key={index} value={data}>{data}</option>
                                )
                            }
                        </select>

                        <label>Roll</label>
                        <input
                            type="number"
                            name='roll'
                            value={roll}
                            onChange={(e) => setRoll(e.target.value)}
                            className="input w-full bg-sky-100 "
                            placeholder="Enter Your Roll"
                            required />

                        <button type="submit" className='btn bg-sky-500 mt-4 text-white'>Find Result</button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default Form;