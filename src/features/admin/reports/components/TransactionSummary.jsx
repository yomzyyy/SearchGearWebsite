function TransactionSummary() {
  const stats = [
    {
      title: 'Total Income',
      amount: '₱250,000',
      change: '+15% vs prev',
      changeType: 'positive',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      icon: '💰',
    },
    {
      title: 'Total Expenses',
      amount: '₱150,000',
      change: '+5% vs prev',
      changeType: 'neutral',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      icon: '💸',
    },
    {
      title: 'Net Profit',
      amount: '₱100,000',
      change: '+25% vs prev',
      changeType: 'positive',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      icon: '📈',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stat.amount}</p>
              <p
                className={`text-sm mt-2 ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-gray-600'
                }`}
              >
                {stat.change}
              </p>
            </div>
            <div className={`w-14 h-14 ${stat.bgColor} rounded-full flex items-center justify-center`}>
              <span className="text-3xl">{stat.icon}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TransactionSummary;
