/* 延时插件 */
(function($) {
    '$:nomunge';
    var cache = {},
        doTimeout = 'doTimeout',
        aps = Array.prototype.slice;
    $[doTimeout] = function() {
        return p_doTimeout.apply(window, [ 0 ].concat(aps.call(arguments)));
    };
    $.fn[doTimeout] = function() {
        var args = aps.call(arguments),
            result = p_doTimeout.apply(this, [ doTimeout + args[0] ].concat(args));
        return typeof args[0] === 'number' || typeof args[1] === 'number'
            ? this
            : result;
    };
    function p_doTimeout(jquery_data_key) {
        var that = this,
            elem,
            data = {},
            method_base = jquery_data_key ? $.fn : $,
            args = arguments,
            slice_args = 4,
            id = args[1],
            delay = args[2],
            callback = args[3];
        if (typeof id !== 'string') {
            slice_args--;
            id = jquery_data_key = 0;
            delay = args[1];
            callback = args[2];
        }
        if (jquery_data_key) {
            elem = that.eq(0);
            elem.data(jquery_data_key, data = elem.data(jquery_data_key) || {});
        } else if (id) {
            data = cache[ id ] || ( cache[ id ] = {} );
        }
        data.id && clearTimeout(data.id);
        delete data.id;
        function cleanup() {
            if (jquery_data_key) {
                elem.removeData(jquery_data_key);
            } else if (id) {
                delete cache[ id ];
            }
        };
        function actually_setTimeout() {
            data.id = setTimeout(function() {
                data.fn();
            }, delay);
        };

        if (callback) {
            data.fn = function(no_polling_loop) {
                if (typeof callback === 'string') {
                    callback = method_base[ callback ];
                }
                callback.apply(that, aps.call(args, slice_args)) === true && !no_polling_loop
                    ? actually_setTimeout()
                    : cleanup();
            };
            actually_setTimeout();
        } else if (data.fn) {
            delay === undefined ? cleanup() : data.fn(delay === false);
            return true;
        } else {
            cleanup();
        }
    };
})(jQuery);


/* 模版替换函数 */
var template=function(e,t){return template[typeof t=="object"?"render":"compile"].apply(template,arguments)};(function(e,t){"use strict";e.version="1.4.0",e.openTag="<%",e.closeTag="%>",e.parser=null,e.render=function(e,t){var n=l(e);return n===undefined?c({id:e,name:"Render Error",message:"Not Cache"}):n(t)},e.compile=function(t,r){function u(n){try{return(new s(n)).template}catch(o){return i?(o.id=t||r,o.name="Render Error",o.source=r,c(o)):e.compile(t,r,!0)(n)}}var i=arguments[2];typeof r!="string"&&(i=r,r=t,t=null);try{var s=f(r,i)}catch(o){return o.id=t||r,o.name="Syntax Error",c(o)}return u.prototype=s.prototype,u.toString=function(){return s.toString()},t&&(n[t]=u),u},e.helper=function(e,t){a[e]=t};var n={},r="".trim,i=r&&!t.document,s={},o=function(){var e=Array.prototype.forEach||function(e,t){var n=this.length>>>0;for(var r=0;r<n;r++)r in this&&e.call(t,this[r],r,this)};return function(t,n){e.call(t,n)}}(),u=Object.create||function(e){function t(){}return t.prototype=e,new t},a=e.prototype={$forEach:o,$render:e.render,$getValue:function(e){return e===undefined?"":e}};o("break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield".split(","),function(e){s[e]=!0});var f=function(t,n){function x(e){return p+=e.split(/\n/).length-1,e=e.replace(/('|"|\\)/g,"\\$1").replace(/\r/g,"\\r").replace(/\n/g,"\\n"),e=m[1]+"'"+e+"'"+m[2],e+"\n"}function T(e){var t=p;return l?e=l(e):n&&(e=e.replace(/\n/g,function(){return p++,"$line="+p+";"})),e.indexOf("=")===0&&(e=e.substring(1).replace(/[\s;]*$/,""),r&&(e="$getValue("+e+")"),e=m[1]+e+m[2]),n&&(e="$line="+t+";"+e),N(e),e+"\n"}function N(e){e=e.replace(/\/\*.*?\*\/|'[^']*'|"[^"]*"|\.[\$\w]+/g,""),o(e.split(/[^\$\w\d]+/),function(e){if(/^this$/.test(e))throw{message:'Prohibit the use of the "'+e+'"'};if(!e||s.hasOwnProperty(e)||/^\d/.test(e))return;d.hasOwnProperty(e)||(C(e),d[e]=!0)})}function C(e){var t;e==="print"?t=y:e==="include"?t=b:a.hasOwnProperty(e)?t="$helpers."+e:t="$data."+e,v+=e+"="+t+","}var i=e.openTag,f=e.closeTag,l=e.parser,c=t,h="",p=1,d={$out:!0,$line:!0},v="var $helpers=this,"+(n?"$line=0,":""),m=r?["$out='';","$out+=",";","$out"]:["$out=[];","$out.push(",");","$out.join('')"],g=r?"if(content!==undefined){$out+=content;return content}":"$out.push(content);",y="function(content){"+g+"}",b="function(id,data){if(data===undefined){data=$data}var content=$helpers.$render(id,data);"+g+"}";o(c.split(i),function(e,t){e=e.split(f);var n=e[0],r=e[1];e.length===1?h+=x(n):(h+=T(n),r&&(h+=x(r)))}),c=h,n&&(c="try{"+c+"}catch(e){"+"e.line=$line;"+"throw e"+"}"),c=v+m[0]+c+"this.template="+m[3];try{var w=new Function("$data",c),E=w.prototype=u(a);return E.toString=function(){return this.template},w}catch(S){throw S.temp="function anonymous($data) {"+c+"}",S}},l=function(t){var r=n[t];if(r===undefined&&!i){var s=document.getElementById(t);return s&&e.compile(t,s.value||s.innerHTML),n[t]}if(n.hasOwnProperty(t))return r},c=function(e){function r(){return r+""}var n="[template]:\n"+e.id+"\n\n[name]:\n"+e.name;return e.message&&(n+="\n\n[message]:\n"+e.message),e.line&&(n+="\n\n[line]:\n"+e.line,n+="\n\n[source]:\n"+e.source.split(/\n/)[e.line-1].replace(/^[\s\t]+/,"")),e.temp&&(n+="\n\n[temp]:\n"+e.temp),t.console&&console.error(n),r.toString=function(){return"{Template Error}"},r}})(template,this),typeof module!="undefined"&&module.exports&&(module.exports=template)


//单位转换
var _tonum = function(thisVale, maxValue){
	if(!thisVale && thisVale !== 0 || typeof thisVale === 'number'){
		if(thisVale > maxValue){ thisVale = maxValue}
		return thisVale;
	};
	var last = thisVale.length-1;
	if(thisVale.lastIndexOf('x') === last){
		thisVale = parseInt(thisVale);
	} else if (thisVale.lastIndexOf('%') === last){
		thisVale = parseInt(maxValue * thisVale.split('%')[0]/100);  	
	};

	if( thisVale > maxValue ){ thisVale = maxValue; }
		return thisVale;
}
//封装
var _alert = function(msg, ok, title){
		ZUI.DIALOG.dialog({
			title		: title,
			msg			: msg,
			ok			: ok,
			cancelValue	: null
		})
};
var _confirm = function(conf){ ZUI.DIALOG.dialog(conf) };
// 清除文本选择
var clsSelect = 'getSelection' in window ? function () {
	window.getSelection().removeAllRanges();
} : function () {
	try {
		document.selection.empty();
	} catch (e) {};
};
