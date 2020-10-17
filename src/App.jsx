import React, { useState } from "react";

import { Container, Box } from "@material-ui/core";
import axios from "axios";

import { airVisualAPI, airVisualAPIkey } from "./config/apiEndpoints";
import SearchBox from "./components/SearchBox";
import loadingSpinner from "./assets/spinner.gif";

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
    setAirQualityData(pollution);
    setLoading(false);
  };

  return (
    <Box display="flex" flexDirection="column">
      <Container style={{ textAlign: "center", marginTop: "100px" }}>
        <SearchBox
          onSearch={fetchAirQualityData}
          onLoading={(value) => setLoading(value)}
        />
        {loading ? (
          <img
            // className={css`
            //   position: absolute;
            //   left: 0;
            //   right: 0;
            //   margin: auto;
            // `}
            src={loadingSpinner}
            alt="loading"
          />
        ) : (
          <Box>
            {Object.keys(airQualityData).length !== 0 ? (
              <div>{JSON.stringify(airQualityData)}</div>
            ) : (
              <div>empty</div>
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default App;
