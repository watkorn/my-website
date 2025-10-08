// src/pages/Projects.jsx
import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import ScrollToTop from "../components/ScrollToTop";
import { sortedCategories } from "../data/projects";
import PageWrapper from "../components/PageWrapper";

const ITEMS_PER_LOAD = 5;

export default function Projects() {
  const [visibleCounts, setVisibleCounts] = useState(() =>
    sortedCategories.reduce((acc, c) => ({ ...acc, [c.category]: ITEMS_PER_LOAD }), {})
  );

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setVisibleCounts(
      sortedCategories.reduce((acc, c) => ({ ...acc, [c.category]: ITEMS_PER_LOAD }), {})
    );
  }, [sortedCategories]);

  const handleLoadMore = (category) => {
    setVisibleCounts((prev) => ({
      ...prev,
      [category]: Math.min(
        prev[category] + ITEMS_PER_LOAD,
        sortedCategories.find((c) => c.category === category).data.length
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
    <PageWrapper title="Projects">
      <div className="relative bg-gray-50 dark:bg-gray-895 text-gray-900 dark:text-gray-200">
        {/* Desktop floating tools */}
        <div className="floating-tools hidden lg:flex flex-col fixed top-1/3 left-0 w-28 z-30 space-y-3 items-center">
          {sortedCategories.map(({ category }) => (
            <button
              key={category}
              onClick={() => scrollToId(`category-${category}`)}
              className="floating-tool-btn"
              title={category}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Mobile floating button */}
        <button
          className="leftnav-mobile-btn lg:hidden"
          onClick={() => setMobileMenuOpen((s) => !s)}
          aria-label="Open categories"
        >
          Jump
        </button>

        {mobileMenuOpen && (
          <div className="fixed left-4 bottom-20 z-40 w-56 p-3 bg-white dark:bg-[#0F172A] rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <strong className="text-sm">Categories</strong>
              <button onClick={() => setMobileMenuOpen(false)} className="text-sm px-2">Close</button>
            </div>
            <div className="flex flex-col space-y-2">
              {sortedCategories.map(({ category }) => (
                <button
                  key={category}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setTimeout(() => scrollToId(`category-${category}`), 150);
                  }}
                  className="text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main page container */}
        <div className="page-container">
          <div className="left-nav" aria-hidden="true" />
          <main className="page-main">
            <h1 className="page-title text-center mb-8">Projects</h1>
            {sortedCategories.map(({ category, data }) => (
              <section
                key={category}
                id={`category-${category}`}
                className="flex flex-col gap-6 scroll-mt-20 mb-12"
              >
                <h2 className="text-2xl font-bold">{category}</h2>

                <div className="card-grid">
                  {data.slice(0, visibleCounts[category]).map((project) => (
                    <Card
                      key={project.id}
                      id={project.id}
                      title={project.title}
                      desc={project.desc}
                      type="project"
                      slug={project.slug}
                    />
                  ))}
                </div>

                {visibleCounts[category] < data.length && (
                  <div className="load-more">
                    <button
                      onClick={() => handleLoadMore(category)}
                      className="btn"
                    >
                      Load More
                    </button>
                  </div>
                )}
              </section>
            ))}

            <ScrollToTop />
          </main>
        </div>
      </div>
    </PageWrapper>
  );
}
