#!/bin/sh

echo "Waitin for mysql to start..."

while ! nc -z ddd_forum_mysql 3306; do
  sleep 60
done

echo "MySQL started"

while ! nc -z ddd_forum_redis 6379; do
  sleep 60
done
 
echo "REDIS started"

npm run db:create:dev
npm run migrate:dev
npm run start:both