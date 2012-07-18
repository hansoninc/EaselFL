

var TestUtils = (function(){
	
var ScriptLoader = {
    
    /**
     * Load a script
     * @param String a script URL
     * @param Function callback method
     */
    load : function( filename, finished ){
        var fired = false;
        var fileref;
      
        fileref = document.createElement("script");
        fileref.setAttribute("type","text/javascript");
        fileref.setAttribute("src",filename);
        
        var handleLoad = function() {
            if(!fired) {
                fired = true;
                finished.call(null);
                try {
                  delete fileref.onreadystatechange;
                }
                catch( err ) {}
                try {
                  delete fileref.onload;
                }
                catch( err2 ) {}
            }
        };
        
        if(document.all) {
            fileref.onreadystatechange = function () {
                if (this.readyState === 'complete' || this.readyState === 'loaded') {
                    handleLoad();
                }
            };
        }
        else {
            fileref.onload = function () { handleLoad();};
        }
        
        document.getElementsByTagName("head")[0].appendChild(fileref);  
    },
    
    
    /**
     * Load a set of scripts in order
     * @param Array list of URLs
     * @param Function callback method
     */
    loadInOrder : function( files, finished ) {
      
        var next = function(){
            if(files.length===0) {
                finished();
            }else{
                ScriptLoader.load(files.shift(), next);
            }
        }
        
        files = files.slice(0);
        next();
    }
  };
	
	
    var usingCanvas = false;	
    
    function buildHTML(label, swapLabel){
        var doc = document;

        var cont = document.createElement('div');
        cont.setAttribute('id', 'testContainer');
        doc.body.appendChild(cont);
        
        var curRender = doc.createElement('div');
        curRender.setAttribute('id','curRender');
        curRender.innerHTML = label;
        doc.body.appendChild(curRender);
        
        var swap = doc.createElement('a');
        swap.setAttribute('id', 'swap');
        swap.setAttribute('href', '#');
        swap.setAttribute('onclick', 'TestUtils.swapRenderMethod(); return false;');
        swap.innerHTML = swapLabel;
        doc.body.appendChild(swap);
    }
    
    
    
    return {
        useCanvas : window.location.search.toUpperCase().indexOf('CANVAS')>=0,	
    
        loadWithEaselJS : function(init) {
            usingCanvas = true;
            buildHTML('Canvas + EaselJS', 'view in Flash with EaselFL');
            ScriptLoader.load('js/easeljs-0.4.2.min.js', init);
        },
      
        loadWithEaselFL : function(init) {
            usingCanvas = false;
            buildHTML('Flash + EaselFL', 'view in Canvas with EaselJS');
            
            ScriptLoader.loadInOrder([
                '../js/swfobject.js',
                '../js/easelfl/geom/Matrix2D.js',
                '../js/easelfl/geom/Point.js',
                '../js/easelfl/geom/Rectangle.js',
                '../js/easelfl/utils/UID.js',
                '../js/easelfl/utils/CrossBrowser.js',
                '../js/easelfl/display/CanvasFl.js',
                '../js/easelfl/display/DisplayObject.js',
                '../js/easelfl/display/Container.js',
                '../js/easelfl/display/Stage.js',
                '../js/easelfl/display/Graphics.js',
                '../js/easelfl/display/Shape.js',
                '../js/easelfl/display/ImageFl.js',
                '../js/easelfl/display/Bitmap.js',
                '../js/easelfl/display/FrameFl.js',
                '../js/easelfl/display/SpriteSheet.js',
                '../js/easelfl/display/BitmapAnimation.js',
                '../js/easelfl/display/Text.js',
                '../js/easelfl/display/Shadow.js',
                '../js/easelfl/events/MouseEvent.js',
                '../js/easelfl/utils/Ticker.js'
            ], init)
        },
        
        swapRenderMethod : function() {
            window.location = window.location.href.split('?')[0] + (!usingCanvas ? '?canvas' : '')
        }
      };
})()