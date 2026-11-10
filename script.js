let currentUser = localStorage.getItem("miniTwitterUser") || "";

let posts = JSON.parse(
  localStorage.getItem("miniTwitterPosts") || "[]"
);

const usernameInput = document.getElementById("postText");
const feed = document.getElementById("feed");

document.getElementById("loginBtn").addEventListener("click", login);
document.getElementById("postBtn").addEventListener("click", createPost);

function login() {
  if (currentUser) {
    alert("You are logged in as @" + currentUser);
    return;
  }

  const username = prompt("Enter your username:");

  if (!username || !username.trim()) return;

  currentUser = username.trim();

  localStorage.setItem("miniTwitterUser", currentUser);

  updateProfile();
}

function updateProfile() {
  const name = currentUser || "Guest User";

  document.getElementById("sideName").textContent = name;
  document.getElementById("sideHandle").textContent =
    currentUser ? "@" + currentUser : "@guest";

  document.querySelectorAll(".avatar").forEach(avatar => {
    avatar.textContent = name.charAt(0).toUpperCase();
  });

  document.getElementById("loginBtn").textContent =
    currentUser ? "Logged In ✓" : "Login";
}

function focusPost() {
  usernameInput.focus();
}

function createPost() {
  if (!currentUser) {
    alert("Please login first!");
    return;
  }

  const content = usernameInput.value.trim();

  if (!content) {
    alert("Please write something!");
    return;
  }

  const post = {
    id: Date.now(),
    author: currentUser,
    content: content,
    likes: 0,
    createdAt: new Date().toLocaleString()
  };

  posts.unshift(post);

  savePosts();

  usernameInput.value = "";

  displayPosts();
}

function likePost(id) {
  posts = posts.map(post => {
    if (post.id === id) {
      post.likes++;
    }

    return post;
  });

  savePosts();
  displayPosts();
}

function savePosts() {
  localStorage.setItem(
    "miniTwitterPosts",
    JSON.stringify(posts)
  );
}

function displayPosts(searchText = "") {
  feed.innerHTML = "";

  const filteredPosts = posts.filter(post =>
    post.content.toLowerCase().includes(searchText.toLowerCase()) ||
    post.author.toLowerCase().includes(searchText.toLowerCase())
  );

  if (filteredPosts.length === 0) {
    feed.innerHTML =
      '<div class="empty-feed">No posts found. Start a conversation! ✨</div>';
    return;
  }

  filteredPosts.forEach(post => {
    const article = document.createElement("article");
    article.className = "post";

    const header = document.createElement("div");
    header.className = "post-header";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = post.author.charAt(0).toUpperCase();

    const userInfo = document.createElement("div");

    const name = document.createElement("div");
    name.className = "post-user";
    name.textContent = "@" + post.author;

    const date = document.createElement("div");
    date.className = "post-date";
    date.textContent = post.createdAt;

    userInfo.append(name, date);
    header.append(avatar, userInfo);

    const content = document.createElement("p");
    content.className = "post-content";
    content.textContent = post.content;

    const actions = document.createElement("div");
    actions.className = "post-actions";

    const likeButton = document.createElement("button");
    likeButton.className = "like-button";
    likeButton.textContent = "♥ " + post.likes + " Likes";

    likeButton.addEventListener("click", () => {
      likePost(post.id);
    });

    actions.appendChild(likeButton);

    article.append(header, content, actions);
    feed.appendChild(article);
  });
}

document.getElementById("searchInput").addEventListener("input", event => {
  displayPosts(event.target.value);
});

updateProfile();
displayPosts();