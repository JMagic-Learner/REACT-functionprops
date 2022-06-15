import React from 'react';
import ReactDOM from 'react-dom';
import MyReactDOM from './myReact/MyReactDom';
import Button from './component/Button'
import './index.css';
import App from './App';
import { render } from '@testing-library/react';
//import reportWebVitals from './reportWebVitals';

// const reactE = <section>
//   <header>Counter:0</header>
//   <button>+</button><button>-</button>
// </section>;



class Counter extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     counter: 0,
  //     title: "Counter"
  //   }
  // }


  state = {
    counter: 0,
    title: "Counter",
  }
  
  static HTMLParent(parentElement) {
    console.log("HTMLParent has been triggered")
    return this.buttonHTML.parent
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

  render() {
    // console.log("section", document.querySelector('section'))
    // console.log("STATE", this.state)
    return <section>
      <header>{this.state.title}:{this.state.counter}</header>
      <Button innerHTML="Press to indicate Counter"/>
    </section>;
  }
  componentDidMount() {
    console.log("section", document.querySelector('section'))
  }
}

// console.log("Counter", Counter)
// console.log("<Counter/>", <Counter />)


MyReactDOM.render( <Counter title="MyCounter" />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
