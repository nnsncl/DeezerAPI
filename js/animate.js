function contentAnimation() {

  let tl = gsap.timeline()
  tl.from('.main-navigation', { duration: .3, translateY: -10, opacity: 0})
  tl.from('.is-animated-slow', { duration: .5, translateY: 100, opacity: 0})
  tl.from('.is-animated', { duration: .2, translateY: 10, opacity: 0})
}

contentAnimation()
