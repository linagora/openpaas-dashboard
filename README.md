# openpaas-dashboard

The OpenPaaS Dashboard is a SPA application which provides unified access to your OpenPaaS data and external APIs.

Full documentation is available at https://linagora.github.io/openpaas-dashboard/.

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
VUE_APP_OPENPAAS_URL=http://localhost:8080 npm run serve
```

### Compiles and minifies for production

```
BASE_URL=/dashboard/ npm run build
```

Where `BASE_URL` is the base URL where you deploy the app to. This is optional and will default to `/`.

### Lints and fixes files

```
npm run lint
```

### Run your unit tests

```
npm run test:unit
```

### Run your end-to-end tests

```
npm run test:e2e
```

### ### Compiles and hot-reloads for documentation

```
npm run docs:dev
```

### Generate documentation

```
npm run docs:build
```