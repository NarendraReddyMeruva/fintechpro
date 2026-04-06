import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { useStore } from '../../store/useStore';

const LineChart = () => {
  const themeColor = useStore(state => state.themeColor);
  const chartData = useStore(state => state.chartData) || { daily: [], monthly: [], yearly: [] };
  const [scale, setScale] = React.useState('monthly');

  const currentData = chartData[scale] || chartData.monthly || [];

  return (
    <div className="w-full h-[400px] glass-card p-8 border-none overflow-visible flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div>
           <h3 className="text-sm font-black uppercase text-text/40 tracking-widest">Balance Trend</h3>
           <p className="text-[10px] font-bold text-theme uppercase mt-1 tracking-tight">{scale} analytics active</p>
        </div>
        <div className="flex bg-text/5 p-1 rounded-2xl border border-white/5">
           {['daily', 'monthly', 'yearly'].map((s) => (
             <button 
               key={s}
               onClick={() => setScale(s)}
               className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
                 scale === s ? 'bg-theme text-white shadow-lg' : 'text-text/40 hover:text-theme'
               }`}
             >
               {s}
             </button>
           ))}
        </div>
      </div>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={currentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={themeColor} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={themeColor} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--text-color)" opacity={0.05} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'var(--text-color)', opacity: 0.5, fontSize: 10, fontWeight: 'bold' }} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'var(--text-color)', opacity: 0.5, fontSize: 10, fontWeight: 'bold' }} 
            />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '20px', 
                border: '1px solid rgba(255,255,255,0.1)', 
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)', 
                backgroundColor: 'rgba(var(--card-bg-rgb), 0.8)',
                backdropFilter: 'blur(16px)',
                color: 'var(--text-color)',
                padding: '12px'
              }} 
              itemStyle={{ fontWeight: 'black', color: 'var(--text-color)', fontSize: '12px' }}
              labelStyle={{ fontWeight: 'black', color: 'var(--theme-color)', marginBottom: '4px', fontSize: '10px', textTransform: 'uppercase' }}
            />
            <Area 
              type="monotone" 
              dataKey="balance" 
              stroke={themeColor} 
              strokeWidth={4}
              fillOpacity={1} 
              fill="url(#colorBalance)" 
              animationDuration={1000}
              key={scale} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChart;
