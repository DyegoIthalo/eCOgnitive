import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const UserStats = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const response = await axios.get(
        "https://api.thingspeak.com/channels/2121478/fields/1.json"
      );

      const field1 = response.data.feeds
        .map((feed) => feed.field1)
        .filter((value) => value !== null);

      setPosts(field1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monitoramento de CO",
      },
    },
  };

  const labels = posts.map((_, index) => `Post ${index + 1}`);

  const data = {
    labels,
    datasets: [
      {
        label: "CO",
        data: posts,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div>
      <h2>Dados do Coletor</h2>
      {posts.length === 0 ? (
        <p>Carregando...</p>
      ) : (
        <div>
          <Line options={options} data={data} />
        </div>
      )}
    </div>
  );
};

export default UserStats;
