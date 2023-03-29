# Collectibles4Us

Get docker going. You may run docker-compose up in the Software directory of our repo.

When docker is composed, you may interact with the front-end in PRODUCTION MODE with localhost:3000

- no realtime code updates
- better performance
- takes a while to spin up

You may also interact in DEVELOPMENT MODE by closing the docker node server and running npm run start

- realtime code updates
- worse performance

# In order to use DEVELOPMENT MODE, you must get node installed on your computer and accessible through the command-line.

### Go here https://github.com/nvm-sh/nvm/blob/master/README.md and follow the instructions to install nvm. This is node version manager. You need nvm to have node.js on your machine.

### Once this is installed, you will be able to run

> nvm install node

### to install the latest node and 

> nvm list

### to display the node versions you have installed.

to use a node version, you must run

> nvm use [version]

use "nvm list" once more and confirm that you are using the latest version of node with the asterisk denoting the usage of a version.

## NPM usage

### by now, you should be able to use the command npm. Try using

> npm --version 

to verify that you may use those commands.

### Next, navigate to Collectibles4Us/Software/node
### run
```
npm install
npm run start
```
