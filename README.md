# Name-On
![Release](https://clintcparker.vsrm.visualstudio.com/_apis/public/Release/badge/5eb5c9e0-ca41-4637-a6a1-1a4c8deda67b/1/1)

![Build](https://clintcparker.visualstudio.com/_apis/public/build/definitions/5eb5c9e0-ca41-4637-a6a1-1a4c8deda67b/7/badge?branchName=master&api-version=5.0-preview.2)

## Introduction 

I've found my self needing one of these repeatedly over the last few months. So I built this one. You'll get a new _Adjective-Noun-Number_ combo with each new request.

Check it out @ [name-on.site](https://name-on.site)


## Structure

Name-On consists of 4 components:

1. name-on-core: A shared library with the core behavior logic
1. name-on-unit-test: A unit testing project for the core library
1. name-on-cli: A command line wrapper for the core library
1. name-on-web: An ASP.NET Core web app surfacing the core behaviors

## API

That's right there's an API. You never know when you'll need to `curl` this beacuse because you haven't installed the CLI yet. 

`curl https://name-on.site/api/name`

## CLI

I'm a sucker for CLIs. But I'm not clear on how to deploy this one. For now, get the source, run `dotnet publish`, and then symlink from the new publish directory to someplace in your $PATH.
