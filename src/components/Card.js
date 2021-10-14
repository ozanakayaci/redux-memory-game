import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { cardSelectors, updateCard, updateAll } from "../redux/memorySlice";

import { Image, Box, Button } from "@chakra-ui/react";

const linkImg =
  "https://raw.githubusercontent.com/samiheikki/javascript-guessing-game/master/static/logos/";

function Card() {
  //redux selector,dispatch
  const Cards = useSelector(cardSelectors.selectAll);
  const dispatch = useDispatch();
  //useState for openedCardSelect and matchedCards
  const [openedCards, setOpenedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  useEffect(() => {
    if (openedCards.length === 2) {
      setTimeout(() => {
        if (openedCards[0].name === openedCards[1].name) {
          setMatchedCards([...matchedCards, openedCards]);
        } else {
          dispatch(
            updateAll([
              {
                id: openedCards[0].id,
                complete: false,
                fail: false,
                changes: {
                  close: true,
                },
              },
              {
                id: openedCards[1].id,
                complete: false,
                fail: false,
                changes: {
                  close: true,
                },
              },
            ])
          );
        }
        setOpenedCards([]);
      }, 750);
    }
  }, [openedCards]);

  //onClick function
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
  console.log(Cards, "cards");
  return (
    <Box>
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
