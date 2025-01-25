import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (typeof localStorage === 'undefined') {
    router.navigate(['/login']);
    return false;
  }

  const token = localStorage.getItem("authToken");

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};