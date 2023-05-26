import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
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
import styles from "../User/UserStats.module.css";

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
        .map((feed, index) => ({
          value: feed.field1,
          index: index + 1,
        }))
        .filter((value) => value.value !== null);

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
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "rect",
          boxWidth: 10,
        },
      },
      title: {
        display: true,
        text: "Monitoramento de Monóxido de Carbono (CO)",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const datasetLabel = context.dataset.label || "";
            const value = context.parsed.y || 0;
            const index = context.dataIndex;
            const indexLabel = getIndexLabel(value);
            return `CO: ${value} e Índice: ${indexLabel}`;
          },
        },
      },
    },
  };

  const getIndexLabel = (value) => {
    if (value <= 9) {
      return "Bom";
    } else if (value <= 11) {
      return "Moderado";
    } else if (value <= 13) {
      return "Ruim";
    } else if (value <= 15) {
      return "Muito ruim";
    } else {
      return "Péssimo";
    }
  };

  const labels = posts.map((_, index) => `Post ${index + 1}`);

  const datasets = [
    {
      label: "Coletor 1",
      data: posts.map((post) => post.value),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(225, 99, 132, 0.5)",
    },
  ];

  const legendTexts = ["Bom", "Moderado", "Ruim", "Muito ruim", "Péssimo"];

  const colors = ["green", "yellow", "orange", "red", "purple"];

  const legendItems = legendTexts.map((text, index) => {
    let range = "";

    if (index === 0) {
      range = "0 - 9";
    } else if (index === 1) {
      range = "> 9 - 11";
    } else if (index === 2) {
      range = "> 11 - 13";
    } else if (index === 3) {
      range = "> 13 - 15";
    } else {
      range = "> 15";
    }

    return (
      <li className={styles["chart-legend-item"]} key={index}>
        <span
          className={styles["chart-legend-color"]}
          style={{ backgroundColor: colors[index] }}
        ></span>
        <span className={styles["chart-legend-label"]}>{text}</span>
        <span className={styles["chart-legend-range"]}>{range}</span>
      </li>
    );
  });

  const data = {
    labels,
    datasets,
  };

  return (
    <div>
      <h2 className={styles["chart-title"]}>Dados do Coletor</h2>
      {posts.length === 0 ? (
        <p className={styles["loading-text"]}>Carregando...</p>
      ) : (
        <div className={styles["chart-container"]}>
          <Line options={options} data={data} />
          <ul className={styles["chart-legend"]}>{legendItems}</ul>
        </div>
      )}
    </div>
  );
};

export default UserStats;
