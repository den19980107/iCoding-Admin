import React, { useState, useEffect } from 'react';
import api from '../../../api'
import { Table } from 'antd';

const Chapter = () => {
  const [chapters, setChapters] = useState([])
  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    let chapters = await api.material.getChpaters();
    setChapters(chapters)
  }
  const columns = [
    { title: '講義名稱', dataIndex: 'chapterName', key: 'chapterName' },
    { title: '所屬單元', dataIndex: 'unit.unitName', key: 'unitName' },
    { title: '所屬課程', dataIndex: 'class.className', key: 'className' }
  ];


  return (
    <Table
      columns={columns}
      expandedRowRender={record =>
        <div dangerouslySetInnerHTML={{ __html: record.body }}>
        </div>
      }
      dataSource={chapters}
    />
  );
};

export default Chapter;