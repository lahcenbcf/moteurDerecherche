import userPic from "../assets/profilePic.svg"
function Profile() {
    const userInfo=JSON.parse(localStorage.getItem("user"))
  return (
    <div className='container px-4 w-full mx-auto bg-white max-h-screen h-full flex flex-col items-center relative'>
    
                <div className='mt-24 lg:mt-0 max-w-md w-full flex flex-col gap-6 items-center px-4 relative'>
                         

                            {/* user Pic */}
                            <div className='w-[11rem] h-[11rem] rounded-full'>
                                    <img src={userPic} alt='userProfile_pic' className='w-[100%] object-cover' />
                            </div>

                            {/* user name */}
                            <div className='text-black self-start w-full'> 
                            <span className='text-lg font-semibold'>Nom complet</span>
                            <div className={`w-full h-[52px] flex items-center rounded-md border border-slate-500 mt-2`}>
                            <p className='ml-4'>{userInfo.email.split("@")[0]}</p>
                            </div>
                            </div>

                            {/* user email */}

                            {/* user name */}
                            <div className='text-black self-start w-full'> 
                            <span className='text-lg font-semibold'>Email</span>
                            <div className={`w-full h-[52px] flex items-center rounded-md border border-slate-500 mt-2`}>
                             <p className='ml-4'>{userInfo.email}</p>
                            </div>
                            </div>

                            {/* mot de passe */}
                            <div className='text-black self-start w-full'> 
                            <span className='text-lg font-semibold'>Mot de passe</span>

                            
                            <div className={`w-full h-[52px] flex items-center rounded-md border border-slate-500 mt-2`}>
                                 <p className='ml-4'>{userInfo.password}</p>
                            </div>
                            </div>
                            
                           
                </div>

    </div>
  )
}

export default Profile
