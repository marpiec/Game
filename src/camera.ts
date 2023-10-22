class Camera {

    private static readonly DEFAULT_UNIT_TO_PIXELS: number = 100;

    private x: number = 0;
    private y: number = 0;
    zoom: number = 1;
    proportion: number = 1;

    constructor(ctx: CanvasRenderingContext2D) {
        this.updateProportion(ctx);
    }

    private updateProportion(ctx: CanvasRenderingContext2D) {
        this.proportion = ctx.canvas.height / ctx.canvas.width;
    }

    private coordinatesToPixels(x: number, y: number): [number, number] {
        return [x * this.zoom, y * this.zoom * this.proportion];
    }

    worldWidthToCanvasWidth(width: number) {
        return width * Camera.DEFAULT_UNIT_TO_PIXELS * this.zoom;
    }

    worldHeightToCanvasHeight(height: number) {
        return height * Camera.DEFAULT_UNIT_TO_PIXELS * this.zoom;
    }

    worldXToCanvasX(x: number) {
        return (x - this.x) * Camera.DEFAULT_UNIT_TO_PIXELS * this.zoom;
    }

    worldYToCanvasY(y: number) {
        return (y - this.y) * Camera.DEFAULT_UNIT_TO_PIXELS * this.zoom;
    }
}