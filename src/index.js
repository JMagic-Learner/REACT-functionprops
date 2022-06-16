import React from 'react';
import ReactDOM from 'react-dom';
import MyReactDOM from './myReact/MyReactDom';
import Button from './component/Button'
import MyReact from './myReact/MyReact';
import './index.css';
import App from './App';
import { render } from '@testing-library/react';
import { useEffect } from 'react';
import { useState } from 'react'

// import Counter from './component/Counter'
//import reportWebVitals from './reportWebVitals';

// const reactE = <section>
//   <header>Counter:0</header>
//   <button>+</button><button>-</button>
// </section>;

function Counter( props) {
  console.log(props.data);
  
  function updateCounter() {
  console.log("updateCounter has been logged")
  props.parentFunction(props.data+1);


  }

  return ( <div id="counter-container">
  <p>You clicked {props.data} times</p>
  <button onClick={updateCounter}>
    Click me
  </button>
</div>)
}


class Main extends MyReact.Component {
    constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      title: "Counter"
    }
    this.datapull = this.datapull.bind(this)
    // this.handleSubtract = this.handleSubtract.bind(this)
  }

  static getDerivedStateFromProps(props, state) {
    console.log("getDerivedStateFromProps triggered on line 31 of index.js");
    console.log('Props', props)
    console.log('state', state)
    if (props.title) {
      console.log("We have detected a state inside get getDerivedStateFromProps on line 35 of index.js")
      return { ...state, title: props.title };
    }
    return state;
  }

  datapull(childData) {
    console.log("datapull has been triggered",childData); // LOGS DATA FROM CHILD (My name is Dean Winchester... &)
    this.setState({
            counter: this.state.counter + 1
          })
          setTimeout(function()
          {
              alert("YOu have updated the count to " + childData);
          }, 
          5000);
      
  }

  render(){
    return(<div id="main-container">
      <Counter data={this.state.counter} parentFunction={this.datapull}/>
      </div>
    )
  }
}
// class Counter extends MyReact.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       counter: 0,
//       title: "Counter"
//     }
//     this.handleAdd = this.handleAdd.bind(this)
//     // this.handleSubtract = this.handleSubtract.bind(this)
//   }


//   // state = {
//   //   counter: 0,
//   //   title: "Counter",
//   // }
  
//   static HTMLParent(parentElement) {
//     console.log("HTMLParent has been triggered")
//     return this.buttonHTML.parent
//   }



//   handleAdd(){
//     this.setState({
//       counter: this.state.counter + 1
//     })
//   }

//   handleSubtract(){
//     this.setState({
//       counter: this.state.counter - 1
//     })
//   }

//   render() {
//     // console.log("section", document.querySelector('section'))
//     // console.log("STATE", this.state)
//     return <section>
//       <header>{this.state.title}:{this.state.counter}</header>
//       <Button function={this.handleAdd}/>
//       {/* <Button onClick={this.handleSubtract()}innerHTML="Press to indicate Counter"/> */}
//     </section>;
//   }
//   componentDidMount() {
//     console.log("section", document.querySelector('section'))
//   }
// }

// console.log("Counter", Counter)
// console.log("<Counter/>", <Counter />)


MyReactDOM.render( <Main/>, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
