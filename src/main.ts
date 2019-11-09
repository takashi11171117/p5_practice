import * as p5 from 'p5';

type MoverType = {
    applyForce: Function
    update: Function
    display: Function
    checkEdges: Function
}

let Mover = (p: p5, m: number, x: number, y: number) => {
    let location = p.createVector(x, y)
    let velocity = p.createVector(0, 0)
    let acceleration = p.createVector(0, 0)
    let mass = m

    return {
        applyForce: (force: p5.Vector) => {
            let f = p5.Vector.div(force, mass)
            acceleration.add(f)
        },
        update: () => {
            velocity.add(acceleration)
            location.add(velocity)
            acceleration.mult(0)
        },
        display: () => {
            p.stroke(0)
            p.fill(175)
            p.ellipse(location.x, location.y, mass * 16, mass * 16)
        },
        checkEdges: () => {
            if (location.x > p.width) {
                location.x = p.width
                velocity.x *= -1
            } else if (location.x < 0) {
                velocity.x *= -1
                location.x = 0
            }

            if (location.y > p.height) {
                velocity.y *= -1
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
        [...Array(100)].map(() => movers.push(Mover(p, p.random(0.1, 5), 0, 0)))
    };

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight)
    };

    p.draw = () => {
        p.background(255);

        let wind = p.createVector(0.01, 0)
        let gravity = p.createVector(0, 0.1);

        [...Array(100)].map((_, i) => {
            movers[i].applyForce(wind)
            movers[i].applyForce(gravity)
            movers[i].update()
            movers[i].display()
            movers[i].checkEdges()
        })
    }
};

const sketchP = new p5(sketch)