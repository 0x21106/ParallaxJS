class parallax {
    constructor(debug = false) {
        if(debug) {
            console.clear();
            console.warn("ParallaxJS Debugger Mode");
        }
        console.log("ParallaxJS Version 1.0.0");
    }
    set(data) {
        $(data.element).css({
            "width": "100%",
            "height": "100%",
            "position": "fixed",
            "transform": "scale(1.1)",
            "background": `url(${data.url}) ${data.repeat}`,
            "background-position": data.position
        });
        
        let animationPlay = false;
        (data.animation === true) ? animationPlay = true : animationPlay = false;
        
        let lFollowX = 0,
            lFollowY = 0,
            x = 0,
            y = 0,
            friction = 1 / data.speed,
            translate = "";
        
        function moveBackground() {
            x += (lFollowX - x) * friction;
            y += (lFollowY - y) * friction;
            
            translate = `translate(${x}px, ${y}px) scale(1.1)`;

            $(data.element).css({
                '-webit-transform': translate,
                '-moz-transform': translate,
                'transform': translate
            });

            window.requestAnimationFrame(moveBackground);
        }
        
        window.onmousemove = function(e) {
            if(data.animation === false) {
                $(data.element).css({
                    top: (window.innerHeight / 2 - e.clientY) / data.speed + "px",
                    left: (window.innerWidth / 2 - e.clientX) / data.speed + "px"
                });
            } else {
                
                var lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX));
                var lMouseY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY));
                lFollowX = (20 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
                lFollowY = (10 * lMouseY) / 100;
                
                
            }
        }
        if(data.animation === true) {
            moveBackground();
        }
    }
}






