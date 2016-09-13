

requirejs.config({
    baseUrl: 'js/lib',
    urlArgs: "bust=@@requirejsBust",
    paths: {
        app: '../app',
        mod: '../mod'
    },
    shim: {
        'jquery.fullpage': ['jquery']
    }
});