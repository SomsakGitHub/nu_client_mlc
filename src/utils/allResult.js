const iconv = require('iconv-lite');

export async function exportCsv(){

  var results = [];
  var csvRow = [];
  var bgForm = [];
    
    await fetch('http://localhost:3001/api/settingProgramForm/getSettingBgForm')
      .then(res => res.json())
      .then(data => {
        bgForm = data
    });

    await fetch('http://localhost:3001/api/BgDataEntry/getResultForm')
      .then(res => res.json())
      .then(data => {
        results = data
    });

  var data = [[bgForm[0].topic_name],['ลำดับ','รหัสสมาชิก','หน่วยงาน','หมายเลขเครื่อง','Serial number','Lot.strip','วันที่ได้รับ','วันที่ตรวจวิเคราะห์','เครื่อง']];
    console.log(results)
    for (let index = 0; index < results.length; index++){
        
          for (let meter_number_index = 0; meter_number_index < results[index].meter_number.length; meter_number_index++){
            data.push([
              index+1,
              results[index].blood_glucose_member_id,
              results[index].department_name,
              results[index].meter_number[meter_number_index],
              results[index].serial_number[0],
              results[index].lot_strip[0],
              results[index].receive_date[0],
              results[index].analyze_date[0],
              results[index].meter_brand
            ])
          }
          
        
    }

    for (var index = 0; index < data.length; ++index) {
      csvRow.push(data[index].join(","))
    }

    var csvString = csvRow.join("\n");
    var csvThai = iconv.encode(csvString, "TIS-620"); 
    
    var a = document.createElement("a");
    a.href = "data:attachment/csv;base64,"+csvThai.toString('base64');
    a.target = "_Blank";
    a.download = "testFile.csv";
    document.body.appendChild(a);

    return a.click();
  }