
import React from 'react'
import './footer.css'
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidPhoneCall } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { GiGearHammer } from "react-icons/gi";
import { GrFacebook  ,GrYoutube} from "react-icons/gr";
 import { BsInstagram } from "react-icons/bs";
 import { FaTiktok } from "react-icons/fa";
 import ScrollToTop from "react-scroll-to-top";
export default function Footer() {
  return (
    
    <div>
      <ScrollToTop smooth top={20} component={<div className="scroll-to-top-button">↑</div>}/>
     <div className='bg-black   footerimg '>
    
       <div className='flex flex-col md:flex-row relative'>
             <div className='ml-8 p-8 max-w-lg  text-white rounded-lg mt-8'>
             <p className='font-extralight'>
             Our luxury apartments are meticulously designed to provide the highest standards of comfort, style, and sophistication. From state-of-the-art amenities and breathtaking views to exquisite interiors and premium finishes, each apartment is a testament to modern elegance and unparalleled quality.
              </p>
             </div>

           
        
     <div className='text-3xl p-8 uppercase text-white'>
       Contact Us
       <div className='ml-5 mt-6'>
         <span className='flex'><FaLocationDot className='text-red-500'/>
         <p className='text-sm text-white font-extralight normal-case mt-2 ml-2'>188/1, Piliyandala Road, Werahera, Boralesgamuwa, Sri Lanka</p></span>
       </div>

       <div className='ml-5 mt-6'>
         <span className='flex'><BiSolidPhoneCall className='text-green-500'/>
         <p className='text-sm text-white font-extralight normal-case mt-2 ml-2'>0112518058</p></span>
       </div>

       <div className='ml-5 mt-6'>
         <span className='flex'><MdEmail className='text-blue-500'/>
         <p className='text-sm text-white font-extralight normal-case mt-2 ml-2'>gleelanka@gmail.com</p></span>
       </div>  

     
     </div>




        <div className='text-3xl p-8 uppercase text-white'>
            Our Services
            <div className='ml-5 mt-6'>
             <span className='flex'><GiGearHammer className='text-red-500'/>
             <p className='text-sm text-white font-extralight normal-case mt-2 ml-2 italic'>Consultancy services</p></span>
           </div>

           <div className='ml-5 mt-2'>
             <span className='flex'><GiGearHammer className='text-red-500'/>
             <p className='text-sm text-white font-extralight normal-case mt-2 ml-2 italic'>Development</p></span>
           </div>

           <div className='ml-5 mt-2'>
             <span className='flex'><GiGearHammer className='text-red-500'/>
             <p className='text-sm text-white font-extralight normal-case mt-2 ml-2 italic'>Supply and installation</p></span>
           </div>

           <div className='ml-5 mt-2'>
             <span className='flex'><GiGearHammer className='text-red-500'/>
             <p className='text-sm text-white font-extralight normal-case mt-2 ml-2 italic'>Supply</p></span>
           </div>
        </div>
       
       </div>

       <div className='text-white text-center p-4 relative mt-32'>
       <p className='text-4xl font-semibold uppercase'>Green Lanka Energy Engineering (Pvt) Ltd</p>
         </div>

         <div class='items-center justify-center p-4 relative flex text-xl'>
           <span class='ml-4 icon-container'>
               <span class='text-blue-700'><a href="https://www.facebook.com/greenlankaenergy" aria-label="Our Facebook page" target="_blank" rel="noopener noreferrer" class="block mb-1 cursor-pointer"><GrFacebook/></a></span>
           </span>
           <span class='ml-4 icon-container'>
               <span class='text-red-600'><GrYoutube/></span>
           </span>
           <span class='ml-4 icon-container'>
               <span class='text-pink-600'><BsInstagram/></span>
           </span>
           <span class='ml-4 icon-container'>
               <span class='text-yellow-100'><FaTiktok/></span>
           </span>
       </div>

         <div className='text-white text-center ml-2 uppercase font-extralight relative hover:text-blue-500'>FOLLOW US.</div>
      
     </div>
     
     
     <div>
     
       <div className='bg-black text-white text-center p-4'>
         
         <p className='text-sm'>© 2023 Green Lanka Energy Engineering (Pvt) Ltd. All Rights Reserved.</p>
         <p className='text-sm'>  Website Designed & Developed by <a href='https://gleits.com/' className='text-green-500'>Gleits</a></p>
       
           </div>
     </div>
    </div>
  )
}
