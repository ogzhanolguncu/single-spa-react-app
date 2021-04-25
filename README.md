## Table of Contents

1.  [Running Locally](#running-locally)
2.  [Purpose of the project](#purpose-of-the-project)
3.  [Adding new packages](#adding-new-packages)
4.  [Root Project](#what-is-hoisting)

## Running Locally

```bash
$ git clone https://github.com/ogzhanolguncu/single-spa-react-app.git
$ cd single-spa-react-app
$ cd single-spa-react-app-root
$ yarn
$ yarn build-all
$ yarn start-all
$ navigate to http://localhost:9000/episodes
```

## Purpose of the project

Single Spa React app created for Rick and Morty api to demonstrate **Micro Frontends**. Episodes and Locations shares same layout and navbar, but they are served
from different packages.

## Adding new packages

Follow the instructions:

`npx create-single-spa`
Then,

```bash
? Directory for new project .
? Select type to generate single-spa application / parcel
? Which framework do you want to use? react
? Which package manager do you want to use? yarn
? Will this project use Typescript? Yes
? Organization name (can use letters, numbers, dash or underscore) Firefly
? Project name (can use letters, numbers, dash or underscore) firefly-new-package
```

## Root Project

**app-root** consist of root-config and index.ejs. In order to add new packages into single-spa, first register your applications into root-config like this:

```javascript
registerApplication({
  name: '@Firefly/firefly-episodes',
  app: () => System.import('@Firefly/firefly-episodes'),
  activeWhen: ['/episodes'],
});

registerApplication({
  name: '@Firefly/firefly-locations',
  app: () => System.import('@Firefly/firefly-locations'),
  activeWhen: ['/locations'],
});

//New package.
registerApplication({
  name: '@Firefly/firefly-new-package',
  app: () => System.import('@Firefly/firefly-new-package'),
  activeWhen: ['/new-package'],
});

start({
  urlRerouteOnly: true,
});
```

Then, add them into your **importmap**:

```html
<% if (isLocal) { %>
<script type="systemjs-importmap">
  {
    "imports": {
      "react": "https://cdn.jsdelivr.net/npm/react@16.13.1/umd/react.development.js",
      "react-dom": "https://cdn.jsdelivr.net/npm/react-dom@16.13.1/umd/react-dom.development.js",
      "@Firefly/root-config": "http://localhost:9000/Firefly-root-config.js",
      "@Firefly/firefly-episodes": "http://localhost:9001/Firefly-firefly-episodes.js",
      "@Firefly/firefly-locations": "http://localhost:9002/Firefly-firefly-locations.js"
      "@Firefly/firefly-new-package": "http://localhost:9003/Firefly-new-package.js"
    }
  }
</script>
<% } %>
```

Organization name -- **@Firefly** -- and packages name -- **firefly-new-package** -- carries great importance, if you mess one of them project will complain.
