import React, { useState, useEffect, useMemo } from 'react';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Sector
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { X, ShoppingBag, Wallet2, Truck, Gamepad2, Maximize2 } from 'lucide-react';

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, value } = props;
  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill="#ffffff" fontSize={18} fontWeight={900} fontFamily="monospace">
        ${value}
      </text>
      <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius + 8} startAngle={startAngle} endAngle={endAngle} fill={fill} />
      <Sector cx={cx} cy={cy} startAngle={startAngle} endAngle={endAngle} innerRadius={outerRadius + 12} outerRadius={outerRadius + 15} fill={fill} />
    </g>
  );
};

const ChartContent = ({ data, size = 'normal', activeIndex, onPieEnter, onPieClick, setActiveIndex }) => {
  if (!data || !data.length) return null;
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={size === 'large' ? 100 : 70}
          outerRadius={size === 'large' ? 140 : 95}
          paddingAngle={15}
          dataKey="value"
          stroke="none"
          onMouseEnter={onPieEnter}
          onMouseLeave={() => setActiveIndex(-1)}
          onClick={onPieClick}
          cursor="pointer"
          isAnimationActive={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div style={{ background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 16, padding: '10px 16px' }}>
                  <p style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 2, color: '#a78bfa', marginBottom: 4 }}>{payload[0].name}</p>
                  <p style={{ fontSize: 18, fontWeight: 900, color: '#fff', fontFamily: 'monospace' }}>${payload[0].value}</p>
                </div>
              );
            }
            return null;
          }}
        />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};


const ExpandModal = ({ onClose, dynamicData, activeIndex, setActiveIndex, setSelectedDetail }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const total = dynamicData.reduce((a, b) => a + b.value, 0);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
     
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(16px)' }}
      />

     
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 960,
          maxHeight: '90vh',
          background: 'linear-gradient(135deg, #1e1e2e 0%, #16162a 100%)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 40,
          padding: '2.5rem',
          zIndex: 10,
          boxShadow: '0 50px 100px rgba(0,0,0,0.6)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
       
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: 24, right: 24, width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', zIndex: 20 }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(139,92,246,0.6)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
        >
          <X size={20} />
        </button>

        
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', margin: 0 }}>Detailed Analysis</h2>
          <p style={{ fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.4em', color: 'rgba(255,255,255,0.3)', marginTop: 8 }}>Neural Spending Engine</p>
        </div>

       
        <div style={{ flex: 1, display: 'flex', flexDirection: 'row', gap: '2rem', minHeight: 0, height: 380 }}>

        
          <div style={{ flex: 1, height: '100%', minHeight: 320 }}>
            <ChartContent
              data={dynamicData}
              size="large"
              activeIndex={activeIndex}
              onPieEnter={(_, index) => setActiveIndex(index)}
              onPieClick={(data) => setSelectedDetail(data)}
              setActiveIndex={setActiveIndex}
            />
          </div>

          {/* Breakdown list */}
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 28, padding: '1.5rem', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
            <p style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.35)', marginBottom: 16 }}>Category Breakdown</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
              {dynamicData.map((item, idx) => (
                <div
                  key={item.name}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onMouseLeave={() => setActiveIndex(-1)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: 16,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    background: activeIndex === idx ? 'rgba(255,255,255,0.1)' : 'transparent',
                    transform: activeIndex === idx ? 'scale(1.02)' : 'scale(1)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 14, height: 14, borderRadius: '50%', background: item.color, boxShadow: `0 0 8px ${item.color}80` }} />
                    <span style={{ fontSize: 14, fontWeight: 900, color: 'rgba(255,255,255,0.85)' }}>{item.name}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: 13, fontWeight: 900, color: '#fff', fontFamily: 'monospace', margin: 0 }}>${item.value.toLocaleString()}</p>
                    <p style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: 1, margin: 0 }}>
                      {total > 0 ? ((item.value / total) * 100).toFixed(1) : 0}%
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: 2, margin: 0 }}>
                Total Spending
              </p>
              <p style={{ fontSize: 22, fontWeight: 900, color: '#fff', fontFamily: 'monospace', margin: '4px 0 0' }}>
                ${total.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};


const DetailModal = ({ selectedDetail, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 30 }}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 380,
          background: 'linear-gradient(135deg, #1e1e2e 0%, #16162a 100%)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 32,
          padding: '2rem',
          zIndex: 10,
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, transparent, #7c3aed, transparent)' }} />
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: 16, right: 16, width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}
        >
          <X size={16} />
        </button>
        <div style={{ textAlign: 'center', padding: '1rem 0' }}>
          <div style={{ width: 80, height: 80, borderRadius: 24, background: 'rgba(124,58,237,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <ShoppingBag size={36} color="#7c3aed" />
          </div>
          <p style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>{selectedDetail.name}</p>
          <p style={{ fontSize: 52, fontWeight: 900, color: '#fff', fontFamily: 'monospace', letterSpacing: '-0.03em', margin: 0 }}>${selectedDetail.value?.toLocaleString()}</p>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 16, lineHeight: 1.6 }}>
            Spending intelligence for <strong style={{ color: '#7c3aed' }}>{selectedDetail.name}</strong> processed in real-time.
          </p>
          <button style={{ marginTop: 24, width: '100%', padding: '14px', background: '#7c3aed', color: '#fff', border: 'none', borderRadius: 20, fontWeight: 900, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.15em', cursor: 'pointer', boxShadow: '0 8px 24px rgba(124,58,237,0.4)' }}>
            Generate Report
          </button>
        </div>
      </motion.div>
    </div>
  );
};


const PieChart = () => {
  const { transactions } = useStore();
  const [activeIndex, setActiveIndex] = useState(-1);
  const [enlarge, setEnlarge] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);

  const dynamicData = useMemo(() => {
    const categories = {
      'Food':          { value: 0, color: '#2563eb', icon: Wallet2 },
      'Shopping':      { value: 0, color: '#db2777', icon: ShoppingBag },
      'Transport':     { value: 0, color: '#ea580c', icon: Truck },
      'Entertainment': { value: 0, color: '#7c3aed', icon: Gamepad2 },
      'Entertain':     { value: 0, color: '#7c3aed', icon: Gamepad2 },
    };
    transactions.forEach(tx => {
      if (tx.type === 'expense' && categories[tx.category]) {
        categories[tx.category].value += Math.abs(tx.amount);
      }
    });
    return Object.entries(categories)
      .map(([name, data]) => ({ name, ...data, value: Math.round(data.value) }))
      .filter(d => d.value > 0);
  }, [transactions]);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.005 }}
        className="w-full h-[450px] glass-card p-8 group relative overflow-visible flex flex-col hover:border-theme/40 transition-all duration-500 GlowingBorder"
      >
        <div className="flex justify-between items-center mb-6 z-10">
          <div>
            <h3 className="text-sm font-black uppercase text-text/40 tracking-[0.2em]">Spending Intel</h3>
            <p className="text-[10px] font-black text-text/20 uppercase tracking-widest mt-1">Live Analytics</p>
          </div>
          <button
            onClick={() => setEnlarge(true)}
            className="p-3 bg-theme/10 text-theme rounded-2xl hover:bg-theme hover:text-white transition-all shadow-lg active:scale-95"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 min-h-0 w-full relative z-10 flex items-center justify-center">
          {dynamicData.length > 0 ? (
            <ChartContent
              data={dynamicData}
              activeIndex={activeIndex}
              onPieEnter={(_, index) => setActiveIndex(index)}
              onPieClick={(data) => setSelectedDetail(data)}
              setActiveIndex={setActiveIndex}
            />
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-theme/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-theme/10">
                <ShoppingBag className="w-6 h-6 text-theme/20" />
              </div>
              <p className="text-[10px] font-black text-text/20 uppercase tracking-[0.2em]">No Intelligence Collected</p>
            </div>
          )}
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-theme/5 blur-[100px] rounded-full pointer-events-none transition-all group-hover:bg-theme/10" />
      </motion.div>

      <AnimatePresence>
        {enlarge && (
          <ExpandModal
            onClose={() => setEnlarge(false)}
            dynamicData={dynamicData}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            setSelectedDetail={setSelectedDetail}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedDetail && (
          <DetailModal
            selectedDetail={selectedDetail}
            onClose={() => setSelectedDetail(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default PieChart;