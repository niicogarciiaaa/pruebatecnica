
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataAccessService } from '../../services/dataAccessService';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  showAvatar = false;
  userForm: FormGroup;
  loading = false;
  error: string | null = null;
  successMessage: string | null = null;
  editMode = false;
  userId: string | null = null;
  // Solo PUT para edición

  constructor(
    private fb: FormBuilder,
    private dataService: DataAccessService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      avatar: ['', Validators.required]
    });
  }


  toggleAvatarVisibility() {
    this.showAvatar = !this.showAvatar;
  }

  // Métodos de validación centralizados
  isInvalid(controlName: string): boolean {
    const control = this.userForm.get(controlName);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  getErrorMessage(controlName: string): string {
    const control = this.userForm.get(controlName);
    if (!control || !control.errors) return '';
    if (control.errors['required']) {
      switch (controlName) {
        case 'email': return 'Email requerido';
        case 'first_name': return 'Nombre requerido';
        case 'last_name': return 'Apellido requerido';
        case 'avatar': return 'Avatar requerido';
      }
    }
    if (control.errors['email']) {
      return 'Email inválido';
    }
    return 'Campo inválido';
  }

  ngOnInit() {
    this.editMode = this.route.snapshot.data['edit'] || false;
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.editMode && this.userId) {
      this.loading = true;
      this.dataService.getUser(this.userId).subscribe({
        next: (res) => {
          const user = res.data;
          this.userForm.patchValue({
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            avatar: user.avatar
          });
          this.loading = false;
        },
        error: () => {
          this.error = 'Error al cargar usuario';
          this.loading = false;
        }
      });
    }
  }

  submit() {
    if (this.userForm.invalid) {
      // Marca todos los campos como tocados para mostrar errores
      this.userForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.error = null;
    this.successMessage = null;
    if (this.editMode && this.userId) {
      this.dataService.updateUser(this.userId, this.userForm.value).subscribe({
        next: () => {
          this.loading = false;
          this.successMessage = 'Usuario actualizado correctamente';
          setTimeout(() => {
            this.successMessage = null;
            this.router.navigate(['/user', this.userId]);
          }, 1200);
        },
        error: (err) => {
          this.loading = false;
          this.error = err?.error?.error || 'Error al actualizar usuario';
        }
      });
    } else {
      this.dataService.createUser(this.userForm.value).subscribe({
        next: () => {
          this.loading = false;
          this.successMessage = 'Usuario creado correctamente';
          setTimeout(() => {
            this.successMessage = null;
            this.router.navigate(['/user-list']);
          }, 1200);
        },
        error: (err) => {
          this.loading = false;
          this.error = err?.error?.error || 'Error al crear usuario';
        }
      });
    }
  }
  
}
