import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EstoreInputComponent } from '../forms/estore-input/estore-input.component';

@Component({
  selector: 'app-copy-link-form',
  templateUrl: './copy-link-form.component.html',
  styleUrls: ['./copy-link-form.component.scss']
})
export class CopyLinkFormComponent implements OnInit {

  @Input() title: string;
  @Input() link: string;

  constructor(
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  @ViewChild('linkInput') inputElement: EstoreInputComponent;

  onCopyLink() {
    const listener = (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', this.inputElement.value);
      e.preventDefault();
    };

    document.addEventListener('copy', listener);
    document.execCommand('copy');
    document.removeEventListener('copy', listener);

    this.toastr.success('Link copied', null, {
      timeOut: 5000,
      closeButton: true,
    });
  }

}
