import React, { useState } from "react";

import { Container, Box } from "@material-ui/core";
import { css } from "emotion";
import axios from "axios";

import { airVisualAPI, airVisualAPIkey } from "./config/apiEndpoints";
import SearchBox from "./components/SearchBox";
import ResultsBox from "./components/ResultsBox";
import loadingSpinner from "./assets/spinner.png";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [airQualityData, setAirQualityData] = useState({});

  const fetchAirQualityData = async (country, state, city) => {
    setLoading(true);
    const { data } = await axios.get(`${airVisualAPI}city`, {
      params: {
        country: country,
        state: state,
        city: city,
        key: airVisualAPIkey,
      },
    });
    const pollution =
      data && data.data && data.data.current && data.data.current.pollution;
    const weather =
      data && data.data && data.data.current && data.data.current.weather;
    setAirQualityData({ pollution, weather });
    setLoading(false);
  };

  return (
    <Box display="flex" flexDirection="column">
      <Container
        className={css`
          margin-top: 60px;
          text-align: center;
          font-size: 30px;
          font-weight: 700;
        `}
      >
        AirQuality
      </Container>
      <Container
        className={css`
          text-align: center;
          margin-top: 30px;
        `}
      >
        <SearchBox
          onSearch={fetchAirQualityData}
          onLoading={(value) => setLoading(value)}
          clearData={() => setAirQualityData({})}
        />
        {loading ? (
          <img
            className={css`
              position: absolute;
              left: 0;
              right: 0;
              margin: auto;
              padding: 20px 0;
            `}
            src={loadingSpinner}
            alt="loading spinner"
          />
        ) : (
          <Box
            className={css`
              margin-top: 20px;
            `}
          >
            {Object.keys(airQualityData).length !== 0 ? (
              <ResultsBox data={airQualityData} />
            ) : null}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default App;
