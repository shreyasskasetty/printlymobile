import React,{useEffect} from 'react';
import { createStyles,  makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import HistoryIcon from '@material-ui/icons/History';
import NearbyShopCard from './NearbyShopCard.js'


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
  {
    id: 3,
    shopname: 'Brunch this week?',
    address: "I'll be in the neighbourhood this week. Let's grab a bite to eat",
    img: "https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg",
  },
  {
    id: 4,
    shopname: 'Brunch this week?',
    address: "I'll be in the neighbourhood this week. Let's grab a bite to eat",
    img: "https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg",
  },
  {
    id: 5,
    shopname: 'Brunch this week?',
    address: "I'll be in the neighbourhood this week. Let's grab a bite to eat",
    img: "https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg",
  },
  {
    id: 6,
    shopname: 'Brunch this week?',
    address: "I'll be in the neighbourhood this week. Let's grab a bite to eat",
    img: "https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg",
  },
  
];



const useStyles = makeStyles((theme) =>
  createStyles({
    text: {
      textAlign:"center",
      padding: theme.spacing(2, 2, 0),
    },
    paper: {
      paddingBottom: 50,
    },
    list: {
    flexWrap: 'wrap',
    },
    subheader: {
      backgroundColor: theme.palette.background.paper,
    },
    appBar: {
      top: 'auto',
      marginTop:2,
      bottom:0,
    },
    grow: {
      flexGrow: 1,
    },
    fabButton: {
      position: 'absolute',
      zIndex: 1,
      top: -30,
      left: 0,
      right: 0,
      margin: '0 auto',
    },
  }),
);

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`nav-tabpanel-${index}`}
        aria-labelledby={`nav-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `nav-tab-${index}`,
      'aria-controls': `nav-tabpanel-${index}`,
    };
  }

  
export default function BottomAppBar(props) {
  const classes = useStyles();
  const {fieldsearch,onNearbyShopsClick} = props;
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
   onNearbyShopsClick(value)
  },[fieldsearch]);


  return (
    
    <React.Fragment>
        <TabPanel value={value} index={0} >
        <Paper square className={classes.paper}>
       
        {/* <Typography className={classes.text} variant="h5" gutterBottom>
          Nearby Shops
        </Typography> */}
        <Box display="flex" justifyContent="center" flexDirection="row" flexWrap="wrap">
        {
            messages.map(({id, shopname, address, img}) => (
              <Box key={id} m={2}>
              <NearbyShopCard shopinfo={{id,shopname,address,img}}/>
              </Box>
             
          ))}
        </Box> 
        </Paper>
        
        </TabPanel>
        <TabPanel value={value} index={1}>
            Page Two
        </TabPanel>
        <TabPanel value={value} index={2}>
              Profile
        </TabPanel>
        <TabPanel value={value} index={3}>
        <Paper square className={classes.paper}>
        <Typography className={classes.text} variant="h5" gutterBottom>
          Inbox
        </Typography>
      </Paper>
        </TabPanel>
      <CssBaseline />
      
      <AppBar  position="fixed" color="primary" className={classes.appBar}>
      <Tabs
        variant="fullWidth"
          value={value}
          onChange={handleChange}
        >
            <Tab  icon={<LocationOnIcon />} onClick={()=>{onNearbyShopsClick(0)}} aria-label="phone" {...a11yProps(0)} />
          <Tab  icon={<FavoriteIcon />} onClick={()=>{onNearbyShopsClick(1)}} aria-label="favorite" {...a11yProps(1)} />
          <Tab icon={<PersonPinIcon />} onClick={()=>{onNearbyShopsClick(2)}} aria-label="person" {...a11yProps(2)} />
          <Tab icon={<HistoryIcon />} onClick={()=>{onNearbyShopsClick(3)}} aria-label="help" {...a11yProps(3)} />
          <Tab icon={<QueryBuilderIcon />} onClick={()=>{onNearbyShopsClick(4)}} aria-label="shopping" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
    </React.Fragment>
  );
}