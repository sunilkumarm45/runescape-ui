import { Component, OnInit, Injectable, AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';
import {  of } from 'rxjs';
import {environment} from './../../environments/environment';
import { map } from 'rxjs/operators';

const playersScoreUrl = environment.playersScoreApi;
const playersDataUrl = environment.playersDataApi;
const catDataUrl = environment.catDataApi;

export interface Player {
  id: string;
  name: string;
  attack: any;
  defense: any;
  magic: any;
  cooking: any;
  crafting: any;
  overall: number;
  level: number;
}

export interface PlayerScores {
  rank: number;
  name: string;
  level: number;
  score: number;
}

export interface PlayerScore {
  id: string;
  name: string;
  skill: string;
  level: number;
  score: number;
}

@Injectable({
  providedIn: 'root'
})

export class Service {
  constructor(private httpClient: HttpClient) { }

  scoreData: any[] = [];
  playerData: Player | undefined;
  errorMsg: string;

  getPlayerData() {
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.scoreData == null ? of(this.scoreData)
      : this.httpClient.get<any[]>(playersScoreUrl, httpOptions)
        .pipe(map((data) => {
          if (data != null) {
            this.scoreData= data;
            return this.scoreData;
          }
        }));
  }

  getPlayerDetails(name) {
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    if(name != null && name != undefined) {
      console.log("NAme in service:", name)
      const playerDetailsUrl = playersDataUrl.concat(name);
      console.log("playerDetailsUrl:", playerDetailsUrl)
      return this.httpClient.get(playerDetailsUrl)
        .pipe(
          catchError(error => {
            if (error.error instanceof ErrorEvent) {
              this.errorMsg = `Error: ${error.error.message}`;
            } else {
              this.errorMsg = `Error: ${error.message}`;
            }
            console.log("eror:",this.errorMsg )
            return of(this.playerData);
          })
        );
    }/*
    return this.playerData;*/
  }

  getDataByCat(cat) {
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    if(cat != null && cat != undefined) {
      const catDetailsUrl = catDataUrl.concat(cat);
      return this.httpClient.get<any[]>(catDetailsUrl, httpOptions)
        .pipe(map((data) => {
          if (data != null) {
            this.scoreData= data;
            return this.scoreData;
          }
        }));
    }/*
    else {
      this.scoreData = [];
      return this.scoreData
    }*/
  }


}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent  implements AfterViewInit {

  scoreData;
  playerDetail;
  dataSource;
  displayedColumns: string[] = ['rank', 'name', 'level', 'score'];
  displayPlayerColumns: string[] = ['skill', 'level', 'score'];
  categories: string[] = ['Overall', 'Attack', 'Defense', 'Magic', 'Cooking', 'Crafting'];
  playerName;
  showPlayer: boolean = false;
  playerError = '';
  playerScore: any[] = [];
  selectedSkill: string = 'Overall';

  constructor(private service: Service) {  }

  @ViewChild(MatPaginator, { static: false })paginator: MatPaginator;



  ngOnInit(): void {
    console.log("Here");
    this.showPlayer = false;
    this.scoreData = this.service.getPlayerData();
    this.dataSource = this.scoreData;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
/*
  handleClick(selectedItem) {
    this.selectedItem = selectedItem.linkTitle;
  }*/

  searchByName(name){
    console.log("NAme is:", name);
    this.service.getPlayerDetails(name).subscribe(x=> {
      this.playerDetail = x;
      console.log("sdsd player:",this.playerDetail);
      if(this.playerDetail!= undefined) {
        this.playerScore = [
          {id: this.playerDetail.id, name: this.playerDetail.name, skill: 'Overall', level: this.playerDetail.level, score:this.playerDetail.overall},
          {id: this.playerDetail.id, name: this.playerDetail.id, skill: 'Attack', level: this.playerDetail.attack.level, score:this.playerDetail.attack.score},
          {id: this.playerDetail.id, name: this.playerDetail.id, skill: 'Defense', level: this.playerDetail.defense.level, score:this.playerDetail.attack.score},
          {id: this.playerDetail.id, name: this.playerDetail.id, skill: 'Magic', level: this.playerDetail.magic.level, score:this.playerDetail.magic.score},
          {id: this.playerDetail.id, name: this.playerDetail.id, skill: 'Cooking', level: this.playerDetail.cooking.level, score:this.playerDetail.cooking.score},
          {id: this.playerDetail.id, name: this.playerDetail.id, skill: 'Crafting', level: this.playerDetail.crafting.level, score:this.playerDetail.crafting.score},
        ];
        this.showPlayer = true;
      }
      else {
        this.playerError = 'Player not found!';
        this.showPlayer = false;
        alert(this.playerError);
      }

    });
  }

  searchByCat(cat) {
    this.showPlayer = false;
    this.selectedSkill = cat;
    if(cat === 'overall') {
      this.scoreData = this.service.getPlayerData();
    }
    else {
      this.scoreData = this.service.getDataByCat(cat);
    }
    this.dataSource = this.scoreData;
  }
}

