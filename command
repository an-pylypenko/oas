openapi-generator-cli generate -g typescript-axios -o src/task-api -i openapi.json

openapi-generator-cli generate -g typescript-axios -o src/task-api -i openapi.json --additional-properties='npmRepository=https://github.com/pilipenkoandrey79/task-test-api,npmName=@pilipenkoandrey79/task-test-api,supportsES6=true'
