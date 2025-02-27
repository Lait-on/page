import React, { useEffect } from 'react';

export const DynamicBackground = () => {
  useEffect(() => {
    class GridWorm {
      constructor(point, interval, pointsList, screenWidth, screenHeight) {
        this.radius = 2;
        this.xCoord = point.x;
        this.yCoord = point.y;
        this.interval = interval;
        this.color = this.getColor(1, true);
        this.mainColor = this.color.color;
        this.mainColorIndex = this.color.index;
        this.nColor = this.getColor(1, true);
        this.arrowHeadColor = this.nColor.color;
        this.arrowHeadColorIndex = this.nColor.index;
        this.pointsList = pointsList;
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.speed = 5;
        this.velocity = this.getVelocity();
        this.junctionMemory = [{ point: point, velocity: this.velocity }];
        this.junctionMemoryLength = 6;
      }

      getColor(opacity, isRandom = true, index = 0) {
        if (opacity < 0 || opacity > 1 || opacity === null || isNaN(opacity)) {
          opacity = 1;
        }
        var colors = [
          `rgba(0,0,0,${opacity})`, `rgba(192,192,192,${opacity})`, `rgba(128,128,128,${opacity})`, `rgba(128,0,0,${opacity})`,
          `rgba(255,0,0,${opacity})`, `rgba(0,255,0,${opacity})`, `rgba(0,0,255,${opacity})`, `rgba(255,0,255,${opacity})`,
          `rgba(128,128,0,${opacity})`, `rgba(0,128,0,${opacity})`, `rgba(128,0,128,${opacity})`,
          `rgba(0,128,128,${opacity})`, `rgba(0,0,128,${opacity})`, `rgba(138,57,0,${opacity})`, `rgba(205,133,63,${opacity})`,
          `rgba(244,164,96,${opacity})`, `rgba(139,105,30,${opacity})`, `rgba(165,42,42,${opacity})`, `rgba(178,34,34,${opacity})`,
          `rgba(220,20,60,${opacity})`, `rgba(255,140,0,${opacity})`, `rgba(255,165,0,${opacity})`, `rgba(255,215,0,${opacity})`, `rgba(184,134,11,${opacity})`,
          `rgba(218,165,32,${opacity})`, `rgba(218,165,32,${opacity})`, `rgba(238,232,170,${opacity})`, `rgba(189,183,107,${opacity})`, `rgba(240,230,140,${opacity})`,
          `rgba(0,100,0,${opacity})`, `rgba(34,139,34,${opacity})`, `rgba(32,178,170,${opacity})`, `rgba(47,79,79,${opacity})`,
          `rgba(0,139,139,${opacity})`, `rgba(95,158,160,${opacity})`, `rgba(70,130,180,${opacity})`, `rgba(25,25,112,${opacity})`,
          `rgba(0,0,128,${opacity})`, `rgba(0,0,139,${opacity})`, `rgba(72,61,139,${opacity})`, `rgba(75,0,130,${opacity})`, `rgba(139,0,139,${opacity})`,
          `rgba(0,0,0,${opacity})`, `rgba(105,105,105,${opacity})`, `rgba(169,169,169,${opacity})`
        ];
        if (isRandom) {
          let index = Math.floor(this.getRandomNumber(0, colors.length - 1));
          let color = colors[index];
          return { color: color, index: index };
        } else {
          if (index >= 0 && index < colors.length) {
            return colors[index];
          }
          return colors[0];
        }
      }

      getVelocity() {
        let x, y;
        if (Math.random() > 0.5) {
          x = 0;
          y = Math.random() > 0.5 ? -this.speed : this.speed;
        } else {
          x = Math.random() > 0.5 ? -this.speed : this.speed;
          y = 0;
        }
        return { x: x, y: y };
      }

      getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
      }

      drawCircle(x, y, circleradius, ctx, colorIndex) {
        for (let i = 0; i < 3; i++) {
          let color = '';
          let radius = 0;
          switch (i) {
            case 0:
              radius = circleradius;
              color = this.getColor(1, false, colorIndex);
              break;
            case 1:
              radius = circleradius * 2;
              color = this.getColor(0.5, false, colorIndex);
              break;
            case 2:
              radius = circleradius * 6;
              color = this.getColor(0.2, false, colorIndex);
              break;
          }
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, 2 * Math.PI);
          ctx.fillStyle = color;
          ctx.fill();
          ctx.strokeStyle = color;
          ctx.stroke();
        }
      }

      drawArrowHead(x, y, circleradius, ctx, colorIndex) {
        let points = [];
        if (this.velocity.x === 0) {
          if (this.velocity.y > 0) {
            points.push({ x: x + this.interval / 3, y: y });
            points.push({ x: x - this.interval / 3, y: y });
            points.push({ x: x, y: y + this.interval / 3 });
          } else {
            points.push({ x: x + this.interval / 3, y: y });
            points.push({ x: x - this.interval / 3, y: y });
            points.push({ x: x, y: y - this.interval / 3 });
          }
        } else {
          if (this.velocity.x > 0) {
            points.push({ x: x + this.interval / 3, y: y });
            points.push({ x: x, y: y - this.interval / 3 });
            points.push({ x: x, y: y + this.interval / 3 });
          } else {
            points.push({ x: x - this.interval / 3, y: y });
            points.push({ x: x, y: y - this.interval / 3 });
            points.push({ x: x, y: y + this.interval / 3 });
          }
        }
        for (let i = 0; i < points.length; i++) {
          let point = points[i];
          this.drawCircle(point.x, point.y, circleradius / 2, ctx, colorIndex);
        }
        this.drawTriangle(points[0], points[1], points[2], ctx);
      }

      drawTriangle(point1, point2, point3, ctx) {
        ctx.beginPath();
        ctx.moveTo(point1.x, point1.y);
        ctx.lineTo(point2.x, point2.y);
        ctx.lineTo(point3.x, point3.y);
        ctx.fillStyle = 'rgba(0,0,0,0.1)';
        ctx.fill();
      }

      draw(ctx) {
        this.drawCircle(this.xCoord, this.yCoord, this.radius / 2, ctx, this.mainColorIndex);
        this.drawArrowHead(this.xCoord, this.yCoord, this.radius / 2, ctx, this.arrowHeadColorIndex);
        for (let i = 0; i < this.junctionMemory.length; i++) {
          let junction = this.junctionMemory[this.junctionMemory.length - (i + 1)];
          this.drawCircle(junction.point.x, junction.point.y, this.radius / 2, ctx, this.mainColorIndex);
          ctx.fillStyle = this.getColor(0.1, false, this.mainColorIndex);
          ctx.fillRect(junction.point.x, junction.point.y, this.interval, this.interval);
        }
        ctx.strokeStyle = 'black';
        ctx.lineWidth = this.radius;
        ctx.beginPath();
        ctx.moveTo(this.xCoord, this.yCoord);
        for (let i = 0; i < this.junctionMemory.length; i++) {
          let junction = this.junctionMemory[this.junctionMemory.length - (i + 1)];
          ctx.lineTo(junction.point.x, junction.point.y);
        }
        ctx.stroke();
        ctx.closePath();
      }

      update() {
        this.junctionMemoryLength = this.junctionMemoryLength < 1 ? 1 : this.junctionMemoryLength;
        this.xCoord += this.velocity.x;
        this.yCoord += this.velocity.y;
        if (this.xCoord <= this.interval) {
          this.xCoord = this.interval;
          this.velocity.x = -this.velocity.x;
          this.xCoord += this.velocity.x * 3;
        }
        if (this.xCoord >= this.screenWidth - this.interval) {
          this.xCoord = this.junctionMemory[this.junctionMemory.length - 1].point.x;
          this.velocity.x = -this.velocity.x;
          this.xCoord += this.velocity.x * 3;
        }
        if (this.yCoord <= this.interval) {
          this.yCoord = this.interval;
          this.velocity.y = -this.velocity.y;
          this.yCoord += this.velocity.y * 3;
        }
        if (this.yCoord >= this.screenHeight - this.interval) {
          this.yCoord = this.junctionMemory[this.junctionMemory.length - 1].point.y;
          this.velocity.y = -this.velocity.y;
          this.yCoord += this.velocity.y * 4;
        }
        let currentCoord = { x: this.xCoord, y: this.yCoord };
        let latestJunction = this.getJunctionReached(currentCoord);
        if (latestJunction !== currentCoord) {
          let originalVelocity = this.velocity;
          let newVelocity = this.getVelocity();
          if (originalVelocity.y === 0) {
            this.velocity = newVelocity;
            if (newVelocity.y === 0 && newVelocity.x === -originalVelocity.x) {
            } else {
              let memory = { point: latestJunction, velocity: this.velocity };
              if (!this.isInMemory(memory)) {
                this.junctionMemory.push(memory);
              }
            }
            this.xCoord += this.velocity.x * 3;
          } else {
            this.velocity = newVelocity;
            if (newVelocity.x === 0 && newVelocity.y === -originalVelocity.y) {
            } else {
              let memory = { point: latestJunction, velocity: this.velocity };
              if (!this.isInMemory(memory)) {
                this.junctionMemory.push(memory);
              }
            }
            this.yCoord += this.velocity.y * 3;
          }
        }
        if (this.junctionMemory.length > this.junctionMemoryLength) {
          this.junctionMemory.shift();
        }
      }

      isInMemory(memory) {
        this.junctionMemory.some(function (mem) {
          if (mem.point === memory.point) {
            return true;
          }
          return mem.point === memory.point;
        });
        return false;
      }

      getJunctionReached(currentCoord) {
        for (let i = 0; i < this.pointsList.length; i++) {
          let point = this.pointsList[i];
          if (Math.abs(currentCoord.x - point.x) > 2 * this.interval || Math.abs(currentCoord.y - point.y) > 2 * this.interval) {
            continue;
          }
          let distance = this.getDistance(currentCoord, point);
          if (distance <= this.radius) {
            return point;
          }
        }
        return currentCoord;
      }

      getDistance(p1, p2) {
        let dx = p1.x - p2.x;
        let dy = p1.y - p2.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        return distance;
      }
    }

    class Painter {
      constructor(screenWidth, screenHeight) {
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.interval = 40;
        this.points = this.createPoints();
        this.gridWorms = this.createGridWorms();
        this.color = this.getRandomColor(0.1);
        document.addEventListener('click', () => {
          this.points = this.createPoints();
          this.gridWorms = this.createGridWorms();
          this.color = this.getRandomColor(0.1);
        });
      }

      createGridWorms() {
        let gridworms = [],
          numOfGridWorms = 30;
        for (var i = 0; i < numOfGridWorms; i++) {
          let point = this.points[Math.floor(this.getRandomNumber(0, this.points.length - 1))];
          gridworms.push(new GridWorm(point, this.interval, this.points, this.screenWidth, this.screenHeight));
        }
        return gridworms;
      }

      createPoints() {
        let points = [],
          interval = this.interval;
        for (var y = interval; y < this.screenHeight; y += interval) {
          if (y + interval > this.screenHeight) {
            continue;
          }
          for (var x = interval; x < this.screenWidth; x += interval) {
            if (x + interval > this.screenWidth) {
              continue;
            }
            points.push({ x: x, y: y });
          }
        }
        return points;
      }

      getRandomColor(opacity) {
        var colors = [
          `rgba(255,0,0,${opacity})`,
          `rgba(255, 242,0,${opacity})`,
          `rgba(0,0,255,${opacity})`,
          `rgba(255,255,0,${opacity})`,
          `rgba(0,255,255,${opacity})`,
          `rgba(255,0,255,${opacity})`,
          `rgba(192,192,192,${opacity})`,
          `rgba(128,128,128,${opacity})`,
          `rgba(128,0,0,${opacity})`,
          `rgba(128,128,0,${opacity})`,
          `rgba(0,128,0,${opacity})`,
          `rgba(128,0,128,${opacity})`,
          `rgba(0,128,128,${opacity})`,
          `rgba(0,0,128,${opacity})`,
          `rgba(0, 255, 0,${opacity})`,
          `rgba(77, 0, 255,${opacity})`,
          `rgba(255, 0, 140,${opacity})`,
          `rgba(0,255,0,${opacity})`
        ];
        return colors[parseInt(this.getRandomNumber(0, colors.length))];
      }

      getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
      }

      refreshScreenSize(screenHeight, screenWidth) {
        if (this.screenHeight !== screenHeight || this.screenWidth !== screenWidth) {
          this.screenHeight = screenHeight;
          this.screenWidth = screenWidth;
          this.points = this.createPoints();
          this.gridWorms = this.createGridWorms();
        }
      }

      update() {
        this.gridWorms.forEach(function (gridworm) {
          gridworm.update();
        });
      }

      draw(ctx) {
        this.gridWorms.forEach(function (gridworm) {
          gridworm.draw(ctx);
        });
      }
    }

    function getBrowserWindowSize() {
      let win = window,
        doc = document,
        offset = 20,
        docElem = doc.documentElement,
        body = doc.getElementsByTagName('body')[0],
        browserWindowWidth = win.innerWidth || docElem.clientWidth || body.clientWidth,
        browserWindowHeight = win.innerHeight || docElem.clientHeight || body.clientHeight;
      return { x: browserWindowWidth - offset, y: browserWindowHeight - offset };
    }

    let browserWindowSize = getBrowserWindowSize(),
      c = document.getElementById("backgroundCanvas"),
      ctx = c.getContext("2d");
    c.width = browserWindowSize.x;
    c.height = browserWindowSize.y;
    let SCREEN_WIDTH = browserWindowSize.x,
      SCREEN_HEIGHT = browserWindowSize.y,
      painter = new Painter(SCREEN_WIDTH, SCREEN_HEIGHT),
      windowSize;

    function onWindowResize() {
      windowSize = getBrowserWindowSize();
      c.width = windowSize.x;
      c.height = windowSize.y;
      SCREEN_WIDTH = windowSize.x;
      SCREEN_HEIGHT = windowSize.y;
    }

    window.addEventListener('resize', onWindowResize);

    function updateCanvas() {
      ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
      ctx.fillStyle = '#111010'; // Set the background color to black
      ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    }

    function doAnimationLoop() {
      updateCanvas();
      painter.refreshScreenSize(SCREEN_HEIGHT, SCREEN_WIDTH);
      painter.update();
      painter.draw(ctx);
      requestAnimationFrame(doAnimationLoop);
    }

    requestAnimationFrame(doAnimationLoop);
  }, []);

  return <canvas id="backgroundCanvas" className="dynamic-background"></canvas>;
};