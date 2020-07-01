#!/bin/sh

deployment_dir=/opt/vida/operations-service
if [ -d "$deployment_dir" ] && [ -x "$deployment_dir" ]; then
  cd /opt/vida/operations-service

  rm -rf *
fi
