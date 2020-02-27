import React, { useEffect, useState } from 'react';
import api from '../../api'

// import component
import { Table, Tag, Button, message, Modal } from 'antd'
import CreateQution from './CreateQution/CreateQution'
const { confirm } = Modal
const CodingQution = () => {
   const [qutions, setQutions] = useState(null)
   const [newQution, setNewQution] = useState(null)
   const [visible, setVisible] = useState(false)
   useEffect(() => {
      getData()
   }, [])
   const getData = async () => {
      let data = await api.coding.getCodingQutions();
      console.log(data)
      setQutions(data)
   }
   const deleteQution = async (id) => {
      confirm({
         title: '確定要刪除這題程式題目嗎？',
         content: '刪除後將無法還原',
         async onOk() {
            let data = await api.coding.deleteCodingQutionById(id);
            if (data.success) {
               message.success("刪除成功")
               getData()
            } else {
               message.error("刪除失敗")
            }
         },
         onCancel() {
            console.log('Cancel');
         },
         okText: "確定刪除",
         cancelText: "取消"
      });
   }

   const columns = [
      {
         title: '題目',
         dataIndex: 'title',
         key: 'title',
      },
      {
         title: '標籤',
         key: 'tags',
         render: (text, record) => (
            <div>
               {record.tags && record.tags.map(tag => (
                  <Tag color="#f50">{tag}</Tag>
               ))}
            </div>
         ),
      },
      {
         title: '',
         key: 'action',
         render: (text, record) => (
            <Button type="danger" onClick={() => deleteQution(record._id)}>刪除</Button>
         ),
         align: 'right'

      },
   ];
   const showModal = () => {
      setVisible(true)
   }

   const handleOk = async () => {
      if (newQution.title) {
         if (newQution.body) {
            if (newQution.testData && newQution.testData.length > 0) {
               let result = await api.coding.CreateQution(newQution)
               if (result.success) {
                  message.success("新增成功")
                  getData()
               } else {
                  message.error("新增失敗")
               }
            } else {
               message.error("測資不得為空")
            }
         } else {
            message.error("請輸入題目")
         }
      }
      else {
         message.error("請輸入標題")
      }
      setVisible(false)
   }

   const handleCancel = () => {
      setVisible(false)
   }

   const handelCodingQutionChange = (data) => {
      setNewQution(data)
   }
   return (
      <div>
         <Button type="primary" onClick={showModal}>
            新增題目
        </Button>
         <Modal
            title="新增題目"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            width="70%"
         >
            <CreateQution onChange={handelCodingQutionChange}></CreateQution>
         </Modal>
         <Table
            dataSource={qutions}
            columns={columns}
            expandedRowRender={record => (
               <div style={{display:"flex",justifyContent:"space-between"}}>
                  <div dangerouslySetInnerHTML={{ __html: record.body }}>
                  </div>
                  <div style={{width:"50%",padding:"1rem",background:"#333"}}>
                     {record.testData.map(data=>(
                        <React.Fragment>
                           <h4 style={{color:"white"}}>測資</h4>
                           <p style={{color:"white"}}>輸入</p>
                           <pre style={{color:"white"}}>
                              {data.input}
                           </pre>
                           <p style={{color:"white"}}>輸出</p>
                           <pre style={{color:"white"}}>
                              {data.output}
                           </pre>
                        </React.Fragment>
                     ))}
                  </div>
               </div>
            )}
         />;
      </div>
   );
};

export default CodingQution;