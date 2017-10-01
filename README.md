# ScrolluXJS
Plugin jQuery : Create a onepage scroll for your website :sunrise:

<br/>


*Preview :* 
![alt text](https://github.com/ARKHN3B/ScrolluXJS/blob/master/example.png "example")

***

<br/>

### The procedure is simple :

<dl>
  <dt>Step 1 :</dt>
  <dd>1. In first time, you need to download the file <b>scrollux.js</b> or <b>scrollux.min.js</b> .</dd>
  <dt>Step 2 :</dt>
  <dd>2. In second time, you need to add the script in your HTML5 :</dd>
</dl>

 `<script src="./assets/scripts/scrollux.js"></script>`
 
 > ! Important : You must place this script on the end of your html body.
 
 > And you need to have jQuery, of course !
 
 <dl>
  <dt>Step 3 :</dt>
  <dd>3. Add that line on your script :</dd>
</dl>

```javascript
var scroll = new Scrollux({});
```
 
 <dl>
  <dt>Options :</dt>
  <dd>4. You can set the style of the buttons list, managed the scrolling time of the animation or add a footer with that parameters :</dd>
</dl>

```javascript
var scroll = new Scrollux({
                overflowY : "hidden",
                overflowX : "hidden",
                ringListColor : "#FFF",
                ringListSize : "9px", 
                ringActualSessionColor : "#FFF",
                ringHoverColor : "#FFF",
                setTimeAnimation : 1000,
                footer : false,
                footerSize : "500px" 
            });
```    
<br/>

***


###### If you like it, shares with your friends or with your collaborators ! :wink: :thumbsup:
