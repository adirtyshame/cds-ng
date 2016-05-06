import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, LocationStrategy, HashLocationStrategy} from 'angular2/router'
import {provide, PLATFORM_DIRECTIVES} from 'angular2/core';
import {AppComponent} from './app';
import {appInjector} from './app-injector';

let services = [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    provide(LocationStrategy, {useClass: HashLocationStrategy}),
    provide(PLATFORM_DIRECTIVES, {useValue: [ROUTER_DIRECTIVES], multi: true})
];

bootstrap(AppComponent, services).then((appRef) => appInjector(appRef.injector));