import logo from './logo.svg';
import chat_data from './data/messages.json';
import { Pie } from 'react-chartjs-2';
import { useState } from 'react';
import './App.css';

const App = () => {

  // const [chatData, setChatData] = useState(chat_data);

  const data = canvas => {
    const ctx = canvas.getContext("2d");
    const gradient1 = ctx.createLinearGradient(300, 300, 700, 700);
    gradient1.addColorStop(0, '#0099ff');
    gradient1.addColorStop(1, '#a033ff');
    const gradient2 = ctx.createLinearGradient(400, 400, 600, 600);
    gradient2.addColorStop(0, '#ff5280');
    gradient2.addColorStop(1, '#ff7061');
    return {
      labels: ["Hi", "There"],
      datasets: [{
        data: [20, 30],
        backgroundColor: [
          gradient2,
          gradient1,
        ],
      }]
    }
  };

  return <>
    <div class="center">
      <h1>Shelley and Ilan's Messenger Shenanigans</h1>
    </div>
    <div>
      <Pie data={data} height="100px" />
    </div>
  </>
}

export default App;