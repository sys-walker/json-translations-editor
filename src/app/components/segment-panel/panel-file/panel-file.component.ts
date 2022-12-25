import { Component, OnInit } from '@angular/core';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { FormatedJSON } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'panel-file',
  templateUrl: './panel-file.component.html',
  styleUrls: ['./panel-file.component.scss'],
})
export class PanelFileComponent implements OnInit {

  constructor() { }

  ngOnInit() {


  }

  async uploadLocalFile(){
    const result = await FilePicker.pickFiles({
      types: ['application/json'],
      multiple: true,
    });


    const fileArr = result.files;

    
    const map1 = fileArr.map(x => {
      console.log(x.name);
      
      return x.blob
    });
    map1.map((e:Blob| undefined)=>{
      if(!e){return;}
      const reader = new FileReader();
      reader.readAsText(e);
      reader.onload = () => {console.debug(FormatedJSON.text2json(reader.result));}

    })   
  }



  

}
