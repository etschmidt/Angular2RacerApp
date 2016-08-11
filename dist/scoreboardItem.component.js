"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var race_1 = require('./race');
var raceScore_service_1 = require('./raceScore.service');
var ScoreboardItemComponent = (function () {
    function ScoreboardItemComponent(raceScoreService) {
        this.raceScoreService = raceScoreService;
        this.notification = new core_1.EventEmitter();
    }
    ScoreboardItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.raceScoreService.getScoreForRace(this.race.id)
            .subscribe(function (data) {
            _this.checkForNotification(data);
            _this.score = data;
        });
    };
    ScoreboardItemComponent.prototype.checkForNotification = function (newScore) {
        if (newScore.currentLap >= newScore.totalLaps) {
            this.notification.emit("The " + this.race.name + " race has finished and " + newScore.racers[0] + " is the winner!");
        }
        if (this.score && newScore.racers[0] != this.score.racers[0]) {
            this.notification.emit(newScore.racers[0] + " has taken the lead in " + this.race.name + " race!");
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', race_1.Race)
    ], ScoreboardItemComponent.prototype, "race", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ScoreboardItemComponent.prototype, "notification", void 0);
    ScoreboardItemComponent = __decorate([
        core_1.Component({
            selector: "scoreboard-item",
            template: "\n\t<div class=\"scoreboard-item\" [class.finished]=\"score.currentLap >= score.totalLaps\" *ngIf=\"score\">\n\t\t<h2>{{ race.name }}</h2>\n\t\t<p>Lap {{ score.currentLap }} of {{ score.totalLaps }}</p>\n\t\t<ol>\n\t\t\t<li *ngFor=\"let racer of score.racers\">\n\t\t\t\t{{ racer }}\n\t\t\t</li>\n\t\t</ol>\n\t</div>\n\t",
            providers: [raceScore_service_1.RaceScoreService],
            styles: ["\n\t\t.scoreboard-item {\n\t\t\tborder: 1px solid yellow;\n\t\t}\n\n\t\t.scoreboard-item.finished {\n\t\t\tborder: 1px solid green;\n\t\t}\n\t"]
        }), 
        __metadata('design:paramtypes', [raceScore_service_1.RaceScoreService])
    ], ScoreboardItemComponent);
    return ScoreboardItemComponent;
}());
exports.ScoreboardItemComponent = ScoreboardItemComponent;
//# sourceMappingURL=scoreboardItem.component.js.map