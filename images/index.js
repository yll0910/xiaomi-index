
window.onload=function(){
    $('img').each(function(index,item){
        if(innerHeight+scrollY>=$(item).getOffset().top){
            $(item).attr('src',$(item).attr('src-data'))
            $(item).css('opacity',1)
        }
    })
    // 轮播图实现
    var carouselPics=$('#carousel li');
    var dots=$('#bar .right .dot li');
    var arrows=$('#bar .right .arrow i');
    var bar=$("#bar");
    startCarousel(carouselPics,dots,arrows,bar);
    
    // 点击输入框显示推荐搜索项
    $('#headsearch #menu .right input').focus(function(){
        $('#headsearch #menu .searchItem').css('display','block');
    }).blur(function(){
        $('#headsearch #menu .searchItem').css('display','none');
    })

    // 倒计时效果实现
    var timer=$("#bar2 .section1 .timer span");    
    var startTime={hour:"16",minute:"13",second:"00"}
    var endTime={hour:"16",minute:"30",second:"00"}
    preCountDown(timer,startTime,endTime);

}

function preCountDown(timer,startTime,endTime){
    var count=(endTime.hour-startTime.hour)*3600+(endTime.minute-startTime.minute)*60+(endTime.second-startTime.second);
    var interId=null;
    interId=setInterval(() => {
        var now=new Date();
        if(now.getHours()==parseInt(startTime.hour)&&now.getMinutes()==parseInt(startTime.minute)
            &&now.getSeconds()==parseInt(startTime.second)){
            countDown(endTime.hour-startTime.hour,endTime.minute-startTime.minute,
                endTime.second-startTime.second,count,timer)
            clearInterval(interId);
        }
    }, 1000);
}

var intervalId=null;
function countDown(hour,minute,second,count,timer){
    intervalId=setInterval(() => {
        if(count<=0){
            clearInterval(intervalId)
        }
        count--;
        second--;
        if(second<=0){
            minute--;
            second=59;
            if(minute<=0){
                hour--;
                minute=59;
            }
        }
        timer.eq(0).text(hour<10?"0"+hour:hour);
        timer.eq(1).text(minute<10?"0"+minute:minute);
        timer.eq(2).text(second<10?"0"+second:second);
    }, 1000);
}

// 调整右侧工具栏的偏移量
window.onresize=function(){
    $('#sidebar').css("right",((document.body.clientWidth-1226)/2-28)+'px');
}

window.onscroll=function(){

    $('img').each(function(index,item){
        if(innerHeight+scrollY>=$(item).getOffset().top){
            $(item).attr('src',$(item).attr('src-data'))
            $(item).css('opacity',1)
        }
    })
}
