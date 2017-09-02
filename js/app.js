$(() => {

    const $slaider = $('.slaider');
    const $loadBtn = $('.load-btn');
    const $gallery = $('.container');
    const $menuOff = $('#bars');
    const $animation = $('.wrapper');

    // Hamburger menu
    $menuOff.on('click',function(){
        if($(this).hasClass('fa-bars')) {
            $(this).removeClass('fa-bars');
            $(this).addClass('fa-times');
        }
        else{
            $(this).removeClass('fa-times');
            $(this).addClass('fa-bars');
        }
        const $menuItems = $('#menu-items');
        if($menuItems.is(':hidden')){
            $menuItems.removeClass('slaider-menu-items');
            $menuItems.addClass('slaider-menu-items-show');
        }
        else {
            $menuItems.removeClass('slaider-menu-items-show');
            $menuItems.addClass('slaider-menu-items');
        }
    });

    //  Close menu border-width: 3px 0 3px 3px; after click on link
    $('#menu-items a').on('click',function(){
        if($menuOff.hasClass('fa-times')){
            $(this).parent().parent().removeClass('slaider-menu-items-show');
            $(this).parent().parent().addClass('slaider-menu-items');
            $menuOff.removeClass('fa-times');
            $menuOff.addClass('fa-bars');
        }
    });


    //random number form range
    const getRandomInt = (min,max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    //random date
    const getRandomDate = () => {
        const day = getRandomInt(1,28);
        const month = getRandomInt(1,12);
        const year = getRandomInt(2010,2016);

        return year+'-'+month+'-'+day;
    }
    // create new pictures for gallery
    const addNewImages = (link) => {
        const $newDiv = $('<div>',{class:"group-images"});
        const $newUl = $('<ul>',{class:"images"});

        for(let i = 0; i < link.length; i++){
            let $newLi = $('<li>');
            let $newImg = $('<img>',{src: link[i] ,alt:'Photo of a Mars taken by the Curiosity rover'});
            $newLi.append($newImg);
            $newUl.append($newLi);
        }
        $newDiv.append($newUl);
        $gallery.append($newDiv);
    }

    const getRandomSol = () => {
        const sol = getRandomInt(1,1728);
        return sol;
    }
    //Btn - load more pictures into gallery
    $loadBtn.on('click',function(){
        getImagesFromApi();

    });

    //function - get images of a Mars from NASA
    const getImagesFromApi = () => {
        $.ajax({
            url: 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=8OMH6j4AYg49k56NSqvfwKHgwxOgb2XiR2KEVSJ7&sol='+getRandomSol()
        }).done(response => {
            const links = [];
            for(let i = 0; i < 6 ;i++) {
                links.push(response.photos[i].img_src);
            }
            addNewImages(links);
        }).fail(error => {
            console.log('wystąpił error');
        })
    }

    // Image for slaider
    // $.ajax({
    //     url: 'https://api.nasa.gov/planetary/apod?&api_key=8OMH6j4AYg49k56NSqvfwKHgwxOgb2XiR2KEVSJ7&date='+getRandomDate()
    // }).done(response => {
    //     $animation.css('display','none');
    //     $animation.find('.loading').removeClass('loading');
    //     const img = 'url("'+response.hdurl+'")';
    //     console.log(img);
    //     $slaider.css('background-image',img);
    //     showText("#msg",response.explanation , 0, 50);
    // }).fail(error => {
    //     console.log('error');
    // });

    getImagesFromApi();

    const showText = (target, message, index, interval) => {
        if (index < message.length) {
            $(target).append(message[index++]);
            setTimeout(() => { showText(target, message, index, interval); }, interval);
        }
    }

});
