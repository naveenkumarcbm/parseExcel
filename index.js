function fileUpload(frm) {
  let file = document.getElementById('myfile').files[0]; // file from input
  if (!file) return alert('Please upload a file');

  let reader = new FileReader();
  parseExcel(file);

}
function parseExcel(file) {
  var reader = new FileReader();

  reader.onload = function (e) {
    var data = e.target.result;
    var workbook = XLSX.read(data, {
      type: 'binary',
    });

    console.log('================  Excel sheets     ====================')
    console.table(workbook.SheetNames);
    workbook.SheetNames.forEach(function (sheetName) {
      // Here is your object
      var XL_row_object = XLSX.utils.sheet_to_row_object_array(
        workbook.Sheets[sheetName],
      );
      console.log(`================ ${sheetName}  =====================`)
      console.table(XL_row_object)

    //   var json_object = JSON.stringify(XL_row_object);
    //   console.log(json_object);
    });
  };

  reader.onerror = function (ex) {
    console.log(ex);
  };

  reader.readAsBinaryString(file);
}
