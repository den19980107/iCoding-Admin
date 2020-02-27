import React, { useEffect, useState } from 'react';
import api from '../../api'

// import component
import { Table, Button, message, Modal, Input } from 'antd'
const { confirm } = Modal;

const TeacherTable = () => {
   const [users, setUsers] = useState([])
   const [filterword, setFilterWord] = useState("")

   useEffect(() => {
      getData()
   }, [])

   const getData = async () => {
      console.log("getData")
      try {
         let users = await api.user.getUsers();
         // 過濾出老師
         users = users.filter(user => user.permission == "teacher")
         console.log(users)
         setUsers(users)
      } catch (err) {
         message.error("getData err =", err)
      }

   }

   const deleteUser = async (id) => {
      confirm({
         title: '你確定要刪除這名使用者嗎？',
         content: '刪除之後此名使用者資料就會完全消失！無法還原喔',
         async onOk() {
            try {
               let res = await await api.user.deleteUserById(id)
               message.success("刪除成功！")
               getData()

            } catch (err) {
               message.success("刪除失敗！ err = ", err)
            }
         },
         onCancel() {
            console.log('Cancel');
         },
         okText: "確定刪除",
         cancelText: "取消"
      });
   }

   const inActiveUser = async (id) => {
      console.log("inActiveUser id = ", id)
      confirm({
         title: '你確定要封鎖這名使用者嗎？',
         content: '封鎖之後此名使用者將無法登入平台',
         async onOk() {
            try {
               let res = await await api.user.inActiveUser(id)
               message.success("封鎖成功！")
               getData()

            } catch (err) {
               message.success("封鎖失敗！ err = ", err)
            }
         },
         onCancel() {
            console.log('Cancel');
         },
         okText: "確定封鎖",
         cancelText: "取消"
      });
   }

   const activeUser = async (id) => {
      console.log("activeUser id = ", id)

      confirm({
         title: '你確定要解除封鎖這名使用者嗎？',
         content: '封鎖之後此名使用者將可以登入平台',
         async onOk() {
            try {
               let res = await api.user.activeUser(id)
               message.success("解除封鎖成功！")
               getData()

            } catch (err) {
               message.success("解除封鎖失敗！ err = ", err)
            }
         },
         onCancel() {
            console.log('Cancel');
         },
         okText: "確定解除封鎖",
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
            <div>
               {record.InActive
                  ?
                  <Button type="primary" style={{ marginRight: "1rem" }} onClick={() => activeUser(record._id)}>解除封鎖</Button>
                  :
                  <Button style={{ marginRight: "1rem" }} onClick={() => inActiveUser(record._id)}>封鎖</Button>
               }
               <Button type="danger" onClick={() => deleteUser(record._id)}>刪除</Button>
            </div>
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

export default TeacherTable;