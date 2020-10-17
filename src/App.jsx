import React, { useState } from "react";

import { Container, Box } from "@material-ui/core";
import axios from "axios";

import { airVisualAPI, airVisualAPIkey } from "./config/apiEndpoints";
import SearchBox from "./components/SearchBox";
import ResultsBox from "./components/ResultsBox";
import loadingSpinner from "./assets/spinner.png";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [airQualityData, setAirQualityData] = useState({});

  const fetchAirQualityData = async (country, state, city) => {
    console.log("fetch data for: ", country, state, city);
    setLoading(true);
    const { data } = await axios.get(`${airVisualAPI}city`, {
      params: {
        country: country,
        state: state,
        city: city,
        key: airVisualAPIkey,
      },
    });
    console.log("data: ", data);
    const pollution =
      data && data.data && data.data.current && data.data.current.pollution;
    const weather =
      data && data.data && data.data.current && data.data.current.weather;
    setAirQualityData({ pollution, weather });
    setLoading(false);
  };

  return (
    <Box display="flex" flexDirection="column">
      <Container style={{ textAlign: "center", marginTop: "100px" }}>
        <SearchBox
          onSearch={fetchAirQualityData}
          onLoading={(value) => setLoading(value)}
          clearData={() => setAirQualityData({})}
        />
        {loading ? (
          <img
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              margin: "auto",
              padding: "20px 0",
            }}
            src={loadingSpinner}
            alt="loading"
          />
        ) : (
          <Box style={{ marginTop: "20px" }}>
            {Object.keys(airQualityData).length !== 0 ? (
              <ResultsBox data={airQualityData} />
            ) : (
              <div>please enter country/state/city</div>
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default App;
