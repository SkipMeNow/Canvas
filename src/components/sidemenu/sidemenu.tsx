import React from "react";
import "./sidemenu.css";

interface SidemenuProps {}

export function Sidemenu({}: SidemenuProps) {
  return (
    <div className="sidebar">
      {/* <h2 className="sidebar__header">Properties</h2> */}
      <div className="sidebar__content">
        <div className="sidebar__left">
          <button className="sidebar__button">
            <img
              src="../src/assets/react.svg"
              alt="Properties"
              className="sidebar__button-img"
            />
          </button>
          <button className="sidebar__button">
            <img
              src="../src/assets/react.svg"
              alt="Properties"
              className="sidebar__button-img"
            />
          </button>
          <button className="sidebar__button">
            <img
              src="../src/assets/react.svg"
              alt="Properties"
              className="sidebar__button-img"
            />
          </button>
        </div>
        <div className="sidebar__right">
          <h2 className="sidebar__header">Properties</h2>
        </div>
      </div>
    </div>
  );
}
