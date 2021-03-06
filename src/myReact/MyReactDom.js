import React from 'react';
import MyReact from './MyReact'

const render = (
    reactElement,
    domElement
) => {
    let curDom;
    // console.log("TEST", reactElement)
    // Lines 9 through 22 detertime the type of reactElement being passed through the render function.
    if (reactElement === undefined) {
        return;
    }
    if (typeof reactElement === 'string' | typeof reactElement === 'number') {
        console.log ("We have detected a react element string or a number")
        curDom =
            document.createTextNode(reactElement);
    } else {
        console.log(reactElement)
        const { type, props } = reactElement;
        console.log("This is the type", type)
        console.log("This is the prop", props)
   
        /// if type is ClassCompoennt
        // Jason Ma: Comments 6/14/2022 - Following code is from ANTRA class.
        if (type.prototype instanceof MyReact.Component) {
            console.log("we have detected that type.prototype is a React.Component")
            console.log(type)
            // console.log('class componnent props', props)
            /// Updating (todos, current is wrong)
            // TODO: Implement 
            /// constructor
            const curInstance = new type(props);
            console.log("curInstance", curInstance)
            curInstance.parentDomElement = domElement;
            // getDerivedStateFromProps
            curInstance.state = type.getDerivedStateFromProps(props, curInstance.state)
            console.log("index.js has returned a state from getDerivedProps")
            console.log("curInstance", curInstance.state)

            // render
            const curReactElement = curInstance.render();
            curInstance.preVDOM = curReactElement; // NEW CODE FROM PATRICK LIN
            // console.log("curReactElement", curReactElement);
            render(curReactElement, domElement);
            if (curInstance.componentDidmount) {
                curInstance.componentDidmount()
            }
            console.log ( "This is the end of code 48 on MyReactDOM")
            return
        }
         
        // Assignment if it is function component
        // FIRST ROUGH ATTEMPT - THE DIRTY METHOD.
        // if (typeof type === 'function') {
        //         console.log("The code has detected that React Component is a function")
        //         console.log(type);
        // }
        //         let stringVersion = "" + type;
        //         console.log(stringVersion)
        //         let firstSplit = stringVersion.split('return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("');
        //         let secondSplit = firstSplit[1]
        //         let thirdSplit = secondSplit.split(`", {`);
        //        //Lets split the child
        //         let innerHTMLSplit = thirdSplit[1];
        //         let childSplit2 = innerHTMLSplit.split(`children: `);
        //         let childSplit3 = childSplit2[1];
        //         let childSplit4 = childSplit3.split('}, ');
        //         let ElementTag = thirdSplit[0];
        //         let HTMLContent = childSplit4[0]
        //             curDom = document.createElement(ElementTag);
        //             curDom.innerHTML = HTMLContent
        //             domElement.appendChild(curDom);
                
        //         return;
        // } 


        // THE CORRECT METHOD AS SHOWCASED BY CLASSMATE 
        if (typeof type === "function") {
            console.log("We have detected the component as a function");
            const ReactElementArray = new type(props); // Read Props from the Button Component.
            console.log("This is the ReactElementArray", ReactElementArray); // This is the actual object that render can sift through for children,etc.
            render(ReactElementArray, domElement); // Feed the dom element and 
            return;
          }
          
       

        curDom = document.createElement(type);
       
        Object.entries(props).forEach(
            ([key, value]) => {
                if (key === 'children') {
                    if (Array.isArray(value)) {
                        // console.log(value);
                        value.forEach((rElement) => {
                            render(rElement, curDom);
                        });
                    } else {
                        render(value, curDom);
                    }
                } else if (key.startsWith('on')) {
                    curDom.addEventListener(
                        getEventActionFromProps(key),
                        value
                    );
                } else if (key === 'Document') {
                    console.log("We have found document")
                }
                
                else {
                    curDom[key] = value;
                }
            }
        );
    }

    domElement.appendChild(curDom);
};


//utils

function getEventActionFromProps(propsKey) {
    return propsKey.slice(2).toLowerCase();
}

const MyReactDOM = {
    render: render
}


export default MyReactDOM