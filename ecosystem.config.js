require('dotenv').config();

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF = 'origin/master',
} = process.env;

module.exports = {
  apps : [{
    name   : "app1",
    script : "./app.js"
  }],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'git@github.com:Qolit3/Deploy-back.git',
      path: DEPLOY_PATH,
      'pre-deploy': `scp ./*.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH} &&  scp ./*.env.deploy ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'post-deploy': 'npm i && npm run build',
    },
  },
}