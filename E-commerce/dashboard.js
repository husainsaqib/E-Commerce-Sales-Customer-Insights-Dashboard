import React, { useState, useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, DollarSign, ShoppingCart, AlertCircle, Award } from 'lucide-react';

// Generate realistic e-commerce data
const generateData = () => {
  const categories = ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books'];
  const regions = ['North', 'South', 'East', 'West'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Monthly sales trend
  const monthlySales = months.map((month, i) => ({
    month,
    revenue: 45000 + Math.random() * 35000 + (i > 8 ? 20000 : 0), // Holiday spike
    orders: 800 + Math.random() * 400 + (i > 8 ? 300 : 0)
  }));

  // Category performance by region
  const categoryData = categories.map(cat => ({
    category: cat,
    sales: Math.random() * 80000 + 40000,
    units: Math.floor(Math.random() * 2000 + 500)
  })).sort((a, b) => b.sales - a.sales);

  // Regional performance
  const regionData = regions.map(region => ({
    region,
    revenue: Math.random() * 150000 + 80000,
    customers: Math.floor(Math.random() * 3000 + 1000)
  }));

  // Customer segments
  const segments = [
    { name: 'Champions', value: 23, color: '#10b981', description: 'High value, frequent buyers' },
    { name: 'Loyal', value: 18, color: '#3b82f6', description: 'Regular customers' },
    { name: 'Potential', value: 28, color: '#f59e0b', description: 'New with potential' },
    { name: 'At Risk', value: 15, color: '#ef4444', description: 'Declining activity' },
    { name: 'Lost', value: 16, color: '#6b7280', description: 'Haven\'t purchased recently' }
  ];

  // Churn prediction data
  const churnData = [
    { segment: 'Low Risk', customers: 3420, percentage: 68 },
    { segment: 'Medium Risk', customers: 980, percentage: 20 },
    { segment: 'High Risk', customers: 600, percentage: 12 }
  ];

  // Top products
  const topProducts = [
    { name: 'Wireless Earbuds Pro', sales: 45230, units: 892 },
    { name: 'Smart Watch Ultra', sales: 38900, units: 523 },
    { name: 'Laptop Stand Deluxe', sales: 32450, units: 1234 },
    { name: 'LED Desk Lamp', sales: 28700, units: 1567 },
    { name: 'Ergonomic Chair', sales: 25600, units: 234 }
  ];

  return { monthlySales, categoryData, regionData, segments, churnData, topProducts };
};

const EcommerceDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const data = useMemo(() => generateData(), []);

  const kpis = [
    { 
      label: 'Total Revenue', 
      value: '$847K', 
      change: '+23.5%', 
      icon: DollarSign, 
      color: 'bg-green-500' 
    },
    { 
      label: 'Total Orders', 
      value: '12,459', 
      change: '+18.2%', 
      icon: ShoppingCart, 
      color: 'bg-blue-500' 
    },
    { 
      label: 'Active Customers', 
      value: '5,432', 
      change: '+12.4%', 
      icon: Users, 
      color: 'bg-purple-500' 
    },
    { 
      label: 'Avg Order Value', 
      value: '$68', 
      change: '+4.3%', 
      icon: TrendingUp, 
      color: 'bg-orange-500' 
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'sales', label: 'Sales Analysis' },
    { id: 'customers', label: 'Customer Insights' },
    { id: 'churn', label: 'Churn Prediction' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          E-Commerce Analytics Dashboard
        </h1>
        <p className="text-slate-600">
          Real-time insights for data-driven business decisions
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-slate-200">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`px-4 py-2 font-medium transition-colors ${
              selectedTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpis.map((kpi, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600 text-sm font-medium">{kpi.label}</span>
              <div className={`${kpi.color} p-2 rounded-lg`}>
                <kpi.icon className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold text-slate-800">{kpi.value}</span>
              <span className="text-green-600 text-sm font-medium">{kpi.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Overview Tab */}
      {selectedTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Revenue Trend */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Monthly Revenue Trend
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={data.monthlySales}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                  formatter={(value) => `$${(value / 1000).toFixed(1)}K`}
                />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-sm text-slate-600 mt-2">
              💡 <strong>Insight:</strong> Revenue peaks during holiday season (Nov-Dec). Plan inventory accordingly.
            </p>
          </div>

          {/* Top Categories */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Top Product Categories
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={data.categoryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" stroke="#64748b" />
                <YAxis type="category" dataKey="category" stroke="#64748b" width={120} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                  formatter={(value) => `$${(value / 1000).toFixed(1)}K`}
                />
                <Bar dataKey="sales" fill="#10b981" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-sm text-slate-600 mt-2">
              💡 <strong>Recommendation:</strong> Focus marketing budget on top 3 categories for maximum ROI.
            </p>
          </div>

          {/* Regional Performance */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Revenue by Region
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={data.regionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="region" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                  formatter={(value) => `$${(value / 1000).toFixed(1)}K`}
                />
                <Bar dataKey="revenue" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-sm text-slate-600 mt-2">
              💡 <strong>Action Item:</strong> Investigate lower performance in underperforming regions.
            </p>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              Top Selling Products
            </h3>
            <div className="space-y-3">
              {data.topProducts.map((product, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-blue-600">#{i + 1}</span>
                    <div>
                      <p className="font-medium text-slate-800">{product.name}</p>
                      <p className="text-sm text-slate-600">{product.units} units sold</p>
                    </div>
                  </div>
                  <span className="font-semibold text-green-600">
                    ${(product.sales / 1000).toFixed(1)}K
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sales Analysis Tab */}
      {selectedTab === 'sales' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-slate-800">
                Sales Performance Analysis
              </h3>
              <select 
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg"
              >
                <option>All Regions</option>
                <option>North</option>
                <option>South</option>
                <option>East</option>
                <option>West</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={data.monthlySales}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis yAxisId="left" stroke="#64748b" />
                <YAxis yAxisId="right" orientation="right" stroke="#64748b" />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} name="Revenue ($)" />
                <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#10b981" strokeWidth={3} name="Orders" />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">📊 Key Findings:</h4>
              <ul className="space-y-1 text-sm text-blue-800">
                <li>• Revenue shows 23.5% YoY growth with strong Q4 performance</li>
                <li>• Average order value increased 4.3% indicating successful upselling</li>
                <li>• Holiday season (Nov-Dec) accounts for 35% of annual revenue</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Customer Insights Tab */}
      {selectedTab === 'customers' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Customer Segmentation (RFM Analysis)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.segments}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.segments.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {data.segments.map((seg, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: seg.color }}></div>
                    <span className="font-medium">{seg.name}</span>
                  </div>
                  <span className="text-slate-600">{seg.description}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Customer Lifetime Value Distribution
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-green-900">High Value (Top 20%)</span>
                  <span className="text-2xl font-bold text-green-600">$2,340</span>
                </div>
                <div className="w-full bg-green-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
                <p className="text-sm text-green-700 mt-2">1,086 customers • Avg 8.3 orders/year</p>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-blue-900">Medium Value (60%)</span>
                  <span className="text-2xl font-bold text-blue-600">$780</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
                <p className="text-sm text-blue-700 mt-2">3,259 customers • Avg 4.1 orders/year</p>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-orange-900">Low Value (20%)</span>
                  <span className="text-2xl font-bold text-orange-600">$180</span>
                </div>
                <div className="w-full bg-orange-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
                <p className="text-sm text-orange-700 mt-2">1,087 customers • Avg 1.2 orders/year</p>
              </div>
            </div>

            <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-2">🎯 Recommended Actions:</h4>
              <ul className="space-y-1 text-sm text-purple-800">
                <li>• Create VIP program for high-value segment (20%)</li>
                <li>• Re-engagement campaign for medium-value customers</li>
                <li>• Offer incentives to boost low-value segment frequency</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Churn Prediction Tab */}
      {selectedTab === 'churn' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              Customer Churn Risk Analysis
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.churnData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="segment" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
                <Bar dataKey="customers" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 rounded-lg p-6 border-2 border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-green-900">Low Risk</h4>
                  <p className="text-2xl font-bold text-green-600">68%</p>
                </div>
              </div>
              <p className="text-sm text-green-800">3,420 customers with regular purchase patterns</p>
            </div>

            <div className="bg-orange-50 rounded-lg p-6 border-2 border-orange-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">!</span>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-900">Medium Risk</h4>
                  <p className="text-2xl font-bold text-orange-600">20%</p>
                </div>
              </div>
              <p className="text-sm text-orange-800">980 customers with declining activity</p>
            </div>

            <div className="bg-red-50 rounded-lg p-6 border-2 border-red-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">⚠</span>
                </div>
                <div>
                  <h4 className="font-semibold text-red-900">High Risk</h4>
                  <p className="text-2xl font-bold text-red-600">12%</p>
                </div>
              </div>
              <p className="text-sm text-red-800">600 customers likely to churn soon</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
            <h4 className="font-semibold text-slate-800 mb-4">🤖 ML Model Insights & Retention Strategy</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-slate-700 mb-3">Churn Indicators (Feature Importance):</h5>
                <div className="space-y-2">
                  {[
                    { feature: 'Days Since Last Purchase', importance: 92 },
                    { feature: 'Order Frequency Drop', importance: 85 },
                    { feature: 'Cart Abandonment Rate', importance: 78 },
                    { feature: 'Customer Service Contacts', importance: 65 },
                    { feature: 'Email Engagement', importance: 58 }
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-700">{item.feature}</span>
                        <span className="font-medium">{item.importance}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" 
                          style={{ width: `${item.importance}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="font-medium text-slate-700 mb-3">Recommended Retention Tactics:</h5>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                    <p className="font-medium text-red-900 mb-1">High Risk Customers (600)</p>
                    <ul className="text-sm text-red-800 space-y-1">
                      <li>• Send personalized win-back offers (20% discount)</li>
                      <li>• Priority customer support outreach</li>
                      <li>• Exclusive early access to new products</li>
                    </ul>
                  </div>

                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <p className="font-medium text-orange-900 mb-1">Medium Risk Customers (980)</p>
                    <ul className="text-sm text-orange-800 space-y-1">
                      <li>• Re-engagement email campaigns</li>
                      <li>• Product recommendations based on history</li>
                      <li>• Limited-time loyalty rewards</li>
                    </ul>
                  </div>

                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="font-medium text-green-900 mb-1">Estimated Impact</p>
                    <p className="text-sm text-green-800">
                      Reducing churn by 5% could save <strong>$127K annually</strong> in revenue
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-slate-600">
        <p>📊 Built with React, Recharts | 🔍 Data: Simulated E-Commerce Dataset | 🛠️ Skills: SQL, Python, ML, BI Tools</p>
      </div>
    </div>
  );
};

export default EcommerceDashboard;