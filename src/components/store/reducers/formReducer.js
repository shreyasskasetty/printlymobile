
export function formReducer(state={},action){
    switch(action.type){
       case 'SUBMIT_FORM':
           if(!action.err)
           console.log('Submitted Successfully')
           return {...state,    
                submitted:true
            }
       case 'SAVE_ORDER':
           if(!action.err)
           console.log('Order Details Saved')
           return state
        case 'UNSET_FLAG':
            console.log('FLag set to false')
            return {...state,
            submitted:false
            }
        default:
            return state;
    }
}