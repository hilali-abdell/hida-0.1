import AuthLayout from './_auth/AuthLayout';
import SigninForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm';
import RootLayout from './_root/RootLayout';
import { AllUsers, ChatLayout, CreatePost, EditPost, Explore, Home, PostDetails, Profile, Saved, UpdateProfile } from './_root/pages';
import './globals.css' ;
import { Route,Routes } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster"
import Followers from './_root/pages/Followers';
import Following from './_root/pages/Following';
import AskVerification from './_auth/forms/AskVerification';
import DoneVerification from './_auth/forms/VerifiedDone';



const App = () => {
  return (
    <main className="flex h-screen">
        <Routes>
           {/* Public Routes : */}
           <Route element={<AuthLayout/>}>
               <Route path='/sign-in' element={<SigninForm/>}/>
               <Route path='/sign-up' element={<SignupForm/>}/>
               <Route path='/ask-verification' element={<AskVerification/>}/>
               <Route path='/verified-done' element={<DoneVerification/>}/>
           </Route>
           {/* Private Routes : */}
           <Route element={<RootLayout/>}>
               <Route index element={<Home/>}/>
               <Route path="/explore" element={<Explore />} />
               <Route path="/saved" element={<Saved />} />
               <Route path="/all-users" element={<AllUsers />} />
               <Route path="/create-post" element={<CreatePost />} />
               <Route path="/update-post/:id" element={<EditPost />} />
               <Route path="/posts/:id" element={<PostDetails />} />
               <Route path="/profile/:id/*" element={<Profile />} />
               <Route path="/update-profile/:id" element={<UpdateProfile />} />
               <Route path="/profile/:id/followers" element={<Followers />} />
               <Route path="/profile/:id/following" element={<Following />} />
               <Route path="/chatboard" element={<ChatLayout />} />
           </Route>
        </Routes>
        <Toaster/>
    </main>
  )
}

export default App