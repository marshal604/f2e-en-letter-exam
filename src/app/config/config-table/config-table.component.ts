import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
@Component({
  selector: 'yur-config-table',
  templateUrl: './config-table.component.html',
  styleUrls: ['./config-table.component.scss']
})
export class ConfigTableComponent implements OnInit, OnChanges {
  @Input() data: any[];
  @Input() headers: string[];
  @Input() headersMap: Map<string, string>;
  @Input() parseRowWordingFn: (row: any, header: string) => string | number;
  @Output() clickRow = new EventEmitter<{
    row: any;
    header: string;
  }>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  constructor() {}

  ngOnInit() {
    this.initDataSource();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.data &&
      !changes.data.isFirstChange() &&
      changes.data.previousValue !== changes.data.currentValue
    ) {
      this.dataSource.data = changes.data.currentValue;
    }
  }

  onFilterTable(filterStr: string) {
    this.dataSource.filter = filterStr.toLowerCase().trim();
    this.dataSource.paginator.firstPage();
  }

  private initDataSource() {
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
