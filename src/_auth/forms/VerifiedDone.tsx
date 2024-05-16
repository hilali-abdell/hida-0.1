import { account } from "@/lib/appwrite/config";
import { Link } from "react-router-dom";


const DoneVerification = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const secret = urlParams.get('secret');
    const userId = urlParams.get('userId');
    
    const promise = account.updateVerification(userId||"", secret||"");
    
    promise.then(() =>(
      console.log("User is verified !")
    ))
    .catch(()=>{console.log("verification faild!")})
    return (
      <div className="flex justify-center items-center h-full ">
          <div className="text-lg text-slate-200 ">
           Verification is Done !We are glad you've joined HIDA ! 
           <Link to="/" className="text-primary-500"> Home Page</Link>
          </div>
      </div>
    )
  }
  
  export default DoneVerification