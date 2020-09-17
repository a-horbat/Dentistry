import React, { useEffect, useRef } from "react";
import { useAsyncMethod } from "@base86inc/apollo-client";
import get from "lodash/get";
import random from "lodash/random";
import times from "lodash/times";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

export function useChart(getChartOptions, args=[]) {
  const chartEl = useRef(null);
  const [{ data, loading, error }, loadCharts] = useAsyncMethod(() =>
    import("chart.js")
  );
  const Chart = get(data, "default");

  useEffect(() => {
    loadCharts();
  }, []);

  useEffect(() => {
    if (Chart && chartEl.current) {
      const box = chartEl.current.parentNode.getBoundingClientRect()
      chartEl.current.width = `${box.width}px`
      chartEl.current.height = `${box.height}px`
      const chart = new Chart(chartEl.current, getChartOptions(...args));
      return () => chart.destroy()
    }
  }, [Chart, chartEl, ...args]);

  return [{ data, loading, error }, chartEl];
}

export function chartOptions(timeFrame = 30) {
  // https://www.chartjs.org/docs/latest/charts/mixed.html
  const date = new Date().valueOf();
  const getDate = (i) => new Date(date - i * 1000 * 60 * 60 * 24).toLocaleDateString()
  const labels = times(timeFrame).map((_, i) => '')
  const barData = times(timeFrame).map(() => random(0, 100));
  const lineData = barData.map((v) => v / 2);
  return {
    type: "line",
    data: {
      datasets: [
        {
          label: "Total",
          backgroundColor: "#21C5C4",
          data: barData,
          type: "bar",
          order: 2
        },
        {
          label: "Average",
          data: lineData,
          backgroundColor: "transparent",
          borderColor: "#FF8070",
          type: "line",
          order: 1
        }
      ],
      labels
    },
    options: {
      colors: ["#FF8070"],
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          gridLines: {
            borderDash: [10, 8]
          }
        }],
        yAxes: [{
          gridLines: {
            borderDash: [10, 8]
          }
        }]
      }
    }
  };
}

export function SelectTimeFrame({ timeFrame, setTimeFrame }) {
  const isActive = (value) => timeFrame === value ? "contained" : undefined
  return (
    <Box display="flex" justifyContent="flex-end" padding={2}>
      <ButtonGroup color="secondary">
        <Button
          variant={isActive(7)}
          onClick={() => setTimeFrame(7)}
        >
          Weekly
        </Button>
        <Button
          variant={isActive(14)}
          onClick={() => setTimeFrame(14)}
        >
          Biweekly
        </Button>
        <Button
          variant={isActive(30)}
          onClick={() => setTimeFrame(30)}
        >
          Monthly
        </Button>
      </ButtonGroup>
    </Box>
  );
}
