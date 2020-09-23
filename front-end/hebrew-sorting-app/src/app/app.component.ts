import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  text: string;
  sorted_text: string;
  source_code_link: string = 'https://github.com/SaraPrager/HebrewSorting';
  constructor(private _snackBar: MatSnackBar, private _httpClient: HttpClient) {
  }

  onSort() {
    if (!this.text) {
      this.showErrMsg('Please enter a text');
      return;
    }
    
    this.sorted_text = this.text;
  }

  showErrMsg(msg) {
    this._snackBar.open(msg, 'Error', {
      duration: 2000,
    });
  }
}
