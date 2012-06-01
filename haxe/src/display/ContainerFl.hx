package display;

import flash.display.Sprite;
import flash.display.DisplayObjectContainer;
import flash.display.DisplayObject;

class ContainerFl extends DisplayObjectFl, implements IExec, implements IDisplayable{
	
/**
 * TODO: handle sortChildren, hitTest, getObjectsUnderPoint, clone
 **/
	
	static private var execs:Hash<Dynamic>;
	
	static public function init(){
		execs = new Hash();
		DisplayObjectFl.init(execs);
		execs.set('ac', addChild );
		execs.set('aca', addChildAt );
		execs.set('rc', removeChild );
		execs.set('rca', removeChildAt );
		execs.set('rac', removeAllChildren);
		execs.set('sc', swapChildren);
		execs.set('sca', swapChildrenAt);
	}
	
	inline static private function addChild(target:ContainerFl, id:String):Void{
		target.container.addChild(Control.displays.get(id).display);	
	}
	
	/**
	 * Add child at index; props is array in form ['id', index]
	 */
	inline static private function addChildAt(target:ContainerFl, props:Array<Dynamic>):Void{
		target.container.addChildAt(Control.displays.get(props[0]).display, props[1]);	
	}
	
	inline static private function removeChild(target:ContainerFl, id:String):Void{
		target.container.removeChild(Control.displays.get(id).display);	
	}
	
	inline static private function removeChildAt(target:ContainerFl, index:Int):Void{
		target.container.removeChildAt(index);	
	}
	
	inline static private function removeAllChildren(target:ContainerFl, ?nada:Dynamic):Void{
		var numChildren = target.container.numChildren;
		while(numChildren-->0){
			target.container.removeChildAt(numChildren);
		}
	}
	
	inline static private function swapChildren(target:ContainerFl, props:Array<Dynamic>):Void{
		target.container.swapChildren(Control.displays.get(props[0]).display,Control.displays.get(props[1]).display);
	}
	
	inline static private function swapChildrenAt(target:ContainerFl, props:Array<Int>):Void{
		target.container.swapChildrenAt(props[0], props[1]);
	}
	
	public var container:DisplayObjectContainer;
	
	public function new(id:String){
		super(id);
		this.container = display = new Sprite();
	}
	
	inline public function exec(method:String, ?arguments:Dynamic=null):Dynamic{
		#if debug
			if(execs.exists(method)){
		#end
		
		return execs.get(method)( this, arguments);
		
		#if debug
			} else {
				throw 'no command mapped to "'+method+'" in ContainerFl';	
			}
		#end
	}
}

