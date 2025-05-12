import { Link } from "react-router-dom";
const Footer = ()=>{
    return(
        <>
            <div className="bg-gray-700 flex flex-col fixed bottom-0  w-full justify-center items-center py-5 gap-2 text-white text-md font-medium ">
                <div className="  flex flex-col underline text-center md:flex-row md:gap-4 ">
                    <Link to="/">Privacy Policy</Link>  <Link to="/about">About</Link>  <Link to="/">Terms and Conditions</Link> 
                </div>
                <div >
                    <p>© 2025 TickTickBoom All Rights Reserved.</p>
                </div>
            </div>
        </>
    )
}

export default Footer;