import React from "react";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Tab, Tabs, Typography, Box } from "@material-ui/core";
import { css } from "emotion";

import {
  mapWeatherColumnNames,
  mapPollutionColumnNames,
  mapWeatherParameters,
  mapPollutionParameters,
} from "../config/utils";

import Table from "./Table";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={"div"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "500px",
    margin: "auto",
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down("sm")]: {
      width: "300px",
    },
  },
}));

const ResultsBox = ({ data }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const formatData = () => {
    const weatherData = Object.keys(data.weather).map((key) => ({
      column: mapWeatherColumnNames[key],
      data: mapWeatherParameters(data.weather)[key],
    }));
    const pollutionData = Object.keys(data.pollution).map((key) => ({
      column: mapPollutionColumnNames[key],
      data: mapPollutionParameters(data.pollution)[key],
    }));
    return [weatherData, pollutionData];
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="data box tabs">
          <Tab
            className={css`
              width: 50%;
            `}
            label="Weather"
            {...a11yProps(0)}
          />
          <Tab
            className={css`
              width: 50%;
            `}
            label="Pollution"
            {...a11yProps(1)}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Table data={formatData()[0]} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Table data={formatData()[1]} />
      </TabPanel>
    </div>
  );
};

export default ResultsBox;
