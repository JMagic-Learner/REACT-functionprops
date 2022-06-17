import React from 'react';
import MyReactDOM from './myReact/MyReactDom';
import MyReact from './myReact/MyReact';
// import Counter from './component/Counter'
import './index.css';
import App from './App';

function Counter( props) {
  console.log(props.data);
  
  function updateCounterPlus() {
  console.log("updateCounter has been logged")
  props.parentFunction(props.data+1);
  }

  function updateCounterSub() {
    console.log("updateCounter has been logged")
    props.parentFunction(props.data-1);
    }

  return ( <div id="counter-container">
  <p>You clicked {props.data} times</p>
  <button onClick={updateCounterPlus}>
    Click me to add
  </button>
  <button onClick={updateCounterSub}>
    Click me to subtract
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
    console.log("datapull has been triggered",childData); // LOGS DATA FROM CHILD 
    this.setState({
            counter: childData
          })
          setTimeout(function()
          {
              alert("YOu have updated the count to " + childData);
          }, 
          5000);
      
  }

  render(){
    return(<div id="main-container">
      {/* <Counter/> */}
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

export default Main;
MyReactDOM.render( <App/>, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
