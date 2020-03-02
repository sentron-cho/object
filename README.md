# object
  react based object and object storybook test

## npm init
  npm init -y

## stroybook install
  npx -p @storybook/cli sb init --type react

## stroybook run
  npm run start

## addon install
 - knobs : 컴포넌트의 props 를 스토리북 화면에서 바꿔서 바로 반영시켜줄 수 있는 애드온
  npm install --save-dev @storybook/addon-knobs

 - actions : 컴포넌트를 통하여 특정 함수가 호출됐을 때 어떤 함수가 호출됐는지, 그리고 함수에 어떤 파라미터를 넣어서 호출했는지에 대한 정보 표시
  npm i @storybook/addon-actions

 - docs : 컴포넌트의 props와 주석에 기반하여 자동으로 아주 멋진 문서를 자동생성
  npm install --save-dev @storybook/addon-docs

## submodule object add
  git submodule add https://github.com/sentron-cho/object.git
or
  git submodule add --force https://github.com/sentron-cho/object.git ./object

## submodule object commit
  cd object
  git commit -am 'update object'
  git push
  cd ../
  git commit -am "update submodule"
  git push

## submodule object update
  cd object
  git pull
  cd ../
  git commit -am "update submodule"
  git push

## submodule object update
  git submodule update
  //git submodule update --remote --merge
