
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CallIcon from '@material-ui/icons/Call';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography"
import PrintIcon from '@material-ui/icons/Print';
import "./NearbyShopCard.css";
import { IconButton } from '@material-ui/core';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import {Link} from 'react-router-dom'
const styles = muiBaseTheme => ({
  card: {
     width : 280,
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
  media: {
    paddingTop: "56.25%"
  },
  content: {
    textAlign: "left",
    padding: muiBaseTheme.spacing(3)
  },
  divider: {
    margin: `${muiBaseTheme.spacing(0)}px 0`
  },
  heading: {
    fontWeight: "bold"
  },
  subheading: {
    lineHeight: 1.8
  },
  avatar: {
    display: "inline-block",
    border: "2px solid white",
    "&:not(:first-of-type)": {
      marginLeft: -muiBaseTheme.spacing()
    }
  }
});

class NearbyShopCard extends React.Component{
  
  constructor(props){
    super(props)
    this.state={
      marked:false
    }
  }

  render(){
    const toggleMark=(index)=>{
      
        this.setState({marked:!this.state.marked})
        if(!this.state.marked)
        {
            console.log('Bookmarked shop: '+index)
        }
        else{
          console.log('Bookmark removed');
        }
    }

   const {classes,handleShopId} = this.props;
   const handleChange=()=>{
     handleShopId(this.props.shopinfo)
   }
    return (
     
      <div className="App">
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={ this.props.shopinfo.img }
          />
          <CardContent className={classes.content}>
            <Typography
              className={"MuiTypography--heading"}
              variant={"h6"}
              gutterBottom
            >
              {this.props.shopinfo.shopname}
            </Typography>
            <Typography
              className={"MuiTypography--subheading"}
              variant={"caption"}
            >
             {this.props.shopinfo.address}
            </Typography>
            <Divider className={classes.divider} light />
                <IconButton onClick={()=>{toggleMark(this.props.shopinfo.id)}}>
                 {this.state.marked?<TurnedInIcon />:<TurnedInNotIcon />}
                </IconButton>
                <IconButton>
                  <LocationOnIcon/>
                </IconButton>
                <a href={`tel:${this.props.shopinfo.phoneno}`} style={{textDecoration:'none',color:'grey',position:'relative' ,margin:5,top:9}}>
                  <CallIcon />
                </a>
                <IconButton onClick={handleChange} component={Link} to={`/shop/${this.props.shopinfo.id}`}>
                  <PrintIcon />
                </IconButton>
          </CardContent>
        </Card>
      </div>
    );
  }
  
}

export default withStyles(styles)(NearbyShopCard);