import logo from "../../../public/logo.png"

const Footer = () => {
    return (
        <div className="">
            <footer className="footer grid grid-cols-2 md:grid-cols-3 bg-neutral text-neutral-content p-4 md:p-10">
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
            <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-1 md:p-4">
                <aside>
                    <p className="text-[10px] md:text-sm">Copyright © 2026 - All right reserved by Diploma Result Ltd</p>
                </aside>
            </footer>
        </div>
    );
};

export default Footer;