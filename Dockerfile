FROM node:12

#app 폴더 만들기 - NodeJS 어플리케이션 폴더
RUN mkdir -p /nurio/storybook

#어플리케이션 폴더를 Workdir로 지정 - 서버가동용
WORKDIR /nurio/storybook

COPY ./package.json ./
COPY ./jsconfig.json ./

#패키지파일들 받기
RUN npm i -g pm2
RUN npm i -g nodemon
RUN npm install

COPY ./src/ ./src/
COPY ./stories/ ./stories/
COPY ./.storybook/ ./.storybook/

# RUN npm run build

EXPOSE 80

# ENV NODE_ENV=prod

# RUN npm run start
#서버실행
CMD ["npm", "run", "start"]