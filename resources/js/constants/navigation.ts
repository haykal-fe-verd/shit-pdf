interface GuestNavigationType {
  name: string;
  href: string;
}
export const guestNavigation: GuestNavigationType[] = [
  { name: 'Home', href: route('home') },
];

interface AuthNavigationType {
  name: string;
  href: string;
}
export const authNavigation: AuthNavigationType[] = [
  { name: 'Dashboard', href: route('dashboard') },
];
