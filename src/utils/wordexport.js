import { saveAs } from 'file-saver'
export const wordexport = function(wrap,fileName) {
  const page = {
    mhtml: {
      top: "Mime-Version: 1.0\nContent-Base: " + location.href + "\nContent-Type: Multipart/related; boundary=\"NEXT.ITEM-BOUNDARY\";type=\"text/html\"\n\n--NEXT.ITEM-BOUNDARY\nContent-Type: text/html; charset=\"utf-8\"\nContent-Location: " + location.href + "\n\n<!DOCTYPE html>\n<html xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\" xmlns:w=\"urn:schemas-microsoft-com:office:word\" xmlns:m=\"http://schemas.microsoft.com/office/2004/12/omml\" xmlns=\"http://www.w3.org/TR/REC-html40\">"+
      "\n_html_</html>",
      head: "<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">"+
      "\n<!--[if gte mso 9]>"+
      "<xml>"+
      "\n<w:WordDocument>"+
      "\n<w:View>Print</w:View>"+
      "\n<w:GrammarState>Clean</w:GrammarState>"+
      "\n<w:TrackMoves>false</w:TrackMoves>"+
      "\n<w:TrackFormatting/>"+
      "\n<w:ValidateAgainstSchemas/>"+
      "\n<w:SaveIfXMLInvalid>false</w:SaveIfXMLInvalid>"+
      "\n<w:IgnoreMixedContent>false</w:IgnoreMixedContent>"+
      "\n<w:AlwaysShowPlaceholderText>false</w:AlwaysShowPlaceholderText>"+
      "\n<w:DoNotPromoteQF/>"+
      "\n<w:LidThemeOther>EN-US</w:LidThemeOther>"+
      "\n<w:LidThemeAsian>ZH-CN</w:LidThemeAsian>"+
      "\n<w:LidThemeComplexScript>X-NONE</w:LidThemeComplexScript>"+
      "\n<w:Compatibility>"+
      "\n<w:BreakWrappedTables/>"+
      "\n<w:SnapToGridInCell/>"+
      "\n<w:WrapTextWithPunct/>"+
      "\n<w:UseAsianBreakRules/>"+
      "\n<w:DontGrowAutofit/>"+
      "\n<w:SplitPgBreakAndParaMark/>"+
      "\n<w:DontVertAlignCellWithSp/>"+
      "\n<w:DontBreakConstrainedForcedTables/>"+
      "\n<w:DontVertAlignInTxbx/>"+
      "\n<w:Word11KerningPairs/>"+
      "\n<w:CachedColBalance/>"+
      "\n<w:UseFELayout/>"+
      "\n</w:Compatibility>"+
      "\n<w:BrowserLevel>MicrosoftInternetExplorer4</w:BrowserLevel>"+
      "\n<m:mathPr>"+
      "\n<m:mathFont m:val=\"Cambria Math\"/>"+
      "\n<m:brkBin m:val=\"before\"/>"+
      "\n<m:brkBinSub m:val=\"--\"/>"+
      "\n<m:smallFrac m:val=\"off\"/>"+
      "\n<m:dispDef/>"+
      "\n<m:lMargin m:val=\"0\"/>"+
      "\n<m:rMargin m:val=\"0\"/>"+
      "\n<m:defJc m:val=\"centerGroup\"/>"+
      "\n<m:wrapIndent m:val=\"1440\"/>"+
      "\n<m:intLim m:val=\"subSup\"/>"+
      "\n<m:naryLim m:val=\"undOvr\"/>"+
      "\n</m:mathPr></w:WordDocument>"+
      "\n</xml>"+
      "\n<![endif]-->"+
      "\n<style>\n_styles_\n</style>\n</head>\n",
      body: "<body>_body_</body>"
    }
  }
  const images = Array()

  const img = wrap.querySelectorAll('img')

  for (let i = 0; i < img.length; i++) {
    const uri = img[i].src
    img[i].src = img[i].currentSrc
    // Save encoded image to array
    images[i] = {
      type: uri.substring(uri.indexOf(':') + 1, uri.indexOf(';')),
      encoding: uri.substring(uri.indexOf(';') + 1, uri.indexOf(',')),
      location: img[i].src,
      data: uri.substring(uri.indexOf(',') + 1)
    }
  }
  let mhtmlBottom = '\n'
  for (let i = 0; i < images.length; i++) {
    mhtmlBottom += '--NEXT.ITEM-BOUNDARY\n'
    mhtmlBottom += 'Content-Location: ' + images[i].location + '\n'
    mhtmlBottom += 'Content-Type: ' + images[i].type + '\n'
    mhtmlBottom +=
      'Content-Transfer-Encoding: ' + images[i].encoding + '\n\n'
    mhtmlBottom += images[i].data + '\n\n'
  }
  mhtmlBottom += "--NEXT.ITEM-BOUNDARY--";

  var styles = "@page WordSection1 {size: 595.3pt 841.9pt;margin: 1.5cm 2.0cm 1.5cm 2.0cm;mso-header-margin: 42.55pt;mso-footer-margin: 49.6pt;mso-paper-source: 0;}div.WordSection1 {page: WordSection1}";
  const fileContent =
          page.mhtml.top.replace(
            '_html_',
            page.mhtml.head.replace('_styles_', styles) +
            page.mhtml.body.replace('_body_', wrap.outerHTML)
          ) + mhtmlBottom
      // Create a Blob with the file contents
      var blob = new Blob([fileContent], {
        type: "application/msword;charset=utf-8"
      });
      if (fileName) {
        saveAs(blob, fileName + ".doc");       
      } else {
        saveAs(blob, "name.doc");       
      }

}

