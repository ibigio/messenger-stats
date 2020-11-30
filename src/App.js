import logo from './logo.svg';
import chat_data1 from './data/message_1.json';
import chat_data2 from './data/message_2.json';
import { Pie } from 'react-chartjs-2';
import { useState } from 'react';
import './App.css';

const App = () => {

  const [data, setData] = useState({
    labels: ["Hi", "There"],
    datasets: [{
      data: [20, 30]
    }]
  });

  return <>
    <h1>Hello, World!</h1>
    <div style={{
      height: "300px",
    }}>
      <Pie data={data} />
    </div>
  </>
}

export default App;
