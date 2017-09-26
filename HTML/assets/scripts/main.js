// # 3)Récupérer nombre de section :
var nb_section = $('section').length;

// Connaitre largeur et hauteur d'un navigateur
var wid_win = $(window).width();
var hei_win = $(window).height();

// Connaitre taille de la section
var hei_sec = $('#page-1').height();

// Connaitre taille du body
var hei_body = $('body').height();
// console.log(hei_body, hei_sec, hei_win);

// # 1) Trouver Elements
var finders = $('body').find('section');
// console.log(finders);

// # 2) permet d'ajouter une classe à chaque section
for (var finder of finders) {
    // console.log(finder);
    // var test = $(finder).addClass('page');
    // console.log(test);
}

// Renvoit la position de la scrollbar
// $(window.scrollTop());
// console.log($(window).scrollTop());

var scroll = new Scrollux();
// console.log(navigator.userAgent.indexOf("Chrome") != -1);