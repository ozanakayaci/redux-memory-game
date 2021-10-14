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
const doubledCards = initialCards.concat(initialCards);
const shuffledCards = shuffle(doubledCards);

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
