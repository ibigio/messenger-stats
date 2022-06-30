import React from "react";
import { ResponsivePie } from "@nivo/pie";
import chat_data from "./data/message_1.json";
import "./App.css";

export default function App() {
  // const [chartData, setChartData] = useState(chat_data);
  const chartData = chat_data;

  return (
    <>
      <h1>Hello, World!</h1>
      <div style={{ height: "800px" }}>
        <TotalContentChart data={chartData} />
        <TotalMessagesChart data={chartData} />
      </div>
    </>
  );
}

const TotalContentChart = ({ data }) => {
  const countTotalContentForSender = (senderName) =>
    data.messages.reduce((total, m) => {
      if (m.content && m.sender_name === senderName) {
        return total + m.content.length;
      }
      return total;
    }, 0);

  let totals = data.participants.map((p) => ({
    id: p.name,
    value: countTotalContentForSender(p.name),
  }));

  return <ResponsivePie data={totals} />;
};

const TotalMessagesChart = ({ data }) => {
  const countMessagesForSender = (senderName) =>
    data.messages.filter((m) => m.content && m.sender_name === senderName)
      .length;

  let totals = data.participants.map((p) => ({
    id: p.name,
    value: countMessagesForSender(p.name),
  }));

  return <ResponsivePie data={totals} />;
};
