import React, { useState, useEffect } from "react";

import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

import { airVisualAPI, airVisualAPIkey } from "../config/apiEndpoints";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  select: {
    textAlign: "left",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SearchBox = ({ onSearch, onLoading }) => {
  const classes = useStyles();

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      onLoading(true);
      const { data } = await axios.get(`${airVisualAPI}countries`, {
        params: {
          key: airVisualAPIkey,
        },
      });
      const countriesData = data.data.map((obj) => obj.country);
      setCountries(countriesData);
      onLoading(false);
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchStates = async () => {
      onLoading(true);
      const { data } = await axios.get(`${airVisualAPI}states`, {
        params: {
          country: selectedCountry,
          key: airVisualAPIkey,
        },
      });
      const statesData = data.data.map((obj) => obj.state);
      setStates(statesData);
      setSelectedState("");
      setSelectedCity("");
      setCities([]);
      onLoading(false);
    };
    if (selectedCountry !== "") fetchStates();
  }, [selectedCountry]);

  useEffect(() => {
    const fetchCities = async () => {
      onLoading(true);
      const { data } = await axios.get(`${airVisualAPI}cities`, {
        params: {
          state: selectedState,
          country: selectedCountry,
          key: airVisualAPIkey,
        },
      });
      const citiesData = data.data.map((obj) => obj.city);
      setCities(citiesData);
      setSelectedCity("");
      onLoading(false);
    };
    if (selectedState !== "") fetchCities();
  }, [selectedState, selectedCountry]);

  const handleCountryChange = ({ target }) => {
    setSelectedCountry(target.value);
  };

  const handleStateChange = ({ target }) => {
    setSelectedState(target.value);
  };

  const handleCityChange = ({ target }) => {
    setSelectedCity(target.value);
  };

  return (
    <Box>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Country</InputLabel>
        <Select
          className={classes.select}
          labelId="countries-select-label"
          id="countries-select"
          value={selectedCountry}
          onChange={handleCountryChange}
        >
          {countries.length > 0 &&
            countries.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <FormControl
        className={classes.formControl}
        disabled={states.length === 0}
      >
        <InputLabel id="demo-simple-select-label">State</InputLabel>
        <Select
          className={classes.select}
          labelId="state-select-label"
          id="state-select"
          value={selectedState}
          onChange={handleStateChange}
        >
          {states.length > 0 &&
            states.map((state) => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <FormControl
        className={classes.formControl}
        disabled={cities.length === 0}
      >
        <InputLabel id="demo-simple-select-label">City</InputLabel>
        <Select
          className={classes.select}
          labelId="city-select-label"
          id="city-select"
          value={selectedCity}
          onChange={handleCityChange}
        >
          {cities.length > 0 &&
            cities.map((city) => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <Button
        style={{ marginTop: "15px", marginLeft: "20px" }}
        variant="contained"
        color="primary"
        onClick={() => onSearch(selectedCountry, selectedState, selectedCity)}
        disabled={selectedCity === ""}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBox;
