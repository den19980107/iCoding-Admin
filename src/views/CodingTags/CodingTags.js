import React, { useEffect, useState } from 'react';
import api from '../../api'

// import component
import { Button, Modal, message, Input } from 'antd'
const { confirm } = Modal
const CodingTags = () => {
   const [allTags, setAllTags] = useState([])
   const [newTag, setNewTag] = useState("")
   useEffect(() => {
      getData()
   }, [])
   const getData = async () => {
      let data = await api.coding.getTags()
      console.log(data)
      setAllTags(data)
   }
   const deleteTag = async (id) => {
      confirm({
         title: '你確定要刪除此標籤嗎',
         content: '刪除後不可還原',
         async onOk() {
            try {
               let result = await api.coding.deleteTag(id)
               message.success(result.message)
               getData()
            } catch (err) {
               message.error("刪除失敗")
            }
         },
         onCancel() {
            console.log('Cancel');
         },
      });
   }
   const addNewTag = async () => {
      if (newTag != "") {
         try {
            let result = await api.coding.addTag(newTag)
            message.success("新增成功")
         } catch (err) {
            message.error("新增失敗")
         }
      }
      getData()
      setNewTag("")
   }
   return (
      <div>
         <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
            <h3>所有標籤</h3>
            <div style={{ display: "flex", justifyContent: "sapce-between" }}>
               <Input style={{ height: "auto" }} placeholder="請輸入新標籤" value={newTag} onChange={(e) => setNewTag(e.target.value)}></Input>
               <Button type="primary" style={{ height: "auto" }} onClick={addNewTag}>新增標籤</Button>
            </div>
         </div>
         <hr></hr>
         <div style={{ display: "flex", flexWrap: "wrap" }}>
            {allTags && allTags.map(tag => (
               <div onClick={() => deleteTag(tag._id)} style={{ padding: "1rem", borderRadius: "10px", background: "#333", display: "inline-block", margin: "0 1rem 1rem 0" }}>
                  <h3 style={{ color: "white", padding: "0", margin: 0 }}>{tag.tagName}</h3>
               </div>
            ))}
         </div>
      </div>
   );
};

export default CodingTags;