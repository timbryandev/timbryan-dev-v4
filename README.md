# timbryan-dev

This repo is for the development of my portofio site. I stage my site using Netlify, then when I'm happy with what I have I then deploy it to me own server.

Staging  : [https://timbryandev.netlify.app/](https://timbryandev.netlify.app/) [![Netlify Status](https://api.netlify.com/api/v1/badges/1091eb01-dde2-46d2-869f-e3db4b302379/deploy-status)](https://app.netlify.com/sites/timbryandev/deploys)

Live site: [https://timbryan.dev/](https://timbryan.dev/)

I'm hoping to expand on what I have already into something bigger, such as a blog and other projects.

## Dependencies

- npm/node
- browser sync
- gulp
- prettier
- typescript
- nunjucks

## Commands

`npm install` - must be ran before any others below to install all dependencies

`npm build` - runs a gulp script that will build a local version of the whole project

`npm watch` - runs a gulp script that will build a local version of the whole project and runs browser-sync to send any watched folders to the web browser

`npm clean` - runs a prettier script to nicely format the ts, scss and html files
