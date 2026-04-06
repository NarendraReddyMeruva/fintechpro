import React from 'react';
import { useStore } from '../store/useStore';

const StocksPage = () => {
  const stocks = useStore(state => state.stocks) || [];
  
  return (
    <div className="p-20 text-text">
      <h1 className="text-4xl font-black">Stock Portfolio (Debug Mode)</h1>
      <p className="mt-4 opacity-70">If you see this, the routing is working.</p>
      <div className="mt-10 grid gap-4">
        {stocks.map(s => (
          <div key={s.symbol} className="p-4 glass-card">
            {s.name} ({s.symbol}) - ${s.price}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StocksPage;
