import { Link } from "react-router-dom"


const AskVerification = () => {
  return (
    <div className="flex justify-center items-center h-full ">
        <div className="text-lg text-slate-200 ">
        We are glad you've joined HIDA ! We've sent a verification link to your email. Please verify your account else your account will be removed in 7-days. Thanks !
        <Link to="/" className="text-primary-500"> Home Page</Link>
        </div>
    </div>
  )
}

export default AskVerification