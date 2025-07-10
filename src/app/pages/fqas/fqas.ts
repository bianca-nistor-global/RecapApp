import { Component, OnInit } from '@angular/core';
import { FAQs } from '../../../../public/FAQs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CustomInputConfig } from '../../interface/custom-input-config';

@Component({
  selector: 'app-fqas',
  standalone: false,
  templateUrl: './fqas.html',
  styleUrl: './fqas.scss',
})
export class FQAs implements OnInit {
  editing: boolean = false;

  form!: FormGroup;
  faqs: { question: string; answer: string }[] = [];
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
    this.configList.forEach((cfg) => {
      const validators = [];

      if (cfg.required) validators.push(Validators.required);
      if (cfg.minLength) validators.push(Validators.minLength(cfg.minLength));
      if (cfg.maxLength) validators.push(Validators.maxLength(cfg.maxLength));
      if (cfg.pattern) validators.push(Validators.pattern(cfg.pattern));

      this.form.addControl(
        cfg.FormControlName,
        new FormControl(cfg.value || '', validators)
      );
    });
  }

  configList: CustomInputConfig[] = [
    {
      FormControlName: 'question',
      label: 'Your Question',
      placeholder: 'Type your question...',
      required: true,
      minLength: 5,
      type: 'text',
      input: (e: Event) => {
        const val = (e.target as HTMLInputElement).value;
        console.log('Typing question:', val);
      },
      inputRestrictions: {
        onlyNumbers: false,
      },
    },
    {
      FormControlName: 'answer',
      label: 'Your Answer',
      placeholder: 'Type the answer...',
      required: true,
      minLength: 6,
      maxLength: 200,
      type: 'text',
      onlyNumbers: true,
      inputRestrictions:{
        onlyNumbers: true,
      }
    },
  
  ];
  ngOnInit(): void {
    this.faqs = FAQs;
  }

  onSubmit() {
    if (this.form.valid) {
      const newFaq = this.form.value;
      this.faqs.unshift(newFaq);
      console.log('FAQ added:', newFaq);
      this.form.reset();
    } else {
      console.log('Form invalid:', this.form.value);
      this.form.markAllAsTouched();
    }
  }
}
