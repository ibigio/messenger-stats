import chat_data from './data/messages.json';
import MyPie from './components/my_pie';
import MyLine from './components/my_line';
import WordList from './components/word_list';
import styles from './App.module.css';
import { getSeasonOf } from './util';

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
    if (getSeasonOf(d) === curSeason) {
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

const wordFreqs = name => {
  const counts = {};

  chat_data.messages
    .filter(m => m.sender_name === name)
    .filter(m => m.content)
    .flatMap(m => m.content.split(' '))
    .map(word => word.toLowerCase())
    .forEach(word => {
      counts[word] = counts[word] ? counts[word] + 1 : 1;
    });

  return Object
    .keys(counts)
    .map(word => ({ word: word, count: counts[word] }))
    .sort((a, b) => a.count - b.count)
    .reverse();
};

console.log(wordFreqs('Shelley Jain'));

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
  units: "",
  title: "Messages per Season",
  values: messagesOverTime.counts,
  labels: messagesOverTime.seasons,
};


const App = () => {

  return <>
    <div className={styles.app_container}>
      <div className={styles.center}>
        <h1 className={styles.header} >Shelley and Ilan's Messenger Shenanigans</h1>
      </div>
      <div className={styles.section}>
        <div className={styles.grid1}>
          <MyPie data={totalMessagesSentData} />
          <MyPie data={totalBytesSentData} />
        </div>
      </div>
      <div className={styles.section}>
        <MyLine data={messagesOverTimeData} />
      </div>
      <div className={styles.section}>
        <div className={styles.wordListGrid}>
          <div className={styles.wordListItem}>
            <WordList wordFreqs={wordFreqs('Shelley Jain')} firstName={'Shelley'} />
          </div>
          <div className={styles.wordListItem}>
            <WordList wordFreqs={wordFreqs('Ilan Bigio')} firstName={'Ilan'} />
          </div>
        </div>
      </div>

    </div>
  </>
}

export default App;