$(function () {

  // ==========================================
  // 1. ハンバーガーメニューの開閉
  // ==========================================
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


  // ==========================================
  // 2. ヘッダー・メガメニューのホバー制御
  // ==========================================
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


  // ==========================================
  // 3. スクロール時の処理（画面連動）
  // ==========================================
  $(window).on('scroll', function() {
  let scroll = $(window).scrollTop(); // 現在のスクロール量
  let w = $(window).width();          // 画面の横幅
  
  // ★ 特定の要素ではなく、純粋に「120px以上スクロールしたか」で判定
  if (scroll > 120) {
    
    // 1000px以上 → 開閉する
    if (w >= 1000) {
      $(".header").addClass('active');
      $(".navi-area.navi1").show();
      $(".logo").show();
      $(".box-hover").hide();
      $(".ebox").hide();
    }
    // 1000px以下 → 常に開いたまま
    else {
      $(".header").removeClass('active');
      $(".navi-area.navi1").hide();
      $(".logo").hide();
      $(".box-hover").hide();
      $(".ebox").hide();
    }
    
  } else {
    // 120px未満のとき（ページの上部にいるとき）
    // 1000px以上 → 閉じる
    if (w >= 1000) {
      $(".header").removeClass('active');
      $(".ebox").show();
      $(".logo").show();
      $(".navi-area.navi1").show();
    }
    // 1000px以下
    else {
      $(".header").removeClass('active');
      $(".ebox").hide();
      $(".logo").show();
      $(".navi-area.navi1").show();
    }
  }
});

  // ==========================================
  // 4. リストホバー時のSVG円アニメーション
  // ==========================================
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


  // ==========================================
  // 5. ページ内スムーススクロール
  // ==========================================
  $('a[href^="#"]').click(function(e) {
    e.preventDefault();
    const target = $($(this).attr('href')).offset().top;
    $('html, body').animate({ scrollTop: target }, 400); // 400msで移動
  });


  // ==========================================
  // 6. インフォメーションのアコーディオン
  // ==========================================
  $(".info dd").hide();
  $(".info dt").click(function () {
    $(this).next().slideToggle();
    $(this).toggleClass("active");
  });


  // ==========================================
  // 7. その他のホバー補助
  // ==========================================
  $(".enrollment").hover(
    function() {
      $(this).addClass("hover-on");
    },
    function() {
      $(this).removeClass("hover-on");
    }
  );

}); // 全体の閉じ
