import {FC} from 'react'
import heroImg from '../../assets/heroImg.png'
import { AiOutlineSearch } from 'react-icons/ai'


const Main:FC = () => {
  return (
      <div className='w-full bg-white py-24 flex justify-center'>
          <div className='md:max-w-[1350px] mx-auto grid md:grid-cols-2 max-w-[600px] px-4 md:px-0 pl-8' >

              <div className='flex flex-col justify-start gap-4 pl-10'>
                  <p className='py-2 text-lg text-[#20B486] font-medium'>START TO SUCCESS</p>
                  <h1 className='md:leading-[60px] py-2 md:text-4xl text-4xl font-semibold'>Access To <span className='text-[#20B486]'>5000+</span> Courses
                      from <span className='text-[#20B486]'>300</span> Instructors
                      & Institutions
                  </h1>
                  <p className='py-2 text-lg font-medium text-gray-600'>Various versions have evolved over the years, sometimes by accident.</p>

                  <form className='bg-white border max-w-[500px] p-4 input-box-shadow rounded-md flex justify-between'>
                      <input
                          className='bg-white'
                          type="text"
                          placeholder='What do want to learn?'
                      />
                      <button>
                          <AiOutlineSearch
                              size={20}
                              className="icon"
                              style={{ color: '#000' }}
                          />
                      </button>
                  </form>
              </div>

              <img src={heroImg} className="md:order-last max-w-[600px] order-first" />
          </div>
      </div>
  )
}

export default Main;
