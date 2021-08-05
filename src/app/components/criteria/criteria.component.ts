import {Component, Input, OnInit} from '@angular/core';
import {FilterService} from '../../services/filter.service';
import {TitleService} from '../../services/title.service';
import {AmountService} from '../../services/amount.service';
import {DateService} from '../../services/date.service';

@Component({
  selector: 'app-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit {
  @Input() 'criteriaType';
  @Input() 'criteriaList';
  @Input() 'criteriaTypeList';

  filterTypes = ['Amount', 'Title', 'Date'];

  constructor(
    private titleService: TitleService,
    private amountService: AmountService,
    private dateService: DateService
  ) { }

  ngOnInit(): void {
  }

  deleteFieldValue(index, type): void {
    if (type === 'Amount') {
      this.amountService.deleteAmount(this.criteriaList.splice(index, 1)[0].id).subscribe(() => {});
    }
    if (type === 'Title') {
      this.titleService.deleteTitle(this.criteriaList.splice(index, 1)[0].id).subscribe(() => {});
    }
    if (type === 'Date') {
      this.dateService.deleteDate(this.criteriaList.splice(index, 1)[0].id).subscribe(() => {});
    }
  }

}
