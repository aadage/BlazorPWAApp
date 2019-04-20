var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
    '/BlazorPWAApp/',
    '/BlazorPWAApp/sw-init.js',
    '/BlazorPWAApp/manifest.json',
    '/BlazorPWAApp/css/site.css',
    '/BlazorPWAApp/css/bootstrap/bootstrap.min.css',
    '/BlazorPWAApp/css/open-iconic/font/css/open-iconic-bootstrap.min.css',
    '/BlazorPWAApp/css/open-iconic/font/fonts/open-iconic.woff',
    '/BlazorPWAApp/images/cylinder-icon_192.png',
    '/BlazorPWAApp/images/cylinder-icon_512.png',
    '/BlazorPWAApp/_framework/blazor.webassembly.js',
    '/BlazorPWAApp/_framework/blazor.boot.json',
    '/BlazorPWAApp/_framework/wasm/mono.js',
    '/BlazorPWAApp/_framework/wasm/mono.wasm',
    '/BlazorPWAApp/_framework/_bin/BlazorPWA.dll',
    '/BlazorPWAApp/_framework/_bin/Microsoft.AspNetCore.Blazor.dll',
    '/BlazorPWAApp/_framework/_bin/Microsoft.AspNetCore.Components.Browser.dll',
    '/BlazorPWAApp/_framework/_bin/Microsoft.AspNetCore.Components.dll',
    '/BlazorPWAApp/_framework/_bin/Microsoft.Extensions.DependencyInjection.Abstractions.dll',
    '/BlazorPWAApp/_framework/_bin/Microsoft.Extensions.DependencyInjection.dll',
    '/BlazorPWAApp/_framework/_bin/Microsoft.JSInterop.dll',
    '/BlazorPWAApp/_framework/_bin/Mono.Security.dll',
    '/BlazorPWAApp/_framework/_bin/Mono.WebAssembly.Interop.dll',
    '/BlazorPWAApp/_framework/_bin/mscorlib.dll',
    '/BlazorPWAApp/_framework/_bin/System.ComponentModel.Annotations.dll',
    '/BlazorPWAApp/_framework/_bin/System.Core.dll',
    '/BlazorPWAApp/_framework/_bin/System.dll',
    '/BlazorPWAApp/_framework/_bin/System.Net.Http.dll',
    '/BlazorPWAApp/_framework/_bin/BlazorPWA.pdb',
];

self.addEventListener('install', function (event) {
    console.log('service worker install');
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                // Cache hit - return response
                if (response) {
                    console.log(`sw cache hit ${event.request.url}`);
                    return response;
                }

                console.log(`sw cache miss ${event.request.url}`);
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', function (event) {
    console.log('sw activate');

    //var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];

    //event.waitUntil(
    //    caches.keys().then(function (cacheNames) {
    //        return Promise.all(
    //            cacheNames.map(function (cacheName) {
    //                if (cacheWhitelist.indexOf(cacheName) === -1) {
    //                    return caches.delete(cacheName);
    //                }
    //            })
    //        );
    //    })
    //);
});

