class BoardCell implements Renderable {

    constructor(
        readonly empty: boolean,
        readonly worldX: number,
        readonly worldY: number,
        readonly worldWidth: number,
        readonly worldHeight: number,
        readonly primitives: Array<Primitive>) {}

    static empty(boardX: number, boardY: number) {
        return new BoardCell(true, boardX, boardY, 1, 1, []);
    }

    static wall(boardX: number, boardY: number) {
        return new BoardCell(false, boardX, boardY, 1, 1, [
            new Rectangle(0, 0, 1, 1, "#ffffff")
        ]);
    }


}

class Board {
    width: number = 10;
    height: number = 10;
    board: Array<Array<BoardCell>> = [];

    constructor() {
        for(let x = 0; x < this.width; x++) {
            this.board[x] = [];
            for(let y = 0; y < this.height; y++) {
                this.board[x]![y] = Math.random() < 0.2 ? BoardCell.wall(x, y) : BoardCell.empty(x, y);
            }
        }
    }

    render(renderer: Renderer) {

        for(let x = 0; x < this.width; x++) {
            for(let y = 0; y < this.height; y++) {
                renderer.renderRenderable(this.board[x]![y]!);
            }
        }
    }
}