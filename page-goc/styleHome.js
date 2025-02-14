document.addEventListener('DOMContentLoaded', function () {
    var splide = new Splide('#splide-demo', {
        perPage: 3,
        perMove: 1,
        type: "loop",
        wheel: true,
        autoplay: true,
        drag: 'free',
        focus: 'center',
        gap: '10px',  // Khoảng cách giữa các slide
        heightRatio: 0.5, // Chiều cao bằng 50% chiều rộng
        autoScroll: {
            speed: 1,
        },
        breakpoints: {
            1320: {
                perPage: 4,
            },

            1058: {
                perPage: 3,
            },

            796: {
                perPage: 2,
            },
            534: {
                perPage: 1,
            },

        }
    });
    splide.mount();
});

document.addEventListener('DOMContentLoaded', function () {
    console.log('Document is ready!');
    
    var splide = new Splide('#splide-poster', {
        type: 'loop',
        perPage: 1,
        perMove: 1,
        cover: true, /* Đảm bảo hình ảnh lấp đầy slide */
        drag   : 'free',
        focus  : 'center',
        arrows: false, 
        autoplay: true,
        autoScroll: {
            speed: 1,
        },
    })
    splide.mount();
    console.log('Splide mounted!');
});