
function csvLineToObj(csvLine) {
  const values = csvLine.split(',');
  // STUDENT
  return {
    id: values[0],
    name: values[1],
    city: values[2],
  };
}