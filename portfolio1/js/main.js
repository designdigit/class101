window.addEventListener("load", function(){
	const lenis=new Lenis();

	lenis.on("scroll", ScrollTrigger.update);

	gsap.ticker.add(function(time){
		lenis.raf(time*1000);
	});

	gsap.ticker.lagSmoothing(0);

	let customCursor1=document.querySelector(".cursor-wrap");
	let customCursor2=document.querySelector(".cursor-wrap .cursor");
	let mouseEvent=document.querySelectorAll(".mouse-event");

	document.addEventListener("mousemove", function(e){
		gsap.to(customCursor1, {
			x: e.clientX,
			y: e.clientY,
			xPercent: -50,
			yPercent: -50,
			opacity: 1,
			duration: 0.1
		});
	});

	document.querySelectorAll("a, button").forEach(function(item){
		item.addEventListener("mouseenter", function(){
			gsap.to(customCursor2, { scale: 0.3, duration: 0.1 });
		});

		item.addEventListener("mouseleave", function(){
			gsap.to(customCursor2, { scale: 1, duration: 0.1 });
		});
	});

	const mouseTl=gsap.timeline({ paused: true });

	mouseTl.to(".cursor-wrap i", { opacity: 1, duration: 0.3 })
	.to(".cursor-wrap .view-more", { opacity: 1, duration: 0.3 });

	mouseEvent.forEach(function(item){
		item.addEventListener("mouseenter", function(){
			mouseTl.play();
		});

		item.addEventListener("mouseleave", function(){
			mouseTl.reverse();
		});
	});

	let tab=document.querySelector(".tab");
	let totalMenu=document.querySelector(".total-menu");
	let tabFlag=false;

	tab.addEventListener("click", function(e){
		e.preventDefault();

		if(tabFlag == true){
			return;
		}

		tabFlag=true;

		if(tab.classList.contains("active") == false){
			tab.classList.add("active");
			tab.firstElementChild.setAttribute("class", "fa-regular fa-xmark");

			gsap.fromTo(totalMenu, { display: "block", opacity: 0 }, { opacity: 1, duration: 0.75, ease: Power3.easeOut, onComplete: function(){
				tabFlag=false;
			}});
		}
		else{
			tab.classList.remove("active");
			tab.firstElementChild.setAttribute("class", "fa-regular fa-bars");

			gsap.to(totalMenu, { opacity: 0, duration: 0.75, ease: Power3.easeOut, onComplete: function(){
				tabFlag=false;
				totalMenu.removeAttribute("style");
			}});
		}
	});

	function resizeFunction(){
		if(window.innerWidth > 767){
			if(tab.classList.contains("active") == true){
				tab.classList.remove("active");
				tab.firstElementChild.setAttribute("class", "fa-regular fa-bars");

				gsap.to(totalMenu, { opacity: 0, duration: 1, ease: Power3.easeOut, onComplete: function(){
					totalMenu.removeAttribute("style");
				}});
			}
		}
	}

	resizeFunction();

	window.addEventListener("resize", resizeFunction);

	let pageList=document.querySelectorAll("section");
	let navList=document.querySelectorAll("header nav li");
	let mobileNavList=totalMenu.querySelectorAll(".inner li");

	navList.forEach(function(item, i){
		item.addEventListener("click", function(e){
			e.preventDefault();

			let targety=pageList[i].offsetTop;

			gsap.to(window, { scrollTo: targety, duration: 0.5 });
		});
	});

	mobileNavList.forEach(function(item, i){
		item.addEventListener("click", function(e){
			e.preventDefault();

			tab.classList.remove("active");
			tab.firstElementChild.setAttribute("class", "fa-regular fa-bars");

			gsap.to(totalMenu, { opacity: 0, duration: 0.75, ease: Power3.easeOut, onComplete: function(){
				tabFlag=false;
				totalMenu.removeAttribute("style");

				let targety;

				switch(i){
					case 1 : targety=pageList[i].offsetTop-window.innerHeight/15; break;
					case 2 : targety=pageList[i].offsetTop-window.innerHeight/15; break;
					case 3 : targety=pageList[i].offsetTop-window.innerHeight/5; break;
					case 4 : targety=pageList[i].offsetTop-window.innerHeight/12; break;
					default : targety=pageList[i].offsetTop;
				}

				gsap.to(window, { scrollTo: targety, duration: 0.5 });
			}});
		});
	});

	const mainTl=gsap.timeline();

	mainTl.fromTo(".top .logo", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.5 }, "time1");

	mainTl.fromTo(".top nav", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.5 }, "time1+=0.2");

	mainTl.fromTo(".main-title .group-text .word .char", { yPercent: 180, opacity: 0 }, {
		yPercent: 0,
		opacity: 1,
		duration: 0.3,
		stagger: 0.03,
		ease: Power3.easeOut
	}, "time2");

	mainTl.fromTo(".main-title .description span", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.5 }, "time2+=1");

	mainTl.fromTo(".main-title .author", { opacity: 0 }, { opacity: 1, duration: 2 }, "time2+=2");

	const introTl=gsap.timeline({
		scrollTrigger: {
			trigger: "#about",
			start: "top center"
		}
	});

	introTl.from(".main-text span", { y: 20, opacity: 0, duration: 0.5, stagger: 0.2 }, "time1");
	introTl.from(".sub-text p", { y: 20, opacity: 0, duration: 0.5 }, "time1+=1");
	introTl.from(".sub-text ul li", { y: 20, opacity: 0, duration: 0.5, stagger: 0.2 }, "time1+=1.5");

	gsap.from("#skills .title", {
		y: 20,
		opacity: 0,
		duration: 0.5,
		scrollTrigger: {
			trigger: "#skills",
			start: "top center"
		}
	});

	document.querySelectorAll("#skills .content li").forEach(function(item){
		gsap.from(item, {
			y: 20,
			opacity: 0,
			duration: 0.5,
			scrollTrigger: {
				trigger: item,
				start: "top 80%"
			}
		});
	});

	const mediaQuery=gsap.matchMedia();

	mediaQuery.add("(min-width: 768px)", function(){
		gsap.from(".comment .aosup", {
			y: 100,
			opacity: 0,
			duration: 1,
			scrollTrigger: {
				trigger: ".comment",
				start: "top center"
			}
		});

		gsap.from(".portfolioSwiper", {
			y: 100,
			opacity: 0,
			duration: 1,
			scrollTrigger: {
				trigger: ".portfolioSwiper",
				start: "top center"
			}
		});
	});

	mediaQuery.add("(max-width: 767px)", function(){
		gsap.from(".comment .aosup", {
			y: 50,
			opacity: 0,
			duration: 0.5,
			scrollTrigger: {
				trigger: ".comment",
				start: "top center"
			}
		});

		gsap.from(".portfolioSwiper", {
			y: 50,
			opacity: 0,
			duration: 0.5,
			scrollTrigger: {
				trigger: ".portfolioSwiper",
				start: "top center"
			}
		});
	});

	new Swiper(".portfolioSwiper", {
		slidesPerView: 1,
		centeredSlides: true,
		spaceBetween: 10,
		breakpoints: {
			768: {
				spaceBetween: 0,
				pagination: {
					el: ".portfolioSwiper .swiper-pagination",
					type: "fraction"
				},
				navigation: {
					prevEl: ".portfolioSwiper .swiper-button-prev",
					nextEl: ".portfolioSwiper .swiper-button-next"
				}
			}
		}
	});

	const opensourceTl=gsap.timeline({
		scrollTrigger: {
			trigger: "#open-source",
			start: "top center"
		}
	});

	opensourceTl.from("#open-source .title", { y: 20, opacity: 0, duration: 0.5 });

	opensourceTl.from("#open-source .content", { y: 20, opacity: 0, duration: 2 });

	new Swiper("#open-source .swiper", {
		loop: true,
		speed: 2000,
		slidesPerView: 1.5,
		centeredSlides: true,
		spaceBetween: 20,
		autoplay: {
			delay: 2000
		},
		breakpoints: {
			768: {
				slidesPerView: 3,
				spaceBetween: 20
			},
			1024: {
				slidesPerView: 4.5,
				spaceBetween: 15
			}
		}
	});
});