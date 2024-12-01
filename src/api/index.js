const postsData = {
  notice: Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `Notice Post ${i + 1}`,
    content: `Content of Notice Post ${i + 1}`,
    date: `2024-11-${i + 1}`.padStart(2, "0"),
  })),
  discussion: Array.from({ length: 20 }, (_, i) => ({
    id: i + 11,
    title: `Discussion Post ${i + 1}`,
    content: `Content of Discussion Post ${i + 1}`,
    date: `2024-11-${i + 11}`.padStart(2, "0"),
  })),
};

export const fetchPosts = (type) => {
  return Promise.resolve(postsData[type]);
};

export const fetchPostById = (id) => {
  const allPosts = [...postsData.notice, ...postsData.discussion];
  return Promise.resolve(allPosts.find((post) => post.id === parseInt(id)));
};
