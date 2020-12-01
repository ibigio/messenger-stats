import logo from './logo.svg';
import chat_data from './data/messages.json';
import { Pie } from 'react-chartjs-2';
import MyPie from './components/my_pie';
import { useState } from 'react';
import styles from './App.module.css';

const App = () => {

  // const [chatData, setChatData] = useState(chat_data);

  const data1 = {
    values: [10, 30],
    labels: ["Hi", "There"]
  };

  const data2 = {
    values: [40, 30],
    labels: ["Hi", "There"]
  };

  return <>
  <div className={styles.app_container}>
    <div className={styles.center}>
      <h1 className={styles.header} >Shelley and Ilan's Messenger Shenanigans</h1>
    </div>
    <div className={styles.grid}>
      <MyPie data={data1}/>
      <MyPie data={data2}/>
    </div>
    </div>
  </>
}

export default App;