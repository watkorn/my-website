// src/components/PageWrapper.jsx
import React from "react";
import { Helmet } from "react-helmet-async";

export default function PageWrapper({ title, children }) {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 py-6">{children}</div>
    </>
  );
}
