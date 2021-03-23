import { useState, React } from 'react';
import { FormGroup, FormControlLabel, Switch } from '@material-ui/core';

export default function BarReverse(props) {
  const [value, setValue] = useState(true);
  const [state, setState] = useState({
    checked: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    state.checked !== true ? setValue(true) : setValue(false);
    props.getReverse(value);
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
          label="Reverse"
        />
      </FormGroup>
    </>
  );
}
