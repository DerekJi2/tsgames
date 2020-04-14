export interface ITetrisGame {
  moveLeft(): void;
  moveRight(): void;
  moveDown(): void;
  rotate(): void;

  iconChangeCallback(): void;
}
