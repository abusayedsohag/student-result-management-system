import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthProvider } from '../../Provider/AuthContext';
import logo from '../../../public/logo.png'
import Swal from 'sweetalert2';

const Navbar = () => {

    const { user, signOutme } = useContext(AuthProvider)


    const links =
        <>
            <li><Link to={'/'}>Home</Link></li>
            <li>
                <Link to={'/admin/dashboard'} >
                    Dashboard
                </Link>
            </li>
            <li><Link to={'/upload-student-info'}>Upload Student Info</Link></li>
            <li><Link to={'/upload-result-info'}>Upload Result Info</Link></li>
            <li><Link to={'/book-list'}>Booklist</Link></li>
        </>


    const handleSignOut = () => {
        signOutme()
            .then(res => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Successfully Sign Out",
                    showConfirmButton: false,
                    timer: 1500
                });
                toast('Successfully Logout')
            })
            .catch(error => {
                toast('Something Error')
            })
    }

    return (
        <div className='bg-white shadow-2xl shadow-amber-300'>
            <div className="navbar md:w-11/12 mx-auto">
                <div className="navbar-start">
                    <div className='flex items-center'>
                        <img
                            src={logo}
                            alt="Logo"
                            className='h-8 md:h-10'
                        />
                        <a href='/' className="btn btn-ghost md:text-xl p-0">Diploma Result</a>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {
                            links
                        }
                    </ul>
                </div>
                <div className="navbar-end">
                    <div className="flex-none ">
                        <div className="dropdown dropdown-end">
                            {
                                user ?
                                    <>
                                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                            <div className="w-8 md:w-10 rounded-full">
                                                <img
                                                    alt="Tailwind CSS Navbar component"
                                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                            </div>
                                        </div>
                                        <ul
                                            tabIndex={0}
                                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-48 p-2 shadow shadow-sky-100">
                                            <span className='lg:hidden'>
                                                {
                                                    links
                                                }
                                            </span>
                                            <li><button onClick={handleSignOut}>Log Out</button></li>
                                        </ul>
                                    </> :
                                    <>
                                        <div tabIndex={0} role="button" className="btn btn-ghost">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                                        </div>
                                        <ul
                                            tabIndex={0}
                                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-48 p-2 shadow shadow-sky-100">

                                            <span className='lg:hidden'>
                                                {
                                                    links
                                                }
                                            </span>
                                            <li>
                                                <Link className='bg-sky-500 py-2 text-white' to={"/login"}>Admin Login</Link>
                                            </li>
                                        </ul>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;