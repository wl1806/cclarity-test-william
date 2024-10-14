export default interface IPaging {
  hasNext: boolean
  currentPage: number
  totalPages: number
  totalData: number
  limit: number
}
