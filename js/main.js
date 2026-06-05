$(function () {

  // ハンバーガー開閉
  $(".hamburger").on("click", function () {
    $(this).toggleClass("active");
    $(".navi-area").toggleClass("active");
  });

  // トップ階層のリンクを押したら閉じる
  $(".navi > dt > a").on("click", function () {
    $(".hamburger").removeClass("active");
    $(".navi-area").removeClass("active");
  });

  // アコーディオン（dt.menu のみ）
  $(".navi dt.menu").on("click", function (e) {

    // a をクリックした場合は遷移させる
    if ($(e.target).is("a")) return;

    e.preventDefault();
    $(this).toggleClass("active");
    $(this).nextUntil("dt").slideToggle();
  });


  
 $(".open").mouseenter(function() {
    $(".box-hover").show();
    // $("body").css("overflow-y","hidden");
    $(".modal").addClass("active");
  });

  $(".header").mouseleave(function() {

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

    let elemTop = $(this).offset().top;
    let scroll = $(window).scrollTop();
    let windowHeight = $(window).height();
    let w = $(window).width();

    // ★ 画面に入ったら active を付ける
    if (!$(this).hasClass('active') && scroll > elemTop - windowHeight + 200) {

      // 1000px以上 → 開閉する
      if (w >= 1000) {
        $(".header").addClass('active');
        $(".box-hover").hide();
        $(".ebox").hide();
      }
      
      // 1000px以下 → 常に開いたまま
      else {
        $(".header").removeClass('active');
        $(".box-hover").hide();
        $(".ebox").hide();
      }

    } else {

      // 1000px以上 → 閉じる
      if (w >= 1000) {
        $(".header").removeClass('active');
        $(".ebox").show();
      }

      // 1000px以下 → 常に開いたまま
      else {
        $(".header").removeClass('active');
        $(".ebox").hide();
      }

    }

  });

});







   
  
  // $(".circle-anim-2").hover(
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

  $('a[href^="#"]').click(function(e) {
    e.preventDefault();
    const target = $($(this).attr('href')).offset().top;
    $('html, body').animate({ scrollTop: target }, 400); // ← 800msでゆっくり
  });

  $(function () {
    $(".info dd").hide();
    $(".info dt").click(function () {
      $(this).next().slideToggle();
      $(this).toggleClass("active")
    });
  });


  
  $(".enrollment").hover(
    function() {
      $(this).addClass("hover-on");
    },
    function() {
      $(this).removeClass("hover-on");
    }
  );


});
