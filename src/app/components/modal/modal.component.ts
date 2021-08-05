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
  deleteAmounts = [];
  deleteTitles = [];
  deleteDates = [];

  isChecked;
  isCheckedName;
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

  onChange(e): void {
    this.isChecked = !this.isChecked;
    this.isCheckedName = e.target.name;
    this.newAttribute.selectedFilter = this.isCheckedName;
    this.filters.selectedFilter = 0;
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
  }

  deleteFieldValue(index, type): void {
    if (type === 'amount') {
      this.deleteAmounts.push(this.filters.amounts.splice(index, 1));
    }
    if (type === 'title') {
      this.deleteTitles.push(this.filters.titles.splice(index, 1));
    }
    if (type === 'date') {
      this.deleteDates.push(this.filters.dates.splice(index, 1));
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
    this.updateFilter();
    this.updateAmount();
    this.updateTitle();
    this.updateDate();
    // window.location.reload();
  }

  saveAmount(): void {
    if (this.amounts.length !== 0) {
      this.amounts.forEach(saveAmounts => {
        this.filterService.postAmount(saveAmounts).subscribe(() => {});
      });
      this.amounts = [];
    }
  }

  saveTitle(): void {
    if (this.titles.length !== 0) {
      this.titles.forEach(saveTitles => {
        this.filterService.postTitle(saveTitles).subscribe(() => {});
      });
      this.titles = [];
    }
  }

  saveDate(): void {
    if (this.dates.length !== 0) {
      this.dates.forEach(saveDates => {
        this.filterService.postDate(saveDates).subscribe(() => {});
      });
      this.dates = [];
    }
  }

  updateFilter(): void {
    if (this.filters != null) {
      const upFilter = {
        id: this.filters.id,
        filterName: this.filters.filterName,
        selectedFilter: this.isCheckedName
      };
      this.filterService.updateFilter(upFilter).subscribe(() => {
      });
    }
  }

  updateAmount(): void {
    if (this.filters.amounts != null) {
      this.filters.amounts.forEach(update => {
        const upAmount = {
          id: update.id,
          compareCondition: update.compareCondition,
          number: update.number
        };
        this.filterService.updateAmount(upAmount).subscribe(() => {});
      });
    }
  }

  updateTitle(): void {
    if (this.filters.titles != null) {
      this.filters.titles.forEach(update => {
        const upTitle = {
          id: update.id,
          compareCondition: update.compareCondition,
          text: update.text
        };
        this.filterService.updateTitle(upTitle).subscribe(() => {
        });
      });
    }
  }

  updateDate(): void {
    if (this.filters.dates != null) {
      this.filters.dates.forEach(update => {
        const upDate = {
          id: update.id,
          compareCondition: update.compareCondition,
          date: update.date
        };
        this.filterService.updateDate(upDate).subscribe(() => {
        });
      });
    }
  }

  deleteFilter(id): void {
    this.filterService.deleteFilter(id).subscribe(() => {
      window.location.reload();
    });
  }

  deleteAmount(): void {
    if (this.deleteAmounts.length !== 0) {
      this.deleteAmounts.forEach(deleted => {
        this.filterService.deleteAmount(deleted[0].id).subscribe(() => {});
      });
    }
  }

  deleteTitle(): void {
    if (this.deleteTitles.length !== 0) {
      this.deleteTitles.forEach(deleted => {
        this.filterService.deleteTitle(deleted[0].id).subscribe(() => {});
      });
    }
  }

  deleteDate(): void {
    if (this.deleteDates.length !== 0) {
      this.deleteDates.forEach(deleted => {
        this.filterService.deleteDate(deleted[0].id).subscribe(() => {});
      });
    }
  }

  createSelectListForCriterias(): void {
    this.numberOfCriterias = [];
    let listLen = 0;
    if (this.filters?.amounts !== null) {
      listLen += this.filters?.amounts.length;
    }
    if (this.filters?.titles != null) {
      listLen += this.filters?.titles.length;
    }
    if (this.filters?.dates != null) {
      listLen += this.filters?.dates.length;
    }
    this.numberOfCriterias = Array.from({length: listLen}, (_, i) => i + 1);
  }

  checkIfNewFilterIsCloseEditing(): void {
    if (this.newFilter) {
      this.filterService.deleteFilter(this.filters.id).subscribe(() => {
        window.location.reload();
      });
    }
  }
}
