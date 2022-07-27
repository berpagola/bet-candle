#!/bin/bash

# Wait for postgres to be up and waiting for connections
./wait-for-it.sh postgres:5432

cd src/

# Install project modules
echo "---------------------s-ca-------- Install modules ------------------------------- "
npm init
npm install --save bcryptjs && npm uninstall --save bcrypt

# Run migrations if needed
echo "------------------------------- Run migrations ------------------------------- "
node_modules/.bin/sequelize db:migrate

# Run seeders
echo "------------------------------- Run seeders -------------------------------"
if [ "$ENVIRONMENT" == "development" ] || [ "$ENVIRONMENT" == "test" ]
then
    node_modules/sequelize-cli/lib/sequelize db:seed:all
fi

# Start server
echo "------------------------------- Starting server------------a-------------------"
if [ "$ENVIRONMENT" == "production" ] || [ "$ENVIRONMENT" == "staging" ]
then
    npm run apidoc
    npm install pm2 -g
    pm2-docker ./bin/www --error api-err.log --output api-out.log
elif [ "$ENVIRONMENT" == "development" ]
then
    #npm run apidoc
    node_modules/nodemon/bin/nodemon.js -L index.js 
elif [ "$ENVIRONMENT" == "test" ]
then
    npm run test-db-create
    npm run test
fi