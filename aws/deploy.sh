#!/bin/bash -el

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
NAMESPACE="pact-broker-saas"

. ${DIR}/helper

if [ ! -z $1 ]; then
  ENVIRONMENT=$1
fi

if [ -z ${ENVIRONMENT} ]; then
  log "Environment Name / Identifier is required for launching of the stack"
  log "Please set the ENVIRONMENT environment variable"
  exit 255
fi


TEMPLATE="template.yaml"
STACK_NAME="pact-broker-saas-${ENVIRONMENT}-web"

verify_cloudformation ${TEMPLATE}

log "Deploying to ${STACK_NAME} for environment ${ENVIRONMENT}"
docker run --rm \
    -v `pwd`:/cwd \
    ${AWS_CREDENTIALS_VOLUME} \
    -e AWS_ACCESS_KEY_ID \
    -e AWS_SECRET_ACCESS_KEY \
    -e AWS_SESSION_TOKEN \
    -e AWS_PROFILE \
    -e AWS_DEFAULT_REGION \
    ${STACKUP_DOCKER_IMAGE} "${STACK_NAME}" up -t ${TEMPLATE} \
    -p parameters.${ENVIRONMENT}.yml \
    -o Environment=${ENVIRONMENT}

log "Done."
