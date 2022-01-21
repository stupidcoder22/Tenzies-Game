import React, { useEffect, useState } from "react";
import Numbox from "./Numbox";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function Home() {
  const [data, setdata] = useState(allnewDice());
  const [won, setwon] = useState(false);

  function allnewDice() {
    var arr = [];
    for (var i = 0; i < 10; i++) {
      arr.push(generateNewDie());
    }
    return arr;
  }

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isheld: false,
      id: nanoid(),
    };
  }

  useEffect(() => {
    const allheld = data.every((die) => die.isheld);
    const firstval = data[0].value;
    const sameval = data.every((die) => die.value === firstval);
    if (allheld && sameval) {
      setwon(true);
    }
  }, [data]);

  function changevalue() {
    if (!won) {
      setdata((oldval) =>
        oldval.map((die) => {
          return die.isheld ? die : generateNewDie();
        })
      );
    } else {
      setwon(false);
      setdata(allnewDice());
    }
  }

  function holdDice(id) {
    setdata((old) =>
      old.map((newdata) => {
        return newdata.id === id ? { ...newdata, isheld: true } : newdata;
      })
    );
  }
  return (
    <main>
      {won && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instruction">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="innerbody">
        {data.map((newdata) => {
          return (
            <Numbox
              isheld={newdata.isheld}
              data={newdata.value}
              key={newdata.id}
              hold={() => {
                holdDice(newdata.id);
              }}
            />
          );
        })}
      </div>
      <button className="rolldice" onClick={changevalue}>
        {won ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default Home;
