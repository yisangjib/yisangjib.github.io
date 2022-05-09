(function () {
  const cursor = document.querySelector('.cursor');
  const circle = document.querySelector('.circle');
  const links = document.querySelectorAll('.link');
  const editPosCursor = (e) => {
      const { clientX: x, clientY: y } = e;
      cursor.style.left = x + 'px';
      cursor.style.top = y + 'px';
      circle.style.left = x + 'px';
      circle.style.top = y + 'px';
  }
  const animateit = function(e) {
      const span = this.querySelector('span');
      const { offsetX: x, offsetY: y } = e,
          { offsetWidth: width, offsetHeight: height } = this,
          move = 25,
          xMove = x / width * (move * 2) - move,
          yMove = y / height * (move * 2) - move;
      
      span.style.transform = `translate(${xMove}px, ${yMove}px)`;
      circle.classList.add('hover');
      if (e.type === 'mouseleave') {
          circle.classList.remove('hover');
          span.style.transform = '';
      }
  }
  window.addEventListener('mousemove', editPosCursor);
  links.forEach(link => link.addEventListener('mousemove', animateit));
  links.forEach(link => link.addEventListener('mouseleave', animateit));
})();