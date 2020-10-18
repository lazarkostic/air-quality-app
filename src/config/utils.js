import React from "react";

import { css } from "emotion";

const getTimeAndDate = (data) => {
  const date = new Date(data["ts"]);
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
      className={css`
        display: inline-block;
        vertical-align: center;
        width: 20px;
        height: 20px;
      `}
    />
  );
};

export const mapWeatherColumnNames = {
  ts: "Time",
  tp: "Temperature",
  pr: "Pressure",
  hu: "Humidity",
  ws: "Wind Speed",
  wd: "Wind Direction",
  ic: "Icon",
};

export const mapPollutionColumnNames = {
  ts: "Time",
  aqius: "AQI (US/EPA)",
  mainus: "Main pollutant (US)",
  aqicn: "AQI (China/MEP)",
  maincn: "Main pollutant (China)",
};

export const mapWeatherParameters = (data) => {
  return {
    ts: getTimeAndDate(data),
    tp: `${data["tp"]} \u00B0C`,
    pr: `${data["pr"]} hPa`,
    hu: `${data["hu"]} %`,
    ws: `${(data["ws"] * 3.6).toFixed(2)} km/h`,
    wd: `${data["wd"]} \u00B0`,
    ic: getWeatherIcon(data["ic"]),
  };
};

export const mapPollutionParameters = (data) => {
  return {
    ts: getTimeAndDate(data),
    aqius: `${data["aqius"]}`,
    mainus: `${data["mainus"]}`,
    aqicn: `${data["aqicn"]}`,
    maincn: `${data["maincn"]}`,
  };
};
