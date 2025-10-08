// src/pages/Blogs.jsx
import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import ScrollToTop from "../components/ScrollToTop";
import { sortedYears } from "../data/blogs";
import PageWrapper from "../components/PageWrapper";

const ITEMS_PER_LOAD = 5;

export default function Blogs() {
  const [visibleCounts, setVisibleCounts] = useState(() =>
    sortedYears.reduce((acc, y) => ({ ...acc, [y.year]: ITEMS_PER_LOAD }), {})
  );

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setVisibleCounts(
      sortedYears.reduce((acc, y) => ({ ...acc, [y.year]: ITEMS_PER_LOAD }), {})
    );
  }, [sortedYears]);

  const handleLoadMore = (year) => {
    setVisibleCounts((prev) => ({
      ...prev,
      [year]: Math.min(
        prev[year] + ITEMS_PER_LOAD,
        sortedYears.find((y) => y.year === year).data.length
      ),
    }));
  };

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const hdr = document.querySelector("header");
    const offset = (hdr ? hdr.offsetHeight : 0) + 12;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <PageWrapper title="Blogs & Articles">
      {/* ---------- Desktop floating tool buttons ---------- */}
      <div className="floating-tools hidden lg:flex flex-col fixed top-1/3 left-0 w-28 z-30 space-y-3 items-center">
        {sortedYears.map(({ year }) => (
          <button
            key={year}
            onClick={() => scrollToId(`year-${year}`)}
            className="floating-tool-btn"
            title={year}
          >
            {year}
          </button>
        ))}
      </div>

      {/* ---------- Mobile floating button ---------- */}
      <button
        className="leftnav-mobile-btn lg:hidden"
        onClick={() => setMobileMenuOpen((s) => !s)}
        aria-label="Open years"
      >
        {new Date().getFullYear()}
      </button>

      {mobileMenuOpen && (
        <div className="fixed left-4 bottom-20 z-40 w-56 p-3 bg-white dark:bg-[#0F172A] rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <strong className="text-sm">Years</strong>
            <button onClick={() => setMobileMenuOpen(false)} className="text-sm px-2">
              Close
            </button>
          </div>
          <div className="flex flex-col space-y-2">
            {sortedYears.map(({ year }) => (
              <button
                key={year}
                onClick={() => {
                  setMobileMenuOpen(false);
                  setTimeout(() => scrollToId(`year-${year}`), 150);
                }}
                className="text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ---------- Main content ---------- */}
      <div className="page-container flex">
        <div className="left-nav w-28" aria-hidden="true" />
        <main className="page-main flex-1 mx-auto max-w-6xl px-4">
          <h1 className="page-title text-center mb-8">Blogs & Articles</h1>

          {sortedYears.map(({ year, data }) => (
            <section
              key={year}
              id={`year-${year}`}
              className="flex flex-col gap-6 scroll-mt-[var(--header-height)]"
            >
              <h2 className="text-2xl font-bold text-center">{year}</h2>

              <div className="card-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
                {data.slice(0, visibleCounts[year]).map((blog) => (
                  <Card
                    key={blog.id}
                    id={blog.id}
                    title={blog.title}
                    desc={blog.desc}
                    type="blog"
                    slug={blog.slug}
                  />
                ))}
              </div>

              {visibleCounts[year] < data.length && (
                <div className="load-more flex justify-center">
                  <button onClick={() => handleLoadMore(year)} className="btn">
                    Load More
                  </button>
                </div>
              )}
            </section>
          ))}

          <ScrollToTop />
        </main>
      </div>
    </PageWrapper>
  );
}
