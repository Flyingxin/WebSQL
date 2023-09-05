<template>
  <div>11111</div>
</template>

<script>
import Docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import JSZipUtils from 'jszip-utils'
import { saveAs } from 'file-saver'
import { path } from "path";
export default {
  name: "test",
  methods: {
    // 点击导出word
    exportWord() {
      // Load the docx file as binary content
      const content = fs.readFileSync(
        path.resolve(__dirname, "test.docx"),
        "binary"
      );
      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });
      // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
      doc.render({
        first_name: "John",
        last_name: "Doe",
        phone: "0652455478",
      });
      const buf = doc.getZip().generate({
        type: "nodebuffer",
        compression: "DEFLATE",
      });
      // buf is a nodejs Buffer, you can either write it to a
      // file or res.send it with express for example.
      fs.writeFileSync(path.resolve(__dirname, "output.docx"), buf);
    },
  },
};
</script>

<style>
</style>