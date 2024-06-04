import {FC} from 'react'
const UserLogin:FC = () => {
  return (
      <div className="min-h-screen b-gray-50 flex-col justify-center">
                 <div className="max-v-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
                     <div className="text-center font-medium text-xl">


                       </div>
                   </div>
                   <div className="max-w-md v-ful mx-auto mt-4 bg-white p-8 border border-gray-300">
                       <form action="" className="space-y-6">
                           <div>
                               <label className="text-sm font-bold text-gray-600 block">Email</label>
                               <input title="Enter your username" type="text" className="w-full p-2 border border-gray-300 rounded mt-1" />
                           </div>
                           <div>
                               <label className="text-sm font-bold text-gray-600 block">Password</label>
                               <input title="Enter your password" type="text" className="w-full p-2 border border-gray-300 rounded mt-1" />
                           </div>
                           <div className="flex items-center justify-between">
                               <div className="flex items-center">
                                   <input  type="checkbox" className="h-4 w-4 text-blue-300 rounded"/>
                                   <label  htmlFor="" className="ml-2 text-sm text-gray-600" >Remember me</label>

                               </div>
                               <div >
                                   <a href="" className="font-medium text-sm text-blue-500"></a>

                               </div>
                           </div>
                           <div>
                               <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm">Submit</button>
                           </div>

                       </form>
                   </div>
              </div>
  )
}

export default UserLogin


