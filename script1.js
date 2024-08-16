const clientId = "862v8m5k3m56q0";
const redirectUri = "http://localhost:3000/auth/linkedin/callback";

document.getElementById("linkedinLogin").onclick = function () {
  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=r_liteprofile%20r_emailaddress`;
  window.location.href = authUrl;
};

// After redirect back from LinkedIn, extract the code from the URL
window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  if (code) {
    fetchAccessToken(code);
  }
};

async function fetchAccessToken(code) {
  try {
    const response = await fetch("https://YOUR_SERVER_ENDPOINT/exchangeToken", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, redirectUri }),
    });

    const data = await response.json();
    const accessToken = data.access_token;
    fetchLinkedInProfile(accessToken);
  } catch (error) {
    console.error("Error fetching access token:", error);
  }
}

async function fetchLinkedInProfile(accessToken) {
  try {
    const response = await fetch("https://api.linkedin.com/v2/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const profile = await response.json();
    displayProfileData(profile);
  } catch (error) {
    console.error("Error fetching LinkedIn profile:", error);
  }
}

function displayProfileData(profile) {
  const profileDataDiv = document.getElementById("profileData");
  profileDataDiv.innerHTML = `
        <h2>${profile.localizedFirstName} ${profile.localizedLastName}</h2>
        <p>Profile ID: ${profile.id}</p>
    `;
}
