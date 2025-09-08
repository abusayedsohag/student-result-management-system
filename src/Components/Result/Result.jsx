import React from 'react';

const Result = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <div className='space-y-8'>
                <table className='table table-zebra'>
                    <thead>
                        <tr className='bg-green-500'>
                            <th colSpan={4}>
                                Student Information Summary
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Roll No</td>
                            <td>Roll No</td>
                            <td>Registration No</td>
                            <td>Registration No</td>
                        </tr>
                        <tr>
                            <td>Name of Student</td>
                            <td>Abu Sayed</td>
                            <td>Date of Birth</td>
                            <td>Date of birth</td>
                        </tr>
                        <tr>
                            <td>Father's Name</td>
                            <td>Abu Sayed</td>
                            <td>Mother's Name</td>
                            <td>Abu Sayed</td>
                        </tr>
                        <tr>
                            <td>Department</td>
                            <td>Department</td>
                            <td>Session: 22-23</td>
                            <td>Gender: Male</td>
                        </tr>
                        <tr className=''>
                            <td>Result</td>
                            <td colSpan={3} className='p-0'>
                                <table className='w-full'>
                                    <tr>
                                        <td>3.51</td>
                                        <td>3.52</td>
                                        <td>3.53</td>
                                        <td>3.54</td>
                                        <td>3.55</td>
                                        <td>3.56</td>
                                        <td>3.57</td>
                                        <td>3.58</td>
                                    </tr>
                                </table>

                            </td>
                        </tr>
                        <tr>
                            <td>Name of Institute</td>
                            <td colSpan={3}>Name of Institute</td>
                        </tr>
                    </tbody>
                </table>

                <h1 className='text-4xl font-semibold text-center'>Subject Information</h1>

                <div className='grid grid-cols-8'>
                    <button className="btn">1st</button>
                    <button className="btn">2st</button>
                    <button className="btn">3st</button>
                    <button className="btn">4st</button>
                    <button className="btn">5st</button>
                    <button className="btn">6st</button>
                    <button className="btn">7st</button>
                    <button className="btn">8st</button>
                </div>

                <table className='table table-zebra'>
                    <thead className=''>
                        <tr className='bg-green-500'>
                            <th className='w-1/12'>Code</th>
                            <th className='w-4/12' colSpan={2}>Subject</th>
                            <th className='p-0 w-full'>
                                <table className='w-full'>
                                    <tr>
                                        <td>Theory</td>
                                        <td>Grade</td>
                                        <td>Practical</td>
                                        <td>Grade</td>
                                        <td>Total</td>
                                        <td>Grade</td>
                                    </tr>
                                </table>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Code</th>
                            <th colSpan={2}>Subject</th>
                            <th className='p-0 w-full'>
                                <table className='w-full'>
                                    <tr>
                                        <td>Theory</td>
                                        <td>Grade</td>
                                        <td>Practical</td>
                                        <td>Grade</td>
                                        <td>Total</td>
                                        <td>Grade</td>
                                    </tr>
                                </table>
                            </th>
                        </tr>
                        <tr>
                            <th>Code</th>
                            <th colSpan={2}>Subject</th>
                            <th className='p-0 w-full'>
                                <table className='w-full'>
                                    <tr>
                                        <td>Theory</td>
                                        <td>Grade</td>
                                        <td>Practical</td>
                                        <td>Grade</td>
                                        <td>Total</td>
                                        <td>Grade</td>
                                    </tr>
                                </table>
                            </th>
                        </tr>
                        <tr>
                            <th>Code</th>
                            <th colSpan={2}>Subject</th>
                            <th className='p-0 w-full'>
                                <table className='w-full'>
                                    <tr>
                                        <td>Theory</td>
                                        <td>Grade</td>
                                        <td>Practical</td>
                                        <td>Grade</td>
                                        <td>Total</td>
                                        <td>Grade</td>
                                    </tr>
                                </table>
                            </th>
                        </tr>
                        <tr>
                            <th>Code</th>
                            <th colSpan={2}>Subject</th>
                            <th className='p-0 w-full'>
                                <table className='w-full'>
                                    <tr>
                                        <td>Theory</td>
                                        <td>Grade</td>
                                        <td>Practical</td>
                                        <td>Grade</td>
                                        <td>Total</td>
                                        <td>Grade</td>
                                    </tr>
                                </table>
                            </th>
                        </tr>
                        <tr>
                            <th>Code</th>
                            <th colSpan={2}>Subject</th>
                            <th className='p-0 w-full'>
                                <table className='w-full'>
                                    <tr>
                                        <td>Theory</td>
                                        <td>Grade</td>
                                        <td>Practical</td>
                                        <td>Grade</td>
                                        <td>Total</td>
                                        <td>Grade</td>
                                    </tr>
                                </table>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                Subject info
            </div>
        </div>
    );
};

export default Result;