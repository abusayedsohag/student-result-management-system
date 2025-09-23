import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthProvider } from '../../Provider/AuthContext';
import logo from '../../../public/logo.png'
import Swal from 'sweetalert2';

const Navbar = () => {

    const { user, signOutme } = useContext(AuthProvider)

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
        <div className='w-11/12 mx-auto'>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="flex-1">
                    <div className='flex items-center'>
                        <img
                            src={logo}
                            alt="Logo"
                            className='h-8 md:h-10'
                        />
                        <a href='/' className="btn btn-ghost md:text-xl p-0">Diploma Result</a>
                    </div>
                </div>
                <div className="flex-none">
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
                                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                        <li>
                                            <Link to={'/admin/dashboard'} >
                                                Dashboard
                                            </Link>
                                        </li>
                                        <li><Link to={'/upload-student-info'}>Upload Student Info</Link></li>
                                        <li><Link to={'/upload-result-info'}>Upload Result Info</Link></li>
                                        <li><button onClick={handleSignOut}>Log Out</button></li>
                                    </ul>
                                </> :
                                <>
                                    <div>
                                        <Link to={"/login"} className='btn'>Admin</Link>
                                    </div>
                                </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;