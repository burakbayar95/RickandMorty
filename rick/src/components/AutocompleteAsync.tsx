import React, { useState, useEffect, createContext  } from 'react';
import axios from 'axios';
import { CircularProgress, Box, Paper, Checkbox, TextField, Chip, Autocomplete,Alert } from '@mui/material';
import {Close} from '@mui/icons-material';
import logo from '../image/logo.png';

interface ICharacter {
  id: string;
  name: string;
  image: string;
  episode: number[];
}

const AutocompleteAsync = () => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<ICharacter[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<ICharacter[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (inputValue === '') {
      setOptions([]);
      return;
    }
    
    setLoading(true);
    setError(false);
    setErrorMessage('');
    axios.get(`https://rickandmortyapi.com/api/character/?name=${inputValue}`)
      .then(response => {
        setOptions(response.data.results);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setError(true);
        setErrorMessage('No Data Found');
        console.error(err.message);
      });
  }, [inputValue]);

  const highlightText = (text: string, part: string) => {
    const parts = text.split(new RegExp(`(${part})`, 'gi')); // g global i büyük küçük harf duyarlılığı
    return parts.map((part, i) =>
      part.toLowerCase() === inputValue.toLowerCase() ? <strong key={i}>{part}</strong> : part
    );
  };
  const CustomPaper = (props) => (
    <Paper {...props} style={{border: '1px solid #94A3B8', borderRadius: 5, backgroundColor: 'white', boxShadow: 'none' }} />
  );

  return (
    <>
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh">
      <Box mb={2}>
        <img src={logo} alt="Rick and Morty" style={{ width: 200 }} />
      </Box>
   
      <Box width="100%" maxWidth={500} p={3} bgcolor="background.paper" borderRadius={2} boxShadow={3}>
        <Autocomplete
          multiple
          disableCloseOnSelect={true}
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
            setError(false)
            if (selectedOptions.length == 0) {
              setInputValue('')
            }
          }}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.name}
          options={options}
          loading={loading}
          value={selectedOptions}
          PaperComponent={CustomPaper} 
          onChange={(event, newValue) => {
            setSelectedOptions(newValue);
          }}
          renderInput={(params) => (
            <TextField
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '16px' // Tüm kenarlar için 16px yuvarlaklık
              }}}
              {...params}
              label="Search Characters"
              variant="outlined"
              onChange={(event) => setInputValue(event.target.value)}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                style={{ backgroundColor: '#E2E8F0', borderRadius: '4px'}}
                deleteIcon={<Close fontSize='small'  style={{ color: 'white', backgroundColor: '#95A3B8', borderRadius: '4px' }} />}
                {...getTagProps({ index })}
                key={option.id}
                label={option.name}
                onDelete={() => {
                  setSelectedOptions(value.filter((entry) => entry.id !== option.id));
                  if (selectedOptions.length == 0) {
                    setInputValue('')
                  }
                }}
              />
            ))
          }
          renderOption={(props, option, { selected }) => (
            <li {...props} style={{borderBottom:"solid 1px #94A3B8", boxShadow:"none"}}>
              <Checkbox
                style={{ marginRight: 8 }}
                checked={selected}
              />
              <img src={option.image} alt={option.name} style={{ marginRight: 10, width: 50, height: 50 , borderRadius:8}} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span>{highlightText(option.name, inputValue)}</span>
                <span>Episodes: {option.episode.length}</span>
              </div>
            </li>
          )}
        />
      </Box>
      <Box position="absolute" top={0} width="100%">
          {error && (
            <Alert severity="error" style={{ margin: 3 }}>
              {errorMessage}
            </Alert>
          )}
        </Box>
      
    </Box>
        </>
  );
};

export default AutocompleteAsync;
