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
    this.form = this.fb.group({
      question: new FormControl('', [Validators.required]),
      answer: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  inputConfig: Record<string, CustomInputConfig> = {
    question: {
      FormControlName: 'question',
      label: 'Your Question',
      placeholder: 'Ask something...',
      required: true,
      minLength: 5,
      input: (e: Event) => {
        const val = (e.target as HTMLInputElement).value;
        console.log('Typing question:', val);
      },
    },
    answer: {
      FormControlName: 'answer',
      label: 'Your Answer',
      placeholder: 'Type an answer...',
      required: true,
      maxLength: 150,
    },
  };

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
    },
    {
      FormControlName: 'answer',
      label: 'Your Answer',
      placeholder: 'Type the answer...',
      required: true,
      minLength: 6,
      maxLength: 200,
      type: 'text',
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
