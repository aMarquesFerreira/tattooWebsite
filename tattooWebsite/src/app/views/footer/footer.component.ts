import { Component, AfterViewInit, HostListener, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements AfterViewInit {

  isResponsive: boolean = false;
  isPhoneNumberValid: boolean = false;
  errorMessage: string = '';

  @ViewChild('countryCode') countryCodeInput!: ElementRef<HTMLSelectElement>;
  @ViewChild('phoneNumber') phoneNumberInput!: ElementRef<HTMLInputElement>;
  @ViewChild('messageTextarea') messageTextarea!: ElementRef<HTMLTextAreaElement>;

  ngAfterViewInit() {
    this.checkResponsive(window.innerWidth);
    this.setupTextareaAutoResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkResponsive(event.target.innerWidth);
  }

  checkResponsive(width: number) {
    this.isResponsive = width < 1090; // Defina o limite para telas responsivas
  }

  navigateToTop() {
    window.scrollTo(0, 0);
  }

  validatePhoneNumber() {
    const countryCode = this.countryCodeInput.nativeElement.value;
    const phoneNumber = this.phoneNumberInput.nativeElement.value.trim();
    const fullPhoneNumber = `${countryCode}${phoneNumber}`;
    const minPhoneNumberLength = 10; // Defina o comprimento mínimo apropriado para um número de telefone, incluindo o código do país
  
    // Formato E.164 com pelo menos 10 dígitos no total
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  
    // Verifica se o número de telefone atende ao formato E.164 e ao comprimento mínimo
    this.isPhoneNumberValid = phoneRegex.test(fullPhoneNumber) && fullPhoneNumber.length >= minPhoneNumberLength;
  
    if (this.isPhoneNumberValid) {
      this.errorMessage = '';
      this.showValidationMessage('phoneValidationMessage');
    } else {
      this.errorMessage = 'Insert a Valid International Phone Number';
      this.clearErrorMessageAfterDelay();
    }
  }




  checkSendMessage() {
    const countryCode = this.countryCodeInput.nativeElement.value; // Prefixo selecionado
    const phoneNumber = this.phoneNumberInput.nativeElement.value.trim(); // Número inserido pelo usuário
    const fullPhoneNumber = `${countryCode}${phoneNumber}`; // Montar o número completo
    
    const ownerPhoneNumber = '351912388378'; // Número fixo do destinatário (dono do site)
  
    if (!this.isPhoneNumberValid) {
      console.log("false");
      this.errorMessage = 'First Submit a Valid Phone Number';
      this.clearErrorMessageAfterDelay();
    } else {
      const messageContent = this.messageTextarea.nativeElement.value.trim();
  
      if (messageContent.length === 0) {
        this.errorMessage = 'Please enter a message before sending.';
        this.clearErrorMessageAfterDelay();
        return;
      }
  
      // Inclui o número do remetente na mensagem
      const message = encodeURIComponent(`Message: ${messageContent}\nSender: ${fullPhoneNumber}`);
  
      // Montar a URL com o número fixo do destinatário
      const whatsappUrl = `https://wa.me/${ownerPhoneNumber}?text=${message}`;
      window.open(whatsappUrl, '_blank'); // Abre o WhatsApp em uma nova aba
  
      this.errorMessage = '';
      this.showValidationMessage('messageValidationMessage');
    }
  }
  
  
  

  clearErrorMessageAfterDelay() {
    setTimeout(() => {
      this.errorMessage = '';
    }, 4000);
  }

  showValidationMessage(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.style.display = 'block';
      setTimeout(() => {
        element.style.display = 'none';
      }, 4000);
    }
  }

  setupTextareaAutoResize() {
    this.messageTextarea.nativeElement.addEventListener('input', function (this: HTMLTextAreaElement) {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
    });
  }
}
