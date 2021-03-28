/* eslint-disable no-nested-ternary */
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  makeStyles,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import EqualizerIcon from '@material-ui/icons/Equalizer';

export function breadcrumbNameMap(to) {
  // const candidate = { '/bar': 'Bar', '/line': 'Line', '/pie': 'Pie' };
  const candidate = {
    '/home': 'Home',
    '/chat': 'Chat',
    '/users': 'UserList',
    '/gallery': 'Gallery',
    '/profile': 'Profile',
  };
  return candidate[to];
}

function ListItemLink(props) {
  const { to, open, ...other } = props;
  const primary = breadcrumbNameMap(to);

  return (
    <li>
      <ListItem button component={RouterLink} to={to} {...other}>
        <ListItemIcon>
          <EqualizerIcon />
        </ListItemIcon>
        <ListItemText primary={primary} />
        {open != null ? open ? <ExpandLess /> : <ExpandMore /> : null}
      </ListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  open: PropTypes.bool,
  to: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
  lists: {
    backgroundColor: '#e9e5c2',
    // backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(1),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const NavContents = () => {
  const classes = useStyles();
  // 트리 형식
  // const [open, setOpen] = React.useState(true);

  // const handleClick = () => {
  //   setOpen(!open);
  // };

  return (
    <>
      <nav className={classes.lists} aria-label="mailbox folders">
        <List>
          <ListItemLink to="/home" title={'home'} />
          <ListItemLink to="/chat" title={'chat'} />
          <ListItemLink to="/users" title={'users'} />
          <ListItemLink to="/gallery" title={'gallery'} />
          <ListItemLink to="/profile" title={'profile'} />

          {/* 트리 형식 */}
          {/* <ListItem button open={open1} onClick={handleClick1}>
            <ListItemIcon>
              <EqualizerIcon />
            </ListItemIcon>
            <ListItemText primary="chat" />
          </ListItem>
          <Collapse component="li" in={open1} timeout="auto" unmountOnExit>
            <List disablePadding>
              <ListItemLink
                to="/chat"
                className={classes.nested}
                title={'solomonts'}
                id={'DVWjjfbmPMGni08saFJA'}
              />
            </List>
          </Collapse> */}
        </List>
      </nav>
    </>
  );
};

export default NavContents;
