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
  },
}));

const ResultsBox = ({ data }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getTimeAndDate = () => {
    const date = new Date(data.weather["ts"]);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return `${date.toLocaleDateString(
      "en-US",
      options
    )} ${date.toLocaleTimeString("en-US")}`;
  };

  const getWeatherIcon = (code) => {
    return (
      <img
        alt={code}
        src={`https://www.airvisual.com/images/${code}.png`}
        style={{
          display: "inline-block",
          verticalAlign: "middle",
          width: "20px",
          height: "20px",
        }}
      />
    );
  };

  const mapWeatherColumnNames = {
    ts: "Time",
    tp: "Temperature",
    pr: "Pressure",
    hu: "Humidity",
    ws: "Wind Speed",
    wd: "Wind Direction",
    ic: "Icon",
  };

  const mapPollutionColumnNames = {
    ts: "Time",
    aqius: "AQI (US/EPA)",
    mainus: "Main pollutant (US)",
    aqicn: "AQI (China/MEP)",
    maincn: "Main pollutant (China)",
  };

  const mapWeatherParameters = (data) => {
    return {
      ts: getTimeAndDate(),
      tp: `${data["tp"]} \u00B0C`,
      pr: `${data["pr"]} hPa`,
      hu: `${data["hu"]} %`,
      ws: `${(data["ws"] * 3.6).toFixed(2)} km/h`,
      wd: `${data["wd"]} \u00B0`,
      ic: getWeatherIcon(data["ic"]),
    };
  };

  const mapPollutionParameters = (data) => {
    return {
      ts: getTimeAndDate(),
      aqius: `${data["aqius"]}`,
      mainus: `${data["mainus"]}`,
      aqicn: `${data["aqicn"]}`,
      maincn: `${data["maincn"]}`,
    };
  };

  const formatData = () => {
    const array1 = Object.keys(data.weather).map((key) => ({
      column: mapWeatherColumnNames[key],
      data: mapWeatherParameters(data.weather)[key],
      // data: data.weather[key],
    }));
    const array2 = Object.keys(data.pollution).map((key) => ({
      column: mapPollutionColumnNames[key],
      data: mapPollutionParameters(data.pollution)[key],
      // data: data.pollution[key],
    }));
    return [array1, array2];
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="data box tabs">
          <Tab style={{ width: "50%" }} label="Weather" {...a11yProps(0)} />
          <Tab style={{ width: "50%" }} label="Pollution" {...a11yProps(1)} />
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
