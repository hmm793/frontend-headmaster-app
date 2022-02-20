import { Component, OnInit } from '@angular/core';
import { Parent } from '../../../models/parent';
import { ParentService } from '../../../services/parent.service';

@Component({
  selector: 'headmaster-list-parent',
  templateUrl: './list-parent.component.html',
  styleUrls: ['./list-parent.component.css'],
})
export class ListParentComponent implements OnInit {
  constructor(private parentService: ParentService) {}
  parents: Parent[] = [];

  ngOnInit(): void {
    this.parentService.getAllParent().subscribe((result) => {
      this.parents = result;
    });
  }
}
