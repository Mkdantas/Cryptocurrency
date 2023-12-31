import { Col, Row, Typography } from 'antd';
import { Chart as ChartJS, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";
import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimeStamp = [];
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);
  console.log(coinTimeStamp)
  for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
    coinPrice.push(coinHistory.data.history[i].price);
    coinTimeStamp.push(new Date(coinHistory.data.history[i].timestamp).toLocaleDateString());
  }

  const data = {
    labels: coinTimeStamp,
    datasets: [
      {
        label: 'Price in USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };



  return (
    <>
      <Row className="chart-header">
        <Typography.Title level={2} className="chart-title">
          {coinName} Price chart
        </Typography.Title>
        <Col className="price-container">
          <Typography.Title level={5} className="price-change">
            {coinHistory?.data?.change}%
          </Typography.Title>
          <Typography.Title level={5} className="current-price">
            Current {coinName} Price: ${currentPrice}
          </Typography.Title>
        </Col>
      </Row>
      <Line data={data} />
    </>
  );
};

export default LineChart;
