import React from 'react'
import { useState } from 'react'
import Button from './component/Button'

function Counter() {

  const [count,setCount] = setState(0)
   
  function updateCounter() {
    setCount( count+1)
  }

  useEffect(() => {
    setCounter
  }, 0)
  
    handleAdd(){
    this.setState({
      counter: this.state.counter + 1
    })
  }

  return ( <div>
  <p>You clicked {count} times</p>
  <Button function={this.handleAdd}/>
    Click me
  </Button>
</div>)
}

export default Counter

function Counter( props) {
  
  function updateCounter() {
  console.log("updateCounter has been logged")
  props.parentFunction(props.data+1);
  }

  return ( <div>
  <p>You clicked {props.data} times</p>
  <button onClick={updateCounter}>
    Click me
  </button>
</div>)
}