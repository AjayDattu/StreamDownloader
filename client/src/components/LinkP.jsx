import React from 'react';
import Spline from '@splinetool/react-spline';


function LinkP() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen p-4">
      <div className="flex justify-center items-center">
        <Spline scene="https://prod.spline.design/U45h15kJH1rvnz6H/scene.splinecode" />
      </div>
      <div className="flex flex-col justify-center items-center space-y-4">
        <label className="text-gray-700 font-semibold" htmlFor="youtube-link">
          YouTube link here
        </label>
        <input
          id="youtube-link"
          type="text"
          className="border rounded-md p-2 w-full max-w-md text-gray-700"
          placeholder="Enter YouTube link"
        />
         <button className="Btn">
   <svg className="svgIcon" viewBox="0 0 384 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path></svg>
   <span className="icon2"></span>
   <span className="tooltip">Download</span>
</button>
      </div>
    </div>
  );
}


export default LinkP;
