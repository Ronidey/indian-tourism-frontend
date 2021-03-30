const carouselBtns = document.querySelectorAll('.carousel__btn');
const $grabSlider = document.getElementById('grabSlider');

const carousel = {
  index: 0,
  slider: document.getElementById('carouselSlider'),
  slide(e) {
    const dir = e.target.dataset.dir;
    const totalSlides = this.slider.childElementCount;

    if (dir === 'left' && this.index > 0) {
      this.index--;
    } else if (dir === 'right' && this.index < totalSlides - 1) {
      this.index++;
    }
    this.slider.style.transform = `translateX(${-this.index * 100}%)`;
  }
};

for (let $btn of carouselBtns) {
  $btn.addEventListener('click', (e) => carousel.slide(e));
}

const grabSlide = {
  startX: null,
  mouseDown: false,
  scrollLeft: null,

  handleMouseDown(e) {
    this.mouseDown = true;
    this.startX = e.pageX - $grabSlider.offsetLeft;
    this.scrollLeft = $grabSlider.scrollLeft;
    $grabSlider.classList.add('is-active');
  },

  handleMouseUp(e) {
    this.mouseDown = false;
    $grabSlider.classList.remove('is-active');
  },

  handleMouseLeave(e) {
    this.mouseDown = false;
    $grabSlider.classList.remove('is-active');
  },

  handleMouseMove(e) {
    e.preventDefault();

    if (!this.mouseDown) return;

    const x = e.pageX - $grabSlider.offsetLeft;
    const slide = x - this.startX;
    $grabSlider.scrollLeft = this.scrollLeft - slide;
  }
};

if ($grabSlider) {
  $grabSlider.addEventListener('mousedown', (e) => {
    grabSlide.handleMouseDown(e);
  });

  $grabSlider.addEventListener('mouseup', (e) => {
    grabSlide.handleMouseUp(e);
  });

  $grabSlider.addEventListener('mouseleave', (e) => {
    grabSlide.handleMouseLeave(e);
  });
  $grabSlider.addEventListener('mousemove', (e) => {
    grabSlide.handleMouseMove(e);
  });
}
