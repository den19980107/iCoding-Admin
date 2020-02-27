import React, { useState, useEffect } from 'react';
import api from '../../../api'
import { Table } from 'antd';

const Test = () => {
   const [tests, setTests] = useState([])
   useEffect(() => {
      getData()
   }, [])
   const getData = async () => {
      let tests = await api.material.getTests();
      setTests(tests)
   }
   const columns = [
      { title: '測驗名稱', dataIndex: 'testName', key: 'testName' },
      { title: '所屬單元', dataIndex: 'unit.unitName', key: 'unitName' },
      { title: '所屬課程', dataIndex: 'class.className', key: 'className' }
   ];


   return (
      <Table
         columns={columns}
         expandedRowRender={record =>
            <div>
               {record.testQutions.map(qution => {
                  return (
                     <div style={{ border: "0.5px solid #ccc", margin: "1rem 0", padding: "1rem", background: "#333" }}>
                        <pre style={{ color: "#fff", fontSize: "18px" }}>
                           {JSON.stringify(qution, null, 4)}
                        </pre>
                     </div>
                  )
               })}
            </div>
         }
         dataSource={tests}
      />
   );
};

export default Test;