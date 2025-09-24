import logo from "../../../public/logo.png"

const Footer = () => {
    return (
        <div className="">
            <footer className="footer grid grid-cols-2 md:grid-cols-3 bg-white rounded-t-2xl p-4 md:px-10 border-t border-amber-300">
                <aside className="col-span-2 md:col-span-1">
                    <img src={logo} alt="Logo" className='h-16 md:h-24' />
                    <p className="md:text-sm">
                        Diploma Result Ltd.
                        <br />
                        Providing reliable tech since 2025 <br />
                        Developed by <span className='font-semibold underline text-blue-500'>Family's Group</span>
                    </p>
                </aside>
                <nav className="">
                    <h6 className="footer-title">Services</h6>
                    <a className="link link-hover">Indivisual Result</a>
                    <a className="link link-hover">Institute Result</a>
                    <a className="link link-hover">Result Analytics</a>
                    <a className="link link-hover">All Semester Booklist</a>
                </nav>
                <nav className="">
                    <h6 className="footer-title">Social</h6>
                    <div className='grid grid-cols-3 gap-5'>
                        <a href="https://www.facebook.com/abusayedsohagislam" target='_blank'><i className="fa-brands fa-facebook fa-2xl"></i></a>
                        <a href="https://www.instagram.com/abusayedsohagislam" target='_blank'><i className="fa-brands fa-instagram fa-2xl"></i></a>
                        <a href="https://x.com/AbuSayedSohag25" target='_blank'><i className="fa-brands fa-x-twitter fa-2xl"></i></a>
                        <a href="https://github.com/abusayedsohag" target='_blank'><i className="fa-brands fa-github fa-2xl"></i></a>
                        <a href="https://www.linkedin.com/in/abu-sayed-sohag-islam" target='_blank'><i className="fa-brands fa-linkedin fa-2xl"></i></a>
                        <a><i className="fa-brands fa-weixin fa-2xl"></i></a>
                    </div>
                </nav>
            </footer>
            <footer className="footer flex bg-white items-center p-4">
                <img className='h-7' src={logo} alt="Diploma result" />
                <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
            </footer>
        </div>
    );
};

export default Footer;