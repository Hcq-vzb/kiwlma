// AIGC START
/**
 * 首页横幅：单张 WebP 动图循环播放，无轮播切换
 */
window.onload = function() {
    function restartAnimatedImg(img) {
        if (!img) return;
        var src = img.getAttribute("src");
        img.src = "";
        void img.offsetWidth;
        img.src = src;
    }

    function playBannerVideo(video) {
        if (!video || video.hidden) return;
        var p = video.play();
        if (p && p.catch) p.catch(function() {});
    }

    var slide = document.querySelector(".slide1-webp");
    if (!slide) return;

    var video = slide.querySelector(".banner-slide-video");
    var animatedImg = slide.querySelector(".banner-slide-animated");

    function showAnimatedImg() {
        if (!animatedImg) return;
        if (video) video.style.display = "none";
        animatedImg.hidden = false;
        restartAnimatedImg(animatedImg);
    }

    if (video) {
        video.addEventListener("error", showAnimatedImg);
        video.addEventListener("stalled", showAnimatedImg);
        video.addEventListener("loadeddata", function() {
            if (video.readyState < 2) showAnimatedImg();
        });
        playBannerVideo(video);
        setTimeout(function() {
            if (video.readyState === 0 && video.networkState === 3) showAnimatedImg();
        }, 800);
    } else if (animatedImg) {
        showAnimatedImg();
    }
};
// AIGC END
