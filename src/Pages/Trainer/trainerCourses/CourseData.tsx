/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from "react";
import {  AiOutlinePlusCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import * as Yup from 'yup'

type Props={
    benefits:{title:string}[];
    setBenefits: (benefits: { title: string }[])=>void
    prerequisite: { title: string }[];
    setPrerequisite: (prerequisite: { title: string }[]) => void
    active:number
    setActive: (active: number)=>void
}

const CourseData:FC<Props> = ({benefits,setBenefits,prerequisite,setPrerequisite,active,setActive}) => {
    const [benefitsErrors, setBenefitsErrors] = useState<string[]>([]);
    const [prerequisiteErrors, setPrerequisiteErrors] = useState<string[]>([]);

    const ValidateSchema = Yup.object().shape({
        benefits: Yup.array().of(Yup.object().shape({
            title: Yup.string().required("Benefit title is required"),
        })),
        prerequisite: Yup.array().of(Yup.object().shape({
            title: Yup.string().required("Prerequisite title is required"),
        })),
    });
    const handleBenefitChange=(index:number,value:any)=>{
        const updatebenefits=[...benefits]
        updatebenefits[index].title=value
        setBenefits(updatebenefits)
        ValidateSchema.validateAt(`benefits.${index}.title`, { benefits, prerequisite })
            .then(() => setBenefitsErrors((prev:any) => {
                const newErrors = [...prev];
                newErrors[index] = "";
                return newErrors;
            }))
            .catch((error) => setBenefitsErrors((prev:any) => {
                const newErrors = [...prev];
                newErrors[index] = error.message;
                return newErrors;
            }));
    }
    const handleAddBenefits = () => {
        setBenefits([...benefits,{title:""}])
    }
    const handlePrerequisiteChange = (index: number, value: any) => {
        const updateprerequisite = [...prerequisite]
        updateprerequisite[index].title = value
        setPrerequisite(updateprerequisite)
        ValidateSchema.validateAt(`prerequisite.${index}.title`, { benefits, prerequisite })
            .then(() => setPrerequisiteErrors((prev:any) => {
                const newErrors = [...prev];
                newErrors[index] = "";
                return newErrors;
            }))
            .catch((error) => setPrerequisiteErrors((prev:any) => {
                const newErrors = [...prev];
                newErrors[index] = error.message;
                return newErrors;
            }));

    }
    const handleAddPrerequisite = () => {
        setPrerequisite([...prerequisite, { title: "" }])
    }
    const prevButton=()=>{
        setActive(active-1)
    }
    const handleOptions=()=>{
        if(benefits[benefits.length-1]?.title!==""&&prerequisite[prerequisite.length-1]?.title!==""){
            setActive(active+1)
        }else{
            toast.error("please fill the form to go next")
        }
            
    }
  return (
    <div className="w-[80%] m-auto mt-24 ">
        <div className="text-[20px]" >
              <label className="text-[20px] block" htmlFor="">
                What are the benefits for students in this course

              </label>
              <br/>
              {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                benefits.map((benefits:any,index:number)=>(
                    <div key={index}>
                    <input type="text"
                    key={index}
                    name="benefit"
                    placeholder="You will be able to build a fullstack lms platform"
                    required
                        className="my-2 bg-gray-800 block w-full text-white px-4 py-2"
                    value={benefits.title}
                    onChange={(e)=>handleBenefitChange(index,e.target.value)}/>
                    {
                        benefitsErrors[index] && (
                            <span className="text-red-500">{benefitsErrors[index]}</span>
                        )
                    }
                    </div>
                ))
              }
              <AiOutlinePlusCircle style={{margin:"10px 0px",cursor:"pointer",width:"30px"}} onClick={handleAddBenefits}/>



        </div>
          <div className="text-[20px]" >
              <label className="text-[20px] block" htmlFor="">
                  What are the prerequisite for starting the course

              </label>
              <br />
              {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  prerequisite.map((prerequisite: any, index: number) => (
                     <div key={index}>
                      <input type="text"
                          key={index}
                          name="prerequisite"
                          placeholder="You need basic knowledge in mernstack"
                          required
                          className="my-2 bg-gray-800 block w-full text-white px-4 py-2"
                          value={prerequisite.title}
                          onChange={(e) => handlePrerequisiteChange(index, e.target.value)} />
                          {
                          prerequisiteErrors[index] && (
                              <span className="text-red-500">{prerequisiteErrors[index]}</span>
                          )
                      }
                      </div>
                  ))
              }
              <AiOutlinePlusCircle style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }} onClick={handleAddPrerequisite} />

          </div>
          <div className="flex justify-between">
              <div
                  className="w-44 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8"
                  onClick={() => prevButton()}
              >
                  Prev
              </div>
              <div
                  className=" w-44 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8"
                  onClick={() => handleOptions()}
              >
                  Next
              </div>
          </div>
      
    </div>
  )
}

export default CourseData
