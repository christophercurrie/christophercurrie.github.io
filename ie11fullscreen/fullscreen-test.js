// Generated by CoffeeScript 1.7.1
(function() {
  $(function() {
    var screenfull, update;
    screenfull = window.screenfull || {};
    update = function() {
      var box, jqbox, rect;
      jqbox = $('#box');
      box = jqbox[0];
      $('.cw').text(box.clientWidth);
      $('.ow').text(box.offsetWidth);
      $('.ch').text(box.clientHeight);
      $('.oh').text(box.offsetHeight);
      rect = box.getBoundingClientRect();
      $('.top').text(rect.top);
      $('.right').text(rect.right);
      $('.bottom').text(rect.bottom);
      $('.left').text(rect.left);
      $('.jqiw').text(jqbox.innerWidth());
      $('.jqow').text(jqbox.outerWidth());
      $('.jqih').text(jqbox.innerHeight());
      return $('.jqoh').text(jqbox.outerHeight());
    };
    if (screenfull.enabled) {
      $('#box').click(function() {
        return screenfull.toggle($('#fsexample')[0]);
      });
      setInterval(update, 100);
    } else {
      $('#box').replaceWith("<div id='box'>Your browser does not support the fullscreen API.</div>")[0];
    }
    return update();
  });

}).call(this);

//# sourceMappingURL=fullscreen-test.map