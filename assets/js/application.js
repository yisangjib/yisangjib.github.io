// Code: Jonas Pelzer, http://jonaspelzer.com


// lazyload
function lazyload() {

  var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          // lazyImage.srcset = lazyImage.dataset.srcset;
          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    }, {
      rootMargin: "0px 0px 500px 0px"
    }
  );

    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // Possibly fall back to a more compatible method here
    lazyImages.forEach(function(lazyImage) {
      let datasrc = lazyImage.getAttribute('data-src');
      lazyImage.setAttribute('src', datasrc);
    });
  }

}

// function lazyload() {
//   var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
//
//   lazyImages.forEach(function(lazyImage) {
//     let datasrc = lazyImage.getAttribute('data-src');
//     lazyImage.setAttribute('src', datasrc);
//   });
// }

document.addEventListener("DOMContentLoaded", function() {
  lazyload();
});



// everything swiper-related
function initSwiper() {
  var ovlink = document.querySelectorAll('.overview-item-link');
  var swiper = document.querySelector('.swiper-container');
  var swiperclose = document.querySelector('.swiper-close');
  var body = document.querySelector('body');

  var mySwiper = new Swiper ('.swiper-container', {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
      speed: 400,
      spaceBetween: 600,
      followFinger: false,
      threshold: 50,

      // If we need pagination
      // pagination: {
      //   el: '.swiper-pagination',
      // },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-next',
        prevEl: '.swiper-prev',
      },

      // And if we need scrollbar
      // scrollbar: {
      //   el: '.swiper-scrollbar',
      // },

      // keyboard control
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },

      //enable hash navigation
      // hashNavigation: {
      //   replaceState: false,
      // },

      // Disable preloading of all images
      preloadImages: false,
      // Enable lazy loading
      lazy: true


  });

  ovlink.forEach(function(that) {

    var str = that.getAttribute('data-slide');
    var str = str.slice(-3);

    that.addEventListener('click', function(event) {
      event.preventDefault();
      swiper.classList.add('swiper--visible');
      mySwiper.slideTo(str, 0, false);
      body.classList.add('body--swiper');

      if(that.classList.contains('overview-item-link--toggleblackbg')) {
        swiper.classList.add('swiper--blackbg');
      }
      else {
        swiper.classList.remove('swiper--blackbg');
      }

      if(that.classList.contains('overview-item-link--iframe')) {
        swiper.classList.add('swiper--iframe');
      }
      else {
        swiper.classList.remove('swiper--iframe');
      }

      ToggleViewProjectLink();
    });
  });

  document.addEventListener('keydown', function(event) {
    if(event.keyCode === 27) {
      swiper.classList.remove('swiper--visible');
      body.classList.remove('body--swiper');
    }
  });

  swiperclose.addEventListener('click', function() {
    // swiper.classList.remove('swiper--visible', 'swiper--blackbg', 'swiper--iframe');
    swiper.classList.remove('swiper--visible', 'swiper--iframe');
    body.classList.remove('body--swiper');
    pauseVimeo();
  });


  function ToggleViewProjectLink() {
    setTimeout(function() {
      var activeslide = document.querySelector('.swiper-slide-active');
      var swiperbuttons = document.querySelector('.swiper-buttons');
      // var viewproject = document.querySelector('.swiper-viewproject');

      if(activeslide.classList.contains('swiper-slide--withproject')) {
        swiperbuttons.classList.add('swiper-buttons--smaller');
        // viewproject.classList.add('swiper-viewproject--visible');
      }
      else {
        swiperbuttons.classList.remove('swiper-buttons--smaller');
        // viewproject.classList.remove('swiper-viewproject--visible');
      }
    }, 400);

    var viewprojectlink = document.querySelector('.swiper-viewproject-link');

    viewprojectlink.addEventListener('click', function () {
      body.classList.remove('body--swiper');
    });
  }

  function ToggleBlackBackground() {
    setTimeout(function() {
      var activeslide = document.querySelector('.swiper-slide-active');
      var buttons = document.querySelector('.swiper-buttons');
      var coarseclose = document.querySelector('.swiper-coarseclose');
      var coarsenext = document.querySelector('.swiper-coarsenext');
      var coarseprev = document.querySelector('.swiper-coarseprev');

      if(activeslide.classList.contains('swiper-slide--toggleblackbg')) {
        swiper.classList.add('swiper--blackbg');
        buttons.classList.add('swiper-buttons--white');
        coarseclose.classList.add('swiper-coarseclose--white');
        coarsenext.classList.add('swiper-coarsenext--white');
        coarseprev.classList.add('swiper-coarseprev--white');
      }
      else {
        swiper.classList.remove('swiper--blackbg');
        buttons.classList.remove('swiper-buttons--white');
        coarseclose.classList.remove('swiper-coarseclose--white');
        coarsenext.classList.remove('swiper-coarsenext--white');
        coarseprev.classList.remove('swiper-coarseprev--white');
      }
    }, 200);
  }

  function ToggleIFrameMode() {
    setTimeout(function() {
      var activeslide = document.querySelector('.swiper-slide-active');

      if(activeslide.classList.contains('swiper-slide--iframe')) {
        swiper.classList.add('swiper--iframe');
      }
      else {
        swiper.classList.remove('swiper--iframe');
      }
    }, 200);
  }


  function pauseVimeo() {
    var iframe = document.querySelectorAll('iframe');

    iframe.forEach(function(el) {
      var player = new Vimeo.Player(el);

      player.pause();
      // player.on('pause', function() {
      //   console.log('Paused the video');
      // });
      //
      // player.getVideoTitle().then(function(title) {
      //   console.log('title:', title);
      // });
    });
  }

  mySwiper.on('slideChange', function () {
    ToggleViewProjectLink();
    ToggleBlackBackground();
    ToggleIFrameMode();
    pauseVimeo();
  });

}




// mobilemenu
function closeMenu() {
  var menu = document.querySelector('.mobilemenu');
  var togglemobilemenu = document.querySelector('.hamburger');

  if(menu.classList.contains('mobilemenu--visible')) {
    menu.classList.remove('mobilemenu--visible');
    togglemobilemenu.classList.remove('hamburger--close');
    document.body.style.overflow = 'auto';
  }
}

function initMenuToggle() {
  var menu = document.querySelector('.mobilemenu');
  var togglemobilemenu = document.querySelector('.hamburger');

  togglemobilemenu.addEventListener('click', function() {
    if(menu.classList.contains('mobilemenu--visible')) {
      // close menu
      menu.classList.remove('mobilemenu--visible');
      togglemobilemenu.classList.remove('hamburger--close');
      document.body.style.overflow = 'auto';
    }
    else {
      // open menu
      menu.classList.add('mobilemenu--visible');
      togglemobilemenu.classList.add('hamburger--close');
      document.body.style.overflow = 'hidden';
    }
  });
}


// hide intro
function hideIntro() {
  document.body.classList.remove('body--intro');
}


// load swiper on homepage load without barba
window.onload = function () {
  var body = document.querySelector('body');

  if(body.classList.contains('body--home')) {
    initSwiper();
  }

  if(body.classList.contains('body--intro')) {
    var intro = document.querySelector('.intro');

    intro.addEventListener('click', function() {
      hideIntro();
    });

    window.addEventListener('scroll', function() {
      hideIntro();
    });

    setTimeout(function() {
      hideIntro();
    }, 6000);
  }

  initMenuToggle();
};


// Barba
Barba.Pjax.start();
Barba.Pjax.init();
Barba.Prefetch.init();

var Barbahome = Barba.BaseView.extend({
  namespace: 'home',
  onEnter: function() {
  },
  onEnterCompleted: function() {
      // The Transition has just finished.
      initSwiper();
  },
  onLeave: function() {
      // A new Transition toward a new page has just started.
  },
  onLeaveCompleted: function() {
      // The Container has just been removed from the DOM.
  }
});

// Don't forget to init the view!
Barbahome.init();


Barba.Dispatcher.on('linkClicked', function(HTMLElement, MouseEvent) {
  var body = document.querySelector('body');
  body.classList.add('body--loading');
  body.classList.remove('body--swiper');

  closeMenu();

  if(HTMLElement.parentElement.classList.contains('menu')) {
    var links = document.querySelectorAll('.menu a');
    links.forEach(function(el) {
      el.classList.remove('current');
    });
    HTMLElement.classList.add('current');
  }

  if(HTMLElement.parentElement.classList.contains('homelink')) {
    var links = document.querySelectorAll('.menu a');
    var overview = document.querySelector('.menu a:first-of-type');
    links.forEach(function(el) {
      el.classList.remove('current');
    });
    overview.classList.add('current');
  }

  if(HTMLElement.classList.contains('swiper-viewproject-link')) {
    var links = document.querySelectorAll('.menu a');

    links.forEach(function(el) {
      el.classList.remove('current');
    });
    
    if(document.querySelector('.menu-projects')) {
      var menuportfolio = document.querySelector('.menu-projects');
      setTimeout((e) => {
        menuportfolio.classList.add('current');
      }, 200);
    }
    
    // console.log('PORTFOLIO!!!');
  }

  if(HTMLElement.classList.contains('swiper-viewproject-link--archive')) {
    var links = document.querySelectorAll('.menu a');

    links.forEach(function(el) {
      el.classList.remove('current');
    });

    if(document.querySelector('.menu-archive')) {
      var menucommissioned = document.querySelector('.menu-archive');
      setTimeout((e) => {
        menucommissioned.classList.add('current');
      }, 200);
    }

    // console.log('ARCHIVE!!!');
  }

  if(HTMLElement.classList.contains('footer-link')) {
    var links = document.querySelectorAll('.menu a');

    links.forEach(function(el) {
      el.classList.remove('current');
    });
  }

  // console.log(HTMLElement);
});

Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container) {
  var body = document.querySelector('body');
  body.classList.remove('body--loading');

  lazyload();
});

Barba.Dispatcher.on('transitionCompleted', function(currentStatus, prevStatus) {
  var body = document.querySelector('body');
  var main = document.querySelector('main');
  if(main.classList.contains('main--toggleblackbg')) {
    body.classList.add('body--blackbg');
  }
  else {
    body.classList.remove('body--blackbg');
  }
  window.scrollTo(0, 0);
});



var FadeTransition = Barba.BaseTransition.extend({
      start: function() {
        Promise
          .all([this.newContainerLoading, this.fadeOut()])
          .then(this.fadeIn.bind(this));
      },

      fadeOut: function() {
          this.oldContainer.classList.add('main--fadeout');

          return new Promise(function(resolve, reject) {
              window.setTimeout(function() {
                 resolve();
              }, 200);
          });
      },

      fadeIn: function() {
        this.newContainer.classList.add('main--fadein');
        this.done();
      }
});

var MoveTransition = Barba.BaseTransition.extend({
      start: function() {
        Promise
          .all([this.newContainerLoading, this.fadeOut()])
          .then(this.fadeIn.bind(this));
      },

      fadeOut: function() {
          this.oldContainer.classList.add('main--moveout');

          return new Promise(function(resolve, reject) {
              window.setTimeout(function() {
                 resolve();
              }, 200);
          });
      },

      fadeIn: function() {
        this.newContainer.classList.add('main--movein');
        this.done();
      }
});


Barba.Pjax.getTransition = function() {
  return MoveTransition;
}


// handle first tab
function handleFirstTab(e) {
  if (e.keyCode === 9) {
    document.body.classList.add('body--tabbing');

    window.removeEventListener('keydown', handleFirstTab);
    window.addEventListener('mousedown', handleMouseDownOnce);
  }
}

function handleMouseDownOnce() {
  document.body.classList.remove('body--tabbing');

  window.removeEventListener('mousedown', handleMouseDownOnce);
  window.addEventListener('keydown', handleFirstTab);
}

window.addEventListener('keydown', handleFirstTab);
