import React, { useEffect, useState } from 'react';
import api from '../../../api'

// import compoennt
import Youtube from 'react-youtube'
import { Table } from 'antd'

const Video = () => {
  const [videos, setVideos] = useState([])
  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    let videos = await api.material.getVideos()
    setVideos(videos)
  }

  const opts = {
    height: '195',
    width: '320'
  };
  const columns = [
    {
      title: '影片',
      dataIndex: '',
      key: 'x',
      render: (text, record) => <Youtube videoId={record.videoURL} opts={opts}></Youtube>,
    },
    { title: '影片名稱', dataIndex: 'videoName', key: 'videoName' },
    { title: '所屬單元', dataIndex: 'unit.unitName', key: 'unitName' },
    { title: '所屬課程', dataIndex: 'class.className', key: 'className' },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={videos} />
    </div>
  );
};

export default Video;