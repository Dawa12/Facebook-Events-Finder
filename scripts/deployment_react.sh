# NOTE: the env is already set to PRODUCTION
# Let's clean up anything we did before
npm run clean -s
# Go get all the npm assets we'll need which include all the devDependencies
# Don't invoke the npm lifecycle 
npm i --only=dev --ignore-scripts
# build out webpack assets
webpack -p
# Remove the DEV version of node modules
rm -rf node_modules
