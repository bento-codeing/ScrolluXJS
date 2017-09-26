var anchor = new Object();

class Scroll {

    constructor(){
        this.$dom = null;
        this.$anchor = null;

        this.li = null;
        this.pageId = null;

        this.anchor = null;
        this.arrayAnchor = [];
    }

    init(dom, li){

        if (dom == 'default') {
            this.$dom = $('body');
        } else {
            this.$dom = dom;
        }

        this.li = li;
        
        this.anchor = anchor;
        this.hrefAnchor(anchor);
        this.createList(li);
        this.asideActivatedHoverPage();
        this.asideClick(li);
        this.scrollWheel();
        this.scrollKey();
        this.displayCSS();
    }

    createList(li){

        var list = "<aside id=\"aside-scroll\"><ul id=\"ul-scroll\">";

        for ( var i = 0 ; i < li ; i++ ) {

            list += "<li class=\"asideList\">" + this.arrayAnchor[i] + "</li>";
        }

        list += "</ul></aside>";

        this.$dom.append(list);
    }

    hrefAnchor(anchor){

        var li = 1;
        
        for (var prop in anchor){
            
            // console.log(`anchor.${prop} = ${anchor[prop]}`);

            var a = "<a href=\""+ `${anchor[prop]}` +"\" class=\"anchor "+ li +"\">"
                   +"<div id=\"div_for_page_"+ li +"\" class=\"divanchor\"></div>"
                   +"</a>";

            this.arrayAnchor.push(a);

            li += 1;
        }
    }

    displayCSS(){
        var aside = $('#aside-scroll');
        var ul = $('#ul-scroll');
        var li = $('.asideList');
        var div = $('.divanchor');

        var asideHeight = aside.height();
        
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
            "width" : "9px",
            "height" : "9px",
            "border" : "2px solid white",
            "border-radius" : "50%",
            "cursor" : "pointer"
        });

        div.mouseover(function(){
            $(this).css({
                "background-color" : "white"
            });
        });

        div.mouseout(function(){
            $(this).css({
                "background-color" : "rgba(255, 255, 255, 0)"
            });
        });
    }

    asideClick(li){
        
        var app = this;
        var flag = false;

        this.$anchor = $('.anchor');

        this.$anchor.on('click', function(){

            var self = $(this);

            for (var i = 1 ; i <= li ; i++) {

                if (self.hasClass(i)) {

                    app.pageId = i;
                    app.asideActivatedHoverPage();
                    
                    app.$dom.animate({

                        scrollTop: $('#page-' + i).offset().top

                    }, 1000);
                }
            }
        })
    }

    asideActivatedHoverPage(){
        
        if (this.pageId == null) {
            this.pageId = 1;
        }

        var app = this;
        var i = this.pageId;
        var section = $('#page-' + i);
        var divanchor = $('.divanchor');

        section.on('mouseenter', function(){

            if (divanchor.hasClass('actual-Session')) {

                $('.actual-Session').css({
                    "background-color" : "rgba(255, 255, 255, 0)"
                });
                
                divanchor.removeClass('actual-Session');
            }

            $('#div_for_page_' + i).addClass('actual-Session');

            $('.actual-Session').css({
                "background-color" : "white"
            });
        });
    }


    scrollWheel(){

        var app = this;
        var flag = true;
        var i = this.pageId;

        $(document).bind('DOMMouseScroll mousewheel MozMousePixelScroll', function(e){

            if (app.pageId == null) {
                app.pageId = 1;
            }

            if (flag == false) {
                return;
            }

            //descente neg //montee pos
            // console.log(event.wheelDeltaY);
            var thEvent = event.wheelDeltaY;
            var counter = parseInt(app.pageId); 
            var li = parseInt(app.li);
            var lessli = li - 1;

            flag = false;

            if (thEvent < 0) {
                // window.scrollTo(0, window.scrollY + 1440);
                counter -= 1;

                if (counter < li) {

                    if (counter != lessli) {
                        app.pageId += 1;
                    }
                    
                    app.asideActivatedHoverPage();

                    $('html, body').animate({
                        scrollTop : $("#page-" + app.pageId).offset().top
                    }, 1000, function(){
                                flag = true;
                            });
                }
                

            } else {
                // window.scrollTo(0, window.scrollY - 1440);
                counter -= 1;

                if (counter > -1) {

                    if (counter != 0) {
                        app.pageId -= 1;
                    }
                    
                    app.asideActivatedHoverPage();
                    
                    $('html, body').animate({
                        scrollTop : $("#page-" + app.pageId).offset().top
                    }, 1000, function(){
                        flag = true;
                    });
                }
            }
        });
    }

    scrollKey(){

        var app = this;
        var flag = true;
        var i = this.pageId;

        $(document).keydown(function(e){

            if (app.pageId == null) {
                app.pageId = 1;
            }

            if (flag == false) {
                return;
            }

            var counter = parseInt(app.pageId); 
            var li = parseInt(app.li);
            var lessli = li - 1;

            flag = false;

            if (e.keyCode == 40) {

                counter -= 1;

                if (counter < li) {

                    if (counter != lessli) {
                        app.pageId += 1;
                    }
                    
                    app.asideActivatedHoverPage();

                    $('html, body').animate({
                        scrollTop : $("#page-" + app.pageId).offset().top
                    }, 1000, function(){
                                flag = true;
                            });
                }
            } 
            
            if (e.keyCode == 38) {

                counter -= 1;

                if (counter > -1) {

                    if (counter != 0) {
                        app.pageId -= 1;
                    }
                    
                    app.asideActivatedHoverPage();
                    
                    $('html, body').animate({
                        scrollTop : $("#page-" + app.pageId).offset().top
                    }, 1000, function(){
                        flag = true;
                    });
                }
            }
        });
    }
}



if (ctp < i) {
    
    if (ctp != (i - 1)) {

        ctp += 1;
    }

    $('html, body').animate({
        scrollTop : $(".page-" + ctp).offset().top
    }, 1000, function(){
                flag = true;
            });
}