import chat_data from './data/messages.json';
import MyPie from './components/my_pie';
import MyLine from './components/my_line';
import styles from './App.module.css';
import { monthToSeason, getSeasonOf } from './util';

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

const messagesOverTime = (() => {
  const dates = chat_data.messages
    .map(m => m.timestamp_ms)
    .sort()
    .map(m => new Date(m));

  const seasons = [];
  const counts = [];

  let curSeason = getSeasonOf(dates[0]);
  let curCount = 0;

  dates.forEach(d => {
    if (getSeasonOf(d) == curSeason) {
      curCount++;
    } else {
      seasons.push(curSeason);
      counts.push(curCount);
      curSeason = getSeasonOf(d);
      curCount = 0;
    }
  });
  // necessary to avoid off by one
  seasons.push(curSeason);
  counts.push(curCount);

  return {
    seasons: seasons,
    counts: counts,
  };
})();

const colorful = s => (
  <span className={styles.colorful}>{s}</span>
);

const totalMessagesSentData = {
  units: totalMessagesSent.reduce((total, v) => total + v),
  title: "Messages Sent",
  values: totalMessagesSent,
  labels: firstNames
};

const totalBytesSentData = {
  units: totalBytesSent.map(x => Math.round(x / 1000)).reduce((total, v) => total + v),
  title: "Kilobytes Sent",
  values: totalBytesSent.map(x => Math.round(x / 1000)),
  labels: firstNames
};

const messagesOverTimeData = {
  units: messagesOverTime.counts.length,
  title: "Title",
  values: messagesOverTime.counts,
  labels: messagesOverTime.seasons,
};


const App = () => {

  return <>
    <div className={styles.app_container}>
      <div className={styles.center}>
        <h1 className={styles.header} >Shelley and Ilan's Messenger Shenanigans</h1>
      </div>
      <div className={styles.grid1}>
        <MyPie data={totalMessagesSentData} />
        <MyPie data={totalBytesSentData} />
      </div>
      <MyLine data={messagesOverTimeData} />

    </div>
  </>
}

export default App;