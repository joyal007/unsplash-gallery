import React from 'react';
import loadingGif from '@/assets/loading.gif'

function Loading() {
  return (
    <section className="fixed top-[75px] h-full w-full z-40 bg-background flex justify-center items-center">
        <div className='relative'>
            <img src={loadingGif} className="h-[300px]" alt="loading gif"/>
            <h4 className="font-Montserrat  absolute left-1/2 -translate-x-1/2 bottom-2 md:-bottom-5 w-[200px] text-base md:text-xl text-gray-300 font-bold not-italic md:w-[345px] text-center leading-normal">Loading some awesome Images...</h4>
        </div>
    </section>
  )
}

export default Loading