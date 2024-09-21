#!/usr/bin/env bash

export DOCKER_CONTEXT=default

LOCK_FILE="$(pwd)/insonai.lock"
cd /root/insonai-front
flock -n $LOCK_FILE ./scripts/conditional-deploy.sh >>/root/deployment/inson_ai.log 2>&1
