"use client";

import dynamic from 'next/dynamic';
import React from 'react';
import { ApexOptions } from 'apexcharts'; // Importa ApexOptions para el tipo de las opciones

// Cargar ApexCharts dinámicamente solo en el cliente
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const JobsAppliedChart = () => {
  const series = [
    {
      name: 'Applied',
      data: [5, 8, 10, 6, 9, 7, 10, 6, 8, 12, 15, 9],
    },
    {
      name: 'Searched',
      data: [10, 12, 15, 8, 12, 10, 12, 7, 10, 15, 18, 12],
    },
  ];

  // Tipar correctamente las opciones con ApexOptions
  const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
      ],
    },
    yaxis: {
      title: {
        text: 'Jobs Count',
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val} jobs`,
      },
    },
  };

  return (
    <div aria-label="Card" className="card bg-base-100 card-bordered">
        <div className="card-body">
            <div>
                <span className="font-bold text-lg pb-5">Jobs Applied vs. Searched</span>
                <Chart options={options} series={series} type="bar" height={350} />
            </div>
        </div>
    </div>
  );
};

export default JobsAppliedChart;