import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  
  @Input() name;
  constructor(
    private modal: NgbActiveModal // thằng này là service trỏ tới modal đang mở.
  ) { }

  ngOnInit() {
  }
  
  close() {
    this.modal.close();
  }
}
