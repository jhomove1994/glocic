import { ContactosService } from './../contactos.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  ngOnInit(): void {
  }

  title = 'crud';
  keyword = 'nombre';
  contactos: any = {
  }
  form: FormGroup;
  formFilter: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contactosService: ContactosService
    ) {
      console.log(localStorage.getItem('contactos'));
      this.contactos = localStorage.getItem('contactos');
      this.contactos = JSON.parse(this.contactos);
      if(!this.contactos) {
        this.contactosService.getContactos().subscribe(data => {
          this.contactos = data
          localStorage.setItem('contactos', JSON.stringify(this.contactos));
        });
      }
    this.form = this.fb.group({
      nombre: new FormControl('', [Validators.required]),
      Entidad: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required, Validators.email]),
    });

    this.formFilter = this.fb.group({
      valor: new FormControl('')
    });
  }

  save() {
    if(this.form.valid) {
      this.contactos.push(this.form.value);
      localStorage.setItem('contactos', JSON.stringify(this.contactos));
    }
  }

  eliminar(key: number) {
    this.contactos.splice(key, 1);
    localStorage.setItem('contactos', JSON.stringify(this.contactos));
  }

  onChangeEvent(e: any) {
    var term = e.target.value;

    if(term.length){
      const contactos = this.contactos.filter(function(data: any, key: any) {
        if (data.nombre.toLowerCase().includes(term.toLowerCase()) || data.Entidad.toLowerCase().includes(term.toLowerCase()) || data.Email.toLowerCase().includes(term.toLowerCase())) {
          return data;
        }
      });
      this.contactos = contactos;
    }
    else {
      this.contactos = localStorage.getItem('contactos');
      this.contactos = JSON.parse(this.contactos);
    }
  }

}
