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

//Barba

const blockerIn = () => {
    return new Promise(resolve => {
        let tl = gsap.timeline({
            defaults: {
                duration: 2,
                ease: "power4.inOut"
            }
        });

        tl.set('.blocker', {
                transformOrigin: '0% 0%'
            })
            .to('.blocker', {
                scaleX: 1,
                onComplete: resolve
            });
    })
}

const blockerOut = () => {
    return new Promise(resolve => {
        let tl = gsap.timeline({
            defaults: {
                duration: 2,
                ease: "power4.inOut"
            }
        });

        tl.set('.blocker', {
                transformOrigin: '100% 0%',
            })
            .to('.blocker', {
                scaleX: 0,
                transformOrigin: '100% 0%',
            }, '<')
            .set('.blocker', {
                transformOrigin: '0% 0%',
                onComplete: resolve
            }, '<')
    })
}

barba.init({
    transitions: [{
        name: 'home-to-project',
        leave: () => blockerIn(),
        enter: () => blockerOut()
    }]
});