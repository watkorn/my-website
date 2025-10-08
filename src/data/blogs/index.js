// src/data/blogs/index.js

// require.context: ดึงทุกไฟล์ .js ในโฟลเดอร์นี้ ยกเว้น index.js
const requireBlog = require.context('./', false, /^\.\/(?!index).*\.js$/);

const blogs = requireBlog.keys().map((filePath) => {
  const module = requireBlog(filePath).default;
  const fileName = filePath.replace('./', '').replace('.js', '');
  return {
    ...module,
    fileName, // ใส่ชื่อไฟล์
  };
}).sort((a, b) => a.id - b.id);

// จัดกลุ่มตามปี
export const sortedYears = blogs.reduce((acc, blog) => {
  const yearEntry = acc.find(y => y.year === blog.year);
  if (yearEntry) {
    yearEntry.data.push(blog);
  } else {
    acc.push({ year: blog.year, data: [blog] });
  }
  return acc;
}, []).sort((a, b) => b.year - a.year);

export { blogs };
