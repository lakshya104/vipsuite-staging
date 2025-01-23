### What is this repository for?

- Quick summary: This repo is being used as front end for VIP SUIT

### How do I get set up?

## Installation

# Installation of git

    - Install git in system.
    - clone the project from gitlab repo
    - set up git flow :
        - command to install git flow in linux :  sudo apt-get install git-flow
        - start git flow using : git flow init
    - switch to develop branch
        - command : git checkout develop

# Installation of nodejs

    - Install nodejs in system.
    - Node version: 22.12.0

# Installation of yarn

    - Install yarn based on platform:
        a. Mac : brew install yarn

        b. linux: run following commands :
            - curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
            - echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
            - sudo apt-get update && sudo apt-get install yarn

    - Yarn version: 1.22.22

# Run the server :

    run below command to run development server:
        - if you are running first time : yarn install && yarn run dev
        - If you are not running first time : yarn run dev
