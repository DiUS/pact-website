# Pact Saas Website

## Development team

### Install dependencies

You'll either need `grunt` and `bundle` or `docker` installed.

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

* The buildkite build is currently failing for reasons unknown. To deploy, run all the scripts from `.buildkite/pipeline.yml` with the correct environment variables.
* Then, invalidate the `pact-saas-ui` cloudfront cache here: https://console.aws.amazon.com/cloudfront/home?region=ap-southeast-2#distributions by selecting the `pact-saas-ui` row, then the `Invalidations` tab, then `Create Invalidation` for `/*`
* To update the lambda, open the lamda in the [AWS console](https://console.aws.amazon.com/lambda/home?region=us-east-1#/functions/pactSAASLambda?tab=graph) and copy paste the javascript from lambda/lambda.js into it.

### Cheatsheets

- [Markdown](http://kramdown.gettalong.org/quickref.html)
- [Jekyll](https://gist.github.com/smutnyleszek/9803727)

## Markdown help

- [Markdown Basics](https://help.github.com/articles/markdown-basics/)
- [Gihub Flavored Markdown](https://help.github.com/articles/github-flavored-markdown/)
- [Mastering Markdown](https://guides.github.com/features/mastering-markdown/)
