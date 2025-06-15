
/**
 * Detect basic file type from extension
 */
export function getType(url: string): string {
  const ext = url.split(".").pop()?.toLowerCase();
  if (!ext) return "file";
  if (["jpeg","jpg","png","gif","webp"].includes(ext)) return "image";
  if (["mp4","webm","mov"].includes(ext)) return "video";
  if (["pdf"].includes(ext)) return "pdf";
  if (["doc","docx"].includes(ext)) return "doc";
  if (["ppt","pptx"].includes(ext)) return "ppt";
  if (["xls","xlsx"].includes(ext)) return "sheet";
  return "file";
}
