import { Link } from "react-router-dom";


const BottomWarning = ({signupLabel, signupButtonText, signupRoute, label, buttonText, to}) => {
    return <div className="flex flex-col">
        <div className="py-2 text-sm flex justify-center">
            <div>
                {signupLabel}
            </div>
            <Link to={signupRoute} className="pointer underline pl-1 cursor-pointer">
                {signupButtonText}
            </Link>
        </div>

            <div className="py-2 text-sm flex justify-center">
                <div>
                    {label}
                </div>
                <Link to={to} className="pointer underline pl-1 cursor-pointer">
                    {buttonText}
                </Link>
            </div>
        </div>
}

export default BottomWarning;