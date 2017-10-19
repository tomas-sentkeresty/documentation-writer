var Documentation = (function() {
    var U = {
        moduleName: 'DefaultModule',
        version: '1.0.0',
        utilsVersion: '1.0.1',
        lan: {SK:'SK',CZ:'CZ',EN:'EN',DE:'DE'},
        SID: function(l){var chars='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';var len=chars.length;var lenID=(l&&!isNaN(l))?l:5;var str='';for(var i=0;i<lenID;i++){str+=chars.charAt(Math.floor(Math.random()*len));}return str;},
        UID: function(){return Math.ceil(Date.now()/1000)+'-'+U.SID(3);},
        objectKeys: function(obj){var keys=[];var k;for(k in obj){if(Object.prototype.hasOwnProperty.call(obj,k)){keys.push(k);}}return keys;},
        forIn: function(obj,fn){var len=U.objectKeys(obj).length;var i=0;for(var k in obj){if(obj.hasOwnProperty(k)){var first=(i==0);var last=((i+1)==len);fn(k,obj[k],first,last);i++;}}},
        forEach: function(arr,fn){var len=arr.length;for(var i=0;i<len;i++){var first=(i==0);var last=((i+1)==len);fn(arr[i],i,arr,first,last);}},
        map: function(arr,fn){var acc=[];for(var i=0;i<arr.length;i++){acc.push(fn(arr[i],i,arr));}return acc;},
        filter: function(arr,fn){var acc=[];for(var i=0;i<arr.length;i++){if(fn.call(null,arr[i],i,arr)){acc.push(arr[i]);}}return acc;},
        find: function(arr,fn){for(var i=0;i<arr.length;i++){if(fn.call(null,arr[i],i,arr)){return arr[i];}}return null;},
        reduce: function(arr,fn,initial,context){var acc=(initial!==undefined&&initial!==null)?initial:arr[i++];for(var i=0;i<arr.length;i++){acc=fn.call(context,acc,arr[i],i,arr);}return acc;},
        clone: function(obj,skip,skipFunctions){if(!obj){return obj;}var type=typeof(obj);if(type!=='object'||obj instanceof Date){return obj;}var length;var o;if(obj instanceof Array){length=obj.length;o=new Array(length);for(var i=0;i<length;i++){type=typeof(obj[i]);if(type!=='object'||obj[i]instanceof Date){if(skipFunctions&&type==='function'){continue;}o[i]=obj[i];continue;}o[i]=U.clone(obj[i],skip,skipFunctions);}return o;}o={};for(var m in obj){if(skip&&skip[m]){continue;}var val=obj[m];var type=typeof(val);if(type!=='object'||val instanceof Date){if(skipFunctions&&type==='function'){continue;}o[m]=val;continue;}o[m]=U.clone(obj[m],skip,skipFunctions);}return o;},
        contains: function(arrOrStr,v){if(!arrOrStr){throw new Error('invalidParameter');}if(typeof(arrOrStr)!=='string'&&!Array.isArray(arrOrStr)){throw new Error('invalidParameter');}return(arrOrStr.indexOf(v)!==-1);},
        extend: function(base,obj,rewrite){if(!base||!obj){return base;}if(typeof(base)!=='object'||typeof(obj)!=='object'){return base;}if(rewrite===undefined){rewrite=true;}var keys=Object.keys(obj);var i=keys.length;while(i--){var key=keys[i];if(rewrite||base[key]===undefined){base[key]=U.clone(obj[key]);}}return base;},
        toQueryString: function(obj,base){var queryString=[];Object.each(obj,function(v,k){if(base){k=base+'['+k+']';}var result=null;switch(typeof(v)){case'object':result=Object.toQueryString(v,k);break;case'array':var qs={};v.each(function(val,i){qs[i]=val;});result=Object.toQueryString(qs,k);break;default:result=k+'='+encodeURIComponent(v);}if(v!=null){queryString.push(result);}});return queryString.join('&');},
        argsToDebugString: function(args){var logs='';for(var i=0;i<arguments.length;i++){var arg=arguments[i];if(arg){if(typeof arg=='object'||Array.isArray(arg)){if(Array.isArray(arg)){logs+='Array('+arg.length+'): \n';}else if(typeof arg=='object'){logs+='Object: \n';}logs+=JSON.stringify(arg,null,'\t');logs+='\n';}else{logs+=arg;}}else{logs+=' '+arg;}}return logs;},
        strFormat: function(str,args){return str.replace(/\{\d+\}/g,function(text){var value=args[+text.substring(1,text.length-1)];return value===null?'':value;});},
        strHyphenize: function(str){if(typeof(str)!=='string'){return null;}return str.replace(/\B([A-Z])/g,function(g){return('-'+g[0]);}).toLowerCase();},
        strHtml: function(tag,obj){if(!tag||typeof(tag)!='string'){return'';}var pairables=['area','base','br','col','command','embed','hr','img','input','keygen','link','meta','param','source','track','wbr'];var str='<'+tag;if(!obj){obj={};}if(obj.id){str+=' id="'+obj.id+'"';}if(obj.classes&&Array.isArray(obj.classes)){str+=classesAsStr(obj);}if(obj.style&&typeof(obj.data=='object')){str+=stylesAsStr(obj.style);}str+=attrsAsStr(obj);if(obj.data&&typeof(obj.data)=='object'){str+=dataAttrsAsStr(obj.data);}if(pairables.indexOf(tag)>=0){return str+'/>';}str+='>';str+=obj.html;str+='</'+tag+'>';return str;function classesAsStr(obj){var arr=obj.classes;var str='';for(var i=0;i<arr.length;i++){var v=arr[i];if(v){v='.'+v;}}str=obj.classes.join(' ');return(str.length>0)?(' class="'+str)+'"':'';}function attrsAsStr(obj){obj=(typeof(obj)=='object')?obj:{};var str='';for(var k in obj){if(['id','classes','style','data','html'].indexOf(k)>=0){continue;}var attr=k+'="'+obj[k]+'"';str+=(str.length>0)?(' '+attr):attr;}return(str.length>0)?(' '+str):'';}function dataAttrsAsStr(obj){var str='';for(var k in obj){if(obj.hasOwnProperty(k)){var attr='data-'+k+'="'+obj[k]+'"';str+=(str.length>0)?(' '+attr):attr;}}return(str.length>0)?(' '+str):'';}function stylesAsStr(obj){var str='';for(var k in obj){str+=U.strHyphenize(k)+':'+obj[k]+';';}return(str.length>0)?(' style="'+str+'"'):'';}},
        logDebug: function(){var log=U.argsToDebugString.apply(this,arguments);console.log(U.moduleName+': '+log);},
        log: function(){var args=[].slice.call(arguments);args.unshift(U.moduleName+': ');console.log.apply(null,args);},
        logWarn: function(){var args=[].slice.call(arguments);args.unshift(U.moduleName+': ');console.warn.apply(null,args);},
        error: function(problem,message){var Co=function(problem,message){if(!problem){throw new Error('missingProblem');}message=message||null;if(problem instanceof Error){this.id=problem.message;this.message=message;}else if(typeof(problem)=='string'){this.id=problem;this.message=message;}else{throw new Error('invalidProblem');}};Co.prototype={throw:function(){throw new Error(this.id);},toString:function(){return JSON.stringify({id:this.id,message:this.message},null,'    ');}};return new Co(problem,message);},
        ErrorBuilder: function(errors){var Co=function(errors){if(errors){if(!Array.isArray(errors)){throw new Error('invalidParameter');}for(var i=0;i<errors.length;i++){if(!errors[i]||!errors[i].id){throw new Error('invalidArrayItem');}}}this.errors=errors||[];};Co.prototype={push:function(err){this.errors.push(err);},remove:function(id){var arr=this.errors;var idx=-1;for(var i=0;i<arr.length;i++){if(arr[i].id==id){idx=i;}}if(idx>-1){arr.splice(idx,1);}},clear:function(){this.errors=[];},hasError:function(id){var arr=this.errors;if(id){for(var i=0;i<arr.length;i++){if(arr[i]&&arr[i].id==id){return true;}}return false;}return arr.length>0;},throwFirst:function(){if(this.errors.length<=0){throw new Error('emptyErrorBuilder');}this.errors[0].throw();},first:function(){return this.errors[0]||null;},last:function(){return this.errors[this.errors.length-1]||null;},toString:function(){return JSON.stringify(this,null,'    ');}};return new Co(errors);},
        Schema: function(fn){var Co=function(fn){this.rule={};this.__control=null;fn.apply(null,[attr.bind(this),attrError.bind(this),attrValidate.bind(this),func.bind(this),funcError.bind(this)]);};Co.prototype={validate:function(obj,lan){var eb=new U.ErrorBuilder();for(var k in this.rule){if(this.rule.hasOwnProperty(k)){var v=obj[k];var rule=this.rule[k];var mes=rule.message[lan]||rule.message['default']||('Invalid property "'+k+'".');if(rule.required){if(rule.type==='[object Number]'){if(!v&&v!==0){eb.push(U.error(k,mes));}}else{if(!v){eb.push(U.error(k,mes));}}}if(v&&Object.prototype.toString.call(v)!==rule.type){eb.push(U.error(k,mes));}if(v&&rule.validate&&!rule.validate(v)){eb.push(U.error(k,mes));}}}return eb;},normalize:function(obj){var norm={};for(var k in this.rule){if(this.rule.hasOwnProperty(k)){var rule=this.rule[k];var val=obj[k];var typ=Object.prototype.toString.call(val);if(!val||typ!==rule.type){if(rule.type==='[object Array]'){norm[k]=[];}else if(rule.type=='[object Function]'){norm[k]=function(){};}else{norm[k]=null;}}else{norm[k]=val;}}}return norm;}};function attr(name,type,required){if(!name||typeof(name)!=='string'){throw new Error('invalidParameter');}type=strType(type);if(!type||typeof(required)!=='boolean'){throw new Error('invalidParameter');}this.__control=name;this.rule[this.__control]={type:type,required:required,message:{default:'Invalid attribute "'+name+'".'}};}function func(name){if(!name||typeof(name)!=='string'){throw new Error('invalidParameter');}this.__control=name;this.rule[this.__control]={type:'[object Function]',required:true,message:{default:'Invalid function "'+name+'".'}};}var attrError=funcError=function(a,b){if(!a||typeof(a)!=='string'){throw new Error('invalidParameter');}if(b&&typeof(b)!=='string'){throw new Error('invalidParameter');}var lan=(a&&b)?a:'default';var mes=(a&&b)?b:a;if(!this.rule[this.__control]){throw new Error('invalidOrder');}if(!this.rule[this.__control].message){this.rule[this.__control].message={};}this.rule[this.__control].message[lan]=mes;};function attrValidate(fn){if(!fn||typeof(fn)!=='function'){throw new Error('invalidParameter');}if(!this.rule[this.__control]){throw new Error('invalidOrder');}this.rule[this.__control].validate=fn;}function strType(type){if(type===Number){return'[object Number]';}else if(type===String){return'[object String]';}else if(type===Array){return'[object Array]';}else if(type===Date){return'[object Date]';}else if(type===Object){return'[object Object]';}else{null;}}return new Co(fn);},
        keyCodeToKey: function(e){var map={16:'shift',17:'ctrl',18:'alt',65:'a',66:'b',67:'c',68:'d',69:'e',70:'f',71:'g',72:'h',73:'i',74:'j',75:'k',76:'l',77:'m',78:'n',79:'o',80:'p',81:'q',82:'r',83:'s',84:'t',85:'u',86:'v',87:'w',88:'x',89:'y',90:'z'};return map[e.keyCode]||null;},
        strRemoveDiacritics: function(str){var map={'\u00a0':' ','\u07c0':'0','\u24b6':'A','\uff21':'A','\u00c0':'A','\u00c1':'A','\u00c2':'A','\u1ea6':'A','\u1ea4':'A','\u1eaa':'A','\u1ea8':'A','\u00c3':'A','\u0100':'A','\u0102':'A','\u1eb0':'A','\u1eae':'A','\u1eb4':'A','\u1eb2':'A','\u0226':'A','\u01e0':'A','\u00c4':'A','\u01de':'A','\u1ea2':'A','\u00c5':'A','\u01fa':'A','\u01cd':'A','\u0200':'A','\u0202':'A','\u1ea0':'A','\u1eac':'A','\u1eb6':'A','\u1e00':'A','\u0104':'A','\u023a':'A','\u2c6f':'A','\ua732':'AA','\u00c6':'AE','\u01fc':'AE','\u01e2':'AE','\ua734':'AO','\ua736':'AU','\ua738':'AV','\ua73a':'AV','\ua73c':'AY','\u24b7':'B','\uff22':'B','\u1e02':'B','\u1e04':'B','\u1e06':'B','\u0243':'B','\u0181':'B','\u24b8':'C','\uff23':'C','\ua73e':'C','\u1e08':'C','\u0106C':'C','\u0108':'C','\u010a':'C','\u010c':'C','\u00c7':'C','\u0187':'C','\u023b':'C','\u24b9':'D','\uff24':'D','\u1e0a':'D','\u010e':'D','\u1e0c':'D','\u1e10':'D','\u1e12':'D','\u1e0e':'D','\u0110':'D','\u018a':'D','\u0189':'D','\u1d05':'D','\ua779':'D','\u00d0':'Dh','\u01f1':'DZ','\u01c4':'DZ','\u01f2':'Dz','\u01c5':'Dz','\u025b':'E','\u24ba':'E','\uff25':'E','\u00c8':'E','\u00c9':'E','\u00ca':'E','\u1ec0':'E','\u1ebe':'E','\u1ec4':'E','\u1ec2':'E','\u1ebc':'E','\u0112':'E','\u1e14':'E','\u1e16':'E','\u0114':'E','\u0116':'E','\u00cb':'E','\u1eba':'E','\u011a':'E','\u0204':'E','\u0206':'E','\u1eb8':'E','\u1ec6':'E','\u0228':'E','\u1e1c':'E','\u0118':'E','\u1e18':'E','\u1e1a':'E','\u0190':'E','\u018e':'E','\u1d07':'E','\ua77c':'F','\u24bb':'F','\uff26':'F','\u1e1e':'F','\u0191':'F','\ua77b':'F','\u24bc':'G','\uff27':'G','\u01f4':'G','\u011c':'G','\u1e20':'G','\u011e':'G','\u0120':'G','\u01e6':'G','\u0122':'G','\u01e4':'G','\u0193':'G','\ua7a0':'G','\ua77d':'G','\ua77e':'G','\u0262':'G','\u24bd':'H','\uff28':'H','\u0124':'H','\u1e22':'H','\u1e26':'H','\u021e':'H','\u1e24':'H','\u1e28':'H','\u1e2a':'H','\u0126':'H','\u2c67':'H','\u2c75':'H','\ua78d':'H','\u24be':'I','\uff29':'I','\u00cc':'I','\u00cd':'I','\u00ce':'I','\u0128':'I','\u012a':'I','\u012c':'I','\u0130':'I','\u00cf':'I','\u1e2e':'I','\u1ec8':'I','\u01cf':'I','\u0208':'I','\u020a':'I','\u1eca':'I','\u012e':'I','\u1e2c':'I','\u0197':'I','\u24bf':'J','\uff2a':'J','\u0134':'J','\u0248':'J','\u0237':'J','\u24c0':'K','\uff2b':'K','\u1e30':'K','\u01e8':'K','\u1e32':'K','\u0136':'K','\u1e34':'K','\u0198':'K','\u2c69':'K','\ua740':'K','\ua742':'K','\ua744':'K','\ua7a2':'K','\u24c1':'L','\uff2c':'L','\u013f':'L','\u0139':'L','\u013d':'L','\u1e36':'L','\u1e38':'L','\u013b':'L','\u1e3c':'L','\u1e3a':'L','\u0141':'L','\u023d':'L','\u2c62':'L','\u2c60':'L','\ua748':'L','\ua746':'L','\ua780':'L','\u01c7':'LJ','\u01c8':'Lj','\u24c2':'M','\uff2d':'M','\u1e3e':'M','\u1e40':'M','\u1e42':'M','\u2c6e':'M','\u019c':'M','\u03fb':'M','\ua7a4':'N','\u0220':'N','\u24c3':'N','\uff2e':'N','\u01f8':'N','\u0143':'N','\u00d1':'N','\u1e44':'N','\u0147':'N','\u1e46':'N','\u0145':'N','\u1e4a':'N','\u1e48':'N','\u019d':'N','\ua790':'N','\u1d0e':'N','\u01ca':'NJ','\u01cb':'Nj','\u24c4':'O','\uff2f':'O','\u00d2':'O','\u00d3':'O','\u00d4':'O','\u1ed2':'O','\u1ed0':'O','\u1ed6':'O','\u1ed4':'O','\u00d5':'O','\u1e4c':'O','\u022c':'O','\u1e4e':'O','\u014c':'O','\u1e50':'O','\u1e52':'O','\u014e':'O','\u022e':'O','\u0230':'O','\u00d6':'O','\u022a':'O','\u1ece':'O','\u0150':'O','\u01d1':'O','\u020c':'O','\u020e':'O','\u01a0':'O','\u1edc':'O','\u1eda':'O','\u1ee0':'O','\u1ede':'O','\u1ee2':'O','\u1ecc':'O','\u1ed8':'O','\u01ea':'O','\u01ec':'O','\u00d8':'O','\u01fe':'O','\u0186':'O','\u019f':'O','\ua74a':'O','\ua74c':'O','\u0152':'OE','\u01a2':'OI','\ua74e':'OO','\u0222':'OU','\u24c5':'P','\uff30':'P','\u1e54':'P','\u1e56':'P','\u01a4':'P','\u2c63':'P','\ua750':'P','\ua752':'P','\ua754':'P','\u24c6':'Q','\uff31':'Q','\ua756':'Q','\ua758':'Q','\u024a':'Q','\u24c7':'R','\uff32':'R','\u0154':'R','\u1e58':'R','\u0158':'R','\u0210':'R','\u0212':'R','\u1e5a':'R','\u1e5c':'R','\u0156':'R','\u1e5e':'R','\u024c':'R','\u2c64':'R','\ua75a':'R','\ua7a6':'R','\ua782':'R','\u24c8':'S','\uff33':'S','\u1e9e':'S','\u015a':'S','\u1e64':'S','\u015c':'S','\u1e60':'S','\u0160':'S','\u1e66':'S','\u1e62':'S','\u1e68':'S','\u0218':'S','\u015e':'S','\u2c7e':'S','\ua7a8':'S','\ua784':'S','\u24c9':'T','\uff34':'T','\u1e6a':'T','\u0164':'T','\u1e6c':'T','\u021a':'T','\u0162':'T','\u1e70':'T','\u1e6e':'T','\u0166':'T','\u01ac':'T','\u01ae':'T','\u023e':'T','\ua786':'T','\u00de':'Th','\ua728':'TZ','\u24ca':'U','\uff35':'U','\u00d9':'U','\u00da':'U','\u00db':'U','\u0168':'U','\u1e78':'U','\u016a':'U','\u1e7a':'U','\u016c':'U','\u00dc':'U','\u01db':'U','\u01d7':'U','\u01d5':'U','\u01d9':'U','\u1ee6':'U','\u016e':'U','\u0170':'U','\u01d3':'U','\u0214':'U','\u0216':'U','\u01af':'U','\u1eea':'U','\u1ee8':'U','\u1eee':'U','\u1eec':'U','\u1ef0':'U','\u1ee4':'U','\u1e72':'U','\u0172':'U','\u1e76':'U','\u1e74':'U','\u0244':'U','\u24cb':'V','\uff36':'V','\u1e7c':'V','\u1e7e':'V','\u01b2':'V','\ua75e':'V','\u0245':'V','\ua760':'VY','\u24cc':'W','\uff37':'W','\u1e80':'W','\u1e82':'W','\u0174':'W','\u1e86':'W','\u1e84':'W','\u1e88':'W','\u2c72':'W','\u24cd':'X','\uff38':'X','\u1e8a':'X','\u1e8c':'X','\u24ce':'Y','\uff39':'Y','\u1ef2':'Y','\u00dd':'Y','\u0176':'Y','\u1ef8':'Y','\u0232':'Y','\u1e8e':'Y','\u0178':'Y','\u1ef6':'Y','\u1ef4':'Y','\u01b3':'Y','\u024e':'Y','\u1efe':'Y','\u24cf':'Z','\uff3a':'Z','\u0179':'Z','\u1e90':'Z','\u017b':'Z','\u017d':'Z','\u1e92':'Z','\u1e94':'Z','\u01b5':'Z','\u0224':'Z','\u2c7f':'Z','\u2c6b':'Z','\ua762':'Z','\u24d0':'a','\uff41':'a','\u1e9a':'a','\u00e0':'a','\u00e1':'a','\u00e2':'a','\u1ea7':'a','\u1ea5':'a','\u1eab':'a','\u1ea9':'a','\u00e3':'a','\u0101':'a','\u0103':'a','\u1eb1':'a','\u1eaf':'a','\u1eb5':'a','\u1eb3':'a','\u0227':'a','\u01e1':'a','\u00e4':'a','\u01df':'a','\u1ea3':'a','\u00e5':'a','\u01fb':'a','\u01ce':'a','\u0201':'a','\u0203':'a','\u1ea1':'a','\u1ead':'a','\u1eb7':'a','\u1e01':'a','\u0105':'a','\u2c65':'a','\u0250':'a','\u0251':'a','\ua733':'aa','\u00e6':'ae','\u01fd':'ae','\u01e3':'ae','\ua735':'ao','\ua737':'au','\ua739':'av','\ua73b':'av','\ua73d':'ay','\u24d1':'b','\uff42':'b','\u1e03':'b','\u1e05':'b','\u1e07':'b','\u0180':'b','\u0183':'b','\u0253':'b','\u0182':'b','\uff43':'c','\u24d2':'c','\u0107':'c','\u0109':'c','\u010b':'c','\u010d':'c','\u00e7':'c','\u1e09':'c','\u0188':'c','\u023c':'c','\ua73f':'c','\u2184':'c','\u24d3':'d','\uff44':'d','\u1e0b':'d','\u010f':'d','\u1e0d':'d','\u1e11':'d','\u1e13':'d','\u1e0f':'d','\u0111':'d','\u018c':'d','\u0256':'d','\u0257':'d','\u018b':'d','\u13e7':'d','\u0501':'d','\ua7aa':'d','\u00f0':'dh','\u01f3':'dz','\u01c6':'dz','\u24d4':'e','\uff45':'e','\u00e8':'e','\u00e9':'e','\u00ea':'e','\u1ec1':'e','\u1ebf':'e','\u1ec5':'e','\u1ec3':'e','\u1ebd':'e','\u0113':'e','\u1e15':'e','\u1e17':'e','\u0115':'e','\u0117':'e','\u00eb':'e','\u1ebb':'e','\u011b':'e','\u0205':'e','\u0207':'e','\u1eb9':'e','\u1ec7':'e','\u0229':'e','\u1e1d':'e','\u0119':'e','\u1e19':'e','\u1e1b':'e','\u0247':'e','\u01dd':'e','\u24d5':'f','\uff46':'f','\u1e1f':'f','\u0192':'f','\ufb00':'ff','\ufb01':'fi','\ufb02':'fl','\ufb03':'ffi','\ufb04':'ffl','\u24d6':'g','\uff47':'g','\u01f5':'g','\u011d':'g','\u1e21':'g','\u011f':'g','\u0121':'g','\u01e7':'g','\u0123':'g','\u01e5':'g','\u0260':'g','\ua7a1':'g','\ua77f':'g','\u1d79':'g','\u24d7':'h','\uff48':'h','\u0125':'h','\u1e23':'h','\u1e27':'h','\u021f':'h','\u1e25':'h','\u1e29':'h','\u1e2b':'h','\u1e96':'h','\u0127':'h','\u2c68':'h','\u2c76':'h','\u0265':'h','\u0195':'hv','\u24d8':'i','\uff49':'i','\u00ec':'i','\u00ed':'i','\u00ee':'i','\u0129':'i','\u012b':'i','\u012d':'i','\u00ef':'i','\u1e2f':'i','\u1ec9':'i','\u01d0':'i','\u0209':'i','\u020b':'i','\u1ecb':'i','\u012f':'i','\u1e2d':'i','\u0268':'i','\u0131':'i','\u24d9':'j','\uff4a':'j','\u0135':'j','\u01f0':'j','\u0249':'j','\u24da':'k','\uff4b':'k','\u1e31':'k','\u01e9':'k','\u1e33':'k','\u0137':'k','\u1e35':'k','\u0199':'k','\u2c6a':'k','\ua741':'k','\ua743':'k','\ua745':'k','\ua7a3':'k','\u24db':'l','\uff4c':'l','\u0140':'l','\u013a':'l','\u013e':'l','\u1e37':'l','\u1e39':'l','\u013c':'l','\u1e3d':'l','\u1e3b':'l','\u017f':'l','\u0142':'l','\u019a':'l','\u026b':'l','\u2c61':'l','\ua749':'l','\ua781':'l','\ua747':'l','\u026d':'l','\u01c9':'lj','\u24dc':'m','\uff4d':'m','\u1e3f':'m','\u1e41':'m','\u1e43':'m','\u0271':'m','\u026f':'m','\u24dd':'n','\uff4e':'n','\u01f9':'n','\u0144':'n','\u00f1':'n','\u1e45':'n','\u0148':'n','\u1e47':'n','\u0146':'n','\u1e4b':'n','\u1e49':'n','\u019e':'n','\u0272':'n','\u0149':'n','\ua791':'n','\ua7a5':'n','\u043b':'n','\u0509':'n','\u01cc':'nj','\u24de':'o','\uff4f':'o','\u00f2':'o','\u00f3':'o','\u00f4':'o','\u1ed3':'o','\u1ed1':'o','\u1ed7':'o','\u1ed5':'o','\u00f5':'o','\u1e4d':'o','\u022d':'o','\u1e4f':'o','\u014d':'o','\u1e51':'o','\u1e53':'o','\u014f':'o','\u022f':'o','\u0231':'o','\u00f6':'o','\u022b':'o','\u1ecf':'o','\u0151':'o','\u01d2':'o','\u020d':'o','\u020f':'o','\u01a1':'o','\u1edd':'o','\u1edb':'o','\u1ee1':'o','\u1edf':'o','\u1ee3':'o','\u1ecd':'o','\u1ed9':'o','\u01eb':'o','\u01ed':'o','\u00f8':'o','\u01ff':'o','\ua74b':'o','\ua74d':'o','\u0275':'o','\u0254':'o','\u1d11':'o','\u0153':'oe','\u01a3':'oi','\ua74f':'oo','\u0223':'ou','\u24df':'p','\uff50':'p','\u1e55':'p','\u1e57':'p','\u01a5':'p','\u1d7d':'p','\ua751':'p','\ua753':'p','\ua755':'p','\u03c1':'p','\u24e0':'q','\uff51':'q','\u024b':'q','\ua757':'q','\ua759':'q','\u24e1':'r','\uff52':'r','\u0155':'r','\u1e59':'r','\u0159':'r','\u0211':'r','\u0213':'r','\u1e5b':'r','\u1e5d':'r','\u0157':'r','\u1e5f':'r','\u024d':'r','\u027d':'r','\ua75b':'r','\ua7a7':'r','\ua783':'r','\u24e2':'s','\uff53':'s','\u015b':'s','\u1e65':'s','\u015d':'s','\u1e61':'s','\u0161':'s','\u1e67':'s','\u1e63':'s','\u1e69':'s','\u0219':'s','\u015f':'s','\u023f':'s','\ua7a9':'s','\ua785':'s','\u1e9b':'s','\u0282':'s','\u00df':'ss','\u24e3':'t','\uff54':'t','\u1e6b':'t','\u1e97':'t','\u0165':'t','\u1e6d':'t','\u021b':'t','\u0163':'t','\u1e71':'t','\u1e6f':'t','\u0167':'t','\u01ad':'t','\u0288':'t','\u2c66':'t','\ua787':'t','\u00fe':'th','\ua729':'tz','\u24e4':'u','\uff55':'u','\u00f9':'u','\u00fa':'u','\u00fb':'u','\u0169':'u','\u1e79':'u','\u016b':'u','\u1e7b':'u','\u016d':'u','\u00fc':'u','\u01dc':'u','\u01d8':'u','\u01d6':'u','\u01da':'u','\u1ee7':'u','\u016f':'u','\u0171':'u','\u01d4':'u','\u0215':'u','\u0217':'u','\u01b0':'u','\u1eeb':'u','\u1ee9':'u','\u1eef':'u','\u1eed':'u','\u1ef1':'u','\u1ee5':'u','\u1e73':'u','\u0173':'u','\u1e77':'u','\u1e75':'u','\u0289':'u','\u24e5':'v','\uff56':'v','\u1e7d':'v','\u1e7f':'v','\u028b':'v','\ua75f':'v','\u028c':'v','\ua761':'vy','\u24e6':'w','\uff57':'w','\u1e81':'w','\u1e83':'w','\u0175':'w','\u1e87':'w','\u1e85':'w','\u1e98':'w','\u1e89':'w','\u2c73':'w','\u24e7':'x','\uff58':'x','\u1e8b':'x','\u1e8d':'x','\u24e8':'y','\uff59':'y','\u1ef3':'y','\u00fd':'y','\u0177':'y','\u1ef9':'y','\u0233':'y','\u1e8f':'y','\u00ff':'y','\u1ef7':'y','\u1e99':'y','\u1ef5':'y','\u01b4':'y','\u024f':'y','\u1eff':'y','\u24e9':'z','\uff5a':'z','\u017a':'z','\u1e91':'z','\u017c':'z','\u017e':'z','\u1e93':'z','\u1e95':'z','\u01b6':'z','\u0225':'z','\u0240':'z','\u2c6c':'z','\ua763':'z',};var regexpDiacritics=/[^\u0000-\u007e]/g;return str.replace(regexpDiacritics,function(ch){return map[ch]||ch;});},
        strSlug: function(str,max){max=max||60;var self=U.strRemoveDiacritics(str.trim().toLowerCase());var builder='';var length=self.length;for(var i=0;i<length;i++){var c=self[i];var code=self.charCodeAt(i);if(builder.length>=max){break;}if(code>31&&code<48){if(builder[builder.length-1]!=='-'){builder+='-';}continue;}if((code>47&&code<58)||(code>94&&code<123)){builder+=c;}}var l=builder.length-1;return builder[l]==='-'?builder.substring(0,l):builder;},
        SerialFlow: function(result){var Co=function(result){var self=this;self.fnArray=[];self.context={result:(typeof(context)=='object')?result:{}};};Co.prototype.push=function(fn){var args=arguments&&arguments.length&&Array.prototype.slice.call(arguments,1)||[];var self=this;var argArray=args;self.fnArray.push({fn:fn,argArray:argArray});};Co.prototype.run=function(end){var self=this;(function loop(i,argArray){var obj=self.fnArray[i];if(!obj){return end&&end(null,self.context.result);}if(i===0||(Array.isArray(obj.argArray)&&obj.argArray.length>0)){obj.argArray.push(next);obj.fn.apply(self.context,obj.argArray);}else{argArray.push(next);obj.fn.apply(self.context,argArray);}function next(){var args=arguments&&arguments.length&&Array.prototype.slice.call(arguments)||[];var err=args.shift();if(err){return end&&end(err,self.context.result);}if(typeof(setImmediate)=='function'){setImmediate(function(){return loop(++i,args);});}else{return loop(++i,args);}}})(0);};return new Co(result);},
        ajax: function(obj){var xhr=new XMLHttpRequest();var res=null;var json='application/json';xhr.onreadystatechange=function(){if(xhr.readyState===4){if(xhr.status===200){if(obj.header['Accept'===json]){try{res=JSON.parse(xhr.responseText);}catch(err){console.warn('Ajax: Unable to parse success server response to JSON.');obj.error(null,xhr);}}else{res=xhr.responseText;}obj.success(res,xhr);}else{if(obj.header['Accept']===json){try{res=JSON.parse(xhr.responseText);}catch(err){console.warn('Ajax: Unable to parse error server response to JSON.');obj.error(null,xhr);}}else{res=xhr.responseText;}obj.error(res,xhr);}}};xhr.upload.onprogress=function(state){if(state.lengthComputable){var percentage=(state.loaded/state.total)*100;obj.progress(percentage.toFixed(2));}};xhr.onerror=function(){console.warn('Ajax: Unexpected ajax error.');};xhr.open(obj.method,url,true);for(var k in obj.header){var v=obj[k];xhr.setRequestHeader(k,v);}xhr.send(obj.data);},
        __domInternal: {handler:{}},
        domReady: function(fn){if(document.attachEvent?(document.readyState==="complete"):(document.readyState!=="loading")){fn();}else{document.addEventListener('DOMContentLoaded',fn);}},
        isDomEl: function(el){return(el instanceof Element||el instanceof HTMLDocument);},
        domFind: function(sel,el){var list=null;if(!sel||typeof(sel)!=='string'){throw new Error('invalidParameter');}if(el&&U.isDomEl(el)){list=el.querySelectorAll(sel);}else{list=document.querySelectorAll(sel);}if(list){if(selectingOne(sel)){return list[0]||null;}else{var arr=[];var len=list.length;arr.length=len;for(var i=0;i<len;i++){if(list[i]){arr[i]=list[i];}}return arr;}}else{if(selectingOne(sel)){return null;}return[];}function selectingOne(sel){if(U.isDomEl(sel)){return true;}else if(typeof(sel)==='string'){var parts=sel.split(/\s+/);return(parts&&parts.length==1&&parts[0][0]=='#');}return false;}},
        domHasClass: function(el,name){if(!el||!U.isDomEl(el)){throw new Error('invalidParameter');}if(el.classList){return el.classList.contains(name);}else{var exp=new RegExp('(^| )'+name+'( |$)','gi');return exp.test(el.className);}},
        domAddClass: function(sel,v){if(!sel){throw new Error('invalidParameter');}if(!v||typeof(v)!=='string'){return new Error('invalidParameter');}var els=null;if(Array.isArray(sel)){els=sel;}else if(U.isDomEl(sel)){els=[sel];}else{els=U.domFind(sel);els=Array.isArray(els)?els:[els];}if(Array.isArray(els)){var len=els.length;for(var i=0;i<len;i++){var el=els[i];if(!el){continue;}var clas=v.split(/\s+/);var lenlen=clas.length;for(var j=0;j<lenlen;j++){var cla=clas[j];addClass(el,cla);}}}function addClass(el,v){if(el.classList){el.classList.add(v);}else{el.className+=' '+v;}}},
        domRemoveClass: function(sel,v){if(!sel||!v||typeof(v)!=='string'){return new Error('invalidParameter');}var els=null;if(Array.isArray(sel)){els=sel;}else if(U.isDomEl(sel)){els=[sel];}else{els=U.domFind(sel);els=Array.isArray(els)?els:[els];}if(Array.isArray(els)){var len=els.length;for(var i=0;i<len;i++){var el=els[i];if(!el){continue;}var clas=v.split(/\s+/);var lenlen=clas.length;for(var j=0;j<lenlen;j++){var cla=clas[j];removeClass(el,cla);}}}function removeClass(el,v){if(el.classList){el.classList.remove(v);}else{el.className=el.className.replace(new RegExp('(^|\\b)'+v.split(' ').join('|')+'(\\b|$)','gi'),' ');}}},
        domToggleClass: function(sel,v){if(!sel){throw new Error('invalidParameter');}if(!v||typeof(v)!=='string'){return new Error('invalidParameter');}var els=null;if(Array.isArray(sel)){els=sel;}else if(U.isDomEl(sel)){els=[sel];}else{els=U.domFind(sel);els=Array.isArray(els)?els:[els];}if(Array.isArray(els)){var len=els.length;for(var i=0;i<len;i++){var el=els[i];if(!el){continue;}var clas=v.split(/\s+/);var lenlen=clas.length;for(var j=0;j<lenlen;j++){var cla=clas[j];toggleClass(el,cla);}}}function toggleClass(el,v){el.classList.toggle(v);}},
        domVal: function(sel,v){if(!sel){throw new Error('invalidParameter');}if(v&&typeof(v)!=='string'&&isNaN(v)){return new Error('invalidParameter');}var els=null;if(Array.isArray(sel)){els=sel;}else if(U.isDomEl(sel)){els=[sel];}else{els=U.domFind(sel);els=Array.isArray(els)?els:[els];}var arr=[];if(Array.isArray(els)){for(var i=0;i<els.length;i++){var el=els[i];if(!el){continue;}if(v===undefined){arr.push(getVal(el));}else{setVal(el,v);}}}return selectingOne(sel)?arr[0]:arr;function getVal(el){return el.value||null;}function setVal(el,v){if(v===undefined){return el.value;}else{el.value=v;}}function selectingOne(sel){if(U.isDomEl(sel)){return true;}else if(typeof(sel)==='string'){var parts=sel.split(/\s+/);return(parts&&parts.length==1&&parts[0][0]=='#');}return false;}},
        domAttr: function(sel,k,v){if(!sel){throw new Error('invalidParameter');}if(!k||typeof(k)!=='string'){throw new Error('invalidParameter');}if(v&&typeof(v)!=='string'&&isNaN(v)&&typeof(v)!==null){throw new Error('invalidParameter')}var els=null;if(Array.isArray(sel)){els=sel;}else if(U.isDomEl(sel)){els=[sel];}else{els=U.domFind(sel);els=Array.isArray(els)?els:[els];}var arr=[];if(Array.isArray(els)){for(var i=0;i<els.length;i++){var el=els[i];if(!el){continue;}if(v===undefined){arr.push(getAttr(el,k));}else{setAttr(el,k,v);}}}return selectingOne(sel)?arr[0]:arr;function getAttr(el,k){var v=el.getAttribute(k)||null;if(v){return v;}else{return el.hasAttribute(k);}}function setAttr(el,k,v){el.setAttribute(k,''+v);}function selectingOne(sel){if(U.isDomEl(sel)){return true;}else if(typeof(sel)==='string'){var parts=sel.split(/\s+/);return(parts&&parts.length==1&&parts[0][0]=='#');}return false;}},
        domData: function(sel,k,v){if(!sel){throw new Error('invalidParameter');}if(!k||typeof(k)!=='string'){throw new Error('invalidParameter');}try{v=normalizeVal(v);}catch(err){throw new Error('unableToParse');}var els=null;if(Array.isArray(sel)){els=sel;}else if(U.isDomEl(sel)){els=[sel];}else{els=U.domFind(sel);els=Array.isArray(els)?els:[els];}var arr=[];if(Array.isArray(els)){for(var i=0;i<els.length;i++){var el=els[i];if(!el){continue;}if(v===undefined){arr.push(getData(el,k));}else{setData(el,k,v);}}}return selectingOne(sel)?arr[0]:arr;function getData(el,k){if(el.__elementData&&el.__elementData[k]){return el.__elementData[k];}return el.dataset[k]||null;}function setData(el,k,v){if(typeof(v)==='string'){el.dataset[k]=v;}else{if(!el.__elementData){el.__elementData={};}el.__elementData[k]=v;}}function normalizeVal(v){if(v===undefined){return undefined;}else if(typeof(v)==='string'){return v;}else if(typeof(v)==='object'){if(!v){return null;}return v;}else if(v&&typeof(v.toString)=='function'){return v.toString();}else{throw new Error('invalidParameter');}}function selectingOne(sel){if(U.isDomEl(sel)){return true;}else if(typeof(sel)==='string'){var parts=sel.split(/\s+/);return(parts&&parts.length==1&&parts[0][0]=='#');}return false;}},
        domHtml: function(sel,v){if(!sel){throw new Error('invalidParameter');}if(v&&typeof(v)!=='string'){return new Error('invalidParameter');}var els=null;if(Array.isArray(sel)){els=sel;}else if(U.isDomEl(sel)){els=[sel];}else{els=U.domFind(sel);els=Array.isArray(els)?els:[els];}var arr=[];if(Array.isArray(els)){for(var i=0;i<els.length;i++){var el=els[i];if(!el){continue;}if(v===undefined){arr.push(getHtml(el));}else{setHtml(el,v);}}}return selectingOne(sel)?arr[0]:arr;function getHtml(el){return el.innerHTML||null;}function setHtml(el,v){el.innerHTML=v;}function selectingOne(sel){if(U.isDomEl(sel)){return true;}else if(typeof(sel)==='string'){var parts=sel.split(/\s+/);return(parts&&parts.length==1&&parts[0][0]=='#');}return false;}},
        domText: function(sel,v){if(!sel){throw new Error('invalidParameter');}if(v&&typeof(v)!=='string'){return new Error('invalidParameter');}var els=null;if(Array.isArray(sel)){els=sel;}else if(U.isDomEl(sel)){els=[sel];}else{els=U.domFind(sel);els=Array.isArray(els)?els:[els];}var arr=[];if(Array.isArray(els)){for(var i=0;i<els.length;i++){var el=els[i];if(!el){continue;}if(v===undefined){arr.push(getText(el));}else{setText(el,v);}}}return selectingOne(sel)?arr[0]:arr;function getText(el){return el.textContent||null;}function setText(el,v){el.textContent=v;}function selectingOne(sel){if(U.isDomEl(sel)){return true;}else if(typeof(sel)==='string'){var parts=sel.split(/\s+/);return(parts&&parts.length==1&&parts[0][0]=='#');}return false;}},
        domParent: function(sel){if(!sel){throw new Error('invalidParameter');}var els=null;if(Array.isArray(sel)){els=sel;}else if(U.isDomEl(sel)){els=[sel];}else{els=U.domFind(sel);els=Array.isArray(els)?els:[els];}var arr=[];if(Array.isArray(els)){for(var i=0;i<els.length;i++){var el=els[i];if(el){arr.push(getParent(el));}}}return selectingOne(sel)?arr[0]:arr;function getParent(el){return el.parentNode||null;}function selectingOne(sel){if(U.isDomEl(sel)){return true;}else if(typeof(sel)==='string'){var parts=sel.split(/\s+/);return(parts&&parts.length==1&&parts[0][0]=='#');}return false;}},
        domChildren: function(sel){if(!sel){throw new Error('invalidParameter');}var els=null;if(Array.isArray(sel)){els=sel;}else if(U.isDomEl(sel)){els=[sel];}else{els=U.domFind(sel);els=Array.isArray(els)?els:[els];}var arr=[];if(Array.isArray(els)){for(var i=0;i<els.length;i++){var el=els[i];if(el){arr.push(getChildren(el));}}}return selectingOne(sel)?arr[0]:arr;function getChildren(el){var els=el.children||[];var arr=[];for(var i=0;i<els.length;i++){arr[i]=els[i];}return arr;}function selectingOne(sel){if(U.isDomEl(sel)){return true;}else if(typeof(sel)==='string'){var parts=sel.split(/\s+/);return(parts&&parts.length==1&&parts[0][0]=='#');}return false;}},
        domSiblings: function(sel){if(!sel){throw new Error('invalidParameter');}var els=null;if(Array.isArray(sel)){els=sel;}else if(U.isDomEl(sel)){els=[sel];}else{els=U.domFind(sel);els=Array.isArray(els)?els:[els];}var arr=[];if(Array.isArray(els)){for(var i=0;i<els.length;i++){var el=els[i];if(el){arr.push(getSiblings(el));}}}return selectingOne(sel)?arr[0]:arr;function getSiblings(el){var els=(el.parentNode&&el.parentNode.children)?el.parentNode.children:[];var arr=[];for(var i=0;i<els.length;i++){var ch=els[i];if(ch!==el){arr.push(ch);}}return arr;}},
        domPrev: function(sel){if(!sel){throw new Error('invalidParameter');}var els=null;if(Array.isArray(sel)){els=sel;}else if(U.isDomEl(sel)){els=[sel];}else{els=U.domFind(sel);els=Array.isArray(els)?els:[els];}var arr=[];if(Array.isArray(els)){for(var i=0;i<els.length;i++){var el=els[i];if(el){arr.push(getPrev(el));}}}return selectingOne(sel)?arr[0]:arr;function getPrev(el){return el.previousElementSibling||null;}function selectingOne(sel){if(U.isDomEl(sel)){return true;}else if(typeof(sel)==='string'){var parts=sel.split(/\s+/);return(parts&&parts.length==1&&parts[0][0]=='#');}return false;}},
        domStyle: function(sel,k,v){if(!sel){throw new Error('invalidParameter');}if(!k||typeof(k)!=='string'){throw new Error('invalidParameter');}if(v&&(typeof(v)!=='string'&&isNaN(v))){throw new Error('invalidParameter');}var els=null;if(Array.isArray(sel)){els=sel;}else if(U.isDomEl(sel)){els=[sel];}else{els=U.domFind(sel);els=Array.isArray(els)?els:[els];}var arr=[];if(Array.isArray(els)){for(var i=0;i<els.length;i++){var el=els[i];if(!el){continue;}if(v===undefined){arr.push(getStyle(el,k));}else{setStyle(el,k,v);}}}return selectingOne(sel)?arr[0]:arr;function getStyle(el,k){return el.style[k]||null;}function setStyle(el,k,v){el.style[k]=v;}function selectingOne(sel){if(U.isDomEl(sel)){return true;}else if(typeof(sel)==='string'){var parts=sel.split(/\s+/);return(parts&&parts.length==1&&parts[0][0]=='#');}return false;}},
        domFadeIn: function(sel,t){if(!sel){throw new Error('invalidParameter');}var els=null;if(Array.isArray(sel)){els=sel;}else if(U.isDomEl(sel)){els=[sel];}else{els=U.domFind(sel);els=Array.isArray(els)?els:[els];}if(Array.isArray(els)){for(var i=0;i<els.length;i++){var el=els[i];if(el){fadeIn(el,t);}}}function fadeIn(el,t){el.style.transition='opacity '+(t&&!isNaN(t)&&t>0?t:250)+'ms';el.style.opacity='1';}function selectingOne(sel){if(U.isDomEl(sel)){return true;}else if(typeof(sel)==='string'){var parts=sel.split(/\s+/);return(parts&&parts.length==1&&parts[0][0]=='#');}return false;}},
        domFadeOut: function(sel,t){if(!sel){throw new Error('invalidParameter');}var els=null;if(Array.isArray(sel)){els=sel;}else if(U.isDomEl(sel)){els=[sel];}else{els=U.domFind(sel);els=Array.isArray(els)?els:[els];}if(Array.isArray(els)){for(var i=0;i<els.length;i++){var el=els[i];if(el){fadeOut(el,t);}}}function fadeOut(el,t){el.style.transition='opacity '+(t&&!isNaN(t)&&t>0?t:250)+'ms';el.style.opacity='0';}},
        domFadeTo: function(sel,o,t){if(!sel){throw new Error('invalidParameter');}if(!o||isNaN(o)||o>100||o<0){throw new Error('invalidParameter');}var els=null;if(Array.isArray(sel)){els=sel;}else if(U.isDomEl(sel)){els=[sel];}else{els=U.domFind(sel);els=Array.isArray(els)?els:[els];}if(Array.isArray(els)){var len=els.length;for(var i=0;i<els.length;i++){var el=els[i];if(el){fadeTo(el,o,t);}}}function fadeTo(el,o,t){el.style.transition='opacity '+(t&&!isNaN(t)&&t>0?t:250)+'ms';el.style.opacity=o.toString();}},
        domFadeToggle: function(sel,t){if(!sel){throw new Error('invalidParameter');}var els=null;if(Array.isArray(sel)){els=sel;}else if(U.isDomEl(sel)){els=[sel];}else{els=U.domFind(sel);els=Array.isArray(els)?els:[els];}if(Array.isArray(els)){var len=els.length;for(var i=0;i<els.length;i++){var el=els[i];if(el){fadeToggle(el);}}}function fadeToggle(el){el.style.transition='opacity '+(t&&!isNaN(t)&&t>0?t:250)+'ms';var s=el.ownerDocument.defaultView.getComputedStyle(el,null);var o=(!s)?null:s.opacity;if(o===null){return;}if(o==='1'){el.style.opacity='0';}else{el.style.opacity='1';}}},
        domOn: function(sel,k,fn){if(!sel){throw new Error('invalidParameter');}if(!k||typeof(k)!=='string'||typeof(fn)!=='function'){return new Error('invalidParameter');}var els=null;if(Array.isArray(sel)){els=sel;}else if(U.isDomEl(sel)){els=[sel];}else{els=U.domFind(sel);els=Array.isArray(els)?els:[els];}if(Array.isArray(els)){var len=els.length;for(var i=0;i<len;i++){var el=els[i];if(el){addListener(el,k,fn);}}}function addListener(el,k,fn){if(!U.__domInternal.handler[el]){U.__domInternal.handler[el]={};}if(!U.__domInternal.handler[el][k]){U.__domInternal.handler[el][k]=[];}U.__domInternal.handler[el][k].push(fn);el.addEventListener(k,fn,false);}},
        domOff: function(sel,k){if(!sel){throw new Error('invalidParameter');}if(k&&typeof(k)!=='string'){throw new Error('invalidParameter');}var els=null;if(Array.isArray(sel)){els=sel;}else if(U.isDomEl(sel)){els=[sel];}else{els=U.domFind(sel);els=Array.isArray(els)?els:[els];}if(Array.isArray(els)){var len=els.length;for(var i=0;i<len;i++){var el=els[i];if(el){removeListener(el,k||null);}}}function removeListener(el,k){if(!U.__domInternal.handler[el]){return;}if(k&&U.__domInternal.handler[el][k]){var fns=U.__domInternal.handler[el][k];var len=fns.length;for(var i=0;i<len;i++){var fn=fns[i];el.removeEventListener(k,fn,false);}}else{var sub=el.cloneNode(true);el.parentNode.replaceChild(sub,el);}}},
        domTriggerNativeEvent: function(sel,k){if(!sel){throw new Error('invalidParameter');}if(!k||typeof(k)!=='string'){throw new Error('invalidParameter');}var els=null;if(Array.isArray(sel)){els=sel;}else if(U.isDomEl(sel)){els=[sel];}else{els=U.domFind(sel);els=Array.isArray(els)?els:[els];}if(Array.isArray(els)){var len=els.length;for(var i=0;i<len;i++){var el=els[i];if(el){triggerEvent(el,k);}}}function triggerEvent(el,k){var e=document.createEvent('HTMLEvents');e.initEvent(k,true,false);el.dispatchEvent(e);}},
        domTriggerEvent: function(sel,k,v){if(!sel){throw new Error('invalidParameter');}if(!k||typeof(k)!=='string'){throw new Error('invalidParameter');}var els=null;if(Array.isArray(sel)){els=sel;}else if(U.isDomEl(sel)){els=[sel];}else{els=U.domFind(sel);els=Array.isArray(els)?els:[els];}if(Array.isArray(els)){var len=els.length;for(var i=0;i<len;i++){var el=els[i];if(el){triggerEvent(el,k,v)}}}function triggerEvent(el,k,v){var e=null;if(window.CustomEvent){e=new CustomEvent(k,{detail:v});}else{e=document.createEvent('CustomEvent');e.initCustomEvent(k,true,true,v);}el.dispatchEvent(e);}},
        domAppend: function(sel,v){if(!sel){throw new Error('invalidParameter');}if(typeof(v)!=='string'){throw new Error('invalidParameter');}var els=null;if(Array.isArray(sel)){els=sel;}else if(U.isDomEl(sel)){els=[sel];}else{els=U.domFind(sel);els=Array.isArray(els)?els:[els];}if(Array.isArray(els)){for(var i=0;i<els.length;i++){var el=els[i];if(el){domAppend(el,v);}}}function domAppend(el,v){el.insertAdjacentHTML('beforeend',v);}},
        domPrepend: function(sel,v){if(!sel){throw new Error('invalidParameter');}if(typeof(v)!=='string'){throw new Error('invalidParameter');}var els=null;if(Array.isArray(sel)){els=sel;}else if(U.isDomEl(sel)){els=[sel];}else{els=U.domFind(sel);els=Array.isArray(els)?els:[els];}if(Array.isArray(els)){for(var i=0;i<els.length;i++){var el=els[i];if(el){domPrepend(el,v);}}}function domPrepend(el,v){el.insertAdjacentHTML('afterbegin',v);}},
        domRemove: function(sel){if(!sel){throw new Error('invalidParameter');}var els=null;if(Array.isArray(sel)){els=sel;}else if(U.isDomEl(sel)){els=[sel];}else{els=U.domFind(sel);els=Array.isArray(els)?els:[els];}if(Array.isArray(els)){for(var i=0;i<els.length;i++){var el=els[i];if(el){domRemove(el);}}}function domRemove(el){el.parentNode.removeChild(el);}},
    };
    function createLayout(specification) {
        U.domAppend('body', generateMenu(specification));
        U.domAppend('body', U.strHtml('div', {
            id: 'page',
            classes: ['mt3'],
            style: {
                marginLeft: '320px',
                width: 'calc(100% - 370px)'
            },
            html: '-'
        }));
    }
    function findFirstDocumentSections(specification) {
        var groups = specification.menuGroups;
        if (!Array.isArray(groups)) {
            return null;
        };
        for (var i = 0; i < groups.length; i++) {
            var group = groups[i];
            if (Array.isArray(group.documentSections)) {
                return group.documentSections
            }
            var items = group.menuItems;
            if (!Array.isArray(items)) {
                continue;
            }
            for (var j = 0; j < items.length; j++) {
                var item = items[j];
                if (Array.isArray(item.documentSections)) {
                    return item.documentSections;
                }
            }
        }
        return null;
    }
    function findDocumentSectionsByGroup(specification, groupSlug) {
        if (!groupSlug) {
            return [];
        }
        var group = findGroup(specification, groupSlug);
        if (group && Array.isArray(group.documentSections)) {
            return group.documentSections;
        }
        return [];
    }
    function findDocumentSectionsByItem(specification, groupSlug, itemSlug) {
        if (!groupSlug || !itemSlug) {
            return [];
        }
        var item = findItem(specification, groupSlug, itemSlug);
        if (item && Array.isArray(item.documentSections)) {
            return item.documentSections;
        }
        return [];
    }
    function findGroup(specification, groupSlug) {
        var arr = specification.menuGroups;
        if (!Array.isArray(arr)) {
            return null;
        }
        return U.find(arr, function(v) {
            return v.slug === groupSlug;
        });
    }
    function findItem(specification, groupSlug, itemSlug) {
        var group = findGroup(specification, groupSlug);
        if (!group) {
            return null;
        }
        var arr = group.menuItems;
        if (!Array.isArray(arr)) {
            return null;
        }
        return U.find(arr, function(v) {
            return v.slug === itemSlug;
        });
    }
    function addSlugsToSpecification(specification) {
        specification.menuGroups = U.map(specification.menuGroups, function(menuGroup) {
            menuGroup.slug = U.strSlug(menuGroup.title);
            menuGroup.menuItems = U.map(menuGroup.menuItems, function(menuItem) {
                menuItem.slug = U.strSlug(menuItem.title);
                return menuItem;
            });
            return menuGroup;
        });
        return specification;
    }
    function generateMenu(obj) {
        var html = U.strHtml('div', {
            classes: ['fixed', 'top-0', 'left-0', 'bg-silver', 'h100', 'border-right'],
            style: {
                width: '250px'
            },
            html: getMenuContententHtml(obj)
        });
        return html;
        function getMenuContententHtml(obj) {
            var html = getMenuTitleHtml(obj);
            if (Array.isArray(obj.menuGroups)) {
                html += U.reduce(obj.menuGroups, getMenuGroupHtml, '');
            }
            return html;
            function getMenuTitleHtml(obj) {
                var html = '';
                if (obj.icon) {
                    html += '<i class="fa fa-fw ' + obj.icon + '"></i> ';
                }
                html += obj.title || 'Unnamed documentation';
                return U.strHtml('div', {
                    classes: ['t3', 'pt3', 'px2', 'truncate', 'bold'],
                    html: html
                });
            }
            function getMenuGroupHtml(html, menuGroup) {
                var options = {
                    classes: ['mx2', 't5', 'mt2'],
                    data: {
                        slug: menuGroup.slug
                    },
                    html: getMenuGroupTitleHtml(menuGroup) + U.reduce(menuGroup.menuItems, getMenuItemHtml, '')
                };
                html += U.strHtml('div', options);
                return html;
            }
            function getMenuGroupTitleHtml(menuGroup) {
                var options = {
                    classes: ['js-menu-group', 'bold'],
                    html: menuGroup.title || 'Unnamed group'
                };
                if (Array.isArray(menuGroup.documentSections) && menuGroup.documentSections.length > 0) {
                    options.classes = options.classes.concat(['pointer', 'hv-underline']);
                }
                return U.strHtml('div', options);
            }
            function getMenuItemHtml(html, menuItem) {
                html += U.strHtml('div', {
                    id: 'menu-item-' + U.strSlug(menuItem.title),
                    classes: ['js-menu-item', 't5', 'mt0', 'hv-underline', 'pointer'],
                    data: {
                        slug: menuItem.slug
                    },
                    html: '- ' + (menuItem.title || 'Unnamed menu item')
                });
                return html;
            }
        }
    }
    function bindMenuEvents(obj) {
        var self = this;
        self.specification = obj;
        U.domOn('.js-menu-group', 'click', function(e) {
            var group = U.domParent(e.currentTarget);
            var groupSlug = U.domData(group, 'slug');
            var documentSections = findDocumentSectionsByGroup(self.specification, groupSlug);
            location.replace('?group=' + groupSlug);
        });
        U.domOn('.js-menu-item', 'click', function(e) {
            var itemSlug = U.domData(e.currentTarget, 'slug');
            var group = U.domParent(e.currentTarget);
            var groupSlug = U.domData(group, 'slug');
            location.replace('?group=' + groupSlug + '&item=' + itemSlug);
        });
    }
    function getPageHtml(documentSections) {
        if (Array.isArray(documentSections) && documentSections.length > 0) {
            return U.reduce(documentSections, function(html, section) {
                html += U.strHtml('div', {
                    classes: ['document-section', 'clearfix'],
                    html: getPageSectionHtml(section)
                });
                return html;
            }, '') || null;
        }
        return null;
        function getPageSectionHtml(section) {
            switch (section.type) {
                case 'HEADING':
                    return getSectionHeadingHtml(section);
                case 'PARAGRAPH':
                    return getSectionParagraphHtml(section);
                case 'ORDERED_LIST':
                case 'UNORDERED_LIST':
                    return getSectionList(section);
                case 'CODE':
                    return getSectionCode(section);
                case 'ATTRIBUTE':
                    return getSectionAttribute(section);
                default:
                    return '';
            }
        }
        function getSectionHeadingHtml(section) {
            return U.strHtml('h' + section.level, {
                html: section.text || 'No heading'
            });
        }
        function getSectionParagraphHtml(section) {
            return U.strHtml('p', {
                html: section.text
            })
        }
        function getSectionList(section, nested) {
            if (Array.isArray(section.listItems) && section.listItems.length > 0) {
                var ordered = section.type.startsWith('ORDERED');
                var tag = ordered ? 'ol' : 'ul';
                var listOptions = {
                    classes: [],
                    html: ''
                };
                if (nested) {
                    listOptions.classes.push('pl2');
                }
                if (!ordered) {
                    listOptions.classes.push('list-disc');
                }
                listOptions.html += U.reduce(section.listItems, function(html, listItem) {
                    var text = listItem.text || '-';
                    if (typeof(listItem.sublist) === 'object' && Array.isArray(listItem.sublist.listItems) && listItem.sublist.listItems.length > 0) {
                        html += U.strHtml('li', {
                            html: text + getSectionList(listItem.sublist, true)
                        });
                        return html;
                    }
                    else {
                        html += U.strHtml('li', {
                            html: text
                        });
                        return html;
                    }
                }, '');
                if (nested) {
                    return U.strHtml(tag, listOptions);
                }
                else {
                    return U.strHtml('div', {
                        classes: ['pt2', 'pb1'],
                        html: U.strHtml(tag, listOptions)
                    });
                }
            }
            return '';
        }
    }
    function getSectionCode(section) {
        return U.strHtml('pre', {
            style: {
                overflowX: 'auto'
            },
            html: U.strHtml('code', {
                style: {
                    padding: '7px 10px',
                    fontSize: '11px',
                    lineHeight: '1.5em'
                },
                html: section.code
            })
        });
    }
    function getSectionAttribute(section) {
        var row = '';
        if (Array.isArray(section.tags) && section.tags.length > 0) {
            U.forEach(section.tags, function(tag, i) {
                row += U.strHtml('table-cell', {
                    html: getTagHtml(tag, i === 0)
                });
            });
        }
        row += U.strHtml('table-cell', {
            classes: ['align-middle', 't4', 'blue', 'pointer', 'ml2'],
            html: section.meta.name || '-'
        });
        if (section.meta.type) {
            row += U.strHtml('table-cell', {
                classes: ['align-middle', 't5', 'ml2', 'silver', 'thin'],
                html: section.meta.type
            });
        }
        return U.strHtml('table', {
            html: row
        }) + '<hr>';
        function getTagHtml(name, first) {
            var classes = ['t8', 'px1', 'border', 'rounded', 'bg-silver'];
            if (!first) {
                classes.push('ml1');
            }
            return U.strHtml('span', {
                classes: classes,
                html: name || '-'
            });
        }
    }
    function bindRoutes(parameters, specification) {
        var groupSlug = parameters.get('group');
        var itemSlug = parameters.get('item');
        if (groupSlug) {
            if (itemSlug) {
                viewItem(groupSlug, itemSlug, specification);
            }
            else {
                viewGroup(groupSlug, specification);
            }
        }
        else {
            viewHomepage(specification);
        }
        function viewHomepage(specification) {
            var documentSections = getPageHtml(findFirstDocumentSections(specification));
            U.domHtml('#page', getPageHtml(documentSections));
        }
        function viewGroup(groupSlug, specification) {
            var documentSections = findDocumentSectionsByGroup(specification, groupSlug);
            U.domHtml('#page', getPageHtml(documentSections));
        }
        function viewItem(groupSlug, itemSlug, specification) {
            var documentSections = findDocumentSectionsByItem(specification, groupSlug, itemSlug);
            U.domHtml('#page', getPageHtml(documentSections));
        }
    }
    return {
        create: function(specification) {
            addSlugsToSpecification(specification);
            U.domReady(function() {
                createLayout(specification);
                bindRoutes(new URLSearchParams(window.location.search), specification);
                bindMenuEvents(specification);
            });
        }
    };
})();
