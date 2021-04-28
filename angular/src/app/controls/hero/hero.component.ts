import { Component, OnInit } from '@angular/core';
import { version } from '@app/../../package.json';

@Component({
  selector: 'hero',
  templateUrl: 'hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements OnInit {
  public version: string = version;
  constructor() {}

  ngOnInit() {}
}
