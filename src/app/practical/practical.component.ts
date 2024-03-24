import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColDef } from 'ag-grid-community';
import { ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ThisReceiver } from '@angular/compiler';

interface ClientData {
  clients: {
    Client: string;
    name: string;
    code: string;
    country: string;
    address: string;
    state: string;
    city: string;
    email: string;
    gstno: string;
    panno: string;
  }[];
}
const ClientData: ClientData = require('./Client.json');
@Component({
  selector: 'app-practical',
  templateUrl: './practical.component.html',
  styleUrls: ['./practical.component.css']
})
export class PracticalComponent implements OnInit {
  city: string = '';
  Client: any;
  ClientSubject!: BehaviorSubject<any[]>;
  array: any = [];
  Clientform!: FormGroup
  files: any;

  id = 2;
  // selectedClient: { id: string, client: string, /* add other properties as needed */ } | null = null;

  selectedClient: any
  constructor(private _fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.GetClientform()

  }
  ngOnInit(): void {
    this.getdata();
    this.ClientSubject = new BehaviorSubject<any[]>(this.Client);
  }

  colDefinitions: ColDef[] = [
    { headerName: 'Action', cellRenderer: this.actionCellRenderer.bind(this) },
    { headerName: 'Client', field: 'client' },
    { headerName: 'Name', field: 'cname' },
    { headerName: 'Code', field: 'code' },
    { headerName: 'Country', field: 'country' },
    { headerName: 'Address', field: 'address' },
    { headerName: 'State', field: 'state' },
    { headerName: 'City', field: 'city' },
    { headerName: 'Picode', field: 'pincode' },
    { headerName: 'Email', field: 'email' },
    { headerName: 'GST No', field: 'gst' },
    { headerName: 'PAN No', field: 'panno' }
  ];

  actionCellRenderer(params: any) {
    const cellElement = document.createElement('div');
    cellElement.className = 'action-buttons';

    const editButton = document.createElement('button');
    editButton.className = 'btn btn-primary btn-sm mr-1';
    editButton.innerHTML = '<span class="fa fa-edit text-white"></span>';
    editButton.addEventListener('click', () => this.Onedit(params.data));

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger btn-sm ms-2';
    deleteButton.innerHTML = '<span class="fa fa-trash text-white"></span>';
    deleteButton.addEventListener('click', () => this.onDelete(params.data));

    const viewButton = document.createElement('button');
    viewButton.className = 'btn btn-primary btn-sm ms-2';

    viewButton.innerHTML = '<span class="fa fa-eye text-white"></span>';
    viewButton.addEventListener('click', () => {
      this.Onview(params.data);
    });

    cellElement.appendChild(editButton);
    cellElement.appendChild(deleteButton);
    cellElement.appendChild(viewButton);

    return cellElement;
  }


  get f() {
    return this.Clientform.controls;
  }

  GetClientform() {
    this.Clientform = this._fb.group({
      gst: ['', [Validators.required, Validators.minLength(15), Validators.maxLength(15)]],
      panno: ['', Validators.required],
      code: ['', Validators.required],
      client: ['', Validators.required],
      pincode: ['', Validators.required],
      address: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      currency: ['', Validators.required],
      latitude: [''],
      // contact person
      cname: ['', Validators.required],
      cmobile: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(10)]],
      cemail: ['', [Validators.required, Validators.email]],
      department: [''],
      designation: [''],
      file: [''],
      id: [this.createid()]

    });

  }
  onDelete(data: any) {
    let idToDelete = data.id;
    alert(idToDelete)

    const indexToDelete = this.Client.findIndex((item: { id: any; }) => item.id === idToDelete);
    if (indexToDelete !== -1) {
      this.Client.splice(indexToDelete, 1);
      this.ClientSubject.next([...this.Client]);
      this.cdr.detectChanges();

      console.log(" deleted.");
    } else {
      console.log(idToDelete);
      console.error("not deleted.");
    }
  }



  Onview(data: any) {
    let collectid = data.id;
    this.selectedClient = JSON.parse(JSON.stringify(data));
    console.log(this.selectedClient);
    this.cdr.detectChanges()
    const modalElement = document.getElementById('exampleModal');
    if (modalElement) {
      modalElement.classList.add('show'); // Ensure the modal is shown
      modalElement.style.display = 'block'; // Ensure the modal is visible
    }
  }


  close() {
    this.selectedClient = '';
    const modalElement = document.getElementById('exampleModal');
    if (modalElement) {
      modalElement.style.display = 'none'; // Hide the modal
    }
  }


  setControls(response: any) {
    this.Clientform.patchValue({
      gst: response.gst,
      panno: response.panno,
      code: response.code,
      client: response.client,
      pincode: response.pincode,
      address: response.address,
      country: response.country,
      state: response.state,
      city: response.city,
      mobile: response.mobile,
      email: response.email,
      currency: response.currency,
      latitude: response.latitude,
      // contact person
      cname: response.cname,
      cmobile: response.cmobile,
      cemail: response.cemail,
      department: response.department,
      designation: response.designation,
      file: response.file,
      id: response.id
    });
  }



  defaultColDefs: ColDef = {

  };
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    editable: true,
  };



  onFileAttach(event: any) {
    console.log(event.target.files);
    console.log(event.target.files[0]);
    this.files = event.target.files[0];
  }

  getdata() {
    this.Client = ClientData.clients;
    console.log(this.Client);
  }


  createid(): number {
    return ++this.id;
  }


  Onedit(data: any) {
    console.log("Data:", data);
    this.setControls(data);
    alert(data.id);
  }


  OnSubmit() {
    if (this.Clientform.valid) {
      const id = this.Clientform.get('id')?.value;
      if (this.isIdAvailable(id)) {
        this.UpdateById(id);
      } else {

        const newId = this.createid();
        this.Clientform.patchValue({ id: newId });
        this.array.push(this.Clientform.value);
        console.log(this.array);
        // this.cdr.detectChanges();
        this.Clientform.reset();
      }
    }
    else {
      this.Clientform.markAllAsTouched()
      alert('Something issue fill mandatory field')
    }

  }

  isIdAvailable(id: any): boolean {
    return this.array.some((item: { id: any; }) => item.id === id);
  }


  UpdateById(id: any) {
    const index = this.array.findIndex((item: { id: any; }) => item.id === id);
    if (index !== -1) {
      this.array[index] = this.Clientform.value;
      console.log(this.array);
      this.cdr.detectChanges();
      this.Clientform.reset();
    } else {

      console.error('ID error');
    }
  }

  get combinedData() {
    console.log(this.Client);
    console.log(this.array);
    return [...this.Client, ...this.array];
  }

  CancelForm() {
    this.Clientform.reset()
  }


  onCityChange(newValue: string) {
    if (!newValue.trim()) {
      this.getdata();
    } else {
      this.applyCityFilter();
    }
  }


  applyCityFilter() {
    const filteredData = this.Client.filter((item: { city: string; }) => {
      return item.city.toLowerCase().includes(this.city.toLowerCase());
    });

    this.Client = filteredData;
  }

}

// OnSubmit() {

//   const formData = new FormData();
//   console.log('Form Values:', this.Clientform.value);
//   formData.append('gst', this.Clientform.value.gst);
//   formData.append('panno', this.Clientform.value.panno);
//   formData.append('code', this.Clientform.value.code);
//   formData.append('name', this.Clientform.value.name);
//   formData.append('pincode', this.Clientform.value.pincode);
//   formData.append('address', this.Clientform.value.address);
//   formData.append('country', this.Clientform.value.country);
//   formData.append('state', this.Clientform.value.state);
//   formData.append('city', this.Clientform.value.city);
//   formData.append('mobile', this.Clientform.value.mobile);
//   formData.append('email', this.Clientform.value.email);
//   formData.append('currency', this.Clientform.value.currency);
//   formData.append('latitude', this.Clientform.value.latitude);
//   formData.append('cname', this.Clientform.value.cname);
//   formData.append('cmobile', this.Clientform.value.cmobile);
//   formData.append('department', this.Clientform.value.department);
//   formData.append('designation', this.Clientform.value.designation);
//   formData.append('id', this.Clientform.value.id);
//   formData.append('file', this.files);
//   console.log('FormData:', formData);
//   debugger
//   this.array.push(formData);
//   this.cdr.detectChanges();

// }