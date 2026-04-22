const clientKey = 'aw0kuf6cmwgn8e9n';
const redirectUri = 'https://execdrops.com/tiktok-integration/callback.html';
const scope = 'user.info.basic,video.publish';
const state = 'execwear_auth';
const url = `https://www.tiktok.com/v2/auth/authorize/?client_key=${encodeURIComponent(clientKey)}&scope=${encodeURIComponent(scope)}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&state=${encodeURIComponent(state)}`;
console.log(url);
