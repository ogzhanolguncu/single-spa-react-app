import { registerApplication, start } from 'single-spa';

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

start({
  urlRerouteOnly: true,
});
