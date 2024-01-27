import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import dataQuiz from '../../../assets/data/quizz_questions.json';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css',
})
export class QuizComponent implements OnInit {
  title: string = 'Título';

  questions: any = '';
  questionSelected: any = '';
  answers: string[] = [];
  answerSelected: string = '';
  questionIndex: number = 0;
  questionMaxIndex: number = 0;
  finished: boolean = false;

  ngOnInit(): void {
    if (dataQuiz) {
      this.finished = false;
      this.title = dataQuiz.title;
      this.questions = dataQuiz.questions;
      this.questionSelected = this.questions[this.questionIndex];
      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;

      console.log(this.questionIndex);
      console.log(this.questionMaxIndex);
    }
  }

  playerChoose(value: string) {
    this.answers.push(value);
    this.nextStep();
    console.log(this.answers);
  }

  async nextStep() {
    this.questionIndex += 1;

    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      const finalAnswer: string = await this.checkResult(this.answers);
      this.finished = true;
      this.answerSelected =
        dataQuiz.results[finalAnswer as keyof typeof dataQuiz.results];
    }
  }

  async checkResult(answers: string[]) {
    const result = answers.reduce((previous, current, i, arr) => {
      if (
        arr.filter((item) => item === previous).length >
        arr.filter((item) => item === current).length
      ) {
        return previous;
      } else {
        return current;
      }
    });

    return result;
  }
}
