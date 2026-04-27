const form = document.getElementById("form");
const search = document.getElementById("search");
const profile = document.getElementById("profile");

// 🔍 Search user
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = search.value.trim();
  if (username) getUser(username);
});

// 🌐 Fetch user
async function getUser(username) {
  profile.innerHTML = "Loading...";

  try {
    const res = await fetch(`https://api.github.com/users/${username}`);

    if (res.status === 404) {
      profile.innerHTML = "User not found ❌";
      return;
    }

    const data = await res.json();
    showUser(data);

    // 👉 Load repos
    getRepos(username);

  } catch (error) {
    profile.innerHTML = "Error fetching data ❌";
    console.error(error);
  }
}

// 📦 Fetch repos
async function getRepos(username) {
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`);
    const data = await res.json();

    const repoList = data
      .slice(0, 5)
      .map(repo => `
        <a href="${repo.html_url}" target="_blank" class="repo">
          ${repo.name}
        </a>
      `)
      .join("");

    document.querySelector(".card").innerHTML += `
      <div class="repos">
        <h3>Top Repositories</h3>
        ${repoList}
      </div>
    `;

  } catch (error) {
    console.error("Repo fetch error:", error);
  }
}

// 🎨 Display user
function showUser(user) {
  profile.innerHTML = `
    <div class="card">
      <img src="${user.avatar_url}" alt="${user.login}">
      <h2>${user.name || user.login}</h2>
      <p>${user.bio || "No bio available"}</p>

      <a href="${user.html_url}" target="_blank" class="profile-btn">
        View Profile
      </a>

      <div class="stats">
        <div>
          <h3>${user.followers}</h3>
          <p>Followers</p>
        </div>
        <div>
          <h3>${user.following}</h3>
          <p>Following</p>
        </div>
        <div>
          <h3>${user.public_repos}</h3>
          <p>Repos</p>
        </div>
      </div>
    </div>
  `;
}

// 🚀 AUTO LOAD YOUR PROFILE
getUser("perfectcse");