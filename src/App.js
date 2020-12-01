import chat_data from './data/messages.json';
import MyPie from './components/my_pie';
import styles from './App.module.css';

const totalBytesSent = name => (
  chat_data.messages
    .filter(m => m.content && m.sender_name === name)
    .reduce((total, m) => total + m.content.length, 0)
);

const totalMessagesSent = name => (
  chat_data.messages
    .filter(m => m.sender_name === name)
    .length
);



const App = () => {

  const data1 = {
    title: "Messages Sent",
    values: chat_data.participants.map(p => totalMessagesSent(p.name)),
    labels: chat_data.participants.map(p => p.name)
  };

  const data2 = {
    title: "Kilobytes Sent",
    values: chat_data.participants.map(p => Math.round(totalBytesSent(p.name) / 1000)),
    labels: chat_data.participants.map(p => p.name)
  };

  return <>
    <div className={styles.app_container}>
      <div className={styles.center}>
        <h1 className={styles.header} >Shelley and Ilan's Messenger Shenanigans</h1>
      </div>
      <div className={styles.grid}>
        <MyPie data={data1} />
        <MyPie data={data2} />
      </div>
    </div>
  </>
}

export default App;