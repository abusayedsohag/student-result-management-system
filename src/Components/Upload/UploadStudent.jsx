import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import sessionData from "../../assets/info/session.json"
import { createStudent, fetchCourses, fetchInstitutes } from '../../assets/api';
import Swal from 'sweetalert2';


const UploadStudent = () => {

    const [student, setStudent] = useState({
        roll: "",
        student_name: "",
        father_name: "",
        mother_name: "",
        date_of_birth: "",
        gender: "",
        registration: "",
        course_name: "",
        name_of_industry: "",
        department: "",
        regulation: "",
        session: "",
        semesters: []
    });

    // All Data Fetching Here
    useEffect(() => {
        fetchCourses()
            .then(res => setCourses(res.data));
    }, [])

    useEffect(() => {
        fetchInstitutes()
            .then(res => setInstitutes(res.data));
    }, [])

    useEffect(() => {
        const session = sessionData.map(data => data)
        setRegulations(session)
    }, [])


    // All Data State Here
    const [courses, setCourses] = useState([]);
    const [institutes, setInstitutes] = useState([]);
    const [regulations, setRegulations] = useState([]);

    const [selectCourse, setSelectCourse] = useState([])
    const [selectRegulation, setSelectRegulation] = useState([])
    const [selectDept, setSelectDept] = useState([])


    const handleTopChange = (e) => {
        const { name, value } = e.target;
        setStudent(prev => ({ ...prev, [name]: value }));
    }

    // input Handler
    const handleSelectCourse = (e) => {
        const courseValue = e.target.value
        const findCourse = courses.find(dept => dept.course_name === courseValue)
        const dept = findCourse?.departments

        setSelectCourse(dept)
    }

    const handleSelectDept = (e) => {
        const value = e.target.value;
        const findDept = selectCourse.find(sem => sem.name === value)
        const sem = findDept.semesters

        setSelectDept(sem)
    }

    const handleSelectRegulation = (e) => {
        const value = e.target.value
        const findRegulation = regulations.find(res => res.regulation === value)
        const sessionList = findRegulation.sessions

        setSelectRegulation(sessionList)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            name: student.student_name,
            father: student.father_name,
            mother: student.mother_name,
            roll: student.roll,
            reg: student.registration,
            gender: student.gender,
            c_name: student.course_name,
            inst: student.name_of_industry,
            dept: student.department,
            regu: student.regulation,
            sess: student.session,
            dob: student.date_of_birth
        };

        Swal.fire({
            html: `
                <div>
                <h1 class="text-sm md:text-xl font-black">Check again and Confirm</h1>
                    <div class="grid grid-cols-3 border text-[8px] md:text-lg">
                    <div class="text-left p-2 grid grid-rows-12">
                        <h1><b>Name</b> </h1>
                        <h1><b>Father_Name</b> </h1>
                        <h1><b>Mother_Name</b> </h1>
                        <h1><b>Date</b></h1>
                        <h1><b>Roll</b> </h1>
                        <h1><b>Registration</b> </h1>
                        <h1><b>Gender</b> </h1>
                        <h1><b>Course</b> </h1>
                        <h1><b>Institute</b> </h1>
                        <h1><b>Department</b> </h1>
                        <h1><b>Regulation</b> </h1>
                        <h1><b>Session</b> </h1>
                    </div>
                    <div class="col-span-2 p-2 text-left grid grid-rows-12">
                        <h1>: ${formData.name}</h1>
                        <h1>: ${formData.father}</h1>
                        <h1>: ${formData.mother}</h1>
                        <h1>: ${formData.dob}</h1>
                        <h1>: ${formData.roll}</h1>
                        <h1>: ${formData.reg}</h1>
                        <h1>: ${formData.gender}</h1>
                        <h1>: ${formData.c_name}</h1>
                        <h1>: ${formData.inst}</h1>
                        <h1>: ${formData.dept}</h1>
                        <h1>: ${formData.regu}</h1>
                        <h1>: ${formData.sess}</h1>
                    </div>
                   </div>
                </div>
            
            `,
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Submit it!"
        }).then(async (result) => {
            if (result.isConfirmed) {


                try {
                    const res = await createStudent(student);
                    setStudent({
                        roll: '', student_name: '', father_name: '', mother_name:
                            '', date_of_birth: '', gender: '', registration: '', course_name: '',
                        name_of_industry: '', department: '', regulation: '', session: '', semesters: []
                    });

                    Swal.fire({
                        title: "Submited!",
                        text: "Student Information has been Submitted.",
                        icon: "success"
                    });

                } catch (err) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: err.response?.data?.message || 'Error creating'
                    });
                }
            }
        });
    };


    return (
        <div className='w-11/12 mx-auto'>
            <div className='py-8'>
                <h1 className='text-xl md:text-5xl font-black text-center'>Upload Student Information</h1>
            </div>
            <form className='w-11/12 mx-auto' onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-2">
                    <input name="roll" type='number' value={student.roll}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d{0,6}$/.test(value)) {
                                handleTopChange(e);
                            }
                        }}
                        placeholder="Roll"
                        className="border p-2 bg-gray-900"
                        required />
                    <input name="student_name" value={student.student_name}
                        onChange={handleTopChange} placeholder="Student name" className="border p-2 capitalize bg-gray-900" required />

                    <input name="father_name" value={student.father_name}
                        onChange={handleTopChange} placeholder="Father name" className="border p-2 capitalize bg-gray-900" required />

                    <input name="mother_name" value={student.mother_name}
                        onChange={handleTopChange} placeholder="Mother name" className="border p-2 capitalize bg-gray-900" required />


                    <div className='w-full border bg-gray-900'>
                        <DatePicker
                            selected={student.date_of_birth ? new Date(student.date_of_birth) : null}
                            className="p-2 w-full outline-none "
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            onChange={(date) => {
                                if (date) {
                                    const formatted = date.toLocaleDateString("en-CA");
                                    setStudent((prev) => ({ ...prev, date_of_birth: formatted }));
                                }
                            }}

                            dateFormat="yyyy-MM-dd"
                            placeholderText="YYYY-MM-DD"
                            required
                        />
                    </div>

                    <select
                        name="gender"
                        value={student.gender}
                        onChange={handleTopChange}
                        className="border p-2 bg-gray-900"
                        required
                    >
                        <option value="" disabled>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>

                    <input
                        name="registration"
                        type='number'
                        value={student.registration}
                        required
                        onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d{0,12}$/.test(value)) {
                                handleTopChange(e);
                            }
                        }}
                        placeholder="Registration"
                        className="border p-2 bg-gray-900"
                    />

                    <select
                        name="course_name"
                        value={student.course_name}
                        onChange={(e) => {
                            handleTopChange(e);
                            handleSelectCourse(e);
                        }}
                        className="border p-2 bg-gray-900"
                        required
                    >
                        <option value="" disabled>Select Course</option>
                        {
                            courses?.map((course, idx) =>
                                <option key={idx} value={course.course_name}>
                                    {course.course_name}
                                </option>
                            )
                        }
                    </select>

                    <select
                        name="name_of_industry"
                        value={student.name_of_industry}
                        onChange={handleTopChange}
                        className="border p-2 bg-gray-900"
                        required
                    >
                        <option value="" disabled>Select Institute</option>
                        {
                            institutes?.map((insti, idx) =>
                                <option key={idx} value={insti.name}>
                                    {insti.name}
                                </option>
                            )
                        }
                    </select>

                    <select
                        name="department"
                        value={student.department}
                        onChange={(e) => {
                            handleTopChange(e);
                            handleSelectDept(e);
                        }}
                        disabled={!selectCourse}
                        className="border p-2 bg-gray-900"
                        required
                    >
                        <option value="" disabled>Select Department</option>
                        {
                            selectCourse?.map((dept, idx) =>
                                <option key={idx} value={dept.name}>
                                    {dept.name}
                                </option>
                            )
                        }
                    </select>

                    <select
                        name="regulation"
                        value={student.regulation}
                        onChange={(e) => {
                            handleTopChange(e);
                            handleSelectRegulation(e);
                        }}
                        className="border p-2 bg-gray-900"
                        required
                    >
                        <option value="" disabled>Select Regulation</option>
                        {
                            regulations?.map((reg, idx) =>
                                <option key={idx} value={reg.regulation}>{reg.regulation}</option>
                            )
                        }
                    </select>

                    <select
                        name="session"
                        value={student.session}
                        onChange={handleTopChange}
                        className="border p-2 bg-gray-900"
                        required
                    >
                        <option value="" disabled>Select Session</option>
                        {
                            selectRegulation?.map((ses, idx) =>

                                <option key={idx} value={ses}>{ses}</option>
                            )
                        }
                    </select>

                    <input className='btn col-span-2' type="submit" value="Upload Student Info" />
                </div>
            </form>
        </div>
    );
};

export default UploadStudent;