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

  filterTypes = ['Amount', 'Title', 'Date'];
  selectCriteriaType = [];
  amountCriteriaType = ['More', 'Less', 'Equal'];
  titleCriteriaType = ['Starts with', 'Ends with'];
  dateCriteriaType = ['From', 'Before'];

  newAttribute: any = {};

  constructor(private modalService: NgbModal,
              private filterService: FilterService
  ) { }

  ngOnInit(): void {
  }

  open(content, id): void {
    this.modalService.open(content, { size: 'xl' });
  }

  addFieldValue(type): void {
    if (type === 'Amount') {
      this.filters.amounts.push(this.newAttribute);
    }
    if (type === 'Title') {
      this.filters.titles.push(this.newAttribute);
    }
    if (type === 'Date') {
      this.filters.dates.push(this.newAttribute);
    }
    this.newAttribute = {};
  }

  // TODO update with API call
  deleteFieldValue(index, type): void {
    if (type === 'amount') {
      this.filters.amounts.splice(index, 1);
    }
    if (type === 'title') {
      this.filters.titles.splice(index, 1);
    }
    if (type === 'date') {
      this.filters.dates.splice(index, 1);
    }
  }

  getSelectedCriteria(): void {
    if (this.newAttribute.type === 'Amount') {
      this.selectCriteriaType = this.amountCriteriaType;
    }
    if (this.newAttribute.type === 'Title') {
      this.selectCriteriaType = this.titleCriteriaType;
    }
    if (this.newAttribute.type === 'Date') {
      this.selectCriteriaType = this.dateCriteriaType;
    }
  }
}
