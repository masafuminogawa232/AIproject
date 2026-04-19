let flag=0;
$(function() {
  $(".hamburger").click(function() {
    $(this).toggleClass("active");
    $(".header .navi").toggleClass("active");
  });

  $(".navi a").click(function() {
    $(".hamburger").removeClass("active");
    $(".header .navi").removeClass("active");
  });

  $(".open").mouseenter(function() {
    $(".box-hover").show();
    // $("body").css("overflow-y","hidden");
    $(".modal").addClass("active");
  });

  $("#header-area").mouseleave(function() {

    // ★ どれかに hover していたら閉じない
    if (
      $(".open:hover").length > 0 ||
      $(".box-hover:hover").length > 0 ||
      $("#header-area:hover").length > 0
    ) {
      // $(".visual").addClass("active");
      return;
    }
    
    // どれにも乗っていない → 閉じる
    $(".box-hover").hide();
    $("body").css("overflow-y","auto");
    $(".modal").removeClass("active");
  });


  $(window).on('scroll', function() {

    $('.scroll-active').each(function() {

      let elemTop = $(this).offset().top;      // 要素の位置
      let scroll = $(window).scrollTop();      // スクロール量
      let windowHeight = $(window).height();   // 画面の高さ

      // ★ 画面に入ったら active を付ける
      if (!$(this).hasClass('active') && scroll > elemTop - windowHeight - 10) {
        $(".header").addClass('active');
        $(".box-hover").hide();
      }else {
        $(".header").removeClass('active');
      }

    });

  });







  $(".box-hover ul li").hover(
    function() {
      // hover in → 円を生成
      let circle = `
        <svg class="circle-anim" width="30" height="30">
          <circle cx="15" cy="15" r="14" fill="none" stroke="#ccc" stroke-width="1" />
          <circle class="draw" cx="15" cy="15" r="14" fill="none" stroke="#000" stroke-width="2"
            stroke-dasharray="88" stroke-dashoffset="88" />
        </svg>
      `;

      $(this).find(".ja").append(circle);

      // 円を描く（右回転）
      $(this).find(".draw").stop().animate(
        { "stroke-dashoffset": 0 },
        {
          duration: 400,
          easing: "linear"
        }
      );
    },

    function() {
      // hover out → 逆回転で消す
      let draw = $(this).find(".draw");

      draw.stop().animate(
        { "stroke-dashoffset": 88 },
        {
          duration: 400,
          easing: "linear",
          complete: () => {
            $(this).find(".circle-anim").remove();
          }
        }
      );
    }
  );








});