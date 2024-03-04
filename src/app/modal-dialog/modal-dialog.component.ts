import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppComponent } from '../app.component';
import {
  LinkAnnotationService, BookmarkViewService, MagnificationService,
  ThumbnailViewService, ToolbarService, NavigationService,
  AnnotationService, TextSearchService, TextSelectionService,
  PrintService, FormDesignerService, FormFieldsService,
  PdfViewerModule, TextSearch,
  PdfViewer, TextSelection, 
  PdfViewerComponent, TextFieldSettings, SignatureFieldSettings, InitialFieldSettings,
  CheckBoxFieldSettings, RadioButtonFieldSettings,
  ValidateFormFieldsArgs,
  Print,
  Navigation,
  FormFields,
  FormDesigner
} from '@syncfusion/ej2-angular-pdfviewer';
import { data } from "./fakedata";

export type DataKeys = {
  [Key in keyof typeof data]: string;
}

@Component({
  selector: 'app-modal-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    AppComponent,
    PdfViewerModule],
  providers: [LinkAnnotationService, BookmarkViewService, MagnificationService, ThumbnailViewService, ToolbarService,
    NavigationService, TextSearchService, TextSelectionService, PrintService, AnnotationService, FormDesignerService, FormFieldsService],
  templateUrl: './modal-dialog.component.html',
  styleUrl: './modal-dialog.component.css'
})
export class ModalDialogComponent implements OnInit {

  @ViewChild('pdfviewer')
  public pdfviewerControl?: PdfViewerComponent;
  public document: string = 'http://localhost:4200/assets/jfs.pdf';
  public resource: string = "https://cdn.syncfusion.com/ej2/23.1.43/dist/ej2-pdfviewer-lib";


  data = data;

  pdfData: any = {};

  public toolbarSettings = { showTooltip: true, toolbarItems: ['PageNavigationTool', "OpenOption", "MagnificationTool", "PanTool", "SelectionTool", "SearchOption", "PrintOption", "UndoRedoTool", "AnnotationEditTool", "CommentTool"] };
  constructor(
    public dialogRef: MatDialogRef<ModalDialogComponent>,
  ) {

  }
  isFormCorrect: boolean = false;
  reset() {
    this.pdfviewerControl?.resetFormFields()

  }
  validateFormFields(): void {
    this.saveFieldsAndLock()
    const allFields = this.pdfviewerControl?.retrieveFormFields();
    if (allFields) {
      for (const field of allFields) {
        if (field.isRequired) {
          if ((field.type === "CheckBox" && !field.isChecked) ||
            (field.type === 'DropDown' && !field.isSelected) ||
            (field.type === "RadioButton" && !field.isSelected) ||
            ((field.type === 'Textbox' || field.type === "Password") && field.value === "")) {
            alert("Please fill out details properly")
            this.isFormCorrect = false;
            return;
          }

        }
      }

      alert("Submitted")
    }

  } 
    documentLoaded(e: any): void {
      this.pdfviewerControl?.formDesignerModule.addFormField("Textbox", {name: 'First Name', bounds: { X: 44, Y: 180, Width: 250, Height: 20 },} as TextFieldSettings);
      this.pdfviewerControl?.formDesignerModule.addFormField("Textbox", {name: 'First Name', bounds: { X: 487, Y: 180, Width: 250, Height: 20 },} as TextFieldSettings);
      this.pdfviewerControl?.formDesignerModule.addFormField("Textbox", {name: 'First Name', bounds: { X: 44, Y: 212, Width: 250, Height: 20 },} as TextFieldSettings);
      this.pdfviewerControl?.formDesignerModule.addFormField("Textbox", {name: 'First Name', bounds: { X: 487, Y: 212, Width: 250, Height: 20 },} as TextFieldSettings);
      this.pdfviewerControl?.formDesignerModule.addFormField("Textbox", {name: 'First Name', bounds: { X: 44, Y: 247, Width: 250, Height: 20 },} as TextFieldSettings);
      this.pdfviewerControl?.formDesignerModule.addFormField("Textbox", {name: 'First Name', bounds: { X: 487, Y: 247, Width: 250, Height: 20 },} as TextFieldSettings);
      this.pdfviewerControl?.formDesignerModule.addFormField("Textbox", {name: 'First Name', bounds: { X: 44, Y: 281, Width: 250, Height: 20 },} as TextFieldSettings);
      this.pdfviewerControl?.formDesignerModule.addFormField("Textbox", {name: 'First Name', bounds: { X: 487, Y: 281, Width: 250, Height: 20 },} as TextFieldSettings);
      this.pdfviewerControl?.formDesignerModule.addFormField("Textbox", {name: 'First Name', bounds: { X: 44, Y: 315, Width: 250, Height: 20 },} as TextFieldSettings);
      this.pdfviewerControl?.formDesignerModule.addFormField("Textbox", {name: 'First Name', bounds: { X: 44, Y: 350, Width: 250, Height: 20 },} as TextFieldSettings);
      
      this.pdfviewerControl?.formDesignerModule.addFormField('CheckBox', {name: 'Information Billing',bounds: { X: 290, Y: 740, Width: 20, Height: 20 },isChecked: false,} as CheckBoxFieldSettings);
      
      this.pdfviewerControl?.formDesignerModule.addFormField('SignatureField', {name: 'Sign',bounds: { X: 44, Y: 893, Width: 200, Height: 43 },} as SignatureFieldSettings);
      
    }
  


  saveFieldsAndLock() {
    let allFields = this.pdfviewerControl?.retrieveFormFields();
    if (allFields) {
      allFields.forEach((field: any, i: number) => {
        if (field.name && this.pdfviewerControl) {
          const value = field.value;
          const fieldName = field.name as keyof typeof this.data;
          this.data[fieldName] = value;
          if (value !== undefined && value !== '') {
            this.pdfviewerControl.formDesignerModule.updateFormField(
              this.pdfviewerControl.formFieldCollections[i],
              { value: value, isReadOnly: true, isRequired: false } as TextFieldSettings
            );
          } else {
            this.pdfviewerControl.formDesignerModule.updateFormField(
              this.pdfviewerControl.formFieldCollections[i],
              { isRequired: true } as TextFieldSettings
            );
          }
        }
      })
      console.log(allFields)
    }
  }

  loaded() {
    const pdfViewer = this.pdfviewerControl;

    const allFields = pdfViewer?.retrieveFormFields();
    if (allFields && pdfViewer) {
      allFields.forEach((field: any, i: number) => {
        const fieldName = field.name as keyof typeof this.data;;
        if (fieldName in this.data) {
          const value = this.data[fieldName];
          if (value) {
            pdfViewer.formDesignerModule.updateFormField(
              pdfViewer.formFieldCollections[i],
              { value, isReadOnly: true } as TextFieldSettings
            );
          }
        }
      });
      this.pdfData = allFields;
      this.saveFieldsAndLock()
    }
  }



  ngOnInit() {

    document.querySelectorAll('div').forEach((div) => {
      if (div.innerText == "This application was built using a trial version of Syncfusion Essential Studio. To remove the license validation message permanently, a valid license key must be included. Claim your free account") {
        div.style.display = "none";
      }
    })
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}

