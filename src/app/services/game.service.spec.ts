import { TestBed } from "@angular/core/testing";

import { GameService } from "./game.service";

describe("GameService", () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should allow the creation of a game with a fixed number of matches", () => {
    const nbOfMatches = 10;
    service.newGame(nbOfMatches, nbOfMatches);
    expect(service.currentMatchesNb).toBe(nbOfMatches);
  });

  it("should not allow the creation of a game with wrong boundaries", () => {
    service.newGame(10, 5);
    expect(service.currentMatchesNb).toBeUndefined();
    service.newGame(undefined, undefined);
    expect(service.currentMatchesNb).toBeUndefined();
    service.newGame(undefined, 10);
    expect(service.currentMatchesNb).toBeUndefined();
    service.newGame(10, undefined);
    expect(service.currentMatchesNb).toBeUndefined();
  });

  it("should change player with each turn", () => {
    service.newGame(2, 2);
    expect(service.isPlayerOnePlaying).toBeTrue();
    service.play(1);
    expect(service.isPlayerOnePlaying).toBeFalse();
  });

  it("should reward the player emptying the pool of matches", () => {
    service.newGame(2, 2);
    expect(service.currentMatchesNb).toBe(2);
    service.play(2);
    expect(service.currentMatchesNb).toBe(0);
    expect(service.scores.one).toBe(1);

    service.newGame(2, 2);
    expect(service.currentMatchesNb).toBe(2);
    service.play(1);
    expect(service.currentMatchesNb).toBe(1);
    service.play(1);
    expect(service.currentMatchesNb).toBe(0);
    expect(service.scores.one).toBe(2);
  });

  it("should only allow the correct number of matches each turn", () => {
    service.newGame(4, 4);
    expect(service.currentMatchesNb).toBe(4);
    expect(service.isPlayerOnePlaying).toBeTrue();
    service.play(4);
    expect(service.currentMatchesNb).toBe(4);
    expect(service.isPlayerOnePlaying).toBeTrue();
    expect(service.scores.one).toBe(0);
  });
});
