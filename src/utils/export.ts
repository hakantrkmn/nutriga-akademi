import * as XLSX from "xlsx";

/**
 * Verileri Excel dosyası olarak indirir.
 * @param data Excel'e yazılacak veri dizisi (Object array)
 * @param fileName Dosya adı (uzantısız)
 * @param sheetName Sayfa adı
 */
export const exportToExcel = (
  data: Record<string, unknown>[],
  fileName: string,
  sheetName: string = "Sheet1"
) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  // Excel dosyasını indir
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};
