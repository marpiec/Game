const mainBackgroundColor = "#000000";


class Game {

    readonly board = new Board();

    constructor(readonly renderer: Renderer) {}

    start() {
        // while(true) {
            this.gameLoop();
            requestAnimationFrame(() => this.start());
        // }
    }

    gameLoop() {
        this.drawBoard();
    }

    drawBoard() {
        this.renderer.adjustContextSize();
        this.clearBoard();
        this.board.render(this.renderer);
    }

    clearBoard() {
        this.renderer.clearCanvas();
    }

}

function start() {
    const canvas = document.getElementById("mainCanvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    const camera = new Camera(ctx);
    const game = new Game(new Renderer(canvas, ctx, camera));
    game.start();
}