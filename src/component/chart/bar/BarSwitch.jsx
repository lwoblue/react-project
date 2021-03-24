import { useState, React } from 'react';
import { FormGroup, FormControlLabel, Switch } from '@material-ui/core';

export default function BarSwitch(props) {
  const [value, setValue] = useState(props.info().default);
  const [state, setState] = useState({
    checked: true,
  });

  let name = props.info().name;
  let valueTrue = props.info().valueTrue;
  let valueFalse = props.info().valueFalse;

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    state.checked !== true ? setValue(valueTrue) : setValue(valueFalse);
    props.state(value, name);
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
          label={name}
        />
      </FormGroup>
    </>
  );
}
