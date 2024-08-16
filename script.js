const clientId = "YOUR_CLIENT_ID";
const redirectUri = "https://srushtij05.github.io/LinkedIn_Login/"; 

document.getElementById("linkedinLogin").onclick = function () {
  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=token&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=r_liteprofile%20r_emailaddress`;
  window.location.href = authUrl;
};

// Extract the access token from the URL hash
window.onload = function () {
  const hash = window.location.hash;
  const accessToken = new URLSearchParams(hash.substring(1)).get('access_token');

  if (accessToken) {
    fetchLinkedInProfile(accessToken);
  }
};

async function fetchLinkedInProfile(accessToken) {
  try {
    const response = await fetch("https://api.linkedin.com/v2/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const profile = await response.json();
      displayProfileData(profile);
    } else {
      console.error("Error fetching LinkedIn profile:", response.statusText);
    }
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
