FROM softinstigate/serverless:1.52.0

RUN mkdir ~/.aws && echo '[default]\naws_access_key_id = test\naws_secret_access_key = test' > ~/.aws/credentials

ADD serverless.yml /
ADD package.json /
ADD package-lock.json /

RUN npm ci
RUN sls dynamodb install

ADD ./src/main /src/main

ENTRYPOINT ["npm", "start"]
EXPOSE 3000