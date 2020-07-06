import { Component } from "@angular/core";
import { GameService } from "./services/game.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  minValue: string = "15";
  maxValue: string = "25";

  constructor(public readonly game: GameService) {}

  /**
   * Call upon the GameService to create a new game using the currently filled value in the inputs
   */
  newGame() {
    if (this.minValue && this.maxValue) {
      this.game.newGame(parseInt(this.minValue), parseInt(this.maxValue));
    }
  }
}
