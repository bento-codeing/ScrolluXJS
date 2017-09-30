class Scrollux {

    constructor(custom){

        // DOM Elements
        this.$body = $('body');
        this.$section = $('section');
        this.$divanchor = null;

        this.navWidth = $(window).width();
        this.navHeight = $(window).height();

        this.$navigator = null;
        this.keysPx = null;

        this.currentPage = null;
        this.scrollbar = null;

        this.counter = 1;


        // Arrays
        this.anchors = [];


        // Settings which the developper can customize
        this.defaults = {
            overflowY : "hidden",
            overflowX : "hidden",
            ringListColor : "#FFF",
            ringListSize : "9px", 
            ringActualSessionColor : "#FFF",
            ringHoverColor : "#FFF",
            setTimeAnimation : 1000 
        };

        this.settings = $.extend({}, this.defaults, custom);


        // Initialization
        this.init();
    }


    init(){

        var i = this.$section.length;

        if (i > 0) {

            var settings = this.settings;
            
            this.navigatorClient();
            this.keysSettingsPx();
            this.findSACA(i);
            this.createAside(i);
            this.displayCSS(settings.overflowY, settings.overflowX, settings.ringListColor, settings.ringListSize);
            this.$divanchor = $('.divanchor');  
            this.hoverList(1, settings.ringActualSessionColor);          
            this.fcurrentPage(i);
            this.keymap(i, settings.setTimeAnimation);
            this.scrollWinY(i, settings.setTimeAnimation);
            this.anchorClick();
            this.mouseHover(settings.ringHoverColor, settings.ringActualSessionColor);

        } else {
            console.log("You don't have any DOM section in your body !")
        }
    }


    // # 1) Find sections, addClass and create anchor for each
    findSACA(i){

        // Search sections
        var finder = $('body').find('section');

        var a = 1;

        if (i >= a) {
            
            for (var find of finder) {
                
                // Add class for each section
                if (i >= a) {

                    $(find).addClass('page-' + a);
                    $(find).attr('id', 'page-' + a);
                    
                    // Create a anchor for each section
                    var anchor = "<a href=\"#page-"+ a +"\">"
                                +"<div id=\"divpage-"+ a +"\" class=\"divanchor \"></div>"
                                + "</a>";

                    this.anchors.push(anchor);

                    a += 1; 
                }  
            }

        } else {
            console.log("You don't have any DOM section in your body !")
        }
    }


    // # 2) Display responsive CSS
    displayCSS(overflowY, overflowX, ringListColor, ringListSize){

        var body = this.$body;
        var section = this.$section;
        var aside = $('#aside-scroll');
        var ul = $('#ul-scroll');
        var li = $('.asidelist');
        var div = $('.divanchor');

        var asideHeight = aside.height();
        
        body.css({

            "margin" : "0px",
            "overflow-y" : overflowY,
            "overflow-x" : overflowX
        });

        section.css({

            "width" : "100vw",
            "height" : "100vh",
            "position" : "relative"
        });

        aside.css({
            "position" : "fixed",
            "top" : "calc(50% - ("+ asideHeight +"px / 2))",
            "right" : "48px",
            "width" : "auto",
            "height" : "auto",
            "z-index" : "9999"
        });

        ul.css({
            "list-style-type" : "none",
            "display" : "flex",
            "flex-direction" : "column"
        });

        li.css({
            "margin-bottom" : "20px"
        });

        div.css({
            "width" : ringListSize,
            "height" : ringListSize,
            "border" : "2px solid " + ringListColor,
            "border-radius" : "50%",
            "cursor" : "pointer",
            "background-color" : "rgba(255, 255, 255, 0)"
        });
    }


    // # 3) Create a list for DOM aside
    createAside(i){

        var list = "<aside id=\"aside-scroll\"><ul id=\"ul-scroll\">";

        for ( var a = 0 ; a < i ; a++ ) {
            
            list += "<li class=\"asidelist\">" + this.anchors[a] + "</li>";
        }

        list += "</ul></aside>";

        this.$body.append(list);
    }


    // # 4) Current Page Settings
    fcurrentPage(i){

        var i = i;
        var h = this.navHeight;
        var app = this;

        $(window).on('scroll' ,function(){
            
            app.$scrollbar = $(window).scrollTop();
            
            var scrollbar = app.$scrollbar;

            for (var y = 0 ; y < i ; y++) {
                
                var min = (h * (y + 1));
                var max = (h * (y + 2));

                if (scrollbar <= h) {
                    
                    app.currentPage = y + 1;
                    break;
                } 

                if (scrollbar > min && scrollbar < max){
                    
                    app.currentPage = y + 2;
                    break;
                }
            }
        });
    }
    

    // # 5) Keys Settings
    keymap(i, setTimeAnimation){

        var i = i;
        var app = this;
        var flag = true; // bool for animation

        $(document).keydown(function(e){

            if (flag == false) {
                return;
            }

            if (e.keyCode != 40 || e.keyCode != 38) {
                event.preventDefault();
                flag = true;
            }

            flag = false;

            // Down
            if (e.keyCode == 40) {

                if (app.counter != i) {
                    app.counter += 1
                }

                var counter = app.counter;

                if (counter < (i + 1)) {

                    app.currentPage = app.counter;

                    app.hoverList(counter);

                    $('html, body').animate({
                        scrollTop : $(".page-" + app.counter).offset().top
                    }, setTimeAnimation, function(){
                                flag = true;
                            });
                }
            } else if (e.keyCode == 38) {
                
                if (app.counter != 1) {
                    app.counter -= 1
                }
                
                var counter = app.counter;

                if (counter > 0) {

                    app.currentPage = app.counter;

                    app.hoverList(counter);

                    $('html, body').animate({
                        scrollTop : $(".page-" + app.counter).offset().top
                    }, setTimeAnimation, function(){
                                flag = true;
                            });
                }
            }
        });
    }


    // # 6) Scroll event
    scrollWinY(i, setTimeAnimation){

        var i = i;
        var app = this;
        var flag = true; // bool for animation

        $(document).bind('DOMMouseScroll mousewheel MozMousePixelScroll', function(e){

            if (flag == false) {
                return;
            }

            //descente neg //montee pos
            var wheelEvent = event.wheelDeltaY;

            flag = false;

            if (wheelEvent < 0) {

                if (app.counter != i) {
                    app.counter += 1
                }

                var counter = app.counter;

                if (counter < (i + 1)) {

                    app.currentPage = app.counter;

                    app.hoverList(counter);

                    $('html, body').animate({
                        scrollTop : $(".page-" + app.counter).offset().top
                    }, setTimeAnimation, function(){
                                flag = true;
                            });
                }
                

            } else {

                if (app.counter != 1) {
                    app.counter -= 1
                }
                
                var counter = app.counter;

                if (counter > 0) {

                    app.currentPage = app.counter;

                    app.hoverList(counter);

                    $('html, body').animate({
                        scrollTop : $(".page-" + app.counter).offset().top
                    }, setTimeAnimation, function(){
                                flag = true;
                            });
                }
            }
        });
    }


    // # 7) Navigator detection
    navigatorClient(){

        if(navigator.userAgent.indexOf("Firefox") != -1 ) {
            this.$navigator = "Firefox";
        } else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) {
            this.$navigator = "IE"; 
        } else {
            this.$navigator = "Default";
        }
    }


    // # 8) Keys px
    keysSettingsPx(){

        if (this.$navigator == 'Default') {

            this.keysPx = 40;

        } if (this.$navigator == 'Firefox') {
            
            this.keysPx = 48;
        }
    }


    // 9) Add color on eventlist on client page.
    hoverList(ctp){

        var divanchor = this.$divanchor;

        if (divanchor.hasClass('actual-Session')) {
            
            $('.actual-Session').css({
                "background-color" : "rgba(255, 255, 255, 0)"
            });
            
            divanchor.removeClass('actual-Session');
        }

        $('#divpage-' + ctp).addClass('actual-Session');

        $('.actual-Session').css({
            "background-color" : this.settings.ringActualSessionColor
        });
    }


    // # 10) Anchor on click
    anchorClick(){
    
        var app = this;
        var anchor = $('#ul-scroll').find('a');

        anchor.on('click', function(){

            var idom = $(this).children().attr('id');
            var ctp = idom.replace("divpage-", "");

            app.counter = parseInt(ctp);
            app.currentPage = app.counter;

            app.hoverList(app.counter);

            console.log(app.hoverList(app.counter));

            // var divanchor = app.$divanchor;

            // if (divanchor.hasClass('actual-Session')) {
                
            //     $('.actual-Session').css({
            //         "background-color" : "rgba(255, 255, 255, 0)"
            //     });
                
            //     divanchor.removeClass('actual-Session');
            // }
    
            // $('#divpage-' + app.counter).addClass('actual-Session');
    
            // $('.actual-Session').css({
            //     "background-color" : "white"
            // });
        });
    }


    // # 11) Display Css for mouse hoverlist
    mouseHover(ringHoverColor, ringActualSessionColor){

        var app = this;
        var div = $('.divanchor');
        var self = null;

        div.hover(function(){

            self = $(this);

            self.css({

                "background-color" : ringHoverColor
            });
            
        }, function(){

            if (self.hasClass('actual-Session')) {

                self.css({
                    "background-color" : ringActualSessionColor
                });
                return;

            } else {

                self.css({
                    "background-color" : "rgba(255, 255, 255, 0)"
                });
            }
        });
    }
}