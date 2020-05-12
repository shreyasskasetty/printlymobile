const initialState={
    backButton:false,
    bottomBar:true
}

export function componentStateReducer(state=initialState,action){
    switch(action.type){
        case 'RENDER_BOTTOM_BAR':
                                return {...state,bottomBar:true}
        case 'REMOVE_BOTTOM_BAR':
                                return {...state,bottomBar:false}
        case 'RENDER_BACK_BUTTON':
                                return {...state,backButton:true}
        case 'REMOVE_BACK_BUTTON':
                                 return {...state,backButton:false}
        default:return state;
    }
}