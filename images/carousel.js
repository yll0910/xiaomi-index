var itemIndex=0;
var timeOutId;

function carousel(carouselItems,dots){
    timeOutId=setTimeout(() => {
        carouselItems.eq(itemIndex).attr('class','');
        itemIndex++;
        itemIndex=itemIndex==carouselItems.length()?0:itemIndex;
        carouselItems.eq(itemIndex).attr('class','show');
        dotsEngine(dots);
        carousel(carouselItems,dots);
    }, 2000);
}

function startCarousel(carouselPics,dots,arrows,bar){
    
    carousel(carouselPics,dots);

    arrowEngine(carouselPics,arrows,dots)

    barEngine(carouselPics,dots,bar)
    // 圆点的点击事件
    if(dots){
        dots.click(function(e){
            clearTimeout(timeOutId);
            for (let j = 0; j < dots.length(); j++) {
                if(dots.get(j)==e.target){
                    itemIndex=j;
                    carouselPics.eq(j).attr('class','show');
                    dots.eq(j).attr('class','select');
                }else{
                    carouselPics.eq(j).attr('class','');
                    dots.eq(j).attr('class','');
                }
            }
        })
    }
    

}

function dotsEngine(dots){
    
    if(dots){
        for (let i = 0; i < dots.length(); i++) {
            if(i==itemIndex){
                dots.eq(i).attr('class','select')
            }else{
                dots.eq(i).attr('class','');
            }
        }
    }
}

function arrowEngine (carouselPics,arrows,dots){
    if(arrows){
        // 箭头的点击事件
        arrows.eq(0).click(function(){
            clearTimeout(timeOutId)
            itemIndex--;
            if(itemIndex<0){
                itemIndex=carouselPics.length()-1;
                carouselPics.eq(0).attr('class','');
                carouselPics.eq(itemIndex).attr('class','show'); 
            }else{
                carouselPics.eq(itemIndex+1).attr('class','');
                carouselPics.eq(itemIndex).attr('class','show'); 
            }       
            dotsEngine(dots)         
        })
        arrows.eq(1).click(function(){
            clearTimeout(timeOutId)
            itemIndex++;
            if(itemIndex>=carouselPics.length()){
                itemIndex=0;
                carouselPics.eq(carouselPics.length()-1).attr('class','');
                carouselPics.eq(0).attr('class','show'); 
            }else{
                carouselPics.eq(itemIndex-1).attr('class','');
                carouselPics.eq(itemIndex).attr('class','show');
            }    
            dotsEngine(dots);    
        })
    }
}

function barEngine(carouselPics,dots,bar){
    if(bar){
        bar.mouseover(function(){
            clearTimeout(timeOutId)
        }).mouseout(function(){
            carousel(carouselPics,dots);
        })
    }
}