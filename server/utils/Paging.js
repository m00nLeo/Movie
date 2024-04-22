const PAGE_SIZE = 20; // Kích thước trang mặc định

function paginate(data, currentPage, selectedGenreId) {
  // const totalPages = Math.ceil(data?.length / PAGE_SIZE);
  // const pages = [];
  // const currentPage = page || 1;

  // for (let i = 0; i < totalPages; i++) {
  //   const startIndex = i * PAGE_SIZE;
  //   const endIndex = Math.min((i + 1) * PAGE_SIZE, data.length);
  //   const currentPage = data.slice(startIndex, endIndex);
  //   pages.push(currentPage);
  // }

  // return {
  //   results: pages,
  //   total_Pages: totalPages,
  //   page: currentPage, // Trang hiện tại (mặc định là trang đầu tiên)
  //   data: pages[0],
  // };
  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = Math.min(currentPage * PAGE_SIZE, data.length);
  const currentPageData = data.slice(startIndex, endIndex);

  return {
    data,
    result: currentPageData,
    page: currentPage,
    total_Pages: totalPages,
    genre_name: selectedGenreId,
  };
}

module.exports = {
  paginate,
  PAGE_SIZE,
};
