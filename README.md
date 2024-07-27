Versione o `package.json` e execute os comandos, trocando `0.0.1` pela versão no `package.json` (\*):

```
git checkout -b release/v0.0.1 && git push origin release/v0.0.1
git tag -a v0.0.1 -m "Release v0.0.1"
git push origin v0.0.1
git checkout master && git merge release/v0.0.1
git push origin master

git checkout develop
git merge release/v0.0.1
git push origin develop

```
