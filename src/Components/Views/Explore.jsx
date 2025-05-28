import React from "react";
import post from "../../assets/post.PNG";

const Explore = () => {
  return (
    <>
      <div className="grid grid-cols-3 gap-0">
        <div>
          <img className="" src={post} alt="post" />
        </div>
        <div>
          <img className="" src={post} alt="post" />
        </div>
        <div>
          <img className="" src={post} alt="post" />
        </div>
      </div>
       <div className="grid grid-cols-3 gap-0">
        <div>
          <img className="" src={post} alt="post" />
        </div>
        <div>
          <img className="" src={post} alt="post" />
        </div>
        <div>
          <img className="" src={post} alt="post" />
        </div>
      </div>
    </>
  );
};

export default Explore;
