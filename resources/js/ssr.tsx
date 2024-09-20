import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { RouteName } from 'ziggy-js';
import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { route } from '../../vendor/tightenco/ziggy';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createServer((page) =>
  createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
      resolvePageComponent(
        `./pages/${name}.tsx`,
        import.meta.glob('./pages/**/*.tsx')
      ),
    setup: ({ App, props }) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      global.route<RouteName> = (name, params, absolute) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        route(name, params as any, absolute, {
          ...page.props.ziggy,
          location: new URL(page.props.ziggy.location),
        });

      return <App {...props} />;
    },
  })
);
