import React from "react";

import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { addCard } from "../redux/memorySlice";

import Card from "./Card";

function Game() {
  //redux dispatch and addOne

  return (
    <div id="app">
      <Card />
    </div>
  );
}

export default Game;
