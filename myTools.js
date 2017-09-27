// 这是一个获取兼容性样式的函数
function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj)[attr];
    }
}
function first(obj) {
    var ele = obj.firstElementChild || obj.firstChild;
    if (ele && ele.nodeType == 1) {
        return ele;
    } else {
        return null;
    }
}
function last(obj) {
    var ele = obj.lastElementChild || obj.lastChild;
    if (ele && ele.nodeType == 1) {
        return ele;
    } else {
        return null;
    }
}
function prev(obj) {
    var ele = obj.previousElementSibling || obj.previousSibling;
    if (ele && ele.nodeType == 1) {
        return ele;
    } else {
        return null;
    }
}
function next(obj) {
    var ele = obj.nextElementSibling || obj.nextSibling;
    if (ele && ele.nodeType == 1) {
        return ele;
    } else {
        return null;
    }
}
function $(selector) {
    if (selector[0] == "#") {
        return document.getElementById(selector.substring(1));
    } else if (selector.charAt(0) == ".") {
        return document.getElementsByClassName(selector.substring(1));
    } else {
        return document.getElementsByTagName(selector);
    }
}
		// 这是封装了一个解绑的函数
		function unbind(obj,evType,evFn) {
			if(obj.removeEventListener) {
				obj.removeEventListener(evType,obj[String(evFn)],false);
			}else if(obj.detachEvent) {
				obj.detachEvent("on"+evType,obj[String(evFn)]);
			}else {
				obj["on"+evType] = null;
			}
			
		}
		
		// 这是一个绑定方式的兼容性函数
		function bind(obj,evType,evFn) {
			// 根据浏览器能力进行检测  如果识别支持addEventListener 就直接使用这个绑定方式
			// 如果不支持这个方法 则按照后面的方式进行绑定
			
			obj[String(evFn)] = function(){
				evFn.call(obj);
            }
			
			if(obj.addEventListener){
				// 标准浏览器走这个绑定
				obj.addEventListener(evType,evFn,false);
				obj[String(evFn)] = evFn;
			}else if(obj.attachEvent) {
				//IE6 7 8 走这个绑定方式
				obj.attachEvent("on"+evType,obj[String(evFn)]);
			} else {
				// 以上方法都不支持的很老的浏览器 走这个方法
				obj["on"+evType] = evFn;
				
			}
		}