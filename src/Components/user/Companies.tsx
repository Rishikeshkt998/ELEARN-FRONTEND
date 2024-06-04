
import companyLogo1 from '../../assets/company-logo-1.png'
import companyLogo2 from '../../assets/company-logo-2.png'
import companyLogo3 from '../../assets/company-logo-3.png'
import companyLogo4 from '../../assets/company-logo-4.png'


const Companies = () => {
  return (
      <div className='w-full bg-white py-[50px]'>
          <div className='md:max-w-[1350px] m-auto max-w-[600px]  px-4 md:px-0'>
              <h1 className='text-center text-2xl font-bold text-[#536E96]'>Trusted by over 25,000 teams around the world.</h1>
              <p className='text-center  text-[#536E96] text-xl'>Leading companies use the same courses to help employees keep their skills fresh.</p>
              <div className='flex justify-center py-8 md:gap-8 '>
                  <div className='grid md:grid-cols-4 grid-cols-2 gap-2'>
                      <img src={companyLogo1} />
                      <img src={companyLogo2} />
                      <img src={companyLogo3} />
                      <img src={companyLogo4} />
                  </div>
              </div>

          </div>

      </div>
  )
}

export default Companies
