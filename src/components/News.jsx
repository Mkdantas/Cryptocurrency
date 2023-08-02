import React, { useState } from 'react';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { Avatar, Card, Col, Row, Select, Typography } from 'antd';
import moment from 'moment/moment';
import { useGetCryptosQuery } from '../services/cryptoApi';

const demoImageUrl =
  'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrencies');
  const count = simplified ? 6 : 12;
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count,
  });
  const { data: cryptosList } = useGetCryptosQuery(100);
  
  if (!cryptoNews?.value) return 'Loading';

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select showSearch className="select-news" placeholder="Select a Crypto" optionFilterProp="children" 
          onChange={(value) => setNewsCategory(value)}
          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) > 0}>
            <Select.Option value="Cryptocurrency"></Select.Option>
            {cryptosList?.data?.coins.map((coin) => <Select.Option value={coin.name}>{coin.name}</Select.Option>)}
          </Select>
        </Col>
      )}
      {cryptoNews?.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Typography.Title className="news-title" level={4}>
                  {news.name}
                </Typography.Title>
                <img
                  style={{ maxWidth: '200px', maxHeight: '100px'}}
                  src={news?.image?.thumbnail?.contentUrl || demoImageUrl}
                  alt="news"
                />
              </div>
              <p>
                {news.description > 100 ? `${news.description.substring(0, 100)}...` :
                news.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImageUrl} alt="news author" />
                  <p className="provider-name">{news.provider[0]?.name}</p>
                </div>
                <p>{moment(news.dataPublished).startOf('ss').fromNow()}</p>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
