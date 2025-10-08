// src/components/DetailTemplate.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function DetailTemplate({ meta, type, allMeta }) {
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(Boolean(meta));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!meta) return;

    setLoading(true);
    setError(null);

    import(`../data/${type}s/${meta.slug}.js`)
      .then((mod) => {
        const data = mod.default ?? mod;
        setContent(data);
      })
      .catch((err) => {
        console.error("Failed to load content:", err);
        setError("ไม่สามารถโหลดเนื้อหาได้");
        setContent(null);
      })
      .finally(() => setLoading(false));
  }, [meta, type]);

  if (!meta) return <div className="p-6">ไม่พบ {type}</div>;
  if (loading) return <div className="p-6">Loading…</div>;

  // Filter prev/next
  const siblings =
    type === "blog"
      ? allMeta.filter((b) => b.year === meta.year).sort((a, b) => a.id - b.id)
      : allMeta.filter((p) => p.category === meta.category).sort((a, b) => a.id - b.id);

  const currentIndex = siblings.findIndex((s) => s.slug === meta.slug);
  const prevMeta = siblings[currentIndex - 1];
  const nextMeta = siblings[currentIndex + 1];

  const navClass = prevMeta && nextMeta ? "nav-buttons both" : "nav-buttons single";
  const btnClass = "btn";

  return (
    <div className="flex-1 flex justify-center">
      <Helmet>
        <title>{meta.title}</title>
        {meta.desc && <meta name="description" content={meta.desc} />}
      </Helmet>

      <div className="app-center-container max-w-4xl w-full bg-gray-50 dark:bg-gray-895 text-gray-900 dark:text-gray-200 px-4 py-6 space-y-8">
        {/* Back button */}
        <div>
          <button
            onClick={() => navigate(type === "blog" ? "/blogs" : "/projects")}
            className={btnClass}
          >
            ← Back to {type === "blog" ? "Blogs" : "Projects"}
          </button>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center">{meta.title}</h1>
        {meta.desc && (
          <p className="text-center text-gray-500 dark:text-gray-400">{meta.desc}</p>
        )}

        {/* Screenshots */}
        {content?.screenshots?.length > 0 ? (
          <section className="flex flex-col md:flex-row gap-6 justify-center items-center">
            {content.screenshots.map((shot, i) => (
              <div key={i} className="flex flex-col items-center">
                <img
                  src={shot.src}
                  alt={shot.alt}
                  className="w-full max-w-lg rounded-lg shadow-md"
                />
                <span className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {shot.label}
                </span>
              </div>
            ))}
          </section>
        ) : null}

        {/* Render content */}
        <section className="space-y-4">
          {error ? (
            <div className="text-red-600">{error}</div>
          ) : content?.render ? (
            content.render()
          ) : (
            <p>{content?.desc || "ไม่มีเนื้อหา"}</p>
          )}
        </section>

        {/* Prev / Next */}
        <div className="mt-6 flex w-full">
          {prevMeta && (
            <div className="flex-1 text-left">
              <button
                onClick={() =>
                  navigate(`/${type === "blog" ? "blogs" : "projects"}/${prevMeta.slug}`)
                }
                className={btnClass}
              >
                ← Previous
              </button>
            </div>
          )}
          {nextMeta && (
            <div className="flex-1 text-right">
              <button
                onClick={() =>
                  navigate(`/${type === "blog" ? "blogs" : "projects"}/${nextMeta.slug}`)
                }
                className={btnClass}
              >
                Next →
              </button>
            </div>
          )}
        </div>
        
        {/* GitHub */}
        {meta.github && (
          <p className="mt-4 text-center text-blue-600 dark:text-blue-400">
            More Info:{" "}
            <a href={meta.github} target="_blank" rel="noopener noreferrer">
              {meta.github}
            </a>
          </p>
        )}

        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          Created on {new Date().toLocaleDateString()}.
        </p>
      </div>
    </div>
  );
}
