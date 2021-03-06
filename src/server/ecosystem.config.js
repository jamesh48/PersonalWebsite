module.exports = {
  apps: [{
    name: "Personal_Website",
    script: "npm",
    args: "run:dev start",
    env: {
      NODE_ENV: "development"
    },
    env_production: {
      NODE_ENV: "production"
    }
  }],
  deploy: {
    production: {
      user: "ubuntu",
      host: "ec2-3-15-110-200.us-east-2.compute.amazonaws.com",
      key: "./Login_Scripts/personalwebsite.pem",
      ref: "origin/main",
      repo: "git@github.com:jamesh48/PersonalWebsite.git",
      path: "/home/ubuntu/PersonalWebsite",
      "post-deploy": "npm install && npm run build && pm2 save"
    }
  }
}