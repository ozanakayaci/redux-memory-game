import { useState, useEffect } from "react";

import { nanoid } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import {
  cardSelectors,
  updateCard,
  updateAll,
  deleteAll,
  addCard,
} from "../redux/memorySlice";

import { Image, Box } from "@chakra-ui/react";

import { Pixton } from "pixton";
import "pixton/dist/index.css";

//initial values
const linkImg =
  "https://raw.githubusercontent.com/samiheikki/javascript-guessing-game/master/static/logos/";
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

function Card() {
  //redux selector,dispatch
  const Cards = useSelector(cardSelectors.selectAll);
  const dispatch = useDispatch();

  //useState for openedCardSelect,matchedCards,score
  const [openedCards, setOpenedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);

  //if card match,else [openedCards]
  useEffect(() => {
    if (openedCards.length === 2) {
      setTimeout(() => {
        if (openedCards[0].name === openedCards[1].name) {
          setMatchedCards([...matchedCards, openedCards]);
          setScore(score + 50);
        } else {
          dispatch(
            updateAll([
              {
                id: openedCards[0].id,
                complete: false,
                changes: {
                  close: true,
                },
              },
              {
                id: openedCards[1].id,
                complete: false,
                changes: {
                  close: true,
                },
              },
            ])
          );
          setScore(score - 10);
        }
        setOpenedCards([]);
      }, 750);
    }
  }, [openedCards]);

  //onClick card function
  const updateHandle = (item) => {
    if (openedCards.length === 2) return false;

    setOpenedCards([...openedCards, item]);

    dispatch(
      updateCard({
        id: item.id,
        complete: false,
        fail: false,
        changes: {
          close: false,
        },
      })
    );
  };

  //restart button handler
  const shuffleHandler = () => {
    dispatch(deleteAll());
    shuffle(Cards);
    setScore(0);
    setMatchedCards([]);
    setOpenedCards([]);
    shuffle(shuffledCards);
    setTimeout(() => {
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
    }, 500);
  };

  return (
    <Box id="app">
      <Box
        mb="50px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Pixton>Score: {score}</Pixton>

        <Pixton onClick={() => shuffleHandler()}>Restart</Pixton>

        {matchedCards.length == 0 && (
          <Pixton type="primary" onClick={() => shuffleHandler()}>
            Start
          </Pixton>
        )}
      </Box>
      <Box p="2px" className="playground">
        {Cards.map((item, i) => {
          return (
            <Box
              key={i}
              onClick={() => updateHandle(item)}
              className={
                item.close === false || item.complete === true
                  ? "card opened"
                  : "card"
              }
            >
              <Box border="1px" className="front"></Box>
              <Box border="1px" className="back">
                <Image
                  m="15px"
                  alt={item.name}
                  src={linkImg + item.name + ".png"}
                />
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default Card;
