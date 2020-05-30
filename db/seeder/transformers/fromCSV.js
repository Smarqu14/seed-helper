
function csvLineToObj(csvLine) {
  const values = csvLine.split(',');
  // STUDENT
  return {
    id: parseInt(values[0]),
    name: values[1],
    city: values[2],
  };
}

module.exports = csvLineToObj;