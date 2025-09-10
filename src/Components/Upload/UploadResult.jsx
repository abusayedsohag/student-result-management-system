import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const UploadResult = () => {


    return (
        <div>
            <div className='w-1/2 mx-auto text-center'>
                <Link to={"/upload-result"} className="btn">Individual</Link>
                <Link to={"/upload-result/multiple-result"} className="btn">Multiple</Link>
            </div>
            <div>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default UploadResult;