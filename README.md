# cloudFunction-Round2
This codebase is created to experiment with AWS Lambda. The goal is to use SAM to deploy and publish the lambda function using Cloud formation.

## Setup
- Setup AWS CLI (details see https://docs.aws.amazon.com/lambda/latest/dg/setup-awscli.html)
- Setup SAM Local (details see https://docs.aws.amazon.com/lambda/latest/dg/sam-cli-requirements.html)
- Install NodeJS and NPM
- Clone the repo
- Run "npm install"

## Package
Run the following command to package the local artifacts (defined in template.yaml file) and upload them to S3 bucket and create a new template file with references to S3 bucket.

sam package --template-file template.yaml --s3-bucket mybucket --output-template-file output.yaml

## Deploy
Run the following command to create and execute changeset as described in the cloud formation template (output.yaml).

sam deploy --template-file ./output.yaml --stack-name mystack --capabilities CAPABILITY_IAM

## Unit Tests
Run "npm test" to execute unit tests

## Functional Tests
Generate S3 event using:

sam local generate-event s3 --bucket localTestBucket  --key test-key > event_file.json

sam local invoke ReviewManagerLambda -e event_file.json
