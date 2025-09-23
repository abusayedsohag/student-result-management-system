import { useEffect, useState } from "react";
import { fetchStudents } from "../../assets/api";


const Students = () => {

    const [students, setStudents] = useState([])

    useEffect(() => {
        fetchStudents()
            .then(res => setStudents(res.data))
    }, [])




    return (
        <div>
            <ul className="list bg-base-100 rounded-box shadow-md">

                {
                    students.map((data, index) => (
                        <li key={index} className="list-row">
                            <div className="text-xl font-thin opacity-60 tabular-nums">{data.roll}</div>
                            <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp" /></div>
                            <div className="list-col-grow">
                                <div className="capitalize">{data.student_name}</div>
                                <div className="text-xs uppercase font-semibold opacity-60">Father_Name : {data.father_name}</div>
                            </div>
                            <button className="btn btn-square btn-ghost">
                                <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg>
                            </button>
                        </li>
                    ))
                }

            </ul>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Roll</th>
                            <th>Name</th>
                            <th>Department</th>
                            <th>Institute</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            students.map((data, index) => (
                                <tr key={index}>
                                    <th>{data.roll}</th>
                                    <td>{data.student_name}</td>
                                    <td>{data.department}</td>
                                    <td>{data.name_of_industry}</td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Students;