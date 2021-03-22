/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import { Link as RouterLink } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';

export function breadcrumbNameMap(to) {
  // const candidate = { '/bar': 'Bar', '/line': 'Line', '/pie': 'Pie' };
  const candidate = { '/line': 'Line', '/bar': 'Bar', '/chat': 'talk' };
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
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(1),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const NavContents = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);

  const handleClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClick1 = () => {
    setOpen1((prevOpen) => !prevOpen);
  };

  return (
    <>
      <nav className={classes.lists} aria-label="mailbox folders">
        <List>
          <ListItem button open={open} onClick={handleClick}>
            <ListItemIcon>
              <EqualizerIcon />
            </ListItemIcon>
            <ListItemText primary="chart" />
          </ListItem>

          <Collapse component="li" in={open} timeout="auto" unmountOnExit>
            <List disablePadding>
              <ListItemLink to="/line" className={classes.nested} />
            </List>
          </Collapse>

          <Collapse component="li" in={open} timeout="auto" unmountOnExit>
            <List disablePadding>
              <ListItemLink to="/bar" className={classes.nested} />
            </List>
          </Collapse>

          <ListItem button open={open1} onClick={handleClick1}>
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
          </Collapse>
        </List>
        <Divider />
      </nav>
    </>
  );
};

export default NavContents;
