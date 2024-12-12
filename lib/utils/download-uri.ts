export function downloadURI(uri: string, name: string): void {
  const link = document.createElement("a");
  link.download = name;
  link.href = uri;
  try {
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.error("Error downloading URI:", error);
  } finally {
    document.body.removeChild(link);
  }
}