'use strict';

///////////////////////////////////////
// Modal window

const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const section1 = document.querySelector('#section--1');
const sections = document.querySelectorAll('.section');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');

const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i];

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// document
//   .querySelector('.nav__link')
//   .addEventListener('click', function (event) {
//     console.log(this);
//     console.log('fenjie');
//   });

// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.querySelector('.nav'));

// const header = document.querySelector('.header');

// const allSections = document.querySelectorAll('.section');
// const allButtons = document.getElementsByTagName('button');
// console.log(allSections);
// console.log(allButtons);

// console.log(document.getElementById('section--1'));

// const message = document.createElement('div');
// message.classList.add('cookie-message');
// //message.textContent = 'this is my test message';
// message.innerHTML =
//   'this is another test message. <button class="btn btn--close--cookie">close message</button>';

// header.prepend(message);
// //header.append(message.cloneNode(true));

// document
//   .querySelector('.btn--close--cookie')
//   .addEventListener('click', function () {
//     message.remove();
//   });

// message.style.backgroundColor = '#123434';
// console.log(message.style.backgroundColor);
// console.log(Number.parseInt(34, 16));
// message.style.width = '120%';
// //message.style.height = '100%';

// const height = Number.parseFloat(getComputedStyle(message).height, 10) + 20;
// console.log(height);
// message.style.height = height + 'px';

// //document.documentElement.style.setProperty('--color-primary','blue');

// const logo = document.querySelector('.nav__logo');
// console.log(logo.className);

// logo.setAttribute('data-version-number', '3.232');

// console.log(logo.getAttribute('data-version-number'));

btnScrollTo.addEventListener('click', function (event) {
  //event.preventDefault()

  const section1Coords = section1.getBoundingClientRect();
  // console.log('section1位置：', section1Coords);

  // console.log(event.target.getBoundingClientRect());
  // console.log('滑动后的pageYoffset是：', window.pageYOffset);
  // console.log(document.documentElement.clientHeight);

  //scroll to
  // window.scrollTo(
  //   section1Coords.left + window.pageXOffset,
  //   section1Coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: section1Coords.left + window.pageXOffset,
  //   top: section1Coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  //e.target就是点击来源，这里只需要来自nav__link的点击
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    //console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

const tabs = document.querySelectorAll('.operations__tab');

const tabContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;

  tabs.forEach(function (el) {
    el.classList.remove('operations__tab--active');
  });
  clicked.classList.add('operations__tab--active');

  tabsContent.forEach(function (el) {
    el.classList.remove('operations__content--active');
  });

  document
    .querySelector(`.operations__content--${clicked.getAttribute('data-tab')}`)
    .classList.add('operations__content--active');
});

const handleNavHover = function (e) {
  //console.log(this);
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblingLink = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblingLink.forEach(el => {
      if (el !== e.target) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleNavHover.bind(0.5));

nav.addEventListener('mouseout', handleNavHover.bind(1));

const navHeight = nav.getBoundingClientRect().height;
const navSticky = function (entries) {
  const entry = entries[0];

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else nav.classList.remove('sticky');
};

const navOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const headerObserver = new IntersectionObserver(navSticky, navOptions);

headerObserver.observe(header);

const sectionFn = function (entries, observer) {
  const entry = entries[0];
  //console.log(entry);
  //console.log(`trigger了`);
  if (!entry.isIntersecting) return;
  else {
    entry.target.classList.remove('section--hidden');
  }
  observer.observe(entry.target);
  observer.unobserve(entry.target);
};

const sectionOptions = {
  root: null,
  threshold: 0.2,
};

const sectionObserver = new IntersectionObserver(sectionFn, sectionOptions);

//先给给每个section增加一个hidden class，再增加一个intersection Observer
sections.forEach(section => {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

//下面这个function是slider的滑动效果
const slideFunction = function () {
  const slides = document.querySelectorAll('.slide');
  const rightBtn = document.querySelector('.slider__btn--right');
  const leftBtn = document.querySelector('.slider__btn--left');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  //跳转到某个slide功能
  const goToSlide = function (cur) {
    slides.forEach(
      (slide, i) => (slide.style.transform = `translateX(${(i - cur) * 100}%)`)
    );
  };

  //先跳转到首个slide
  goToSlide(0);

  //向右挪一位功能，点了右箭头后，往右边挪一位，下面的小圆点也挪一个位置
  const goRight = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else curSlide++;
    goToSlide(curSlide);
    activeDot(curSlide);
  };

  //向左挪一位功能，点了左箭头后，往左边挪一位，下面的小圆点也挪一个位置
  const goLeft = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else curSlide--;
    goToSlide(curSlide);
    activeDot(curSlide);
  };

  //点击左右箭头的event listener
  rightBtn.addEventListener('click', goRight);
  leftBtn.addEventListener('click', goLeft);

  //按键盘左右按键的event listener
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') goRight();
    if (e.key === 'ArrowLeft') goLeft();
  });

  // console.log(dotContainer);

  //先把点插入到每个slide上。
  const insertDot = function () {
    //用forEach给每个slide都插入一段HTML
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  //call一下这个function把点点点加上去
  insertDot();

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const index = e.target.dataset.slide;
      goToSlide(index);
      activeDot(index);
    }
  });

  const activeDot = function (index) {
    const dots = dotContainer.querySelectorAll('.dots__dot');
    dots.forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${index}"]`)
      .classList.add('dots__dot--active');
  };
  activeDot(0);
};

//call一下这个function激活slide功能
slideFunction();

//下面搞下图片的加载，从模糊图变为高清图
//先把高清图选中，用img[]来选择img这个tag里的data-src attribute
const imgs = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const entry = entries[0];

  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const option = {
  root: null,
  threshold: 0,
};

const imgObserver = new IntersectionObserver(loadImg, option);
imgs.forEach(img => imgObserver.observe(img));

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => console.log(entry));
// };

// const obsOptions = {
//   root: null,
//   threshold: 0.1,
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
// e.preventDefault();
// const id = el.getAttribute('href');
// console.log(id);
// document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// const h1 = document.querySelector('h1');

// const alertH1 = function (e) {
//   alert('aha');
// };

// h1.addEventListener('mouseenter', alertH1);

// setTimeout(() => {
//   h1.removeEventListener('mouseenter', alertH1);
// }, 3000);

// const randomInt = function (min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// };

// const randomColor = function () {
//   return `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// };
// console.log(randomColor());

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   e.preventDefault();
//   console.log('click on nav link');
//   this.style.backgroundColor = randomColor();
// });

// document.querySelector('.nav__links').addEventListener('click', function () {
//   console.log('click on nav linksssss');
//   this.style.backgroundColor = randomColor();
// });

// document.querySelector('.nav').addEventListener('click', function () {
//   console.log('click on nav bar');
//   this.style.backgroundColor = randomColor();
// });

// const h1 = document.querySelector('h1');

// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'white';

// console.log(h1.parentNode);

// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
