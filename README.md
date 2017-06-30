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

### Cheatsheets

- [Markdown](http://kramdown.gettalong.org/quickref.html)
- [Jekyll](https://gist.github.com/smutnyleszek/9803727)

## Markdown help

- [Markdown Basics](https://help.github.com/articles/markdown-basics/)
- [Gihub Flavored Markdown](https://help.github.com/articles/github-flavored-markdown/)
- [Mastering Markdown](https://guides.github.com/features/mastering-markdown/)
