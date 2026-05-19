$(function(){
   //toop()
   $(".nav ul li").hover(function(){
		$(this).find(".sub_bx").slideDown().parent().siblings().find(".sub_bx").stop(true,true).slideUp()
	},function(){
		$(".sub_bx").stop(true,true).slideUp()
	})
  
   
   $(".nav_box li").mouseenter(function(){
      var showsub=this.getAttribute("datasub");/*js 函数获取属性值，解决兼容问题*/
	  $(".nva_list").stop(true,true).slideDown(300,function(){
		for (var i = 1; i < 8; i++) {
		  if (showsub!='sublist'+i){
			 $("#sublist"+i).stop(true,true).fadeOut(300/*,function(){$('#'+showsub).fadeIn(300);}*/);
		  }else{
		     $('#sublist'+i).stop(true,true).fadeIn(300);
		  }
		}						
	  })
	  
	  $(".link_box").mouseleave(function(){
	    $(".nva_list").stop(true,true).slideUp(300);
	  })
	  
   });
   
   Hover($(".cp_cont .btn"), "hover")
   Scroll($(".cp_cont .list-in"),$(".cp_cont .prev"),$(".cp_cont .next"),240,1)
   
   TitAutoHeight(".cp_cont li",".bt",210,28)
   TitAutoHeight(".anli li",".tit",170,28)
  
   tabs($(".yy_left_bx ul li"),"show_on","show_off",0,".yy_right_bx",0)
   
   /*$('.counter').countUp({
	    delay: 5,
	    time: 2000
	});*/
    $(".ind_video").bind("click",function(){
        var dom=$(".videobox");
        var id=$(this).data("url");
        dom.load(id).fadeIn();
        dom.data("top",$(this).index())
        h5swfvideo_Info()
     })
     $(".close").bind("mousedown",function(){
        $(".videobox").fadeOut()
     })
   
   
    var win_width = $(window).width();


    // if (win_width > 1281) {
    //     indcp_swiper(3, 26)
    // } else if (win_width < 1282 && win_width > 1181) {
    //     indcp_swiper(2, 26)
    // } else if (win_width < 1182 && win_width > 1025) {
    //     indcp_swiper(2, 26)
    // } else if (win_width < 1026 && win_width > 961) {
    //     indcp_swiper(2, 26)
    // } else if (win_width < 962 && win_width > 801) {
    //     indcp_swiper(2, 26)
    // } else if (win_width < 802) {
    //     indcp_swiper(1, 26)
    // };
    // if (win_width > 961) {
    //     news_swiper(3, 42)
    // } else if (win_width < 962 && win_width > 801) {
    //     news_swiper(3, 30)
    // } else if (win_width < 802 && win_width > 701) {
    //     news_swiper(2, 30)
    // } else if (win_width < 702 && win_width > 601) {
    //     news_swiper(2, 20)
    // } else if (win_width < 602 && win_width > 501) {
    //     news_swiper(2, 20)
    // } else if (win_width < 502) {
    //     news_swiper(1, 20)
    // };
    if(win_width>800){
        swiper_Rpd (4,20) 
     }else if(win_width<801 && win_width>701){
        swiper_Rpd (3,16)
     }else if(win_width<701 && win_width>601){
        swiper_Rpd (3,12)
     }else if(win_width<601 && win_width>401){
        swiper_Rpd (2,12)
     }else if(win_width<401){
        swiper_Rpd (2,10)
     };
    if (win_width > 1441) {
        IndCpfl_swiper(6, 0)
    } else if (win_width < 1442 && win_width > 1361) {
        IndCpfl_swiper(5, 0)
    } else if (win_width < 1362 && win_width > 1025) {
        IndCpfl_swiper(4, 0)
    } else if (win_width < 1026 && win_width > 801) {
        IndCpfl_swiper(3, 0)
    } else if (win_width < 802 && win_width > 501) {
        IndCpfl_swiper(2, 0)
    } else if (win_width < 502) {
        IndCpfl_swiper(1, 0)
    };

    if (win_width > 1441) {
        IndHyyy_swiper(4, 24)
    } else if (win_width < 1442 && win_width > 1361) {
        IndHyyy_swiper(4, 20)
    } else if (win_width < 1362 && win_width > 1025) {
        IndHyyy_swiper(3, 20)
    } else if (win_width < 1026 && win_width > 801) {
        IndHyyy_swiper(3, 18)
    } else if (win_width < 802 && win_width > 501) {
        IndHyyy_swiper(2, 20)
    } else if (win_width < 502) {
        IndHyyy_swiper(2, 12)
    };
         /*------------------*/
   //头部导航下拉，效果一，直接弹出头部菜单：
	//弹出效果
	//1：由上向下展开效果
/*	$(".menuBtn").click(function(){
		if($(this).hasClass("cur")){
			$(this).removeClass("cur");
			$("nav").css({"height":0});
			$("nav").css({"display":"block"});
			$("nav").css({"padding-top":0});
			$("nav").stop(true,true).animate({"height":0},1000,"easeOutQuart");
			document.ontouchmove=function(){
				return true;
			};
		}else{
			$(this).addClass("cur");
			var navH = $(window).height();
			$("nav").css({"padding-top":20});
			$("nav").stop(true,true).animate({"height":navH},1000,"easeOutQuart");

			document.ontouchmove=function(){
				return false;
			};
		};
	 });*/
	 
	 // AIGC START
	 // 移动端侧栏：仅操作 #nav，避免误选桌面 <nav class="nav">
	 function closeMobileNav() {
		 $(".menuBtn").removeClass("cur");
		 var navH = $(document).height();
		 $("#nav").removeClass("is-open").css({"height": navH, "right": 0, "padding-top": 0});
		 $("#nav").stop(true, true).animate({"width": 0}, 400, "easeOutQuart", function () {
			 $(this).hide().css("width", 0);
		 });
		 $("#nav_Mask").stop(true, true).css({"height": navH}).fadeOut(300);
		 document.ontouchmove = function () { return true; };
	 }

	 function openMobileNav() {
		 $(".menuBtn").addClass("cur");
		 var navW = $(window).width();
		 var navH = $(document).height();
		 $("#nav").addClass("is-open").css({
			 "height": navH,
			 "padding-top": 20,
			 "left": "auto",
			 "right": 0,
			 "display": "block",
			 "width": 0
		 }).show().stop(true, true).animate({"width": navW - 80}, 400, "easeOutQuart");
		 $("#nav_Mask").stop(true, true).css({"height": navH, "display": "block"}).fadeIn(300);
		 document.ontouchmove = function () { return false; };
	 }

	 // 初始化：侧栏默认关闭，清除可能污染桌面横排导航的内联样式
	 $("#nav").removeClass("is-open").hide().css({width: 0, display: "none"});
	 $("#header .nav_bx .cont .nav").css({width: "", height: "", right: "", left: "", paddingTop: "", display: ""});

	 // 2：由右向左滑出侧栏；汉堡图标 .cur 时显示为关闭(X)
	 $(".menuBtn").click(function () {
		 if ($(this).hasClass("cur")) {
			 closeMobileNav();
		 } else {
			 openMobileNav();
		 }
	 });

	 // 点击遮罩关闭侧栏
	 $("#nav_Mask").click(function () {
		 if ($(".menuBtn").hasClass("cur")) {
			 closeMobileNav();
		 }
	 });

	 // 窗口拉宽到 PC 时自动收起侧栏，避免横排导航被内联样式破坏
	 $(window).on("resize", function () {
		 if ($(window).width() > 1024 && $(".menuBtn").hasClass("cur")) {
			 closeMobileNav();
		 }
	 });
	 // AIGC END

   $("#nav dd").find("a:last").css({"border":"none"});
   $("#nav dt").not(".language-switch").click(function(){
		if($(this).hasClass("open")){
			$(this).removeClass("open");
			$(this).next("dd").slideUp();
		}else{

			$(this).addClass("open").siblings("dt").removeClass("open");
			$(this).next("dd").slideDown().siblings("dd").slideUp();
		};
	});
   
   $("menu dd").find("a:last").css({"border":"none"});
   $("menu dt").click(function(){
		if($(this).hasClass("open")){
			$(this).removeClass("open");
			$(this).next("dd").slideUp();
		}else{

			$(this).addClass("open").siblings("dt").removeClass("open");
			$(this).next("dd").slideDown().siblings("dd").slideUp();

			// var scrollTop = $(this).offset().top;
			// $("html,body").stop().animate({scrollTop: scrollTop}, 800);
		};
	});
   
   
   $(".cont_bx_2 .list-wrap li").hover(function() {
			$(this).addClass('cur').siblings('li').removeClass('cur');
		}, function() {
			
		});
   /*------------------*/
});

var MyMar;
var speed = 1; //速度，越大越慢
var spec = 1; //每次滚动的间距, 越大滚动越快
var ipath = 'images/'; //图片路径
var thumbs = document.getElementsByClassName('thumb_img');
for (var i=0; i<thumbs.length; i++) {
    thumbs[i].onmouseover = function () {jQuery('main_img').src=this.rel; jQuery('main_img').link=this.link;};
    thumbs[i].onclick = function () {location = this.link}
}
jQuery('main_img').onclick = function () {location = this.link;}
//jQuery('gotop').onmouseover = function() {this.src = ipath + 'gotop2.gif'; MyMar=setInterval(gotop,speed);}
//jQuery('gotop').onmouseout = function() {this.src = ipath + 'gotop.gif'; clearInterval(MyMar);}
//jQuery('gobottom').onmouseover = function() {this.src = ipath + 'gobottom2.gif'; MyMar=setInterval(gobottom,speed);}
//jQuery('gobottom').onmouseout = function() {this.src = ipath + 'gobottom.gif'; clearInterval(MyMar);}
//function gotop() {jQuery('showArea').scrollTop-=spec;}
//function gobottom() {jQuery('showArea').scrollTop+=spec;}

Hover($(".t_control .btn"), "hover")
Scroll($(".t_control .list-in"),$(".t_control .prev"),$(".t_control .next"),89,0)

Hover($(".anli_box .btn"), "hover")
Scroll($(".anli_box .list-in"),$(".anli_box .prev"),$(".anli_box .next"),190,0)

Hover($(".ryzs_box .btn"), "hover")
Scroll($(".ryzs_box .list-in"),$(".ryzs_box .prev"),$(".ryzs_box .next"),89,0)

Hover($(".scsb_box .btn"), "hover")
Scroll($(".scsb_box .list-in"),$(".scsb_box .prev"),$(".scsb_box .next"),89,0)



function Hover(obj, calssName) {
	obj.hover(function(){
		$(this).addClass(calssName);
	},function(){
		$(this).removeClass(calssName);
	})
}

/*
选项卡通用效果：
Paths路径, OnClassName按钮打开class, OffClassName按钮关闭class,MoreName更多class名, BoxName内容容器class名, Mouses 1为点击0为滑过
*/
function tabs(Paths,OnClassName,OffClassName,MoreName,BoxName,Mouses) {
	if(Mouses==1){
		Paths.click(function(){
			var index=$(this).index();
			$(this).removeClass(OffClassName).addClass(OnClassName).siblings().removeClass(OnClassName).addClass(OffClassName);
			if(MoreName!=0){
				$(MoreName).eq(index).hide().siblings(MoreName).fadeOut(300);
			}
			$(BoxName).siblings(BoxName).hide().eq(index).fadeIn(300);
		});
	}else{
		Paths.mouseenter(function(){
			var index=$(this).index();
			$(this).removeClass(OffClassName).addClass(OnClassName).siblings().removeClass(OnClassName).addClass(OffClassName);
			if(MoreName!=0){
				$(MoreName).eq(index).hide().siblings(MoreName).fadeOut(300);
			}
			$(BoxName).siblings(BoxName).hide().eq(index).fadeIn(300);
		});
	}
}

function toop(){
    $(".nav_box ul li").mouseenter(function(){
		//var $_this=$(this);
        var index=$(this).index();
		
        if(index==7){
			return false;
		}else{
            //$(this).addClass("on");
			$(".nva_list").slideDown("fast",function(){
                $(".minins").eq(index).fadeIn(300).siblings(".minins").fadeOut(300);
				//$(this).removeClass("on");
            })
        }
    })
    $(".link_box").mouseleave(function(){
		$(".nva_list").slideUp("fast");

    })

}

function TitAutoHeight (classpath,classname,Onheight,Offheight){
  	$(classpath).hover(function(){
	   $(this).find(classname).animate({"height":Onheight},300);
	},function(){
	   $(this).find(classname).animate({"height":Offheight},300);
	});
}

    $(".subli").mouseenter(function(){
        //$(".head-sub").stop(true,true).slideDown(300);
        var _subLiLength = $(this).find(".head-sub").find("p").length;
        //$(this).find(".head-sub").width(_navLiW*_subLiLength);
        //$(this).find(".head-sub").css({"margin-left":-_navLiW});
        $(this).find(".head-sub").width(100*_subLiLength);
        //$(this).find(".head-sub").css({"margin-left":-100});
        $(".head-nav-bg").stop(true,true).slideDown(300);
        $(this).find(".head-sub").stop(true,true).slideDown(300);
        $(this).find(".head-sub-row").fadeIn(300);
    })
    $(".sub-nav p").mouseleave(function(){
        $(this).find(".sub-nav-i").stop().animate({"width":0},300);
    })
    $(".sub-nav p").mouseenter(function(){
        $(this).find(".sub-nav-i").stop().animate({"width":"100%"},300);
    })
    $(".subli").mouseleave(function(){
        $(".head-sub").stop(true,true).slideUp(300);
        $(".head-nav-bg").stop(true,true).slideUp(300);
        $(this).find(".head-sub-row").fadeOut(300);
    })

    $("#head-search .search").click(function(){
        if($(this).attr("class").indexOf("on") != -1){
            $(".head-search-bg").stop(true,true).slideUp(300);
            $(this).removeClass("on");
        }else{
            $(".head-search-bg").stop(true,true).slideDown(300);
            $(this).addClass("on");
        }
    })
	$(".nav ul li").hover(function(){
		$(this).find("a").addClass("hover");
		$(this).addClass("show");
		$(this).find(".sonNav").stop(false,true).slideDown(300);	
	},function(){
		$(this).find("a").removeClass("hover");
		$(this).removeClass("show");
		$(this).find(".sonNav").stop(false,true).slideUp(300);		
	});


/*--数字滚动--*/
(function( $ ){
  "use strict";
  $.fn.countUp = function( options ) {
    // Defaults
    var settings = $.extend({
        'time': 2000,
        'delay': 10
    }, options);
    return this.each(function(){
        // Store the object
        var $this = $(this);
        var $settings = settings;
        var counterUpper = function() {
            if(!$this.data('counterupTo')) {
                $this.data('counterupTo',$this.text());
            }
            var time = parseInt($this.data("counter-time")) > 0 ? parseInt($this.data("counter-time")) : $settings.time;
            var delay = parseInt($this.data("counter-delay")) > 0 ? parseInt($this.data("counter-delay")) : $settings.delay;
            var divisions = time / delay;
            var num = $this.data('counterupTo');
            var nums = [num];
            var isComma = /[0-9]+,[0-9]+/.test(num);
            num = num.replace(/,/g, '');
            var isInt = /^[0-9]+$/.test(num);
            var isFloat = /^[0-9]+\.[0-9]+$/.test(num);
            var decimalPlaces = isFloat ? (num.split('.')[1] || []).length : 0;
            // Generate list of incremental numbers to display
            for (var i = divisions; i >= 1; i--) {
                // Preserve as int if input was int
                var newNum = parseInt(Math.round(num / divisions * i));
                // Preserve float if input was float
                if (isFloat) {
                    newNum = parseFloat(num / divisions * i).toFixed(decimalPlaces);
                }
                // Preserve commas if input had commas
                if (isComma) {
                    while (/(\d+)(\d{3})/.test(newNum.toString())) {
                        newNum = newNum.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
                    }
                }
                nums.unshift(newNum);
            }
            $this.data('counterup-nums', nums);
            $this.text('0');
            // Updates the number until we're done
            var f = function() {
                $this.text($this.data('counterup-nums').shift());
                if ($this.data('counterup-nums').length) {
                    setTimeout($this.data('counterup-func'),delay);
                } else {
                    delete $this.data('counterup-nums');
                    $this.data('counterup-nums', null);
                    $this.data('counterup-func', null);
                }
            };
            $this.data('counterup-func', f);
            // Start the count up
            setTimeout($this.data('counterup-func'),delay);
        };
        // Perform counts when the element gets into view
        $this.waypoint(counterUpper, { offset: '100%', triggerOnce: true });
    });
  };
})( jQuery );


$(window).resize(function () {
    var win_width = $(window).width();
    // if (win_width > 1281) {
    //     indcp_swiper(3, 26)
    // } else if (win_width < 1282 && win_width > 1181) {
    //     indcp_swiper(2, 26)
    // } else if (win_width < 1182 && win_width > 1025) {
    //     indcp_swiper(2, 26)
    // } else if (win_width < 1026 && win_width > 961) {
    //     indcp_swiper(2, 26)
    // } else if (win_width < 962 && win_width > 801) {
    //     indcp_swiper(2, 26)
    // } else if (win_width < 802) {
    //     indcp_swiper(1, 26)
    // };
    // if (win_width > 961) {
    //     news_swiper(3, 42)
    // } else if (win_width < 962 && win_width > 801) {
    //     news_swiper(3, 30)
    // } else if (win_width < 802 && win_width > 701) {
    //     news_swiper(2, 30)
    // } else if (win_width < 702 && win_width > 601) {
    //     news_swiper(2, 20)
    // } else if (win_width < 602 && win_width > 501) {
    //     news_swiper(2, 20)
    // } else if (win_width < 502) {
    //     news_swiper(1, 20)
    // };
    if(win_width>800){
        swiper_Rpd (4,20) 
     }else if(win_width<801 && win_width>701){
        swiper_Rpd (3,16)
     }else if(win_width<701 && win_width>601){
        swiper_Rpd (3,12)
     }else if(win_width<601 && win_width>401){
        swiper_Rpd (2,12)
     }else if(win_width<401){
        swiper_Rpd (2,10)
     };

    if (win_width > 1441) {
        IndCpfl_swiper(6, 0)
    } else if (win_width < 1442 && win_width > 1361) {
        IndCpfl_swiper(5, 0)
    } else if (win_width < 1362 && win_width > 1025) {
        IndCpfl_swiper(4, 0)
    } else if (win_width < 1026 && win_width > 801) {
        IndCpfl_swiper(3, 0)
    } else if (win_width < 802 && win_width > 501) {
        IndCpfl_swiper(2, 0)
    } else if (win_width < 502) {
        IndCpfl_swiper(1, 0)
    };

    if (win_width > 1441) {
        IndHyyy_swiper(4, 24)
    } else if (win_width < 1442 && win_width > 1361) {
        IndHyyy_swiper(4, 20)
    } else if (win_width < 1362 && win_width > 1025) {
        IndHyyy_swiper(3, 20)
    } else if (win_width < 1026 && win_width > 801) {
        IndHyyy_swiper(3, 18)
    } else if (win_width < 802 && win_width > 501) {
        IndHyyy_swiper(2, 20)
    } else if (win_width < 502) {
        IndHyyy_swiper(2, 12)
    };
});

// function indcp_swiper (PerView,Between) {
//     var swiper = new Swiper('.indcp_swiper-container', {
//      pagination: '.swiper-pagination',
//      slidesPerView: PerView,
//      paginationClickable: true,
//      spaceBetween: Between
//     });
// }
//  function news_swiper (PerView,Between) {
//     var swiper = new Swiper('.news_swiper-container', {
//      pagination: '.swiper-pagination',
//      slidesPerView: PerView,
//      paginationClickable: true,
//      spaceBetween: Between
//     });
// }
 function swiper_Rpd (PerView,Between) {
    var swiper = new Swiper('.swiper-Rpd', {
         pagination: '.swiper-pagination',
         paginationClickable: true,
         loop: true,
         slidesPerView:PerView,
         spaceBetween:Between,  
    });
}

function IndCpfl_swiper (PerView,Between) {
    var swiper = new Swiper('.cpfl_swiper-container', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
		slidesPerView: PerView,
        paginationClickable: true,
        spaceBetween: Between
    });
}
function IndHyyy_swiper (PerView,Between) {
    var swiper = new Swiper('.yy_swiper-container', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        pagination: '.swiper-pagination',
        paginationType: 'fraction',
		slidesPerView: PerView,
        paginationClickable: true,
        spaceBetween: Between
    });
}