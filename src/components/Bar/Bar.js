import React, { Component } from "react";

import clsx from 'clsx';
import { withStyles,createStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsIcon from '@material-ui/icons/Settings';
import InfoIcon from '@material-ui/icons/Info';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PropTypes from "prop-types";
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { createBrowserHistory } from 'history';


import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  ButtonGroup,
  Button,
  IconButton,
  Divider,
} from "@material-ui/core";

import UserAvatar from "../UserAvatar";
const useStyles = (theme) => createStyles({

  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
})
const history = createBrowserHistory();
class Bar extends Component {
  constructor(props) {
    super(props);
    this.state={
      right:false
    }
  }

  render() {
    // // Properties
    const { performingAction, user, userData, roles, onProfileOpen } = this.props;
    const {classes} = this.props
    const toggleDrawer = (anchor, open) => (event) => {
      if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      this.setState({ ...this.state, [anchor]: open });
    };
    // Events
    const {
      onAboutClick,
      onSettingsClick,
      onSignOutClick,
      onSignUpClick,
      onSignInClick,
      onNearbyShopsClick
    } = this.props;
    const {searchfield} =this.props;
    const drawerItems = [
      {
        name: "About",
        onClick: onAboutClick,
        icon: <InfoIcon/>
      },
      {
        name: "Profile",
        to: user ? `/user/${user.uid}` : null,
        onClick:onNearbyShopsClick,
        icon: <AccountBoxIcon/>
      },
      {
        name: "Settings",
        onClick: onSettingsClick,
        icon: <SettingsIcon/>
      },
      {
        name: "Sign out",
        divide: true,
        onClick: onSignOutClick,
        icon: <ExitToAppIcon/>
      }
    ];
    const list = (anchor) => (
      <div
        className={clsx( classes.list, {
          [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        })}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          {drawerItems.map((item, index) => {
            let component=null;
            if(item.to){
              component=(
                <ListItem button key={index} onClick={item.onClick} component={Link} to={item.to} >
                <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              );
            }
            else{
              component=(
                <ListItem button key={index} onClick={()=>{item.onClick()}} >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
                </ListItem>
              )
            }
            if (item.divide) {
              return (
                <span key={index}>
                  <Divider />

                  {component}
                </span>
              );
            }

            return component;
            
          }
  )}
        </List>
      </div>
    );
    // const { menu } = this.state;

    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const onBackClick=()=>{
      onProfileOpen(1);
      history.goBack()
    }
    return (
      <AppBar color="primary" position="static">
        <Toolbar>
          {this.props.backButton?<Box display="flex" flexGrow={1} m={1}>
            <IconButton  onClick={onBackClick} ><ArrowBackIcon /></IconButton>
            </Box>
            :
          <Box display="flex" flexGrow={1} m={1}>
            <Typography color="inherit" variant="h6">
              {process.env.REACT_APP_TITLE}
            </Typography>
          </Box>
          }
          {searchfield && <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>}
          {user && (
            <>
              {roles.includes("admin") && (
                <Box mr={1}>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/admin"
                    variant="outlined"
                  >
                    Admin
                  </Button>
                </Box>
              )}
            
              <IconButton
                color="inherit"
                disabled={performingAction}
                onClick={toggleDrawer('right',true)}
              >
                <UserAvatar user={Object.assign(user, userData)} />
              </IconButton>

            <React.Fragment key={'right'}>
              <SwipeableDrawer
              disableBackdropTransition={!iOS} 
              disableDiscovery={iOS}
              anchor={'right'}
              open={this.state['right']}
              onClose={toggleDrawer('right', false)}
              onOpen={toggleDrawer('right', true)}
              >
                {list('right')}
              </SwipeableDrawer>
              </React.Fragment>
            </>
          )}

          {!user && (
            <ButtonGroup
              color="inherit"
              disabled={performingAction}
              variant="outlined"
            >
              <Button onClick={onSignUpClick}>Sign up</Button>
              <Button onClick={onSignInClick}>Sign in</Button>
            </ButtonGroup>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

Bar.defaultProps = {
  performingAction: false
};

Bar.propTypes = {
  // Properties
  performingAction: PropTypes.bool.isRequired,
  user: PropTypes.object,
  userData: PropTypes.object,
  // Events
  onAboutClick: PropTypes.func.isRequired,
  onSettingsClick: PropTypes.func.isRequired,
  onSignOutClick: PropTypes.func.isRequired
};

export default withStyles(useStyles)(Bar);
