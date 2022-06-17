import React, { useEffect } from 'react'
import { useState } from 'react'


const Counter = () => {
  const [title,setTitle] = React.useState("CounterFn")
  const [counter, setCounter] = React.useState(0)
  const counterRef = React.useRef(counter)
  const [alert, setAlert] = React.useState(false)
  counterRef.current = counter
  
const handleAdd = () => {
  setCounter(counter +1)
}

const handleSubtract = () => {
  setCounter(counter-1)
}

const handleAlert2 = () => {
  setTimeout(() => {
    setAlert(true);
  }, 5000)
}


useEffect(() => {
 
  if (alert) {
    console.log('Alert change', alert )
    alert(counter)
    setAlert(false)
  }
}, [alert] ) // if Alert has changed, or called, we will do useEffect();
  return <div>
  <p>You clicked {counter} times</p>
  <button function={handleAdd}>
    click me
  </button>
</div>
}

export default Counter

// let fooCallTimes = 0;
// let state
// function myuseState(initValue) {
//   fooCallTimes++;
//   console.log("foo has been called", fooCallTimes);

//   if (fooCallTimes ===1) {
//     state=initValue
//   }

//   const setState = (newState) => {
//     state=newState
//   }
//   return [state,setState]
// }

// myuseState();