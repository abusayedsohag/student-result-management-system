import Lottie from 'lottie-react';
import Morphing from "../../assets/animation-js/Morphing.json"

const Loader = ({ loader }) => {

    if(!loader) return null;


    return (
        <div className='h-screen'>
            <Lottie
                animationData={Morphing}
                loop={true}
                style={{ height: 200, width: 200 }}
            >
            </Lottie>
        </div>
    );
};

export default Loader;