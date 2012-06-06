/*
* Shadow
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
* 
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
* 
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

(function(window) {

/**
* Encapsulates the properties required to define a shadow to apply to a DisplayObject via it's .shadow property.
* @class Shadow
* @constructor
* @param {String} color The color of the shadow.
* @param {Number} offsetX The x offset of the shadow.
* @param {Number} offsetY The y offset of the shadow.
* @param {Number} blur The size of the blurring effect.
**/
var Shadow = function(color, offsetX, offsetY, blur) {
  this.initialize(color, offsetX, offsetY, blur);
}
var p = Shadow.prototype;

	p._flChange = null;
	
// static public properties:
	/**
	 * An identity shadow object (all properties are set to 0). Read-only.
	 * @property identity
	 * @type Shadow
	 * @static
	 * @final
	 **/
	Shadow.identity = null; // set at bottom of class definition.
	
// public properties:
	/** The color of the shadow.
	 * property color
	 * @type String
	 * @default null
	*/
	p.color = null;
	
	/** The x offset of the shadow.
	 * property offsetX
	 * @type Number
	 * @default 0
	*/
	p.offsetX = 0;
	
	/** The y offset of the shadow.
	 * property offsetY
	 * @type Number
	 * @default 0
	*/
	p.offsetY = 0;
	
	/** The blur of the shadow.
	 * property blur
	 * @type Number
	 * @default 0
	*/
	p.blur = 0;
	
// constructor:
	/** 
	 * Initialization method.
	 * @method initialize
	 * @protected
	 * @param {String} color The color of the shadow.
	 * @param {Number} offsetX The x offset of the shadow.
	 * @param {Number} offsetY The y offset of the shadow.
	 * @param {Number} blur The size of the blurring effect.
	 **/
	p.initialize = function(color, offsetX, offsetY, blur) {
		this.color = color;
		this.offsetX = offsetX;
		this.offsetY = offsetY;
		this.blur = blur;
		this._flChange = [];
	}
	
// public methods:
	/**
	 * Returns a string representation of this object.
	 * @method toString
	 * @return {String} a string representation of the instance.
	 **/
	p.toString = function() {
		return "[Shadow]";
	}
	
	
	/**
	 * Returns a clone of this Shadow instance.
	 * @method clone
	 @return {Shadow} A clone of the current Shadow instance.
	 **/
	p.clone = function() {
		return new Shadow(this.color, this.offsetX, this.offsetY, this.blur);
	}
	
	p._flSyncProps = function() {
	  
		//-- Synchronize Color		
		if( this.color !== this._flColor) {			
			this._flColor = this.color;
			this._flChange.push([this.id, 'cl', this.color]);
		}
		
		//-- Synchronize OffsetX		
		if( this.offsetX !== this._flOffsetX) {			
			this._flOffsetX = this.offsetX;
			this._flChange.push([this.id, 'ox', this.offsetX]);
		}
		
		//-- Synchronize OffsetY		
		if( this.offsetY !== this._flOffsetY) {			
			this._flOffsetY = this.offsetY;
			this._flChange.push([this.id, 'oy', this.offsetY]);
		}
		
		//-- Synchronize Blur		
		if( this.blur !== this._flBlur) {			
			this._flBlur = this.blur;
			this._flChange.push([this.id, 'cl', this.blur]);
		}
	}
	
	p._flColor = null;
	p._flOffsetX = 0;
	p._flOffsetY = 0;
	p._flBlur = 0;
	
	// this has to be populated after the class is defined:
	// @TODO decide if this is needed in flash version
	Shadow.identity = new Shadow("transparent", 0, 0, 0);
	
window.Shadow = Shadow;
}(window));