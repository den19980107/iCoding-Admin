import React from 'react';
import CountUp from 'react-countup'
const Category = ({ text, number, color }) => {
   return (
      <div style={{ width: "280px", display: "flex", justifyContent: "center", flexDirection: "column", background: color, padding: "1rem", borderRadius: "10px", margin: "1rem" }}>
         <div style={{ display: "flex", justifyContent: "center" }}>
            <h3 style={{ color: "white" }}>{text}</h3>
         </div>
         <div style={{ display: "flex", justifyContent: "center" }}>
            {/* <p style={{ color: "white", fontSize: "64px", fontWeight: 500, padding: 0, margin: 0 }}>{number}</p> */}
            <CountUp style={{ color: "white", fontSize: "64px", fontWeight: 500, padding: 0, margin: 0 }} end={number} duration={1}></CountUp>
         </div>
      </div>
   );
};

export default Category;