import { useState, React } from 'react';
import { FormGroup, FormControlLabel, Switch } from '@material-ui/core';

export default function BarAxisEnable(props) {
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
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              checked={state.checked}
              onChange={handleChange}
              name="checked"
              color="primary"
            />
          }
          label="EnableGridX"
        />
      </FormGroup>
    </>
  );
}
