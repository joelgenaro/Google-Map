export function convertToTableFormat(parsedData: { [key: string]: any[] }) {
  const plants = [];
  const plots = [];

  // 'Plant' and 'Plot' are the sheet names or identifiable keys
  const plantData = parsedData['Plant'];
  const plotData = parsedData['Plot'];

  if (plantData) {
    // omit first row (header)
    for (let i = 1; i < plantData.length; i++) {
      const row = plantData[i];
      if (row.length > 0) {
        plants.push({
          plotID: row[0],
          plantID: row[1],
          species: row[2] || "",
          height: row[3],
          canopyDiameter: row[4],
          plantNotes: row[5] || "",
        });
      }
    }
  }

  if (plotData) {
    for (let i = 1; i < plotData.length; i++) {
      const row = plotData[i];
      if (row.length > 0) {
        plots.push({
          plotID: row[0],
          longitude: row[1],
          latitude: row[2],
          canopyCover: parseInt(row[3]),
          leafLitter: row[4],
          bairSoil: parseInt(row[5]),
          rock: parseInt(row[6]),
          vegetation: parseInt(row[7]),
          herbivory: (row[8] as string).toLowerCase() === "yes",
          disease: (row[9] as string).toLowerCase() === "yes",
          plotNotes: row[10] || "",
        });
      }
    }
  }

  // Return or process the mapped data
  return { plants, plots };
}
