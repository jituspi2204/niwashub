export type FlatDetailsType = {
  flatId: string;
  flatNo: string;
  blockNo?: string | null | undefined;
  societyId: string;
  societyName?: string | null | undefined;
  residentId?: string;
  residentName?: string;
};
export type FlatDetailsResponseType = {
  flat_id: string;
  flat_no: string;
  block_no?: string | null | undefined;
  society_id: string;
  society_name?: string | null | undefined;
  resident_id?: string;
  resident_name?: string;
};
