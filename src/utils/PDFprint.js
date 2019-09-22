import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

pdfMake.fonts = {
  THSarabunNew: {
    normal: 'THSarabunNew.ttf',
    bold: 'THSarabunNew-Bold.ttf',
    italics: 'THSarabunNew-Italic.ttf',
    bolditalics: 'THSarabunNew-BoldItalic.ttf'
  },
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-MediumItalic.ttf'
  }
}

  export async function PDFprint(key){

    var resultForm ;
    
    await fetch(`http://localhost:3001/api/BgDataEntry/resultFormByid/${key}`)
      .then(res => res.json())
      .then(data => {
        resultForm = data
        console.log("resultForm", resultForm);
      });   

      pdfMake.createPdf(resultForm).download('แบบบันทึกผล '+resultForm.content[5].text+'.pdf');
    }

  export async function PDFprints(){

    var resultForm ;
      
    await fetch('http://localhost:3001/api/BgDataEntry/allResult')
      .then(res => res.json())
      .then(data => {
        resultForm = data
      });   
  
      resultForm.map(data=>{
        console.log("data ", data);
        pdfMake.createPdf(data).download('แบบบันทึกผล '+data.content[5].text+'.pdf');
      })
  }