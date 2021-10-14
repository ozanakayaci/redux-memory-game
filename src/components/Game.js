import React from "react";

import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { addCard } from "../redux/memorySlice";

import Card from "./Card";

//initialCard names
const initialCards = [
  "angular2",
  "vue",
  "react",
  "grunt",
  "phantomjs",
  "ember",
  "babel",
  "ionic",
  "gulp",
  "meteor",
  "yeoman",
  "yarn",
  "nodejs",
  "bower",
  "browserify",
];
//shuffle fucntion
const shuffle = (array) => {
  console.log("shuffle");
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};
const shuffledCards = shuffle(initialCards);
console.log(shuffledCards, "shuffled");
function Game() {
  //reduxd dispatch and addOne
  const dispatch = useDispatch();
  shuffledCards.map((item) => {
    dispatch(
      addCard({
        id: nanoid(2),
        name: item,
        close: true,
        complete: false,
        fail: false,
      })
    );
  });

  return (
    <div id="app">
      <Card />
    </div>
  );
}

export default Game;
