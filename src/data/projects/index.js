// src/data/projects/index.js

// require.context: ดึงทุกไฟล์ .js ในโฟลเดอร์ปัจจุบัน ยกเว้น index.js
const requireProject = require.context('./', false, /^\.\/(?!index).*\.js$/);

const projects = requireProject.keys().map((filePath) => {
  const module = requireProject(filePath).default;
  const fileName = filePath.replace('./', '').replace('.js', '');
  return {
    ...module,
    fileName,
  };
}).sort((a, b) => a.id - b.id);

// จัดกลุ่มตาม category
export const sortedCategories = projects.reduce((acc, p) => {
  const categoryEntry = acc.find(c => c.category === p.category);
  if (categoryEntry) {
    categoryEntry.data.push(p);
  } else {
    acc.push({ category: p.category, data: [p] });
  }
  return acc;
}, []).map(c => ({
  ...c,
  data: c.data.sort((a, b) => a.id - b.id),
}));

export { projects };
