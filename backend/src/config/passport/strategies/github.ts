const GitHubStrategy = require('passport-github2').Strategy;

let gitHubClientID = ''
let gitHubClientSecret = ''

if (process.env.NODE_ENV === 'production') {
  gitHubClientID = `${process.env.PRODUCTION_GITHUB_CLIENT_ID}`
  gitHubClientSecret = `${process.env.PRODUCTION_GITHUB_CLIENT_SECRET}`
} else {
  gitHubClientID = `${process.env.GITHUB_CLIENT_ID}`
  gitHubClientSecret = `${process.env.GITHUB_CLIENT_SECRET}`
  }

const gitHubStrategySettings: any = {
  clientID: gitHubClientID,
  clientSecret: gitHubClientSecret,
  callbackURL: '/api/auth/github/callback',
  passReqToCallback: true,
  scope: ['user:follow', 'user:email', 'read:user'],
};
export const gitHubStrategy: any = new GitHubStrategy(
  gitHubStrategySettings,
  handleConnectGitHubAccount
);

function handleConnectGitHubAccount(
  req: any,
  gitHubAccessToken: String,
  refreshToken: String,
  gitHubProfile: any,
  callback: Function
) {
  process.nextTick(() => {
    if (req.user) {
      let user = req.user;

      user.gitHubConnected = true;
      user.gitHub.id = gitHubProfile.id;
      user.gitHubToken = gitHubAccessToken;
      user.gitHub.displayName = gitHubProfile.displayName;
      user.gitHub.json = gitHubProfile._json;

      user.save((err: Error) => {
        if (err) throw err;
        return callback(null, user);
      });
    }
  });
}
