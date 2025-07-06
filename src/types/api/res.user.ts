export interface UserSocietyInfo{
  society_name: string;
  society_address?: string;
  flat_no: string;
  block_no?: string;
}

export interface Role{
    role : 'RESIDENT' | 'GUARD' | 'ADMIN',
    societies : UserSocietyInfo[]
}