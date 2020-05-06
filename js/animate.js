function contentAnimation() {

  let tl = gsap.timeline()
  tl.from('.main-navigation', { duration: .5, translateY: -100, opacity: 0, ease: Power2.easeInOut, y: -500, stagger: .2})
  tl.from('.is-animated-slow', { duration: .4, translateY: 100, opacity: 0, ease: Power2.easeInOut, y: -500, stagger: .2})
  tl.from('.is-animated', { duration: .1, translateY: 10, opacity: 0, ease: Power2.easeInOut, y: -500})
}

contentAnimation()
