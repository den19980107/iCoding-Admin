import React, { useState, useEffect } from 'react';
import api from '../../../api';
import { v4 as uuid } from 'uuid'
// import component
import CKEditor from 'ckeditor4-react';
import { Input, Select, Tag, Button, Card, Modal, Icon } from 'antd'
const { Option } = Select;
const { TextArea } = Input;
const CreateQution = ({ onChange }) => {
   const [title, setTitle] = useState("")
   const [body, setBody] = useState("")
   const [testData, setTestData] = useState([])
   const [tags, setTags] = useState([])
   const [allTags, setAllTags] = useState([])
   const [createTestDataModalVisiable, setCreateTestDataModalVisiable] = useState(false)
   const [testDataInput, setTestDataInput] = useState("")
   const [testDataOutput, setTestDataOutput] = useState("")

   useEffect(() => {
      getData()
   }, [])

   useEffect(() => {
      updateData()
   }, [title, body, testData, tags])
   const updateData = () => {
      onChange({
         testData: testData,
         tags: tags,
         title: title,
         body: body
      })
   }

   const getData = async () => {
      let allTags = await api.coding.getTags();
      if (allTags) {
         setAllTags(allTags)
      }
   }

   const handelEditorChange = (e) => {
      setBody(e.editor.getData())
   }

   const handleSelectTag = (value) => {
      let selectedTags = tags

      if (!tags) {
         setTags([value])
      }
      else {
         let alreadyHasThisTag = false
         for (let i = 0; i < selectedTags.length; i++) {
            if (selectedTags[i] == value) {
               alreadyHasThisTag = true
            }
         }
         if (alreadyHasThisTag) {
            var index = selectedTags.indexOf(value);
            if (index !== -1) selectedTags.splice(index, 1);
         } else {
            selectedTags.push(value)
         }
         setTags([...selectedTags])
      }
   }

   const handelCreateTestData = () => {
      setTestData([...testData, {
         input: testDataInput,
         output: testDataOutput,
         id: uuid()
      }])
      setCreateTestDataModalVisiable(false)
   }

   const handelCancelCreateTestData = () => {
      setCreateTestDataModalVisiable(false)
   }

   const deleteTestData = (id) => {
      setTestData(testData.filter(data => data.id != id))
   }
   return (
      <div style={{ marginBottom: "1rem" }}>
         <div style={{ display: "flex", justifyContent: "space-between", margin: "0 0 1rem 0" }}>
            <Input placeholder="請輸入題目名稱" onChange={(e) => {
               setTitle(e.target.value)
            }}></Input>
            <Select defaultValue="請選擇標籤" style={{ width: 120 }} onChange={handleSelectTag}>
               {allTags && allTags.map(tag => (
                  <Option value={tag.tagName}>{tag.tagName}</Option>
               ))}
            </Select>
            <div style={{ width: "20%", display: "flex", overflowX: "auto", flexWrap: "nowrap", padding: "0 1rem" }}>
               {tags && tags.map(tag => (
                  <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                     <Tag color="#2db7f5">{tag}</Tag>
                  </div>
               ))}
            </div>
         </div>
         <div style={{ display: "flex", height: "300px" }}>
            <div style={{ width: "60%" }}>
               <CKEditor
                  config={{
                     filebrowserUploadUrl: '/uploader',
                     filebrowserUploadMethod: 'form'
                  }}
                  onChange={handelEditorChange}
               ></CKEditor>
            </div>
            <div style={{ width: "40%", padding: "0 1rem", height: "90%" }}>
               <Button style={{ marginBottom: "1rem" }} onClick={() => setCreateTestDataModalVisiable(true)}>新增測資</Button>
               <Modal
                  title="新增測資"
                  visible={createTestDataModalVisiable}
                  onOk={handelCreateTestData}
                  onCancel={handelCancelCreateTestData}
               >
                  <p>輸入</p>
                  <TextArea rows={4} value={testDataInput} onChange={(e) => setTestDataInput(e.target.value)} />
                  <p>輸出</p>
                  <TextArea rows={4} value={testDataOutput} onChange={(e) => setTestDataOutput(e.target.value)} />
               </Modal>
               <div style={{ overflowY: "auto", height: "100%" }}>
                  {testData && testData.map(data => (
                     <Card title="測資" extra={<Icon type="close" onClick={() => deleteTestData(data.id)}></Icon>} style={{ width: "100%" }}>
                        <div style={{ display: "flex" }}>
                           <div style={{ width: "50%" }}>
                              <h5>輸入</h5>
                              <pre>{data.input}</pre>
                           </div>
                           <div style={{ width: "50%" }}>
                              <h5>輸出</h5>
                              <pre>{data.output}</pre>
                           </div>
                        </div>
                     </Card>
                  ))}
               </div>
            </div>
         </div>
      </div >
   );
};

export default CreateQution;