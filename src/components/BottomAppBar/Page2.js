import React, { Component } from 'react'
import NearbyShopCard from './NearbyShopCard.js'
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import {compose} from 'redux'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
export class Page2 extends Component {
   constructor(props){
     super(props)
     this.state={
       bookmarkedShops:[]
     }
    }
   componentDidMount(){
    const  {users,user}=this.props;
    var bookmarkedShops=[]
    console.log(users)
    users.forEach(element=>{
     if(element.id === user.uid){
       bookmarkedShops= element.bookmarkedShops
     }
    })
      this.setState({bookmarkedShops:bookmarkedShops})
     
   }
    render() {
      const {classes,shops,handleShopId,user} = this.props;
        return (
            
            <Paper square className={classes.paper}>
            <Box display="flex" justifyContent="center" flexDirection="row" flexWrap="wrap">
            {
                
                shops.map(({id, shopname, address, img, phoneno}) => (
                    this.state.bookmarkedShops.includes(id)?
                  <Box key={id} m={2}>
                  <NearbyShopCard shopinfo={{id,shopname,address,img,phoneno}} user={user} index={this.props.index} handleShopId={handleShopId}/>
                  </Box>:null
                 
              ))}
            </Box> 
            </Paper>
        )
       
    }
    
}
const mapStatesToProps = (state)=> {
    return {
   shops: state.firestore.ordered.shops?state.firestore.ordered.shops:[],
   users:state.firestore.ordered.users?state.firestore.ordered.users:[]
  }
}
  export default compose(
    connect(mapStatesToProps),
    firestoreConnect([{collection:'users'},{collection:'shops'}]), 
  )(Page2)
