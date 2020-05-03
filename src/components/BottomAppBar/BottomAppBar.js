import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import Paper from '@material-ui/core/Paper';
import HistoryIcon from '@material-ui/icons/History';
import Page1 from './Page1'
import Page2 from './Page2'
import Page4 from './Page4'
import {Route,Switch,Link} from 'react-router-dom'
import { withStyles } from '@material-ui/styles';
import {  BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import {connect} from 'react-redux'
import {compose} from 'redux'
import PrintForm from "../PrintForm";
import readingTime from "reading-time";
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Tariff from '../Tariff/Tariff'

const useStyles = theme=>({
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
  })

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

  
  class BottomAppBar extends React.Component {

    constructor(props){
      super(props);
      this.state={
        value:0,
        shopId:'',
        snackbarSuccess: {
          autoHideDuration: 0,
          message: "",
          open: false
        },
      snackbarError: {
          autoHideDuration: 0,
          message: "",
          open: false
        }
      }
     
    }
    openSnackbarSuccess = (message, autoHideDuration = 2, callback) => {
      this.setState(
        {
          snackbarSuccess: {
            autoHideDuration: readingTime(message).time * autoHideDuration,
            message,
            open: true
          }
        },
        () => {
          if (callback && typeof callback === "function") {
            callback();
          }
        }
      );
    };

    openSnackbarError = (message, autoHideDuration = 2, callback) => {
      this.setState(
        {
          snackbarError: {
            autoHideDuration: readingTime(message).time * autoHideDuration,
            message,
            open: true
          }
        },
        () => {
          if (callback && typeof callback === "function") {
            callback();
          }
        }
      );
    };
    
    closeSnackbar = (clearMessage = false) => {
      const { snackbarSuccess,snackbarError } = this.state;
      if(snackbarSuccess.open)
      this.setState({
        snackbarSuccess: {
          message: clearMessage ? "" : snackbarSuccess.message,
          open: false
        }
      });
      if(snackbarError)
      this.setState({
          snackbarError: {
            message: clearMessage ? "" : snackbarError.message,
            open: false
          }
        });

    };
    render(){
      function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
      }
      const {classes,
        user,
      } = this.props;
      const {
        snackbarSuccess,
        snackbarError
      }=this.state
      const handleChange = (event, newValue) => {
        this.setState({value:newValue})
      };
      const handleShopId = (shopId)=>{
        this.setState({shopId:shopId})
      }
      return (
       <BrowserRouter basename={process.env.PUBLIC_URL+'/'}>
         <Switch>
         <React.Fragment>
           <Route exact path="/">
           <TabPanel value={this.state.value} index={0} >
            <Page1 classes ={classes} 
              user={user} 
             handleShopId={handleShopId}/>
            </TabPanel>
           </Route>
          
            <Route exact path="/favourite">
            <TabPanel value={this.state.value} index={1}>
              <Page2 classes ={classes} handleShopId={handleShopId} user={user} index={this.state.value}/>
            </TabPanel>
            </Route>
            <Route exact path="/page3">
            <TabPanel value={this.state.value} index={2}>
             <Tariff />
            </TabPanel>
            </Route>  
            
            <Route exact path="/orderhistory">
            <TabPanel value={this.state.value} index={3}>
            <Paper square className={classes.paper}>
              <Typography className={classes.text} variant="h5" gutterBottom>
                 <Page4 />
            </Typography>
              </Paper>
            </TabPanel>
            </Route>  
            <Route exact path="/orderstatus">
            <TabPanel value={this.state.value} index={4}>

            </TabPanel>
            </Route>  
            <Route path="/shop/:shopId">
              <PrintForm  shopId={this.state.shopId}openSnackbarError={this.openSnackbarError} 
                openSnackbarSuccess={this.openSnackbarSuccess} user={user} />
            </Route>
          <CssBaseline />
          
          {this.props.barVisibility && <AppBar  position="fixed" color="primary" className={classes.appBar}>
          <Tabs
            variant="fullWidth"
              value={this.state.value}
              onChange={handleChange}
            >
              <Tab  icon={<LocationOnIcon />}  component={Link} to="/" aria-label="phone" {...a11yProps(0)} />
              <Tab  icon={<FavoriteIcon />} component={Link} to="/favourite" aria-label="favorite" {...a11yProps(1)} />
              <Tab icon={<PersonPinIcon />} component={Link} to="/page3" aria-label="person" {...a11yProps(2)} />
              <Tab icon={<HistoryIcon />} component={Link} to="/orderhistory"aria-label="help" {...a11yProps(3)} />
              <Tab icon={<QueryBuilderIcon />} component={Link} to="/orderstatus" aria-label="shopping" {...a11yProps(4)} />
            </Tabs>
          </AppBar>
    }
        </React.Fragment>
         </Switch>
         <Snackbar
            autoHideDuration={snackbarSuccess.autoHideDuration}
            message={snackbarSuccess.message}
            open={snackbarSuccess.open}
            onClose={this.closeSnackbar}
            >
                <Alert onClose={this.closeSnackbar} severity="success">
                    {snackbarSuccess.message}
                </Alert>
        </Snackbar> 
        <Snackbar
                        autoHideDuration={snackbarError.autoHideDuration}
                        message={snackbarError.message}
                        open={snackbarError.open}
                        onClose={this.closeSnackbar}
                        >
                            <Alert onClose={this.closeSnackbar} severity="error">
                                 {snackbarError.message}
                            </Alert>
                    </Snackbar> 
        </BrowserRouter>
      );
    }
  

}
const mapStateToProps=(state)=>{
  return {
    barVisibility: state.componentState.bottomBar
  }
}
export default compose(
  connect(mapStateToProps),
  withStyles(useStyles)
)(BottomAppBar);