// this file is only to shwo the how to create components
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

export function BedroomSelect({bedroom,handleChange}) { 
    return (
      <Box sx={{ minWidth: 120 ,m:1}}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">bedroom</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={bedroom}
            label="bedroomSelect"
            onChange={(e)=>handleChange(e)}
          >
            <MenuItem value={0}>any</MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>4+</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
}

export function BathroomSelect({bathroom,handleChange}) { 
    return (
      <Box sx={{ minWidth: 120 ,m:1}}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">bathroom</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={bathroom}
            label="bathroomSelect"
            onChange={(e)=>handleChange(e)}
          >
            <MenuItem value={0}>any</MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>4+</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
}

export function SetCostBounds({handleSetLB,handleSetUB}) {
    return (
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="Cost Lowerbound" variant="outlined" onChange={(event) => handleSetLB(event)}/>
        <TextField id="outlined-basic" label="Cost Upperbound" variant="outlined" onChange={(event) => handleSetUB(event)}/>
      </Box>
    );
  }