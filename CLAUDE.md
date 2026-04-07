# battleship-infra

CDK TypeScript project for Battleship game infrastructure.

## Build & Deploy
```bash
npm install
npx cdk synth --profile amazen-beta
npx cdk deploy --profile amazen-beta
```

## Prerequisites
- Backend JAR must be built first: `cd ../battleship-backend && ./gradlew shadowJar`

## Stack Resources
- DynamoDB table (game state, 24h TTL)
- API Gateway REST API + Lambda (Kotlin JVM 21)
- S3 bucket (static website hosting for frontend)

## Stack Outputs
- ApiUrl: API Gateway endpoint URL
- WebsiteBucketName: S3 bucket name for frontend upload
- WebsiteUrl: S3 website endpoint URL
