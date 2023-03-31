import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-products-header",
  templateUrl: "./products-header.component.html",
  styles: [],
})
export class ProductsHeaderComponent implements OnInit {
  @Output() itemCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();
  @Output() columnsCountChange = new EventEmitter<number>();

  sort = "desc";
  itemShowCount = 12;

  constructor() {}

  ngOnInit(): void {}

  onSortUpdated(newSort: string): void {
    this.sort = newSort;
    this.sortChange.emit(newSort);
  }

  onItemsUpdated(count: number): void {
    this.itemShowCount = count;
    this.itemCountChange.emit(count);
  }

  onColumnsUpdated(colsNum: number): void {
    this.columnsCountChange.emit(colsNum);
  }
}
