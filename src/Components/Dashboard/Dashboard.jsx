import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {











    return (
        <div className='w-11/12 my-10 mx-auto border rounded-sm flex'>
            {/* <div>
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                <div className="flex-none lg:hidden">
                    <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-6 w-6 stroke-current"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            ></path>
                        </svg>
                    </label>
                </div>

                <div className="drawer-side">
                    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 min-h-full w-80 p-4">
                        <li><a>Sidebar Item 1</a></li>
                        <li><a>Sidebar Item 2</a></li>
                    </ul>
                </div>
            </div> */}

            <div className='border flex flex-col w-2/12'>
                <Link to={'/admin/dashboard/students-info'} className='btn'>Students Info</Link>
                <Link to={'/admin/dashboard/analize'} className='btn'>Analitics</Link>
                <Link className='btn'>lorem2</Link>
                <Link className='btn'>lorem2</Link>
                <Link className='btn'>lorem2</Link>
                <Link className='btn'>lorem2</Link>
            </div>
            <div className='border w-10/12'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;