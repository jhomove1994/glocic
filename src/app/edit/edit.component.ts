import { ContactosService } from './../contactos.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  contactos: any = {
  }
  form: FormGroup;
  id: any;

  constructor(
    private fb: FormBuilder,
    private contactosService: ContactosService,
    private _Activatedroute:ActivatedRoute,
    private router: Router
    ) {
      this.form = this.fb.group({
        nombre: new FormControl('', [Validators.required]),
        Entidad: new FormControl('', [Validators.required]),
        Email: new FormControl('', [Validators.required, Validators.email]),
      });
      this.id =this._Activatedroute.snapshot.paramMap.get("id");
      this.contactos = localStorage.getItem('contactos');
      this.contactos = JSON.parse(this.contactos);
      if(!this.contactos)
      {
        this.contactosService.getContactos().subscribe((data) => {
          this.contactos = data;
          data = data.filter((value: any,key: any) => key == this.id);
          this.form.setValue(data[0]);        
        });
      } else {
        const data = this.contactos.filter((value: any,key: any) => key == this.id);
        this.form.setValue(data[0]);
      }
  }

  ngOnInit(): void {
  }

  save() {

    if(this.form.valid) {
      this.contactos = this.contactos.map((value:any, key:any) => {
        if(key == this.id) {
          console.log(this.form.value)
          return this.form.value;
        }
        return value;
      });
      localStorage.setItem('contactos', JSON.stringify(this.contactos));
      this.router.navigate(['/']);
    }
  }

}
