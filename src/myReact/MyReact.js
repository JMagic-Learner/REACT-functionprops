import { type } from "@testing-library/user-event/dist/type";
import { render } from "react-dom";

class MyReact{
    constructor(props) {
        this.props=props
    }
    // New Object / State is fed into setState
    setState(newState) {
        this.state = {
            ...this.state,
            ...newState
        }
        console.log("This state" ,this.state);
        console.log("Definition of this", this)
        const curReactElement = this.render();
        const domElement = this.parentDomElement;
        console.log("preVDOM", this.preVDOM)
        console.log("NextVDOM", curReactElement)
        update(curReactElement, domElement, true)
    }
}

const update = (reactElement,domElement,isRoot
) => {
    let curDom;
    if (reactElement === undefined) {
        console.log("Step 0: reactElement is undefined")
        return;
    }
    if (typeof reactElement === 'string' | typeof reactElement === 'number') {
        console.log("Step 1.A The reactElement has detected as string or a number")
        curDom =
            document.createTextNode(reactElement);
    } else {
        console.log("Step 1.B The reactElement is defined, but is not a string or number datatype")
        const { type, props } = reactElement;
        /// if type is ClassCompoennt
        if (type.prototype instanceof MyReact) {
            console.log("Step 2.A The type.prototype has been detected as an instance of myReact ")
            // console.log('class componnent props', props)
            /// Updating (TODS, Current is wrong)
            //  React is comparing the preVDOM to nextVDOM using diffing Algrithem 
            //  using Filter Scheduler to find the best way to update the RealDOM
            const curInstance = new type(props);
            // console.log("curInstance", curInstance)

            // getDerivedStateFromProps
            curInstance.state = type.getDerivedStateFromProps(props, curInstance.state)
            // console.log("curInstance", curInstance)

            // render
            const curReactElement = curInstance.render();

            // console.log("curReactElement", curReactElement);
            update(curReactElement, domElement, isRoot);
            if (curInstance.componentDidmount) {
                curInstance.componentDidmount()
            }
            return
        }

        // Assignment if it is function component
        if (typeof type === 'function') {
            console.log("Step 2.B The type has been detected as a function")
            const curReactElement = type(props);
            // console.log("function compoennts TEST", curReactElement)
            update(curReactElement, domElement);
            return
        }
        /// else 
        console.log("Step 2.C The reactElement is defined, but is not a string|number, instance of myReact, or a function")
        curDom = document.createElement(type);
        Object.entries(props).forEach(
            ([key, value]) => {
                if (key === 'children') {
                    if (Array.isArray(value)) {
                        // console.log(value);
                        value.forEach((rElement) => {
                            update(rElement, curDom);
                        });
                    } else {
                        update(value, curDom);
                    }
                } else if (key.startsWith('on')) {
                    curDom.addEventListener(
                        getEventActionFromProps(key),
                        value
                    );
                } else {
                    curDom[key] = value;
                }
            }
        );
    }
    if (isRoot) {
        // curDom = document.createElement();
        console.log("We are attempting to append to isRoot")
        console.log("your current dom element is",curDom)
        console.log("The element that you are trying to replace CurDOm with is" ,domElement)
        if (domElement == undefined) {
            console.log(curDom)
            console.log("domElement is undefined")
            console.log("reactElement.type is ", reactElement.type)

            let targetHTML = document.getElementById('root');
            // WAIT A MINUTE. REACT ELEMENT IS A FUNCTIONAL COMPONENT. WE CAN JUST RERENDER THIS.
            render(reactElement,targetHTML)
        } else {
            console.log("domelement is defined")
            console.log("domElement.children" , domElement.props.children.props.data)
            if (domElement.childNodes != undefined) {
            console.log(domElement.childNodes[0])
            domElement.replaceChild(curDom, domElement.childNodes[0]);
            } else {
            console.log(domElement)
            domElement.appendChild(curDom)
            }
        }
        return;
    }
        
    // } else if (!isRoot && !domElement.childNodes[0]) {
    //     console.log("There is no Root and no domElementChildren")
    // } else {
    //     console.log("This is the curDom",curDom)
    //     console.log("This is the domElement", domElement)
    //     // console.log("These are the childnodes", domElement.childNodes[1])
    //     domElement.appendChild(curDom);
    //     // domElement.replaceChild(curDom, domElement.childNodes[0]);
    // }
};


//utils

function getEventActionFromProps(propsKey) {
    return propsKey.slice(2).toLowerCase();
}




const MyReactExport = {
    Component: MyReact
}
export default MyReactExport;
// let obj = {name:'patrick', age:18};

// obj.age = 20; // mutable change | reference is not changing

// obj = {...obj,age:20} // immutable change | reference is changing | new reference address in memory

