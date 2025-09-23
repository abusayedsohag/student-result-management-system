
import { useEffect } from 'react';
import { fetchStudents } from '../../assets/api';
import { useState } from 'react';

const Analize = () => {

    const [students, setStudents] = useState([])

    useEffect(() => {
        fetchStudents()
            .then(res => setStudents(res.data))
    }, [])

    const semesterName = students?.map(data => data?.semesters?.find(dt => dt?.semester_name === "1st"))


    return (
        <div>


        </div>
    );
};

export default Analize;