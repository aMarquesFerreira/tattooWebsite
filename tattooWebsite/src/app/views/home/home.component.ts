import { Component, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommentService } from '../../services/comment.service'; // Importe o serviço

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('testimonialsWrapper', { static: false }) testimonialsWrapper!: ElementRef;
  currentTestimonial: number = 0;
  isResponsive: boolean = false;
  successMessage: string = ''; // Nova propriedade para a mensagem de sucesso
  showAllComments: boolean = false; // Nova variável de controle

  // Novo comentário
  newComment: any = {
    name: '',
    rating: null,
    description: '',
    photo: null
  };

  comments: any[] = [];
  stars: number[] = [1, 2, 3, 4, 5];

  constructor(private commentService: CommentService) {} // Injete o serviço

  ngOnInit() {
    this.fetchAcceptedComments();
  }

  ngAfterViewInit() {
    this.checkResponsive(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkResponsive(event.target.innerWidth);
  }

  checkResponsive(width: number) {
    this.isResponsive = width < 1090; // Defina o limite para telas responsivas
    if (this.isResponsive && this.testimonialsWrapper) {
      this.showTestimonial(this.currentTestimonial);
    }
  }


  fetchAcceptedComments() {
    this.commentService.getAcceptedComments().subscribe(
      comments => {
        this.comments = comments;
      },
      error => {
        console.error('Error fetching accepted comments', error);
      }
    );
  }

  showTestimonial(index: number) {
    if (this.testimonialsWrapper) {
      const testimonials = this.testimonialsWrapper.nativeElement.querySelectorAll('.testimonials-container');
      testimonials.forEach((testimonial: HTMLElement, i: number) => {
        testimonial.style.transform = `translateX(${(i - index) * 100}%)`;
      });
    }
  }

  prevTestimonial() {
    if (this.testimonialsWrapper) {
      const testimonials = this.testimonialsWrapper.nativeElement.querySelectorAll('.testimonials-container');
      this.currentTestimonial = (this.currentTestimonial - 1 + testimonials.length) % testimonials.length;
      this.showTestimonial(this.currentTestimonial);
    }
  }

  nextTestimonial() {
    if (this.testimonialsWrapper) {
      const testimonials = this.testimonialsWrapper.nativeElement.querySelectorAll('.testimonials-container');
      this.currentTestimonial = (this.currentTestimonial + 1) % testimonials.length;
      this.showTestimonial(this.currentTestimonial);
    }
  }

  navigateToTop() {
    window.scrollTo(0,0);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newComment.photo = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  submitComment() {
    this.commentService.submitComment(this.newComment).subscribe(
      response => {
        console.log('Comment submitted successfully', response);
        this.successMessage = 'Comment submitted successfully!'; // Definir a mensagem de sucesso
        // Limpar o formulário após o envio, se desejado
        this.newComment = {
          name: '',
          rating: null,
          description: '',
          photo: null
        };
        setTimeout(() => {
          this.successMessage = ''; // Limpar a mensagem após alguns segundos
        }, 3000); // Mensagem de sucesso desaparece após 3 segundos
      },
      error => {
        console.error('Error submitting comment', error);
      }
    );
  }

  toggleComments() {
    this.showAllComments = !this.showAllComments; // Alterna a exibição dos comentários extras
  }
}
