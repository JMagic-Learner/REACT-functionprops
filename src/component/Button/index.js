import React from 'react'

function Button (props) {
    
    return(<button> {props.innerHTML}</button>
    )
    // return(<button>This is the dirty METHOD</button>)
}

// Shadow Copy, shadow copy the on-click-function.
// The on-click function 

export default Button

// function Button (children,...rest) {
    
//     return(<button {...rest}>, {children}</button>
//     )
//     // return(<button>This is the dirty METHOD</button>)
// }

// // Shadow Copy, shadow copy the on-click-function.
// // The on-click function 

// export default Button