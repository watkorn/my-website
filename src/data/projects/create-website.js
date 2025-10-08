const createWebsite = {
  id: 1,
  slug: "create-website",
  title: "My Website",
  category: "Web",
  desc: "Step-by-step guide to building a portfolio website",
  github: "https://github.com/watkorn/my-website",
  screenshots: [
    { src: process.env.PUBLIC_URL + "/screenshot_light.png", alt: "Light theme screenshot", label: "Light Theme" },
    { src: process.env.PUBLIC_URL + "/screenshot_dark.png", alt: "Dark theme screenshot", label: "Dark Theme" }
  ],
  render: () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Why This Website?</h2>
      <p>
        This portfolio demonstrates my projects, blogs, and skills in a clean, modern, and responsive design.
        It works on any device and supports both light and dark themes.
      </p>

      <h2 className="text-2xl font-semibold">Key Features</h2>
      <ul className="list-disc list-inside space-y-1">
        <li>Responsive layout with left-side navigation</li>
        <li>Light and dark theme toggle</li>
        <li>Reusable components for consistency</li>
        <li>Easy to add new projects or blogs</li>
      </ul>

      <h2 className="text-2xl font-semibold">Design Choices</h2>
      <p>
        Built with React and Tailwind CSS for dynamic, fast, and maintainable styling.
        Screenshots above show light and dark themes.
      </p>

      <h2 className="text-2xl font-semibold">Next Steps</h2>
      <ul className="list-disc list-inside space-y-1">
        <li>Add more projects and blog articles</li>
        <li>Optimize images and performance</li>
        <li>Deploy live to GitHub Pages, Vercel, or Netlify</li>
      </ul>
    </div>
  ),
};

export default createWebsite;
