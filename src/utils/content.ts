import { images } from "./images";

export const userRoles = [
  {
    id: 1,
    title: 'Resident',
    imageSrc : images.resident,
    role: 'RESIDENT',
    subTitle:
      'Access your flat details, manage visitors, make payments, raise complaints and more',
  },
  {
    id: 1,
    title: 'Admin',
    role: 'ADMIN',
    imageSrc : images.admin,
    subTitle: 'Oversee society operations, handle complaints, and manage users',
  },
  {
    id: 1,
    title: 'Guard',
    role: 'GUARD',
    imageSrc : images.guard,
    subTitle: 'Manage visitors, verify entries, and secure the premises',
  },
];
