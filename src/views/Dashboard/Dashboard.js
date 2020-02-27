import React, { useState, useEffect } from 'react';
import api from '../../api'
import Category from './Category'
import Activity from './Activity'
const Dashboard = () => {
  const [userNumber, setUserNumber] = useState(0)
  const [classNumber, setClassNumber] = useState(0)
  const [chpaterNumber, setChapterNumber] = useState(0)
  const [videoNumber, setVideoNumber] = useState(0)
  const [testNumber, setTestNumber] = useState(0)

  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    let users = await api.user.getUsers()
    let classes = await api.class.getClasses()
    let chapters = await api.material.getChpaters()
    let video = await api.material.getVideos();
    let test = await api.material.getTests()

    setUserNumber(users.length)
    setClassNumber(classes.length)
    setChapterNumber(chapters.length);
    setVideoNumber(video.length)
    setTestNumber(test.length)
  }
  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <Category text="使用人數" number={userNumber} color="rgb(24,144,255)"></Category>
        <Category text="課程數量" number={classNumber} color="rgb(0,153,83)"></Category>
        <Category text="講義數量" number={chpaterNumber} color="rgb(222,75,57)"></Category>
        <Category text="影片數量" number={videoNumber} color="#00796b"></Category>
        <Category text="測驗數量" number={testNumber} color="rgb(195,124,18)"></Category>
      </div>
      <Activity></Activity>
    </div>
  );
};

export default Dashboard;