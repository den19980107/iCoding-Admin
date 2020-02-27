import React, { useEffect, useState } from 'react';
import api from '../../api'

// import component
import { Table, Button, message, Modal, Input } from 'antd'
const { confirm } = Modal;

const UserTable = () => {
   const [users, setUsers] = useState([])
   const [filterword, setFilterWord] = useState("")
   useEffect(() => {
      getData()
   }, [])

   const getData = async () => {
      let users = await api.user.getUsers();
      // 過濾出學生
      users = users.filter(user => user.permission == "student")
      setUsers(users)
   }

   const deleteUser = async (id) => {
      confirm({
         title: '你確定要刪除這名使用者嗎？',
         content: '刪除之後此名使用者資料就會完全消失！無法還原喔',
         async onOk() {
            let isSuccess = await api.user.deleteUserById(id)
            if (isSuccess) {
               message.success("刪除成功！")
               getData()
            } else {
               message.success("刪除失敗！")
            }
         },
         onCancel() {
            console.log('Cancel');
         },
         okText: "確定刪除",
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
         title: '學校',
         dataIndex: 'schoolname',
         key: 'schoolname',
      },
      {
         title: '科系',
         dataIndex: 'department',
         key: 'department',
      },
      {
         title: '學號',
         dataIndex: 'studentid',
         key: 'studentid',
      },

      {
         title: '',
         key: 'action',
         render: (text, record) => (
            <Button type="danger" onClick={() => deleteUser(record._id)}>刪除</Button>
         ),
         align: 'right'

      },
   ];

   return (
      <div>
         <h3>學生</h3>
         <h4>搜尋</h4>
         <Input onChange={filter} placeholder="請輸入學生姓名"></Input>
         <Table columns={columns} dataSource={users.filter(user => user.name.includes(filterword))} />
      </div>
   );
};

export default UserTable;