import React from "react";
import { SyncLoader } from "react-spinners";


const Loader = () => {
    return (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-opacity-30 bg-gray-200'>
          <SyncLoader color="blue" />
      </div>
    );
  };
  
  export default Loader;

