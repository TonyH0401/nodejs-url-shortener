# Simple URL Shortener API

## Description

Simple URL Shortener API shortens URL links into smaller links for easy access. The shortened links **expired after 30 minutes**. The results after each processes are returned in JSON format, so I highly advice using tools like Postman to perform requests. 

## Tech

- NodeJS
- ExpressJS
- SQLite

## Installation

This project requires [Node.js](https://nodejs.org/) v10+ to run. Please install the dependencies brefore starting the server.

```sh
cd nodejs-url-shortener-api
npm i
npm start
```

## Environment Variables:

```sh
BE_PORT=""
```


## Command

Create Shorten URL:

```sh
POST /api/v1/urls
{
    "originalUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
}
```

Access Shorten URL:

```sh
GET /api/v1/urls/access/<<shorten-id>>
```

## Website

Simple URL Shortener API is deployed on [Render] and you can access the API by using this link "nodejs-url-shortener-api.onrender.com".

**Status**: offline

## License

MIT

**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [Render]: <https://render.com/>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>

