import firebase from'firebase/app'
export const bookmarkShop=(payload)=>{
    return (dispatch,getState,{getFirebase,getFirestore})=>{
        const firestore= getFirebase().firestore();
        firestore.collection('users').doc(payload.uid).update({
            bookmarkedShops: firebase.firestore.FieldValue.arrayUnion(payload.shopId)
        }).then(()=>{
            dispatch({type:'ADD_BOOKMARK',payload})
        }).catch((err)=>{
            dispatch({type:'ADD_BOOKMARK',err})
        })

    }
}
export const removeBookmark=(payload)=>{
    return (dispatch,getState,{getFirebase,getFirestore})=>{
        const firestore= getFirebase().firestore();
        firestore.collection('users').doc(payload.uid).update({
            bookmarkedShops: firebase.firestore.FieldValue.arrayRemove(payload.shopId)
        }).then(()=>{
            dispatch({type:'REMOVE_BOOKMARK',payload})
        }).catch((err)=>{
            dispatch({type:'REMOVE_BOOKMARK',err})
        })

    }
}