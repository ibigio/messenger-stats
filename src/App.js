import chat_data from './data/messages.json';
import MyPie from './components/my_pie';
import styles from './App.module.css';

const names = chat_data.participants.map(p => p.name);
const firstNames = names.map(n => n.split(' ')[0]);

const totalBytesSent = names.map(name => (
  chat_data.messages
    .filter(m => m.content && m.sender_name === name)
    .reduce((total, m) => total + m.content.length, 0)
));

const totalMessagesSent = names.map(name => (
  chat_data.messages
    .filter(m => m.sender_name === name)
    .length
));

const colorful = s => (
<span className={styles.colorful}>{s}</span>
);


const App = () => {

  const data1 = {
    units: totalMessagesSent.reduce((total, v) => total + v),
    title: "Messages Sent",
    values: totalBytesSent,
    labels: firstNames
  };

  const data2 = {
    units: totalBytesSent.map(x => Math.round(x / 1000)).reduce((total, v) => total + v),
    title: "Kilobytes Sent",
    values: totalBytesSent.map(x => Math.round(x / 1000)),
    labels: firstNames
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