interface Primitive {
}

class Rectangle implements Primitive {
    constructor(
        readonly x: number,
        readonly y: number,
        readonly width: number,
        readonly height: number,
        readonly color: string) {
    }
}

interface Renderable {
    worldX: number;
    worldY: number;
    worldWidth: number;
    worldHeight: number;
    primitives: Array<Primitive>;
}

class Renderer {
    constructor(
        readonly canvas: HTMLCanvasElement,
        readonly ctx: CanvasRenderingContext2D,
        readonly camera: Camera) {
    }

    adjustContextSize() {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
    }

    drawSquare(x: number, y: number, size: number, color: string) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, size, size);
    }

    drawCircle(x: number, y: number, radius: number, color: string) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    renderRenderable(renderable: Renderable) {
        renderable.primitives.forEach(primitive => {
            if(primitive instanceof Rectangle) {
                this.renderRectanglePrimitive(renderable, primitive);
            }
        });
    }

    private renderRectanglePrimitive(renderable: Renderable, rectangle: Rectangle) {
        this.ctx.fillStyle = rectangle.color;
        this.ctx.fillRect(
            this.camera.worldXToCanvasX(renderable.worldX + rectangle.x),
            this.camera.worldYToCanvasY(renderable.worldY + rectangle.y),
            this.camera.worldWidthToCanvasWidth(rectangle.width),
            this.camera.worldHeightToCanvasHeight(rectangle.height));
    }
}