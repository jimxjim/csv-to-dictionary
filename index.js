const csvFilePath = './i18n.csv';
const csv = require('csvtojson');
const fs = require('fs');
// import zhtwfile from './zh-TW.js';
let dictJsonObjTW = '';
let dictJsonObjCN = '';
let dictJsonObjUS = '';

const writeFile = ({path, source}) => {
  fs.writeFile(path, source, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log(`${path} was saved!`);
  });
}

csv()
.fromFile(csvFilePath)
.on('json', (jsonObj) => {
  if (jsonObj['zh-TW']['json'] || jsonObj['zh-TW']['json'] === "") {
    if (jsonObj['zh-TW']['json']) dictJsonObjTW = `${dictJsonObjTW}\n  ${jsonObj['zh-TW']['json']}`;
    if (jsonObj['zh-TW']['json'] === "") dictJsonObjTW = `${dictJsonObjTW}\n`;
  }
  if (jsonObj['zh-CN']['json'] || jsonObj['zh-CN']['json'] === "") {
    if (jsonObj['zh-CN']['json']) dictJsonObjCN = `${dictJsonObjCN}\n  ${jsonObj['zh-CN']['json']}`;
    if (jsonObj['zh-CN']['json'] === "") dictJsonObjCN = `${dictJsonObjCN}\n`;
  }
  if (jsonObj['en-US']['json'] || jsonObj['en-US']['json'] === "") {
    if (jsonObj['en-US']['json']) dictJsonObjUS = `${dictJsonObjUS}\n  ${jsonObj['en-US']['json']}`;
    if (jsonObj['en-US']['json'] === "") dictJsonObjUS = `${dictJsonObjUS}\n`;
  }
})
.on('done', (error) => {
  const zhtw = JSON.parse(JSON.stringify(`export default {${dictJsonObjTW}\n}`));
  const zhcn = JSON.parse(JSON.stringify(`export default {${dictJsonObjCN}\n}`));
  const enus = JSON.parse(JSON.stringify(`export default {${dictJsonObjUS}\n}`));

  [
    { path: './locales/zh-TW.js', source: zhtw },
    { path: './locales/zh-CN.js', source: zhcn },
    { path: './locales/en-US.js', source: enus },     
  ].map(row => writeFile(row));

  if (error) console.log('error');
})