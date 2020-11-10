function $(args){
    return new Base(args);
}
function Base(args){
    this.elements=[];
    if(typeof args=='object'){
        this.elements.push(args)
    }else if(typeof args=='string'){
        if(args.indexOf(' ')>0){
            var eleChilds=args.split(' ');
            var nodes=[];
            var childNode=[];
            if(nodes.length<=0) nodes.push(document);
            // #sidebar .qrcode img 
            eleChilds.forEach(item => {
                switch (item.charAt(0)){
                    case '#':
                        childNode=getEleById(item.substring(1));
                    break;
                    case '.':
                        childNode=getEleByClass(item.substring(1),nodes);
                    break;
                    default:
                        childNode=getEleByTagName(item,nodes);
                    break;
                }
                nodes=childNode;
            });
            this.elements=nodes;
        }else{
            switch (args.charAt(0)){
                case '#':
                    this.elements.push(document.getElementById(args.slice(1)))
                break;
                case '.':
                    this.elements=getEleByClass(args.slice(1))
                break;
                default:
                    this.elements=getEleByTagName(args)
                break;
            }
        }
    }
}

function getEleById(cssItem){
    let nodeArr=[];
    nodeArr.push(document.getElementById(cssItem));
    return nodeArr;
}

function getEleByClass(cssItem,parentNode){
    let nodeArr=[];
    if(arguments.length==1){
        nodeArr=Array.from(document.getElementsByClassName(args.slice(1)));
    }else if(arguments.length==2){        
        parentNode.forEach(item => {
            Array.from(item.getElementsByTagName('*')).forEach(temp=>{
                if(temp.className==cssItem){
                    nodeArr.push(temp);
                }
            });
        });
    }
    return nodeArr;
}

function getEleByTagName(cssItem,parentNode){
    let nodeArr=[];
    if(arguments.length==1){
        nodeArr=Array.from(document.getElementsByTagName(cssItem));
    }else if(arguments.length==2){
        parentNode.forEach(item => {
            nodeArr=Array.from(item.getElementsByTagName(cssItem));
        });
    }    
    return nodeArr;
}

Base.prototype.css=function(attr,value){
    this.elements.forEach(item => {
        item.style[attr]=value;
    });
}

Base.prototype.length=function(){
    return this.elements.length;
}

Base.prototype.click=function(fn){
    this.elements.forEach(item => {
        item.onclick=fn;
    });
    return this;
}

Base.prototype.get=function(index){
    return this.elements[index];
}

Base.prototype.eq=function(index){
    return new Base(this.elements[index]);
}

Base.prototype.mouseover=function(fn){
    this.elements.forEach(item => {
        item.onmouseover=fn;
    });
    return this;
}
Base.prototype.mouseout=function(fn){
    this.elements.forEach(item => {
        item.onmouseout=fn;
    });
    return this;
}

Base.prototype.focus=function(fn){
    this.elements.forEach(item => {
        item.onfocus=fn;
    });
    return this;
}

Base.prototype.blur=function(fn){
    this.elements.forEach(item => {
        item.onblur=fn;
    });
    return this;
}

Base.prototype.attr=function(attr,value){
    if(arguments.length==1){
        return this.elements[0].getAttribute(attr);
    }else if(arguments.length==2){
        this.elements.forEach(item => {
            item.setAttribute(attr,value);
        });
        return this;
    }    
}

Base.prototype.on=function(eventName,fn){
    this.elements.forEach(item => {
        item.addEventListener(eventName,fn);
    });
    return this;
}

Base.prototype.each=function(fn){
    for (let i = 0; i < this.elements.length; i++) {
        fn(i,this.elements[i])
    }
}

Base.prototype.getOffset=function(){
    return {top:this.elements[0].offsetTop,left:this.elements[0].offsetLeft}
}

Base.prototype.text=function(txt){
    if(arguments.length>0){
        this.elements[0].innerText=txt;
    }else{
        return this.elements[0].innerText;
    }    
}