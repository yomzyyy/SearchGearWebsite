import Chart from 'react-apexcharts';

function IncomeExpenseChart() {
  const chartOptions = {
    chart: {
      type: 'line',
      height: 350,
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
        },
      },
      fontFamily: 'inherit',
    },
    colors: ['#22c55e', '#ef4444'],
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: {
        style: {
          colors: '#6b7280',
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => `₱${value.toLocaleString()}`,
        style: {
          colors: '#6b7280',
          fontSize: '12px',
        },
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      fontSize: '14px',
      fontWeight: 600,
      labels: {
        colors: '#374151',
      },
      markers: {
        width: 12,
        height: 12,
        radius: 12,
      },
    },
    grid: {
      borderColor: '#e5e7eb',
      strokeDashArray: 5,
    },
    tooltip: {
      theme: 'light',
      y: {
        formatter: (value) => `₱${value.toLocaleString()}`,
      },
    },
    dataLabels: {
      enabled: false,
    },
  };

  const series = [
    {
      name: 'Income',
      data: [50000, 60000, 55000, 70000, 80000, 75000, 90000, 85000, 95000, 100000, 105000, 110000],
    },
    {
      name: 'Expenses',
      data: [30000, 35000, 32000, 40000, 45000, 42000, 50000, 48000, 52000, 55000, 58000, 60000],
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Income vs Expenses</h2>
      <Chart options={chartOptions} series={series} type="line" height={350} />
    </div>
  );
}

export default IncomeExpenseChart;
