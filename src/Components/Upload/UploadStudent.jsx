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

    const handleReset = () => {
        setStudent({
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
        })
    }


    return (
        <div className='mx-auto max-w-3xl mb-10'>
            <div className='py-8 md:space-y-3 text-center'>
                <h1 className='text-xl md:text-4xl font-bold'>Upload Student Information</h1>
                <p className='label text-[10px] md:text-sm'>“Faster Uploads, Smarter Management, Better Results.”</p>
            </div>
            <form className='max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-2xl shadow-sky-300' onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-y-3 gap-x-5">
                    <div className='flex flex-col gap-1'>
                        <p>Roll</p>
                        <input name="roll" type='number' value={student.roll}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d{0,6}$/.test(value)) {
                                    handleTopChange(e);
                                }
                            }}
                            placeholder="Enter Student Roll"
                            className="border border-gray-200 rounded-lg bg-sky-100 p-2 w-full"
                            required />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <p>Registration</p>
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
                            placeholder="Enter Student Registration"
                            className="border p-2 border-gray-200 rounded-lg bg-sky-100"
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <p>Student Name</p>
                        <input name="student_name" value={student.student_name}
                            onChange={handleTopChange} placeholder="Enter Student name" className="border border-gray-200 rounded-lg p-2 capitalize bg-sky-100" required />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <p>Date of Birth</p>
                        <DatePicker
                            selected={student.date_of_birth ? new Date(student.date_of_birth) : null}
                            className="p-2 flex outline-none border w-full border-gray-200 rounded-lg bg-sky-100"
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

                    <div className='flex flex-col gap-1'>
                        <p>Father's Name</p>
                        <input name="father_name" value={student.father_name}
                            onChange={handleTopChange} placeholder="Enter Father name" className="border p-2 capitalize border-gray-200 rounded-lg bg-sky-100" required />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <p>Mother's Name</p>
                        <input name="mother_name" value={student.mother_name}
                            onChange={handleTopChange} placeholder="Enter Mother name" className="border p-2 capitalize border-gray-200 rounded-lg bg-sky-100" required />
                    </div>


                    <div className='flex flex-col gap-1'>
                        <p>Gender</p>
                        <select
                            name="gender"
                            value={student.gender}
                            onChange={handleTopChange}
                            className="border p-2 border-gray-200 rounded-lg bg-sky-100"
                            required
                        >
                            <option value="" disabled>Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>



                    <div className='flex flex-col gap-1'>
                        <p>Select Curriculum</p>
                        <select
                            name="course_name"
                            value={student.course_name}
                            onChange={(e) => {
                                handleTopChange(e);
                                handleSelectCourse(e);
                            }}
                            className="border p-2 border-gray-200 rounded-lg bg-sky-100"
                            required
                        >
                            <option value="" disabled>Select Curriculum</option>
                            {
                                courses?.map((course, idx) =>
                                    <option key={idx} value={course.course_name}>
                                        {course.course_name}
                                    </option>
                                )
                            }
                        </select>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <p>Institute Name</p>
                        <select
                            name="name_of_industry"
                            value={student.name_of_industry}
                            onChange={handleTopChange}
                            className="border p-2 border-gray-200 rounded-lg bg-sky-100"
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
                    </div>

                    <div className='flex flex-col gap-1'>
                        <p>Department</p>
                        <select
                            name="department"
                            value={student.department}
                            onChange={(e) => {
                                handleTopChange(e);
                                handleSelectDept(e);
                            }}
                            disabled={!selectCourse}
                            className="border p-2 border-gray-200 rounded-lg bg-sky-100"
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
                    </div>

                    <div className='flex flex-col gap-1'>
                        <p>Regulation</p>
                        <select
                            name="regulation"
                            value={student.regulation}
                            onChange={(e) => {
                                handleTopChange(e);
                                handleSelectRegulation(e);
                            }}
                            className="border p-2 border-gray-200 rounded-lg bg-sky-100"
                            required
                        >
                            <option value="" disabled>Select Regulation</option>
                            {
                                regulations?.map((reg, idx) =>
                                    <option key={idx} value={reg.regulation}>{reg.regulation}</option>
                                )
                            }
                        </select>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <p>Session</p>
                        <select
                            name="session"
                            value={student.session}
                            onChange={handleTopChange}
                            disabled= {selectRegulation.length > 0}
                            className="border p-2 border-gray-200 rounded-lg bg-sky-100"
                            required
                        >
                            <option value="" disabled>Select Session</option>
                            {
                                selectRegulation?.map((ses, idx) =>

                                    <option key={idx} value={ses}>{ses}</option>
                                )
                            }
                        </select>
                    </div>
                    <div></div>
                    <div className='flex justify-between mt-6'>
                        <input className='border font-semibold rounded-lg border-sky-300 py-1.5 px-14' type="button" onClick={handleReset} value="Clear" />
                        <input className='rounded-lg font-semibold text-white bg-sky-500 py-1.5 px-14' type="submit" value="Submit" />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UploadStudent;