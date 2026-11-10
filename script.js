// Load saved posts when the page opens
document.addEventListener("DOMContentLoaded", () => {
    loadPosts();
});


// CREATE NEW POST
function addPost() {
    const postInput = document.getElementById("postText");
    const postText = postInput.value.trim();

    if (postText === "") {
        alert("Please write something before posting!");
        return;
    }

    const post = {
        id: Date.now(),
        text: postText,
        likes: 0,
        time: "Just now"
    };

    let posts = JSON.parse(localStorage.getItem("chirpPosts")) || [];

    posts.unshift(post);

    localStorage.setItem("chirpPosts", JSON.stringify(posts));

    postInput.value = "";

    loadPosts();
}


// DISPLAY SAVED POSTS
function loadPosts() {
    const container = document.getElementById("postsContainer");

    if (!container) return;

    const savedPosts = JSON.parse(localStorage.getItem("chirpPosts")) || [];

    // Keep the original sample posts
    container.querySelectorAll(".user-post").forEach(post => post.remove());

    savedPosts.forEach(post => {
        const article = document.createElement("article");

        article.className = "post-card user-post";

        const profileImage = document.createElement("img");
        profileImage.src = "https://i.pravatar.cc/100?img=47";
        profileImage.alt = "Profile";

        const content = document.createElement("div");
        content.className = "post-content";

        const header = document.createElement("div");
        header.className = "post-header";

        const userInfo = document.createElement("div");

        const name = document.createElement("strong");
        name.textContent = "Swathi";

        const username = document.createElement("span");
        username.className = "username";
        username.textContent = " @swathi · " + post.time;

        userInfo.append(name, username);

        const more = document.createElement("i");
        more.className = "fa-solid fa-ellipsis";

        header.append(userInfo, more);

        const message = document.createElement("p");
        message.textContent = post.text;

        const actions = document.createElement("div");
        actions.className = "post-actions";

        const commentButton = document.createElement("button");
        commentButton.innerHTML = '<i class="fa-regular fa-comment"></i> 0';

        const shareButton = document.createElement("button");
        shareButton.innerHTML = '<i class="fa-solid fa-retweet"></i> 0';

        const likeButton = document.createElement("button");
        likeButton.innerHTML =
            `<i class="fa-regular fa-heart"></i> <span>${post.likes}</span>`;

        likeButton.onclick = () => likeSavedPost(post.id);

        const sendButton = document.createElement("button");
        sendButton.innerHTML = '<i class="fa-solid fa-arrow-up-from-bracket"></i>';

        actions.append(commentButton, shareButton, likeButton, sendButton);

        content.append(header, message, actions);

        article.append(profileImage, content);

        container.prepend(article);
    });
}


// LIKE ORIGINAL SAMPLE POSTS
function likePost(button) {
    const icon = button.querySelector("i");
    const count = button.querySelector("span");

    const liked = button.classList.toggle("liked");

    if (liked) {
        icon.className = "fa-solid fa-heart";
        count.textContent = Number(count.textContent) + 1;
        button.style.color = "#e74c75";
    } else {
        icon.className = "fa-regular fa-heart";
        count.textContent = Number(count.textContent) - 1;
        button.style.color = "";
    }
}


// LIKE USER POSTS
function likeSavedPost(id) {
    let posts = JSON.parse(localStorage.getItem("chirpPosts")) || [];

    posts = posts.map(post => {
        if (post.id === id) {
            post.likes++;
        }
        return post;
    });

    localStorage.setItem("chirpPosts", JSON.stringify(posts));

    loadPosts();
}


// FOCUS POST BOX
function focusPost() {
    const postInput = document.getElementById("postText");

    if (postInput) {
        postInput.focus();
        postInput.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }
}


// FOLLOW BUTTONS
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".follow-item button").forEach(button => {
        button.addEventListener("click", () => {
            if (button.textContent === "Follow") {
                button.textContent = "Following";
                button.style.background = "#2585f7";
            } else {
                button.textContent = "Follow";
                button.style.background = "#172033";
            }
        });
    });
});