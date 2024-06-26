// API
let $ = document;
let DATA;
let PageData;
const postRequest = new XMLHttpRequest();
postRequest.open("GET", "https://jsonplaceholder.typicode.com/posts");
postRequest.addEventListener("load", getPostData);
postRequest.send();

function getPostData() {
  let data = JSON.parse(postRequest.responseText);
  const pageData = getPostsInfo(data);
  DATA = data;
  PageData = pageData;
  renderPage(pageData);
  console.log(DATA);
}

function renderPage(pageData) {
  renderPostData(pageData.posts);
  renderPagnation(pageData);
}
// function

function renderPostData(list) {
  let template = list
    .map((post) => {
      return `
            <div class="posts">
            <span> user ID : ${post.userId}</span>
            <h3>${post.title}</h3>
            <p>${post.body}</p>
        `;
    })
    .join("");

  $.querySelector(".root").innerHTML = template;
}

function renderPagnation(pageInfo) {
  let template = `  <li class="page-item${
    !pageInfo.pageInfo.pervPage ? " disabled " : ""
  }" data-page="-1" onclick="pageChange(this)">
            <a class="page-link" href="#" tabindex="-1">Previous</a>
          </li>
`;
  for (let page = 0; page < pageInfo.pageInfo.maxPage; page++) {
    const isActivePage = page == pageInfo.pageInfo.currentPage;
    const activeContent = isActivePage
      ? `<span class="sr-only">(current)</span>`
      : "";
    template += `
          <li class="page-item${
            isActivePage ? " active " : ""
          }" data-page="${page}" onclick="pageChange(this)"><a class="page-link" href="#">${
      page + 1
    } ${activeContent}</a></li>
        `;
  }

  template += `
  <li class="page-item${
    !pageInfo.pageInfo.nextPage ? " disabled " : ""
  }" data-page="+1" onclick="pageChange(this)">
            <a class="page-link" href="#">Next</a>
          </li>
  `;

  $.querySelector(".pagination").innerHTML = template;
}
function getPostsInfo(data = [], page = 0, per = 10) {
  const maxPostsNum = data.length;
  const maxPage = Math.ceil(maxPostsNum / per);
  const skip = page * per;
  const posts = data.slice(skip, skip + per);
  const nextPage = (page + 1) * per > maxPostsNum ? null : page + 1;
  const pervPage = page - 1 < 0 ? null : page - 1;

  return {
    maxPostsNum,
    pageInfo: {
      currentPage: page,
      pervPage,
      nextPage,
      maxPage,
    },
    posts,
  };
}

function pageChange(elm) {
  const page = elm.dataset.page;
  let newPage = 0;
  const isDisabled = elm.classList.contains("disabled");
  if (isDisabled) return;
  if (page == PageData.pageInfo.currentPage) return;
  if (page == "-1") {
    newPage = PageData.pageInfo.currentPage - 1;
  } else if (page == "+1") {
    newPage = PageData.pageInfo.currentPage + 1;
  } else {
    newPage = page;
  }
  const pageData = getPostsInfo(DATA, newPage);
  PageData = pageData;
  renderPage(pageData);
}
