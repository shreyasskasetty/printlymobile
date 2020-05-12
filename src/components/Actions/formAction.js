
export const submitForm=(payload)=>{
    
    return (dispatch,getState,{getFirebase,getFirestore})=>{
        
        const firestore= getFirebase().firestore();
        firestore.collection('shops').doc(payload.shopId).collection('forms').add(payload).then((docRef)=>{
           
           firestore.collection('users').doc(payload.uid).collection('orders').doc(docRef.id).set(payload).then(()=>{
            dispatch({type:'SAVE_ORDER',payload})
        }).catch((err)=>{
            dispatch({type:'SAVE_ORDER',err})
        })
            dispatch({type:'SUBMIT_FORM',payload})
        }).catch((err)=>{
            dispatch({type:'SUBMIT_FORM',err})
        })
        
        

    }
}
export const unsetSubmittedFlag=()=>{
    return {type:'UNSET_FLAG'}
}