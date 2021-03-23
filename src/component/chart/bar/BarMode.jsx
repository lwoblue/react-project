import { useState, React } from 'react';
import { FormGroup, FormControlLabel, Switch } from '@material-ui/core';

export default function BarMode(props) {
  const [value, setValue] = useState('grouped');
  const [state, setState] = useState({
    checked: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    state.checked !== true ? setValue('grouped') : setValue('stacked');
    props.getGroupMode(value);
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
          label="GroupMode"
        />
      </FormGroup>
    </>
  );
}
