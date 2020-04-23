import React, { useState, Fragment } from 'react';
import clsx from 'clsx';
import { Router, Route, Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import HomeIcon from '@material-ui/icons/Home';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import TimelineOutlinedIcon from '@material-ui/icons/TimelineOutlined';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Home from "../../pages//home";
import Options from "../../pages/optionChain";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Divider from '@material-ui/core/Divider';
import MailIcon from '@material-ui/icons/Mail';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import stylesSheets from './navbar.module.css';
import Graphs from '../../pages/graphs';


const drawerWidth = 400;
const history = createBrowserHistory();

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  toolbarMargin: theme.mixins.toolbar,
  aboveDrawer: {
    zIndex: theme.zIndex.drawer + 1
  }
});

const MyToolbar = withStyles(styles)(
  ({ classes, title, onMenuClick }) => (
    <Fragment>
      <AppBar className={classes.aboveDrawer} id={stylesSheets.AppBar} >
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={onMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            className={classes.flex}
          >
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin} />
    </Fragment>
  )
);

const MyDrawer = withStyles(styles)(
  ({ classes, variant, open, onClose, onItemClick }) => (
    <Router history={history}>
    <Drawer variant={variant} open={open} onClose={onClose}
                classes={{
                  paper: classes.drawerPaper
                }}
    >
      <div
        className={clsx({
          [classes.toolbarMargin]: variant === 'persistent'
        })}
      />
       <div className={classes.drawerHeader} id={styles.drawerHeader}>
          <IconButton  id={stylesSheets.backIcon}>
            <ChevronLeftIcon  onClick={onClose}/>
          </IconButton>
        </div>
      <Divider />
      <List id={stylesSheets.drawer}>
        <ListItem button component={Link} to="/" onClick={onItemClick('Dashboard')}>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary={'Dashboard'} />
        </ListItem>
        <ListItem button component={Link} to="/options" onClick={onItemClick('Option Chain Analysis')}>
        <ListItemIcon><TimelineOutlinedIcon /></ListItemIcon>
        <ListItemText primary={'Option Chain Analysis'} />
        </ListItem>
        <ListItem button component={Link} to="/graphs" onClick={onItemClick('History Graphs Analysis')}>
        <ListItemIcon><TimelineOutlinedIcon /></ListItemIcon>
        <ListItemText primary={'History Graphs Analysis'} />
        </ListItem>
      </List>
      <Divider />
        <List id={stylesSheets.drawer}>
          {['Future use', 'Future use', 'Future use'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
    </Drawer>
    <main className={classes.content}>
        <Route exact path="/" component={Home} />
        <Route path="/options" component={Options} />
        <Route path="/graphs" component={Graphs} />
    </main>
    </Router>
  )
);

function AppBarInteraction({ classes, variant }) {
  const [drawer, setDrawer] = useState(false);
  const [title, setTitle] = useState('Live Trading Dashboard');

  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

 
  const onItemClick = title => () => {
    setTitle(title);
    setDrawer(variant === 'temporary' ? false : drawer);
    setDrawer(!drawer);
  };

  return (
    <div className={classes.root}>
      <MyToolbar title={title} onMenuClick={toggleDrawer} />
      <MyDrawer
        open={drawer}
        onClose={toggleDrawer}
        onItemClick={onItemClick}
        variant={variant}
      />
    </div>
  );
}

export default withStyles(styles)(AppBarInteraction);