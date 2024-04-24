import { Autocomplete, styled } from "@mui/material";
import React from 'react';
import { TextValidator } from "react-material-ui-form-validator";

const options = ['Option 1', 'Option 2']

export default function AutocompleteLab() {
  const [value, setValue] = React.useState(options[0])
  const [inputValue, setInputValue] = React.useState('')
  const TextField = styled(TextValidator)(() => ({ width: "100%", marginBottom: "16px", }));
  return (
    <div>
      <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
      <div>{`inputValue: '${inputValue}'`}</div>
      <br />
      <Autocomplete
        value={value}
        onChange={(_, newValue) => {
          setValue(newValue)
        }}
        inputValue={inputValue}
        onInputChange={(_, newInputValue) => {
          setInputValue(newInputValue)
        }}
        options={options}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Name" variant="outlined" />}
      />
    </div>
  )
}
