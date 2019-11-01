import * as p5 from 'p5';

type MoverType = {
    update: Function
    display: Function
    checkEdges: Function
}

let Mover = (p: p5) => {
    let location = p.createVector(p.random(p.width), p.random(p.height))
    let velocity = p.createVector(p.random(-2, 2), p.random(-2, 2))

    return {
        update: () => location.add(velocity),
        display: () => {
            p.stroke(0)
            p.fill(175)
            p.ellipse(location.x, location.y, 70, 70)
        },
        checkEdges: () => {
            if (location.x > p.width) {
                location.x = 0
            } else if (location.x < 0) {
                location.x = p.width
            }

            if (location.y > p.height) {
                location.y = 0
            } else if (location.y > p.height) {
                location.y = p.height
            }
        }
    }
}

const sketch = (p: p5) => {
    let mover: MoverType;

    p.preload = () => {
    };

    p.setup = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight)
        mover = Mover(p)
        console.log(mover)
    };

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight)
    };

    p.draw = () => {
        p.background(0)
        mover.update()
        mover.checkEdges()
        mover.display()
    }
};

const sketchP = new p5(sketch)