import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FilterService} from '../../services/filter.service';
import {Amount} from '../../interfaces/amount';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() filters;
  amounts: Amount[] = [];
  titles: Title[] = [];
  dates: Date[] = [];
  criteria: any[] = [];

  constructor(private modalService: NgbModal,
              private filterService: FilterService
  ) { }

  ngOnInit(): void {
  }

  open(content, id): void {
    this.modalService.open(content, { size: 'xl' });
    this.createCriteriaList(id);
  }

  createCriteriaList(id): void {
    this.getAmountByFilterId(id);
    this.getTitlesByFilterId(id);
    this.getDateByFilterId(id);
    console.log(this.criteria);
  }

  emptyCriteriaList(): void {
    this.criteria = [];
  }

  getAmountByFilterId(id: number): void {
    this.filterService.getAmountByFilterId(id).subscribe(amount => {
      this.amounts = amount;
      this.criteria.push({
        amount,
        name: 'Amount'
      });
    });
  }

  getTitlesByFilterId(id: number): void {
    this.filterService.getTitleByFilterId(id).subscribe(title => {
      this.titles = title;
      // this.criteria.push(title);

    });
  }

  getDateByFilterId(id: number): void {
    this.filterService.getDateByFilterId(id).subscribe(date => {
      this.dates = date;
      // this.criteria.push(date);
    });
  }

  addRow(): void {
    console.log('Add');
    this.criteria.push({
      name: ''
    });
  }

  removeRow(id): void {
    this.criteria.forEach((element, index) => {
      console.log(element);
      if (element === id) { this.criteria.splice(index, 1); }
    });
  }
}
