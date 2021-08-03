import React, {useState} from 'react';
import './CardGame.css';
import ReactCardFlip from "react-card-flip";
import Button from 'react-bootstrap/Button';
import Confetti from 'react-confetti';
import {useWindowSize} from '@react-hook/window-size'

import deafening from '../../assets/deafening.png';
import silverflame from '../../assets/silverflame.png';
import realm from '../../assets/realm.png';
import knight from '../../assets/knight.png';
import acclaimed from '../../assets/acclaimed.png';
import shining from '../../assets/shining.png';
import blank from '../../assets/blank.jpg';

const cardsData = [
  {
    type: "deafening",
    image:  deafening,
    flipped: false,
    matched: false
  },
  {
    type: "silverflame",
    image: silverflame,
    flipped: false,
    matched: false
  },
  {
    type: "realm",
    image: realm,
    flipped: false,
    matched: false
  },
  {
    type: "acclaimed",
    image: acclaimed,
    flipped: false,
    matched: false
  },
  {
    type: "knight",
    image: knight,
    flipped: false,
    matched: false
  },
  {
    type: "shining",
    image: shining,
    flipped: false,
    matched: false
  }
];

function buildDeck() {

  let deck = [];
  // duplicate so we have two of each
  cardsData.forEach(x=>{
    deck.push({...x});
    deck.push({...x})
  });

  // shuffle
  const length = deck.length;
  for (let i=0; i<length; ++i) {
    const randomIndex = Math.floor(Math.random()*length);
    let temp = deck[i];
    deck[i] = deck[randomIndex];
    deck[randomIndex] = temp;
  }

  return deck;
}

function Card({card, index, onCardClicked}) {
  return (
    <>
    <ReactCardFlip isFlipped={card.flipped} flipSpeedBackToFront={1} flipSpeedFrontToBack={1} >
      <img src={blank} alt=""  onClick={()=> {onCardClicked(index)}}/>
      <img src={card.image} alt=""onClick={()=> {onCardClicked(index)}}/>
     </ReactCardFlip>
    </>
  )
}

function CardGame() {
  const [deck, updateDeck] = useState(buildDeck());
  const [width, height] = useWindowSize();

  function getStatus() {
    if (deck.filter(x=>!x.flipped).length===0) {
      
      return ( 
        <Confetti
          width={width}
          height={height}
        />)
    }
    else {
      return 'Try again'
    }
  }

  function onCardClicked(index) {
    if (!deck[index].matched) {
      deck[index].flipped = !deck[index].flipped;
      const openCards = deck.filter(x=>x.flipped && !x.match);
      if (openCards.length === 2) {
        const [first, second] = openCards;
        if (first.type === second.type)  {
          first.match = true;
          second.match = true;
          updateDeck([...deck]);
        }
        else {
          updateDeck([...deck]);
          setTimeout.current = setTimeout(()=> {
            first.flipped = false;
            second.flipped = false;
            updateDeck([...deck]);
          }, 1000);
        }  
      } 
      else {
        updateDeck([...deck]);
      }
    }
  }

  return (
    <>
    <div class="game">
      <div>
        <Button onClick={()=>{updateDeck(buildDeck());}}>Restart Game</Button>
      </div>
      <div>{getStatus()}</div>
      <div className="grid">
          {deck.map((card, index) => {
            return (
              <Card
                key={index}
                card={card}
                index={index}
                onCardClicked={onCardClicked}
              />
            );
          })}
        </div>
      </div>
    </>
  )
}

export default CardGame;