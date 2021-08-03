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
  @Input() newFilter;
  amounts: Amount[] = [];
  titles: Title[] = [];
  dates: Date[] = [];
  showRow = false;
  deleteAmounts = [];
  deleteTitles = [];
  deleteDates = [];

  isChecked;
  isCheckedName;
  checkboxData = [1,2,3,4,5,6,7,8];
  numberOfCriterias;


  filterTypes = ['Amount', 'Title', 'Date'];
  selectCriteriaType = [];
  amountCriteriaType = ['More', 'Less', 'Equal'];
  titleCriteriaType = ['Starts with', 'Ends with'];
  dateCriteriaType = ['From', 'Before'];

  newAttribute: any = {};

  constructor(private modalService: NgbModal,
              private filterService: FilterService
  ) { }

  onChange(e): void{
    this.isChecked = !this.isChecked;
    this.isCheckedName = e.target.name;
  }

  ngOnInit(): void {
    if (this.filters !== null && this.filters !== undefined) {
      this.newAttribute.filterName = this.filters.filterName;
    }
    this.createSelectListForCriterias();
  }

  open(content): void {
    this.modalService.open(content, { size: 'xl' });
  }

  addFieldValue(type): void {
    if (type === 'Amount') {
      this.filters.amounts.push(this.newAttribute);
      this.newAttribute.filterId = this.filters.id;
      this.amounts.push(this.newAttribute);
    }
    if (type === 'Title') {
      this.filters.titles.push(this.newAttribute);
      this.newAttribute.filterId = this.filters.id;
      this.titles.push(this.newAttribute);
    }
    if (type === 'Date') {
      this.filters.dates.push(this.newAttribute);
      this.newAttribute.filterId = this.filters.id;
      this.dates.push(this.newAttribute);
    }
    this.newAttribute = {};
    this.newAttribute.filterName = this.filters.filterName;
  }

  // TODO update with API call
  deleteFieldValue(index, type): void {
    if (type === 'amount') {
      this.deleteAmounts.push(this.filters.amounts.splice(index, 1));
    }
    if (type === 'title') {
      this.deleteAmounts.push(this.filters.titles.splice(index, 1));
    }
    if (type === 'date') {
      this.deleteAmounts.push(this.filters.dates.splice(index, 1));
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

  saveFilter(): void {
    if (this.newFilter) {
      const newFilterJson = {
        filterName: this.newAttribute.filterName
      };
      this.filterService.postFilter(newFilterJson).subscribe(newFilterName => {
        this.filters = newFilterName;
      });
    }

    this.saveAmount();
    this.saveTitle();
    this.saveDate();
    this.deleteAmount();
    this.deleteTitle();
    this.deleteDate();
    window.location.reload();
  }

  saveAmount(): void {
    if (this.amounts.length !== 0) {
      this.amounts.forEach(saveAmounts => {
        this.filterService.postAmount(saveAmounts).subscribe(amount => {
          console.log(amount);
        });
      });
      this.amounts = [];
    }
  }

  saveTitle(): void {
    if (this.titles.length !== 0) {
      this.titles.forEach(saveTitles => {
        this.filterService.postTitle(saveTitles).subscribe(title => {
          console.log(title);
        });
      });
      this.titles = [];
    }
  }

  saveDate(): void {
    if (this.dates.length !== 0) {
      this.dates.forEach(saveDates => {
        this.filterService.postDate(saveDates).subscribe(date => {
          console.log(date);
        });
      });
      this.dates = [];
    }
  }

  deleteFilter(id): void {
    this.filterService.deleteFilter(id).subscribe(deleted => {
      console.log(deleted);
      window.location.reload();
    });
  }

  deleteAmount(): void {
    if (this.deleteAmounts.length !== 0) {
      this.deleteAmounts.forEach(deleted => {
        console.log(deleted[0]);
        this.filterService.deleteAmount(deleted[0].id).subscribe(delAmount => {
          console.log(delAmount);
        });
      });
    }
  }

  deleteTitle(): void {
    if (this.deleteTitles.length !== 0) {
      this.deleteTitles.forEach(deleted => {
        this.filterService.deleteTitle(deleted[0].id).subscribe(delTitle => {
          console.log(delTitle);
        });
      });
    }
  }

  deleteDate(): void {
    if (this.deleteDates.length !== 0) {
      this.deleteDates.forEach(deleted => {
        this.filterService.deleteDate(deleted[0].id).subscribe(delDate => {
          console.log(delDate);
        });
      });
    }
  }

  createSelectListForCriterias(): void {
    let listLen = 0;
    if (this.filters.amounts !== null) {
      listLen += this.filters.amounts.length;
    }
    if (this.filters.titles != null) {
      listLen += this.filters.titles.length;
    }
    if (this.filters.dates != null) {
      listLen += this.filters.dates.length;
    }
    this.numberOfCriterias = Array.from({length: listLen}, (_, i) => i + 1);

  }
}
