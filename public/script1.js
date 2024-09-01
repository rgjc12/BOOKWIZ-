gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});





function page1ani()
{
  gsap.from("#p1t h1 span",{
    y:150,
    opacity:0,
    stagger:0.12,
      duration:0.5,
      delay:-0.2
  });
}
page1ani();
function page2ani()
{
gsap.from(".container #i1",{
  height:"15vw",
  width:"25vw",
  scrollTrigger:{
    trigger:"#p2shead",
      scroller:"#main",
      start:"top 45%",
        end:"top 12%",
        scrub:2,
    
  }
  
});
gsap.from(".container #i2",{
  height:"15vw",
  width:"25vw",
  scrollTrigger:{
    trigger:"#i2m",
      scroller:"#main",
      start:"top 45%",
        end:"top 15%",
        scrub:2,
    
  }

});
Shery.imageEffect(".container #i1",{
  style:5,
  config:{"a":{"value":1.83,"range":[0,30]},"b":{"value":-0.73,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":1.6666666666666667},"ignoreShapeAspect":{"value":false},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":1},"noise_speed":{"value":0.2,"range":[0,10]},"metaball":{"value":0.2,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":10,"range":[0,100]}}
});
Shery.imageEffect(".container #i2",{
  style:5,
  config:{"a":{"value":2,"range":[0,30]},"b":{"value":0.75,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":1.6666666666666667},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0.06,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":false},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.06,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":1},"noise_speed":{"value":0.2,"range":[0,10]},"metaball":{"value":0.2,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0.002,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":10,"range":[0,100]}}
});
}
//page2ani();

function page3ani()
{
gsap.to("#p3mo",{
  height:"78vh",
  scrollTrigger:{
    trigger:"#page3",
      scroller:"#main",
      start:"top 59%",
        end:"top 25%",
        scrub:2,
    
  }
});
gsap.from("#p3topl h2",{
  y:-40,
  opacity:0,
  stagger:-0.4,
  scrollTrigger:{
    trigger:"#page3",
      scroller:"#main",
      start:"top 48%",
        end:"top 30%",
        scrub:2,
      }
  
});
gsap.to("#line",{
  width:"96vw",
  scrollTrigger:{
    trigger:"#page3",
      scroller:"#main",
      start:"top 48%",
        end:"top 30%",
        scrub:2,
      }
});
  gsap.from("#p3bot h1 span",{
     y:-40,
      opacity:0,
      stagger:0.4,
      scrollTrigger:{
        trigger:"#page3",
          scroller:"#main",
          start:"top 47%",
            end:"top 30%",
            scrub:2,
            }
  });
}
page3ani();

let cir=document.getElementById("cursor");
document.addEventListener("mousemove",(e)=>{
  gsap.to(cir,{
    x:e.clientX,
    y:e.clientY,
    duration:0.3,
      ease: "expo.out",

  });
});
document.querySelectorAll("#nav-right a").forEach((e)=>{
  e.addEventListener("mouseenter",()=>{
    gsap.to(cir,{
      scale:2,
      duration:0.3,
        ease: "expo.out",

    });
  });
  e.addEventListener("mouseleave",()=>{
    gsap.to(cir,{
      scale:1,
      duration:0.3,
        ease: "expo.out",

    });
  });
});
const lerp = (x, y, a) => x * (1 - a) + y * a;
let tf=document.getElementById("tf");

tf.addEventListener("mousemove",(e)=>{
  let dim=tf.getBoundingClientRect();
  let xstart=dim.x;
  let xend=dim.x+dim.width;
  let zo=gsap.utils.mapRange(xstart,xend,0,1,e.clientX);
  gsap.to(cir,{
   scale:5
  });
  gsap.to("#tf h3",{

    y:"-5vh",
    duration:0.23,
    x:lerp(-40, 40, zo),

  });
});
document.getElementById("tf").addEventListener("mouseleave",(e)=>{
   gsap.to(cir,{
     scale:1
    });
    gsap.to("#tf h3",{

      y:"0",
      duration:0.23,
      x:"0",

    });
});
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  centeredSlides: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
let cards=document.querySelectorAll("#card1");

cards.forEach((card)=>{
  card.addEventListener("mouseenter",()=>{
    gsap.to(card, {
      backgroundColor:"rgb(255, 215, 0)",
      ease: "expo.out",
    });
  gsap.to(card.querySelectorAll("h3"),{
    color:"#050505",
    ease: "expo.out",
  });
    gsap.to(card.querySelector("#cmid2 #space"),{
      paddingLeft:"30px",
      ease: "expo.out",
    
    });

  });
  card.addEventListener("mouseleave",()=>{
    gsap.to(card, {
      backgroundColor:"transparent",
      ease: "expo.out",
    });
    gsap.to(card.querySelectorAll("h3"),{
      color:"rgb(255, 215, 0)",
      ease: "expo.out",
    });
    gsap.to(card.querySelector("#space"),{
      width:"0",
      ease: "expo.out",

    });
    gsap.to(card.querySelector("#cmid2 #space"),{
      paddingLeft:"0",
      ease: "expo.out",

    });

});


});
const successMessage = document.getElementById('successMessage');
    
    if (successMessage.innerText.trim() !== "") {
      successMessage.style.display = 'block';  // Show the message
      successMessage.style.backgroundColor = 'green';
      // Set a timer to hide the message after 3 seconds (3000 milliseconds)
      setTimeout(() => {
        successMessage.style.display = 'none';
        successMessage.style.backgroundColor = 'transparent';
      }, 3000);
    }