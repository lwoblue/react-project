import { useState, React } from 'react';
import {
  makeStyles,
  FormGroup,
  FormControlLabel,
  Switch,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  maginsTB: {
    marginTop: '20px',
    marginBottom: '20px',
  },
}));

export default function BarAxisEnable(props) {
  const classes = useStyles();
  const [value, setValue] = useState(true);
  const [state, setState] = useState({
    checked: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    state.checked !== false ? setValue(true) : setValue(false);
    props.getAxisEnable(value);
  };

  return (
    <>
      <FormGroup row className={classes.maginsTB}>
        <FormControlLabel
          control={
            <Switch
              checked={state.checked}
              onChange={handleChange}
              name="checked"
              color="primary"
            />
          }
          label="Enable"
        />
      </FormGroup>
    </>
  );
}
