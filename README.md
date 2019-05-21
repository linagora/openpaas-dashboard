# openpaas-dashboard

## Project configuration

You can update the `.env` file to define the OpenPaaS instance to reach, or override it in a new `.env.development.local` file. Current environment variables are:

- `VUE_APP_OPENPAAS_URL`: route to your OpenPaaS instance. Needs to be `http://localhost:8080` in development mode.


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

## vue-dashboard plugin

The vue-dashboard plugin allows to create dashboards pages as `grid` from a collection of `widgets`:

- A `widget` is the UI component displayed in a `card`.
- A `grid` or `card grid` is the component displaying multiple `cards`. In the current case, cards can be moved in a grid.

The widgets can be added/removed and reordered/sorted from user interaction.

### Usage

```js
import VueDashboard from "vue-dashboard";

Vue.use(VueDashboard, {
  store,  // your vuex store instance (required)
  widgets // array of widgets to be used by the dashboard
});
```

You can then build Vue component using the dashboard:

```html
<template>
  <dashboard-card-grid :cards="cards"/>
</template>

<script>
export default {
  name: "home",
  computed: {
    cards() {
      // TODO
    }
  }
};
</script>
```

### Widgets

Widgets are following the `widget component API`:

``` js
{
  type,
  title,
  icon,
  description,
  store,
  components,
  hooks
}
```

Where:

- **type**: The widget type as `String`. This MUST be unique among all widgets.
- **title**: The widget title as `String`. Used as display name in the widget store.
- **icon**: The widget icon as `String`. Possible values are icon names from material icon module. Used in the widget store.
- **description**: The widget description as `String`. Used to display a short description of the widget in the widget store.
- **store**: A vuex store module which is defined to be used by the widget only (https://vuex.vuejs.org/guide/modules.html)
- **components**: Hash of components used to build the UI.
  - `main` component (**required**) is the one displayed in the card by default.
    ```js
    {
      main: {
        component: VueComponent,    // the Vue component
        title: "Display Title",     // the title of the component
        color: "blue"               // the widget background color
      }
    }
    ```
  - `settings` component (**optional**) is the one used to display the widget settings.
    ```js
    {
      settings: {
        component: VueSettingsComponent // a Vue component which handles the settings of the widget
      }
    }
    ```

- **hooks**: Hash of functions used on cards change.
  - `onRemove` is called when the card containing the widget is removed from the grid.
  ``` js
  onRemove: store => {
    // do something
  }
  ```
- **settings**: Hash of settings for the component.
  - `data`: Hash of settings to be used by the widget. The settings are then available on the `settings` `props` of the Vue main component
  - `validate(settings)`: A function which returns `true` if settings are valid, `false` otherwise

Thus, creating a new widget is as simple as following the API and file structure. Let's say we want to create a simple hello world component:

1. Create a new folder `helloworld` under `src/components/widgets`
2. Create your hello world widget as a Vue component in `src/components/widgets/helloworld/`. Let's name it `HelloWorld.vue`

    ```html
    <template>
      <div id="hello">
        <span>Hello {{ name }}</span>
      </div>
    </template>

    <script>
    export default {
      data() {
        return {
          name: "OpenPaaS",
        };
      }
    };
    </script>
    ```

3. Add an `index.js` file in `src/components/widgets/helloworld` which exposes your widget like

    ```js
    import HelloWorld from "./HelloWorld.vue";

    const components = {
      main: { component: HelloWorld, color: "purple" }
    };

    const settings = {
      validate(settings) {
        return settings.foo === "Bar";
      }
    }

    export default {
      type: "openpaas.dashboard.helloword",
      title: "My HelloWorld Component",
      icon: "access_time",
      description: "This is my most famous component",
      components,
      settings
    };
    ```

4. If you need a vuex store for your widget, simply create it in the widget folder, import it in `index.js` then add it in the component definition as `store`.
5. If you need to add hooks, just add the `hooks` property and put your hooks in it like

    ```js
    hooks: {
      onRemove: store => {
        console.log('OMG, I have been removed');
        store.dispatch("doSomething");
      }
    }
    ```

Once done, the widget will be availble in the widget store 🐼

#### Good practices

- If your widget needs to be decomposed into several Vue components, just do it as is you are creating any other components. Just put them into a `components` folder.
- Keep things related to the widget in the widget folder.
- i18n files are generated at build time. In order to have translated widgets, i18 files must be defined per widget in `src/components/widgets/**/i18n/*.json`

## Runtime configuration

As defined by `vue-cli`, you can set environment variables from `.env` files. In order to run in containers and to be able to configure from a central places, the `public/env/openpaas.js` file can be used also to configure the application. This file takes higher priority over Vue `.env` files. Variables which can be defined are:

- `VUE_APP_OPENPAAS_URL`: The OpenPaaS URL to use when having to talk to OpenPaaS, especially used for REST APIs
- `VUE_APP_DISABLED_WIDGETS`: The list of widgets to disable as CSV (`"clock,email"`) or as Array (`["clock", "email"]`)

## Docker

### Build

Before building the image for production, you will have to configure it from an environment file. By default, `vue-cli` (used by `npm run build`) will set the `NODE_ENV` to production on build step. In order to define production environment values, you will have to create a `.env.production.local` file at the root or the repository and set the required values (copy, paste and adapt `.env` file properties). Once done, you can build the image like:

```
docker build -t linagora/openpaas-dashboard .
```

### Run

```
docker run -it -p 8888:80 --rm --name openpaas-dashboard linagora/openpaas-dashboard
```

In order to define the OpenPaaS endpoint to use (override the `VUE_APP_OPENPAAS_URL` variable from `.env*` files), the `public/env/openpaas.js` file has to be updated. In order to do this, a Docker volume is available in the container and the `openpaas.js` file can be redefined by mounting a volume. By using this, the image is generated once, and can be used in multiple application deployments.

```
docker run -it -p 8888:80 --rm --name openpaas-dashboard -v $PWD/.config/env:/usr/share/nginx/html/env linagora/openpaas-dashboard
```
