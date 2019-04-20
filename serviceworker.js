var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
    '',
    'favicon.ico',
    'sw-init.js',
    'manifest.json',
    'css/site.css',
    'css/bootstrap/bootstrap.min.css',
    'css/open-iconic/font/css/open-iconic-bootstrap.min.css',
    'css/open-iconic/font/fonts/open-iconic.woff',
    'images/cylinder-icon_192.png',
    'images/cylinder-icon_512.png',
    '_framework/blazor.webassembly.js',
    '_framework/blazor.boot.json',
    '_framework/wasm/mono.js',
    '_framework/wasm/mono.wasm',
    '_framework/_bin/BlazorPWA.dll',
    '_framework/_bin/Microsoft.AspNetCore.Blazor.dll',
    '_framework/_bin/Microsoft.AspNetCore.Components.Browser.dll',
    '_framework/_bin/Microsoft.AspNetCore.Components.dll',
    '_framework/_bin/Microsoft.Extensions.DependencyInjection.Abstractions.dll',
    '_framework/_bin/Microsoft.Extensions.DependencyInjection.dll',
    '_framework/_bin/Microsoft.JSInterop.dll',
    '_framework/_bin/Mono.Security.dll',
    '_framework/_bin/Mono.WebAssembly.Interop.dll',
    '_framework/_bin/mscorlib.dll',
    '_framework/_bin/System.ComponentModel.Annotations.dll',
    '_framework/_bin/System.Core.dll',
    '_framework/_bin/System.dll',
    '_framework/_bin/System.Net.Http.dll',
    '_framework/_bin/BlazorPWA.pdb',
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

