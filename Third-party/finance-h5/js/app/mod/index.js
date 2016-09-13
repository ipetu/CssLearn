define(['jquery', 'jquery.fullpage'], function ($) {
    $('.section').removeClass('init');
    $('#container').fullpage();

    $.ajax('/api/html/index.html').done(function(){
        alert('success')
    })
});