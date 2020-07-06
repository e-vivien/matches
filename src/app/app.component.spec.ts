import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { AppComponent } from "./app.component";

describe("AppComponent", () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  }));

  it("should create the app", () => {
    expect(app).toBeTruthy();
  });

  it("should start a new game correctly with correct input", () => {
    app.newGame();
    expect(app.game.currentMatchesNb).toBeGreaterThan(0);

    app.game.reset();
    expect(app.game.currentMatchesNb).toBeUndefined();

    app.minValue = "50";
    app.maxValue = "50";
    app.newGame();
    expect(app.game.currentMatchesNb).toBe(50);
  });
});
