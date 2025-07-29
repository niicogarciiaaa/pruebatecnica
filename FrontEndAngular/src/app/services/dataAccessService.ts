
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataAccessService {
  private apiUrl = 'https://reqres.in/api'; 

  private get headers() {
    return new HttpHeaders({
      'x-api-key': 'reqres-free-v1',
    });
  }

  constructor(private http: HttpClient) {}

  // Login
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials, { headers: this.headers });
  }

  // Register
  register(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data, { headers: this.headers });
  }

  // Logout
  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, { headers: this.headers });
  }

  // List users
  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`, { headers: this.headers });
  }

  // Get user by id
  getUser(id: number | string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${id}`, { headers: this.headers });
  }

  // Update user (PUT)
  updateUser(id: number | string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${id}`, data, { headers: this.headers });
  }

  // Update user (PATCH)
  patchUser(id: number | string, data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/users/${id}`, data, { headers: this.headers });
  }
  // Crear usuario completo
  createUser(data: { email: string; first_name: string; last_name: string; avatar: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, data, { headers: this.headers });
  }

  // Listar usuarios por página
  getUsersByPage(page: number, perPage: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/users?page=${page}&per_page=${perPage}`, { headers: this.headers });
  }
  // Delete user
  deleteUser(id: number | string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`, { headers: this.headers });
  }

  // Resource list (generic)
  getResource(resource: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${resource}`, { headers: this.headers });
  }

  // Resource by id (generic)
  getResourceById(resource: string, id: number | string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${resource}/${id}`, { headers: this.headers });
  }

  // Update resource (PUT)
  updateResource(resource: string, id: number | string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${resource}/${id}`, data, { headers: this.headers });
  }

  // Update resource (PATCH)
  patchResource(resource: string, id: number | string, data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${resource}/${id}`, data, { headers: this.headers });
  }

  // Delete resource
  deleteResource(resource: string, id: number | string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${resource}/${id}`, { headers: this.headers });
  }

  // Clerk endpoints
  linkPro(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/clerk/link-pro`, data, { headers: this.headers });
  }
  autoLinkPro(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/clerk/auto-link-pro`, data, { headers: this.headers });
  }
  getSubscriptionStatus(): Observable<any> {
    return this.http.get(`${this.apiUrl}/clerk/subscription-status`, { headers: this.headers });
  }
  getPaymentStatus(): Observable<any> {
    return this.http.get(`${this.apiUrl}/clerk/payment-status`, { headers: this.headers });
  }
  unlinkPro(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/clerk/unlink-pro`, data, { headers: this.headers });
  }

  // Custom endpoints
  getCustomEndpoints(): Observable<any> {
    return this.http.get(`${this.apiUrl}/custom-endpoints`, { headers: this.headers });
  }
  createCustomEndpoint(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/custom-endpoints`, data, { headers: this.headers });
  }
  getCustomEndpoint(id: number | string): Observable<any> {
    return this.http.get(`${this.apiUrl}/custom-endpoints/${id}`, { headers: this.headers });
  }
  updateCustomEndpoint(id: number | string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/custom-endpoints/${id}`, data, { headers: this.headers });
  }
  deleteCustomEndpoint(id: number | string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/custom-endpoints/${id}`, { headers: this.headers });
  }

  // Custom {path} endpoints
  customGet(path: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/custom/${path}`, { headers: this.headers });
  }
  customPost(path: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/custom/${path}`, data, { headers: this.headers });
  }
  customPut(path: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/custom/${path}`, data, { headers: this.headers });
  }
  customPatch(path: string, data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/custom/${path}`, data, { headers: this.headers });
  }
  customDelete(path: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/custom/${path}`, { headers: this.headers });
  }
}
