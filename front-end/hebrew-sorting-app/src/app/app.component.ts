import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  // TODO: move to config
  API_URL: string = 'https://o923koduk6.execute-api.us-east-1.amazonaws.com/Prod';

  onSort() {
    if (!this.text) {
      this.showErrMsg('Please enter a text');
      return;
    }
    
    this._httpClient.post(this.API_URL, { 'input': this.text },
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
      .subscribe(
        (response: any) => {
          this.sorted_text = response.output;
        }, (error) => {
          // TODO: localization to error messages
          this.showErrMsg('Invalid text. Please try again');
      });
  }

  showErrMsg(msg) {
    this._snackBar.open(msg, 'Error', {
      duration: 2000,
    });
  }
}
