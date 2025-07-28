import React, { forwardRef } from "react";
const GameBtn1 = forwardRef(({ border,color, bg, onClick }, ref) => (
  <button 
  className={`${border} ${bg} w-[175px] sm:w-[200px] h-[175px] sm:h-[200px] m-2 duration-200 hover:scale-105`}
    color={color}
    onClick={onClick}
    ref={ref}
  ></button>
));
export default GameBtn1;
