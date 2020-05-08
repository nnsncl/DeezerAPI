const contentAnimation = () => {

  let tl = gsap.timeline()

  tl.from('.main-navigation', {
    duration: .5,
    translateY: -100,
    opacity: 0,
    ease: Power2.easeInOut,
    stagger: .2})

  tl.from('.is-animated-from-right', {
    duration: .7,
    translateX: 500,
    translateY: 0,
    opacity: 0,
    ease: Power3.easeInOut,
    stagger: .2})

  tl.from('.is-animated-from-top', {
    duration: .3,
    translateY: -33,
    opacity: 0,
    ease: Power2.easeInOut})

  tl.from('.is-animated', {
    duration: .3,
    translateY: 33,
    opacity: 0,
    ease: Power2.easeInOut})

}
contentAnimation()

$(document).mousemove( (e) => {

  let x = (e.clientX/$(window).width())-0.2
  let y = (e.clientY/$(window).height())-0.7

  TweenLite.to($('.perspective'), 0.2, {
    rotationY:10*x,
    rotationX:5*y,
    ease:Power1.easeOut,
    transformPerspective:500,
    transformOrigin:"center"
  })

})