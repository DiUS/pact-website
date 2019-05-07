# Pact Saas Website

* Static Pactflow product website
* Cloudfront distribution
* SSL certificate for secure website


**NOTE #1: Because Matt is silly and didn't realise, he accidentally registered the domains in the _dev_ Pact account and therefore ALL deployments for all environments are in dev - TODO**

**NOTE #2: Because Cloudfront + ACM only work together in us-east-1, the website is deployed into that region**



## Environments

* Production: pactflow.io (and www.pactflow.io)
* Development: staging.pactflow.io

## Development team

### Install dependencies

You'll  need `grunt`, `bundle` and `docker` installed.

* NPM and Bundle:

```
$ npm install
$ bundle install
```

* Docker

```
$ ./shell/bundle.sh
$ ./shell/build.sh
```

### Build (and run) locally

```
$ bundle exec grunt
```
In your browser, go to `localhost:4000`

### Build for production(-like) environment

```
$ bundle
$ JEKYLL_ENV=production bundle exec jekyll build
```

### Deploying

#### Website deployments

```
ENVIRONMENT=dev ./shell/deploy.sh
```

#### Infrastructure deployments

```sh
cd aws
ENVIRONMENT=dev deploy.sh`
```

#### Deploying - old

* The buildkite build is currently failing for reasons unknown. To deploy, run all the scripts from `.buildkite/pipeline.yml` with the correct environment variables.
* Then, invalidate the `pact-saas-ui` cloudfront cache here: https://console.aws.amazon.com/cloudfront/home?region=ap-southeast-2#distributions by selecting the `pact-saas` (dkpixpz9q6qga.cloudfront.net) row, then the `Invalidations` tab, then `Create Invalidation` for `/*`
* To update the lambda, open the lamda in the [AWS console](https://console.aws.amazon.com/lambda/home?region=us-east-1#/functions/pactSAASLambda?tab=graph) and copy paste the javascript from lambda/lambda.js into it.

### Cheatsheets

- [Markdown](http://kramdown.gettalong.org/quickref.html)
- [Jekyll](https://gist.github.com/smutnyleszek/9803727)

## Markdown help

- [Markdown Basics](https://help.github.com/articles/markdown-basics/)
- [Gihub Flavored Markdown](https://help.github.com/articles/github-flavored-markdown/)
- [Mastering Markdown](https://guides.github.com/features/mastering-markdown/)