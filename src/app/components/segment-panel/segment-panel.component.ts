import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-segments-panels',
  templateUrl: './segment-panel.component.html',
  styleUrls: ['./segment-panel.component.scss'],
})
export class SegmentPanelComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() panelName: string;

  constructor() {
    this.panelName = '';
  }
  ngOnInit(): void {}

  ngAfterViewInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    //console.log("Component chamnge detected from ",changes['panelName']?.previousValue,"=>",changes['panelName']?.currentValue);
  }
}
