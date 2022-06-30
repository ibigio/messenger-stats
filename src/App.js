import chat_data from "./data/messages.json";
import MyPie from "./components/my_pie";
import MyLine from "./components/my_line";
import MyBar from "./components/my_bar";
import WordList from "./components/word_list";
import styles from "./App.module.css";
import { getSeasonOf, formatHour } from "./util";

const names = chat_data.participants.map((p) => p.name);
const firstNames = names.map((n) => n.split(" ")[0]);

const totalBytesSent = names.map((name) =>
  chat_data.messages
    .filter((m) => m.content && m.sender_name === name)
    .reduce((total, m) => total + m.content.length, 0)
);

const totalMessagesSent = names.map(
  (name) => chat_data.messages.filter((m) => m.sender_name === name).length
);

const totalWordsSent = names.map(
  (name) =>
    chat_data.messages
      .filter((m) => m.sender_name === name)
      .filter((m) => m.content)
      .flatMap((m) => m.content.split(" ")).length
);

const wordsPerMessage = (() => {
  const wordsPer = [];

  for (let i = 0; i < names.length; i++) {
    wordsPer.push(
      Math.round((100 * totalWordsSent[i]) / totalMessagesSent[i]) / 100
    );
  }

  return wordsPer;
})();

const messagesOverTime = (() => {
  const dates = chat_data.messages
    .map((m) => m.timestamp_ms)
    .sort()
    .map((m) => new Date(m));

  const seasons = [];
  const counts = [];

  let curSeason = getSeasonOf(dates[0]);
  let curCount = 0;

  dates.forEach((d) => {
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

const wordFreqs = (name) => {
  const counts = {};

  chat_data.messages
    .filter((m) => m.sender_name === name)
    .filter((m) => m.content)
    .flatMap((m) => m.content.split(" "))
    .map((word) => word.toLowerCase())
    .forEach((word) => {
      counts[word] = counts[word] ? counts[word] + 1 : 1;
    });

  return Object.keys(counts)
    .map((word) => ({ word: word, count: counts[word] }))
    .sort((a, b) => a.count - b.count)
    .reverse();
};

const wordEqs = ((maxNum) => {
  const eqs = {};

  let ilan = wordFreqs("Ilan Bigio");
  let shelley = wordFreqs("Shelley Jain");

  for (let i = 0; i < maxNum; i++) {
    if (ilan[i].word === shelley[i].word) {
      eqs[ilan[i].word] = true;
    }
  }
  return eqs;
})(500);

const getMessagesPerHour = (() => {
  const counts = {};

  chat_data.messages
    .map((m) => m.timestamp_ms)
    .map((m) => new Date(m))
    .forEach((d) => {
      const hour = (d.getHours() + 3) % 24;
      counts[hour] = counts[hour] ? counts[hour] + 1 : 1;
    });

  return {
    hours: Object.keys(counts),
    counts: Object.keys(counts).map((hour) => counts[hour]),
  };
})();

const totalMessagesSentData = {
  units: totalMessagesSent.reduce((total, v) => total + v),
  title: "Messages Sent",
  values: totalMessagesSent,
  labels: firstNames,
};

const totalBytesSentData = {
  units: totalBytesSent
    .map((x) => Math.round(x / 1000))
    .reduce((total, v) => total + v),
  title: "Kilobytes Sent",
  values: totalBytesSent.map((x) => Math.round(x / 1000)),
  labels: firstNames,
};

const totalWordsSentData = {
  units: totalWordsSent.reduce((total, v) => total + v),
  title: "Words Sent",
  values: totalWordsSent,
  labels: firstNames,
};

const wordsPerMessageData = {
  units: (
    wordsPerMessage.reduce((total, v) => total + v) / wordsPerMessage.length
  ).toFixed(2),
  title: "Words per Message",
  values: wordsPerMessage,
  labels: firstNames,
};

const messagesOverTimeData = {
  units: "",
  title: "Messages per Season",
  values: messagesOverTime.counts,
  labels: messagesOverTime.seasons,
};

const messagesPerHourData = {
  units: "",
  title: "Total Messages at Each Time of Day",
  values: getMessagesPerHour.counts,
  labels: getMessagesPerHour.hours.map(formatHour),
};

const App = () => {
  return (
    <>
      <div className={styles.app_container}>
        <div className={styles.center}>
          <h1 className={styles.header}>
            Shelley and Ilan's Messenger Shenanigans
          </h1>
        </div>
        <div className={styles.comment}>
          Thought it'd be cool to do some scripting with our messenger chat to
          see what fun things I could find :)
        </div>

        <div className={styles.comment}>Turns out we've texted a lot...</div>
        <div className={styles.section}>
          <div className={styles.grid1}>
            <MyPie data={totalMessagesSentData} />
            <MyPie data={totalBytesSentData} />
            <MyPie data={totalWordsSentData} />
            <MyPie data={wordsPerMessageData} />
          </div>
        </div>
        <div className={styles.comment}>
          ...but I guess me a little more than you!
        </div>

        <div className={styles.comment}>
          Also I think we slowly figured out how to use our words more than
          texts...
        </div>
        <div className={styles.section}>
          <MyLine data={messagesOverTimeData} />
        </div>
        <div className={styles.comment}>
          ...or we just stopped sending our solution code over messenger.
        </div>

        <div className={styles.comment}>
          We have favorite words! In this section I like using Find to see how
          our words ranked. (It auto scrolls when you do.)
        </div>
        <div className={styles.section}>
          <div className={styles.wordListGrid}>
            <div className={styles.wordListItem}>
              <WordList
                wordFreqs={wordFreqs("Shelley Jain")}
                firstName={"Shelley"}
                eqs={wordEqs}
              />
            </div>
            <div className={styles.wordListItem}>
              <WordList
                wordFreqs={wordFreqs("Ilan Bigio")}
                firstName={"Ilan"}
                eqs={wordEqs}
              />
            </div>
          </div>
        </div>
        <div className={styles.comment}>
          I stopped it at 500 because it was breaking the site. Your 500th is
          wya?, btw. And we like never used btw, btw.
        </div>

        <div className={styles.comment}>
          And we were like defintely not having it at 5am.
        </div>
        <div className={styles.section}>
          <MyBar data={messagesPerHourData} />
        </div>

        <div className={styles.comment}>
          I was going to add more sections but I started this pretty last
          minute. Hope you enjoyed!
        </div>
      </div>
    </>
  );
};

export default App;
