import React, { Component } from 'react'
import NearbyShopCard from './NearbyShopCard.js'
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
export class Page1 extends Component {


    constructor(props){
        super(props);
}
    componentDidMount(){
        const {onPage1Load} = this.props;
        onPage1Load(0);
    }
    render() {
        const messages = [
            {
              id: 1,
              shopname: 'Brunch this week?',
              address: "I'll be in the neighbourhood this week. Let's grab a bite to eat",
              img: "https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg",
            },
            {
              id: 2,
              shopname: 'Brunch this week?',
              address: "I'll be in the neighbourhood this week. Let's grab a bite to eat",
              img: "https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg",
            },
            
          ];

        const classes = this.props.classes;
        return (
            
            <Paper square className={classes.paper}>
            <Box display="flex" justifyContent="center" flexDirection="row" flexWrap="wrap">
            {
                messages.map(({id, shopname, address, img}) => (
                  <Box key={id} m={2}>
                  <NearbyShopCard shopinfo={{id,shopname,address,img}}/>
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
export default Page1
