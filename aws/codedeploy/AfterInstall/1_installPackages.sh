#!/bin/sh
cd /opt/vida/operations-service
mv .production.env .env
yarn
