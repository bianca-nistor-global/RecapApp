import { Component, OnInit } from '@angular/core';
import { FAQs } from '../../../../public/FAQs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

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
