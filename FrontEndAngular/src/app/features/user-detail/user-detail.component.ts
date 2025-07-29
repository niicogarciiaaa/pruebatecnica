import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DataAccessService } from '../../services/dataAccessService';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user: User | null = null;
  loading = false;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private dataService: DataAccessService, private router: Router) {}
  goToEdit() {
    if (this.user) {
      this.router.navigate(['/user-edit', this.user.id]);
    }
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loading = true;
      this.dataService.getUser(id).subscribe({
        next: (res) => {
          this.user = res.data;
          this.loading = false;
        },
        error: () => {
          this.error = 'Error al cargar usuario';
          this.loading = false;
        }
      });
    }
  }
}
