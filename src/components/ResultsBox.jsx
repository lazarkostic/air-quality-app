import React from "react";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Tab, Tabs, Typography, Box } from "@material-ui/core";

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
          <Typography>{children}</Typography>
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
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const ResultsBox = ({ data }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const mapWeatherParameters = {
    ts: "Timestamp",
    tp: "Temperature",
    pr: "Pressure",
    hu: "hu",
    ws: "Wind Speed",
    wd: "Wind Direction",
    ic: "Icon",
  };

  const mapPollutionParameters = {
    ts: "Timestamp",
    aqius: "AQI US",
    mainus: "mainus",
    aqicn: "aqicn",
    maincn: "maincn",
  };

  const formatData = () => {
    console.log("format data: ", data);
    const array1 = Object.keys(data.weather).map((key) => ({
      column: mapWeatherParameters[key],
      data: data.weather[key],
    }));
    const array2 = Object.keys(data.pollution).map((key) => ({
      column: mapPollutionParameters[key],
      data: data.pollution[key],
    }));
    return [array1, array2];
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="data box tabs">
          <Tab label="Weather" {...a11yProps(0)} />
          <Tab label="Pollution" {...a11yProps(1)} />
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
