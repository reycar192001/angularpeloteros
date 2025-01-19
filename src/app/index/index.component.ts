import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index',
  imports: [],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {
  menuBtn: HTMLElement | null = null;
  navLinks: HTMLElement | null = null;
  menuBtnIcon: HTMLElement | null = null;
  chatbotBtn: HTMLElement | null = null;
  chatbotContainer: HTMLElement | null = null;

  ngOnInit(): void {
    this.initializeElements();
    this.addEventListeners();
    this.verificarToken();
  }

  initializeElements(): void {
    this.menuBtn = document.getElementById('menu-btn');
    this.navLinks = document.getElementById('nav-links');
    this.menuBtnIcon = this.menuBtn?.querySelector('i') || null;
    this.chatbotBtn = document.getElementById('chatbotBtn');
    this.chatbotContainer = document.getElementById('chatbotContainer');
  }

  addEventListeners(): void {
    this.menuBtn?.addEventListener('click', () => {
      if (this.navLinks && this.menuBtnIcon) {
        this.navLinks.classList.toggle('open');
        const isOpen = this.navLinks.classList.contains('open');
        this.menuBtnIcon.setAttribute('class', isOpen ? 'ri-close-line' : 'ri-menu-line');
      }
    });

    this.navLinks?.addEventListener('click', () => {
      if (this.navLinks && this.menuBtnIcon) {
        this.navLinks.classList.remove('open');
        this.menuBtnIcon.setAttribute('class', 'ri-menu-line');
      }
    });

    this.chatbotBtn?.addEventListener('click', () => {
      if (this.chatbotContainer) {
        this.chatbotContainer.style.display =
          this.chatbotContainer.style.display === 'none' || this.chatbotContainer.style.display === ''
            ? 'block'
            : 'none';
      }
    });
  }

  verificarToken(): void {
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('userData') || 'null');
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const usuariosOption = document.getElementById('usuarios-option');
    const welcomeMessage = document.getElementById('welcome-message');

    if (token && userData) {
      const primerNombre = this.obtenerPrimerNombre(userData.Nombre);
      if (loginBtn) loginBtn.style.display = 'none';
      if (logoutBtn) logoutBtn.style.display = 'block';
      if (usuariosOption) usuariosOption.style.display = 'block';
      if (welcomeMessage) welcomeMessage.textContent = `Bienvenido, ${primerNombre}`;
    } else {
      if (loginBtn) loginBtn.style.display = 'block';
      if (logoutBtn) logoutBtn.style.display = 'none';
      if (usuariosOption) usuariosOption.style.display = 'none';
      if (welcomeMessage) welcomeMessage.textContent = '';
    }

    loginBtn?.addEventListener('click', () => {
      window.location.href = 'Login.html';
    });

    logoutBtn?.addEventListener('click', () => {
      this.limpiarLocalStorage();
      window.location.reload();
    });
  }

  obtenerPrimerNombre(nombreCompleto: string): string {
    if (!nombreCompleto) return '';
    const primerEspacio = nombreCompleto.indexOf(' ');
    return primerEspacio === -1 ? nombreCompleto : nombreCompleto.substring(0, primerEspacio);
  }

  limpiarLocalStorage(): void {
    localStorage.clear();
    console.log('Local storage eliminado.');
  }

  validarToken(): void {
    const token = localStorage.getItem('token');
    if (token) {
      window.location.href = 'Horarios.html';
    } else {
      alert('Para continuar debe Iniciar sesión.');
      setTimeout(() => {
        window.location.href = 'Login.html';
      }, 2000);
    }
  }

  
}
