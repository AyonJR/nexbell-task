import React from "react";
import Functionalities from "../Functionalities/Functionalities";
import Cards from "../Cards/Cards";

const Home = () => {
  return (
    <div>
      <div className="flex w-full px-4">
        {/* filter and sorting  */}
        <div className="w-1/5">
          <Functionalities></Functionalities>
        </div>

        {/* product cards */}
        <div className="w-4/5">
          <Cards></Cards>
        </div>
      </div>
    </div>
  );
};

export default Home;
