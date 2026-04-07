---
paths:
  - "lib/**/*.ts"
  - "bin/**/*.ts"
  - "test/**/*.ts"
---

# CDK Rules — battleship-infra

## Construct Composition
- Each construct owns ONE bounded concern (storage, API, hosting)
- `BattleshipStack` is the composition layer that wires constructs together
- Constructs expose public readonly properties for cross-construct wiring

## Stage Configuration
- All environment values in `lib/constants.ts` (NEVER hardcoded in constructs)
- Resource naming pattern: `battleship-{resource}-{stageSuffix}`

## Lambda Configuration
- Runtime: `lambda.Runtime.JAVA_21`
- Code: `lambda.Code.fromAsset('../battleship-backend/build/libs/battleship-backend-all.jar')`
- Memory: 512 MB
- Timeout: 30 seconds
- Handler: fully qualified class name + `::handleRequest`

## IAM
- Use CDK grant methods where available: `table.grantReadWriteData(fn)`
- Raw PolicyStatement only for permissions without CDK grant method
- Never use `'*'` for resource ARNs when a specific ARN is available

## API Gateway
- REST API with proxy integration (`{proxy+}`)
- CORS enabled for the frontend origin
- Default throttling left at free tier defaults

## S3 Website Hosting
- Public read via bucket policy
- Index document: index.html
- Error document: index.html (SPA routing)
- No CloudFront — S3 website endpoint is sufficient for demo

## Logging
- Explicit `logs.LogGroup` with stage-driven retention
- Do NOT use the deprecated `logRetention` Lambda property

## Testing
- CDK assertions (`Template.fromStack`) for structural contract tests
- Verify resource counts and key configurations

## Deployment
- Always build backend JAR before `cdk deploy`
- Profile: `amazen-beta`
- Region: us-east-1
