import * as p5 from 'p5';

type MoverType = {
    update: Function
    display: Function
    checkEdges: Function
}

let Mover = (p: p5) => {
    let location = p.createVector(p.random(p.width), p.random(p.height))
    let velocity = p.createVector(0, 0)
    let acceleration = p.createVector(-0.001, 0.01)
    let topspeed = 4

    return {
        update: () => {
            let mouse = p.createVector(p.mouseX, p.mouseY)
            let dir = p5.Vector.sub(mouse, location)

            dir.normalize()
            dir.mult(0.5)
            acceleration = dir

            velocity.add(acceleration)
            velocity.limit(topspeed)
            location.add(velocity)
        },
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
    let movers: MoverType[] = [];

    p.preload = () => {
    };

    p.setup = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        [...Array(20)].map(() => movers.push(Mover(p)))
    };

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight)
    };

    p.draw = () => {
        p.background(0);
        [...Array(20)].map((_, i) => {
            movers[i].update()
            movers[i].checkEdges()
            movers[i].display()
        })
    }
};

const sketchP = new p5(sketch)