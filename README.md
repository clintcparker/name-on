# Introduction 

I've found my self needing one of these repeatedly over the last few months. So I built this one.

# Structure

Name-On consists of 4 components:

1. name-on-core: A shared library with the core behavior logic
1. name-on-unit-test: A unit testing project for the core library
1. name-on-cli: A command line wrapper for the core library
1. name-on-web: An ASP.NET Core web app surfacing the core behaviors

