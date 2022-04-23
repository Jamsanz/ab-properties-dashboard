import { Button } from "@mui/material";
import React from "react";

const Modal = ({show, toggle}: {show: boolean, toggle: Function}) => {
  return (
    <div
      className={`
       min-h-[100vh] min-w-[100vw]
       bg-[rgba(0,0,0,0.7)] ${show ? 'fixed': 'hidden'}
       top-0 left-0
       `}
      onClick={()=> toggle()}
    >
      <div className="flex justify-center items-center">
        <div
          className="
        flex mt-8 bg-white
        rounded-md min-w-[300px] w-[60vw]
        h-[60vh] shadow-md z-10
        "
        >
          <Button variant="contained" onClick={()=>toggle()}>Close</Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
