import { useState, React } from 'react';
import { FormGroup, FormControlLabel, Switch } from '@material-ui/core';

export default function BarLayout(props) {
  const [value, setValue] = useState('horizontal');
  const [state, setState] = useState({
    checked: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    state.checked !== true ? setValue('horizontal') : setValue('vertical');
    props.getLayout(value);
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
          label="Layout"
        />
      </FormGroup>
    </>
  );
}
