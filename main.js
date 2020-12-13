//Custom Cursor

gsap.set(".cursor", {
    xPercent: -50,
    yPercent: -50
});

var cursor = document.querySelector(".cursor");
var pos = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
};
var mouse = {
    x: pos.x,
    y: pos.y
};
var speed = 0.3;

var xSet = gsap.quickSetter(cursor, "x", "px");
var ySet = gsap.quickSetter(cursor, "y", "px");

window.addEventListener("mousemove", e => {
    mouse.x = e.x;
    mouse.y = e.y;
});

gsap.ticker.add(() => {
    var dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());

    pos.x += (mouse.x - pos.x) * dt;
    pos.y += (mouse.y - pos.y) * dt;
    xSet(pos.x);
    ySet(pos.y);
});

const cursorShrink = (e) => {
    gsap.to('.cursor', {
        borderWidth: 4,
        scale: .6,
        duration: .4,
        ease: "power4.inOut"
    })
};

const cursorGrow = (e) => {
    gsap.to('.cursor', {
        borderWidth: 0,
        scale: 1,
        duration: .4,
        ease: "power4.inOut"
    })
};

//Nav Links

const navLink = document.querySelectorAll('.navLink');
const underline = document.querySelectorAll('.underline');
const link = document.querySelectorAll('.link');

const underlineGrow = (item) => {
    gsap.to(underline[item], {
        height: 10,
        duration: .4
    })
}

const underlineShrink = () => {
    gsap.to('.underline', {
        height: 0,
        duration: .4
    })
}

navLink.forEach((value, index) => {
    value.addEventListener('mouseenter', e => {
        underlineGrow(index);
    })
});

navLink.forEach((value, index) => {
    value.addEventListener('mouseleave', e => {
        underlineShrink(index);
    })
});

link.forEach((value, index) => {
    value.addEventListener('mouseenter', e => {
        cursorShrink(e);
    })
});

link.forEach((value, index) => {
    value.addEventListener('mouseleave', e => {
        cursorGrow(e);
    })
});

//Lottie

var logoAnimation = lottie.loadAnimation({
    container: document.getElementById('animLogo'), // Required
    path: './assets/logo/mainLogoAnim.json', // Required
    renderer: 'svg', // Required
    loop: true, // Optional
    autoplay: true, // Optional
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid meet'
    }
})

//Barba

barba.init({
    transitions: [{
        name: 'opacity-transition',
        leave(data) {
            return gsap.to(data.current.container, {
                opacity: 0
            });
        },
        enter(data) {
            return gsap.from(data.next.container, {
                opacity: 0
            });
        }
    }]
});