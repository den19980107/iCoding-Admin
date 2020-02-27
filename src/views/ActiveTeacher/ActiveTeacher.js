import React, { useEffect, useState } from 'react';
import api from '../../api'

// import component
import { Table, Button, message, Modal, Input } from 'antd'
const { confirm } = Modal;

const ActiveTeacher = () => {
   const [users, setUsers] = useState([])
   const [filterword, setFilterWord] = useState("")

   useEffect(() => {
      getData()
   }, [])

   const getData = async () => {
      let users = await api.user.getUsers();
      // 過濾出老師
      users = users.filter(user => user.permission == "teacher" && user.InActive)
      setUsers(users)
   }

   const activeTeacher = async (id) => {
      confirm({
         title: '你確定要審核這名使用者嗎？',
         content: '審核此名使用者後，他將可以進入平台',
         async onOk() {
            let isSuccess = await api.user.activeUser(id)
            if (isSuccess) {
               console.log(isSuccess)
               message.success("審核成功！")
               getData()
            } else {
               message.success("審核失敗！")
            }
         },
         onCancel() {
            console.log('Cancel');
         },
         okText: "確定審核",
         cancelText: "取消"
      });
   }
   const filter = (e) => {
      setFilterWord(e.target.value)
   }
   const columns = [
      {
         title: '帳號',
         dataIndex: 'username',
         key: 'username',
      },
      {
         title: '姓名',
         dataIndex: 'name',
         key: 'name',
      },
      {
         title: 'email',
         dataIndex: 'email',
         key: 'email',
      },
      {
         title: '',
         key: 'action',
         render: (text, record) => (
            <Button type="primary" onClick={() => activeTeacher(record._id)}>審核</Button>
         ),
         align: 'right'
      },
   ];

   return (
      <div>
         <h3>教師</h3>
         <h4>搜尋</h4>
         <Input onChange={filter} placeholder="請輸入學生姓名"></Input>
         <Table columns={columns} dataSource={users.filter(user => user.name.includes(filterword))} />
      </div>
   );
};

export default ActiveTeacher;