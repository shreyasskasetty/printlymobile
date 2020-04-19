import React, { Component } from 'react'
import NearbyShopCard from './NearbyShopCard.js'
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import LaunchScreen from '../LaunchScreen'
import {firestoreConnect,isLoaded} from 'react-redux-firebase'
import {compose} from 'redux'
import {connect} from 'react-redux'
export class Page1 extends Component {
    componentDidMount(){
        const {onPage1Load} = this.props;
        onPage1Load(0);
    }
    render() {
      const{ shops,handleShopId} = this.props;
        const classes = this.props.classes;
        if(!isLoaded)
        {
          return <LaunchScreen />
        }
        return (
            
            <Paper square className={classes.paper}>
            <Box display="flex" justifyContent="center" flexDirection="row" flexWrap="wrap">
            {
                shops.map(({id, shopname, address, img, phoneno}) => (
                  <Box key={id} m={2}>
                  <NearbyShopCard shopinfo={{id,shopname,address,img,phoneno}} handleShopId={handleShopId}/>
                  </Box>
                 
              ))}
            </Box> 
            </Paper>
        )
       
    }


    componentWillUnmount(){
        const {onPage1Load} = this.props;
        onPage1Load(1);
    }

    
}
const mapStatesToProps = (state)=> {
  return {
    shops: state.firestore.ordered.shops?state.firestore.ordered.shops:[]
  }
}
export default compose(
  connect(mapStatesToProps),
  firestoreConnect([{collection:'shops'}]),
  
)(Page1)
