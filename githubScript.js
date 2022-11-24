const inpUserRef = document.querySelector(".inp-username");
const clientID = "95cbc015f8bb347c7d0c";
const clientToken = "b31bf1decfd14b9e908ca7860e682ddfb64a9067";
const detailsRef = document.querySelector(".user-details-wrapper");



inpUserRef.addEventListener("keyup", (e) => {
    const inpUser = inpUserRef.value;
    console.log(inpUser);
    if (inpUser !== '') {
        getUser(inpUser).then((data => {
            console.log(data);
            if (data.message === "Not Found") {
                //show alert
                giveError();
            } else {
                //show profile
                showProfile(data);
            }
        }));
    }else{
        //clear profile
        clearProfile();
    }

});

async function getUser(user) {
    const profileResponse = await fetch(`https://api.github.com/users/${user}`);
    const profileData = await profileResponse.json();

    // console.log(profileResponse.json());
    // console.log(profileData);
    return profileData;
}

function showProfile(user){
    detailsRef.innerHTML = `
    <div class="card-wrapper">
        <div class="user-imp-data">
            <img src="${user.avatar_url}" class="user-img" alt="profile-img">
            <div class="user-name">${user.name}</div>
        </div>
        <div class="user-details">
            <div class="followers-wrapper">
                <div class="public-repos">Public Repos: ${user.public_repos}</div>
                <div class="user-followers">Followers: ${user.followers}</div>
                <div class="user-following">Following: ${user.following}</div>
            </div>
            <div class="more-user-details">
                <div class="user-data">Company: ${user.company}</div>
                <div class="user-data">Website: ${user.blog}</div>
                <div class="user-data">Location: ${user.location}</div>
                <div class="user-data">Member since: ${user.created_at}</div>
            </div>
        </div>
    </div>
    `
}

function clearProfile(){
    detailsRef.innerHTML = ``;
}

function giveError(){
    detailsRef.innerHTML = `
    <div class = "error-msg">No profile found for given username!</div>
    `
    const errorRef = document.querySelector(".error-msg");
    setTimeout(()=>{
        errorRef.style.display = "none";
    },3000);
}