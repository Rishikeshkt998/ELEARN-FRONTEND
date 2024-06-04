import { FC } from 'react'
import teacher1 from '../../assets/teacher1.png'
import { Link } from 'react-router-dom'



const Tutorpage: FC = () => {
    return (
        <div className='w-full bg-white py-24 flex justify-center'>
            <div className='md:max-w-[1480px] mx-auto grid md:grid-cols-2 max-w-[600px] px-4 md:px-0 pl-8' >
                <div className='flex flex-col justify-center items-center gap-4 pl-10'>
                    <h1 className='md:leading-[60px] py-2 md:text-4xl text-4xl font-semibold text-center'>
                        Come Teach with us
                    </h1>
                    <p className='py-2 text-lg font-medium text-gray-600 text-center'>Become an instructor and change lives — including your own</p>
                    <Link to="/trainerregistration" className="block">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                            Get started
                        </button>
                    </Link>
                    <p className='py-2 text-sm font-medium text-gray-600 text-center'>Already have an account? {' '}
                        <Link to="/tutor/login" className="font-normal text-small text-indigo-600 hover:text-indigo-500">
                            Log in now
                        </Link>
                    </p>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <img src={teacher1} className="md:order-last max-w-[600px] order-first pr-10" style={{ width: '400px', height: '400px' }} />
                </div>
            </div>
        </div>
    )
}

export default Tutorpage
