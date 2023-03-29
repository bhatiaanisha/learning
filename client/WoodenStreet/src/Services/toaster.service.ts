import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toastrservice:ToastrService) { }

  public showSuccess(): void {
    this.toastrservice.success('Successful!');
  }

  public showInfo(): void {
    this.toastrservice.info('Message Info!', 'Title Info!');
  }

  public showWarning(): void {
    this.toastrservice.warning('Message Warning!', 'Title Warning!');
  }

  public showError(): void {
    this.toastrservice.error('Error Occured!');
  }
}
