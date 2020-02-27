import React, { useEffect, useState } from 'react';
import api from '../../api'

// import component
import { Table, Select, Input, Icon } from 'antd'
const { Option } = Select;
const Activity = () => {
   const [history, setHistory] = useState([])
   const [filterText, setFilterText] = useState("")
   useEffect(() => {
      getData()
   }, [])

   const getData = async (passDay) => {
      setHistory(null)
      let data = await api.activity.getHistory(passDay)
      setHistory(data)
   }

   const columns = [
      {
         title: '時間',
         dataIndex: 'date',
         key: 'date',
      },
      {
         title: '使用者名稱',
         dataIndex: 'user.name',
         key: 'name',
      },
      {
         title: '課程',
         dataIndex: 'inClass',
         key: 'inClass',
      },
      {
         title: '動作',
         dataIndex: 'action',
         key: 'action',
      },
      {
         title: '詳細資料',
         dataIndex: 'detail',
         key: 'detail',
      }
   ];
   const handelSelectPassDay = (passDay) => {
      getData(passDay)
   }
   return (
      <div>
         <Select defaultValue="7" style={{ width: 120 }} onChange={handelSelectPassDay}>
            <Option value="7">過去7天</Option>
            <Option value="10">過去10天</Option>
            <Option value="30">過去30天</Option>
            <Option value="90">過去3個月</Option>
            <Option value="180">過去半年</Option>
            <Option value="360">過去一年</Option>
            <Option value="100000000">所有紀錄</Option>
         </Select>
         <Input placeholder="請輸入使用者名稱" onChange={(e) => setFilterText(e.target.value)}></Input>
         {history
            ?
            <Table columns={columns} dataSource={history.filter(hist => {
               if (hist.user && hist.user.name) {
                  return (
                     hist.user.name.includes(filterText)
                  )
               }
            }
            )} />
            :
            <div style={{ display: "flex", justifyContent: "center" }}>
               <Icon type="loading" style={{ fontSize: 64, marginTop: "1rem" }} spin />
            </div>
         }
      </div>
   );
};

export default Activity;
