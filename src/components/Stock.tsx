import * as React from 'react';
import { Button } from 'react-bootstrap'

const Stock = ({ stock, remove }) => (
  <div onClick={() => remove(stock)} className="bg-primary pill">
    <button className="pill-btn">x</button>
    <span>{stock}</span>
    <style jsx>{`
      .pill {
        display: inline-block;
        margin: 10px;
        padding: 7px 10px;
        border-radius: 15px;
        cursor: pointer;
      }
      .pill-btn {
        border-radius: 50%;
        margin-right: 15px;
        background-color: transparent;
        border: none;
      }
    `}</style>
  </div>
);

export default Stock;
