import React from 'react';

function LoadingFallback({ chunkName = 'Route Component' }) {
  return (
    <div className="fallback-box">
      <div className="spinner"></div>
      <div className="fallback-text">Fetching On-Demand Bundle Chunk</div>
      <div className="fallback-sub">React.lazy() &lt;Suspense&gt; fetching [{chunkName}.chunk.js]</div>
    </div>
  );
}

export default LoadingFallback;
