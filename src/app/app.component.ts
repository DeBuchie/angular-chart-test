import {AfterContentInit, Component} from '@angular/core';
import * as d3 from 'd3';
import {Pie} from 'd3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit {


  ngAfterContentInit(): void {

    const data = [
      {name: 'IE', percent: 39.10},
      {name: 'Chrome', percent: 32.51},
      {name: 'Safari', percent: 13.68},
      {name: 'Firefox', percent: 8.71},
      {name: 'Others', percent: 6.01}
    ];

    const dataset: Array<number> = new Array();
    for (const i of data) {
      dataset.push(i.percent);
    }

    const pie = d3.pie()
      .sort(null)
      .padAngle(.03);

    const width = 300, height = 300;

    const outerRadius = width / 2;
    const innerRadius = 100;

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const arc = d3.arc()
      .outerRadius(outerRadius)
      .innerRadius(innerRadius)
      .startAngle(0)
      .endAngle(Math.PI / 2);

    const svg = d3.select('#chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('class', 'shadow')
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const path = svg.selectAll('path')
      .data(pie(dataset))
      .enter()
      .append('path')
      .attr('d', (d,i,data) => {
        console.log('d', d);
        console.log('i', i);
        console.log('data', data);
        return arc(i);
      })
      .attr('fill', (d, i) => color(d.data.toString()));
  }

}
