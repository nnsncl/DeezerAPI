function contentAnimation() {

  let tl = gsap.timeline()
  tl.from('.main-navigation', { duration: .5, translateY: -100, opacity: 0, ease: Power2.easeInOut, stagger: .2})
  tl.from('.is-animated-from-right', { duration: .7, translateX: 500,  translateY: 0, opacity: 0, ease: Power3.easeInOut, stagger: .2})
  tl.from('.is-animated', { duration: .3, translateY: 33, opacity: 0, ease: Power2.easeInOut})
}

contentAnimation()