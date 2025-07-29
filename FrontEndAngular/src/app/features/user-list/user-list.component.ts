
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataAccessService } from '../../services/dataAccessService';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  allUsers: User[] = [];
  users: User[] = [];
  loading = false;
  error: string | null = null;
  page = 1;
  perPage = 2;
  sortField: keyof User = 'id';
  sortAsc = true;
  get totalPages() {
    return Math.ceil(this.allUsers.length / this.perPage) || 1;
  }

  constructor(private dataService: DataAccessService, private router: Router) {}

  goToCreate() {
    this.router.navigate(['/user-create']);
  }
  goToDetail(user: User) {
    this.router.navigate(['/user', user.id]);
  }

  ngOnInit() {
    this.fetchAllUsers();
  }

  fetchAllUsers() {
    this.loading = true;
    this.error = null;
    this.dataService.getUsers().subscribe({
      next: (res) => {
        this.allUsers = res.data || [];
        this.applyPagination();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar usuarios';
        this.loading = false;
      }
    });
  }


  applyPagination() {
    const start = (this.page - 1) * this.perPage;
    const end = this.page * this.perPage;
    let sorted = [...this.allUsers];
    sorted.sort((a, b) => {
      const campo = this.sortField;
      if (a[campo] < b[campo]) return this.sortAsc ? -1 : 1;
      if (a[campo] > b[campo]) return this.sortAsc ? 1 : -1;
      return 0;
    });
    this.users = sorted.slice(start, end);
  }

  paginaAnterior() {
    if (this.page > 1) {
      this.page--;
      this.applyPagination();
    }
  }

  paginaSiguiente() {
    if (this.page * this.perPage < this.allUsers.length) {
      this.page++;
      this.applyPagination();
    }
  }

  ordenarPor(campo: keyof User) {
    if (this.sortField === campo) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortField = campo;
      this.sortAsc = true;
    }
    this.applyPagination();
  }
}
