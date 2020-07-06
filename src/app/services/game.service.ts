import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class GameService {
  scores = {
    one: 0,
    two: 0,
  };
  currentMatchesNb: number;
  isPlayerOnePlaying: boolean = true;
  private hasPlayerOneStarted: boolean = false;

  constructor() {}

  /**
   * Start a new game by resetting the number of matches to a random number
   * between the given boundaries, then switching the playing order.
   * Both boundaries can be equal in order to fix the number of matches in the game.
   *
   * @param minMatchesNb The minimum number of matches
   * @param maxMatchesNb The maximum number of matches
   */
  newGame(minMatchesNb: number, maxMatchesNb: number) {
    if (minMatchesNb <= maxMatchesNb) {
      this.currentMatchesNb = Math.round(
        Math.random() * (maxMatchesNb - minMatchesNb) + minMatchesNb
      );
      this.isPlayerOnePlaying = !this.hasPlayerOneStarted;
      this.hasPlayerOneStarted = !this.hasPlayerOneStarted;
    }
  }

  /**
   * Reset all the scores and the pool of matches, as well as the turn order.
   */
  reset() {
    this.scores.one = 0;
    this.scores.two = 0;
    this.hasPlayerOneStarted = false;
    delete this.currentMatchesNb;
  }

  /**
   * Main game logic, remove the given number (between 1 and 3) of matches from the pool
   * and check if those we the last ones, rewarding the point if this is the case. If the
   * pool is empty prior to the removal of any match, no point is given.
   *
   * @param nbOfMatches The number of matches to remove from the pool
   */
  play(nbOfMatches: number) {
    if (this.currentMatchesNb > 0 && nbOfMatches > 0 && nbOfMatches < 4) {
      this.currentMatchesNb = Math.max(this.currentMatchesNb - nbOfMatches, 0);

      if (this.currentMatchesNb === 0) {
        if (this.isPlayerOnePlaying) {
          this.scores.one++;
        } else {
          this.scores.two++;
        }
      } else {
        this.isPlayerOnePlaying = !this.isPlayerOnePlaying;
      }
    }
  }
}
