const initialState={
    bookmarkedShops:[],
}


export function bookmarkReducer(state=initialState,action){

        switch(action.type){
            case 'ADD_BOOKMARK':
                console.log('Bookmarked: '+action.payload.shopId);
                return state;
                
            case 'REMOVE_BOOKMARK':
                    console.log('Removed Bookmark: '+action.payload.shopId)
                return state;
                default: return state;
        }

}