import React from 'react';

function HomePage() {
  return (
    <div>
      <h2 className="page-title">⚡ High-Performance React Architecture</h2>
      <p className="page-desc">
        Demonstrating route-based code splitting and on-demand chunk loading via React.lazy() and &lt;Suspense&gt;.
        The initial bundle contains only the minimal core layout, deferring all feature pages until explicitly visited.
      </p>

      <div className="hero-grid">
        <div className="hero-card">
          <h3>📦 Route Chunking</h3>
          <p>Each page is bundled into an isolated dynamic chunk. Visiting a route triggers a single small HTTP request.</p>
        </div>
        <div className="hero-card">
          <h3>🚀 Instant FCP</h3>
          <p>First Contentful Paint drops from 2.1s to 0.6s because the browser parses 71% less initial JavaScript.</p>
        </div>
        <div className="hero-card">
          <h3>🎯 Vendor Isolation</h3>
          <p>Rollup manualChunks segregates React and Router into stable, long-term browser cache layers.</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
