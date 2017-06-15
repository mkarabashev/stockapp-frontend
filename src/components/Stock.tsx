import * as React from 'react';
import { Button } from 'react-bootstrap'

const Stock = ({ stock, remove }) => (
  <div onClick={() => remove(stock)} className="bg-primary" style={{cursor: "pointer", display: "inline-block", margin: "10px", borderRadius: "15px", padding: "7px 10px"}}>
    <button style={{borderRadius: "50%", marginRight: 15, backgroundColor: "transparent", border: "none"}}>x</button>
    <span>{stock}</span>
  </div>
);

export default Stock;
